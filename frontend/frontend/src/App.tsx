import styles from './App.module.css';
import LoadButton from './components/LoadButton';
import PriceChart from './components/PriceChart';
import { useMarketData } from './hooks/useMarketData';


function App() {
  const {
    data,
    symbol,
    setSymbol,
    loadAlpha,
    loading,
    error,
  } = useMarketData();


  return (
    <div className={styles.app}>
      <h1 style={{ color: 'white', backgroundColor: 'black' }}>Header</h1>
      <LoadButton onClick={loadAlpha} loading={loading} />

      <div className={styles.layout}>
        <h1 style={{ color: 'white', backgroundColor: 'black' }}>sidebar section</h1>
        <main className={styles.chartsection}>
          <h1 style={{ color: 'white', backgroundColor: 'black' }}>|chart section</h1>
          <div className={styles.chartSection}>
            <h1 style={{ color: 'white', backgroundColor: 'black' }}>|price chart</h1>
            <PriceChart data={data ?? []} />
          </div>
          <div className={styles.metricsSection}>
            <h1 style={{ color: 'white', backgroundColor: 'black' }}>|metrics section</h1>
          </div>
        </main>
      </div>
      
    </div>
    // <div style={{ padding: 20 }}>
    //   <h1>Market Dashboard</h1>

    //   <SymbolInput value={symbol} onChange={setSymbol} />
    //   <LoadButton onClick={loadAlpha} loading={loading} />

    //   <FileUploader onUpload={loadCSV} />
    //   {/* {data && (
    //     <>
    //       <ReturnsChart
    //         data={data}
    //       />
        
    //     </>
    //   )} */}
    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   <PriceChart data={data?.data ?? []} />
    //   <OHLCVTable data={data?.data ?? []} />
    // </div>
  );
}

export default App;