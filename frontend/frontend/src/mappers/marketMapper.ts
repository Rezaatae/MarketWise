import type { components } from "../types/api";
import type { PricePoint, ReturnPoint } from "../types/ui";

type MarketResponse = components["schemas"]["OHLCVResponse"];

export function mapToPriceData(api: MarketResponse | null): PricePoint[] {
  if (!api) return [];

  return api.data
    .filter(r => r.price.close != null)
    .map(r => ({
      date: r.date,
      close: r.price.close as number,
    }));
}

export function mapToReturnData(api: MarketResponse | null): ReturnPoint[] {
  if (!api || !api.returns) return [];

  return api.data.map((row, i) => ({
    date: row.date,
    value: api.returns?.simple[i] ?? 0,
  })).filter(r => r.value !== null);
}

export function mapToOHLCVData(api: MarketResponse | null): ReturnPoint[] {
  if (!api || !api.returns) return [];

  return api.data.map((row, i) => ({
    date: row.date,
    value: api.returns?.simple[i] ?? 0,
  })).filter(r => r.value !== null);
}