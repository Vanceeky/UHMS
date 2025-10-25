"use client";

import React, { useState } from "react";
import { createWorker, Worker } from "tesseract.js";

interface OCRResult {
  text: string;
  amount: string | null;
  reference: string | null;
}

const ReceiptReader: React.FC = () => {
  const [ocrResult, setOcrResult] = useState<OCRResult>({
    text: "",
    amount: null,
    reference: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    setLoading(true);

    try {
      const worker: Worker = await createWorker({
        logger: (m) => console.log(m), // progress logs
      });

      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const {
        data: { text },
      } = await worker.recognize(imgUrl);

      await worker.terminate();

      const amount = extractAmount(text);
      const reference = extractReference(text);

      setOcrResult({ text, amount, reference });
    } catch (error) {
      console.error("OCR error:", error);
      setOcrResult({
        text: "Error reading receipt. Please try again.",
        amount: null,
        reference: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const extractAmount = (text: string): string | null => {
    // Try multiple amount patterns (₱, Total, Amount, etc.)
    const amountPatterns = [
      /₱?\s*([0-9]{1,3}(?:[,\s][0-9]{3})*(?:\.[0-9]{2})?)/i,
      /Total(?:\sAmount)?[:\s]*([0-9,]+\.\d{2})/i,
      /Amount[:\s]*([0-9,]+\.\d{2})/i,
    ];

    for (const pattern of amountPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].replace(/[,\s]/g, "");
      }
    }
    return null;
  };

  const extractReference = (text: string): string | null => {
    const refPatterns = [
      /Reference(?:\sNo\.?|#)[:\s]*([A-Z0-9\-]+)/i,
      /Transaction\s*ID[:\s]*([A-Z0-9\-]+)/i,
      /Ref[:\s]*([A-Z0-9\-]+)/i,
    ];

    for (const pattern of refPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 border rounded-2xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-center">📷 GCash Receipt Reader</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block w-full text-sm border rounded-lg p-2"
      />

      {loading && <p className="text-center text-blue-500">Reading receipt...</p>}

      {!loading && ocrResult.text && (
        <div className="space-y-2 text-sm">
          <div>
            <strong>Detected Amount:</strong>{" "}
            {ocrResult.amount ? `₱ ${ocrResult.amount}` : "—"}
          </div>
          <div>
            <strong>Reference No:</strong>{" "}
            {ocrResult.reference || "—"}
          </div>

          <details className="bg-gray-50 p-2 rounded-lg">
            <summary className="cursor-pointer text-blue-500 font-medium">
              Show Raw OCR Text
            </summary>
            <pre className="whitespace-pre-wrap break-words text-xs mt-2">
              {ocrResult.text}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ReceiptReader;
