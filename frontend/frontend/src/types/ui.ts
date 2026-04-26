export type PriceChartVM = {
  labels: string[];
  prices: number[];
};

export type PricePoint = {
  date: string;
  close: number;
};

export type MarketSettings = {
  symbol: string;
  window: number;
  maType: "SMA" | "EMA";
  volPeriod: number;
  showSignals: boolean;
};