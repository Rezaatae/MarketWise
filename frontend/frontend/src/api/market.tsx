import type { components } from "../types/api";

const BASE_URL = "http://localhost:8000";
type MarketResponseDTO = components["schemas"]["MarketResponse"];

export async function fetchAlpha(symbol: string): Promise<MarketResponseDTO> {
  const res = await fetch(
    `${BASE_URL}/api/market/alpha-market-data/${symbol}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function uploadCSV(file: File, symbol: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/upload/upload-csv?symbol=${symbol}`,{
    method: "POST",
    body: formData,
  });
  return res.json();
}