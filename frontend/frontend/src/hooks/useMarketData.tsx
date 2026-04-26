import { useState } from "react";
import { fetchAlpha } from "../api/market";
import { mapToMetricValues, mapToPricePoints } from "../mappers/marketMapper";
import type{ Metrics, MarketSettings, PricePoint } from "../types/ui";



export function useMarketData() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState<PricePoint[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAlpha = async (symbol: string, settings: MarketSettings) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchAlpha(symbol, {
      window: settings.window,
      compute_sma: settings.maType === "SMA",
      compute_ema: settings.maType === "EMA",
      compute_returns: true,
      });
      const mapped = mapToPricePoints(res);
      const metricvaluesObj = mapToMetricValues(res)

      setData(mapped);
      setMetrics(metricvaluesObj);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    metrics,
    symbol,
    setSymbol,
    loadAlpha,
    loading,
    error,
  };
}