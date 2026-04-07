import { useState } from "react";
import PriceChart from "./PriceChart";

type PricePoint = {
  date: string;
  price: number;
};

type ApiResponse = {
  timestamps: string[];
  prices: number[];
};

function App() {
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [data, setData] = useState<PricePoint[]>([]);

  const fetchData = async (): Promise<void> => {
    const res = await fetch(`http://localhost:8000/market/prices/${symbol}`);
    const json: ApiResponse = await res.json();

    const formatted: PricePoint[] = json.timestamps.map((t, i) => ({
      date: t,
      price: json.prices[i],
    }));

    setData(formatted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Market Dashboard</h1>

      <input
        value={symbol}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSymbol(e.target.value)
        }
      />
      <button onClick={fetchData}>Load Data</button>

      <PriceChart data={data} />
    </div>
  );
}

export default App;