import type { Metrics, PricePoint } from "./ui";

export type SetMarketData = (
  data: PricePoint[],
  metrics: Metrics
) => void;