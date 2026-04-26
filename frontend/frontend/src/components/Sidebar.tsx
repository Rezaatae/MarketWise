import { Upload } from 'lucide-react';
import styles from './Sidebar.module.css';
import type { MarketSettings } from '../types/ui';

interface SidebarProps {
  settings: MarketSettings;
  onChange: (settings: MarketSettings) => void;
}

type MAType = "SMA" | "EMA";

export function Sidebar({ settings, onChange }: SidebarProps) {
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
              value={settings.symbol}
              onChange={(e) =>
                onChange({ ...settings, symbol: e.target.value })
              }
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
                value={settings.window}
                onChange={(e) =>
                  onChange({
                    ...settings,
                    window: Number(e.target.value),
                  })
                }
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Type</label>
              <select
                value={settings.maType}
                onChange={(e) =>
                  onChange({
                    ...settings,
                    maType: e.target.value as MAType,
                  })
                }
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
                value={settings.volPeriod}
                onChange={(e) =>
                  onChange({
                    ...settings,
                    volPeriod: Number(e.target.value),
                  })
                }
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
              checked={settings.showSignals}
              onChange={(e) =>
                onChange({
                  ...settings,
                  showSignals: e.target.checked,
                })
              }
              className={styles.checkbox}
            />
            <span>Show Buy/Sell Markers</span>
          </label>
        </section>
      </div>
    </aside>
  );
}