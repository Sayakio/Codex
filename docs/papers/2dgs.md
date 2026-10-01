---
Status: true
Field:
Year: 2024
DOI: 10.1145/3641519.3657428
Tags:
Authors: BinbinHuang, ZehaoYu, AnpeiChen, AndreasGeiger, ShenghuaGao
Type: conferencePaper
Citekey: 2DGS
---

# 2D Gaussian Splatting for Geometrically Accurate Radiance Fields

## ABSTRACT
3D Gaussian Splatting (3DGS) has recently revolutionized radiance field reconstruction, achieving high quality novel view synthesis and fast rendering speed without baking. However, 3DGS fails to accurately represent surfaces due to the multi-view inconsistent nature of 3D Gaussians. We present 2D Gaussian Splatting (2DGS), a novel approach to model and reconstruct geometrically accurate radiance fields from multi-view images. Our key idea is to collapse the 3D volume into a set of 2D oriented planar Gaussian disks. Unlike 3D Gaussians, 2D Gaussians provide view-consistent geometry while modeling surfaces intrinsically. To accurately recover thin surfaces and achieve stable optimization, we introduce a perspective-correct 2D splatting process utilizing ray-splat intersection and rasterization. Additionally, we incorporate depth distortion and normal consistency terms to further enhance the quality of the reconstructions. We demonstrate that our differentiable renderer allows for noise-free and detailed geometry reconstruction while maintaining competitive appearance quality, fast training speed, and real-time rendering.

## FILES & LINKS
- **URL:**  [Open Online](http://arxiv.org/abs/2403.17888)
- **Zotero Entry:** [Full Text PDF](zotero://select/library/items/7IMM228B)


## 1. PROBLEMS
给定一组已知相机位姿的多视图 RGB 图像以及 SfM 产生的稀疏点云，目标为重建兼具如下性质的辐射场：

- 高质量新视角合成与实时渲染．
- 准确、平滑且包含精细结构的表面几何．
- 无需已知稠密点云、深度或表面法向监督．

### 3D Gaussian Splatting
[3DGS](3dgs.md) 使用中心点 $\mathbf{p}_k$ 和协方差矩阵 $\mathbf{\Sigma}$ 参数化三维 Gaussian：

$$
\mathcal{G}(\mathbf{p})=\exp\!\left(-\frac{1}{2}(\mathbf{p}-\mathbf{p}_k)^\mathsf{T}\mathbf{\Sigma}^{-1}(\mathbf{p}-\mathbf{p}_k)\right)
$$

协方差分解为旋转矩阵 $\mathbf{R}$ 和缩放矩阵 $\mathbf{S}$：

$$
\mathbf{\Sigma}=\mathbf{R}\mathbf{S}\mathbf{S}^\mathsf{T}\mathbf{R}^\mathsf{T}
$$

给定世界坐标到相机坐标的变换 $\mathbf{W}$ 及投影的局部仿射 Jacobian $\mathbf{J}$ ，光线空间协方差为：

$$
\mathbf{\Sigma}'=\mathbf{J}\mathbf{W}\mathbf{\Sigma}\mathbf{W}^\mathsf{T}\mathbf{J}^\mathsf{T}
$$

去除 $\mathbf{\Sigma}'$ 的第三行和列得到二维协方差 $\mathbf{\Sigma}^{2D}$ ，再按深度排序进行体积 $\alpha$-混合：

$$
\mathbf{c}(\mathbf{x})=\sum_{k=1}^{K}\mathbf{c}_k\alpha_k\mathcal{G}_k^{2D}(\mathbf{x})\prod_{j=1}^{k-1}\left(1-\alpha_j\mathcal{G}_j^{2D}(\mathbf{x})\right)
$$

如上表示存在三个几何重建问题：

- 体积基元难以贴合薄表面．
- 基元本身没有明确表面法向．
- 不同视角使用不同的三维 Gaussian 截面，且仿射投影在远离中心处产生透视误差．

3D Gaussian 将完整角域辐射表示为具有体积的基元，与表面的薄层结构冲突．同时，3D Gaussian 在不同视角下使用不同截面求值，局部仿射投影也只在 Gaussian 中心附近准确，导致多视图几何不一致及噪声表面．

## 2. METHOD
### Modeling
将 3D Gaussian 椭球压缩为嵌入三维空间的 2D Gaussian 定向椭圆盘．2D Gaussian 由中心 $\mathbf{p}_k$，正交切向量 $\mathbf{t}_u,\mathbf{t}_v$ ，缩放向量  $\mathbf{S}=(s_u,s_v)$ 刻画，法向由切平面唯一确定：

$$
\mathbf{t}_w=\mathbf{t}_u\times\mathbf{t}_v
$$

令旋转矩阵及退化缩放矩阵为：

$$
\mathbf{R}=\begin{bmatrix}\mathbf{t}_u&\mathbf{t}_v&\mathbf{t}_w\end{bmatrix},\quad
\mathbf{S}=\operatorname{diag}(s_u,s_v,0)
$$

局部切平面坐标 $\mathbf{u}=(u,v)^\mathsf{T}$ 到世界坐标的映射为：

$$
\mathbf{P}(u,v)=\mathbf{p}_k+s_u\mathbf{t}_u u+s_v\mathbf{t}_v v
$$

齐次坐标下可写为：

$$
\begin{pmatrix}\mathbf{P}(u,v)&1\end{pmatrix}^\mathsf{T}
=\mathbf{H}\begin{pmatrix}u & v & 1 & 1\end{pmatrix}^\mathsf{T}
$$

其中：

$$
\mathbf{H}=\begin{bmatrix}
s_u\mathbf{t}_u&s_v\mathbf{t}_v&\mathbf{0}&\mathbf{p}_k\\
0&0&0&1
\end{bmatrix}
=\begin{bmatrix}
\mathbf{R}\mathbf{S}&\mathbf{p}_k\\
\mathbf{0}&1
\end{bmatrix}
$$

为 $4\times4$ 齐次变换矩阵，表示了 2D Gaussian 的几何。

局部坐标中的 2D Gaussian 为：

$$
\mathcal{G}(\mathbf{u})=\exp\!\left(-\frac{u^2+v^2}{2}\right)
$$

中心 $\mathbf{p}_k$，缩放$(s_u,s_v)$，旋转$(\mathbf{t}_u,\mathbf{t}_v)$ 均为可学习参数．各 2D Gaussian 基元还具有不透明度 $\alpha_k$ 以及球谐函数表示的视角相关颜色 $\mathbf{c}_k$ ．

[figure]
/// caption
Figure 1:  二维 Gaussian 椭圆盘的局部切平面参数化及其图像空间投影．
///

### Splatting

[Surface Splatting](surface-splatting.md) 中的仿射投影只在 Gaussian 中心准确；[Perspective Accurate Splatting](perspective-accurate-splatting.md) 中利用齐次坐标，将投影变换近似为 2D-to-2D 齐次仿射变换，但需要对变换矩阵求逆，会产生数值不稳定。

#### Ray-splat Intersection
受 [Sigg] 启发，下面显式计算像素射线与 Splat 平面的交点：

记 $\mathbf{W}\in\mathbb{R}^{4\times4}$ 为世界空间到屏幕空间的组合变换．局部切平面点由如下关系变换到齐次屏幕坐标：

$$
\mathbf{x}_h=(xz,yz,z,z)^\mathsf{T}=\mathbf{W}\mathbf{P}(u,v)=\mathbf{W}\mathbf{H}(u,v,1,1)^\mathsf{T}
$$

其中 $\mathbf{x}_{h}$ 表示从相机发出，穿过像素 $(x,y)$ ，在深度 $z$ 处与 Splat 相交的齐次射线。

给定屏幕像素 $\mathbf{x}=(x,y)^\mathsf{T}$ ，其对应射线可视为两个正交齐次平面的交线：

$$
\mathbf{h}_x=(-1,0,0,x)^\mathsf{T},\quad
\mathbf{h}_y=(0,-1,0,y)^\mathsf{T}
$$

由 [齐次平面变换法则](../books/mathematics-for-3d-game-programming-and-computer-graphics/chapter4-geometry.md#transforming-planes) 将两个屏幕空间平面变换到 Splat 的 $uv$ 坐标系：

$$
\mathbf{h}_u=(\mathbf{W}\mathbf{H})^\mathsf{T}\mathbf{h}_x,\quad
\mathbf{h}_v=(\mathbf{W}\mathbf{H})^\mathsf{T}\mathbf{h}_y
$$

由交点 $(u,v,1,1)^\mathsf{T}$ 同时位于两个平面可得：

$$
\mathbf{h}_u\cdot(u,v,1,1)^\mathsf{T}=0,\quad
\mathbf{h}_v\cdot(u,v,1,1)^\mathsf{T}=0
$$

记 $h_u^i,h_v^i$ 为两个平面的第 $i$ 个分量，且由 $\mathbf{H}$ 的结构可知 $h_u^3=h_v^3=0$ ．求解可得：

$$
u(\mathbf{x})=\frac{h_u^2h_v^4-h_u^4h_v^2}{h_u^1h_v^2-h_u^2h_v^1},\quad
v(\mathbf{x})=\frac{h_u^4h_v^1-h_u^1h_v^4}{h_u^1h_v^2-h_u^2h_v^1}
$$

由 $u(\mathbf{x}),v(\mathbf{x})$ 可计算交点的 Gaussian 值，代回齐次投影式可得真实交点深度 $z$ ．

#### Degenerate Solutions
二维 Gaussian 从侧面观察时会退化为图像空间线段，光栅化可能漏掉该基元并使优化不稳定．使用 [Botsch] 中引入的物体空间低通滤波器：

$$
\widehat{\mathcal{G}}(\mathbf{x})=\max\left\{\mathcal{G}(\mathbf{u}(\mathbf{x})),\mathcal{G}\!\left(\frac{\mathbf{x}-\mathbf{c}}{\sigma}\right)\right\}
$$

其中 $\mathbf{c}$ 为中心 $\mathbf{p}_k$ 的屏幕投影。直观来说 $\widehat{\mathcal{G}}(\mathbf{x})$ 存在固定的下界：中心为 $\mathbf{c}$ 半径为 $\sigma$ 的屏幕空间 Gaussian 低通滤波器。实验中取 $\sigma=\sqrt{2}/2$ ，保证侧视时仍有足够像素参与渲染和反向传播．

#### Rasterization
沿用 3DGS 的图块光栅化管线：首先计算各基元的屏幕空间包围盒；再按中心深度排序并复制到覆盖的图块；最后从前向后进行体积 $\alpha$-混合：

$$
\mathbf{c}(\mathbf{x})=\sum_i\mathbf{c}_i\alpha_i\widehat{\mathcal{G}}_i(\mathbf{x})\prod_{j=1}^{i-1}\left(1-\alpha_j\widehat{\mathcal{G}}_j(\mathbf{x})\right)
$$

累积不透明度饱和后停止遍历．排序仍以基元中心深度为依据，而每个像素的 Gaussian 权重和深度来自显式 ray-splat 交点．

[figure]
/// caption
Figure 2:  3D Gaussian 与 2D Gaussian 的多视图求值差异．二维基元通过 ray-splat 交点保持几何一致性．
///

### Training
仅使用光度损失会使二维基元沿射线分散并产生噪声几何．增加深度畸变和法向一致性约束，使半透明基元收敛到紧致、方向一致的表面．

#### Depth Distortion
第 $i$ 个 ray-splat 交点的混合权重为：

$$
\omega_i=\alpha_i\widehat{\mathcal{G}}_i(\mathbf{x})\prod_{j=1}^{i-1}\left(1-\alpha_j\widehat{\mathcal{G}}_j(\mathbf{x})\right)
$$

深度畸变损失最小化同一像素射线上所有交点之间的加权距离：

$$
\mathcal{L}_d=\sum_{i,j}\omega_i\omega_j|z_i-z_j|
$$

与固定采样点上的畸变约束不同，$z_i$ 是可微的 ray-splat 交点深度．梯度可直接移动 Gaussian，使有效权重集中在一个狭窄深度区间内．实现时将深度映射到 NDC 空间以降低远处基元的权重，并通过前向累积量在线计算，避免显式二重循环．

#### Normal Consistency
以累积不透明度达到 $0.5$ 时的中值交点 $\mathbf{p}_s$ 表示实际表面．通过相邻像素的中值交点有限差分估计表面法向：

$$
\mathbf{N}(x,y)=\frac{\nabla_x\mathbf{p}_s\times\nabla_y\mathbf{p}_s}{\|\nabla_x\mathbf{p}_s\times\nabla_y\mathbf{p}_s\|}
$$

将各 splat 朝向相机的法向 $\mathbf{n}_i$ 与深度图法向对齐：

$$
\mathcal{L}_n=\sum_i\omega_i\left(1-\mathbf{n}_i^\mathsf{T}\mathbf{N}\right)
$$

该约束统一了二维基元自身定义的几何与渲染深度所定义的几何．

#### Final Loss
颜色重建损失 $\mathcal{L}_c$ 由 $L_1$ 与 D-SSIM 组成，总损失为：

$$
\mathcal{L}=\mathcal{L}_c+\alpha\mathcal{L}_d+\beta\mathcal{L}_n
$$

有界场景取 $\alpha=1000$ ，无界场景取 $\alpha=100$ ，所有场景取 $\beta=0.05$ ．

### Implementation
基于 3DGS 框架编写自定义 CUDA 核，同时输出颜色、交点深度、深度畸变和法向图．增密沿用 3DGS 的自适应控制策略，但由于 ray-splat 光栅化不直接依赖投影二维中心梯度，将三维中心 $\mathbf{p}_k$ 的梯度投影到屏幕空间作为近似．梯度阈值取 $0.0002$ ，每 3000 步删除不透明度小于 $0.05$ 的基元．

#### Mesh Extraction
训练视角渲染中值深度图，再使用 TSDF 融合提取网格．DTU 实验中体素尺寸取 $0.004$ ，截断阈值取 $0.02$ ．

作为对比，期望深度为：

$$
z_{\mathrm{mean}}=\frac{\sum_i\omega_i z_i}{\sum_i\omega_i+\epsilon}
$$

中值深度定义为：

$$
z_{\mathrm{median}}=\max\{z_i\mid T_i>0.5\}
$$

其中 $T_i=\prod_{j=1}^{i-1}(1-\alpha_j\widehat{\mathcal{G}}_j)$ 为交点可见性．中值深度对离群基元更稳健，因此用于最终网格提取．

## 3. EXPERIMENTS
### Comparison
在 DTU、Tanks and Temples 和 Mip-NeRF 360 上分别评估几何重建、大尺度场景重建及新视角合成．

- **DTU：** 2DGS-15k 与 2DGS-30k 的平均 Chamfer Distance 分别为 $0.83$ 和 $0.80$ ，优于 NeuS 的 $0.84$、SuGaR 的 $1.33$ 及 3DGS 的 $1.96$ ．训练时间分别为 5.5 分钟和 10.9 分钟，而基于 SDF 的方法超过 12 小时．
- **Tanks and Temples：** 平均 F1 为 $0.32$ ，高于 SuGaR 的 $0.19$ 和 3DGS 的 $0.09$ ，但低于 Neuralangelo 的 $0.50$ ．训练约 15.5 分钟，隐式方法均超过 24 小时．
- **Mip-NeRF 360：** 室外场景达到 PSNR $24.34$、SSIM $0.717$、LPIPS $0.246$；室内场景达到 PSNR $30.40$、SSIM $0.916$、LPIPS $0.195$ ．外观质量接近 3DGS，同时提供显式、可提取的表面几何．

### Ablations
DTU 上 15k 迭代的消融结果如下：

| 设置 | Accuracy ↓ | Completion ↓ | Average ↓ |
| --- | ---: | ---: | ---: |
| 去除 Normal Consistency | 1.35 | 1.13 | 1.24 |
| 去除 Depth Distortion | 0.89 | 0.87 | 0.88 |
| 使用期望深度 | 0.88 | 1.01 | 0.94 |
| 使用 SPSR | 1.25 | 0.89 | 1.07 |
| 完整模型 | 0.79 | 0.86 | 0.83 |

法向一致性主要减少错误朝向和局部噪声；深度畸变约束避免 splat 沿射线分散，使表面法向更清晰．使用显式 ray-splat 光栅化、中值深度和 TSDF 融合时，附录中的平均重建误差进一步达到 $0.80$；仿射投影加期望深度为 $1.08$ ．

[figure]
/// caption
Figure 3:  去除法向一致性、去除深度畸变及完整模型的重建对比．
///

## 4. THINKING
- **表示与渲染必须匹配：** 将一个 3D Gaussian 的最短轴压到接近零并不等同于 2DGS ．二维表面表示还需要显式 ray-splat 相交，才能获得透视正确的局部坐标和交点深度．
- **与 [Perspective Accurate Splatting](./perspective-accurate-splatting.md#perspective-accurate-splatting-using-homogeneous-coordinates) 的关系：** 两者都从齐次坐标出发．前者投影 Gaussian 截断二次曲线以修正 splat 外形；2DGS 将像素射线写成两个齐次平面的交线，直接求其与 splat 平面的交点，避免矩阵求逆及侧视阈值剔除，更适合梯度优化．
- **两个几何约束互补：** $\mathcal{L}_d$ 约束基元沿射线的位置分布，$\mathcal{L}_n$ 约束基元切平面的方向．仅使用其中一个无法同时得到紧致且方向一致的表面．
- **中值深度的作用：** 期望深度会被低权重离群基元拉偏；以透射率 $0.5$ 为分界的中值深度更接近第一个主要表面，也更适合 TSDF 融合．
- **限制：** 默认表面完全不透明，难以处理玻璃等半透明材质；增密仍偏向纹理丰富区域，可能遗漏几何丰富但纹理平坦的细节；较强正则化会在图像质量与几何平滑度之间产生权衡，并可能过度平滑．
