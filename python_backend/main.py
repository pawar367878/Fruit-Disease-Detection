"""
FastAPI Backend Application for Fruit Disease Detection and Classification System
"""
import os
import io
import time
import base64
import torch
import torch.nn.functional as F
import numpy as np
import cv2
from PIL import Image
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

from models.efficientnet_model import FruitDiseaseEfficientNetB0
from models.vit_model import FruitDiseaseVisionTransformer
from models.gradcam import GradCAM
from dataset.dataset_prep import get_data_transforms, CLASSES

app = FastAPI(
    title="Fruit Disease Detection & Classification API",
    description="FastAPI service with EfficientNetB0 Transfer Learning and Vision Transformer with Grad-CAM XAI",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load device and models once on startup
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
_, eval_transform = get_data_transforms()

# Initialize models
efficientnet_model = FruitDiseaseEfficientNetB0(num_classes=len(CLASSES), pretrained=False).to(device)
gradcam_engine = GradCAM(efficientnet_model, efficientnet_model.target_conv_layer)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "device": str(device),
        "classes_count": len(CLASSES),
        "primary_model": "EfficientNetB0",
        "secondary_model": "Vision Transformer (ViT-B/16)"
    }

class PredictionResponse(BaseModel):
    fruit: str
    disease_name: str
    is_healthy: bool
    confidence: float
    model_used: str
    inference_time_ms: float
    gradcam_base64: str
    top_predictions: List[dict]

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_fruit_disease(
    file: UploadFile = File(...),
    model_type: str = Form("efficientnet")
):
    try:
        start_time = time.time()
        
        # Read and validate image
        contents = await file.read()
        pil_image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Preprocess
        input_tensor = eval_transform(pil_image).unsqueeze(0).to(device)
        
        # Inference
        efficientnet_model.eval()
        with torch.no_grad():
            logits = efficientnet_model(input_tensor)
            probabilities = F.softmax(logits, dim=1).squeeze(0)
            
        top_prob, top_idx = probabilities.max(0)
        pred_class = CLASSES[top_idx.item()]
        confidence = float(top_prob.item() * 100)
        
        # Grad-CAM Heatmap generation
        cam = gradcam_engine.generate_heatmap(input_tensor, target_class=top_idx.item())
        cv2_img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        overlay = gradcam_engine.overlay_heatmap(cv2_img, cam, alpha=0.5)
        
        # Encode Grad-CAM to Base64
        _, buffer = cv2.imencode('.jpg', overlay)
        gradcam_base64 = "data:image/jpeg;base64," + base64.b64encode(buffer).decode('utf-8')
        
        latency = (time.time() - start_time) * 1000
        is_healthy = "healthy" in pred_class
        
        # Top predictions
        top_k_probs, top_k_indices = torch.topk(probabilities, 5)
        top_predictions = [
            {"class": CLASSES[idx.item()], "probability": float(prob.item())}
            for prob, idx in zip(top_k_probs, top_k_indices)
        ]
        
        fruit_name = pred_class.split('_')[0].capitalize()
        
        return PredictionResponse(
            fruit=fruit_name,
            disease_name=pred_class.replace('_', ' ').title(),
            is_healthy=is_healthy,
            confidence=round(confidence, 2),
            model_used=model_type,
            inference_time_ms=round(latency, 1),
            gradcam_base64=gradcam_base64,
            top_predictions=top_predictions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
