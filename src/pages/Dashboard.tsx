import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, FolderKanban, Loader2, Search, Settings2, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import { EditorPanel } from '../components/EditorPanel/EditorPanel';

const Dashboard: React.FC = () => {
  const {
    fetchInitialData, isLoading, error, projects, user, leaderboard,
    selectedProjectId, selectProject, activeMenu, darkMode, toggleDarkMode, setActiveMenu,
  } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    void fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('logica-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) =>
      `${project.title} ${project.description}`.toLowerCase().includes(normalizedQuery),
    );
  }, [projects, query]);

  if (isLoading) {
    return (
      <div className="page-state">
        <Loader2 size={36} className="animate-spin" />
        <p>Loading your workspace…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-state">
        <AlertCircle size={38} />
        <h2>We couldn’t load your workspace</h2>
        <p>{error}</p>
        <button className="button button-primary" onClick={() => void fetchInitialData()}>Try again</button>
      </div>
    );
  }

  const heading = {
    dashboard: ['Your dashboard', 'A little progress each day adds up.'],
    projects: ['Projects', 'Pick up where you left off or find a new task.'],
    team: ['Leaderboard', 'Celebrate the people learning alongside you.'],
    settings: ['Settings', 'Make your learning space feel like yours.'],
  }[activeMenu] ?? ['Your dashboard', 'A little progress each day adds up.'];

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="main-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">LEARNING SPACE</p>
              <h1>{heading[0]}</h1>
              <p className="page-subtitle">{heading[1]}</p>
            </div>
            {activeMenu !== 'settings' && (
              <button className="button button-primary heading-action" onClick={() => setActiveMenu('projects')}>
                <FolderKanban size={17} /> Explore projects
              </button>
            )}
          </div>

          {activeMenu === 'dashboard' && (
            <motion.div className="dashboard-layout" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <section className="dashboard-primary">
                <ProgressBar />
                <section className="surface-card projects-section">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">YOUR WORK</p>
                      <h2>Continue learning</h2>
                    </div>
                    <button className="text-button" onClick={() => setActiveMenu('projects')}>All projects <ArrowRight size={16} /></button>
                  </div>
                  <ProjectList projects={projects.slice(0, 3)} selectedProjectId={selectedProjectId} onSelect={selectProject} />
                </section>
                {selectedProjectId && <div className="editor-slot"><EditorPanel /></div>}
              </section>
              <aside className="dashboard-aside">
                <div className="welcome-card">
                  <div className="welcome-icon"><Sparkles size={20} /></div>
                  <p className="eyebrow">KEEP IT UP</p>
                  <h2>You’re building great habits, {user?.name ?? 'learner'}.</h2>
                  <p>Every project is a chance to learn something new. Keep your momentum going.</p>
                  <button className="welcome-link" onClick={() => setActiveMenu('projects')}>Browse projects <ArrowRight size={16} /></button>
                </div>
                <div className="surface-card leaderboard-preview">
                  <div className="section-heading compact">
                    <div><p className="eyebrow">YOUR COMMUNITY</p><h2><Trophy size={18} /> Top learners</h2></div>
                    <button className="icon-button" aria-label="View full leaderboard" onClick={() => setActiveMenu('team')}><ArrowRight size={18} /></button>
                  </div>
                  <Leaderboard compact />
                </div>
              </aside>
            </motion.div>
          )}

          {activeMenu === 'projects' && (
            <section className="surface-card full-section">
              <div className="section-heading">
                <div><p className="eyebrow">{projects.length} AVAILABLE</p><h2>All projects</h2></div>
                <label className="search-field">
                  <Search size={17} />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" />
                </label>
              </div>
              {filteredProjects.length ? (
                <ProjectList projects={filteredProjects} selectedProjectId={selectedProjectId} onSelect={selectProject} />
              ) : <p className="empty-state">No projects match “{query}”. Try a different search.</p>}
              {selectedProjectId && <div className="editor-slot"><EditorPanel /></div>}
            </section>
          )}

          {activeMenu === 'team' && (
            <section className="surface-card full-section team-section">
              <div className="section-heading">
                <div><p className="eyebrow">THIS WEEK</p><h2>Learning leaderboard</h2></div>
                <div className="leaderboard-count"><Trophy size={17} /> {leaderboard.length} learners</div>
              </div>
              <Leaderboard />
            </section>
          )}

          {activeMenu === 'settings' && (
            <section className="surface-card settings-section">
              <div className="section-heading">
                <div><p className="eyebrow">PREFERENCES</p><h2>Workspace settings</h2></div>
                <div className="settings-badge"><Settings2 size={17} /> Saved on this device</div>
              </div>
              <div className="profile-summary">
                <span className="profile-avatar profile-avatar-large" aria-hidden="true">{user?.name.slice(0, 1).toUpperCase() ?? 'L'}</span>
                <div><h3>{user?.name ?? 'Learner'}</h3><p>{user?.xp ?? 0} XP earned</p></div>
              </div>
              <div className="preference-row">
                <div><h3>Dark appearance</h3><p>Use a darker color scheme for your workspace.</p></div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={darkMode}
                  aria-label="Toggle dark appearance"
                  className={`switch ${darkMode ? 'switch-on' : ''}`}
                  onClick={toggleDarkMode}
                ><span /></button>
              </div>
              <div className="preference-row">
                <div><h3>Learning progress</h3><p>Track XP and milestones on your dashboard.</p></div>
                <button className="button button-secondary" onClick={() => setActiveMenu('dashboard')}>View dashboard</button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

interface ProjectListProps {
  projects: Array<{ id: number; title: string; description: string }>;
  selectedProjectId: number | null;
  onSelect: (id: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, selectedProjectId, onSelect }) => (
  <div className="project-list">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} isSelected={selectedProjectId === project.id} onSelect={onSelect} />
    ))}
  </div>
);

export default Dashboard;
