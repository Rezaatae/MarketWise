import { useState } from "react";
import { fetchAlpha } from "../api/market";
import { mapToChartData } from "../mappers/marketMapper";
import type { MarketSettings, PricePoint } from "../types/ui";



export function useMarketData() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState<PricePoint[]>([]);
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
      const mapped = mapToChartData(res.timestamps, res.close);

      setData(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    symbol,
    setSymbol,
    loadAlpha,
    loading,
    error,
  };
}