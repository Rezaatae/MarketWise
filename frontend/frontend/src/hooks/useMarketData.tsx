import { useState } from "react";
import type{ Metrics, PricePoint } from "../types/ui";

export function useMarketData() {
  const [priceData, setPriceData] = useState<PricePoint[]>([]);
  const [priceMetrics, setPriceMetrics] = useState<Metrics | null>(null);
  const [source, setSource] = useState<"alpha" | "file" | null>(null);

  const setFromAlpha = (data: PricePoint[], metrics: Metrics) => {
    setPriceData(data);
    setPriceMetrics(metrics);
    setSource("alpha");
  };

  const setFromFile = (data: PricePoint[], metrics: Metrics) => {
    setPriceData(data);
    setPriceMetrics(metrics);
    setSource("file");
  };

  return {
    priceData,
    priceMetrics,
    setFromAlpha,
    setFromFile,
    source,
  };
}