import { motion } from 'framer-motion';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { trackEvent } from '../lib/analytics';
import type { GeneratedName } from '../types';
import { MAX_REQUESTS } from '../lib/constants';

interface ResultsListProps {
  names: GeneratedName[];
  isLoading: boolean;
}

export function ResultsList({ names, isLoading }: ResultsListProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent('copy_name', { name: text });
      toast.success('Name copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy name');
    }
  };

  if (isLoading) {
    return (
      <div 
        className="w-full max-w-2xl mx-auto mt-8"
        role="status"
        aria-label="Loading name suggestions"
      >
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-24 bg-brand-beige/20 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      role="region"
      aria-label="Generated names"
      className="w-full max-w-2xl mx-auto mt-8 space-y-4"
    >
      {names.length === 0 && (
        <div className="text-center text-brand-beige">
          <p>Enter keywords above to generate unique names!</p>
          <p className="text-sm mt-2">Limited to {MAX_REQUESTS} generations per day</p>
        </div>
      )}
      {names.map((name, index) => (
        <motion.div
          key={name.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-all border-2 border-transparent hover:border-brand-primary/20"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-brand-dark">{name.name}</h3>
              <p className="text-brand-beige mt-1">{name.description}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => copyToClipboard(name.name)}
                className="p-2 text-brand-beige hover:text-brand-secondary transition-colors rounded-full hover:bg-brand-secondary/10"
                aria-label="Copy to clipboard"
              >
                <ClipboardDocumentIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}