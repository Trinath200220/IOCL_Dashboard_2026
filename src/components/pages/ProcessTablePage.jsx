// import React, { useState } from 'react';
// import { 
//   ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, 
//   Calendar, RefreshCw, Layers, PlayCircle, CheckCircle2, PauseCircle,
//   Droplet, Droplets, FlaskConical, GitMerge, Container, ArrowRight,
//   Search, Eye
// } from 'lucide-react';
// import styles from './ProcessTablePage.module.css';

// const ProcessTablePage = () => {
//   const [activeStage, setActiveStage] = useState('Waste Water');
//     const [stages, setStages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//    useEffect(() => {
//     const fetchStages = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Call the API
//         const response = await getStagesWithBatches();

//         if (response.success && Array.isArray(response.data)) {
//           const stagesData = response.data;

//           // Find only the required stage IDs
//           const wasteWaterId = stagesData.find(
//             (stage) => stage.name === "Waste Water"
//           )?.id;

//           const cleanWaterId = stagesData.find(
//             (stage) => stage.name === "Clean Water"
//           )?.id;

//           const mixingTankId = stagesData.find(
//             (stage) => stage.name === "Mixing Tank"
//           )?.id;

//           // Store each ID separately in localStorage
//           if (wasteWaterId !== undefined) {
//             localStorage.setItem(
//               "wasteWaterId",
//               String(wasteWaterId)
//             );
//           }

//           if (cleanWaterId !== undefined) {
//             localStorage.setItem(
//               "cleanWaterId",
//               String(cleanWaterId)
//             );
//           }

//           if (mixingTankId !== undefined) {
//             localStorage.setItem(
//               "mixingTankId",
//               String(mixingTankId)
//             );
//           }

//           // Keep the API data for displaying stages and batches
//           setStages(stagesData);

//           // Check the stored values
//           console.log(
//             "Waste Water ID:",
//             localStorage.getItem("wasteWaterId")
//           );
//           console.log(
//             "Clean Water ID:",
//             localStorage.getItem("cleanWaterId")
//           );
//           console.log(
//             "Mixing Tank ID:",
//             localStorage.getItem("mixingTankId")
//           );
//         } else {
//           setError("Failed to fetch treatment stages.");
//         }
//       } catch (err) {
//         console.error("API calling error:", err);
//         setError("Unable to load treatment stages. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStages();
//   }, []);

//   if (loading) {
//     return <div>Loading treatment stages...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Dummy Data for the metrics
//   const metrics = [
//     { title: 'Total Batches', value: '186', sub: 'All stages', icon: <Layers size={24} />, colorClass: 'blue' },
//     { title: 'Running', value: '12', sub: '6.5%', icon: <PlayCircle size={24} />, colorClass: 'yellow' },
//     { title: 'Completed', value: '162', sub: '87.1%', icon: <CheckCircle2 size={24} />, colorClass: 'green' },
//     { title: 'Stopped', value: '8', sub: '4.3%', icon: <PauseCircle size={24} />, colorClass: 'red' },
//   ];

//   // Dummy Data for Stages
//   const stages = [
//     { name: 'Waste Water', count: '24 Batches', icon: <Droplet size={18} /> },
//     { name: 'Clean Water', count: '22 Batches', icon: <Droplets size={18} /> },
//     { name: 'Coagulation Dosing', count: '28 Batches', icon: <FlaskConical size={18} /> },
//     { name: 'Coagulation Mixing', count: '30 Batches', icon: <GitMerge size={18} /> },
//     { name: 'Flocculation Dosing', count: '18 Batches', icon: <FlaskConical size={18} /> },
//     { name: 'Flocculation Mixing', count: '18 Batches', icon: <GitMerge size={18} /> },
//     { name: 'Mixing Tank', count: '12 Batches', icon: <Container size={18} /> },
//     { name: 'Desludging', count: '6 Batches', icon: <ArrowRight size={18} /> },
//   ];

//   // Dummy Data for Master Table (Batches)
//   const masterBatches = [
//     { id: 1, batchNo: 'STAGE-1-000001', status: 'Completed', start: '01 Oct 2026, 06:50 AM', end: '01 Oct 2026, 07:15 AM', duration: '25 mins' },
//     { id: 2, batchNo: 'STAGE-1-000002', status: 'Completed', start: '01 Oct 2026, 07:20 AM', end: '01 Oct 2026, 07:45 AM', duration: '25 mins' },
//     { id: 3, batchNo: 'STAGE-1-000003', status: 'Completed', start: '01 Oct 2026, 08:10 AM', end: '01 Oct 2026, 08:40 AM', duration: '30 mins' },
//     { id: 4, batchNo: 'STAGE-1-000004', status: 'Running', start: '01 Oct 2026, 09:15 AM', end: '-', duration: '-' },
//     { id: 5, batchNo: 'STAGE-1-000005', status: 'Running', start: '01 Oct 2026, 10:05 AM', end: '-', duration: '-' },
//   ];

//   // Dummy Data for Execution Logs
//   const executionLogs = [
//     { id: 1, name: 'Valve open', seq: 1, equip: 'Valve-01', target: '10,000', dur: '5', start: '01 Oct 2026, 09:15 AM', end: '01 Oct 2026, 09:15 AM', status: 'Completed' },
//     { id: 2, name: 'Pump Motor start', seq: 2, equip: 'Pump-01', target: '10,000', dur: '5', start: '01 Oct 2026, 09:15 AM', end: '01 Oct 2026, 09:16 AM', status: 'Completed' },
//     { id: 3, name: 'Sensor on', seq: 3, equip: 'Flow Sensor-01', target: '-', dur: '5', start: '01 Oct 2026, 09:16 AM', end: '01 Oct 2026, 09:16 AM', status: 'Completed' },
//     { id: 4, name: 'Pump motor stop', seq: 4, equip: 'Pump-01', target: '-', dur: '-', start: '01 Oct 2026, 09:17 AM', end: '-', status: 'In Progress' },
//     { id: 5, name: 'Sensor off', seq: 5, equip: 'Flow Sensor-01', target: '-', dur: '-', start: '-', end: '-', status: 'Pending' },
//   ];

//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'Completed': return styles.statusCompleted;
//       case 'Running': return styles.statusRunning;
//       case 'Stopped': return styles.statusStopped;
//       case 'In Progress': return styles.statusInProgress;
//       case 'Pending': return styles.statusPending;
//       default: return '';
//     }
//   };

//   return (
//     <div className={styles.dashboardContainer}>


//       {/* Header */}
//       <div className={styles.header}>
//         <div className={styles.titleBox}>
//           <h1>Process Table Monitoring</h1>
//           <p className={styles.subtitle}>View stage batches and their latest process execution logs.</p>
//         </div>

//       </div>

//       {/* Metrics Grid */}
//       <div className={styles.metricsGrid}>
//         {metrics.map((metric, i) => (
//           <div className={styles.metricCard} key={i}>
//             <div className={`${styles.metricIcon} ${styles[metric.colorClass]}`}>
//               {metric.icon}
//             </div>
//             <div className={styles.metricDetails}>
//               <h3>{metric.title}</h3>
//               <p className={styles.metricValue}>{metric.value}</p>
//               <p className={styles.metricSub}>{metric.sub}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Stage Tabs */}
//       <div className={styles.stageTabs}>
//         {stages.map((stage, i) => (
//           <div 
//             key={i} 
//             className={`${styles.stageTab} ${activeStage === stage.name ? styles.active : ''}`}
//             onClick={() => setActiveStage(stage.name)}
//           >
//             <div className={styles.stageTabIcon}>{stage.icon}</div>
//             <div>
//               <div className={styles.stageTabTitle}>{stage.name}</div>
//               <div className={styles.stageTabSubtitle}>{stage.count}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Master Batches Table Section */}
//       <div className={styles.tableSection}>
//         <div className={styles.sectionHeader}>
//           <div className={styles.sectionTitle}>
//             Stage: {activeStage} <span className={styles.inletBadge}>Inlet</span>
//           </div>
//           <div className={styles.tableFilters}>
//             <select className={styles.filterSelect}>
//               <option>All Status</option>
//               <option>Completed</option>
//               <option>Running</option>
//             </select>
//             <div className={styles.searchBox}>
//               <Search size={16} color="#94a3b8" />
//               <input type="text" placeholder="Search batch number..." className={styles.searchInput} />
//             </div>

//           </div>
//         </div>

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Batch Number</th>
//               <th>Status</th>
//               <th>Started At</th>
//               <th>Completed At</th>
//               <th>Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {masterBatches.map((row) => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td style={{fontWeight: 500, color: '#1e293b'}}>{row.batchNo}</td>
//                 <td>
//                   <span className={`${styles.statusBadge} ${getStatusClass(row.status)}`}>
//                     {row.status}
//                   </span>
//                 </td>
//                 <td>{row.start}</td>
//                 <td>{row.end}</td>
//                 <td>{row.duration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className={styles.pagination}>
//           <span className={styles.showingText}>Showing 1 to 5 of 24 entries</span>
//           <div className={styles.pageControls}>
//             <button className={styles.pageBtn}><ChevronsLeft size={14} /></button>
//             <button className={styles.pageBtn}><ChevronLeft size={14} /></button>
//             <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
//             <button className={styles.pageBtn}>2</button>
//             <button className={styles.pageBtn}>3</button>
//             <button className={styles.pageBtn}>4</button>
//             <button className={styles.pageBtn}>5</button>
//             <button className={styles.pageBtn}><ChevronRight size={14} /></button>
//             <button className={styles.pageBtn}><ChevronsRight size={14} /></button>
//             <select className={styles.pageSelect}>
//               <option>5 / page</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Details Table Section */}
//       <div className={styles.tableSection}>
//         <div className={styles.sectionHeader}>
//           <div className={styles.sectionTitle}>
//             Latest Process Execution Logs (Batch: STAGE-1-000004)
//             <span className={`${styles.statusBadge} ${styles.statusRunning}`} style={{marginLeft: '8px', fontSize: '12px'}}>Running</span>
//           </div>

//         </div>

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Process Name</th>
//               <th>Sequence</th>
//               <th>Equipment</th>
//               <th>Target Volume (L)</th>
//               <th>Duration (sec)</th>
//               <th>Started At</th>
//               <th>Completed At</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {executionLogs.map((log) => (
//               <tr key={log.id}>
//                 <td>{log.id}</td>
//                 <td style={{fontWeight: 500, color: '#1e293b'}}>{log.name}</td>
//                 <td>{log.seq}</td>
//                 <td>{log.equip}</td>
//                 <td>{log.target}</td>
//                 <td>{log.dur}</td>
//                 <td>{log.start}</td>
//                 <td>{log.end}</td>
//                 <td>
//                   <span className={`${styles.statusBadge} ${getStatusClass(log.status)}`}>
//                     {log.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default ProcessTablePage;



import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Layers,
  PlayCircle,
  CheckCircle2,
  PauseCircle,
  Droplet,
  Droplets,
  FlaskConical,
  GitMerge,
  Container,
  ArrowRight,
  Search,
} from "lucide-react";

import styles from "./ProcessTablePage.module.css";
import { getStagesWithBatches } from "../../services/processTableService";

const getStageIcon = (stageName) => {
  const name = stageName.toLowerCase();

  if (name.includes("waste water")) return <Droplet size={18} />;
  if (name.includes("clean water")) return <Droplets size={18} />;
  if (name.includes("dosing")) return <FlaskConical size={18} />;
  if (name.includes("mixing")) return <GitMerge size={18} />;
  if (name.includes("tank")) return <Container size={18} />;
  if (name.includes("desludging")) return <ArrowRight size={18} />;

  return <Layers size={18} />;
};

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDuration = (startedAt, completedAt) => {
  if (!startedAt || !completedAt) return "-";

  const start = new Date(startedAt).getTime();
  const end = new Date(completedAt).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
    return "-";
  }

  const minutes = Math.floor((end - start) / 60000);
  const seconds = Math.floor(((end - start) % 60000) / 1000);

  if (minutes > 0) return `${minutes} min ${seconds} sec`;

  return `${seconds} sec`;
};

const formatStatus = (status) => {
  if (!status) return "Unknown";

  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getStatusClass = (status) => {
  const normalizedStatus = (status || "")
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  switch (normalizedStatus) {
    case "COMPLETED":
      return styles.statusCompleted;

    case "RUNNING":
    case "IN_PROGRESS":
      return styles.statusRunning;

    case "STOPPED":
    case "FAILED":
      return styles.statusStopped;

    case "PENDING":
      return styles.statusPending;

    default:
      return "";
  }
};

const ProcessTablePage = () => {
  const [activeStage, setActiveStage] = useState("Waste Water");
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  // true only until the first successful response
  const isFirstLoad = useRef(true);

  // Fetch stages and their batches from the API (initial + every 3 seconds)
  useEffect(() => {
    const fetchStages = async () => {
      try {
        if (isFirstLoad.current) {
          setLoading(true);
        }
        setError("");

        const response = await getStagesWithBatches();

        if (!response.success || !Array.isArray(response.data)) {
          throw new Error("Failed to fetch treatment stages.");
        }

        const stagesData = response.data;

        // Store only the required stage IDs separately.
        const wasteWaterId = stagesData.find(
          (stage) => stage.name === "Waste Water"
        )?.id;

        const cleanWaterId = stagesData.find(
          (stage) => stage.name === "Clean Water"
        )?.id;

        const mixingTankId = stagesData.find(
          (stage) => stage.name === "Mixing Tank"
        )?.id;

        if (wasteWaterId != null) {
          localStorage.setItem("wasteWaterId", String(wasteWaterId));
        }

        if (cleanWaterId != null) {
          localStorage.setItem("cleanWaterId", String(cleanWaterId));
        }

        if (mixingTankId != null) {
          localStorage.setItem("mixingTankId", String(mixingTankId));
        }

        setStages(stagesData);

        // Keep current tab if it still exists; otherwise pick Waste Water / first stage
        setActiveStage((prev) => {
          const stillExists = stagesData.some((s) => s.name === prev);
          if (stillExists) return prev;

          const initialStage = stagesData.find(
            (stage) => stage.name === "Waste Water"
          );
          return initialStage?.name || stagesData[0]?.name || prev;
        });

        isFirstLoad.current = false;
      } catch (err) {
        console.error("Error fetching stages:", err);
        setError(
          err.message || "Unable to load treatment stages. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    // Call immediately on mount
    fetchStages();

    // Then every 2 seconds
    const intervalId = setInterval(fetchStages, 2000);

    // Cleanup when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const selectedStage = stages.find((stage) => stage.name === activeStage);

  const batches = selectedStage?.batches || [];

  const selectedBatch = batches.find((batch) => batch.id === selectedBatchId);

  // Execution logs for the selected batch
  const executionLogs = selectedBatch?.process_executions || [];

  // Search and status filtering.
  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const matchesSearch = (batch.batch_number || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        (batch.status || "").toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [batches, searchText, statusFilter]);

  // Calculate metrics from the batches returned by the API.
  const allBatches = stages.flatMap((stage) => stage.batches || []);

  const totalBatches = allBatches.length;

  const completedCount = allBatches.filter(
    (batch) => (batch.status || "").toUpperCase() === "COMPLETED"
  ).length;

  const runningCount = allBatches.filter((batch) =>
    ["RUNNING", "IN_PROGRESS"].includes((batch.status || "").toUpperCase())
  ).length;

  const stoppedCount = allBatches.filter((batch) =>
    ["STOPPED", "FAILED"].includes((batch.status || "").toUpperCase())
  ).length;

  const metrics = [
    {
      title: "Total Batches",
      value: totalBatches,
      sub: "All stages",
      icon: <Layers size={24} />,
      colorClass: "blue",
    },
    {
      title: "Running",
      value: runningCount,
      sub: totalBatches
        ? `${((runningCount / totalBatches) * 100).toFixed(1)}%`
        : "0%",
      icon: <PlayCircle size={24} />,
      colorClass: "yellow",
    },
    {
      title: "Completed",
      value: completedCount,
      sub: totalBatches
        ? `${((completedCount / totalBatches) * 100).toFixed(1)}%`
        : "0%",
      icon: <CheckCircle2 size={24} />,
      colorClass: "green",
    },
    {
      title: "Stopped",
      value: stoppedCount,
      sub: totalBatches
        ? `${((stoppedCount / totalBatches) * 100).toFixed(1)}%`
        : "0%",
      icon: <PauseCircle size={24} />,
      colorClass: "red",
    },
  ];

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        Loading treatment stages...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <h1>Process Table Monitoring</h1>
          <p className={styles.subtitle}>
            View stage batches and their latest process execution logs.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <div className={styles.metricCard} key={metric.title}>
            <div
              className={`${styles.metricIcon} ${styles[metric.colorClass]}`}
            >
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

      {/* Dynamic Stage Tabs */}
      <div className={styles.stageTabs}>
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`${styles.stageTab} ${
              activeStage === stage.name ? styles.active : ""
            }`}
            onClick={() => {
              setActiveStage(stage.name);
              setSelectedBatchId(null);
              setSearchText("");
              setStatusFilter("ALL");
            }}
          >
            <div className={styles.stageTabIcon}>
              {getStageIcon(stage.name)}
            </div>

            <div>
              <div className={styles.stageTabTitle}>{stage.name}</div>
              <div className={styles.stageTabSubtitle}>
                {stage.batches_count ?? stage.batches?.length ?? 0} Batches
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Stage Batches */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            Stage: {selectedStage?.name || activeStage}
          </div>

          <div className={styles.tableFilters}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="RUNNING">Running</option>
              <option value="STOPPED">Stopped</option>
              <option value="FAILED">Failed</option>
            </select>

            <div className={styles.searchBox}>
              <Search size={16} color="#94a3b8" />

              <input
                type="text"
                placeholder="Search batch number..."
                className={styles.searchInput}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.tableScrollWrapper}>
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
              {filteredBatches.length > 0 ? (
                filteredBatches.map((batch, index) => (
                  <tr
                    key={batch.id}
                    onClick={() => setSelectedBatchId(batch.id)}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedBatchId === batch.id ? "#eff6ff" : undefined,
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{batch.batch_number || "-"}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          batch.status
                        )}`}
                      >
                        {formatStatus(batch.status)}
                      </span>
                    </td>
                    <td>{formatDate(batch.started_at)}</td>
                    <td>{formatDate(batch.completed_at)}</td>
                    <td>
                      {formatDuration(batch.started_at, batch.completed_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No batches found for this stage.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Execution Logs */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            Process Execution Logs
            {selectedBatch && (
              <span style={{ marginLeft: "8px" }}>
                (Batch: {selectedBatch.batch_number})
              </span>
            )}
          </div>
        </div>

        {!selectedBatch ? (
          <p style={{ padding: "16px" }}>
            Select a batch from the {activeStage} table to view its execution
            logs.
          </p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Process Name</th>
                <th>Sequence</th>
                <th>Equipment</th>
                <th>Started At</th>
                <th>Completed At</th>
                <th>Duration (sec)</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {executionLogs.length > 0 ? (
                executionLogs.map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1}</td>
                    <td>{log.process?.name || "-"}</td>
                    <td>{log.process?.sequence ?? "-"}</td>
                    <td>
                      {log.process?.equipments?.length > 0
                        ? log.process.equipments
                            .map((equipment) => equipment.name)
                            .join(", ")
                        : "-"}
                    </td>
                    <td>{formatDate(log.started_at)}</td>
                    <td>{formatDate(log.completed_at)}</td>
                    <td>{log.actual_duration_seconds ?? "-"}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          log.status
                        )}`}
                      >
                        {formatStatus(log.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No execution logs available for this batch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProcessTablePage;