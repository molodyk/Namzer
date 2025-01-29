export type Purpose = 'Company' | 'Brand' | 'Username' | 'Character' | 'Fantasy' | 'Pet';
export type Style = 'Modern' | 'Classic' | 'Playful' | 'Professional' | 'Unique';
export type Length = 'Short' | 'Medium' | 'Long';
export type Language = 'English' | 'Spanish' | 'French' | 'Made-up';
export type SpecialRequirement = 'Alliteration' | 'Rhyming';

export interface FilterValue {
  type: 'preset' | 'custom';
  value: string;
}

export interface Filters {
  purpose: FilterValue;
  style: FilterValue;
  length: FilterValue;
  language: FilterValue;
  specialRequirements: SpecialRequirement[];
}

export interface GeneratedName {
  id: string;
  name: string;
  description: string;
}