import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: number | null | undefined;
  isPositive?: boolean;
  suffix?: string;
  decimals?: number;
}

export function MetricCard({
  label,
  value,
  isPositive,
  suffix = '',
  decimals = 2
}: MetricCardProps) {
  const getValueClass = () => {
    if (value == null) return styles.neutral;
    if (isPositive === undefined) return styles.neutral;
    return isPositive ? styles.positive : styles.negative;
  };

  const formattedValue =
    value == null
      ? "—"
      : value.toFixed(decimals);

  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>

      <div className={`${styles.value} ${getValueClass()}`}>
        {formattedValue}{suffix}
      </div>
    </div>
  );
}