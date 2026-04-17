import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Loader2, CheckCircle2 } from 'lucide-react';


export const EditorPanel: React.FC = () => {
  const { selectedProjectId, projects, notes, addNote } = useStore();
  const [noteContent, setNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || !selectedProjectId) return;

    setIsSubmitting(true);
    try {
      await addNote(noteContent);
      setNoteContent('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to add note", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedProjectId || !selectedProject) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <FileText className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Project Selected</h3>
        <p className="text-gray-500 mt-2 max-w-xs">Select a project from the left panel to view details and add notes.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
      <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{selectedProject.description}</p>
          </div>
          <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Active
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText size={16} className="text-indigo-500" />
          Project Notes
        </h3>
        
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No notes added yet. Be the first to add one!
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {notes.map(note => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none"
            >
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                <CheckCircle2 size={16} />
                Note added successfully!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a new note..."
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:text-white resize-none h-[60px] custom-scrollbar"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!noteContent.trim() || isSubmitting}
            className="absolute right-2 bottom-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
