---
stats: "true"
---
> This chapter develops the mathematics that describe lines and planes in threedimensional space, then introduce the view frustum and examine some of the important mathematics governing the virtual camera through which we see our game universe.

## 1. LINES IN 3D SPACE

给定 3D 点 $\mathbf{p}_{1}$ 和 $\mathbf{p}_{2}$ ，可定义经过两点的直线如下：

$$
\mathbf{p}(t) = (1-t) \mathbf{p}_{1} + t\mathbf{p}_{2} \quad (t\in \mathbb{R})
$$

记 $\mathbf{s}=\mathbf{p}_{1}$ ，$\mathbf{v}=\mathbf{p}_{2}-\mathbf{p}_{1}$ ，上式可改写成：

$$
\mathbf{p}(t) = \mathbf{s} + t\mathbf{v}
$$

若约束 $t\in[0,+\infty)$ ，则其表示一条 **射线（Ray）**，其中 $\mathbf{s}$ 为端点，$\mathbf{v}$ 为方向。

### Distance Between a Point and a Line

给定点 $\mathbf{q}$ 和直线 $\mathbf{p}(t)=\mathbf{s}+t\mathbf{v}$ ，点到直线的距离 $d$ 可由勾股定理得出，计算和示意图如下：

$$
\begin{align}
d^{2} &= (\mathbf{q}-\mathbf{s})^{2} - [\operatorname{proj}_{\mathbf{v}}(\mathbf{q}-\mathbf{s})]^{2} \\
&= (\mathbf{q}-\mathbf{s})^{2} - \left[ \frac{(\mathbf{q}-\mathbf{s})\cdot \mathbf{v}}{\mathbf{v}^{2}} \mathbf{v} \right]^{2}
\end{align}
$$

即：

$$
d = \sqrt{ (\mathbf{q}-\mathbf{s})^{2} - \frac{[(\mathbf{q}-\mathbf{s})\cdot \mathbf{v}]^{2}}{\mathbf{v}^{2}} }
$$

![distance-point&line](./assets/chap4-distance-pl.png)
/// caption
Figure 1:  点 $\mathbf{q}$ 到直线 $\mathbf{s}+t\mathbf{v}$ 距离 $d$ 计算示意图。
///

### Distance Between Two Lines

在三维中，两条直线有三种位置关系：平行、相交、**异面（Skew）**。下面推导两条异面直线之间的最小距离：

给定两条直线：

$$
\begin{align}
\mathbf{p}_{1}(t_{1}) &= \mathbf{s}_{1} + t_{1}\mathbf{v}_{1}\quad (t_{1}\in \mathbb{R}) \\
\mathbf{p}_{2}(t_{2}) &= \mathbf{s}_{2} + t_{2}\mathbf{v}_{2}\quad (t_{2}\in \mathbb{R})
\end{align}
$$

两点 $\mathbf{p}_{1}(t_{1}),\mathbf{p}_{2}(t_{2})$ 之间的平方距离可记为如下函数：

$$
\begin{align}
f(t_{1},t_{2}) &= \Vert \mathbf{p}_{1}(t_{1}) - \mathbf{p}_{2}(t_{2}) \Vert^{2} \\
&= \mathbf{s}_{1}^{2}+t_{1}^{2}\mathbf{v}_{1}^{2}+2t_{1}\mathbf{s}_{1}\cdot\mathbf{v}_{1}+\mathbf{s}_{2}^{2}+t_{2}^{2}\mathbf{v}_{2}^{2}+2t_{2}\mathbf{s}_{2}\cdot \mathbf{v}_{2} \\
&\qquad -2(\mathbf{s}_{1}\cdot \mathbf{s}_{2}+t_{1}\mathbf{v}_{1}\cdot \mathbf{s}_{2}+t_{2}\mathbf{v}_{2}\cdot \mathbf{s}_{1}+t_{1}t_{2}\mathbf{v}_{1}\cdot \mathbf{v}_{2})
\end{align}
$$

最小值在 $f$ 关于 $t_{1},t_{2}$ 偏导数为 $0$ 时取得，即：

$$
\begin{align}
\frac{\partial f}{\partial t_{1}} &= 2t_{1}\mathbf{v}_{1}^{2}+2\mathbf{s}_{1}\cdot \mathbf{v}_{1}-2\mathbf{v}_{1}\cdot \mathbf{s}_{2}-2t_{2}\mathbf{v}_{1}\cdot \mathbf{v}_{2} = 0 \\
\frac{\partial f}{\partial t_{2}} &= 2t_{2}\mathbf{v}_{2}^{2}+2\mathbf{s}_{2}\cdot \mathbf{v}_{2}-2\mathbf{v}_{2}\cdot \mathbf{s}_{1}-2t_{1}\mathbf{v}_{1}\cdot \mathbf{v}_{2} = 0
\end{align}
$$

将如上方程转化为矩阵形式：

$$
\begin{bmatrix}
\mathbf{v}_{1}^{2} & -\mathbf{v}_{1}\cdot \mathbf{v}_{2} \\
\mathbf{v}_{1}\cdot \mathbf{v}_{2} & -\mathbf{v}_{2}^{2}
\end{bmatrix} \begin{bmatrix}
t_{1} \\
t_{2}
\end{bmatrix} = \begin{bmatrix}
(\mathbf{s}_{2}-\mathbf{s}_{1})\cdot \mathbf{v}_{1} \\
(\mathbf{s}_{2}-\mathbf{s}_{1})\cdot \mathbf{v}_{2}
\end{bmatrix}
$$

求解得：

$$
\begin{align}
\begin{bmatrix}
t_{1} \\
t_{2}
\end{bmatrix} &= \begin{bmatrix}
\mathbf{v}_{1}^{2} & -\mathbf{v}_{1}\cdot \mathbf{v}_{2} \\
\mathbf{v}_{1}\cdot \mathbf{v}_{2} & -\mathbf{v}_{2}^{2}
\end{bmatrix}^{-1} \begin{bmatrix}
(\mathbf{s}_{2}-\mathbf{s}_{1})\cdot \mathbf{v}_{1} \\
(\mathbf{s}_{2}-\mathbf{s}_{1})\cdot \mathbf{v}_{2}
\end{bmatrix} \\
&= \frac{1}{(\mathbf{v}_{1}\cdot \mathbf{v}_{2})^{2}-\mathbf{v}_{1}^{2}\mathbf{v}_{2}^{2}} \begin{bmatrix}
-\mathbf{v}_{2}^{2} & \mathbf{v}_{1}\cdot \mathbf{v}_{2} \\
-\mathbf{v}_{1}\cdot \mathbf{v}_{2} & \mathbf{v}_{1}^{2}
\end{bmatrix} \begin{bmatrix}
(\mathbf{s}_{2}-\mathbf{s}_{1})\cdot \mathbf{v}_{1} \\
(\mathbf{s}_{2}-\mathbf{s}_{1})\cdot \mathbf{v}_{2}
\end{bmatrix}
\end{align}
$$

回代到 $f$ 表达式并开根号即可得到最小距离。注意到若 $(\mathbf{v}_{1}\cdot \mathbf{v}_{2})^{2}=\mathbf{v}_{1}^{2}\mathbf{v}_{2}^{2}$ ，则两条直线平行，最小距离转化为点到直线距离。

## 2. PLANES IN 3D SPACE

给定 3D 点 $\mathbf{p}$ 和法向量 $\mathbf{n}$ ，经过点 $\mathbf{p}$ 并垂直于 $\mathbf{n}$ 的平面定义为满足 $\mathbf{n}\cdot(\mathbf{q}-\mathbf{p})=0$ 的点集 $\{\mathbf{q}\}$ 。其方程通常写为：

$$
Ax + By + Cz + D = 0
$$

其中 $\mathbf{n}=\left< A,B,C \right>$ ，$D=-\mathbf{n}\cdot \mathbf{p}$ 。原点到平面的距离由 $\left| D \right|/\Vert\mathbf{n}\Vert$ 给出。当 $\mathbf{n}$ 为单位向量时，方程：

$$
d = \mathbf{n}\cdot \mathbf{q} + D
$$

给出任意点 $\mathbf{q}$ 到平面的带符号距离。特别的，$\left| D \right|$ 为原点到平面距离。

使用 4D 齐次坐标表示平面会更简洁：

记 $\mathbf{L}:=\left< \mathbf{n},D \right>=\left< A,B,C,D \right>$ ，$\mathbf{Q}:=\left< \mathbf{q},1 \right>$ ，则平面方程为 $\mathbf{L}\cdot \mathbf{Q}=0$ ，距离方程为 $d=\mathbf{L}\cdot \mathbf{Q}$ 。

### Intersection of a Line and a Plane

给定直线 $\mathbf{p}(t)=\mathbf{s}+t\mathbf{v}$ 和平面 $\left< \mathbf{n},D \right>$ ，可求解如下方程得到直线和平面的交点：

$$
\mathbf{n}\cdot \mathbf{p}(t) + D = 0
$$

替换 $\mathbf{p}(t)=\mathbf{s}+t\mathbf{v}$ 有：

$$
\mathbf{n}\cdot \mathbf{s} + (\mathbf{n}\cdot \mathbf{v})t + D = 0
$$

求解得：

$$
t = \frac{-(\mathbf{n}\cdot \mathbf{s} + D)}{\mathbf{n}\cdot \mathbf{v}}
$$

回代到 $\mathbf{p}(t)$ 表达式即得交点。注意到若 $\mathbf{n}\cdot \mathbf{v}=0$ ，直线和平面法向垂直。此时若 $\mathbf{n}\cdot \mathbf{s}+D=0$ 则直线在平面内，否则直线与平面平行。

同理有 4D 齐次坐标表示：

记 $\mathbf{S}:=\left< \mathbf{s},1 \right>$ ，$\mathbf{V}:=\left< \mathbf{v},0 \right>$ ，交点方程为：

$$
t = -\frac{\mathbf{L}\cdot \mathbf{S}}{\mathbf{L}\cdot \mathbf{V}}
$$

### Intersection of Three Planes

给定三个任意平面 $\mathbf{L}_{1}=\left< \mathbf{n}_{1},D_{1} \right>,\mathbf{L}_{2}=\left< \mathbf{n}_{2},D_{2} \right>,\mathbf{L}_{3}=\left< \mathbf{n}_{3},D_{3} \right>$ ，三个平面的交点 $\mathbf{Q}$ 由如下方程组给出：

$$
\begin{align}
\mathbf{L}_{1}\cdot \mathbf{Q} &= 0 \\
\mathbf{L}_{2}\cdot \mathbf{Q} &= 0 \\
\mathbf{L}_{3}\cdot \mathbf{Q} &= 0
\end{align}
$$

写成矩阵形式有：

$$
\mathbf{M}\mathbf{q} = \begin{bmatrix}
-D_{1} \\
-D_{2} \\
-D_{3}
\end{bmatrix}
$$

其中 $\mathbf{M}$ 为：

$$
\mathbf{M} = \begin{bmatrix}
(\mathbf{n}_{1})_{x} & (\mathbf{n}_{1})_{y} & (\mathbf{n}_{1})_{z} \\
(\mathbf{n}_{2})_{x} & (\mathbf{n}_{2})_{y} & (\mathbf{n}_{2})_{z} \\
(\mathbf{n}_{3})_{x} & (\mathbf{n}_{3})_{y} & (\mathbf{n}_{3})_{z}
\end{bmatrix}
$$

若 $\mathbf{M}$ 可逆，求解可得交点 $\mathbf{q}$ ：

$$
\mathbf{q} = \mathbf{M}^{-1}\begin{bmatrix}
-D_{1} \\
-D_{2} \\
-D_{3}
\end{bmatrix}
$$

若 $\det \mathbf{M}=0$ 即 $\mathbf{M}$ 奇异，此时三个法向量共面，如下图所示：

![3planes](./assets/chap4-3planes.png)
/// caption
Figure 2:  三平面未交于一点示意图。
///

三平面交点方程可以解决如下两平面相交直线问题：

给定两个不平行平面 $\mathbf{L}_{1}=\left< \mathbf{n}_{1},D_{1} \right>,\mathbf{L}_{2}=\left< \mathbf{n}_{2},D_{2} \right>$ ，会交于一条直线。直线方向 $\mathbf{v}$ 与两个平面的法向垂直，从而可表示为 $\mathbf{v}=\mathbf{n}_{1}\times \mathbf{n}_{2}$ 。为完全表示该直线，还需直线上一点。为此构造平面 $\mathbf{L}_{3}=\left< \mathbf{v},0 \right>$ ，利用三平面交点方程可得：

$$
\mathbf{q} = \begin{bmatrix}
(\mathbf{n}_{1})_{x} & (\mathbf{n}_{1})_{y} & (\mathbf{n}_{1})_{z} \\
(\mathbf{n}_{2})_{x} & (\mathbf{n}_{2})_{y} & (\mathbf{n}_{2})_{z} \\
\mathbf{v}_{x} & \mathbf{v}_{y} & \mathbf{v}_{z}
\end{bmatrix}^{-1} \begin{bmatrix}
-D_{1} \\
-D_{2} \\
0
\end{bmatrix}
$$

相交直线即为 $\mathbf{p}(t)=\mathbf{q}+t\mathbf{v}$ 。示意图如下：

![2planes-1line](./assets/chap4-2planes1line.png)
/// caption
Figure 3:  两平面相交于方向为 $\mathbf{v}$ 的直线。构造第三个平面可找到直线上一点。
///


### Transforming Planes

给定 $3\times 3$ 矩阵 $\mathbf{M}$ 和 3D 平移向量 $\mathbf{T}$ ，对于平面 $\mathbf{L}=\left< \mathbf{n},D \right>$ 探究变换后的平面表达式。

由 [Chap.3](chapter3-transforms.md#5-transforming-normal-vectors) 中法向量变换方程可知，变换后的法向量为 $\mathbf{n}'=(\mathbf{M}^{-1})^\mathsf{T}\mathbf{n}$ 。设 $\mathbf{p}$ 为原平面上一点，则变换后的对应点为 $\mathbf{p}'=\mathbf{M}\mathbf{p}+\mathbf{T}$ ，计算有：

$$
\begin{align}
D' &= -\mathbf{n}'\mathbf{p}' \\
&= -((\mathbf{M}^{-1})^\mathsf{T}\mathbf{n})\cdot(\mathbf{M}\mathbf{p}+\mathbf{T}) \\
&= D - \mathbf{n}\cdot \mathbf{M}^{-1}\mathbf{T}
\end{align}
$$

[Chap.3](chapter3-transforms.md#four-dimensional-transforms) 中给出了 4D 齐次坐标下的变换矩阵 $\mathbf{F}$ ，计算其逆转置有：

$$
(\mathbf{F}^{-1})^\mathsf{T} = \left[ \begin{array}{ccc:c}
{} & {} & {} & {} \\
{} & (\mathbf{M}^{-1})^\mathsf{T} & {} & \mathbf{0} \\
{} & {} & {} & {} \\
\hdashline
{} & -\mathbf{M}^{-1}\mathbf{T} & {} & 1
\end{array} \right] 
$$

结合 $\mathbf{n}'$ 和 $D'$ 表达式可知，平面 $\mathbf{L}=\left< \mathbf{n},D \right>$ 变换后的表达式 $\mathbf{L}'=\left< \mathbf{n}',D' \right>$ 为：

$$
\mathbf{L}'=(\mathbf{F}^{-1})^\mathsf{T}\mathbf{L}
$$

即平面为 4D 坐标中的协变向量。


## 3. THE VIEW FRUSTUM

