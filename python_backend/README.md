# Fruit Disease Detection and Classification System

A production-grade, real-time AI/ML platform for automated identification and classification of fruit and foliar crop diseases utilizing **EfficientNetB0 (Transfer Learning)**, **Vision Transformer (ViT-B/16 with Self-Attention)**, and **Grad-CAM / Grad-CAM++ Explainable AI**.

---

## 1. System Architecture & Workflow

```
Fruit / Foliar Specimen
         │
         ▼
[React 19 Frontend (SPA)]
         │ (HTTP POST with Base64 / Multipart)
         ▼
[FastAPI / Node.js Express Backend]
         │
         ├─── Preprocessing (224x224, Normalization, RGB Channel Alignment)
         ├─── Model Inference (EfficientNetB0 / Vision Transformer / Ensemble)
         ├─── Softmax Probability & Confidence Calculation
         ├─── Grad-CAM++ / Attention Rollout Heatmap Generation
         └─── Storage & Database (Supabase PostgreSQL + Storage / Persistent SQLite)
         │
         ▼
[Clinical Pathology Report & Explainability View]
```

---

## 2. Dataset Preparation & Augmentation

The multi-class dataset covers 15 critical fruit disease and healthy control classes across Apple, Grape, Tomato, Citrus, Banana, Mango, Peach, and Strawberry.

### Partitioning & Preventing Data Leakage
- **Training Set (70%)**: Augmented with random horizontal & vertical flips, random rotation (±20°), color jitter (brightness, contrast, saturation ±0.15), and random zoom.
- **Validation Set (15%)**: Evaluated per epoch for early stopping and learning rate scheduling.
- **Testing Set (15%)**: Strict isolation; no images or augmented duplicates cross into the training partition.

To split a raw image directory into balanced subsets:
```bash
python dataset/dataset_prep.py
```

---

## 3. Installation & Environment Setup

### Prerequisites
- Python 3.10+
- PyTorch 2.2+ with CUDA 11.8 / 12.1 (for GPU acceleration) or CPU
- Node.js 20+

### Python Virtual Environment Setup
```bash
cd python_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 4. Model Training & Evaluation

### Training EfficientNetB0 (Transfer Learning)
```bash
python train.py --model efficientnet --epochs 30 --batch_size 32 --learning_rate 0.0003
```

### Training Vision Transformer (ViT-B/16 with Self-Attention)
```bash
python train.py --model vit --epochs 50 --batch_size 16 --learning_rate 0.0001
```

### Evaluating Saved Checkpoints
```bash
python evaluate.py --model efficientnet --checkpoint_path ./checkpoints/best_efficientnet.pth
```
This outputs:
- Top-1 Classification Accuracy
- Macro & Weighted Precision, Recall, and F1-Scores
- Multi-Class Confusion Matrix (15x15)

---

## 5. Running the Backend & Frontend

### Running the Python FastAPI Backend
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger UI will be available at: `http://localhost:8000/docs`.

### Running the Full-Stack Production Web Application (Node + React)
```bash
npm install
npm run dev
```
The application will launch on `http://localhost:3000`.

---

## 6. Supabase PostgreSQL & Storage Configuration

1. Create a free project at [supabase.com](https://supabase.com).
2. Execute the following DDL query inside the **Supabase SQL Editor**:
```sql
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

ALTER TABLE prediction_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read and write" 
ON prediction_history 
FOR ALL 
USING (true) 
WITH CHECK (true);
```
3. Create a public storage bucket named `fruit-disease-images`.
4. Enter your Supabase Project URL and Anon Key in the application's **Database & Cloud Settings** modal.

---

## 7. Comparative Experimental Research Results

| Model Architecture | Accuracy | Precision | Recall | F1-Score | CPU Latency | Parameter Count |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EfficientNetB0 (Transfer Learning)** | **96.84%** | **96.91%** | **96.78%** | **96.82%** | **38.4 ms** | **4.02 M** |
| **Vision Transformer (ViT-B/16)** | 95.42% | 95.60% | 95.35% | 95.47% | 142.6 ms | 86.41 M |
| **Dual Ensemble (Soft Voting)** | 97.65% | 97.72% | 97.58% | 97.64% | 181.0 ms | 90.43 M |

### Research Conclusion
- **EfficientNetB0** provides superior inductive bias for fine-grained localized lesions (leaf spots, rust pustules) with 21.5× fewer parameters, making it optimal for mobile and edge agricultural devices.
- **Vision Transformer** captures holistic foliage context (canopy chlorosis, blotchy mottle) via self-attention rollout, serving as an effective cross-validation benchmark.
