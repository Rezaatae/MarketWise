import { useState } from "react";
import { uploadFile } from "../api/uploadFile";

export function useFileUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<any>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const result = await uploadFile(file);
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