import { useState } from "react";
import { uploadCSV } from "../api/market";
import type { MarketSettings } from "../types/ui";

export function useFileUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<any>(null);

  const upload = async (file: File, config: MarketSettings) => {
    setLoading(true);
    setError(null);

    try {
      const result = await uploadCSV(file, config);
      setFileData(result);
      return result;
    } catch (err: any) {
      setError(err.message || "Upload failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error,
    fileData,
  };
}