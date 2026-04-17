import React from 'react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap } from 'lucide-react';


export const ProgressBar: React.FC = () => {
  const { user } = useStore();
  
  const xp = user?.xp || 0;
  const targetXp = 100;
  const progressPercent = Math.min((xp / targetXp) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white shadow-lg shadow-indigo-900/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="text-yellow-400" size={24} />
              Your Progress
            </h2>
            <p className="text-indigo-200 text-sm mt-1">Keep pushing, you're almost there!</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
            <Zap className="text-yellow-400" size={18} />
            <span className="font-bold">{xp} XP</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium text-indigo-100">
            <span>Level 1</span>
            <span>{xp} / {targetXp} XP to Level 2</span>
          </div>
          
          <div className="h-4 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/30 rounded-lg text-indigo-200">
              <Target size={20} />
            </div>
            <div>
              <p className="text-xs text-indigo-200">Current Rank</p>
              <p className="font-bold text-lg">Novice</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="p-2 bg-purple-500/30 rounded-lg text-purple-200">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs text-indigo-200">Daily Streak</p>
              <p className="font-bold text-lg">3 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};