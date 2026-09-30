import React from 'react';
import MetricCards from './MetricCards';
import ProcessFlowDiagram from './ProcessFlowDiagram';
import ProcessSteps from './ProcessSteps';
import ProcessTable from './ProcessTable';
import RealTimeFlowChart from './RealTimeFlowChart';
import RecentAlarms from './RecentAlarms';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <MetricCards />
      <ProcessFlowDiagram />
      <ProcessSteps />
      
      <div className={styles.bottomRow}>
        <div className={styles.tableSection}>
          <ProcessTable />
        </div>
        <div className={styles.rightSideSection}>
          <RealTimeFlowChart />
          <RecentAlarms />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
