import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DesignSection from './pages/DesignSection';
import Waves from './pages/Waves';
import Bestiary from './pages/Bestiary';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design/:id" element={<DesignSection />} />
        <Route path="/catalogue/waves" element={<Waves />} />
        <Route path="/catalogue/assets" element={<Bestiary />} />
        <Route path="/catalogue/heroes" element={<Navigate to="/catalogue/assets" replace />} />
      </Routes>
    </Layout>
  );
}
