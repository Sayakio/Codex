---
stats: "true"
---
> Vectors and matrices are of fundamental importance in any 3D game engine. They are used to represent points, spatial directions, surface normals, and move one coordinate space to another.

## 1. VECTORS
一个 $n$ 维 **向量（Vector）** $\mathbf{v}$ 可记为：

$$
\mathbf{v} = \left< v_{1},v_{2},\dots,v_{n} \right> 
$$

或以矩阵形式记为：

$$
\mathbf{V} = \begin{bmatrix}
V_{1} \\
V_{2} \\
\vdots \\
V_{n}
\end{bmatrix}
$$

$n$ 维向量 $\mathbf{v}$ 的 **模（Magnitude）** 或称 **范数（Norm）**、**长度（Length）** 定义为：

$$
\Vert \mathbf{v} \Vert = \sqrt{ \sum_{i=1}^n v_{i}^{2} }
$$

### Dot Product
$n$ 维向量 $\mathbf{p},\mathbf{q}$ 之间的点乘定义为如下标量：

$$
\mathbf{p}\cdot \mathbf{q} = \sum_{i=1}^n p_{i}q_{i} = \Vert \mathbf{p} \Vert \Vert \mathbf{q} \Vert \cos \alpha
$$

### Cross Product
$3$ 维向量 $\mathbf{p},\mathbf{q}$ 之间的叉乘定义为如下 $3$ 维向量：

$$
\mathbf{p}\times \mathbf{q} = \left< p_{y}q_{z}-p_{z}q_{y},p_{z}q_{x}-p_{x}q_{z},p_{x}q_{y}-p_{y}q_{x} \right> 
$$

可写成矩阵乘积形式：

$$
\mathbf{p}\times \mathbf{q} = \begin{bmatrix}
0 & -p_{z} & p_{y}  \\
p_{z} & 0 & -p_{x}  \\
-p_{y} & p_{x} & 0  
\end{bmatrix}
\begin{bmatrix}
q_{x}  \\
q_{y}  \\
q_{z}
\end{bmatrix}
$$

叉乘的模有如下计算公式：

$$
\Vert \mathbf{p}\times \mathbf{q}\Vert = \Vert \mathbf{p} \Vert \Vert \mathbf{q} \Vert \sin\alpha
$$

对于多次叉乘，有如下常用性质：

$$
\mathbf{p}\times(\mathbf{q}\times \mathbf{p}) = (\mathbf{p}\times \mathbf{q})\times \mathbf{p} = (\mathbf{p}\cdot \mathbf{p})\mathbf{q} - (\mathbf{p}\cdot \mathbf{q})\mathbf{p}
$$

### Vector Projection
向量 $\mathbf{p}$  在向量 $\mathbf{q}$ 上的投影为：

$$
\operatorname{proj}_{\mathbf{q}}\mathbf{p} = \frac{\mathbf{p}\cdot \mathbf{q}}{\Vert \mathbf{q} \Vert^{2}} \cdot \mathbf{q}
$$

向量 $\mathbf{p}$ 与向量 $\mathbf{q}$ 垂直的分量为：

$$
\begin{align}
\operatorname{perp}_{\mathbf{q}}\mathbf{p} &= \mathbf{p} - \operatorname{proj}_{\mathbf{q}}\mathbf{p} \\
&= \mathbf{p} - \frac{\mathbf{p}\cdot \mathbf{q}}{\Vert \mathbf{q} \Vert^{2}} \cdot \mathbf{q}
\end{align}
$$

### Gram-Schmidt Orthogonalization
设 $\mathcal{B} = \left\{ \mathbf{e}_{1},\mathbf{e}_{2},\dots,\mathbf{e}_{n} \right\}$ 为 $n$ 维线性空间的一组基，其可由如下过程进行正交化得到 $\mathcal{B}' = \left\{ \mathbf{e}_{1}',\mathbf{e}_{2}',\dots,\mathbf{e}_{n}' \right\}$ ：

$$
\mathbf{e}_{i}' = \mathbf{e}_{i} - \sum_{j=1}^{i-1}\frac{\mathbf{e}_{i}\cdot \mathbf{e}_{j}'}{(\mathbf{e}_{j}')^{2}} \cdot \mathbf{e}_{j}'
$$


## 2. MATRICES
一个 $n\times m$ **矩阵（Matrix）** $\mathbf{M}$ 为 $n$ 行 $m$ 列的数组，若 $n=m$ 称之为 **方阵（Square）**．

### Matrix Product
设 $n\times m$ 矩阵 $\mathbf{A}$ 和 $m\times p$ 矩阵 $\mathbf{B}$ ，其乘积 $AB$ 为如下 $n\times p$ 矩阵：

$$
(AB)_{ij} = \sum_{k=1}^m A_{ik}B_{kj}
$$

### Determinant
$n\times n$ 方阵 $\mathbf{M}$ 的 **行列式（Determinant）** 定义为：

$$
\det \mathbf{M} = \sum_{i=1}^n M_{ik}C_{ik}(\mathbf{M}) = \sum_{j=1}^n M_{kj}C_{kj}(\mathbf{M})
$$

其中 $C_{ij}(\mathbf{M})=(-1)^{i+j}\det \mathbf{M}^{\{i,j\}}$ ，$\mathbf{M}^{\{i,j\}}$ 为 $\mathbf{M}$ 去除第 $i$ 行和第 $j$ 列的 $(n-1)\times(m-1)$ 矩阵．

### Matrix Inverse
$n\times n$ 方阵 $\mathbf{M}$ 可逆 $\iff$ $\mathbf{M}$ 列向量线性无关 $\iff$ $\det \mathbf{M}\neq 0$ ．

$\mathbf{M}$ 的 **逆（Inverse）** $\mathbf{M}^{-1}$ 可计算如下：

$$
(\mathbf{M}^{-1})_{ij} = \frac{C_{ji}(\mathbf{M})}{\det \mathbf{M}}
$$

### Eigenvalue & Eigenvector
$n\times n$ 方阵 $\mathbf{M}$ 的 **特征值（Eigenvalue）** 为如下特征多项式的根：

$$
\det(\mathbf{M}-\lambda \mathbf{I})
$$

$\mathbf{M}$ 特征值 $\lambda$ 对应的 **特征向量（Eigenvector）** $\mathbf{v}$ 为如下线性系统的解：

$$
(\mathbf{M}-\lambda \mathbf{I})\mathbf{v} = \mathbf{0}
$$

实对称矩阵有如下特殊性质：

- 特征值为实数．
- 不同特征值对应的特征向量互相正交．


### Diagonalization
设 $\mathbf{v}_{1},\mathbf{v}_{2},\dots,\mathbf{v}_{n}$ 为 $n\times n$ 方阵 $\mathbf{M}$ 线性无关的特征向量，则如下矩阵：

$$
\mathbf{P} = \begin{bmatrix}
\mathbf{v}_{1} & \mathbf{v}_{2} & \cdots & \mathbf{v}_{n}
\end{bmatrix}
$$

对角化 $\mathbf{M}$，即：

$$
\mathbf{P}^{-1}\mathbf{M}\mathbf{P} = \begin{bmatrix}
\lambda_{1} & 0 & \cdots & 0  \\
0 & \lambda_{2} & \cdots & 0  \\
\vdots & \vdots & \ddots & \vdots  \\
0 & 0 & \cdots & \lambda_{n}
\end{bmatrix}
$$

其中 $\lambda_{1},\lambda_{2},\dots,\lambda_{n}$ 为 $\mathbf{M}$ 的特征值．

