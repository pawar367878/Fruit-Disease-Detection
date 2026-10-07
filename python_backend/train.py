"""
Model Training Script for EfficientNetB0 and Vision Transformer
"""
import os
import argparse
import time
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder

from models.efficientnet_model import FruitDiseaseEfficientNetB0
from models.vit_model import FruitDiseaseVisionTransformer
from dataset.dataset_prep import get_data_transforms

def train(args):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Training on device: {device}")

    train_transform, val_transform = get_data_transforms()
    
    train_dataset = ImageFolder(os.path.join(args.data_dir, 'train'), transform=train_transform)
    val_dataset = ImageFolder(os.path.join(args.data_dir, 'val'), transform=val_transform)

    train_loader = DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True, num_workers=4)
    val_loader = DataLoader(val_dataset, batch_size=args.batch_size, shuffle=False, num_workers=4)

    num_classes = len(train_dataset.classes)
    print(f"Detected {num_classes} classes.")

    # Model Selection
    if args.model == 'efficientnet':
        model = FruitDiseaseEfficientNetB0(num_classes=num_classes, pretrained=True)
    elif args.model == 'vit':
        model = FruitDiseaseVisionTransformer(num_classes=num_classes, pretrained=True)
    else:
        raise ValueError(f"Unsupported model: {args.model}")

    model.to(device)

    # Loss function & Optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.AdamW(model.parameters(), lr=args.learning_rate, weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs, eta_min=1e-6)

    best_val_acc = 0.0
    patience = 5
    patience_counter = 0
    os.makedirs(args.checkpoint_dir, exist_ok=True)

    print(f"\n--- Starting Training: {args.model.upper()} ({args.epochs} epochs) ---")

    for epoch in range(1, args.epochs + 1):
        start_time = time.time()
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * images.size(0)
            _, preds = outputs.max(1)
            correct += preds.eq(labels).sum().item()
            total += labels.size(0)

        scheduler.step()
        train_loss = running_loss / total
        train_acc = (correct / total) * 100

        # Validation
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)

                val_loss += loss.item() * images.size(0)
                _, preds = outputs.max(1)
                val_correct += preds.eq(labels).sum().item()
                val_total += labels.size(0)

        val_loss = val_loss / val_total
        val_acc = (val_correct / val_total) * 100
        epoch_time = time.time() - start_time

        print(f"Epoch {epoch:02d}/{args.epochs:02d} [{epoch_time:.1f}s] - "
              f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}% | "
              f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")

        # Early Stopping & Checkpointing
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            patience_counter = 0
            checkpoint_path = os.path.join(args.checkpoint_dir, f"best_{args.model}.pth")
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'val_acc': val_acc,
                'classes': train_dataset.classes
            }, checkpoint_path)
            print(f"  [+] Saved new best model checkpoint to {checkpoint_path} (Val Acc: {val_acc:.2f}%)")
        else:
            patience_counter += 1
            if patience_counter >= patience:
                print(f"\n[!] Early stopping triggered after {epoch} epochs (Best Val Acc: {best_val_acc:.2f}%)")
                break

    print(f"\n--- Training Complete for {args.model}. Best Val Accuracy: {best_val_acc:.2f}% ---")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', type=str, default='efficientnet', choices=['efficientnet', 'vit'])
    parser.add_argument('--data_dir', type=str, default='./dataset')
    parser.add_argument('--epochs', type=int, default=30)
    parser.add_argument('--batch_size', type=int, default=32)
    parser.add_argument('--learning_rate', type=float, default=3e-4)
    parser.add_argument('--checkpoint_dir', type=str, default='./checkpoints')
    args = parser.parse_args()
    train(args)
