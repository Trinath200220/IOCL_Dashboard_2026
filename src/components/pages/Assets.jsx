import React from 'react';
import { 
  Box, 
  Settings, 
  Database, 
  Gauge, 
  Download,
  Search,
  AlertCircle,
  AlertTriangle,
  MapPin, 
  Filter,
  ArrowRight,
  CheckCircle,
  Wrench,
  FlaskConical,
  Package,
  Cpu,
  GitFork
} from 'lucide-react';
import pumpIcon from '../../assets/pump-icon.png';
import tankIcon from '../../assets/Tank.png';
import dosingSystemIcon from '../../assets/DosingSystem.png';
import instrumentIcon from '../../assets/Instrument.png';
import valveIcon from '../../assets/Valves.png';
import othersIcon from '../../assets/Others.png';
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

// --- Dummy Data ---
const categoryCardsData = [
  {
    title: 'Pumps', count: 8, icon: <img src={pumpIcon} alt="Pump" style={{width: 28, height: 28, objectFit: 'contain'}} />,
    items: [
      { name: 'Raw Water Pump', statusText: '2 Running', status: 'running' },
      { name: 'Coagulant Dosing Pump', statusText: '1 Running', status: 'running' },
      { name: 'Flocculant Dosing Pump', statusText: '1 Running', status: 'running' },
      { name: 'Transfer Pump', statusText: '2 Running', status: 'running' },
      { name: 'Sludge Pump', statusText: '1 Stopped', status: 'stopped' },
      { name: 'Backwash Pump', statusText: '1 Running', status: 'running' },
    ]
  },
  {
    title: 'Tanks', count: 7, icon: <img src={tankIcon} alt="Tank" style={{width: 28, height: 28, objectFit: 'contain'}} />,
    items: [
      { name: 'Wastewater Tank', statusText: '1 Running', status: 'running' },
      { name: 'Mixing Tank', statusText: '2 Running', status: 'running' },
      { name: 'Clean Water Tank', statusText: '1 Running', status: 'running' },
      { name: 'Coagulation Tank', statusText: '1 Running', status: 'running' },
      { name: 'Flocculation Tank', statusText: '1 Running', status: 'running' },
      { name: 'Final Mixing Tank', statusText: '1 Running', status: 'running' },
    ]
  },
  {
    title: 'Dosing Systems', count: 4, icon: <img src={dosingSystemIcon} alt="Dosing System" style={{width: 28, height: 28, objectFit: 'contain'}} />,
    items: [
      { name: 'Coagulant Dosing System', statusText: '1 Running', status: 'running' },
      { name: 'Flocculant Dosing System', statusText: '1 Running', status: 'running' },
      { name: 'Chlorine Dosing System', statusText: '1 Running', status: 'running' },
      { name: 'pH Dosing System', statusText: '1 Stopped', status: 'stopped' },
    ]
  },
  {
    title: 'Instruments', count: 6, icon: <img src={instrumentIcon} alt="Instrument" style={{width: 28, height: 28, objectFit: 'contain'}} />,
    items: [
      { name: 'Flow Meter', statusText: '1 Running', status: 'running' },
      { name: 'Pressure Sensor', statusText: '2 Running', status: 'running' },
      { name: 'pH Sensor', statusText: '1 Running', status: 'running' },
      { name: 'Turbidity Sensor', statusText: '1 Running', status: 'running' },
      { name: 'Level Sensor', statusText: '1 Running', status: 'running' },
      { name: 'Temperature Sensor', statusText: '1 Running', status: 'running' },
    ]
  },
  {
    title: 'Valves', count: 3, icon: <img src={valveIcon} alt="Valve" style={{width: 28, height: 28, objectFit: 'contain'}} />,
    items: [
      { name: 'Control Valve', statusText: '2 Running', status: 'running' },
      { name: 'Isolation Valve', statusText: '1 Running', status: 'running' },
      { name: 'Check Valve', statusText: '3 Stopped', status: 'stopped' },
    ]
  },
  {
    title: 'Others', count: 2, icon: <img src={othersIcon} alt="Others" style={{width: 28, height: 28, objectFit: 'contain'}} />,
    items: [
      { name: 'Blower', statusText: '2 Running', status: 'running' },
      { name: 'Agitator', statusText: '1 Running', status: 'running' },
    ]
  }
];

const masterTableData = [
  { id: 1, name: 'Raw Water Pump 1', type: 'Pump', code: 'PMP-001', loc: 'Inlet Section', status: 'Running', seen: '2 mins ago' },
  { id: 2, name: 'Raw Water Pump 2', type: 'Pump', code: 'PMP-002', loc: 'Inlet Section', status: 'Running', seen: '3 mins ago' },
  { id: 3, name: 'Coagulant Dosing Pump', type: 'Dosing Pump', code: 'DP-001', loc: 'Coagulation Tank', status: 'Running', seen: '4 mins ago' },
  { id: 4, name: 'Flocculant Dosing Pump', type: 'Dosing Pump', code: 'DP-002', loc: 'Flocculation Tank', status: 'Running', seen: '5 mins ago' },
  { id: 5, name: 'Mixing Tank 1', type: 'Tank', code: 'TK-001', loc: 'Mixing Section', status: 'Running', seen: '6 mins ago' },
  { id: 6, name: 'Mixing Tank 2', type: 'Tank', code: 'TK-002', loc: 'Mixing Section', status: 'Running', seen: '7 mins ago' },
  { id: 7, name: 'Clean Water Tank', type: 'Tank', code: 'TK-003', loc: 'Clean Water Section', status: 'Running', seen: '8 mins ago' },
  { id: 8, name: 'Flocculation Tank', type: 'Tank', code: 'TK-005', loc: 'Flocculation Section', status: 'Stopped', seen: '12 mins ago' },
];

const Assets = () => {
  return (
    <div className={styles.assetsContainer}>
      
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.leftHeader}>
          <h2 className={styles.title}>
            <Box size={24} color="#2563eb" /> Assets
          </h2>
        </div>

        <div className={styles.rightHeader}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" placeholder="Search assets by name, code or type..." className={styles.searchInput} />
          </div>
          <button className={styles.filterBtn}>
            <Filter size={16} /> Filter
          </button>
          <button className={styles.exportBtn}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.total}`}>
            <Box size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Total Assets</span>
            <span className={styles.metricValue}>24</span>
            <span className={styles.metricSubtitle}>Installed Equipment</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.running}`}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Running</span>
            <span className={styles.metricValue}>18</span>
            <span className={styles.metricSubtitle}>75% of Total</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.stopped}`}>
            <AlertCircle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Stopped</span>
            <span className={styles.metricValue}>3</span>
            <span className={styles.metricSubtitle}>12% of Total</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.maintenance}`}>
            <Wrench size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Maintenance</span>
            <span className={styles.metricValue}>2</span>
            <span className={styles.metricSubtitle}>8% of Total</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.iconBox} ${styles.fault}`}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Fault</span>
            <span className={styles.metricValue}>1</span>
            <span className={styles.metricSubtitle}>4% of Total</span>
          </div>
        </div>
      </div>

      {/* Category Summary Cards Grid */}
      <div className={styles.categoryGrid}>
        {categoryCardsData.map((card, idx) => (
          <div className={styles.categoryCard} key={idx}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryTitleBox}>
                <div className={styles.categoryIcon}>
                  {card.icon}
                </div>
                <div>
                  <div className={styles.categoryTitle}>{card.title}</div>
                  <div className={styles.categoryCount}>{card.count} Assets</div>
                </div>
              </div>
              <a href="#" className={styles.viewAllBtn}>View All <ArrowRight size={14} /></a>
            </div>
            
            <div className={styles.categoryList}>
              {card.items.map((item, itemIdx) => (
                <div className={styles.categoryListItem} key={itemIdx}>
                  <div className={styles.listItemName}>
                    <div className={styles.listDot}></div>
                    {item.name}
                  </div>
                  <div className={`${styles.listItemStatus} ${styles[item.status]}`}>
                    <div className={styles.statusDotSmall}></div>
                    {item.statusText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Asset Details Master Table */}
      <div className={styles.masterTableCard}>
        <div className={styles.masterTableHeader}>
          <div className={styles.masterTableTitle}>
            <MapPin size={20} color="#2563eb" /> Asset Details
          </div>
          <div className={styles.masterTableActions}>
            <select className={styles.categorySelect}>
              <option>All Categories</option>
              <option>Pumps</option>
              <option>Tanks</option>
            </select>
            <div className={styles.searchBoxSmall}>
              <Search size={14} className={styles.searchIconSmall} />
              <input type="text" placeholder="Search assets..." className={styles.searchInputSmall} />
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Code</th>
                <th>Location</th>
                <th>Status</th>
                <th>Last Seen</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {masterTableData.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className={styles.primaryCell}>{row.name}</td>
                  <td>{row.type}</td>
                  <td>{row.code}</td>
                  <td>{row.loc}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td className={styles.lastSeenCell}>{row.seen}</td>
                  <td><button className={styles.actionBtn}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Assets;
