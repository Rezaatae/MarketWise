import { useState } from 'react';
import styles from './App.module.css';
import type { MarketSettings } from './types/ui';
import PriceChart from './components/PriceChart';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { useMarketData } from './hooks/useMarketData';
import { useAlphaData } from './hooks/useAlphaData';


function App() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  console.log("reztest base url")
  console.log(BASE_URL)
  const market = useMarketData();
  const alpha = useAlphaData(market.setFromAlpha);

  const {
    priceData,
    priceMetrics,
  } = market;

  const data = priceData
  const metrics = priceMetrics

  const [config, setConfig] = useState<MarketSettings>({
  symbol: "AAPL",
  maWindow: 20,
  maType: "SMA",
  volPeriod: 30,
  showSignals: true,
});

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={styles.app}>
      <Header
        selectedAsset={config.symbol}
        dateRange={`${formatDate(data[0]?.date)} - ${formatDate(data[data.length - 1]?.date)}`}
        onLoadData={() => alpha.loadAlpha(config.symbol, config)}
      />

      <div className={styles.layout}>
        <Sidebar config={config} onChange={setConfig} setFromFile={market.setFromFile}/>
        <main className={styles.main}>
          <div className={styles.chartSection}>
            <PriceChart data={data ?? []} showSignals={config.showSignals} maType={config.maType} />
          </div>
          <div className={styles.metricsSection}>
            <h2 className={styles.metricsTitle}>Performance Metrics</h2>
            {metrics && (
              <div className={styles.metricsGrid}>
                <MetricCard
                  label="Returns"
                  value={metrics.returns}
                  suffix="%"
                  isPositive={(metrics.returns ?? 0) > 0}
                />

                <MetricCard
                  label="Volatility"
                  value={metrics.volatility}
                  suffix="%"
                />

                <MetricCard
                  label="Sharpe Ratio"
                  value={metrics.sharpeRatio}
                  isPositive={(metrics.sharpeRatio ?? 0) > 1}
                />

                <MetricCard
                  label="Max Drawdown"
                  value={metrics.maxDrawdown}
                  suffix="%"
                  isPositive={false}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>

  );
}

export default App;