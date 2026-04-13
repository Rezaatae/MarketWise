import { useState } from "react";
import PriceChart from "./components/PriceChart";
import { useMarket } from "./hooks/useMarket";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const { data, load } = useMarket();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Market Dashboard</h1>

      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <button onClick={() => load(symbol)}>
        Load Data
      </button>

      <PriceChart data={data} />
    </div>
  );
}

export default App;