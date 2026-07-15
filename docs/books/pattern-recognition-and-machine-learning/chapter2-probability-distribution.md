---
stats: "true"
---

> As well as being of great interest in their own right, these distributions can form building blocks for more complex models and will be used extensively throughout the book.


本章假设数据点独立同分布（i.i.d）．
## 1. BINARY VARIABLES

### Bernoulli & Binomial Distribution

???+ note "Bernoulli Distribution"
	考虑二元随机变量 $x \in \{0,1\}$，其分布如下：
	
	$$
		\begin{cases}
		p(x=1\vert \mu) = \mu \\
		p(x=0\vert \mu) = 1 - \mu, \quad 0\leq \mu\leq 1
		\end{cases}
	$$

	称之为 **伯努利分布（Bernoulli Distribution）**，表达式及矩值如下：

	$$
		\operatorname{Bern}(x\vert \mu) = \mu^x(1-\mu)^{1-x} \implies 
		\begin{cases}
		\begin{align}
		\mathbb{E}[x] &= \mu \\
		\operatorname{var}[x] &= \mu(1-\mu)
		\end{align}
		\end{cases}
	$$


假设数据集 $\mathcal{D}=\{x_{1},\dots,x_{N}\}$ 从分布 $p(x\vert \mu)$ 中采样，似然函数计算如下：

$$
	p(\mathcal{D}\vert \mu) = \prod_{n=1}^N p(x_{n}\vert \mu) = \prod_{n=1}^N \mu^{x_{n}}(1-\mu)^{1-x_{n}} \tag{$\ast$} \label{star}
$$

极大似然估计如下：

$$
	\mu_{\text{ML}} = \frac{1}{N} \sum_{n=1}^N x_{n}
$$

令 $m = x_{1}+\cdots+x_{N}$，即 $N$ 个数据点中 $x=1$ 的观测次数．如上 $\mu_{\text{ML}}$ 即为数据集中 $x=1$ 的观测比例．此外，可以研究 $m$ 的分布：

???+ note "Binomial Distribution"
	固定 $N$，由式 $\eqref{star}$ 知 $p(m\vert N,\mu) \propto \mu^m(1-\mu)^{N-m}$ ，系数为 “N选m” 的方式数．
	
	称之为 **二项分布（Binomial Distribution）**，表达式及矩值如下：

	$$
		\operatorname{Bin}(m\vert N,\mu) = \binom{N}{m} \mu^m (1-\mu)^{N-m} \implies
		\begin{cases}
		\begin{align}
		\mathbb{E}[m] &= \sum_{n=1}^N \mathbb{E}[x_{n}] = N\mu \\
		\operatorname{var}[m] &= \sum_{n=1}^N \operatorname{var}[x_{n}] = N\mu(1-\mu)
		\end{align}
		\end{cases}
	$$


### Beta Distribution
如上极大似然给出的参数估计对小数据集有严重过拟合问题，因此需寻求合适的先验进行贝叶斯式处理．

由式 $(\ref{star})$ 可知，似然 $\propto \mu^x(1-\mu)^{1-x}$，若有先验 $\propto \mu(1-\mu)$，则后验 $\propto \mu(1-\mu)$，即与先验函数形式相同．

???+ note "Beta Distribution"
	如上构造的先验分布称为 **Beta 分布（Beta Distribution）**，表达式即矩值如下：

	$$
		\operatorname{Beta}(\mu\vert a,b) = \frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)} \mu^{a-1}(1-\mu)^{b-1} \implies 
		\begin{cases}
		\begin{align}
		\mathbb{E}[\mu] &= \frac{a}{a+b} \\
		\operatorname{var}[\mu] &= \frac{ab}{(a+b)^{2}(a+b+1)}
		\end{align}
		\end{cases}
	$$


不同超参数 $a,b$ 值对应的 Beta 分布示意图如下：
![](./images/distribution1.png){: #beta}

令 $l=N-m$，计算后验如下：

$$
	p(\mu\vert m,l,a,b) = \frac{\Gamma(m+a+l+b)}{\Gamma(m+a)\Gamma(l+b)}\mu^{m+a-1}(1-\mu)^{l+b-1}
$$

对于该形式，有如下三种启发：

- 超参 $a,b$ 可解释为 $x=0$ 和 $x=1$ 的“有效观测数”．
  
	  如上先验到后验的分布变化，即将观测到的 $m,l$ 值添加到超参 $a,b$ 上．因此超参 $a,b$ 可视为经验中对两种情况的观测数量．

- 后验可视为新数据的先验，进行 **序列学习（Sequential Learning）**．

	  在实时学习、大数据集、数据持续流入且必须在看到全部数据前做出预测的场景中，可使用序列方法．

- 随观测数的提高，后验会越来越尖锐．

	  由 [Beta 分布示意图](#beta) 或 $\operatorname{var}[\mu]$ 形式可以看出，当 $a,b$ 增大时，分布会越来越集中．实际上，这是贝叶斯学习的一般性质：当越来越多数据被观测，后验分布的不确定性会稳步下降．
	  
	  考虑参数 $\mathrm{\theta}$ 的一般贝叶斯推断，数据集为 $\mathcal{D}$，有如下两个关系式：
	  
	$$
	\begin{align}
	\mathbb{E}_{\boldsymbol{\theta}}[\boldsymbol{\theta}] &= \mathbb{E}_{\mathcal{D}}[\mathbb{E}_{\boldsymbol{\theta}}[\boldsymbol{\theta}\vert \mathcal{D}]] \tag{1} \label{1}\\
	\operatorname{var}_{\boldsymbol{\theta}}[\boldsymbol{\theta}] &= \mathbb{E}_{\mathcal{D}}[\operatorname{var}_{\boldsymbol{\theta}}[\boldsymbol{\theta}\vert \mathcal{D}]] + \operatorname{var}_{\mathcal{D}}[\mathbb{E}_{\boldsymbol{\theta}}[\boldsymbol{\theta}\vert \mathcal{D}]] \tag{2} \label{2}
	\end{align}
	$$

	$\eqref{1}$ 式表示：在数据分布上平均来看，后验均值等于先验均值；
	
	$\eqref{2}$ 式表示：在数据分布上平均来看，后验方差小于先验方差（不确定度降低）。并且后验均值方差越大（数据信息更多），后验方差就会越小（不确定度更低）。



## 2. Multinomial Variables




