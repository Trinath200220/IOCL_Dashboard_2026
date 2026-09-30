import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './RealTimeFlowChart.module.css';

const RealTimeFlowChart = () => {
  const data = [
    { name: 'Achieved', value: 8450 },
    { name: 'Remaining', value: 1550 },
  ];
  
  const COLORS = ['#22c55e', '#3b82f6']; // Green for achieved, Blue for remaining to match UI visually

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Real Time Flow</h3>
        <select className={styles.select}>
          <option>Today</option>
        </select>
      </div>

      <div className={styles.content}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.chartCenterText}>
            <div className={styles.centerValue}>8,450 KL</div>
            <div className={styles.centerLabel}>Total Treated</div>
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendLabel}>
              <div className={`${styles.dot} ${styles.blue}`}></div> Target
            </div>
            <div className={styles.legendValue}>10,000 KL</div>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendLabel}>
              <div className={`${styles.dot} ${styles.green}`}></div> Achieved
            </div>
            <div className={styles.legendValue}>8,450 KL</div>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendLabel}>
              <div className={`${styles.dot} ${styles.red}`}></div> Remaining
            </div>
            <div className={styles.legendValue}>1,550 KL</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeFlowChart;
