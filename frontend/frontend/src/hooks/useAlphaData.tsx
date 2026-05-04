import { useState } from "react";
import { fetchAlpha } from "../api/market";
import { mapToMetricValues, mapToPricePoints } from "../mappers/marketMapper";
import type{ Metrics, MarketSettings, PricePoint } from "../types/ui";
import { useMarketData } from "./useMarketData";



export function useAlphaData(setFromAlpha) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAlpha = async (symbol: string, settings: MarketSettings) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchAlpha(symbol, {
        window: settings.maWindow,
        compute_sma: settings.maType === "SMA",
        compute_ema: settings.maType === "EMA",
        compute_returns: true,
      });

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