import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { trackEvent } from '../lib/analytics';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      trackEvent('generate_names', {
        search_query: query.trim()
      });
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          id="name-search"
          aria-label="Enter keywords for name generation"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keywords or theme..."
          className="w-full px-6 py-4 text-lg rounded-lg bg-white border-2 border-brand-beige/20 text-brand-dark placeholder-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-200"
        />
        <button
          type="submit"
          aria-label="Generate names"
          className="w-full mt-3 px-6 py-4 bg-brand-primary hover:bg-brand-primary/90 text-brand-dark font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span>Generate</span>
          <SparklesIcon className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}