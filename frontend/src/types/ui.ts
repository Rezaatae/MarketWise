export type Metrics = {
  returns?: number;
  volatility?: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
};

export type PricePoint = {
  date: string;
  close: number;
  sma: number | undefined;
  ema: number | undefined;
  signal: number | undefined;
};

export type MarketSettings = {
  symbol: string;
  maWindow: number;
  maType: "SMA" | "EMA" | "BOTH";
  volPeriod: number;
  showSignals: boolean;
};