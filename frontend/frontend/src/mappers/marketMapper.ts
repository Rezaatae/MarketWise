import type { components } from "../types/api";
import type { PricePoint } from "../types/ui";

type MarketResponseDTO = components["schemas"]["MarketResponse"];

export function mapToPricePoints(dto: MarketResponseDTO): PricePoint[] {
  return dto.timestamps.map((t, i) => ({
    date: t,
    close: dto.close[i],
  }));
}