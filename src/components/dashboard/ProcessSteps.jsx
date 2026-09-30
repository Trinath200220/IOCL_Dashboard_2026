import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './ProcessSteps.module.css';

const ProcessSteps = () => {
  const steps = [
    { num: 1, label: 'Step 1', name: 'Mixing Tank', sub: '(10KL)', status: 'Running', color: 'yellow' },
    { num: 2, label: 'Step 2', name: 'Coagulant Dosing', sub: '', status: 'Running', color: 'green' },
    { num: 3, label: 'Step 3', name: 'Flocculation Dosing', sub: '', status: 'Running', color: 'red' },
    { num: 4, label: 'Step 4', name: 'Filtration Tank', sub: '', status: 'Running', color: 'orange' },
    { num: 5, label: 'Step 5', name: 'DAF Tank', sub: '', status: 'Running', color: 'yellow' },
  ];

  return (
    <div className={styles.stepsContainer}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepCard}>
          <div className={styles.stepHeader}>
            <div className={`${styles.stepNumber} ${styles[step.color]}`}>{step.num}</div>
            <div className={styles.stepInfo}>
              <span className={styles.stepLabel}>{step.label}</span>
              <span className={styles.stepName}>{step.name}</span>
              {step.sub && <span className={styles.stepSub}>{step.sub}</span>}
            </div>
            <ChevronRight className={styles.arrowIcon} size={20} />
          </div>
          <div className={`${styles.stepStatus} ${styles.running}`}>
            <div className={`${styles.statusDot} ${styles.running}`}></div>
            {step.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;
