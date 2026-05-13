import { useState } from "react";
import { fetchAlpha } from "../api/market";
import type { SetMarketData } from "../types/hooks";
import { mapToMetricValues, mapToPricePoints } from "../mappers/marketMapper";
import type{MarketSettings } from "../types/ui";



export function useAlphaData(setFromAlpha: SetMarketData) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAlpha = async (symbol: string, config: MarketSettings) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchAlpha(symbol, config);

      const mapped = mapToPricePoints(res);
      const metrics = mapToMetricValues(res);

      setFromAlpha(mapped, metrics);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadAlpha,
    loading,
    error,
  };
}