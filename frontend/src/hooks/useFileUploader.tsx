import { useState } from "react";
import { uploadCSV } from "../api/market";
import type { MarketSettings } from "../types/ui";
import { mapToMetricValues, mapToPricePoints } from "../mappers/marketMapper";

export function useFileUploader(setFromFile) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, config: MarketSettings) => {
    setLoading(true);
    setError(null);

    try {
      const res = await uploadCSV(file, config);

      const mapped = mapToPricePoints(res);
      const metrics = mapToMetricValues(res);

      setFromFile(mapped, metrics);
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
  };
}