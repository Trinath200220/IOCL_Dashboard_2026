import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from './ProcessTable.module.css';

const ProcessTable = () => {
  const tableData = [
    { id: 1, process: 'WASTE WATER PUMPING TO SSD TANK', treatment: 'ONCE ONLY IN THIS PROCESS', asset: 'WWT_PUMP_1, WWT_S1, WWT_S2', code: '-', start: '08:48 AM', end: '09:00 AM', status: 'Completed' },
    { id: 2, process: 'NORMAL WATER PUMPING TO COAGULANT TANK', treatment: 'ONCE ONLY IN THIS PROCESS', asset: 'RAW_PUMP_1, WWT_S1, WWT_S2', code: '-', start: '09:02 AM', end: '09:06 AM', status: 'Completed' },
    { id: 3, process: 'NORMAL WATER PUMPING TO FLOCCULANT TANK', treatment: 'ONCE ONLY IN THIS PROCESS', asset: 'RAW_PUMP_2, WWT_S1, WWT_S2', code: 'SINGLE SOURCE PUMP(RD)', start: '09:06 AM', end: '09:09 AM', status: 'Completed' },
    { id: 4, process: 'WASTE WATER PUMPING TO THE MIXING WATER TANK', treatment: 'AT THIS ONLY IN THIS PROCESS', asset: 'WWT_PUMP_2, WWT_S1, WWT_S2', code: '-', start: '09:08 AM', end: '09:11 AM', status: 'Completed' },
    { id: 5, process: 'COAGULANT PREPARATION', treatment: 'ONCE ONLY IN THIS PROCESS', asset: 'STEPPER_M_1', code: 'COAGULANT_AO', start: '09:15 AM', end: '09:16 AM', status: 'In Progress' },
    { id: 6, process: 'COAGULANT MIXING BEFORE REACTOR (BOPR)', treatment: 'ONCE ONLY IN THIS PROCESS', asset: 'COAGULANT_STEPPER_M_1', code: 'COAGULANT_AO', start: '09:17 AM', end: '09:27 AM', status: 'Pending' },
    { id: 7, process: 'DC PUMP START', treatment: 'A ONLY IN THIS PROCESS', asset: 'COAGULANT_PUMP_1', code: 'COAGULANT_AO', start: '09:30 AM', end: '09:31 AM', status: 'Pending' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return styles.statusCompleted;
      case 'In Progress': return styles.statusInProgress;
      case 'Pending': return styles.statusPending;
      default: return '';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.title}>
          Process Table <span className={styles.subtitle}>(Real Time - Cycle 1)</span>
        </div>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>PROCESS</th>
              <th>PROCESS N THIS TREATMENT 1</th>
              <th>ASSET</th>
              <th>CODE BLOCK</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.process}</td>
                <td>{row.treatment}</td>
                <td>{row.asset}</td>
                <td>{row.code}</td>
                <td>{row.start}</td>
                <td>{row.end}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span className={styles.showing}>Showing 1 to 7 of 21 entries</span>
        <div className={styles.pageControls}>
          <button className={styles.pageBtn}><ChevronsLeft size={14} /></button>
          <button className={styles.pageBtn}><ChevronLeft size={14} /></button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <button className={styles.pageBtn}><ChevronRight size={14} /></button>
          <button className={styles.pageBtn}><ChevronsRight size={14} /></button>
          
          <select className={styles.pageSelect}>
            <option>10 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProcessTable;
