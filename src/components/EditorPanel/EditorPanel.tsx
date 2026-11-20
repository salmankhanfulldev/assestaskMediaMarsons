import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Loader2, CheckCircle2 } from 'lucide-react';


export const EditorPanel: React.FC = () => {
  const { selectedProjectId, projects, notes, addNote, fetchNotesForProject } = useStore();
  const [noteContent, setNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  useEffect(() => {
    if (!selectedProjectId) return;
    void fetchNotesForProject(selectedProjectId)
      .then(() => setNoteError(null))
      .catch((error: unknown) => {
        setNoteError(error instanceof Error ? error.message : 'Could not load project notes.');
      });
  }, [selectedProjectId, fetchNotesForProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || !selectedProjectId) return;

    setIsSubmitting(true);
    setNoteError(null);
    try {
      await addNote(noteContent);
      setNoteContent('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: unknown) {
      setNoteError(error instanceof Error ? error.message : 'Could not add your note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedProjectId || !selectedProject) {
    return (
      <div className="editor-panel editor-empty">
        <div className="editor-empty-icon">
          <FileText className="text-gray-400" size={32} />
        </div>
        <h3>No project selected</h3>
        <p>Select a project to view its details and add notes.</p>
      </div>
    );
  }

  return (
    <div className="editor-panel">
      <div className="editor-heading">
        <div>
          <p className="eyebrow">PROJECT NOTES</p>
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
        </div>
        <span className="active-badge">In progress</span>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="notes-empty">
            <FileText size={20} />
            <p>No notes yet. Add the first note for this project.</p>
          </div>
        ) : (
          <div className="notes-items">
            <AnimatePresence>
              {notes.map(note => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="note-item"
                >
                  <p className="note-content">{note.content}</p>
                  <p className="note-date">
                    {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="note-form">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="note-success"
            >
              <div>
                <CheckCircle2 size={16} />
                Note added successfully!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {noteError && <p className="note-error" role="alert">{noteError}</p>}
        <div className="note-input-wrap">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a new note..."
            className="note-input"
            aria-label="Write a project note"
          />
          <button
            type="submit"
            disabled={!noteContent.trim() || isSubmitting}
            className="note-submit"
            aria-label="Add note"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
