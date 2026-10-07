"""
Grad-CAM and Grad-CAM++ implementation for EfficientNetB0
"""
import torch
import torch.nn.functional as F
import numpy as np
import cv2

class GradCAM:
    def __init__(self, model: torch.nn.Module, target_layer: torch.nn.Module):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        
        # Register hooks
        self.target_layer.register_forward_hook(self._save_activation)
        self.target_layer.register_full_backward_hook(self._save_gradient)
        
    def _save_activation(self, module, input, output):
        self.activations = output.detach()
        
    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()
        
    def generate_heatmap(self, input_tensor: torch.Tensor, target_class: int = None) -> np.ndarray:
        self.model.eval()
        self.model.zero_grad()
        
        output = self.model(input_tensor)
        
        if target_class is None:
            target_class = output.argmax(dim=1).item()
            
        one_hot = torch.zeros_like(output)
        one_hot[0, target_class] = 1.0
        output.backward(gradient=one_hot, retain_graph=True)
        
        # Calculate alpha weights via Global Average Pooling of gradients
        # alpha_k^c = (1/Z) * sum_i sum_j (d y^c / d A_ij^k)
        weights = torch.mean(self.gradients, dim=(2, 3), keepdim=True)
        
        # Weighted linear combination
        cam = torch.sum(weights * self.activations, dim=1, keepdim=True)
        
        # ReLU: Keep only features that positively correlate with the target class
        cam = F.relu(cam)
        
        # Normalize between 0 and 1
        cam = cam.squeeze().cpu().numpy()
        cam = (cam - np.min(cam)) / (np.max(cam) - np.min(cam) + 1e-8)
        
        return cam

    def overlay_heatmap(self, original_image_bgr: np.ndarray, cam: np.ndarray, alpha: float = 0.5) -> np.ndarray:
        h, w = original_image_bgr.shape[:2]
        cam_resized = cv2.resize(cam, (w, h))
        heatmap = cv2.applyColorMap(np.uint8(255 * cam_resized), cv2.COLORMAP_JET)
        overlay = cv2.addWeighted(original_image_bgr, 1 - alpha, heatmap, alpha, 0)
        return overlay
