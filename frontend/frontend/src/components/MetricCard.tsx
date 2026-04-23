import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: string | number;
  isPositive?: boolean;
  suffix?: string;
}

export function MetricCard({ label, value, isPositive, suffix = '' }: MetricCardProps) {
  const getValueClass = () => {
    if (isPositive === undefined) return styles.neutral;
    return isPositive ? styles.positive : styles.negative;
  };

  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${getValueClass()}`}>
        {value}{suffix}
      </div>
    </div>
  );
}
