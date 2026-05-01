export type Metrics = {
  returns?: number;
  volatility?: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
};

export type PricePoint = {
  date: string;
  close: number;
  ma: number | null;
};

export type MarketSettings = {
  symbol: string;
  maWindow: number;
  maType: "SMA" | "EMA";
  volPeriod: number;
  showSignals: boolean;
};