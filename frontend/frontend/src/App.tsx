import styles from './App.module.css';
import { useState } from 'react';
import PriceChart from './components/PriceChart';
import { useMarketData } from './hooks/useMarketData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import type { MarketSettings } from './types/ui';
import { MetricCard } from './components/MetricCard';


function App() {
  const {
    data,
    metrics,
    loadAlpha,
  } = useMarketData();

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
        onLoadData={() => loadAlpha(config.symbol, config)}
      />

      <div className={styles.layout}>
        <Sidebar config={config} onChange={setConfig}/>
        <main className={styles.main}>
          <div className={styles.chartSection}>
            <PriceChart data={data ?? []} />
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