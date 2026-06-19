import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DesignSection from './pages/DesignSection';
import Enemies from './pages/Enemies';
import Towers from './pages/Towers';
import Maps from './pages/Maps';
import Chapters from './pages/Chapters';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design/:id" element={<DesignSection />} />
        <Route path="/enemies" element={<Enemies />} />
        <Route path="/towers" element={<Towers />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/catalogue/assets" element={<Navigate to="/enemies" replace />} />
        <Route path="/catalogue/heroes" element={<Navigate to="/enemies" replace />} />
        <Route path="/catalogue/waves" element={<Navigate to="/chapters" replace />} />
      </Routes>
    </Layout>
  );
}
