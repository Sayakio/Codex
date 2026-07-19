# NeuS: Learning Neural Implicit Surfaces by Volume Rendering for Multi-view Reconstruction

## ABSTRACT
We present a novel neural surface reconstruction method, called NeuS, for reconstructing objects and scenes with high fidelity from 2D image inputs. Existing neural surface reconstruction approaches, such as DVR and IDR, require foreground mask as supervision, easily get trapped in local minima, and therefore struggle with the reconstruction of objects with severe self-occlusion or thin structures. Meanwhile, recent neural methods for novel view synthesis, such as NeRF and its variants, use volume rendering to produce a neural scene representation with robustness of optimization, even for highly complex objects. However, extracting high-quality surfaces from this learned implicit representation is difficult because there are not sufficient surface constraints in the representation. In NeuS, we propose to represent a surface as the zero-level set of a signed distance function (SDF) and develop a new volume rendering method to train a neural SDF representation. We observe that the conventional volume rendering method causes inherent geometric errors (i.e. bias) for surface reconstruction, and therefore propose a new formulation that is free of bias in the first order of approximation, thus leading to more accurate surface reconstruction even without the mask supervision. Experiments on the DTU dataset and the BlendedMVS dataset show that NeuS outperforms the state-of-the-arts in high-quality surface reconstruction, especially for objects and scenes with complex structures and self-occlusion.

## FILES & LINKS
- **URL:**  [Open Online](http://arxiv.org/abs/2106.10689)
- **Zotero Entry:** [PDF](zotero://select/library/items/24EHA565)


## 1. PROBLEMS
考虑一组 3D 物体图片 $\{\mathcal{I}_{k}\}$ ，目标为重建表面曲面 $\mathcal{S}$．


## 2. METHOD

### Scene Representation
物体场景由两个函数表示（均由 MLP 编码）：

$$
f: \mathbb{R}^3 \to \mathbb{R},\quad c: \mathbb{R}^3 \times \mathbb{S}^2 \to \mathbb{R}^3
$$

对空间点 $\mathbf{x}\in \mathbb{R}^3$ 和观察方向 $\mathbf{v}\in \mathbb{S}^2$ ，$f(\mathbf{x})$ 表示 $\mathbf{x}$ 到 $\mathcal{S}$ 的带符号距离（即 SDF），$c(\mathbf{x},\mathbf{v})$ 为对应颜色．
物体表面 $\mathcal{S}$ 可表示为 SDF 的零水平集：

$$
\mathcal{S} = \left\{ \mathbf{x}\in \mathbb{R}^3\vert f(\mathbf{x}) = 0 \right\} 
$$

引入概率密度函数 $\phi_{s}(f(\mathbf{x}))$ ，称为 **S-密度（S-density）**．其中 $\phi_{s}(x) = se^{-sx}/(1+e^{-sx})^{2}$ 称为 **逻辑密度函数（Logistics Density Distribution）**，是 Sigmoid 函数 $\Phi_{s}(x) = (1+e^{-sx})^{-1}$ 的导数．

???+ note "Remark"
	- $\phi_{s}(x)$ 可以是任意以 $0$ 为中心的钟形密度函数．
	- $\phi_{s}(x)$ 选取为逻辑密度函数有两个主要原因：计算方便（尤其积分有显式表示，见 [Solution](#solution)）以及 $\operatorname{std}(\phi_{s}) = 1/s$  可作为训练参数．


### Rendering
给定一像素 $p$ ，记 $\mathbf{o}$ 为观察点，$\mathbf{v}$ 为单位方向，$p$ 点发出的光线为 $\left\{ \mathbf{p}(t)=\mathbf{o}+t \mathbf{v}\vert t\geq 0 \right\}$．作体渲染：

$$
C(\mathbf{o},\mathbf{v}) = \int_{0}^{+\infty} w(t)c(\mathbf{p}(t),\mathbf{v}) \, dt 
$$

其中 $C(\mathbf{o},\mathbf{v})$ 为 $p$ 处输出颜色，$w(t)$ 为 $\mathbf{p}(t)$ 处权重．

关键点为建立 $C$ 和 $f$ 之间的合适联系．即基于 SDF $f$ 推导合适的权重 $w(t)$．为提高重建质量，提出如下两点约束：

- **无偏（Unbiased）**．$w(t)$ 在光线与曲面相交点处取得极大值．即：给定光线 $\mathbf{p}(t)$ ，若 $f(\mathbf{p}(t^*))=0$ ，则 $t^*$ 为 $w(t)$ 极大值点．
- **遮挡感知（Occlusion-aware）**．若两点 SDF 值相同，则距离 $\mathbf{o}$ 近的点 $w$ 值更大．即：给定 $t_{0},t_{1}$ 满足 $f(t_{0})=f(t_{1})$ 且 $t_{0}<t_{1}$ ，则 $w(t_{0})>w(t_{1})$．


### Solution
先考虑两种常见 $w(t)$：

- NeRF 中的一种自然解为：
  
    $$
    w(t) = T(t)\sigma(t)
    $$
  
    其中 $\sigma(t)$ 为 **体密度（Volume Density）**，$T(t)=\exp \left( -\int_{0}^{t} \sigma(u) \, du \right)$ 为 **累积透射率（Accumulated Transmittance）**．
  
    可取 $\sigma(t)=\phi_{s}(f(\mathbf{p}(t)))$ ，此解满足：遮挡感知✓，无偏✗．

- 一个简单的无偏构造为：
  
    $$
    w(t) = \frac{\phi_{s}(f(\mathbf{p}(t)))}{\int_{0}^{+\infty} \phi_{s}(f(\mathbf{p}(u))) \, du }
    $$
  
    此解满足：无偏✓，遮挡感知✗．


## 3. EXPERIMENTS



## 4. THINKING

