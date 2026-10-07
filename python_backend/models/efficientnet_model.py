"""
EfficientNetB0 with Transfer Learning for Fruit Disease Classification
"""
import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights

class FruitDiseaseEfficientNetB0(nn.Module):
    def __init__(self, num_classes: int = 15, pretrained: bool = True, freeze_backbone_epochs: int = 5):
        super(FruitDiseaseEfficientNetB0, self).__init__()
        
        # Load weights
        weights = EfficientNet_B0_Weights.DEFAULT if pretrained else None
        self.base_model = efficientnet_b0(weights=weights)
        
        # Target layer for Grad-CAM inspection
        self.target_conv_layer = self.base_model.features[-1]
        
        # Classifier Head customization
        in_features = self.base_model.classifier[1].in_features
        self.base_model.classifier = nn.Sequential(
            nn.Dropout(p=0.3, inplace=True),
            nn.Linear(in_features=in_features, out_features=512),
            nn.BatchNorm1d(512),
            nn.SiLU(inplace=True),
            nn.Dropout(p=0.2),
            nn.Linear(in_features=512, out_features=num_classes)
        )
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.base_model(x)

    def freeze_backbone(self):
        """Freeze early convolutional feature extraction layers for transfer learning warmup"""
        for param in self.base_model.features.parameters():
            param.requires_grad = False

    def unfreeze_backbone(self):
        """Unfreeze all layers for complete end-to-end fine-tuning"""
        for param in self.base_model.features.parameters():
            param.requires_grad = True
