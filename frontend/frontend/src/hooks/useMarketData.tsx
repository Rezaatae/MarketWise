import { useState } from "react";
import { fetchAlpha, uploadCSV } from "../api/market";
import type { components } from "../types/api";

type MarketResponse = components["schemas"]["OHLCVResponse"]

export function useMarketData() {
    const [data, setData] = useState<MarketResponse | null>(null);
    const [symbol, setSymbol] = useState("AAPL");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const loadAlpha = async () => {
        try {
            setLoading(true);
            const res = await fetchAlpha(symbol);
            setData(res);
        }catch (e){
            setError("Failed to load market data");
            console.log(e)
        }finally{
            setLoading(false);
        }
    };

    const loadCSV = async (file: File) => {
        try {
            setLoading(true);
        const res = await uploadCSV(file, symbol);
            setData(res);
        } catch (e) {
            setError("Failed to upload CSV");
        } finally {
            setLoading(false);
        }
    };
    return {
    data,
    symbol,
    setSymbol,
    loadAlpha,
    loadCSV,
    loading,
    error,
  };
}