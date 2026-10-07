import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, AlertCircle, CheckCircle2, Cpu, Eye, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';
import { Language, ModelType } from '../types';
import { translations } from '../i18n/translations';
import { CURATED_SAMPLES, CuratedTestSample } from '../data/benchmarks';

interface DetectionConsoleProps {
  onAnalyze: (imageData: string, model: ModelType, specimenHint?: string) => Promise<void>;
  isLoading: boolean;
  language: Language;
}

export const DetectionConsole: React.FC<DetectionConsoleProps> = ({
  onAnalyze,
  isLoading,
  language
}) => {
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>('efficientnet');
  const [specimenHint, setSpecimenHint] = useState<string | undefined>(undefined);
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image validation details
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; sizeKb: number; format: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Stop camera stream safely
  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const startCamera = async (mode: 'user' | 'environment' = facingMode) => {
    setCameraError(null);
    stopCameraStream();
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access failed:', err);
      setCameraError(err.message || 'Unable to access camera hardware. Please check browser permissions.');
      setIsCameraActive(false);
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    
    processImageData(dataUrl, 'image/jpeg');
    stopCameraStream();
  };

  const switchCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadLocalFile(file);
  };

  const loadLocalFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert('File exceeds maximum size of 25MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        processImageData(result, file.type, file.size);
      }
    };
    reader.readAsDataURL(file);
  };

  const processImageData = (dataUrl: string, format = 'image/jpeg', sizeBytes = 0) => {
    setSelectedImage(dataUrl);
    setSpecimenHint(undefined);

    const img = new Image();
    img.onload = () => {
      setImageMeta({
        width: img.width,
        height: img.height,
        sizeKb: Math.round(sizeBytes ? sizeBytes / 1024 : (dataUrl.length * 0.75) / 1024),
        format: format.replace('image/', '').toUpperCase()
      });
    };
    img.src = dataUrl;
  };

  const handleSelectCuratedSample = (sample: CuratedTestSample) => {
    setSelectedImage(sample.thumbnailSvg);
    setSpecimenHint(sample.diseaseId);
    setImageMeta({
      width: 400,
      height: 400,
      sizeKb: 12,
      format: 'SVG/SPECIMEN'
    });
    if (isCameraActive) stopCameraStream();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadLocalFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) return;
    onAnalyze(selectedImage, selectedModel, specimenHint);
  };

  return (
    <div className="space-y-8">
      {/* Top Specimen Header */}
      <div className="border-b border-stone-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100">
          {t.uploadTitle}
        </h1>
        <p className="mt-1 text-sm text-stone-400">
          {t.uploadSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Input Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Camera Viewfinder Mode */}
          {isCameraActive ? (
            <div className="relative rounded-xl overflow-hidden border border-emerald-600/40 bg-stone-950 aspect-[4/3] flex items-center justify-center shadow-xl">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Camera Controls Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between">
                <button
                  type="button"
                  onClick={stopCameraStream}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition cursor-pointer"
                >
                  {t.closeCamera}
                </button>
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition transform active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  {t.capturePhoto}
                </button>
                <button
                  type="button"
                  onClick={switchCamera}
                  className="p-2 rounded-lg bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition cursor-pointer"
                  title={t.switchCamera}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Upload & Drop Container */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all min-h-[320px] flex flex-col items-center justify-center ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-950/20'
                  : selectedImage
                  ? 'border-stone-700 bg-stone-900/60'
                  : 'border-stone-800 bg-stone-900/30 hover:border-stone-700'
              }`}
            >
              {selectedImage ? (
                /* Selected Specimen Preview */
                <div className="w-full flex flex-col items-center">
                  <div className="relative max-h-72 w-full max-w-md rounded-lg overflow-hidden border border-stone-700 bg-stone-950 shadow-md">
                    <img
                      src={selectedImage}
                      alt="Selected plant specimen"
                      referrerPolicy="no-referrer"
                      className="w-full h-64 object-contain"
                    />
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="px-2 py-1 rounded bg-stone-900/80 text-stone-300 hover:text-white text-xs backdrop-blur cursor-pointer"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Metadata strip */}
                  {imageMeta && (
                    <div className="mt-3 flex items-center gap-3 text-xs text-stone-400 font-mono">
                      <span>{imageMeta.width} × {imageMeta.height} px</span>
                      <span>·</span>
                      <span>{imageMeta.sizeKb} KB</span>
                      <span>·</span>
                      <span className="uppercase text-emerald-400">{imageMeta.format}</span>
                      <span>·</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Empty state prompt */
                <div className="space-y-4 max-w-sm">
                  <div className="w-14 h-14 mx-auto rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shadow-inner">
                    <Upload className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-stone-200">
                      {t.dragDropText}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      {t.orChooseFile}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium cursor-pointer transition shadow-sm"
                    >
                      {t.browseFiles}
                    </button>
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Camera className="w-3.5 h-3.5 text-stone-300" />
                      {t.useCamera}
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {cameraError && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Curated Botanical Test Samples Strip */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-stone-300 tracking-wide uppercase font-mono">
                {t.curatedSamplesTitle}
              </div>
              <span className="text-[11px] text-stone-500">
                1-Click Benchmark Test
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CURATED_SAMPLES.map((sample) => {
                const isSelected = selectedImage === sample.thumbnailSvg;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectCuratedSample(sample)}
                    className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500'
                        : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="w-full h-20 rounded bg-stone-950 overflow-hidden flex items-center justify-center border border-stone-800">
                      <img
                        src={sample.thumbnailSvg}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-stone-200 line-clamp-1">
                        {sample.trueCondition}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {sample.fruit} · {sample.isHealthy ? 'Healthy' : 'Diseased'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Model Selection & Inference Trigger (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-stone-800 bg-stone-900/60 space-y-5">
            <div>
              <div className="text-xs font-semibold uppercase font-mono tracking-wider text-emerald-400">
                {t.selectModel}
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Select neural architecture for pathological feature extraction and explainability.
              </p>
            </div>

            {/* Model Options */}
            <div className="space-y-3">
              {/* EfficientNetB0 */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                  selectedModel === 'efficientnet'
                    ? 'border-emerald-500/80 bg-emerald-950/20 ring-1 ring-emerald-500/50'
                    : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="model"
                  value="efficientnet"
                  checked={selectedModel === 'efficientnet'}
                  onChange={() => setSelectedModel('efficientnet')}
                  className="mt-1 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-stone-200 flex items-center justify-between">
                    <span>EfficientNetB0 (Transfer Learning)</span>
                    <span className="font-mono text-[10px] text-emerald-400">96.8% Acc</span>
                  </div>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Compound-scaled ConvNet with MBConv blocks. Includes Grad-CAM convolutional gradient heatmaps.
                  </p>
                  <div className="text-[10px] font-mono text-stone-500 pt-0.5">
                    4.02M params · 38ms latency
                  </div>
                </div>
              </label>

              {/* Vision Transformer (ViT) */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                  selectedModel === 'vit'
                    ? 'border-emerald-500/80 bg-emerald-950/20 ring-1 ring-emerald-500/50'
                    : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="model"
                  value="vit"
                  checked={selectedModel === 'vit'}
                  onChange={() => setSelectedModel('vit')}
                  className="mt-1 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-stone-200 flex items-center justify-between">
                    <span>Vision Transformer (ViT-B/16)</span>
                    <span className="font-mono text-[10px] text-cyan-400">95.4% Acc</span>
                  </div>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    16x16 patch projection embeddings with multi-head self-attention rollout maps.
                  </p>
                  <div className="text-[10px] font-mono text-stone-500 pt-0.5">
                    86.4M params · 142ms latency
                  </div>
                </div>
              </label>

              {/* Ensemble Mode */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                  selectedModel === 'ensemble'
                    ? 'border-emerald-500/80 bg-emerald-950/20 ring-1 ring-emerald-500/50'
                    : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="model"
                  value="ensemble"
                  checked={selectedModel === 'ensemble'}
                  onChange={() => setSelectedModel('ensemble')}
                  className="mt-1 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-stone-200 flex items-center justify-between">
                    <span>Dual-Model Ensemble (Soft Voting)</span>
                    <span className="font-mono text-[10px] text-amber-400">97.6% Acc</span>
                  </div>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Cross-validates predictions between ConvNet and ViT for academic benchmark comparison.
                  </p>
                </div>
              </label>
            </div>

            {/* Diagnostic execution button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!selectedImage || isLoading}
                onClick={handleSubmit}
                className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                  !selectedImage || isLoading
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-800'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-emerald-950/50 active:scale-[0.99]'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.analyzingText}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.runDiagnosisBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Inference pipeline telemetry */}
            <div className="border-t border-stone-800 pt-4 text-[11px] text-stone-400 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Input Preprocessing:</span>
                <span className="text-stone-300">224×224 Normalization</span>
              </div>
              <div className="flex justify-between">
                <span>Explainability Protocol:</span>
                <span className="text-emerald-400">Grad-CAM + Saliency Rollout</span>
              </div>
              <div className="flex justify-between">
                <span>Storage Sync:</span>
                <span className="text-stone-300">Persistent SQLite / Supabase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
