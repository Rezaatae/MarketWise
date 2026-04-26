import styles from './App.module.css';
import { useState } from 'react';
import PriceChart from './components/PriceChart';
import { useMarketData } from './hooks/useMarketData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import type { MarketSettings } from './types/ui';


function App() {
  const {
    data,
    symbol,
    setSymbol,
    loadAlpha,
    loading,
    error,
  } = useMarketData();
  const [selectedAsset, setSelectedAsset] = useState('AAPL');
  const [settings, setSettings] = useState<MarketSettings>({
  symbol: "AAPL",
  window: 20,
  maType: "SMA",
  volPeriod: 30,
  showSignals: true,
});
  const handleApplySettings = async (settings: MarketSettings) => {
  console.log(settings);

  // call your existing load function but pass config
  await loadAlpha(settings.symbol, settings);
};

  return (
    <div className={styles.app}>
      <Header
        selectedAsset={settings.symbol}
        dateRange="Jan 1 - Mar 31, 2026"
        onLoadData={() => loadAlpha(settings.symbol, settings)}
      />

      <div className={styles.layout}>
        <Sidebar settings={settings} onChange={setSettings} />
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