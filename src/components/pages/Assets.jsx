import React, { useEffect, useState } from "react";
import {
  getAssetDetails,
  getAssetCategories,
  getAssetOverview,
  getEquipmentTypes,
  getFilteredAssetDetails,
} from "../service/AssetsApi.js";
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
  GitFork,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
const staticCategoryCardsData = [
  {
    id: "tanks",
    title: "Tanks",
    count: 7,
    icon: (
      <img
        src={tankIcon}
        alt="Tank"
        style={{ width: 28, height: 28, objectFit: "contain" }}
      />
    ),
    items: [
      { name: "Wastewater Tank", statusText: "1 Running", status: "running" },
      { name: "Mixing Tank", statusText: "2 Running", status: "running" },
      { name: "Clean Water Tank", statusText: "1 Running", status: "running" },
      { name: "Coagulation Tank", statusText: "1 Running", status: "running" },
      { name: "Flocculation Tank", statusText: "1 Running", status: "running" },
      { name: "Final Mixing Tank", statusText: "1 Running", status: "running" },
    ],
  },
  {
    id: "others",
    title: "Others",
    count: 0,
    icon: (
      <img
        src={othersIcon}
        alt="Others"
        style={{ width: 28, height: 28, objectFit: "contain" }}
      />
    ),
    // items: [
    //   { name: "Blower", statusText: "2 Running", status: "running" },
    //   { name: "Agitator", statusText: "1 Running", status: "running" },
    // ],
  },
];


const getCategoryIcon = (name) => {
  const value = (name || "").toLowerCase();

  if (value.includes("pump")) return (
    <img src={pumpIcon} alt="Pump" style={{ width: 28, height: 28, objectFit: "contain" }} />
  );

  if (value.includes("valve")) return (
    <img src={valveIcon} alt="Valve" style={{ width: 28, height: 28, objectFit: "contain" }} />
  );

  if (value.includes("sensor") || value.includes("instrument")) return (
    <img src={instrumentIcon} alt="Sensor" style={{ width: 28, height: 28, objectFit: "contain" }} />
  );

  if (value.includes("motor")) return (
    <img src={dosingSystemIcon} alt="Motor" style={{ width: 28, height: 28, objectFit: "contain" }} />
  );

  return (
    <img src={othersIcon} alt="Equipment" style={{ width: 28, height: 28, objectFit: "contain" }} />
  );
};


const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [apiCategories, setApiCategories] = useState([]);
const [categoryLoading, setCategoryLoading] = useState(false);
const [categoryError, setCategoryError] = useState("");

const [overview, setOverview] = useState({
  total_assets: 0,
  running: 0,
  stopped: 0,
  maintenance: 0,
  fault: 0,
  unclassified: 0,
});

const [overviewLoading, setOverviewLoading] = useState(false);
const [overviewError, setOverviewError] = useState("");


const [equipmentTypes, setEquipmentTypes] = useState([]);
const [equipmentTypesLoading, setEquipmentTypesLoading] = useState(false);
const [equipmentTypesError, setEquipmentTypesError] = useState("");


const [selectedCategory, setSelectedCategory] = useState("");


  // useEffect(() => {
  //   let cancelled = false;

  //   const fetchAssets = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");

  //       const data = await getAssetDetails(
  //         currentPage,
  //         itemsPerPage
  //       );

  //       if (cancelled) return;

  //       setAssets(data.results || []);
  //       setTotalEntries(data.count || 0);
  //       setTotalPages(data.total_pages || 1);
  //     } catch (err) {
  //       if (cancelled) return;

  //       console.error("Error fetching assets:", err);
  //       setError(
  //         err.response?.data?.detail ||
  //         err.message ||
  //         "Failed to load assets."
  //       );
  //       setAssets([]);
  //     } finally {
  //       if (!cancelled) {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchAssets();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [currentPage, itemsPerPage]);

  useEffect(() => {
  let cancelled = false;

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError("");

      let data;

      if (selectedCategory) {
        // Fetch assets for the selected category
        data = await getFilteredAssetDetails(
          selectedCategory,
          currentPage,
          itemsPerPage
        );
      } else {
        // Fetch all assets
        data = await getAssetDetails(
          currentPage,
          itemsPerPage
        );
      }

      if (cancelled) return;

      setAssets(data.results || []);
      setTotalEntries(data.count || 0);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      if (cancelled) return;

      console.error("Error fetching assets:", err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "Failed to load assets."
      );

      setAssets([]);
      setTotalEntries(0);
      setTotalPages(1);
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  fetchAssets();

  return () => {
    cancelled = true;
  };
}, [selectedCategory, currentPage, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + assets.length,
    totalEntries
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  useEffect(() => {
  let cancelled = false;

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategoryError("");

      const data = await getAssetCategories();

      if (cancelled) return;

      setApiCategories(
        Array.isArray(data.categories) ? data.categories : []
      );
    } catch (err) {
      if (cancelled) return;

      console.error("Error fetching categories:", err);

      setCategoryError(
        err.response?.data?.detail ||
          err.message ||
          "Failed to load equipment categories."
      );
    } finally {
      if (!cancelled) setCategoryLoading(false);
    }
  };

  fetchCategories();

  return () => {
    cancelled = true;
  };
}, []);


useEffect(() => {
  let cancelled = false;

  const fetchOverview = async () => {
    try {
      setOverviewLoading(true);
      setOverviewError("");

      const data = await getAssetOverview();

      if (!cancelled) {
        setOverview(data);
      }
    } catch (err) {
      if (!cancelled) {
        console.error("Error fetching asset overview:", err);
        setOverviewError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to load asset overview."
        );
      }
    } finally {
      if (!cancelled) {
        setOverviewLoading(false);
      }
    }
  };

  fetchOverview();

  return () => {
    cancelled = true;
  };
}, []);

useEffect(() => {
  let cancelled = false;

  const fetchEquipmentTypes = async () => {
    try {
      setEquipmentTypesLoading(true);
      setEquipmentTypesError("");

      const response = await getEquipmentTypes();

      if (cancelled) return;

      if (response.success && Array.isArray(response.data)) {
        setEquipmentTypes(
          response.data.filter((type) => type.is_active)
        );
      } else {
        setEquipmentTypes([]);
      }
    } catch (err) {
      if (cancelled) return;

      console.error("Error fetching equipment types:", err);

      setEquipmentTypesError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load equipment types."
      );
    } finally {
      if (!cancelled) {
        setEquipmentTypesLoading(false);
      }
    }
  };

  fetchEquipmentTypes();

  return () => {
    cancelled = true;
  };
}, []);

// Auto-refresh Assets page data every 3 seconds
useEffect(() => {
  const refreshInterval = setInterval(() => {
    // Refresh asset table
    if (!loading) {
      const fetchAssets = async () => {
        try {
          const data = selectedCategory
            ? await getFilteredAssetDetails(
                selectedCategory,
                currentPage,
                itemsPerPage
              )
            : await getAssetDetails(currentPage, itemsPerPage);

          setAssets(data.results || []);
          setTotalEntries(data.count || 0);
          setTotalPages(data.total_pages || 1);
          setError("");
        } catch (err) {
          console.error("Error refreshing assets:", err);
        }
      };

      fetchAssets();
    }

    // Refresh category cards
    const fetchCategories = async () => {
      try {
        const data = await getAssetCategories();
        setApiCategories(
          Array.isArray(data.categories) ? data.categories : []
        );
      } catch (err) {
        console.error("Error refreshing categories:", err);
      }
    };

    // Refresh overview metrics
    const fetchOverview = async () => {
      try {
        const data = await getAssetOverview();
        setOverview(data);
      } catch (err) {
        console.error("Error refreshing overview:", err);
      }
    };

    // Refresh equipment types
    const fetchTypes = async () => {
      try {
        const response = await getEquipmentTypes();

        setEquipmentTypes(
          response.success && Array.isArray(response.data)
            ? response.data.filter((type) => type.is_active)
            : []
        );
      } catch (err) {
        console.error("Error refreshing equipment types:", err);
      }
    };

    fetchCategories();
    fetchOverview();
    fetchTypes();
  }, 1000);

  return () => clearInterval(refreshInterval);
}, [selectedCategory, currentPage, itemsPerPage, loading]);

  return (
    <div className={styles.assetsContainer}>
      
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.leftHeader}>
          <h2 className={styles.title}>
            <Box size={24} color="#2563eb" /> Assets
          </h2>
        </div>

        {/* <div className={styles.rightHeader}>
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
        </div> */}
      </div>

      {/* Metrics Row */}
 <div className={styles.metricsGrid}>
  {/* Total Assets */}
  <div className={styles.metricCard}>
    <div className={`${styles.iconBox} ${styles.total}`}>
      <Box size={24} />
    </div>
    <div className={styles.metricInfo}>
      <span className={styles.metricTitle}>Total Assets</span>
      <span className={styles.metricValue}>
        {overviewLoading ? "..." : overview.total_assets}
      </span>
      <span className={styles.metricSubtitle}>Installed Equipment</span>
    </div>
  </div>

{/* Running */}

  <div className={styles.metricCard}>
    <div className={`${styles.iconBox} ${styles.running}`}>
      <CheckCircle size={24} />
    </div>
    <div className={styles.metricInfo}>
      <span className={styles.metricTitle}>Running</span>
      <span className={styles.metricValue}>
        {overviewLoading ? "..." : overview.running}
      </span>
      <span className={styles.metricSubtitle}>Currently Running</span>
    </div>
  </div>

{/* Stopped */}

  <div className={styles.metricCard}>
    <div className={`${styles.iconBox} ${styles.stopped}`}>
      <AlertCircle size={24} />
    </div>
    <div className={styles.metricInfo}>
      <span className={styles.metricTitle}>Stopped</span>
      <span className={styles.metricValue}>
        {overviewLoading ? "..." : overview.stopped}
      </span>
      <span className={styles.metricSubtitle}>Currently Stopped</span>
    </div>
  </div>

{/* Maintenance */}

  <div className={styles.metricCard}>
    <div className={`${styles.iconBox} ${styles.maintenance}`}>
      <Wrench size={24} />
    </div>
    <div className={styles.metricInfo}>
      <span className={styles.metricTitle}>Maintenance</span>
      <span className={styles.metricValue}>
        {overviewLoading ? "..." : overview.maintenance}
      </span>
      <span className={styles.metricSubtitle}>Under Maintenance</span>
    </div>
  </div>

{/* Fault */}

  <div className={styles.metricCard}>
    <div className={`${styles.iconBox} ${styles.fault}`}>
      <AlertTriangle size={24} />
    </div>
    <div className={styles.metricInfo}>
      <span className={styles.metricTitle}>Fault</span>
      <span className={styles.metricValue}>
        {overviewLoading ? "..." : overview.fault}
      </span>
      <span className={styles.metricSubtitle}>Fault Detected</span>
    </div>
  </div>

{/* Unclassified */}

  <div className={styles.metricCard}>
    <div className={`${styles.iconBox} ${styles.unclassified || styles.total}`}>
      <Database size={24} />
    </div>
    <div className={styles.metricInfo}>
      <span className={styles.metricTitle}>Unclassified</span>
      <span className={styles.metricValue}>
        {overviewLoading ? "..." : overview.unclassified}
      </span>
      <span className={styles.metricSubtitle}>Unclassified Assets</span>
    </div>
  </div>
</div>

{overviewError && (

  <div role="alert" style={{ color: "red", marginTop: 8 }}>
    {overviewError}
  </div>
)}


      {/* Category Summary Cards Grid */}
     
<div className={styles.categoryGrid}>
  {categoryLoading && <div>Loading equipment categories...</div>}

{categoryError && <div role="alert">{categoryError}</div>}

{!categoryLoading &&
!categoryError &&
(() => {
const findCategory = (keywords) =>
apiCategories.find((category) =>
keywords.some((keyword) =>
category.name?.toLowerCase().includes(keyword)
)
);


  const orderedCards = [
    // 1. Static Tanks card
    (() => { 
      const category = apiCategories.find( (item) => item.name?.toLowerCase() === "tank" ); 
      return category 
      ? { ...category,
         id: `api-${category.id}`, 
         title: category.name, 
         count: category.total_assets, 
         icon: ( <img src={tankIcon} 
          alt="Tank" style={{ width: 28, height: 28, objectFit: "contain", }} /> ), 
          items: (category.equipment || []).map((item) => ({ 
            ...item, 
            isDynamic: true, 
          })),
         }
          : null;
         })(),

    // 2. Inlet Pump
    (() => {
      const category = findCategory(["inlet pump"]);
      return category
        ? {
            ...category,
            id: `api-${category.id}`,
            title: "Inlet Pump",
            count: category.total_assets,
            icon: getCategoryIcon(category.name),
            items: (category.equipment || []).map((item) => ({
              ...item,
              isDynamic: true,
            })),
          }
        : null;
    })(),

    // 3. Solenoid Valves
    (() => {
      const category = findCategory(["solenoid valve"]);
      return category
        ? {
            ...category,
            id: `api-${category.id}`,
            title: "Solenoid Valves",
            count: category.total_assets,
            icon: getCategoryIcon(category.name),
            items: (category.equipment || []).map((item) => ({
              ...item,
              isDynamic: true,
            })),
          }
        : null;
    })(),

    // 4. Contactor Sensors
    (() => {
      const category = findCategory(["contactor sensor", "contactor", "sensor"]);
      return category
        ? {
            ...category,
            id: `api-${category.id}`,
            title: "Contactor Sensors",
            count: category.total_assets,
            icon: getCategoryIcon(category.name),
            items: (category.equipment || []).map((item) => ({
              ...item,
              isDynamic: true,
            })),
          }
        : null;
    })(),

    // 5. Pump Motors
    (() => {
      const category = findCategory(["pump motor", "motor"]);
      return category
        ? {
            ...category,
            id: `api-${category.id}`,
            title: "Pump Motors",
            count: category.total_assets,
            icon: getCategoryIcon(category.name),
            items: (category.equipment || []).map((item) => ({
              ...item,
              isDynamic: true,
            })),
          }
        : null;
    })(),

    // 6. Static Others card
    staticCategoryCardsData.find((card) => card.id === "others"),
  ].filter(Boolean);

  return orderedCards.map((card) => (
    <div className={styles.categoryCard} key={card.id}>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryTitleBox}>
          <div className={styles.categoryIcon}>{card.icon}</div>
          <div>
            <div className={styles.categoryTitle}>{card.title}</div>
            <div className={styles.categoryCount}>
              {card.count} Assets
            </div>
          </div>
        </div>
      </div>

      <div className={styles.categoryList}>
        {(card.items || []).map((item, index) => (
          <div
            className={styles.categoryListItem}
            key={`${card.id}-${item.name}-${index}`}
          >
            {item.isDynamic ? (

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      width: "100%",
    }}
  >
    {/* Equipment name on the left */}
    <div className={styles.listItemName}>
      <div className={styles.listDot} />
      {item.name}
    </div>


{/* Running and Stopped counts vertically on the right */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    flexShrink: 0,
  }}
>
 {(item.running_count ?? 0) > 0 && (
<span className={`${styles.listItemStatus} ${styles.running}`}> <span className={styles.statusDotSmall} />
{item.running_count} Running </span>
)}

{(item.stopped_count ?? 0) > 0 && (
<span className={`${styles.listItemStatus} ${styles.stopped}`}> <span className={styles.statusDotSmall} />
{item.stopped_count} Stopped </span>
)}

</div>


  </div>
) : (
  <>
    <div className={styles.listItemName}>
      <div className={styles.listDot} />
      {item.name}
    </div>


<div
  className={`${styles.listItemStatus} ${
    styles[item.status] || ""
  }`}
>
  <span className={styles.statusDotSmall} />
  {item.statusText}
</div>


</>
)}

          </div>
        ))}
      </div>
    </div>
  ));
})()}


</div>

      {/* Asset Details Master Table */}
      <div className={styles.masterTableCard}>
        <div className={styles.masterTableHeader}>
          <div className={styles.masterTableTitle}>
            <MapPin size={20} color="#2563eb" /> Asset Details
          </div>
          <div className={styles.masterTableActions}>
 <select
  className={styles.categorySelect}
  value={selectedCategory}
  onChange={(e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  }}
  disabled={equipmentTypesLoading}
>
  <option value="">
    {equipmentTypesLoading
      ? "Loading categories..."
      : "All Categories"}
  </option>

  {equipmentTypes.map((type) => (
    <option key={type.id} value={type.id}>
      {type.name}
    </option>
  ))}
</select>

{equipmentTypesError && (
  <span role="alert" style={{ color: "red", fontSize: "12px" }}>
    {equipmentTypesError}
  </span>
)}

{/* {equipmentTypesError && (
<span role="alert" style={{ color: "red", fontSize: "12px" }}>
{equipmentTypesError} </span>
)} */}

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
    <th>Sl. No.</th>
    <th>Asset Name</th>
    <th>Asset Type</th>
    <th>Stage Name</th>
    <th>Stage Type</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {loading ? (
    <tr>
      <td colSpan={7}>Loading assets...</td>
    </tr>
  ) : error ? (
    <tr>
      <td colSpan={7}>{error}</td>
    </tr>
  ) : assets.length === 0 ? (
    <tr>
      <td colSpan={7}>No assets found.</td>
    </tr>
  ) : (
    assets.map((asset, index) => {
      const stage = asset.stages?.[0];
      const statusClass = (asset.status || "")
        .toLowerCase()
        .replace(/\s+/g, "");

      return (
        <tr key={asset.id}>
          <td>{asset.s_no ?? startIndex + index + 1}</td>
          <td>{asset.name}</td>
          <td>{asset.type}</td>
          <td>{stage?.name || "-"}</td>
          <td>{stage?.stage_type || "-"}</td>
          <td>
            <span
              className={`${styles.statusBadge} ${
                styles[statusClass] || ""
              }`}
            >
              <span className={styles.statusDot} />
              {asset.status || "-"}
            </span>
          </td>
          <td>
            <button
              type="button"
              onClick={() => console.log("Selected asset:", asset.id)}
              title="View asset"
            >
              View
            </button>
          </td>
        </tr>
      );
    })
  )}
</tbody>
          </table>


<div className={styles.pagination}>
  <span className={styles.showingText}>
    Showing{" "}
    {totalEntries === 0 ? 0 : startIndex + 1}
    {" to "}
    {endIndex}
    {" of "}
    {totalEntries} entries
  </span>

  <div className={styles.pageControls}>
    <button
      className={styles.pageBtn}
      onClick={() => goToPage(1)}
      disabled={currentPage === 1 || loading}
      aria-label="First page"
    >
      <ChevronsLeft size={14} />
    </button>

    <button
      className={styles.pageBtn}
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1 || loading}
      aria-label="Previous page"
    >
      <ChevronLeft size={14} />
    </button>

    {Array.from(
      { length: totalPages },
      (_, index) => index + 1
    ).map((page) => (
      <button
        key={page}
        className={`${styles.pageBtn} ${
          currentPage === page ? styles.active : ""
        }`}
        onClick={() => goToPage(page)}
        disabled={loading}
        aria-current={currentPage === page ? "page" : undefined}
      >
        {page}
      </button>
    ))}

    <button
      className={styles.pageBtn}
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage >= totalPages || loading}
      aria-label="Next page"
    >
      <ChevronRight size={14} />
    </button>

    <button
      className={styles.pageBtn}
      onClick={() => goToPage(totalPages)}
      disabled={currentPage >= totalPages || loading}
      aria-label="Last page"
    >
      <ChevronsRight size={14} />
    </button>

    <select
      className={styles.pageSelect}
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
      aria-label="Records per page"
      disabled={loading}
    >
      <option value={10}>10 / page</option>
      <option value={20}>20 / page</option>
      <option value={30}>30 / page</option>
      <option value={40}>40 / page</option>
    </select>
  </div>
</div>
        </div>
      </div>

    </div>
  );
};

export default Assets;
