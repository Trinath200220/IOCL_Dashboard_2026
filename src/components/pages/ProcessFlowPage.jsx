import React, { useState } from 'react';
import { Download, Play, Square } from 'lucide-react';
import styles from './ProcessFlowPage.module.css';

import processFlowImg from '../../assets/process flow.png';

const ProcessFlowPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Process Flow Diagram</h2>
      </div>

      <div className={styles.diagramArea}>
        
        {/* Background 3D Image */}
        <img 
          src={processFlowImg} 
          alt="Process Flow Diagram" 
          className={styles.bgImage}
        />
      </div>
    </div>
  );
};

export default ProcessFlowPage;
