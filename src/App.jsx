import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PlaceholderPage from './components/pages/PlaceholderPage';
import Assets from './components/pages/Assets';
import './index.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
  <div className="dashboard-container">
    <Sidebar isOpen={isSidebarOpen} />
    <div className="main-content-wrapper">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="main-content">
        {children}
      </main>
    </div>
  </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/process-flow" element={<DashboardLayout><PlaceholderPage title="Process Flow" /></DashboardLayout>} />
        <Route path="/process-table" element={<DashboardLayout><PlaceholderPage title="Process Table" /></DashboardLayout>} />
        <Route path="/assets" element={<DashboardLayout><Assets /></DashboardLayout>} />
        <Route path="/monitoring" element={<DashboardLayout><PlaceholderPage title="Real Time Monitoring" /></DashboardLayout>} />
        <Route path="/alarms" element={<DashboardLayout><PlaceholderPage title="Alarms & Alerts" /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><PlaceholderPage title="Reports" /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><PlaceholderPage title="Settings" /></DashboardLayout>} />
        <Route path="/users" element={<DashboardLayout><PlaceholderPage title="Users" /></DashboardLayout>} />
        <Route path="/audit-trail" element={<DashboardLayout><PlaceholderPage title="Audit Trail" /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
