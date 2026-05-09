export type Metrics = {
  returns?: number;
  volatility?: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
};

export type PricePoint = {
  date: string;
  close: number;
  sma: number | null;
  ema: number | null;
  signal: number | null;
};

export type MarketSettings = {
  symbol: string;
  maWindow: number;
  maType: "SMA" | "EMA" | "BOTH";
  volPeriod: number;
  showSignals: boolean;
};