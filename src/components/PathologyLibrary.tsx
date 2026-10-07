import React, { useState } from 'react';
import { FruitType, Language } from '../types';
import { translations } from '../i18n/translations';
import { DISEASE_DATABASE, DiseaseRecord } from '../data/diseases';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sprout, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface PathologyLibraryProps {
  language: Language;
  onSelectSampleForDiagnosis?: (diseaseId: string) => void;
}

export const PathologyLibrary: React.FC<PathologyLibraryProps> = ({
  language,
  onSelectSampleForDiagnosis
}) => {
  const t = translations[language];

  const [selectedFruit, setSelectedFruit] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseRecord | null>(null);

  const diseasesList: DiseaseRecord[] = Object.values(DISEASE_DATABASE);

  const fruits: { id: string; label: string }[] = [
    { id: 'all', label: 'All Fruits' },
    { id: 'apple', label: 'Apple (सफरचंद / सेब)' },
    { id: 'grape', label: 'Grape (द्राक्ष / अंगूर)' },
    { id: 'tomato', label: 'Tomato (टोमॅटो / टमाटर)' },
    { id: 'citrus', label: 'Citrus (संत्रा / संतरा)' },
    { id: 'banana', label: 'Banana (केळी / केला)' },
    { id: 'mango', label: 'Mango (आंबा / आम)' },
    { id: 'peach', label: 'Peach (पीच / आड़ू)' },
    { id: 'strawberry', label: 'Strawberry (स्ट्रॉबेरी)' }
  ];

  const filteredDiseases = diseasesList.filter((d) => {
    const matchesFruit = selectedFruit === 'all' || d.fruit === selectedFruit;
    const nameMatch = 
      d.diseaseName[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.diseaseName.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pathogen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fruitName[language].toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFruit && nameMatch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <span>{t.navLibrary}</span>
        </h1>
        <p className="mt-1 text-sm text-stone-400">
          Comprehensive botanical pathology compendium, pathogen taxonomies, and agronomic management protocols.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search diseases, pathogens, symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Fruit selector */}
        <select
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
          className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {fruits.map((f) => (
            <option key={f.id} value={f.id} className="bg-stone-900 text-stone-200">
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => {
          return (
            <div
              key={disease.id}
              onClick={() => setSelectedDisease(disease)}
              className="p-5 rounded-xl border border-stone-800 bg-stone-900/70 hover:border-emerald-600/50 hover:bg-stone-800/60 transition cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-emerald-400">
                    {disease.fruitName[language]}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                    disease.isHealthy
                      ? 'border-emerald-600/40 text-emerald-300 bg-emerald-950/30'
                      : 'border-amber-600/40 text-amber-300 bg-amber-950/30'
                  }`}>
                    {disease.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-100 group-hover:text-emerald-300 transition">
                  {disease.diseaseName[language]}
                </h3>
                <div className="text-xs text-stone-400 font-mono italic">
                  {disease.pathogen}
                </div>
              </div>

              {/* Top symptoms preview */}
              <div className="space-y-1.5 text-xs text-stone-300 border-t border-stone-800/80 pt-3">
                <div className="text-[11px] font-mono text-stone-500 uppercase">
                  Primary Symptoms:
                </div>
                <p className="line-clamp-2 text-stone-400 leading-relaxed">
                  {disease.symptoms[language]?.[0] || disease.symptoms.en[0]}
                </p>
              </div>

              {/* Economic impact snippet */}
              <div className="border-t border-stone-800/80 pt-2 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-mono">Favorable: {disease.favorableConditions.slice(0, 30)}...</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 transition transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">
                  {selectedDisease.fruitName[language]} · {selectedDisease.category}
                </span>
                <h2 className="text-xl font-bold text-stone-100 mt-0.5">
                  {selectedDisease.diseaseName[language]}
                </h2>
                <p className="text-xs text-stone-400 font-mono italic mt-1">
                  Pathogen: {selectedDisease.pathogen}
                </p>
              </div>
              <button
                onClick={() => setSelectedDisease(null)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Visual Symptoms & Markers</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {(selectedDisease.symptoms[language] || selectedDisease.symptoms.en).map((sym, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-stone-500 font-mono">·</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Treatment */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Chemical & Fungicide Interventions</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {(selectedDisease.chemicalTreatment[language] || selectedDisease.chemicalTreatment.en).map((chem, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-stone-500 font-mono">·</span>
                    <span>{chem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic Treatment */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                <span>Organic & Biological Control Measures</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {(selectedDisease.organicTreatment[language] || selectedDisease.organicTreatment.en).map((org, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-stone-500 font-mono">·</span>
                    <span>{org}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Environmental & Economic Details */}
            <div className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-400 space-y-1.5 font-mono">
              <div>
                <strong className="text-stone-300">Epidemiology:</strong> {selectedDisease.favorableConditions}
              </div>
              <div>
                <strong className="text-stone-300">Economic Impact:</strong> {selectedDisease.economicImpact}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
