import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import api from './../_api/axios'; // Import your custom Axios instance

export default function DeweyExcelBatchUploader() {
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

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

        const formattedItems = rawData.map((row) => {
          let deweyNum = String(row.dewey_number || row.Dewey_Number || '').trim();
          if (deweyNum && !deweyNum.includes('.')) {
            deweyNum = deweyNum.padStart(3, '0');
          }

          return {
            dewey_number: deweyNum,
            class_name: row.class_name || row.Class_Name || null,
            description: row.description || row.Description || null,
          };
        });

        await sendBatchPayload(formattedItems);
      } catch (err) {
        setStatusMessage('Error parsing Excel file.');
        console.error(err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const sendBatchPayload = async (items: Array<any>) => {
    setLoading(true);
    setStatusMessage(`Uploading ${items.length} records in batch...`);

    try {
      // Endpoint is relative to the baseURL set in axios.ts
      const response = await api.post('/book/dewey-decimal/batch-import', { items });

      if (response.data.success) {
        setStatusMessage(`[SUCCESS] ${response.data.message}`);
      } else {
        setStatusMessage(`[FAILED] ${response.data.message || 'Validation error'}`);
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Network or server failure.';
      setStatusMessage(`[ERROR] ${errMsg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Dewey Decimal Batch Uploader</h2>

      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        disabled={loading}
        style={{ marginBottom: '15px' }}
      />

      {loading && <p style={{ color: '#007bff' }}>Processing batch import, please wait...</p>}

      {statusMessage && (
        <p style={{ fontWeight: 'bold', color: statusMessage.includes('SUCCESS') ? '#28a745' : '#dc3545' }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
}