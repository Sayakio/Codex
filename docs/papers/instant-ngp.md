---
Status: true
Field:
Year: 2022
DOI: 10.1145/3528223.3530127
Tags:
Authors: ThomasMüller, AlexEvans, ChristophSchied, AlexanderKeller
Journal: ACM Trans. Graph.
Type: journalArticle
Publication: ACM Transactions on Graphics
Citekey: InstantNGP
---

# Instant Neural Graphics Primitives with a Multiresolution Hash Encoding

## ABSTRACT
Neural graphics primitives, parameterized by fully connected neural networks, can be costly to train and evaluate. We reduce this cost with a versatile new input encoding that permits the use of a smaller network without sacrificing quality, thus significantly reducing the number of floating point and memory access operations: a small neural network is augmented by a multiresolution hash table of trainable feature vectors whose values are optimized through stochastic gradient descent. The multiresolution structure allows the network to disambiguate hash collisions, making for a simple architecture that is trivial to parallelize on modern GPUs. We leverage this parallelism by implementing the whole system using fully-fused CUDA kernels with a focus on minimizing wasted bandwidth and compute operations. We achieve a combined speedup of several orders of magnitude, enabling training of high-quality neural graphics primitives in a matter of seconds, and rendering in tens of milliseconds at a resolution of ${1920\!\times\!1080}$.

## FILES & LINKS
- **URL:**  [Open Online](http://arxiv.org/abs/2201.05989)
- **Zotero Entry:** [Full Text PDF](zotero://select/library/items/H4UEH68F)


## 1. PROBLEMS
考虑一个表示神经图像基元的 MLP $m(x,\Phi)$ ，目标为编码原始输入 $x$ 到更高维向量 $y=\operatorname{enc}(x,\theta)$ ，提升紧致模型的拟合质量。

### Frequency Encodings

$$
\begin{align}
\operatorname{enc}(x) = \big(&\sin(2^0x),\sin(2^1x),\dots,\sin(2^{L-1}x), \\
&\cos(2^0x),\cos(2^1x),\dots,\cos(2^{L-1}x) \big)
\end{align}
$$

### Parametric Encodings


### Sparse Parametric Encodings


## 2. METHOD
### Multiresolution Hash Encoding
对于 $y=\operatorname{enc}(x,\theta)$ ，$\theta$ 表示为 $L\times T\times F$ 的多分辨率哈希表。其中 $L$ 为分辨率级别数，$T$ 为特征向量数，$F$ 为特征向量维数。具体特征如下：

- 分辨率级别之间相互独立，并存储网格顶点的特征向量。
- 分辨率按几何级数从范围 $[N_{\text{min}},N_{\text{max}}]$ 内取值：
	    
	$$
	\begin{align}
	N_{l} &:= \lfloor N_{\text{min}}\cdot b^l \rfloor , \quad l = 1,\dots,L \\
	b &:= \exp \left( \frac{\ln N_{\text{max}} - \ln N_{\text{min}}}{L-1} \right) 
	\end{align}
	$$

采用如下空间哈希函数 $h: \mathbb{Z}^d \to \mathbb{Z}_{T}$：

$$
h(x=(x_{1},\dots,x_{d})) = \left( \bigoplus_{i=1}^d \widetilde{x}_{i}\pi_{i} \right) \bmod T
$$

其中 $\oplus$ 表示按位 $\operatorname{XOR}$ ，$\pi_{i}$ 为互不相同的大质数。为消去维度相关性，$\{\widetilde{x}_{i}\}$ 为 $\{x_{i}\}$ 的随机置换。为实现独立性，只需置换 $d-1$ 维，从而取 $\pi_{1}:=1,\pi_{2}:=2\,654\,435\,761,\pi_{3}:=805\,459\,861$ 。

对于级别 $l$ ，输入坐标 $x\in \mathbb{R}^d$ 位于其中一个网格，两个顶点为：

$$
\lfloor x_{l} \rfloor := \lfloor x\cdot N_{l} \rfloor , \quad \lceil x_{l} \rceil := \lceil x\cdot N_{l} \rceil 
$$

该级别 $x$ 处的特征向量由顶点处特征 $d$ 线性插值得到，权重为 $w_{l}:=x_{l}-\lfloor x_{l} \rfloor$ 。总计 $L$ 个特征向量和附加输入 $\xi\in \mathbb{R}^E$  拼接成 $y\in \mathbb{R}^{LF+E}$ 。

## 3. EXPERIMENTS



## 4. THINKING

