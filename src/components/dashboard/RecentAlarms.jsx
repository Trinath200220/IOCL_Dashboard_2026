import React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './RecentAlarms.module.css';

const RecentAlarms = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Alarms</h3>
        <span className={styles.viewAll}>View All</span>
      </div>

      <div className={styles.alarmList}>
        <div className={styles.alarmItem}>
          <div className={styles.alarmInfo}>
            <AlertTriangle className={`${styles.icon} ${styles.red}`} size={16} />
            High Turbidity in Filtration Tank
          </div>
          <div className={styles.alarmTime}>09:12 AM</div>
          <div className={styles.badge}>Active</div>
        </div>
        
        <div className={styles.alarmItem}>
          <div className={styles.alarmInfo}>
            <AlertTriangle className={`${styles.icon} ${styles.yellow}`} size={16} />
            Low Air Pressure in DAF Tank
          </div>
          <div className={styles.alarmTime}>09:10 AM</div>
          <div className={styles.badge}>Active</div>
        </div>
      </div>
    </div>
  );
};

export default RecentAlarms;
