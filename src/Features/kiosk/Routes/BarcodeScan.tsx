import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

interface ScannedBook {
  isbn: string
}

interface BarcodeScanProps {
  onClose: () => void
}

const BarcodeScan = ({ onClose }: BarcodeScanProps) => {
  const [scanned, setScanned] = useState<ScannedBook | null>(null)
  const [scanError, setScanError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)

  const stopCamera = useCallback(() => {
    try {
      readerRef.current?.reset()
    } catch (err) {
      console.error('Error resetting scanner', err)
    }
    readerRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const startScanning = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setScanError('Camera access requires HTTPS or localhost.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setScanError(null)
    } catch (err) {
      console.error('Camera unavailable', err)
      setScanError('Camera not found. Check the kiosk connection and try again.')
      return
    }

    if (!videoRef.current) return
    const reader = new BrowserMultiFormatReader()
    readerRef.current = reader
    try {
      await reader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          setScanned({ isbn: result.getText() })
          stopCamera()
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err)
        }
      })
    } catch (err) {
      console.error(err)
      setScanError('Unable to start the scanner. Try again.')
    }
  }, [stopCamera])

  useEffect(() => {
    startScanning()
    return () => stopCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scanAgain = () => {
    setScanned(null)
    setScanError(null)
    startScanning()
  }

  const confirmBorrow = () => {
    // TODO: send scanned.isbn to your circulation / borrowing API
    console.log('Borrowing', scanned?.isbn)
    onClose()
  }

  // Confirmation screen after a successful scan
  if (scanned) {
    return (
      <div className="relative z-10 w-full h-full flex items-center justify-center p-8 bg-[#10192b]">
        <div className="relative w-[min(34rem,90vw)] bg-[#f5f1e6] text-[#1b1b1b] rounded-md border-2 border-[#a97d33] shadow-2xl p-8 md:p-12 text-center">
          <span
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2f5d44] text-[#f5f1e6] text-2xl mb-3"
            aria-hidden="true"
          >
            ✓
          </span>
          <p className="text-sm text-[#57606f] mb-1">Scan complete</p>
          <h2 className="font-[Poppins,sans-serif] font-semibold text-2xl md:text-3xl mt-1 mb-5">
            Barcode scanned
          </h2>
          <p className="text-[#57606f] mt-4">ISBN {scanned.isbn}</p>
          <div className="flex gap-3 justify-center mt-7">
            <button
              onClick={scanAgain}
              className="text-base font-semibold px-6 py-3 rounded-md bg-transparent border-2 border-[#57606f] text-[#1b1b1b] hover:border-[#1b1b1b]"
            >
              Scan a different book
            </button>
            <button
              onClick={confirmBorrow}
              className="text-base font-semibold px-6 py-3 rounded-md bg-[#2f5d44] text-[#f5f1e6] hover:bg-[#274d39]"
            >
              Confirm borrow
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Active scanning screen — the header's "Home" button provides navigation away
  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center bg-[#10192b]">
      <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#10192b]/30" />

      <div className="relative z-10 w-[min(60vw,420px)] h-[min(38vw,260px)]">
        <span className="absolute top-0 left-0 w-12 h-12 border-4 border-[#c9a35f] border-r-0 border-b-0 rounded-tl-md" />
        <span className="absolute top-0 right-0 w-12 h-12 border-4 border-[#c9a35f] border-l-0 border-b-0 rounded-tr-md" />
        <span className="absolute bottom-0 left-0 w-12 h-12 border-4 border-[#c9a35f] border-r-0 border-t-0 rounded-bl-md" />
        <span className="absolute bottom-0 right-0 w-12 h-12 border-4 border-[#c9a35f] border-l-0 border-t-0 rounded-br-md" />
      </div>

      <p className="absolute z-10 bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 text-base md:text-lg text-[#f5f1e6] bg-[#10192b]/60 px-5 py-2 rounded-full">
        Hold the barcode steady inside the frame
      </p>

      {scanError && (
        <p className="absolute z-10 bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-[#ffdcd2] bg-[#8f3b2c]/90 px-4 py-2 rounded-md text-sm">
          {scanError}
        </p>
      )}
    </div>
  )
}

export default BarcodeScan