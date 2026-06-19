import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DesignSection from './pages/DesignSection';
import Waves from './pages/Waves';
import Heroes from './pages/Heroes';
import Assets from './pages/Assets';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design/:id" element={<DesignSection />} />
        <Route path="/catalogue/waves" element={<Waves />} />
        <Route path="/catalogue/heroes" element={<Heroes />} />
        <Route path="/catalogue/assets" element={<Assets />} />
      </Routes>
    </Layout>
  );
}
