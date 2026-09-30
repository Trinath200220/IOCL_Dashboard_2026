import React from 'react';
import { ArrowRight, Download, Settings, Droplet, Activity } from 'lucide-react';
import styles from './ProcessFlowDiagram.module.css';

const ProcessFlowDiagram = () => {
  return (
    <div className={`card ${styles.container}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Process Flow Diagram</h2>
        
        <button className={styles.exportBtn}>
          Export Report <Download size={16} />
        </button>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <ArrowRight size={14} /> Flow
          </div>
          <div className={styles.legendItem}>
            <span style={{ borderTop: '2px dashed var(--primary-blue)', width: '20px', display: 'inline-block' }}></span> 
            Chemical Dosing
          </div>
          <div className={styles.legendItem}>
            <Settings size={14} /> Pump
          </div>
          <div className={styles.legendItem}>
            <Activity size={14} /> Instrumentation
          </div>
        </div>
      </div>

      <div className={styles.flowDiagram}>
        
        {/* Node 1: Raw Water */}
        <div className={styles.node}>
          <div className={styles.textNode}>Raw Waste Water</div>
        </div>
        
        <div className={styles.connector}></div>

        {/* Node 2: Mixing Tank */}
        <div className={styles.node}>
          <div className={styles.instrument}>
            <div className={styles.instrumentIcon}><Activity size={14} /></div>
          </div>
          <div className={`${styles.tank} ${styles.yellow}`}>
            Mixing Tank
            <div className={styles.tankLabel}>(10KL)</div>
          </div>
        </div>

        <div className={styles.connector}></div>
        <div className={styles.pump}><Settings size={20} /></div>
        <div className={styles.connector}></div>

        {/* Node 3: Coagulant Dosing */}
        <div className={styles.node}>
          <div className={`${styles.tank} ${styles.green}`} style={{height: '60px'}}>
            Coagulant Dosing
          </div>
          <div className={styles.subNodeContainer}>
            <div className={`${styles.verticalConnector} ${styles.up}`}></div>
            <div className={`${styles.tank} ${styles.green}`} style={{height: '50px', backgroundColor: '#dcfce7', borderStyle: 'dashed'}}>
              Coagulant Powder
              <div className={styles.tankLabel}>(?)</div>
            </div>
          </div>
        </div>

        <div className={styles.connector}></div>

        {/* Node 4: Mixing Tank */}
        <div className={styles.node}>
          <div className={styles.instrument}>
            <div className={styles.instrumentIcon}><Activity size={14} /></div>
          </div>
          <div className={`${styles.tank} ${styles.yellow}`}>
            Mixing Tank
            <div className={styles.tankLabel}>(10KL)</div>
          </div>
        </div>

        <div className={styles.connector}></div>
        <div className={styles.pump}><Settings size={20} /></div>
        <div className={styles.connector}></div>

        {/* Node 5: Flocculation Dosing */}
        <div className={styles.node}>
          <div className={`${styles.tank} ${styles.red}`} style={{height: '60px'}}>
            Flocculation Dosing
          </div>
          <div className={styles.subNodeContainer}>
            <div className={`${styles.verticalConnector} ${styles.up}`}></div>
            <div className={`${styles.tank} ${styles.red}`} style={{height: '50px', backgroundColor: '#fee2e2', borderStyle: 'dashed'}}>
              Flocculant Powder
              <div className={styles.tankLabel}>(?)</div>
            </div>
          </div>
        </div>

        <div className={styles.connector}></div>

        {/* Node 6: Mixing Tank */}
        <div className={styles.node}>
          <div className={styles.instrument}>
            <div className={styles.instrumentIcon}><Activity size={14} /></div>
          </div>
          <div className={`${styles.tank} ${styles.yellow}`}>
            Mixing Tank
            <div className={styles.tankLabel}>(10KL)</div>
          </div>
        </div>

        <div className={styles.connector}></div>
        <div className={styles.pump}><Settings size={20} /></div>
        <div className={styles.connector}></div>

        {/* Node 7: Filtration Tank */}
        <div className={styles.node}>
          <div className={styles.instrument}>
            <div className={styles.instrumentIcon}><Activity size={14} /></div>
          </div>
          <div className={`${styles.tank} ${styles.orange}`}>
            Filtration Tank
            <div className={styles.tankLabel}>(10KL)</div>
          </div>
        </div>

        <div className={styles.connector}></div>
        <div className={styles.pump}><Settings size={20} /></div>
        <div className={styles.connector}></div>

        {/* Node 8: DAF Tank */}
        <div className={styles.node}>
          <div className={styles.instrument}>
            <div className={styles.instrumentIcon}><Activity size={14} /></div>
          </div>
          <div className={`${styles.tank} ${styles.yellow}`}>
            DAF Tank
            <div className={styles.tankLabel}>(10KL)</div>
          </div>
          <div className={styles.subNodeContainer}>
            <div className={`${styles.verticalConnector} ${styles.up} ${styles.dashed}`}></div>
            <div className={`${styles.tank} ${styles.lightBlue}`} style={{height: '50px'}}>
              Air Compressor
              <div className={styles.tankLabel}>(?)</div>
            </div>
          </div>
        </div>

        <div className={styles.connector}></div>

        {/* Node 9: Treated Water */}
        <div className={styles.node}>
          <div className={styles.textNode}>Treated Water</div>
        </div>

      </div>
    </div>
  );
};

export default ProcessFlowDiagram;
