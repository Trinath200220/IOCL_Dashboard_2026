import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, 
  Calendar, RefreshCw, Layers, PlayCircle, CheckCircle2, PauseCircle,
  Droplet, Droplets, FlaskConical, GitMerge, Container, ArrowRight,
  Search, Eye
} from 'lucide-react';
import styles from './ProcessTablePage.module.css';

const ProcessTablePage = () => {
  const [activeStage, setActiveStage] = useState('Waste Water');

  // Dummy Data for the metrics
  const metrics = [
    { title: 'Total Batches', value: '186', sub: 'All stages', icon: <Layers size={24} />, colorClass: 'blue' },
    { title: 'Running', value: '12', sub: '6.5%', icon: <PlayCircle size={24} />, colorClass: 'yellow' },
    { title: 'Completed', value: '162', sub: '87.1%', icon: <CheckCircle2 size={24} />, colorClass: 'green' },
    { title: 'Stopped', value: '8', sub: '4.3%', icon: <PauseCircle size={24} />, colorClass: 'red' },
  ];

  // Dummy Data for Stages
  const stages = [
    { name: 'Waste Water', count: '24 Batches', icon: <Droplet size={18} /> },
    { name: 'Clean Water', count: '22 Batches', icon: <Droplets size={18} /> },
    { name: 'Coagulation Dosing', count: '28 Batches', icon: <FlaskConical size={18} /> },
    { name: 'Coagulation Mixing', count: '30 Batches', icon: <GitMerge size={18} /> },
    { name: 'Flocculation Dosing', count: '18 Batches', icon: <FlaskConical size={18} /> },
    { name: 'Flocculation Mixing', count: '18 Batches', icon: <GitMerge size={18} /> },
    { name: 'Mixing Tank', count: '12 Batches', icon: <Container size={18} /> },
    { name: 'Desludging', count: '6 Batches', icon: <ArrowRight size={18} /> },
  ];

  // Dummy Data for Master Table (Batches)
  const masterBatches = [
    { id: 1, batchNo: 'STAGE-1-000001', status: 'Completed', start: '01 Oct 2026, 06:50 AM', end: '01 Oct 2026, 07:15 AM', duration: '25 mins' },
    { id: 2, batchNo: 'STAGE-1-000002', status: 'Completed', start: '01 Oct 2026, 07:20 AM', end: '01 Oct 2026, 07:45 AM', duration: '25 mins' },
    { id: 3, batchNo: 'STAGE-1-000003', status: 'Completed', start: '01 Oct 2026, 08:10 AM', end: '01 Oct 2026, 08:40 AM', duration: '30 mins' },
    { id: 4, batchNo: 'STAGE-1-000004', status: 'Running', start: '01 Oct 2026, 09:15 AM', end: '-', duration: '-' },
    { id: 5, batchNo: 'STAGE-1-000005', status: 'Running', start: '01 Oct 2026, 10:05 AM', end: '-', duration: '-' },
  ];

  // Dummy Data for Execution Logs
  const executionLogs = [
    { id: 1, name: 'Valve open', seq: 1, equip: 'Valve-01', target: '10,000', dur: '5', start: '01 Oct 2026, 09:15 AM', end: '01 Oct 2026, 09:15 AM', status: 'Completed' },
    { id: 2, name: 'Pump Motor start', seq: 2, equip: 'Pump-01', target: '10,000', dur: '5', start: '01 Oct 2026, 09:15 AM', end: '01 Oct 2026, 09:16 AM', status: 'Completed' },
    { id: 3, name: 'Sensor on', seq: 3, equip: 'Flow Sensor-01', target: '-', dur: '5', start: '01 Oct 2026, 09:16 AM', end: '01 Oct 2026, 09:16 AM', status: 'Completed' },
    { id: 4, name: 'Pump motor stop', seq: 4, equip: 'Pump-01', target: '-', dur: '-', start: '01 Oct 2026, 09:17 AM', end: '-', status: 'In Progress' },
    { id: 5, name: 'Sensor off', seq: 5, equip: 'Flow Sensor-01', target: '-', dur: '-', start: '-', end: '-', status: 'Pending' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return styles.statusCompleted;
      case 'Running': return styles.statusRunning;
      case 'Stopped': return styles.statusStopped;
      case 'In Progress': return styles.statusInProgress;
      case 'Pending': return styles.statusPending;
      default: return '';
    }
  };

  return (
    <div className={styles.dashboardContainer}>


      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <h1>Process Table Monitoring</h1>
          <p className={styles.subtitle}>View stage batches and their latest process execution logs.</p>
        </div>

      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, i) => (
          <div className={styles.metricCard} key={i}>
            <div className={`${styles.metricIcon} ${styles[metric.colorClass]}`}>
              {metric.icon}
            </div>
            <div className={styles.metricDetails}>
              <h3>{metric.title}</h3>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricSub}>{metric.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stage Tabs */}
      <div className={styles.stageTabs}>
        {stages.map((stage, i) => (
          <div 
            key={i} 
            className={`${styles.stageTab} ${activeStage === stage.name ? styles.active : ''}`}
            onClick={() => setActiveStage(stage.name)}
          >
            <div className={styles.stageTabIcon}>{stage.icon}</div>
            <div>
              <div className={styles.stageTabTitle}>{stage.name}</div>
              <div className={styles.stageTabSubtitle}>{stage.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Master Batches Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            Stage: {activeStage} <span className={styles.inletBadge}>Inlet</span>
          </div>
          <div className={styles.tableFilters}>
            <select className={styles.filterSelect}>
              <option>All Status</option>
              <option>Completed</option>
              <option>Running</option>
            </select>
            <div className={styles.searchBox}>
              <Search size={16} color="#94a3b8" />
              <input type="text" placeholder="Search batch number..." className={styles.searchInput} />
            </div>

          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Batch Number</th>
              <th>Status</th>
              <th>Started At</th>
              <th>Completed At</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {masterBatches.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td style={{fontWeight: 500, color: '#1e293b'}}>{row.batchNo}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.start}</td>
                <td>{row.end}</td>
                <td>{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.showingText}>Showing 1 to 5 of 24 entries</span>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn}><ChevronsLeft size={14} /></button>
            <button className={styles.pageBtn}><ChevronLeft size={14} /></button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}>4</button>
            <button className={styles.pageBtn}>5</button>
            <button className={styles.pageBtn}><ChevronRight size={14} /></button>
            <button className={styles.pageBtn}><ChevronsRight size={14} /></button>
            <select className={styles.pageSelect}>
              <option>5 / page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Details Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            Latest Process Execution Logs (Batch: STAGE-1-000004)
            <span className={`${styles.statusBadge} ${styles.statusRunning}`} style={{marginLeft: '8px', fontSize: '12px'}}>Running</span>
          </div>

        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Process Name</th>
              <th>Sequence</th>
              <th>Equipment</th>
              <th>Target Volume (L)</th>
              <th>Duration (sec)</th>
              <th>Started At</th>
              <th>Completed At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {executionLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td style={{fontWeight: 500, color: '#1e293b'}}>{log.name}</td>
                <td>{log.seq}</td>
                <td>{log.equip}</td>
                <td>{log.target}</td>
                <td>{log.dur}</td>
                <td>{log.start}</td>
                <td>{log.end}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProcessTablePage;
