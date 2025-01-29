import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { ResultsList } from './components/ResultsList';
import { Banner } from './components/Banner';
import { checkRateLimit } from './lib/rateLimit';
import { generateNames } from './lib/openai';
import toast from 'react-hot-toast';
import type { Filters, GeneratedName } from './types';

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    purpose: { type: 'preset', value: '' },
    style: { type: 'preset', value: '' },
    length: { type: 'preset', value: '' },
    language: { type: 'preset', value: '' },
    specialRequirements: [],
  });

  const [names, setNames] = useState<GeneratedName[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      if (!checkRateLimit()) {
        throw new Error('Daily limit reached. Please try again tomorrow!');
      }
      const generatedNames = await generateNames(query, filters);
      setNames(generatedNames);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark to-black">
      <Navbar />
      <Header />
      <main className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <SearchBar onSearch={handleSearch} />
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
        </div>
        <div className="mt-8">
          <ResultsList names={names} isLoading={isLoading} />
        </div>
        <div className="mt-12">
          <Banner />
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}