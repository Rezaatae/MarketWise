import styles from './Sidebar.module.css';
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import type { MarketSettings, Metrics, PricePoint } from '../types/ui';
import { useFileUploader } from "../hooks/useFileUploader";

interface SidebarProps {
  config: MarketSettings;
  onChange: (settings: MarketSettings) => void;
  setFromFile: (data: PricePoint[], metrics: Metrics) => void;
}

type MAType = "SMA" | "EMA";

export function Sidebar({ config, onChange, setFromFile}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { upload } = useFileUploader(setFromFile);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      await upload(
        file,
        config);

      console.log("Upload successful");

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      console.error("Upload failed");
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Data</h3>
          <div className={styles.inputGroup}>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={handleButtonClick}
              >
                <Upload />
                Upload CSV
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />

              <button
                onClick={handleFileUpload}
                disabled={!file}
                className={styles.loadButton}
                >
                Load File Data
              </button>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Asset</label>
            <select
              value={config.symbol}
              onChange={(e) =>
                onChange({ ...config, symbol: e.target.value })
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
                value={config.maWindow}
                onChange={(e) =>
                  onChange({
                    ...config,
                    maWindow: Number(e.target.value),
                  })
                }
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Type</label>
              <select
                value={config.maType}
                onChange={(e) =>
                  onChange({
                    ...config,
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
                value={config.volPeriod}
                onChange={(e) =>
                  onChange({
                    ...config,
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
              checked={config.showSignals}
              onChange={(e) =>
                onChange({
                  ...config,
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