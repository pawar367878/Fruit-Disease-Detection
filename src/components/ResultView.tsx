import React, { useState } from 'react';
import { PredictionResult, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Layers, 
  Download, 
  ArrowLeft, 
  ShieldCheck, 
  Flame, 
  Sprout, 
  Clock, 
  Cpu, 
  Activity,
  FileText
} from 'lucide-react';

interface ResultViewProps {
  result: PredictionResult;
  onNewScan: () => void;
  language: Language;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onNewScan,
  language
}) => {
  const t = translations[language];

  // Visualizer controls
  const [blendOpacity, setBlendOpacity] = useState<number>(65); // 0 to 100
  const [activeXaiTab, setActiveXaiTab] = useState<'gradcam' | 'attention' | 'mask'>('gradcam');
  const [showBoundingBox, setShowBoundingBox] = useState<boolean>(true);

  // Selected heatmap image
  const heatmapImage = activeXaiTab === 'attention' && result.vitAttentionUrl
    ? result.vitAttentionUrl
    : activeXaiTab === 'mask' && result.lesionMaskUrl
    ? result.lesionMaskUrl
    : result.gradcamUrl;

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `diagnosis_report_${result.fruit}_${result.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <button
            onClick={onNewScan}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 font-mono mb-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.newScanBtn}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 flex items-center gap-3">
            <span>{t.diagnosisReport}</span>
            <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
              result.isHealthy
                ? 'border-emerald-600/50 bg-emerald-950/40 text-emerald-300'
                : 'border-amber-600/50 bg-amber-950/40 text-amber-300'
            }`}>
              {result.isHealthy ? t.statusHealthy : t.statusInfected}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportJson}
            className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.saveReportBtn}</span>
          </button>
          <button
            type="button"
            onClick={onNewScan}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            {t.newScanBtn}
          </button>
        </div>
      </div>

      {/* Primary Diagnostic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Identified Condition */}
        <div className="md:col-span-2 p-5 rounded-xl border border-stone-800 bg-stone-900/70 space-y-2">
          <div className="text-xs uppercase font-mono tracking-wider text-stone-400">
            {t.predictedCondition}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-stone-100">
            {result.diseaseName}
          </div>
          <div className="text-xs text-stone-400 font-mono">
            Host: <span className="text-stone-200 font-sans font-medium">{result.fruitDisplayName}</span> · Pathogen: <span className="italic">{result.pathogen}</span>
          </div>
        </div>

        {/* Confidence Gauge */}
        <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/70 space-y-1">
          <div className="text-xs uppercase font-mono tracking-wider text-stone-400">
            {t.confidenceScore}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-emerald-400">
            {result.confidence.toFixed(1)}%
          </div>
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, result.confidence)}%` }}
            />
          </div>
        </div>

        {/* Affected Area & Speed */}
        <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/70 space-y-1">
          <div className="text-xs uppercase font-mono tracking-wider text-stone-400">
            {t.affectedArea}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-stone-200">
            {result.affectedRegionRatio.toFixed(1)}%
          </div>
          <div className="text-[11px] font-mono text-stone-400 flex items-center gap-1.5 pt-1">
            <Clock className="w-3 h-3 text-stone-500" />
            <span>{result.inferenceTimeMs} ms via {result.modelName}</span>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid: Explainable AI & Top Probabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Grad-CAM & Attention Visualization (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/70 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-stone-200">
                  {t.explainableAITitle}
                </h3>
              </div>

              {/* Visualization Mode Tabs */}
              <div className="flex items-center bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveXaiTab('gradcam')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeXaiTab === 'gradcam'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Grad-CAM
                </button>
                <button
                  type="button"
                  onClick={() => setActiveXaiTab('attention')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeXaiTab === 'attention'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  ViT Attention
                </button>
                <button
                  type="button"
                  onClick={() => setActiveXaiTab('mask')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeXaiTab === 'mask'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Lesion Mask
                </button>
              </div>
            </div>

            {/* Interactive Viewport Canvas Overlay */}
            <div className="relative aspect-square max-h-[440px] w-full mx-auto rounded-lg overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center">
              {/* Layer 1: Original High-Res Specimen */}
              <img
                src={result.imageUrl}
                alt="Original specimen"
                className="absolute inset-0 w-full h-full object-contain"
              />

              {/* Layer 2: Explainability Heatmap / Mask Overlay with Dynamic Opacity */}
              <img
                src={heatmapImage}
                alt="Activation heatmap"
                style={{ opacity: blendOpacity / 100 }}
                className="absolute inset-0 w-full h-full object-contain mix-blend-screen transition-opacity duration-150 pointer-events-none"
              />

              {/* Layer 3: Diagnostic Lesion Bounding Box */}
              {showBoundingBox && !result.isHealthy && (
                <div
                  style={{
                    left: `${result.primaryLesionCoordinates.x}%`,
                    top: `${result.primaryLesionCoordinates.y}%`,
                    width: `${result.primaryLesionCoordinates.width}%`,
                    height: `${result.primaryLesionCoordinates.height}%`
                  }}
                  className="absolute border-2 border-emerald-400/90 rounded bg-emerald-400/10 pointer-events-none transition-all"
                >
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500 text-stone-950 font-bold whitespace-nowrap shadow">
                    Pathological Focus ({result.affectedRegionRatio.toFixed(1)}%)
                  </span>
                </div>
              )}
            </div>

            {/* Visualizer Controls */}
            <div className="space-y-3 pt-2 bg-stone-950/60 p-3.5 rounded-lg border border-stone-800">
              <div className="flex items-center justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  {t.overlayBlend}
                </span>
                <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                  {blendOpacity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blendOpacity}
                onChange={(e) => setBlendOpacity(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
              />
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>{t.originalImage} (0%)</span>
                <span>Balanced Blend (50%)</span>
                <span>{t.heatmapOnly} (100%)</span>
              </div>

              {/* Bounding box toggle */}
              {!result.isHealthy && (
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <label className="text-stone-300 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBoundingBox}
                      onChange={(e) => setShowBoundingBox(e.target.checked)}
                      className="rounded border-stone-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Highlight Automated Saliency Box</span>
                  </label>
                  <span className="text-[11px] text-stone-500 font-mono">
                    Coords: [{result.primaryLesionCoordinates.x}%, {result.primaryLesionCoordinates.y}%]
                  </span>
                </div>
              )}
            </div>

            {/* Scientific explanation caption */}
            <div className="text-[11px] text-stone-400 leading-relaxed bg-stone-950/30 p-3 rounded border border-stone-800/60 font-mono">
              <span className="text-stone-300 font-semibold">Mathematical Note:</span>{' '}
              {activeXaiTab === 'gradcam' ? (
                'Grad-CAM computes gradients of target score y^c with respect to feature activation maps A^k in final convolutional stage (MBConv-7).'
              ) : activeXaiTab === 'attention' ? (
                'Vision Transformer calculates layer-wise attention rollout by multiplying self-attention matrices across all 12 multi-head attention blocks.'
              ) : (
                'Morphological lesion mask generated via thresholded activation density and excess green index normalization.'
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Class Softmax Distribution (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/70 space-y-4">
            <div className="border-b border-stone-800 pb-3">
              <h3 className="text-sm font-semibold text-stone-200">
                {t.topCandidates}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Multi-class classification probability distribution across top candidates.
              </p>
            </div>

            {/* Probability Bars */}
            <div className="space-y-3">
              {result.topPredictions.map((pred, idx) => {
                const percentage = (pred.probability * 100).toFixed(1);
                const isWinner = idx === 0;

                return (
                  <div key={pred.className} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isWinner ? 'text-emerald-300 font-semibold' : 'text-stone-300'}`}>
                        {pred.displayName}
                      </span>
                      <span className="font-mono tabular-nums text-stone-400">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isWinner ? 'bg-emerald-500' : 'bg-stone-600'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(2, pred.probability * 100))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Model Architecture Specs */}
            <div className="border-t border-stone-800 pt-4 space-y-2 text-xs">
              <div className="text-[11px] font-semibold text-stone-400 uppercase font-mono">
                Diagnostic Architecture
              </div>
              <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 font-mono text-[11px] text-stone-300 space-y-1">
                <div>Model: <span className="text-emerald-400">{result.modelName}</span></div>
                <div>Inference Time: <span className="text-stone-200">{result.inferenceTimeMs} ms</span></div>
                <div>Status: <span className="text-emerald-400">Empirically Calibrated</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pathology & Agronomic Treatment Section */}
      <div className="p-6 rounded-xl border border-stone-800 bg-stone-900/70 space-y-6">
        <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>{t.clinicalProfile}</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Agronomic disease management guidelines, chemical formulations, and bio-control recommendations.
            </p>
          </div>
          <div className="text-xs font-mono text-stone-400">
            Severity Assessment: <span className="font-semibold text-stone-200">{result.severity}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Symptoms */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase font-mono tracking-wider text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>{t.symptomsTitle}</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {result.symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-500 font-mono">·</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chemical Treatment */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.chemicalManagement}</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {result.chemicalTreatment.map((chem, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-500 font-mono">·</span>
                  <span>{chem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Organic / Bio-control Treatment */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5" />
              <span>{t.organicManagement}</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {result.organicTreatment.map((org, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-500 font-mono">·</span>
                  <span>{org}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preventative Measures */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase font-mono tracking-wider text-stone-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.preventionTitle}</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {result.preventativeMeasures.map((prev, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-500 font-mono">·</span>
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
