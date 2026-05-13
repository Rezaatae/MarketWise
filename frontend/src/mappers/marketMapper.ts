import type { components } from "../types/api";
import type { PricePoint, Metrics } from "../types/ui";

type MarketResponseDTO = components["schemas"]["MarketResponse"];

export function mapToMetricValues(dto: MarketResponseDTO): Metrics {
  return {
    returns: dto.total_return,
    volatility: dto.annualized_volatility,
    sharpeRatio: dto.sharpe_ratio,
    maxDrawdown: dto.max_drawdown
  }
}

export function mapToPricePoints(dto: MarketResponseDTO): PricePoint[] {
  return dto.timestamps.map((t, i) => {
    const sma = dto.sma?.[i];
    const ema = dto.ema?.[i];
    const signal = dto.signal?.[i];
    const close = dto.close?.[i];

    return {
      date: t,
      close: close ?? undefined,
      sma: sma ?? undefined,
      ema: ema ?? undefined,
      signal: signal ?? undefined,
    };
  });
}