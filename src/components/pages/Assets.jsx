import React from 'react';
import { 
  Box, 
  Settings, 
  Database, 
  Workflow, 
  Gauge, 
  Download,
  Search,
  Power,
  Activity,
  AlertCircle,
  Zap,
  AlertTriangle,
  Droplet
} from 'lucide-react';
import styles from './Assets.module.css';

const StatusBadge = ({ status }) => {
  const normalizedStatus = status.toLowerCase();
  return (
    <div className={`${styles.statusBadge} ${styles[normalizedStatus]}`}>
      <div className={styles.statusDot}></div>
      {status}
    </div>
  );
};

const Assets = () => {
  return (
    <div className={styles.assetsContainer}>
      
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.leftHeader}>
          <h2 className={styles.title}>
            <Box size={24} color="#2563eb" /> Assets
          </h2>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${styles.active}`}>
              <Box size={16} /> All Assets
            </div>
            <div className={styles.tab}>
              <Settings size={16} /> Pumps
            </div>
            <div className={styles.tab}>
              <Database size={16} /> Tanks
            </div>
            <div className={styles.tab}>
              <Workflow size={16} /> Dosing Systems
            </div>
            <div className={styles.tab}>
              <Gauge size={16} /> Instruments
            </div>
          </div>
        </div>

        <div className={styles.rightHeader}>
          <select className={styles.filterSelect}>
            <option>All Status</option>
            <option>Running</option>
            <option>Stopped</option>
            <option>Maintenance</option>
          </select>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" placeholder="Search asset by name or code..." className={styles.searchInput} />
          </div>
          <button className={styles.exportBtn}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.total}`}>
            <Power size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Total Assets</span>
            <span className={styles.metricValue}>24</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.running}`}>
            <Activity size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Running</span>
            <span className={styles.metricValue}>18</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.stopped}`}>
            <AlertCircle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Stopped</span>
            <span className={styles.metricValue}>3</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.maintenance}`}>
            <Zap size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Maintenance</span>
            <span className={styles.metricValue}>2</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.fault}`}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Fault</span>
            <span className={styles.metricValue}>1</span>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className={styles.tablesGrid}>
        
        {/* Pumps Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}>
              <Droplet size={20} /> Pumps
            </div>
            <a href="#" className={styles.viewAll}>View All (8)</a>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Status</th>
                  <th>Flow (KL/hr)</th>
                  <th>Pressure (bar)</th>
                  <th>Runtime</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'WWT_PUMP_1', code: 'PMP-001', status: 'Running', flow: '125', pres: '3.2', run: '04:32' },
                  { id: 2, name: 'RAW_PUMP_1', code: 'PMP-002', status: 'Running', flow: '118', pres: '2.8', run: '04:21' },
                  { id: 3, name: 'RAW_PUMP_2', code: 'PMP-003', status: 'Running', flow: '110', pres: '2.7', run: '03:58' },
                  { id: 4, name: 'COAG_DOSING_PUMP', code: 'PMP-004', status: 'Running', flow: '8.5', pres: '1.2', run: '02:15' },
                  { id: 5, name: 'FLOC_DOSING_PUMP', code: 'PMP-005', status: 'Running', flow: '7.8', pres: '1.0', run: '02:10' },
                  { id: 6, name: 'FILTER_PUMP', code: 'PMP-006', status: 'Running', flow: '105', pres: '2.5', run: '03:42' },
                  { id: 7, name: 'DAF_PUMP', code: 'PMP-007', status: 'Stopped', flow: '0', pres: '0.0', run: '00:00' },
                  { id: 8, name: 'BACKWASH_PUMP', code: 'PMP-008', status: 'Maintenance', flow: '-', pres: '-', run: '01:20' },
                ].map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.code}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td>{row.flow}</td>
                    <td>{row.pres}</td>
                    <td>{row.run}</td>
                    <td><button className={styles.actionBtn}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tanks Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}>
              <Database size={20} /> Tanks
            </div>
            <a href="#" className={styles.viewAll}>View All (7)</a>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Level</th>
                  <th>Temperature</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'WASTEWATER_TANK', code: 'TK-001', level: '78%', temp: '28.2°C', status: 'Running' },
                  { id: 2, name: 'MIXING_TANK_1', code: 'TK-002', level: '72%', temp: '28.4°C', status: 'Running' },
                  { id: 3, name: 'CLEAN_WATER_TANK', code: 'TK-003', level: '66%', temp: '28.1°C', status: 'Running' },
                  { id: 4, name: 'COAGULATION_TANK', code: 'TK-004', level: '68%', temp: '28.0°C', status: 'Running' },
                  { id: 5, name: 'FLOCCULATION_TANK', code: 'TK-005', level: '62%', temp: '27.8°C', status: 'Running' },
                  { id: 6, name: 'FINAL_MIXING_TANK', code: 'TK-006', level: '70%', temp: '28.3°C', status: 'Running' },
                  { id: 7, name: 'DESLUDGING_TANK', code: 'TK-007', level: '58%', temp: '28.6°C', status: 'Running' },
                ].map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.code}</td>
                    <td>{row.level}</td>
                    <td>{row.temp}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td><button className={styles.actionBtn}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dosing Systems Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}>
              <Workflow size={20} /> Dosing Systems
            </div>
            <a href="#" className={styles.viewAll}>View All (4)</a>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Chemical</th>
                  <th>Dose Rate</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'COAGULANT_DOSING', code: 'DS-001', chem: 'Alum', rate: '2.5 L/hr', status: 'Running' },
                  { id: 2, name: 'FLOCCULANT_DOSING', code: 'DS-002', chem: 'Polymer', rate: '1.8 L/hr', status: 'Running' },
                  { id: 3, name: 'pH_DOSING', code: 'DS-003', chem: 'pH Adjuster', rate: '1.2 L/hr', status: 'Running' },
                  { id: 4, name: 'CHLORINE_DOSING', code: 'DS-004', chem: 'Chlorine', rate: '0.5 L/hr', status: 'Stopped' },
                ].map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.code}</td>
                    <td>{row.chem}</td>
                    <td>{row.rate}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td><button className={styles.actionBtn}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instruments Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}>
              <Gauge size={20} /> Instruments
            </div>
            <a href="#" className={styles.viewAll}>View All (6)</a>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Location</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'Flow Meter', code: 'INST-001', loc: 'Inlet', val: '125 KL/hr', status: 'Running' },
                  { id: 2, name: 'Pressure Sensor', code: 'INST-002', loc: 'Filter Inlet', val: '2.8 bar', status: 'Running' },
                  { id: 3, name: 'Level Sensor', code: 'INST-003', loc: 'Tanks', val: '72%', status: 'Running' },
                  { id: 4, name: 'pH Sensor', code: 'INST-004', loc: 'Mixing Tank', val: '7.2', status: 'Running' },
                  { id: 5, name: 'Temperature Sensor', code: 'INST-005', loc: 'Process Line', val: '28.4°C', status: 'Running' },
                  { id: 6, name: 'Turbidity Sensor', code: 'INST-006', loc: 'Final Tank', val: '12 NTU', status: 'Running' },
                ].map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.code}</td>
                    <td>{row.loc}</td>
                    <td>{row.val}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td><button className={styles.actionBtn}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Assets;
