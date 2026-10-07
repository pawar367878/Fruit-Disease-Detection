import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Database, Languages, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSupabase: () => void;
  supabaseConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  onOpenSupabase,
  supabaseConnected
}) => {
  const t = translations[language];

  const navItems = [
    { id: 'detect', label: t.navDetect },
    { id: 'comparison', label: t.navComparison },
    { id: 'history', label: t.navHistory },
    { id: 'library', label: t.navLibrary },
    { id: 'research', label: t.navResearch }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/20 bg-stone-900/95 backdrop-blur-md text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <button
          onClick={() => onTabChange('detect')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-tighter">
              FP
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              FruitPatho<span className="text-emerald-400">AI</span>
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-6 text-sm font-medium text-stone-300">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs lg:text-sm ${
                  isActive
                    ? 'text-emerald-400 bg-stone-800/80 font-semibold shadow-inner'
                    : 'hover:text-white hover:bg-stone-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-stone-800 border border-stone-700 rounded-lg p-0.5 text-xs">
            <Languages className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-0.5" />
            {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-1 rounded transition-colors uppercase font-mono cursor-pointer ${
                  language === lang
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Database / Cloud settings action */}
          <button
            onClick={onOpenSupabase}
            title={supabaseConnected ? t.supabaseConnected : t.supabaseDisconnected}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              supabaseConnected
                ? 'border-emerald-600/40 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-900/30'
                : 'border-stone-700 text-stone-300 bg-stone-800 hover:bg-stone-700'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {supabaseConnected ? 'Supabase Sync' : 'Database'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-stone-800/80 gap-1 bg-stone-900 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`px-2.5 py-1 text-xs rounded whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-emerald-400 bg-stone-800 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
