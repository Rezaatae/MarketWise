import type { components } from "../types/api";
import type { MarketSettings } from "../types/ui";

const BASE_URL = "http://localhost:8000";
// const BASE_URL = import.meta.env.VITE_API_URL;
console.log(BASE_URL)
type MarketResponseDTO = components["schemas"]["MarketResponse"];

export async function fetchAlpha(symbol: string, config: MarketSettings): Promise<MarketResponseDTO> {
  const res = await fetch(
    `${BASE_URL}/api/market/alpha-market-data/${symbol}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    }
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function uploadCSV(file: File, config: MarketSettings): Promise<MarketResponseDTO> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("config", JSON.stringify(config));

  const res = await fetch(`${BASE_URL}/api/upload/upload-csv`,{
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
  throw new Error(await res.text());
  }
  return res.json();
}