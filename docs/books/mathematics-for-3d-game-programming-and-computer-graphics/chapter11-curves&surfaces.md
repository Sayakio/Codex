---
stats: "true"
---
> Curved geometry has become commonplace in 3D graphics engines due to modern hardware’s ability to render the high number of vertices and faces needed to convincingly render smoothly varying surfaces. In addition to geometrical modeling, curves may be employed as paths along which certain objects travel.

## 1. CUBIC CURVES

### Hermite

两段三次曲线共享连接点的切向量，每段采用单位参数区间。图中的反向箭头用负号表示，这里取参考图中的 $u=1$。拖动插值点时保持切向量不变；拖动箭头时改变切向量的方向与大小。

<div class="cagd-diagram" data-curve="hermite" data-title="Hermite" markdown="1"></div>

/// caption
Figure 1: Hermite 曲线．
///

### Bézier

四个点决定一段三次 Bézier 曲线。虚线是控制多边形；拖动控制点，可以改变曲线的形状。

<div class="cagd-diagram" data-curve="bezier" data-title="Bézier" markdown="1"></div>

/// caption
Figure 2: Bézier 曲线．
///

### Catmull–Rom

采用均匀 Catmull–Rom：$T_i=(P_{i+1}-P_{i-1})/2$。曲线经过 $P_1$ 到 $P_5$，外围的 $P_0,P_6$ 用于计算端点切向量。细实线表示切线方向，显示长度不代表导数大小。

<div class="cagd-diagram" data-curve="catmull-rom" data-title="Catmull–Rom" markdown="1"></div>

/// caption
Figure 3: Catmull–Rom 曲线．
///