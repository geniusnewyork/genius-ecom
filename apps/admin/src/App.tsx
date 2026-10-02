import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { LicensesPage } from './pages/LicensesPage';
import { DevicesPage } from './pages/DevicesPage';
import { PlansPage } from './pages/PlansPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { VersionsPage } from './pages/VersionsPage';

export function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mg_admin_token'));
  const [email, setEmail] = useState<string>(() => localStorage.getItem('mg_admin_email') || 'admin@montygenius.com');

  const handleLogin = (newToken: string, userEmail: string) => {
    localStorage.setItem('mg_admin_token', newToken);
    localStorage.setItem('mg_admin_email', userEmail);
    setToken(newToken);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    if (token) {
      fetch('http://localhost:3001/api/v1/admin/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(console.error);
    }
    localStorage.removeItem('mg_admin_token');
    localStorage.removeItem('mg_admin_email');
    setToken(null);
  };

  if (!token) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <AdminLayout onLogout={handleLogout} adminEmail={email}>
        <Routes>
          <Route path="/" element={<DashboardOverview token={token} />} />
          <Route path="/licenses" element={<LicensesPage token={token} />} />
          <Route path="/devices" element={<DevicesPage token={token} />} />
          <Route path="/plans" element={<PlansPage token={token} />} />
          <Route path="/audit-logs" element={<AuditLogsPage token={token} />} />
          <Route path="/versions" element={<VersionsPage token={token} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
