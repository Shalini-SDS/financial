import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { DashboardMSME } from './pages/DashboardMSME';
import { Upload } from './pages/Upload';
import { History } from './pages/History';
import { Marketplace } from './pages/Marketplace';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { Reports } from './pages/Reports';
import { Blockchain } from './pages/Blockchain';
import { useAuthStore } from './state/authStore';

const Protected = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Protected>
            <Layout>
              <Routes>
                <Route path="dashboard/msme" element={<DashboardMSME />} />
                <Route path="upload" element={<Upload />} />
                <Route path="history" element={<History />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="investor" element={<InvestorDashboard />} />
                <Route path="reports" element={<Reports />} />
                <Route path="blockchain" element={<Blockchain />} />
              </Routes>
            </Layout>
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;

