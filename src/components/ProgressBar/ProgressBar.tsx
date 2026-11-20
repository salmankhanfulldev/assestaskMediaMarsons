import React from 'react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

export const ProgressBar: React.FC = () => {
  const { user } = useStore();
  
  const xp = user?.xp ?? 0;
  const targetXp = 800;
  const progressPercent = Math.min((xp / targetXp) * 100, 100);

  return (
    <section className="progress-card" aria-label={`Learning progress: ${xp} of ${targetXp} XP`}>
      <div className="progress-copy">
        <p className="eyebrow">YOUR NEXT MILESTONE</p>
        <h2>Every step moves you forward.</h2>
        <p>{Math.max(targetXp - xp, 0)} XP to your next milestone</p>
      </div>
      <div className="progress-track-wrap">
        <div className="progress-track">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="progress-fill"
          />
        </div>
        <div className="progress-labels"><span>{xp} XP earned</span><span>{targetXp} XP goal</span></div>
      </div>
    </section>
  );
};