import React from 'react';
import { useStore } from '../../store/useStore';
import { Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, toggleSidebar, setActiveMenu } = useStore();

  return (
    <header className="topbar">
      <div className="topbar-leading">
        <button 
          onClick={toggleSidebar}
          className="menu-toggle"
          aria-label="Open navigation"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="topbar-actions">
        <button className="xp-chip" onClick={() => setActiveMenu('team')} title="View leaderboard">
          <span className="xp-coin">✦</span>
          <span>{user?.xp ?? 0}<span className="xp-label"> XP</span></span>
        </button>
        <button className="profile-button" onClick={() => setActiveMenu('settings')} aria-label="Open profile and settings">
          <span className="profile-avatar" aria-hidden="true">{user?.name.slice(0, 1).toUpperCase() ?? 'L'}</span>
          <span className="profile-name">{user?.name ?? 'Learner'}</span>
        </button>
      </div>
    </header>
  );
};
