import React from 'react';
import { LayoutDashboard, FolderKanban, Users, Settings, Hexagon, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Sidebar: React.FC = () => {
  const { activeMenu, setActiveMenu, isSidebarOpen, toggleSidebar } = useStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'team', label: 'Leaderboard', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`} aria-label="Main navigation">
        {/* Logo Section (White background) */}
        <div className="flex items-center justify-between px-8 py-6 h-20">
          <div className="brand">
            <div className="brand-mark"><Hexagon size={22} strokeWidth={2.5} /></div>
            <span>Logica<span className="brand-period">.</span></span>
          </div>

          <button onClick={toggleSidebar} className="sidebar-close" aria-label="Close navigation">
            <X size={24} />
          </button>
        </div>

        {/* Main Nav Section (Blue background with top-right border radius) */}
        <div className="sidebar-content">
          <div>
            <p className="sidebar-label">MENU</p>
            <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-white'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            </nav>
          </div>
          <div className="sidebar-footer">
            <span className="status-dot" />
            <span>Keep learning, one step at a time.</span>
          </div>
        </div>
      </aside>
    </>
  );
};
