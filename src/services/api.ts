import { HistoryRecord, ModelType, PredictionResult, SupabaseSettings } from '../types';

export async function runPrediction(
  imageData: string,
  modelUsed: ModelType = 'efficientnet',
  specimenHint?: string
): Promise<PredictionResult> {
  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: imageData,
      model: modelUsed,
      specimenHint: specimenHint,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Prediction failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchHistory(): Promise<HistoryRecord[]> {
  try {
    const response = await fetch('/api/history');
    if (!response.ok) {
      throw new Error(`Failed to load history: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.warn('Backend history fetch failed, checking localStorage fallback:', error);
    const local = localStorage.getItem('fruit_disease_history');
    if (local) {
      return JSON.parse(local);
    }
    return [];
  }
}

export async function deleteHistoryRecord(id: string): Promise<void> {
  try {
    await fetch(`/api/history/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error deleting history record:', error);
  }
  // also update local cache
  const local = localStorage.getItem('fruit_disease_history');
  if (local) {
    const parsed: HistoryRecord[] = JSON.parse(local);
    localStorage.setItem('fruit_disease_history', JSON.stringify(parsed.filter(r => r.id !== id)));
  }
}

export async function clearAllHistory(): Promise<void> {
  try {
    await fetch('/api/history', { method: 'DELETE' });
  } catch (error) {
    console.error('Error clearing history:', error);
  }
  localStorage.removeItem('fruit_disease_history');
}

export async function fetchSupabaseConfig(): Promise<SupabaseSettings> {
  try {
    const response = await fetch('/api/supabase/config');
    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    console.warn('Could not fetch Supabase config:', err);
  }
  return {
    supabaseUrl: '',
    supabaseAnonKey: '',
    bucketName: 'fruit-disease-images',
    tableName: 'prediction_history',
    isEnabled: false,
    isConnected: false
  };
}

export async function saveSupabaseConfig(config: SupabaseSettings): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/supabase/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  return response.json();
}
