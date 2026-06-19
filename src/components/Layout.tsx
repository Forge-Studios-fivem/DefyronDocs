import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import EditBar from './EditBar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-grid flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <EditBar />
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">{children}</div>
      </main>
    </div>
  );
}
