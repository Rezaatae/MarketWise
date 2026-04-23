import { Upload } from 'lucide-react';
import { useState } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onApplySettings: (settings: any) => void;
}

export function Sidebar({ onApplySettings }: SidebarProps) {
  const [maWindow, setMaWindow] = useState(20);
  const [maType, setMaType] = useState('SMA');
  const [volPeriod, setVolPeriod] = useState(30);
  const [showSignals, setShowSignals] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState('AAPL');

  const handleApply = () => {
    onApplySettings({ maWindow, maType, volPeriod, showSignals, selectedAsset });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Data</h3>
          <button className={styles.uploadButton}>
            <Upload />
            Upload CSV
          </button>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Asset</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className={styles.select}
            >
              <option value="AAPL">AAPL - Apple Inc.</option>
              <option value="GOOGL">GOOGL - Alphabet Inc.</option>
              <option value="MSFT">MSFT - Microsoft Corp.</option>
              <option value="TSLA">TSLA - Tesla Inc.</option>
              <option value="AMZN">AMZN - Amazon.com Inc.</option>
            </select>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Indicators</h3>

          <div className={styles.indicatorCard}>
            <div className={styles.indicatorTitle}>Moving Average</div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Window</label>
              <input
                type="number"
                value={maWindow}
                onChange={(e) => setMaWindow(Number(e.target.value))}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Type</label>
              <select
                value={maType}
                onChange={(e) => setMaType(e.target.value)}
                className={styles.select}
              >
                <option value="SMA">SMA (Simple)</option>
                <option value="EMA">EMA (Exponential)</option>
              </select>
            </div>
          </div>

          <div className={styles.indicatorCard}>
            <div className={styles.indicatorTitle}>Volatility</div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Period</label>
              <input
                type="number"
                value={volPeriod}
                onChange={(e) => setVolPeriod(Number(e.target.value))}
                className={styles.input}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Signals</h3>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showSignals}
              onChange={(e) => setShowSignals(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Show Buy/Sell Markers</span>
          </label>
        </section>
      </div>

      <div className={styles.footer}>
        <button onClick={handleApply} className={styles.applyButton}>
          Apply Settings
        </button>
      </div>
    </aside>
  );
}
