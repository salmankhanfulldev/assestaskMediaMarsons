import React from 'react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';
import { Medal, Crown, TrendingUp } from 'lucide-react';


export const Leaderboard: React.FC = () => {
  const { leaderboard } = useStore();
  const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Medal className="text-amber-500" size={24} />
          Leaderboard
        </h2>
        <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
          View All
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {sortedLeaderboard.map((user, index) => {
          const isTopUser = index === 0;
          
          return (
            <motion.div
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${
                isTopUser 
                  ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30' 
                  : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isTopUser ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 
                  index === 1 ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300' :
                  index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' :
                  'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                }`}>
                  {user.rank}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={`https://i.pravatar.cc/150?img=${user.id + 10}`} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                    />
                    {isTopUser && (
                      <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-0.5 text-white shadow-sm">
                        <Crown size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isTopUser ? 'text-amber-900 dark:text-amber-400' : 'text-gray-900 dark:text-white'}`}>
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <TrendingUp size={12} className="text-green-500" />
                      Moving up
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`font-bold ${isTopUser ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {user.score.toLocaleString()} pts
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
