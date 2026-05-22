## 1. Variational Problems

1. Brachistochrone Problem [John Bernoulli, 1696](https://en.wikipedia.org/wiki/Brachistochrone_curve)（最速降线问题）．
2. Isoperimetric Problem [Euler](https://en.wikipedia.org/wiki/Isoperimetric_inequality)（等周问题）．

## 2. Function Spaces
三个重要的赋范线性空间（[Normed Linear Space](https://en.wikipedia.org/wiki/Normed_vector_space)）

- $\mathscr{C}(a,b)$ --- 所有在 $[a,b]$ 上连续的函数，范数为 $\lVert y \rVert _0$

$$
\lVert y \rVert _0 = \max_{a \leq x \leq b}\ \lvert y \rvert
$$

- $\mathscr{D}_1 (a,b)$ --- 所有在 $[a,b]$ 上有一阶连续导数的函数，范数为 $\lVert y \rVert_1$ 

$$
\lVert y \rVert_1 = \max_{a \leq x \leq b}\ \lvert y \rvert + \max_{a \leq x \leq b}\ \lvert y^\prime \rvert
$$

- $\mathscr{D}_n (a,b)$ --- 所有在 $[a,b]$ 上有 $n$ 阶连续导数的函数，范数为 $\lVert y \rVert_n$

$$
\lVert y \rVert_n = \sum_{i=0}^{n} \max_{a \leq x \leq b}\ \lvert y^{(i)} \rvert
$$
## 3. The Variation of a Functional
### Preliminary
考虑如下积分：

$$
\Phi[h] = \int_a^b [\alpha_0 h + \alpha_1h^{\prime} + \cdots + \alpha_n h^{(n)}]\, dx
$$

对于固定的 $\alpha_i(x) \in \mathscr{C}(a,b)$ 定义了线性泛函 $\Phi[h] \in \mathscr{D}_n(a,b)$．假设对于某一类 $h(x)$ 有 $\Phi[h] \equiv 0$，那么 $\alpha_i(x)$ 应该满足一定的条件．以下为四条经典结论：

1. 若 $\alpha(x) \in \mathscr{C}(a,b)$，且 $\forall h \in \mathscr{C}(a,b)$，$h(a)=h(b)=0$，有：

    $$
    \int_a^b \alpha(x) h(x)\, dx = 0，
    $$

    则 $\alpha(x) \equiv C,\ \forall x \in [a,b]$；

2. 若 $\alpha(x) \in \mathscr{C}(a,b)$，且 $\forall h \in \mathscr{D}_1(a,b)$，$h(a)=h(b)=0$，有：

	$$
	\int_a^b \alpha(x) h^\prime (x)\, dx = 0，
	$$

	则 $\alpha(x) \equiv C,\ \forall x \in [a,b]$；

3. 若 $\alpha(x) \in \mathscr{C}(a,b)$，且 $\forall h \in \mathscr{D}_2(a,b)$，$h(a)=h(b)=0$，$h^\prime(a) = h^\prime(b) = 0$，有：

    $$
    \int_a^b \alpha(x) h^{\prime\prime} (x)\, dx = 0，
    $$

    则 $\alpha(x) \equiv C_0 + C_1 x,\ \forall x \in [a,b]$；

4. 若 $\alpha(x), \beta(x) \in \mathscr{C}(a,b)$，且 $\forall h \in \mathscr{D}_1(a,b)$，$h(a)=h(b)=0$，有：

	$$
	\int_a^b [\alpha(x) h(x) + \beta(x)h^\prime(x)]\, dx = 0，
	$$

	则 $\exists\, \beta^\prime(x) = \alpha(x),\ \forall x \in [a,b]$．
	
	注意这里没有事先假设 $\beta(x)$ 的可导性．

### Variation of a Functional
???+ note "Definition"
    设 $J[y]$ 为赋范线性空间上的一个泛函，令其 **增量 (increment)** $\Delta J[h]$ 为：

    $$
	\Delta J[h] = J[y + h] - J[y]
	$$

	若：

	$$
	\Delta J[h] = \Phi[h] + \varepsilon \lVert h \rVert,\ \varepsilon \to 0\ \text{as}\ \lVert h \rVert \to 0
	$$

	称 $J[h]$ **可微 (differential)**，称 $\Phi[h]$ 为$J[y]$ 的 **变分 (variation)**，记为 $\delta J[h]$．

变分的定义是为了研究 **泛函的极值 (extremum)**

- 弱极值 (Weak Extremum) 
	
	若 $\exists\, \varepsilon, \forall y: \lVert y - \hat{y} \rVert_1 < \varepsilon$，都有 $J[y] - J[\hat{y}]$ 符号一致，称 $J[\hat{y}]$ 为弱极值．
	
- 强极值 (Strong Extremum) 
	
	若 $\exists\, \varepsilon, \forall y:\lVert y - \hat{y} \rVert_0 < \varepsilon$，都有 $J[y] - J[\hat{y}]$ 符号一致，称 $J[\hat{y}]$ 为强极值．

弱极值是首要考虑的目标，可直接称为极值，有如下的必要条件定理：
???+ note "Theorem"
	对一个可微泛函 $J[y]$，其在 $y = \hat{y}$ 有极值 $J[\hat{y}]$ 的必要条件为：

	$$
	\delta J[h;\hat{y}] = 0, \ \forall\, h
	$$

## 4. Euler's Equation

研究如下一类经典且简单的泛函：
???+ note "Simplest Functional"
	设 $F(x,y,z)$ 拥有二阶连续偏导，$y \in \mathscr{D}_1(a,b)$ 满足：

	$$ 
	y(a) = A,\qquad y(b) = B
	$$
	
	考虑泛函：
	
	$$
	J[y] = \int_a^b F(x,y,y^\prime)\, dx
	$$
	
	计算可知：
	
	$$
	\delta J = \int_a^b [F_y(x,y,y^\prime)h + F_{y^\prime}(x,y,y^\prime)h^\prime]\, dx
	$$
	
由 [Preliminary](#preliminary) 结论四，可得出如下结果：

???+ note "Euler's Equation"
	令 $\delta J = 0$，可得如下方程：

	$$
	F_y - \frac{d}{dx} F_{y^\prime} = 0
	$$
	
	称之为 **欧拉方程 (Euler's Equation)**．
	
	即存在极值 $J[y]$ 的必要条件为：$y$ 满足如上欧拉方程．

如下探究欧拉方程的若干特殊情形

- $J[y] = \int_a^b F(x,y^\prime)\, dx$，欧拉方程为：

$$
F_{y^\prime} = C
$$

- $J[y] = \int_a^b F(y,y^\prime)\, dx$，欧拉方程为：

$$
F - y^\prime F_{y^\prime} = C
$$

- $J[y] = \int_a^b F(x,y)\, dx$，欧拉方程为：

$$
F_y(x,y) = 0
$$

- 曲线积分泛函：

	$$
	J[y] = \int_a^b f(x,y)\sqrt{1+y^{\prime\,2}}
	$$

	欧拉方程为：

	$$
	f_y - f_x y^\prime - f \frac{y^{\prime \prime}}{1+y^{\prime\, 2}} = 0
	$$

## 5. Several Variable
$$
\iint_R \sqrt{1+z_x^2+z_y^2}\, dx\,dy
$$