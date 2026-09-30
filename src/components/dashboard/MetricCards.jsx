import React from 'react';
import { Droplet, Activity, Zap, Gauge, BellRing } from 'lucide-react';
import styles from './MetricCards.module.css';

const MetricCards = () => {
  return (
    <div className={styles.cardsContainer}>
      {/* Total Flow */}
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconWrapper} ${styles.blue}`}>
            <Droplet size={24} />
          </div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Total Flow (Today)</span>
            <span className={styles.cardValue}>8,450 KL</span>
            <span className={styles.cardSubtext}>of 10,000 KL</span>
          </div>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarBg}>
            <div className={`${styles.progressBarFill} ${styles.blue}`} style={{ width: '84.5%' }}></div>
          </div>
          <span className={styles.progressText}>84.5%</span>
        </div>
      </div>

      {/* Treated Water */}
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconWrapper} ${styles.green}`}>
            <Droplet size={24} />
          </div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Treated Water (Today)</span>
            <span className={styles.cardValue}>8,120 KL</span>
            <span className={styles.cardSubtext}>of 10,000 KL</span>
          </div>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarBg}>
            <div className={`${styles.progressBarFill} ${styles.green}`} style={{ width: '81.2%' }}></div>
          </div>
          <span className={styles.progressText}>81.2%</span>
        </div>
      </div>

      {/* Active Steps */}
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconWrapper} ${styles.purple}`}>
            <Activity size={24} />
          </div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Active Steps</span>
            <span className={styles.cardValue}>5 / 5</span>
          </div>
        </div>
        <div className={`${styles.statusText} ${styles.green}`}>Running</div>
      </div>

      {/* Energy Consumption */}
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconWrapper} ${styles.yellow}`}>
            <Zap size={24} />
          </div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Energy Consumption</span>
            <span className={styles.cardValue}>146.8 kWh</span>
          </div>
        </div>
        <div className={`${styles.statusText} ${styles.blue}`}>Today</div>
      </div>

      {/* System Efficiency */}
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconWrapper} ${styles.teal}`}>
            <Gauge size={24} />
          </div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>System Efficiency</span>
            <span className={styles.cardValue}>92.6%</span>
          </div>
        </div>
        <div className={`${styles.statusText} ${styles.green}`}>Good</div>
      </div>

      {/* Alarms */}
      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconWrapper} ${styles.red}`}>
            <BellRing size={24} />
          </div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Alarms</span>
            <span className={styles.cardValue}>2</span>
          </div>
        </div>
        <div className={`${styles.statusText} ${styles.red}`}>Active</div>
      </div>
    </div>
  );
};

export default MetricCards;
