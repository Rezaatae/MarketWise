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
  return dto.timestamps.map((t, i) => ({
    date: t,
    close: dto.close[i],
  }));
}