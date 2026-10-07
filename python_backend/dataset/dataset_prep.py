"""
Dataset Preparation & Preprocessing Pipeline
Enforces 70% Train, 15% Validation, 15% Test Split with Zero Data Leakage
"""
import os
import shutil
import random
from torchvision import transforms
from torch.utils.data import DataLoader, Dataset
from PIL import Image

CLASSES = [
    'apple_scab',
    'apple_black_rot',
    'apple_cedar_rust',
    'apple_healthy',
    'grape_black_rot',
    'grape_esca',
    'grape_healthy',
    'tomato_early_blight',
    'tomato_late_blight',
    'tomato_bacterial_spot',
    'tomato_healthy',
    'citrus_greening',
    'citrus_healthy',
    'banana_sigatoka',
    'banana_healthy'
]

def get_data_transforms():
    """
    Data Augmentation for Training, and Deterministic Normalization for Val/Test
    """
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomVerticalFlip(p=0.2),
        transforms.RandomRotation(degrees=20),
        transforms.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.15),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    eval_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    return train_transform, eval_transform

def split_dataset(source_dir: str, target_dir: str, train_ratio=0.70, val_ratio=0.15, test_ratio=0.15):
    """
    Splits multi-class image directory into train/val/test folders avoiding data leakage
    """
    os.makedirs(os.path.join(target_dir, 'train'), exist_ok=True)
    os.makedirs(os.path.join(target_dir, 'val'), exist_ok=True)
    os.makedirs(os.path.join(target_dir, 'test'), exist_ok=True)

    for class_name in os.listdir(source_dir):
        class_folder = os.path.join(source_dir, class_name)
        if not os.path.isdir(class_folder):
            continue

        images = [f for f in os.listdir(class_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        random.seed(42)
        random.shuffle(images)

        n = len(images)
        train_end = int(n * train_ratio)
        val_end = int(n * (train_ratio + val_ratio))

        splits = {
            'train': images[:train_end],
            'val': images[train_end:val_end],
            'test': images[val_end:]
        }

        for split_name, split_files in splits.items():
            dest_folder = os.path.join(target_dir, split_name, class_name)
            os.makedirs(dest_folder, exist_ok=True)
            for file_name in split_files:
                shutil.copy2(os.path.join(class_folder, file_name), os.path.join(dest_folder, file_name))

    print(f"Dataset split complete into train ({train_ratio*100}%), val ({val_ratio*100}%), test ({test_ratio*100}%).")
