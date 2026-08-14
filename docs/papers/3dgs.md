---
Status: false
Field:
Year: 2023
DOI: 10.48550/arXiv.2308.04079
Tags:
Authors: BernhardKerbl, GeorgiosKopanas, ThomasLeimkühler, GeorgeDrettakis
Type: preprint
Citekey: 3DGS
---

# 3D Gaussian Splatting for Real-Time Radiance Field Rendering

## ABSTRACT
Radiance Field methods have recently revolutionized novel-view synthesis of scenes captured with multiple photos or videos. However, achieving high visual quality still requires neural networks that are costly to train and render, while recent faster methods inevitably trade off speed for quality. For unbounded and complete scenes (rather than isolated objects) and 1080p resolution rendering, no current method can achieve real-time display rates. We introduce three key elements that allow us to achieve state-of-the-art visual quality while maintaining competitive training times and importantly allow high-quality real-time (>= 30 fps) novel-view synthesis at 1080p resolution. First, starting from sparse points produced during camera calibration, we represent the scene with 3D Gaussians that preserve desirable properties of continuous volumetric radiance fields for scene optimization while avoiding unnecessary computation in empty space; Second, we perform interleaved optimization/density control of the 3D Gaussians, notably optimizing anisotropic covariance to achieve an accurate representation of the scene; Third, we develop a fast visibility-aware rendering algorithm that supports anisotropic splatting and both accelerates training and allows realtime rendering. We demonstrate state-of-the-art visual quality and real-time rendering on several established datasets.

## FILES & LINKS
- **URL:**  [Open Online](http://arxiv.org/abs/2308.04079)
- **Zotero Entry:** [Full Text PDF](zotero://select/library/items/G65UKH6J)


## 1. PROBLEMS



## 2. METHOD



## 3. EXPERIMENTS



## 4. THINKING

