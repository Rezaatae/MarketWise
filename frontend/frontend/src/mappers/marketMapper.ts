import type { components } from "../types/api";
import type { PriceChartVM, PricePoint } from "../types/ui";

type MarketResponseDTO = components["schemas"]["MarketResponse"];


export function mapToPriceChartVM(dto: MarketResponseDTO): PriceChartVM {
  return {
    labels: dto.timestamps.map(t =>
      new Date(t).toLocaleDateString()
    ),
    prices: dto.close,
  };
}

export function mapToChartData(
  timestamps: string[],
  close: number[]
): PricePoint[] {
  return timestamps.map((t, i) => ({
    date: t,
    close: close[i],
  }));
}

// export function mapToReturnData(api: MarketResponse | null): ReturnPoint[] {
//   if (!api || !api.returns) return [];

//   return api.data.map((row, i) => ({
//     date: row.date,
//     value: api.returns?.simple[i] ?? 0,
//   })).filter(r => r.value !== null);
// }

// export function mapToOHLCVData(api: MarketResponse | null): ReturnPoint[] {
//   if (!api || !api.returns) return [];

//   return api.data.map((row, i) => ({
//     date: row.date,
//     value: api.returns?.simple[i] ?? 0,
//   })).filter(r => r.value !== null);
// }