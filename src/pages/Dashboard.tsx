import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import { EditorPanel } from '../components/EditorPanel/EditorPanel';
import { Loader2, AlertCircle, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { fetchInitialData, isLoading, error, projects, selectedProjectId, selectProject } = useStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-indigo-600 dark:text-indigo-400">
          <Loader2 size={40} className="animate-spin" />
          <p className="font-medium animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl flex flex-col items-center gap-4 max-w-md text-center border border-red-100 dark:border-red-900/50">
          <AlertCircle size={48} />
          <div>
            <h2 className="text-lg font-bold mb-1">Failed to load data</h2>
            <p className="text-sm opacity-80">{error}</p>
          </div>
          <button 
            onClick={() => fetchInitialData()}
            className="mt-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-indigo-500/30 transition-colors duration-300 flex">
      <Sidebar />
      <div className="flex flex-col min-h-screen flex-1 pl-0 lg:pl-64 transition-all duration-300 w-full max-w-[100vw]">
        <Header />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 lg:h-[calc(100vh-8rem)]"
          >
            {/* Left Panel: Project List */}
            <div className="lg:col-span-5 xl:col-span-4 lg:h-full flex flex-col bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FolderKanban className="text-indigo-500" size={24} />
                    Active Projects
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select a project to view details</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {projects.length} Total
                </div>
              </div>

              <div className="overflow-y-auto pr-2 -mr-2 space-y-4 custom-scrollbar flex-1 pb-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {projects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      isSelected={selectedProjectId === project.id} 
                      onSelect={selectProject} 
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Right Panel: Progress, Leaderboard, Editor */}
            <div className="lg:col-span-7 xl:col-span-8 lg:h-full flex flex-col gap-6">
              <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 shrink-0">
                <ProgressBar />
                <Leaderboard />
              </div>
              <div className="flex-1 min-h-[400px] lg:min-h-[300px]">
                <EditorPanel />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;