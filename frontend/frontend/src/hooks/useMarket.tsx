import { useState } from "react";
import { fetchPrices } from "../api/market";
import type { components } from "../types/api";

type PricePoint = {
  date: string;
  price: number;
};

type PriceResponse = components["schemas"]["PriceResponse"];


export const useMarket = () => {
    const [data, setData] = useState<PricePoint[]>([]);
    const load = async (symbol: string) => {
        const res: PriceResponse = await fetchPrices(symbol);
        const formatted: PricePoint[] = res.timestamps.map((t, i) => ({
            date: t,
            price: res.prices[i],
            }));
        setData(formatted);
  };

  return {data, load}

}