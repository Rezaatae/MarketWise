const BASE_URL = "http://localhost:8000";

export async function fetchAlpha(symbol:string) {
  const res = await fetch(`${BASE_URL}/api/market/prices/${symbol}`)
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