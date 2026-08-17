---
Status: false
Field:
Year: 2023
DOI: 10.1109/ICCV51070.2023.00305
Tags: []
Authors: YimingWang, QinHan, MarcHabermann, KostasDaniilidis, ChristianTheobalt, LingjieLiu
Type: conferencePaper
Citekey: NeuS2
---

# NeuS2: Fast Learning of Neural Implicit Surfaces for Multi-view Reconstruction

## ABSTRACT
Recent methods for neural surface representation and rendering, for example NeuS, have demonstrated the remarkably high-quality reconstruction of static scenes. However, the training of NeuS takes an extremely long time (8 hours), which makes it almost impossible to apply them to dynamic scenes with thousands of frames. We propose a fast neural surface reconstruction approach, called NeuS2, which achieves two orders of magnitude improvement in terms of acceleration without compromising reconstruction quality. To accelerate the training process, we parameterize a neural surface representation by multi-resolution hash encodings and present a novel lightweight calculation of second-order derivatives tailored to our networks to leverage CUDA parallelism, achieving a factor two speed up. To further stabilize and expedite training, a progressive learning strategy is proposed to optimize multi-resolution hash encodings from coarse to fine. We extend our method for fast training of dynamic scenes, with a proposed incremental training strategy and a novel global transformation prediction component, which allow our method to handle challenging long sequences with large movements and deformations. Our experiments on various datasets demonstrate that NeuS2 significantly outperforms the state-of-the-arts in both surface reconstruction accuracy and training speed for both static and dynamic scenes. The code is available at our website: https://vcai.mpi-inf.mpg.de/projects/NeuS2/.

## FILES & LINKS
- **URL:**  [Open Online](https://ieeexplore.ieee.org/document/10378629/)
- **Zotero Entry:** [PDF](zotero://select/library/items/EUSXKR56)


## 1. PROBLEMS
给定一组 3D 物体图片 $\{\mathcal{I}_{k}\}$ ，目标为提高表面 $\mathcal{S}$ 重建速度．

[NeuS](neus.md#training) 中使用的 Eikonal Loss 必不可少，加速关键为高效地计算用于反向传播的二阶导数。

[InstantNSR] 采用有限差分方式拟合，存在精度和训练不稳定问题。

## 2. METHOD
### Hash-encoded Volume Rendering
对于点 $\mathbf{x}$ ，将其映射到多分辨率哈希编码 $\gamma_{\Omega}(\mathbf{x})$ 。

- SDF 网络：
	
	SDF 网络 $f$ 为参数 $\Theta$ 的浅层 MLP：
	
	$$
	(d,\mathbf{g}) = f_{\Theta}(\mathbf{e}), \quad \mathbf{e} = (\mathbf{x}, \gamma_{\Omega}(\mathbf{x}))
	$$
	
	其中 $\mathbf{e}$ 拼接了坐标，可当作几何初始化（[SAL]）。网络输出为 SDF 值 $d$ 和几何特征向量 $\mathbf{g}\in \mathbb{R}^{15}$ 。

 - Color 网络：
	
	给定点$\mathbf{x}$ ，该处法向计算为：
	
	$$
	\mathbf{n} = \nabla_{\mathbf{x}}d
	$$
	
	结合法向 $\mathbf{n}$ ，几何特征 $\mathbf{g}$ ，SDF 值 $d$ ，点 $\mathbf{x}$ ，光线方向 $\mathbf{v}$ ，输入到参数 $\Gamma$ 的 Color 网络 $c$ ：
	
	$$
	\mathbf{c} = c_{\Gamma}(\mathbf{x},\mathbf{n},\mathbf{v},d,\mathbf{g})
	$$
	
	可预测 $\mathbf{x}$ 处的 Color 值 $\mathbf{c}$ 。

- Volume Rendering：
	
	采用 [NeuS](neus.md#rendering) 中的无偏体渲染方式渲染图像。
	
	采用 [Instant-NGP](instant-ngp.md) 中的光线追踪加速策略。

### Efficient Second-order Derivatives
为了加速二阶导数计算，选择直接使用简化公式，放弃 PyTorch 的计算图。

关于哈希表参数 $\Omega$ 和 SDF 网络参数 $\Theta$ 的二阶导数计算如下：

$$
\begin{align}
\frac{\partial \mathcal{L}}{\partial\Omega} &= \frac{\partial \mathcal{L}}{\partial \mathbf{n}} \left( \frac{\partial \mathbf{e}}{\partial \mathbf{x}} \frac{\partial\frac{\partial d}{\partial \mathbf{e}}}{\partial \mathbf{e}} \frac{\partial \mathbf{e}}{\partial\Omega} + \frac{\partial d}{\partial \mathbf{e}} \frac{\partial \frac{\partial \mathbf{e}}{\partial \mathbf{x}}}{\partial\Omega} \right)  \\
\frac{\partial \mathcal{L}}{\partial\Theta} &= \frac{\partial \mathcal{L}}{\partial \mathbf{n}} \left( \frac{\partial \mathbf{e}}{\partial \mathbf{x}} \frac{\partial\frac{\partial d}{\partial \mathbf{e}}}{\partial \Theta} + \frac{\partial d}{\partial \mathbf{e}} \frac{\partial \frac{\partial \mathbf{e}}{\partial \mathbf{x}}}{\partial\Theta} \right)
\end{align}
$$

对于基于 ReLU 的 MLP ，如上计算式可以大幅简化，从而提高计算速度。具体细节由如下定理给出：


## 3. EXPERIMENTS



## 4. THINKING

