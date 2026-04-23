import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PriceChart } from './components/PriceChart';
import { MetricCard } from './components/MetricCard';
import styles from './App.module.css';

// Generate mock market data
const generateMockData = () => {
  const data = [];
  const basePrice = 150;
  let price = basePrice;

  for (let i = 0; i < 90; i++) {
    const date = new Date(2026, 0, i + 1);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

    // Random walk
    const change = (Math.random() - 0.48) * 5;
    price = Math.max(price + change, basePrice * 0.7);

    // Moving average (simple 20-day)
    const maStart = Math.max(0, i - 19);
    const maData = data.slice(maStart);
    const ma = maData.length > 0
      ? maData.reduce((sum, d) => sum + d.price, price) / (maData.length + 1)
      : price;

    // Generate buy/sell signals based on MA crossover
    let signal = undefined;
    if (i > 0) {
      const prevPrice = data[i - 1].price;
      const prevMa = data[i - 1].ma;

      if (prevPrice < prevMa && price > ma && Math.random() > 0.7) {
        signal = 'buy';
      } else if (prevPrice > prevMa && price < ma && Math.random() > 0.7) {
        signal = 'sell';
      }
    }

    data.push({
      date: dateStr,
      price: Math.round(price * 100) / 100,
      ma: Math.round(ma * 100) / 100,
      signal
    });
  }

  return data;
};

export default function App() {
  const [chartData, setChartData] = useState(generateMockData());
  const [showSignals, setShowSignals] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState('AAPL');

  const handleApplySettings = (settings: any) => {
    setShowSignals(settings.showSignals);
    setSelectedAsset(settings.selectedAsset);
    // In a real app, recalculate indicators based on settings
    setChartData(generateMockData());
  };

  const handleLoadData = () => {
    // Regenerate data
    setChartData(generateMockData());
  };

  // Calculate metrics from chart data
  const calculateMetrics = () => {
    const returns = ((chartData[chartData.length - 1].price - chartData[0].price) / chartData[0].price * 100).toFixed(2);

    // Calculate volatility (standard deviation of returns)
    const dailyReturns = chartData.slice(1).map((d, i) =>
      (d.price - chartData[i].price) / chartData[i].price
    );
    const mean = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
    const variance = dailyReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / dailyReturns.length;
    const volatility = (Math.sqrt(variance) * 100).toFixed(2);

    // Mock other metrics
    const sharpeRatio = (parseFloat(returns) / parseFloat(volatility) * Math.sqrt(252)).toFixed(2);
    const maxDrawdown = (-12.5).toFixed(2);

    const signals = chartData.filter(d => d.signal);
    const buySignals = signals.filter(d => d.signal === 'buy').length;
    const sellSignals = signals.filter(d => d.signal === 'sell').length;
    const winRate = buySignals > 0 ? ((buySignals / (buySignals + sellSignals)) * 100).toFixed(1) : '0.0';

    return {
      returns: parseFloat(returns),
      volatility: parseFloat(volatility),
      sharpeRatio: parseFloat(sharpeRatio),
      maxDrawdown: parseFloat(maxDrawdown),
      winRate: parseFloat(winRate),
      numTrades: buySignals + sellSignals
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className={styles.app}>
      <Header
        selectedAsset={selectedAsset}
        dateRange="Jan 1 - Mar 31, 2026"
        onLoadData={handleLoadData}
      />

      <div className={styles.layout}>
        <Sidebar onApplySettings={handleApplySettings} />

        <main className={styles.main}>
          <div className={styles.chartSection}>
            <PriceChart data={chartData} showSignals={showSignals} />
          </div>

          <div className={styles.metricsSection}>
            <h2 className={styles.metricsTitle}>Performance Metrics</h2>
            <div className={styles.metricsGrid}>
              <MetricCard
                label="Returns"
                value={metrics.returns}
                suffix="%"
                isPositive={metrics.returns > 0}
              />
              <MetricCard
                label="Volatility"
                value={metrics.volatility}
                suffix="%"
              />
              <MetricCard
                label="Sharpe Ratio"
                value={metrics.sharpeRatio}
                isPositive={metrics.sharpeRatio > 1}
              />
              <MetricCard
                label="Max Drawdown"
                value={metrics.maxDrawdown}
                suffix="%"
                isPositive={false}
              />
              <MetricCard
                label="Win Rate"
                value={metrics.winRate}
                suffix="%"
                isPositive={metrics.winRate > 50}
              />
              <MetricCard
                label="Number of Trades"
                value={metrics.numTrades}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
