import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DetectionConsole } from './components/DetectionConsole';
import { ResultView } from './components/ResultView';
import { ModelComparisonView } from './components/ModelComparisonView';
import { HistoryView } from './components/HistoryView';
import { PathologyLibrary } from './components/PathologyLibrary';
import { ResearchDocView } from './components/ResearchDocView';
import { SupabaseModal } from './components/SupabaseModal';
import { 
  Language, 
  ModelType, 
  PredictionResult, 
  HistoryRecord, 
  SupabaseSettings 
} from './types';
import { 
  runPrediction, 
  fetchHistory, 
  deleteHistoryRecord, 
  clearAllHistory, 
  fetchSupabaseConfig, 
  saveSupabaseConfig 
} from './services/api';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('detect');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('fruit_patho_lang') as Language) || 'en';
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // History state
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  // Supabase settings modal state
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);
  const [supabaseSettings, setSupabaseSettings] = useState<SupabaseSettings>({
    supabaseUrl: '',
    supabaseAnonKey: '',
    bucketName: 'fruit-disease-images',
    tableName: 'prediction_history',
    isEnabled: false,
    isConnected: false
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('fruit_patho_lang', newLang);
  };

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [historyData, supabaseData] = await Promise.all([
          fetchHistory(),
          fetchSupabaseConfig()
        ]);
        setHistory(historyData);
        setSupabaseSettings(supabaseData);
      } catch (err) {
        console.warn('Initial data load completed with fallback:', err);
      }
    };
    loadInitialData();
  }, []);

  // Run AI diagnosis
  const handleAnalyze = async (imageData: string, model: ModelType, specimenHint?: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await runPrediction(imageData, model, specimenHint);
      setCurrentResult(result);
      
      // Update history list
      const newRecord: HistoryRecord = {
        id: result.id,
        timestamp: result.timestamp,
        imageUrl: result.imageUrl,
        gradcamUrl: result.gradcamUrl,
        fruit: result.fruit,
        fruitDisplayName: result.fruitDisplayName,
        diseaseName: result.diseaseName,
        isHealthy: result.isHealthy,
        confidence: result.confidence,
        modelUsed: result.modelUsed
      };
      setHistory(prev => [newRecord, ...prev]);
    } catch (err: any) {
      console.error('Diagnosis failed:', err);
      setErrorMessage(err.message || 'An error occurred during neural inference. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    await clearAllHistory();
    setHistory([]);
  };

  const handleDeleteRecord = async (id: string) => {
    await deleteHistoryRecord(id);
    setHistory(prev => prev.filter(r => r.id !== id));
  };

  const handleInspectRecord = (record: HistoryRecord) => {
    // Navigate to detect view with the record data
    setCurrentResult({
      id: record.id,
      timestamp: record.timestamp,
      imageUrl: record.imageUrl,
      fruit: record.fruit,
      fruitDisplayName: record.fruitDisplayName,
      diseaseName: record.diseaseName,
      pathogen: 'Field pathogen record',
      isHealthy: record.isHealthy,
      confidence: record.confidence,
      modelUsed: record.modelUsed,
      modelName: record.modelUsed === 'efficientnet' ? 'EfficientNetB0' : record.modelUsed === 'vit' ? 'Vision Transformer' : 'Ensemble',
      inferenceTimeMs: 42,
      gradcamUrl: record.gradcamUrl,
      affectedRegionRatio: 18.2,
      primaryLesionCoordinates: { x: 25, y: 25, width: 45, height: 45 },
      topPredictions: [
        { className: record.diseaseName, fruit: record.fruit, displayName: record.diseaseName, probability: record.confidence / 100, isHealthy: record.isHealthy }
      ],
      severity: record.isHealthy ? 'None' : 'Moderate',
      symptoms: ['Symptom inspected from historical scan.'],
      organicTreatment: ['Refer to pathology compendium for targeted protocols.'],
      chemicalTreatment: ['Refer to pathology compendium for targeted protocols.'],
      preventativeMeasures: ['Regular canopy scouting and moisture control.']
    });
    setActiveTab('detect');
  };

  const handleSaveSupabaseConfig = async (newConfig: SupabaseSettings) => {
    const res = await saveSupabaseConfig(newConfig);
    if (res.success) {
      setSupabaseSettings(newConfig);
    }
    return res;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950">
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setErrorMessage(null);
        }}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenSupabase={() => setIsSupabaseModalOpen(true)}
        supabaseConnected={supabaseSettings.isConnected}
      />

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-900 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'detect' && (
          currentResult ? (
            <ResultView
              result={currentResult}
              onNewScan={() => setCurrentResult(null)}
              language={language}
            />
          ) : (
            <DetectionConsole
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              language={language}
            />
          )
        )}

        {activeTab === 'comparison' && (
          <ModelComparisonView language={language} />
        )}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onClearHistory={handleClearHistory}
            onDeleteRecord={handleDeleteRecord}
            onInspectRecord={handleInspectRecord}
            language={language}
            supabaseConnected={supabaseSettings.isConnected}
            onOpenSupabase={() => setIsSupabaseModalOpen(true)}
          />
        )}

        {activeTab === 'library' && (
          <PathologyLibrary
            language={language}
            onSelectSampleForDiagnosis={(id) => {
              setActiveTab('detect');
            }}
          />
        )}

        {activeTab === 'research' && (
          <ResearchDocView language={language} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950/80 text-stone-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div>
            <span>Fruit Disease Detection & Classification System</span>
            <span className="mx-2">·</span>
            <span>EfficientNetB0 & ViT Dual Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>XAI: Grad-CAM++ & Saliency Rollout</span>
            <span>·</span>
            <span>Multilingual: EN / MR / HI</span>
          </div>
        </div>
      </footer>

      {/* Supabase PostgreSQL & Storage Settings Modal */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        settings={supabaseSettings}
        onSave={handleSaveSupabaseConfig}
      />
    </div>
  );
}
