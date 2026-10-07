import React, { useState } from 'react';
import { HistoryRecord, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  History, 
  Trash2, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  X
} from 'lucide-react';

interface HistoryViewProps {
  history: HistoryRecord[];
  onClearHistory: () => Promise<void>;
  onDeleteRecord: (id: string) => Promise<void>;
  onInspectRecord: (record: HistoryRecord) => void;
  language: Language;
  supabaseConnected: boolean;
  onOpenSupabase: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onClearHistory,
  onDeleteRecord,
  onInspectRecord,
  language,
  supabaseConnected,
  onOpenSupabase
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'healthy' | 'diseased'>('all');
  const [previewRecord, setPreviewRecord] = useState<HistoryRecord | null>(null);

  // Filtered records
  const filteredRecords = history.filter((item) => {
    const matchesSearch = 
      item.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fruit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fruitDisplayName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      filterStatus === 'all' ? true :
      filterStatus === 'healthy' ? item.isHealthy :
      !item.isHealthy;

    return matchesSearch && matchesStatus;
  });

  const healthyCount = history.filter((r) => r.isHealthy).length;
  const diseasedCount = history.filter((r) => !r.isHealthy).length;

  const exportCsv = () => {
    if (history.length === 0) return;
    const headers = ['ID', 'Timestamp', 'Fruit', 'Condition', 'Status', 'Confidence (%)', 'Model'];
    const rows = history.map((r) => [
      r.id,
      r.timestamp,
      r.fruit,
      `"${r.diseaseName}"`,
      r.isHealthy ? 'Healthy' : 'Diseased',
      r.confidence.toFixed(1),
      r.modelUsed
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fruit_disease_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 flex items-center gap-2.5">
            <History className="w-6 h-6 text-emerald-400" />
            <span>{t.historyTitle}</span>
          </h1>
          <p className="mt-1 text-sm text-stone-400">
            {t.historySubtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={exportCsv}
            disabled={history.length === 0}
            className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.exportCsv}</span>
          </button>
          <button
            type="button"
            onClick={onClearHistory}
            disabled={history.length === 0}
            className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-rose-950/40 text-stone-400 hover:text-rose-300 border border-stone-800 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearHistory}</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/70 space-y-1">
          <div className="text-xs uppercase font-mono tracking-wider text-stone-400">
            {t.totalScans}
          </div>
          <div className="text-2xl font-mono font-bold text-stone-100 tabular-nums">
            {history.length}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/70 space-y-1">
          <div className="text-xs uppercase font-mono tracking-wider text-emerald-400">
            {t.healthyCount}
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
            {healthyCount}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/70 space-y-1">
          <div className="text-xs uppercase font-mono tracking-wider text-amber-400">
            {t.diseasedCount}
          </div>
          <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
            {diseasedCount}
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/40 p-3 rounded-xl border border-stone-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by fruit, disease, or symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
              filterStatus === 'all' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All ({history.length})
          </button>
          <button
            onClick={() => setFilterStatus('healthy')}
            className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
              filterStatus === 'healthy' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Healthy ({healthyCount})
          </button>
          <button
            onClick={() => setFilterStatus('diseased')}
            className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
              filterStatus === 'diseased' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Diseased ({diseasedCount})
          </button>
        </div>
      </div>

      {/* History Records Table or Empty State */}
      {filteredRecords.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-stone-800 bg-stone-900/30 space-y-3">
          <History className="w-10 h-10 text-stone-600 mx-auto" />
          <div className="text-sm font-medium text-stone-300">
            {t.noHistory}
          </div>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            All executed image diagnoses, confidence scores, and Grad-CAM saliency heatmaps will be recorded here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecords.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-stone-800 bg-stone-900/70 hover:border-stone-700 transition flex flex-col justify-between space-y-3"
            >
              {/* Image & Grad-CAM thumbnails */}
              <div className="flex gap-2 h-32 rounded-lg overflow-hidden bg-stone-950 border border-stone-800">
                <div className="w-1/2 h-full relative">
                  <img
                    src={item.imageUrl}
                    alt={item.diseaseName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1 rounded text-[9px] font-mono bg-stone-900/80 text-stone-300">
                    Specimen
                  </span>
                </div>
                <div className="w-1/2 h-full relative">
                  <img
                    src={item.gradcamUrl}
                    alt="Grad-CAM"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1 rounded text-[9px] font-mono bg-stone-900/80 text-emerald-400">
                    Grad-CAM
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-stone-400">
                    {item.fruitDisplayName}
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    item.isHealthy
                      ? 'border-emerald-600/40 text-emerald-300 bg-emerald-950/30'
                      : 'border-amber-600/40 text-amber-300 bg-amber-950/30'
                  }`}>
                    {item.isHealthy ? 'Healthy' : 'Diseased'}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-stone-100 line-clamp-1">
                  {item.diseaseName}
                </h3>
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 pt-1">
                  <span>Confidence: <strong className="text-emerald-400">{item.confidence.toFixed(1)}%</strong></span>
                  <span className="text-stone-500 uppercase">{item.modelUsed}</span>
                </div>
              </div>

              {/* Bottom timestamp & inspect button */}
              <div className="border-t border-stone-800/80 pt-2 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-600" />
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewRecord(item)}
                    className="text-stone-300 hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                  <button
                    onClick={() => onDeleteRecord(item.id)}
                    className="text-stone-500 hover:text-rose-400 transition cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Inspection Modal */}
      {previewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-100">
                  {previewRecord.diseaseName}
                </h3>
                <p className="text-xs text-stone-400 font-mono">
                  {previewRecord.fruitDisplayName} · Recorded on {new Date(previewRecord.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setPreviewRecord(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-400">Original Photo</span>
                <div className="aspect-square rounded-lg overflow-hidden border border-stone-800 bg-stone-950">
                  <img
                    src={previewRecord.imageUrl}
                    alt="Specimen"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400">Grad-CAM Heatmap</span>
                <div className="aspect-square rounded-lg overflow-hidden border border-stone-800 bg-stone-950">
                  <img
                    src={previewRecord.gradcamUrl}
                    alt="Grad-CAM"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono space-y-1 text-stone-300">
              <div className="flex justify-between">
                <span>Model Architecture:</span>
                <span className="text-stone-100 uppercase">{previewRecord.modelUsed}</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence Score:</span>
                <span className="text-emerald-400 font-bold">{previewRecord.confidence.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Diagnostic Status:</span>
                <span className={previewRecord.isHealthy ? 'text-emerald-400' : 'text-amber-400'}>
                  {previewRecord.isHealthy ? 'Healthy Specimen' : 'Pathogen Detected'}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewRecord(null)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
