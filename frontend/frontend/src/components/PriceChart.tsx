import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import styles from './PriceChart.module.css';

interface ChartDataPoint {
  date: string;
  price: number;
  ma: number;
  signal?: 'buy' | 'sell';
}

interface PriceChartProps {
  data: ChartDataPoint[];
  showSignals: boolean;
}

export function PriceChart({ data, showSignals }: PriceChartProps) {
  const buySignals = data.filter(d => d.signal === 'buy');
  const sellSignals = data.filter(d => d.signal === 'sell');

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipDate}>{payload[0].payload.date}</p>
          <p className={styles.tooltipPrice}>
            Price: ${payload[0].value.toFixed(2)}
          </p>
          {payload[1] && (
            <p className={styles.tooltipMa}>
              MA: ${payload[1].value.toFixed(2)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Price Chart</h2>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendLine} ${styles.priceLine}`}></div>
            <span>Price</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendLine} ${styles.maLine}`}></div>
            <span>Moving Average</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="ma"
            stroke="#EAB308"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />

          {showSignals && buySignals.map((signal, i) => (
            <ReferenceDot
              key={`buy-${i}`}
              x={signal.date}
              y={signal.price}
              r={6}
              fill="#22C55E"
              stroke="#fff"
              strokeWidth={2}
              shape={(props: any) => (
                <polygon
                  points={`${props.cx},${props.cy - 8} ${props.cx - 6},${props.cy + 4} ${props.cx + 6},${props.cy + 4}`}
                  fill="#22C55E"
                  stroke="#fff"
                  strokeWidth={2}
                />
              )}
            />
          ))}

          {showSignals && sellSignals.map((signal, i) => (
            <ReferenceDot
              key={`sell-${i}`}
              x={signal.date}
              y={signal.price}
              r={6}
              fill="#EF4444"
              stroke="#fff"
              strokeWidth={2}
              shape={(props: any) => (
                <polygon
                  points={`${props.cx},${props.cy + 8} ${props.cx - 6},${props.cy - 4} ${props.cx + 6},${props.cy - 4}`}
                  fill="#EF4444"
                  stroke="#fff"
                  strokeWidth={2}
                />
              )}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className={styles.zoomControls}>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="100"
          className={styles.slider}
        />
        <div className={styles.sliderLabels}>
          <span>Zoom</span>
          <span>Timeline</span>
        </div>
      </div>
    </div>
  );
}
