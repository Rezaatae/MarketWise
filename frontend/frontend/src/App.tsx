import { useMarketData } from "./hooks/useMarketData";
import SymbolInput from "./components/SymbolInput";
import LoadButton from "./components/LoadButton";
import FileUploader from "./components/FileUploader";
import OHLCVTable from "./components/OHLCVTable";
import PriceChart from "./components/PriceChart";
import ReturnsChart from "./components/ReturnsChart";

function App() {
  const {
    data,
    symbol,
    setSymbol,
    loadAlpha,
    loadCSV,
    loading,
    error,
  } = useMarketData();
  
  console.log(data)


  return (
    <div style={{ padding: 20 }}>
      <h1>Market Dashboard</h1>

      <SymbolInput value={symbol} onChange={setSymbol} />
      <LoadButton onClick={loadAlpha} loading={loading} />

      <FileUploader onUpload={loadCSV} />
      {/* {data && (
        <>
          <ReturnsChart
            data={data}
          />
        
        </>
      )} */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <PriceChart data={data?.data ?? []} />
      <OHLCVTable data={data?.data ?? []} />
    </div>
  );
}

export default App;