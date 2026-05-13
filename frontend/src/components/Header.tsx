import { Calendar } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  selectedAsset: string;
  dateRange: string;
  onLoadData: () => void;
}

export function Header({
  selectedAsset,
  dateRange,
  onLoadData,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>MarketWise</h1>
        <div className={styles.assetInfo}>
          <span>Asset:</span>
          <span>{selectedAsset}</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.dateRange}>
          <Calendar />
          <span>{dateRange}</span>
        </div>
        <button
          onClick={onLoadData}
          className={styles.loadButton}
        >
          Load Data
        </button>
      </div>
    </header>
  );
}