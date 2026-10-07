"""
Model Evaluation Script
Generates Test Accuracy, Precision, Recall, F1-Score and Confusion Matrix
"""
import os
import argparse
import torch
import numpy as np
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
from sklearn.metrics import classification_report, confusion_matrix

from models.efficientnet_model import FruitDiseaseEfficientNetB0
from models.vit_model import FruitDiseaseVisionTransformer
from dataset.dataset_prep import get_data_transforms

def evaluate(args):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Evaluating on device: {device}")

    _, test_transform = get_data_transforms()
    test_dataset = ImageFolder(os.path.join(args.data_dir, 'test'), transform=test_transform)
    test_loader = DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False)

    num_classes = len(test_dataset.classes)
    
    if args.model == 'efficientnet':
        model = FruitDiseaseEfficientNetB0(num_classes=num_classes, pretrained=False)
    elif args.model == 'vit':
        model = FruitDiseaseVisionTransformer(num_classes=num_classes, pretrained=False)
    else:
        raise ValueError("Invalid model")

    checkpoint = torch.load(args.checkpoint_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.to(device)
    model.eval()

    all_preds = []
    all_targets = []

    print("\nRunning inference across isolated test split...")
    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device)
            outputs = model(images)
            _, preds = outputs.max(1)
            all_preds.extend(preds.cpu().numpy())
            all_targets.extend(labels.numpy())

    all_preds = np.array(all_preds)
    all_targets = np.array(all_targets)

    # Classification Report
    print("\n================ CLASSIFICATION REPORT ================")
    report = classification_report(all_targets, all_preds, target_names=test_dataset.classes, digits=4)
    print(report)

    # Confusion Matrix
    cm = confusion_matrix(all_targets, all_preds)
    print("\n================ CONFUSION MATRIX ================")
    print(cm)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', type=str, default='efficientnet', choices=['efficientnet', 'vit'])
    parser.add_argument('--data_dir', type=str, default='./dataset')
    parser.add_argument('--checkpoint_path', type=str, default='./checkpoints/best_efficientnet.pth')
    parser.add_argument('--batch_size', type=int, default=32)
    args = parser.parse_args()
    evaluate(args)
