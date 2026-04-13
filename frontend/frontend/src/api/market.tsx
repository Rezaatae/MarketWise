// src/api/market.ts
import type { components } from "../types/api";

type PriceResponse = components["schemas"]["PriceResponse"];

export const fetchPrices = async (symbol: string): Promise<PriceResponse> => {
  const res = await fetch(`http://localhost:8000/api/market/prices/${symbol}`);
  return res.json();
};