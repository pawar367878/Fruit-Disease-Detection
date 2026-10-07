export type FruitType = 
  | 'apple' 
  | 'grape' 
  | 'tomato' 
  | 'citrus' 
  | 'banana' 
  | 'mango' 
  | 'peach' 
  | 'strawberry';

export type ModelType = 'efficientnet' | 'vit' | 'ensemble';

export type Language = 'en' | 'mr' | 'hi';

export interface ClassProbability {
  className: string;
  fruit: FruitType;
  displayName: string;
  probability: number; // 0 to 1
  isHealthy: boolean;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  fruit: FruitType;
  fruitDisplayName: string;
  diseaseName: string;
  pathogen: string;
  isHealthy: boolean;
  confidence: number; // e.g. 96.8
  modelUsed: ModelType;
  modelName: string;
  inferenceTimeMs: number;
  
  // Explainable AI Assets
  gradcamUrl: string;
  vitAttentionUrl?: string;
  lesionMaskUrl?: string;
  affectedRegionRatio: number; // percentage of surface affected e.g. 18.4%
  primaryLesionCoordinates: { x: number; y: number; width: number; height: number };
  
  // Probabilities
  topPredictions: ClassProbability[];
  
  // Agronomic / Pathology guidance
  severity: 'Mild' | 'Moderate' | 'Severe' | 'None';
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  preventativeMeasures: string[];
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  imageUrl: string;
  gradcamUrl: string;
  fruit: FruitType;
  fruitDisplayName: string;
  diseaseName: string;
  isHealthy: boolean;
  confidence: number;
  modelUsed: ModelType;
  notes?: string;
}

export interface ModelMetric {
  modelName: string;
  architecture: string;
  top1Accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  inferenceLatencyCpuMs: number;
  inferenceLatencyGpuMs: number;
  parameterCountM: number;
  gflops: number;
  trainingEpochs: number;
  convergenceTimeHours: number;
  explainabilityMethod: string;
}

export interface ConfusionMatrixData {
  labels: string[];
  matrix: number[][]; // rows: true, cols: predicted
}

export interface SupabaseSettings {
  supabaseUrl: string;
  supabaseAnonKey: string;
  bucketName: string;
  tableName: string;
  isEnabled: boolean;
  isConnected: boolean;
}
