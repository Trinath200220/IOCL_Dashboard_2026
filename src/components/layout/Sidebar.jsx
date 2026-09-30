import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  GitMerge, 
  Table, 
  Box, 
  BarChart2, 
  Bell, 
  FileText, 
  Settings, 
  Users, 
  ClipboardList 
} from 'lucide-react';
import styles from './Sidebar.module.css';
import barifloLogo from '../../assets/bariflo-logo.png';
import ioclLogo from '../../assets/iocl-logo.gif';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: GitMerge, label: 'Process Flow', path: '/process-flow' },
  { icon: Table, label: 'Process Table', path: '/process-table' },
  { icon: Box, label: 'Assets', path: '/assets' },
  { icon: BarChart2, label: 'Real Time Monitoring', path: '/monitoring' },
  { icon: Bell, label: 'Alarms & Alerts', path: '/alarms' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: ClipboardList, label: 'Audit Trail', path: '/audit-trail' },
];

const Sidebar = ({ isOpen = true }) => {
  if (!isOpen) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={ioclLogo} alt="IndianOil" className={styles.logoImageIocl} />
        <div className={styles.divider}></div>
        <img src={barifloLogo} alt="Bariflo Cybernetics" className={styles.logoImageBariflo} />
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
              >
                <item.icon className={styles.navIcon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.systemStatus}>
        <div className={styles.statusHeader}>
          <div className={styles.statusDot}></div>
          <span>System Status</span>
        </div>
        <div className={styles.statusText}>All Systems Normal</div>
        
        <div className={styles.uptime}>Uptime</div>
        <div className={styles.uptimeValue}>12d 04h 35m</div>
        
        <div className={styles.version}>
          Version <span className={styles.versionValue}>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
