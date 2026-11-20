import React from 'react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

interface LeaderboardProps {
  compact?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ compact = false }) => {
  const { leaderboard } = useStore();
  const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank);
  const visibleLeaderboard = compact ? sortedLeaderboard.slice(0, 3) : sortedLeaderboard;

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
    <div className={`leaderboard ${compact ? 'leaderboard-compact' : ''}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="leaderboard-list"
      >
        {visibleLeaderboard.map((user, index) => {
          const isTopUser = index === 0;
          
          return (
            <motion.div
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="leaderboard-row"
            >
              <div className="flex items-center gap-4">
                {/* Rank Circle */}
                <div className={`rank-badge rank-${index + 1}`}>
                  {user.rank}
                </div>
                
                <div className="leaderboard-person">
                  <div className="relative">
                    <span className="leaderboard-avatar" aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</span>
                    {isTopUser && (
                      <div className="winner-tag">
                        TOP
                      </div>
                    )}
                  </div>
                  <div>
                    <h3>
                      {user.name}
                    </h3>
                    <div className="learner-rank">Rank #{user.rank}</div>
                  </div>
                </div>
              </div>
              
              <div className="learner-score">
                {user.score}<span> XP</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {visibleLeaderboard.length === 0 && <p className="empty-state">Leaderboard data is not available yet.</p>}
    </div>
  );
};
