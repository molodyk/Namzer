import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon, PlusIcon } from '@heroicons/react/24/outline';
import { trackEvent } from '../lib/analytics';
import type { Filters, FilterValue, Purpose, Style, Length, Language, SpecialRequirement } from '../types';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

interface FilterGroupProps {
  title: string;
  options: string[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

function FilterGroup({ title, options, value, onChange }: FilterGroupProps) {
  const [isCustom, setIsCustom] = useState(value.type === 'custom');
  const [customValue, setCustomValue] = useState(value.type === 'custom' ? value.value : '');

  const handleOptionClick = (option: string) => {
    setIsCustom(false);
    trackEvent('filter_change', {
      filter_type: title.toLowerCase(),
      value: option
    });
    onChange({ type: 'preset', value: option });
  };

  const handleCustomClick = () => {
    const newIsCustom = !isCustom;
    setIsCustom(newIsCustom);
    if (newIsCustom) {
      onChange({ type: 'custom', value: customValue });
    } else {
      onChange({ type: 'preset', value: '' });
    }
    trackEvent('toggle_custom_filter', {
      filter_type: title.toLowerCase(),
      enabled: newIsCustom
    });
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, 15);
    setCustomValue(newValue);
    trackEvent('custom_filter_change', {
      filter_type: title.toLowerCase(),
      value: newValue
    });
    onChange({ type: 'custom', value: newValue });
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            aria-pressed={value.type === 'preset' && value.value === option}
            onClick={() => handleOptionClick(option)}
            className={`px-3 py-1 rounded-full text-sm ${
              value.type === 'preset' && value.value === option
                ? 'bg-brand-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
        <button
          aria-pressed={isCustom}
          onClick={handleCustomClick}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
            isCustom
              ? 'bg-brand-secondary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <PlusIcon className="w-4 h-4" />
          Custom
        </button>
      </div>
      {isCustom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2"
        >
          <input
            type="text"
            value={customValue}
            onChange={handleCustomChange}
            placeholder={`Custom ${title.toLowerCase()}...`}
            maxLength={15}
            className="px-3 py-1 text-sm rounded-lg border border-gray-200 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/20 outline-none w-full max-w-[200px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            {customValue.length}/15 characters
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const purposes: Purpose[] = ['Company', 'Brand', 'Username', 'Character', 'Fantasy', 'Pet'];
  const styles: Style[] = ['Modern', 'Classic', 'Playful', 'Professional', 'Unique'];
  const lengths: Length[] = ['Short', 'Medium', 'Long'];
  const languages: Language[] = ['English', 'Spanish', 'French', 'Made-up'];
  const specialRequirements: SpecialRequirement[] = ['Alliteration', 'Rhyming'];

  const handleRequirementToggle = (req: SpecialRequirement) => {
    onFilterChange({
      ...filters,
      specialRequirements: filters.specialRequirements.includes(req)
        ? filters.specialRequirements.filter(r => r !== req)
        : [...filters.specialRequirements, req],
    });
  };

  return (
    <div className="w-full mt-4">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-sm font-medium text-brand-dark bg-brand-dark/10 rounded-lg hover:bg-brand-dark/20 focus:outline-none focus-visible:ring focus-visible:ring-brand-primary focus-visible:ring-opacity-75">
              <span>Filters</span>
              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5 text-brand-dark`}
              />
            </Disclosure.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-gray-50 mt-2 rounded-lg">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Purpose */}
                  <FilterGroup
                    title="Purpose"
                    options={purposes}
                    value={filters.purpose}
                    onChange={(value) => onFilterChange({ ...filters, purpose: value })}
                  />

                  {/* Style */}
                  <FilterGroup
                    title="Style"
                    options={styles}
                    value={filters.style}
                    onChange={(value) => onFilterChange({ ...filters, style: value })}
                  />

                  {/* Length */}
                  <FilterGroup
                    title="Length"
                    options={lengths}
                    value={filters.length}
                    onChange={(value) => onFilterChange({ ...filters, length: value })}
                  />

                  {/* Language */}
                  <FilterGroup
                    title="Language"
                    options={languages}
                    value={filters.language}
                    onChange={(value) => onFilterChange({ ...filters, language: value })}
                  />

                  {/* Special Requirements */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="font-semibold text-gray-700">Special Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {specialRequirements.map((req) => (
                        <button
                          key={req}
                          aria-pressed={filters.specialRequirements.includes(req)}
                          onClick={() => handleRequirementToggle(req)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.specialRequirements.includes(req)
                              ? 'bg-brand-secondary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {req}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}