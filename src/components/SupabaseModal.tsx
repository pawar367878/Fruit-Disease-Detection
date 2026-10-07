import React, { useState } from 'react';
import { SupabaseSettings } from '../types';
import { Database, CheckCircle2, AlertCircle, X, Copy, Check, ExternalLink } from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SupabaseSettings;
  onSave: (settings: SupabaseSettings) => Promise<{ success: boolean; message: string }>;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<SupabaseSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const supabaseSqlSchema = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS prediction_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    fruit TEXT NOT NULL,
    fruit_display_name TEXT NOT NULL,
    disease_name TEXT NOT NULL,
    pathogen TEXT,
    is_healthy BOOLEAN NOT NULL DEFAULT false,
    confidence NUMERIC(5,2) NOT NULL,
    model_used TEXT NOT NULL,
    image_url TEXT NOT NULL,
    gradcam_url TEXT NOT NULL,
    affected_region_ratio NUMERIC(5,2),
    notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE prediction_history ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read & write for applet integration
CREATE POLICY "Allow public read and write" 
ON prediction_history 
FOR ALL 
USING (true) 
WITH CHECK (true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(supabaseSqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    try {
      const res = await onSave(formData);
      setFeedback(res);
    } catch (err: any) {
      setFeedback({ success: false, message: err.message || 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-stone-100">
              Supabase PostgreSQL & Storage Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed">
          The system operates automatically using a built-in persistent SQLite database and local image storage. Connect your personal Supabase project below for persistent cloud PostgreSQL replication and Supabase Storage synchronization.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-stone-300 mb-1">
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={formData.supabaseUrl}
              onChange={(e) => setFormData({ ...formData, supabaseUrl: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-stone-300 mb-1">
              Supabase Anon / Public Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={formData.supabaseAnonKey}
              onChange={(e) => setFormData({ ...formData, supabaseAnonKey: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-stone-300 mb-1">
                Storage Bucket Name
              </label>
              <input
                type="text"
                value={formData.bucketName}
                onChange={(e) => setFormData({ ...formData, bucketName: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-stone-300 mb-1">
                Table Name
              </label>
              <input
                type="text"
                value={formData.tableName}
                onChange={(e) => setFormData({ ...formData, tableName: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="enableSupabase"
              checked={formData.isEnabled}
              onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
              className="rounded border-stone-700 text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="enableSupabase" className="text-xs text-stone-300 cursor-pointer">
              Enable Supabase Cloud Sync (automatic upload & logging)
            </label>
          </div>

          {feedback && (
            <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              feedback.success ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border border-rose-800 text-rose-300'
            }`}>
              {feedback.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* SQL Schema helper */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>PostgreSQL DDL Schema</span>
              <button
                type="button"
                onClick={handleCopySql}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
            <pre className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-[10px] text-stone-400 font-mono overflow-x-auto max-h-32">
              {supabaseSqlSchema}
            </pre>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
            >
              {isSaving ? 'Verifying & Saving...' : 'Save & Verify Connection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
