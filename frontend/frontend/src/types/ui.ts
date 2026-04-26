export type Metrics = {
  returns?: number;
  volatility?: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
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