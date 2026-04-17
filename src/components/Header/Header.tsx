import React from 'react';
import { useStore } from '../../store/useStore';
import { Bell, Search, Star, Menu } from 'lucide-react';
import { motion } from 'framer-motion';


export const Header: React.FC = () => {
  const { user, toggleSidebar } = useStore();

  return (
    <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 transition-colors duration-300">
      <div className="flex items-center flex-1 max-w-xl gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <Menu size={24} />
        </button>
        <div className="relative group flex-1 hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-transparent rounded-full text-sm placeholder-gray-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 outline-none dark:text-white"
            placeholder="Search projects, tasks, or teammates..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <button className="relative p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Hello, {user?.name || 'User'} 👋
            </p>
            <div className="flex items-center justify-end gap-1 text-xs font-medium text-amber-500">
              <Star size={12} fill="currentColor" />
              <span>{user?.xp || 0} XP</span>
            </div>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer"
          >
            <img
              src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-md object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
