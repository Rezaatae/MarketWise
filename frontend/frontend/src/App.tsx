import { useState } from "react";
import PriceChart from "./components/PriceChart";
import { useMarket } from "./hooks/useMarket";
import OHLCVTable from "./components/Table/OHLCVTable";
import FileUploader from "./components/FileUploader/FileUploader";
import { useFileUploader } from "./hooks/useFileUploader";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const { data, load } = useMarket();
  const { upload, loading, error, fileData } = useFileUploader();


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

      <div>
        <FileUploader onUpload={upload} loading={loading} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <OHLCVTable data={fileData ?? []} />
      <PriceChart data={data} />
      <OHLCVTable data={data} />
    </div>
  );
}

export default App;