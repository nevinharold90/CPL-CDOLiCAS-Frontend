import React, { useState } from 'react';
import * as XLSX from 'xlsx';

    interface LogItem {
        type: 'success' | 'error';
        text: string;
    }

    export default function DeweyExcelUploader() {
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [logs, setLogs] = useState<LogItem[]>([]);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const API_URL = '/api/callnumber-register'; // Update with your endpoint

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (e: ProgressEvent<FileReader>) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const rawData: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

                if (rawData.length === 0) {
                    setStatusMessage('The uploaded file is empty.');
                    return;
                }

                await processAndUpload(rawData);
            } catch (err) {
                setStatusMessage('Error reading Excel file.');
                console.error(err);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const processAndUpload = async (rows: Record<string, any>[]) => {
        setLoading(true);
        setLogs([]);
        setTotal(rows.length);
        setProgress(0);
        setStatusMessage('Uploading records...');

        for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        let deweyNum = String(row.dewey_number || row.Dewey_Number || '').trim();
        if (deweyNum && !deweyNum.includes('.')) {
            deweyNum = deweyNum.padStart(3, '0');
        }

        const payload = {
            dewey_number: deweyNum,
            class_name: row.class_name || row.Class_Name || null,
            description: row.description || row.Description || null,
        };

        try {
            const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.success) {
            setLogs((prev) => [
                ...prev,
                { type: 'success', text: `[SUCCESS] ${payload.dewey_number} - Registered` },
            ]);
            } else {
            setLogs((prev) => [
                ...prev,
                { type: 'error', text: `[FAILED] ${payload.dewey_number}: ${result.message || 'Validation error'}` },
            ]);
            }
        } catch (error) {
            setLogs((prev) => [
            ...prev,
            { type: 'error', text: `[ERROR] ${payload.dewey_number}: Network/Server failure` },
            ]);
        }

        setProgress(i + 1);
        }

        setLoading(false);
        setStatusMessage('All rows processed! Upload complete.');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Dewey Decimal Excel Uploader</h2>

        <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            disabled={loading}
            style={{ marginBottom: '15px' }}
        />

        {loading && (
            <div style={{ margin: '15px 0' }}>
            <p>Processing: <strong>{progress} / {total}</strong></p>
            <progress value={progress} max={total} style={{ width: '100%' }} />
            </div>
        )}

        {statusMessage && (
            <p style={{ fontWeight: 'bold', color: loading ? '#007bff' : '#28a745' }}>
            {statusMessage}
            </p>
        )}

        {logs.length > 0 && (
            <div style={{ marginTop: '20px', maxHeight: '250px', overflowY: 'auto', background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            <h4>Upload Logs:</h4>
            {logs.map((log, index) => (
                <div key={index} style={{ fontSize: '12px', color: log.type === 'success' ? 'green' : 'red', margin: '2px 0' }}>
                {log.text}
                </div>
            ))}
            </div>
        )}
        </div>
    );
}