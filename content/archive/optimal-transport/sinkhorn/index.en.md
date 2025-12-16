+++
title = "Sinkhorn: Entropic Regularization"
date = 2025-11-12
+++

## Discrete Measures

{{< definition "Shannon-Boltzmann entropy" >}}
Let $P \in U(a, b)$ be a coupling matrix for discrete measures with vectors $a$ and $b$.
Then, the Shannon-Boltzmann entropy is
$$
H(P) = - \sum_{i, j} P_{i, j} \log{(P_{i, j})},
$$
where $0 = \log{0}$.
{{< /definition >}}
Note that
$$
\nabla^2 H(P) = - \diag(P_{i, j}^{-1}).
$$
So, $H$ is strictly concave.

Let us add a regularization term to the discrete Kantorovich problem.
$\varepsilon$ will be our regularization weight and it works as a kind of "temperature".
$$
L_C^\varepsilon (a, b) = \min_{P \in U(a, b)} \langle P, C \rangle - \varepsilon H(P).
$$
Because $H$ is strictly concave, $L_C^\varepsilon$ is $\varepsilon$-strongly convex.
This means that it has an unique optimal solution.

### Intuition
$H(P)$ works as a kind of *barrier function* for $P_{i, j} \geq 0$.
Recall the graph of $s \mapsto s \log{(s)}$ and particularly its derivative at $0$.
{{< tikz "figures/entropy.tikz" >}}
Clearly, the minimum is never at $0$, because the derivative the to $-\infty$.
As a result, the optimal coupling $P^*$ has **mass everywhere**, i.e., $P^*_{i, j} \neq 0$ for all $i, j$.

{{< theorem >}}
Let $a > 0$ and $b > 0$ describe two discrete metrics.
Then, $P^*$ is the optimal coupling if, and only if,
$$
\left\{
\begin{aligned}
&P^* \mathbf{1} = a \\
&(P^*)^\top \mathbf{1} = b \\
&\exists (u, v) \in \R^n_+ \times \R^m_+ \st P^*_{i, j} = u_i K_{ij} v_j,
\end{aligned}
\right.
$$
where $K_{ij} = e^{- \frac{C_{ij}}{\varepsilon}}$.
Here, $P^*_{i, j} = u_i K_{ij} v_j$ is called the **scaling equation**.
In matrix form, it can be written as
$$
P^* = \diag(u) K \diag(v).
$$
{{< /theorem >}}

{{< spoiler "Proof" >}}
We are interested in the following problem
$$
\min_{P \in U(a, b)} f(P) = \min_{P \in U(a, b)} \langle C, P \rangle + \varepsilon H(P).
$$
Assume that there exists $(i_0, j_0) \st P^*_{i_0, j_0} = 0$.
Let $P^t = (1 - t)P^* + t (a \otimes b)$ and $g(t) = f(P^t)$.
Then, $g'(0) \to -\infty$, so for small $t$, we have $f(P^t) \leq f(P^0)$, so such pair $(i_0, j_0)$ does not exist.

Let us compute the Lagrangian.
$$
\L(P, \mu, \nu) = \langle C, P \rangle + \varepsilon H(P) + \langle a - P \mathbf{1}, \mu \rangle + \langle b - P^\top \mathbf{1}, \nu \rangle.
$$
By strong duality, we have
$$
\max_{\mu, \nu} \min_P \L = \min_P \max_{\mu, \nu} \L
$$
Minimizing w.r.t. $P$, we obtain
$$
\begin{aligned}
\nabla_P \L &= 0 \\
C + \varepsilon (\log{P} + 1) - \mathbf{1}^\top \mu - \mathbf{1}^\top \nu &= 0 \\
\iff C_{ij} + \varepsilon \log{P_{ij}} + \varepsilon - \mu_i - \nu_j &= 0 \\
\iff P_{ij} &= \underbrace{e^{\frac{\mu_i - \varepsilon}{\varepsilon}}}_{u_i} \underbrace{e^{-\frac{C_{ij}}{\varepsilon}}}_{K_{ij}} \underbrace{e^{\frac{\nu_j}{\varepsilon}}}_{v_i}
\end{aligned}
$$
{{< /spoiler >}}

### Algorithm

Given that $P^* = \diag(u) K \diag(v)$, we can transform our constraints:
$$
\begin{aligned}
P \mathbf{1} = a \iff \diag(u) K \diag(v) \mathbf{1} = a \iff u \odot (K v) = a \\
P^\top \mathbf{1} = b \iff \diag(v) K^\top \diag(u) \mathbf{1} = b \iff v \odot (K^\top u) = b \\
\end{aligned}
$$

With this new set of constraints, we can create an iterative algorithm to find $u$ and $v$.

{{< algorithm >}}
\begin{algorithm}

\caption{Sinkhorn Algorithm}

\begin{algorithmic}
\INPUT Discrete measures $a \in \R^n$ and $b \in \R^m$, $K \in \R^{n \times m}$, number of iterations $T \in \N^*$.
\REQUIRE $a_i, b_j > 0$.
\OUTPUT $u \in \R^n_+$ and $v \in \R^m_+$ that solve the Sinkhorn problem.

\STATE $v \gets \mathbf{1}_m$
\STATE \\

\For{$t \gets 1 \textbf{ to } T$}
    \STATE $u \gets \frac{a}{K v}$ \COMMENT{Perform element-wise division (Kronecker division)}
    \STATE $v \gets \frac{b}{K^\top u}$
\EndFor

\STATE \\

\RETURN $u, v$

\end{algorithmic}
\end{algorithm}
{{< /algorithm >}}

We can perform the matrix multiplications in $\mathcal{O}(n^2)$, so the total complexity of the Sinkhorn Algorithm is $\mathcal{O}(T n^2)$.
Our main goal is to run $T$ steps and approximate $\mathrm{OT}(\varepsilon, T)$ to $\mathrm{OT}(0, \infty)$.

{{< theorem >}}
With $T \sim \mathcal{O}(\frac{1}{\varepsilon^2})$ iterations, we have
$$
|\mathrm{OT}(\varepsilon, T) - \mathrm{OT}(0, \infty) | \approx \varepsilon.
$$
{{< /theorem >}}

{{< spoiler "Proof" >}}
We can see the algorithm as consecutive steps of the form
$$
v \gets \mathcal{I}(v) \quad \st \quad \mathcal{I}(v) = \frac{b}{K^\top \left(\frac{a}{K v}\right)}
$$

{{< definition "Hilbert Projective Metric" >}}
Let $\mathcal{K} = (\R_{++})^n$ be a cone.
We define $\sim$ as follows.
$$
u \sim u' \iff \exists \lambda > 0 \st u = \lambda u'.
$$
Intuitively, $\sim$ defines a class of equivalence of directions.

We also have the following relation:
$$
d_\mathcal{H} (u, u') = \| \log{u} - \log{u'} \|_V = \left\| \log{\left(\frac{u}{u'}\right)} \right\|_V,
$$
where $\| z \|_V = \max_i z_i - \min_i z_i$.
{{< /definition >}}

With this definition, we have the following theorem.
{{< theorem >}}
Let $\mathcal{K}$ be a cone.
We say that $\mathcal{K} / \sim$ is the projection of $\mathcal{K}$ into the equivalence $\sim$, so it equals all "positive directions".
Then, $(\mathcal{K} / \sim, d_\mathcal{H})$ is a complete metric space.
{{< /theorem >}}

Let $K : \mathcal{K} \to \mathcal{K}$ be linear.
This map creates a "narrowing" effect in the clone, because it has only positive entries.
The effect can be seen in the following figure.

{{< tikz "figures/cone_contraction.tikz" >}}

With that, we can say that there exists $\eta \in [0, 1)$ such that $d_\mathcal{H}(K u, K u') \leq \eta d_\mathcal{H}(u, u')$.
If we use the optimal $u^*$, we get the following relation:
$$
d_\mathcal{H}(K^t u_0, u^*) \leq \eta^t d_\mathcal{H} (u_0, u^*).
$$
**Remark**: by the definition of $\sim$ and $d_\mathcal{H}$, we can say that $d_\mathcal{H}(\frac{a}{u}, \frac{a}{u'}) = d_\mathcal{H}(u, u')$.

Thus, we arrive at the following expression
$$
d_\mathcal{H}(\mathcal{I}(u), \mathcal{I}(u')) \leq \eta^2 d_\mathcal{H}(u, u'),
$$
which proves the linear convergence rate.
*Small remark*: in this case, $\eta \sim 1 - e^{-\frac{\| C \|_\infty}{\varepsilon}}$.
{{< /spoiler >}}

## Continuous Measures

The first thing we have to do to move to continuous measures is adapt our regularization function.
Instead of the Shannon-Boltzmann entropy, we are now going to use the **Kullback-Leibnitz divergence**.

For discrete couplings $P, Q$ we have
$$
\mathrm{KL}(K \parallel Q) = \sum_{i j} P_{ij} \log{\left(\frac{P_{ij}}{Q_{ij}}\right)}.
$$
For continuous coupling measures $\pi, \xi \in \mathcal{P}(\mathcal{X} \times \mathcal{Y})$, we have
$$
\mathrm{KL}(\pi \parallel \xi) = \iint \log{\left(\frac{\d \pi}{\d \xi}\right)} \, \d \pi,
$$
if $\frac{\d \pi}{\d \xi}$ exists.
Otherwise, $\mathrm{KL}(\pi \parallel \xi) = \infty$.

The main idea is to compare $P$ (or $\pi$) to a distribution that represents "perfect entropy", i.e., to $\alpha \otimes \beta$.

{{< note >}}
Using $Q = a \otimes b$ yields the same solution for the previous problem.
{{< /note >}}

This yields the so called "General Schrödinger problem":
$$
\inf_{\pi \in \mathcal{U}(\alpha, \beta)} \underbrace{\iint c \, \d \pi}_{\text{Kantorovich}} + \varepsilon KL (\pi \parallel \alpha \otimes \beta).
$$
Probabilistically, if we see $\pi$ as the law of $(X, Y)$, then we can define the mutual information of $X$ and $Y$ as $\mathcal{I}(X, Y) = \mathrm{KL}(\pi \parallel \pi_1 \otimes \pi_2)$.
One can check that $\mathcal{I}(X, Y) = 0 \iff X \indep Y$.
Thus, the Sinkhorn problem is equivalent to
$$
\inf_{\substack{X \sim \alpha \\ Y \sim \beta}} \E[c(X, Y)] + \varepsilon \mathcal{I}(X, Y).
$$

## Duality

### Discrete measures

We can start by writing the Lagrangian.
$$
\begin{aligned}
\min_P \max_{f, g} \L(P, C, f, g) &= \min_P \max_{f, g} \langle C, P \rangle_F + \varepsilon \KL{P}{a \otimes b} + \langle f, a - P \mathbf{1} \rangle + \langle g, b - P^\top \mathbf{1} \rangle \\
&= \max_{f, g} \langle a, f \rangle + \langle b, g \rangle + \min_P \langle \underbrace{C - f \mathbf{1}^\top - \mathbf{1} g^\top}_{\text{Let $Z = \frac{\cdot}{\varepsilon}$}}, P \rangle + \varepsilon \KL{P}{a \otimes b} \\
&= \max_{f, g} \langle a, f \rangle + \langle b, g \rangle - \varepsilon \underbrace{\max_P \langle P, Z \rangle - \KL{P}{a \otimes b}}_{\mathrm{KL}^*} \qquad \because \min z = - \max - z
\end{aligned}
$$
Where $\mathrm{KL}^*$ is the conjugate (Legendre-Fenchel transform) of the Kullback-Leibnitz divergence.
So, we are left with
$$
\max_{f, g} \langle a, f \rangle + \langle b, g \rangle - \varepsilon \mathrm{KL}^*(Z \parallel a b^\top).
$$

{{< lemma >}}
$$
\mathrm{KL}^* (Z \parallel Q) = \sum_{ij} Q_{ij} e^{Z_{ij}} - 1.
$$
{{< /lemma >}}

In conclusion, we end up with
$$
\max_{f, g} \langle f, a \rangle + \langle g, b \rangle - \varepsilon \sum_{i, j} e^{\frac{f_i + g_j - C_{ij}}{\varepsilon}} + \varepsilon.
$$
Then, the primal / dual relationship is
$$
P_{ij} = e^{\frac{f_i}{\varepsilon}} e^{- \frac{C_{ij}}{\varepsilon}} e^{\frac{g_j}{\varepsilon}} a_i b_j.
$$
If we call $u_i = a_i e^{\frac{f_i}{\varepsilon}}$ and $v_j = b_j e^{\frac{g_j}{\varepsilon}}$, then we retrieve our previous result:
$$
P = \diag(u) K \diag(v).
$$

### General case

Let $\alpha, \beta$ be general measures.
Then, we have the following problem.
$$
\inf_{\substack{f \in \mathcal{C}(\mathcal{X}) \\ g \in \mathcal{C}(\mathcal{Y})}} \underbrace{\int f(x) \, \d \alpha + \int g(y) \, \d \beta - \varepsilon \iint e^{\frac{f(x) + g(y) - c(x, y)}{\varepsilon}} \, \d \alpha \, \d \beta}_{\mathcal{D}(f, g)}
$$

From this generalization, one can define a new $c$-transform.
{{< definition "Soft $c$-transform" >}}
$$
\begin{aligned}
f^{c, \varepsilon}(y) &= - \varepsilon \log{\left(\int e^{\frac{f(x) - c(x, y)}{\varepsilon}} \, \d \alpha \right)} \\
g^{c, \varepsilon}(x) &= - \varepsilon \log{\left(\int e^{\frac{g(y) - c(x, y)}{\varepsilon}} \, \d \beta \right)}
\end{aligned}
$$
{{< /definition >}}
In the definition above, we made use of a "soft-min" function:
$$
\mathrm{smin}_\varepsilon^\xi [h] = - \varepsilon \log{\left(\int e^{- \frac{h(x)}{\varepsilon}} \, \d \xi\right)}.
$$
Using this notation, $f^{c, \varepsilon}(y) = \mathrm{smin}_\varepsilon^\alpha [c(\cdot, y) - f]$ and $g^{c, \varepsilon}(x) = \mathrm{smin}_\varepsilon^\beta [c(x, \cdot) - g]$.

The above generalizations and definitions yield a natural generalization of the Sinkhorn Algorithm.
{{< algorithm >}}
\begin{algorithm}

\caption{Generalized Sinkhorn Algorithm}

\begin{algorithmic}
\INPUT General measures $\alpha$ and $\beta$, number of iterations $T \in \N^*$.
\OUTPUT $f \in \mathcal{C}(\mathcal{X})$ and $g \in \mathcal{C}(\mathcal{Y})$ that solve the general Sinkhorn problem.

\STATE $g \gets$ initial guess
\STATE \\

\For{$t \gets 1 \textbf{ to } T$}
    \STATE $f \gets g^{c, \varepsilon} := \argmin \mathcal{D}(f, g)$ \COMMENT{$g$ is fixed}
    \STATE $g \gets f^{c, \varepsilon} := \argmin \mathcal{D}(f, g)$ \COMMENT{$f$ is fixed}
\EndFor

\STATE \\

\RETURN $f, g$

\end{algorithmic}
\end{algorithm}
{{< /algorithm >}}

Lastly, it is interesting to note that for discrete measures $\alpha$ and $\beta$, the soft $c$-transform is equivalent to the Kronecker division in the original Sinkhorn algorithm.
If we let $u = e^{\frac{f}{\varepsilon}}$ and $v = e^{\frac{g}{\varepsilon}}$, then
\[
\textcolor{blue}{\underbrace{
  \begin{aligned}
    f &\leftarrow g^{c, \varepsilon} \\
    g &\leftarrow f^{c, \varepsilon}
  \end{aligned}
}_{\text{alternate}}}
\iff
\textcolor{red}{\underbrace{
  \begin{aligned}
    u &\leftarrow \frac{a}{K v} \\
    v &\leftarrow \frac{b}{K^T u}
  \end{aligned}
}_{\text{Sinkhorn}}}
\]
Even though they are equivalent, the soft $c$-transform implementation is numerically more stable when $\varepsilon$ is small, so it is preferred.

{{< warning "Implementation detail" >}}
When computing the log of the sum of exponentials, directly computing $\log{(\sum e^{z_i})}$ is numerically unstable.
Instead, one must use this alternative equation:
$$
\underbrace{\log{\left(\sum_i e^{z_i}\right)}}_\text{unstable} = \underbrace{\log{\left(\sum_i e^{z_i - \max_k z_k}\right)} + \max_k z_k}_\text{stable}.
$$
{{< /warning >}}

## Exercises

1. Exercise 1 ($2\times2$ entropic OT with perturbation). Let
$C=\begin{pmatrix}0&1\\ 1&0\end{pmatrix}$ $a=\begin{pmatrix}p\\ 1-p\end{pmatrix}$
$b=\begin{pmatrix}\frac{1}{2}\\ \frac{1}{2}\end{pmatrix}$
with $p\in(0,1)$, and let $\epsilon>0$ Consider
$min_{P\in\mathbb{R}_{+}^{2\times2}}\langle C,P\rangle+\epsilon\sum_{i,j}P_{ij}(\log~P_{ij}-1)$ subject to $P1=a,$ $P^{\top}1=b.$

**(1)** Show that every admissible transport plan can be written as
$P(x)=\begin{pmatrix}x&y(x)\\ z(x)&w(x)\end{pmatrix}$
for a single scalar z, and give explicit formulas for $y(x)$, $z(x)$, $w(x)$, as well as the admissible interval $I(p)$ for x.

**(2)** Rewrite the objective as a scalar function $F_{\epsilon}(x)$ and compute $F_{\epsilon}^{\prime}(x)$.

**(3)** Explain why the optimal $x_{\epsilon}(p)$ is necessarily in the interior of $I(p)$ if $p>0$ Optional: from the optimality condition $F_{\epsilon}^{\prime}(x)=0$, give the expression of the optimal $x_{\epsilon}(p)$.

**(4)** Optional: perform a expansion of $x_{\epsilon}(p)$ as a function of $e^{-\epsilon/2}$, assuming $p<1/2,$ shows $x_{\epsilon}(p)\sim p+ce^{-2/\epsilon}$ for some constant $c=c(p)$.

{{< spoiler "Solution" >}}
**(1)**
Using the marginal constraints:
* Row 1: $x + y = p \implies y(x) = p - x$
* Col 1: $x + z = 1/2 \implies z(x) = 1/2 - x$
* Row 2: $z + w = 1 - p \implies w(x) = 1 - p - (1/2 - x) = 1/2 - p + x$

Admissibility ($P_{ij} \ge 0$):
* $x \ge 0$
* $y \ge 0 \implies x \le p$
* $z \ge 0 \implies x \le 1/2$
* $w \ge 0 \implies x \ge p - 1/2$

The admissible interval is $I(p) = [\max(0, p-1/2), \min(p, 1/2)]$.

**(2)**
The objective is $\langle C, P \rangle + \epsilon \sum P_{ij} (\log P_{ij} - 1)$.
Cost term: $0\cdot x + 1\cdot y + 1\cdot z + 0\cdot w = y+z = (p-x) + (1/2-x) = p + 1/2 - 2x$.
Entropy term: $\epsilon(x\log x + y\log y + z\log z + w\log w - 1)$. (Note: $\sum P_{ij}=1$).

$$F_{\epsilon}(x) = p + 1/2 - 2x + \epsilon(x\log x + (p-x)\log(p-x) + (1/2-x)\log(1/2-x) + (1/2-p+x)\log(1/2-p+x) - 1)$$

Derivative $F_{\epsilon}^{\prime}(x)$:
$$F_{\epsilon}^{\prime}(x) = -2 + \epsilon \left( \log x - \log(p-x) - \log(1/2-x) + \log(1/2-p+x) \right)$$
$$F_{\epsilon}^{\prime}(x) = -2 + \epsilon \log \left( \frac{x(1/2-p+x)}{(p-x)(1/2-x)} \right)$$

**(3)**
If $x$ approaches the boundary of $I(p)$, one of the terms in the log argument approaches 0.
* If $x \to 0$ or $w \to 0$ (lower bound), the numerator $\to 0$, so $\log(\dots) \to -\infty$, and $F_{\epsilon}^{\prime}(x) \to -\infty$.
* If $y \to 0$ or $z \to 0$ (upper bound), the denominator $\to 0$, so $\log(\dots) \to +\infty$, and $F_{\epsilon}^{\prime}(x) \to +\infty$.

Since the gradient explodes to $-\infty$ at the lower bound and $+\infty$ at the upper bound, the value 0 must be crossed in the interior. Thus the optimum is strictly interior.

Optimality condition $F_{\epsilon}^{\prime}(x)=0$:
$$\log \left( \frac{xw}{yz} \right) = \frac{2}{\epsilon} \implies \frac{x(1/2-p+x)}{(p-x)(1/2-x)} = e^{2/\epsilon}$$

**(4)**
Let $E = e^{2/\epsilon}$. As $\epsilon \to 0$, $E \to \infty$.
The equation is $\frac{xw}{yz} = E$. For $E$ large, either $y$ or $z$ must be small (denominator small).
Assuming $p < 1/2$, the interval is $[0, p]$. The unregularized solution is $x=p$ (cost minimal when diagonal is maximized).
So we expect $x \to p$, which implies $y \to 0$.
Rearrange: $y = \frac{xw}{zE}$.
Substitute approximations near $x=p$:
$y = p-x$.
$p-x \approx \frac{p(1/2-p+p)}{(1/2-p)E} = \frac{p/2}{1/2-p} e^{-2/\epsilon}$.
Thus $x \sim p - c(p) e^{-2/\epsilon}$. (Note: The sign depends on the expansion direction, usually it retracts from the boundary).
{{< /spoiler >}}

2. Exercise 2 (Dual of entropic-regularized linear program). Consider the entropic-regularized linear program
$min_{P\ge0,A(P)=b}\langle C,P\rangle+\epsilon H(P)$ , $H(P):=\sum_{i}P_{i}(\log~P_{i}-1)$,
where P is a finite-dimensional nonnegative vector (think of $P\in\mathbb{R}_{+}^{N}$ or a matrix reshaped as a vector), $C\in\mathbb{R}^{N}$ $A:\mathbb{R}^{N}\rightarrow\mathbb{R}^{m}$ is linear, $b\in\mathbb{R}^{m}$, and $\epsilon>0$.

**(1)** Write the Lagrangian $\mathcal{L}(P,\lambda)$

**(2)** Assuming we can swap infp and $sup_{\lambda}$, write the dual problem.

**(3)** Give the primal-dual optimality relation between P and A.

**(4)** Give the expression of $A(P)$ in the case of the marginal constraint of classical OT. Compute $A^{\top};$ and show that the dual you obtained matches the classical dual of entropic OT.

{{< spoiler "Solution" >}}
**(1)**
The Lagrangian with multiplier $\lambda \in \mathbb{R}^m$ is:
$$\mathcal{L}(P, \lambda) = \langle C, P \rangle + \epsilon \sum_i P_i(\log P_i - 1) + \langle \lambda, b - A(P) \rangle$$
$$\mathcal{L}(P, \lambda) = \langle \lambda, b \rangle + \sum_i \left( C_i P_i + \epsilon P_i(\log P_i - 1) - (A^\top \lambda)_i P_i \right)$$

**(2)**
Minimize w.r.t $P_i \ge 0$:
$\frac{\partial \mathcal{L}}{\partial P_i} = C_i + \epsilon \log P_i - (A^\top \lambda)_i = 0$.
$P_i^* = \exp\left( \frac{(A^\top \lambda)_i - C_i}{\epsilon} \right)$.
Substituting back, the term $P_i(C_i + \epsilon \log P_i - \epsilon - (A^\top \lambda)_i)$ simplifies to $-\epsilon P_i$.
Dual function:
$$g(\lambda) = \langle \lambda, b \rangle - \epsilon \sum_i \exp\left( \frac{(A^\top \lambda)_i - C_i}{\epsilon} \right)$$
Dual problem: $\max_\lambda g(\lambda)$.

**(3)**
The primal-dual relation is:
$$P = \exp\left( \frac{A^\top \lambda - C}{\epsilon} \right)$$
(Component-wise exponentiation).

**(4)**
For classical OT, $P \in \mathbb{R}^{n \times n}$. $A(P) = (P \mathbf{1}, P^\top \mathbf{1}) \in \mathbb{R}^{2n}$.
The dual variable is $\lambda = (f, g)$ where $f, g \in \mathbb{R}^n$.
The adjoint $A^\top \lambda$ acts on the space of matrices.
$\langle \lambda, A(P) \rangle = \langle f, P\mathbf{1} \rangle + \langle g, P^\top \mathbf{1} \rangle = \sum_{ij} (f_i + g_j) P_{ij}$.
So $(A^\top \lambda)_{ij} = f_i + g_j$.
The dual becomes:
$$\max_{f,g} \langle f, a \rangle + \langle g, b \rangle - \epsilon \sum_{ij} \exp\left( \frac{f_i + g_j - C_{ij}}{\epsilon} \right)$$
This matches the classical entropic OT dual.
{{< /spoiler >}}

3. Exercise 3 (Entropic multimarginal OT with 3 marginals). Let $a\in\mathbb{R}_{+}^{n_{1}}$, $b\in\mathbb{R}_{+}^{n_{2}}$, $c\in\mathbb{R}_{+}^{n_{3}}$ and $C\in\mathbb{R}^{n_{1}\times n_{2}\times n_{3}}$.
For $T\in\mathbb{R}_{+}^{n_{1}\times n_{2}\times n_{3}}$ define the three marginalization operators
$\pi_{1}(T):=(\sum_{j,k}T_{ijk})_{i=1}^{n_{1}}$ $\pi_{2}(T):=(\sum_{i,k}T_{ijk})_{j=1}^{n_{2}}$
$\pi_{3}(T):=(\sum_{i,j}T_{ijk})_{k=1}^{n_{3}}$
Consider the problem
$min_{T\ge0}\langle C,T\rangle+\epsilon\sum_{i,j,k}T_{ijk}(\log~T_{ijk}-1)$ s.t. $\pi_{1}(T)=a$, $\pi_{2}(T)=b,$ $\pi_{3}(T)=c$.

**(1)** Write the Lagrangian using multipliers f, g, h for $\pi_{1}$. $n_{2}$, $\pi_{3}$.

**(2)** Assuming one can swap miny and $max_{f,g,h}$, write the dual.

**(3)** Write the Sinkhorn iterations in the log domain for the three potentials.

**(4)** (Bonus) Explain why the usual Hilbert-metric/Birkhoff argument for 2 marginals does not give a contraction here.

{{< spoiler "Solution" >}}
**(1)**
$$\mathcal{L}(T, f, g, h) = \langle C, T \rangle + \epsilon \sum T_{ijk}(\log T_{ijk} - 1) + \langle f, a - \pi_1(T) \rangle + \langle g, b - \pi_2(T) \rangle + \langle h, c - \pi_3(T) \rangle$$
$$\mathcal{L} = \langle f, a \rangle + \langle g, b \rangle + \langle h, c \rangle + \sum_{ijk} T_{ijk} (C_{ijk} + \epsilon \log T_{ijk} - \epsilon - f_i - g_j - h_k)$$

**(2)**
Minimize w.r.t $T$:
$C_{ijk} + \epsilon \log T_{ijk} - f_i - g_j - h_k = 0 \implies T_{ijk} = \exp(\frac{f_i + g_j + h_k - C_{ijk}}{\epsilon})$.
Dual:
$$\max_{f,g,h} \langle f, a \rangle + \langle g, b \rangle + \langle h, c \rangle - \epsilon \sum_{ijk} \exp\left( \frac{f_i + g_j + h_k - C_{ijk}}{\epsilon} \right)$$

**(3)**
Sinkhorn iterations (block coordinate ascent on dual):
Update $f$ (fixing $g, h$):
$\frac{\partial \text{Dual}}{\partial f_i} = a_i - \sum_{j,k} \exp(\frac{f_i + g_j + h_k - C_{ijk}}{\epsilon}) = 0$
$$f_i \leftarrow \epsilon \log a_i - \epsilon \log \sum_{j,k} \exp\left( \frac{g_j + h_k - C_{ijk}}{\epsilon} \right)$$
Similarly for $g$ and $h$.

**(4)**
The Birkhoff contraction argument relies on the properties of the linear operator mapping one marginal potential to the other (positivity and preservation of ratios). For 2 marginals, this corresponds to a map on the probability simplex (or positive cone) which contracts in the Hilbert projective metric. For 3 marginals (tensors), the update is not a simple linear map between two spaces but a cycle of non-linear updates. The generalized "Birkhoff polytope" for tensors is much more complex, and the standard metric contraction proof does not hold because the cross-ratio arguments do not apply directly to the multimarginal setting.
{{< /spoiler >}}

4. Exercise 4 (Gaussian example for Sinkhorn in dual form). Let a and b be probability measures on R and let $c(x,y)=\frac{1}{2}(x-y)^{2}$.
The entropic OT dual can be written
$max_{f,g}\int f(x)d\alpha(x)+\int g(y)d\beta(y)-\epsilon\iint exp(\frac{f(x)+g(y)-c(x,y)}{\epsilon})d\alpha(x)d\beta(y)$ .

**(1)** Recall the Sinkhorn update on f (dual form).

**(2)** Assume $\alpha=\mathcal{N}(m_{1},\sigma_{1}^{2})$, $\beta=\mathcal{N}(m_{2},\sigma_{2}^{2})$, and $g(y)$ is quadratic, say $g(y)=\frac{1}{2}ay^{2}+by+c$. Compute the integral on the right-hand side and show that the updated f is also quadratic.

**(3)** Give an intuitive explanation of why (for this quadratic/Gaussian setting) the optimal dual potentials remain quadratic, and what this implies for the optimal coupling $\pi^{*}.$

{{< spoiler "Solution" >}}
**(1)**
Fixing $g$, the optimal $f$ satisfies:
$$f(x) = -\epsilon \log \int \exp\left( \frac{g(y) - c(x,y)}{\epsilon} \right) d\beta(y)$$
(up to constants depending on normalization).

**(2)**
We need to compute the integral $I(x) = \int \exp( \frac{g(y) - c(x,y)}{\epsilon} ) d\beta(y)$.
Given $g(y)$ is quadratic and $c(x,y) = \frac{1}{2}(x-y)^2$ is quadratic in $y$ (and $x$), and $\beta(y) \sim \exp(-(y-m)^2/2\sigma^2)$ is log-quadratic.
The exponent inside the integral is a sum of quadratics in $y$:
$\frac{1}{\epsilon}(\frac{1}{2}ay^2 + by + c - \frac{1}{2}x^2 + xy - \frac{1}{2}y^2) - \frac{1}{2\sigma_2^2}(y-m_2)^2$.
This is of the form $Ay^2 + B(x)y + C(x)$.
The integral of $e^{Ay^2 + By + C}$ is proportional to $e^{C - B^2/4A}$ (Gaussian integral).
The term $B(x)$ is linear in $x$ (from the cross term $xy$ in the cost).
The term $C(x)$ is quadratic in $x$ (from the $-x^2$ in the cost).
Thus, $\log I(x)$ is a quadratic function of $x$.
Since $f(x) = -\epsilon \log I(x)$, $f(x)$ is quadratic.

**(3)**
Intuition: The Sinkhorn update is essentially a convolution (specifically, a $(min,+)$ convolution smoothed by $\epsilon$) of the potential with the Gaussian kernel $e^{-c(x,y)/\epsilon}$. Convolving a Gaussian (or log-quadratic function) with another Gaussian results in a Gaussian.
Implication: If $f$ and $g$ are quadratic, the optimal coupling $\pi^*(x,y) \propto e^{(f(x)+g(y)-c(x,y))/\epsilon} \alpha(x) \beta(y)$ is an exponential of a quadratic form in $(x,y)$. Thus, the optimal entropic plan $\pi^*$ is a Gaussian distribution.
{{< /spoiler >}}

5. Exercise 5 (Envelope theorem and gradients of the entropic cost). Recall the envelope theorem in the finite-dimensional smooth case:
Let $V(\theta):=min_{z}F(z,\theta)$ with F smooth, and for each assume there is a unique minimizer $z^{*}(\theta).$ Then $\nabla_{\theta}V(\theta)=\nabla_{\theta}F(z^{*}(\theta),\theta)$, i.e. the derivative of V w.r.t. is the partial derivative of F at the optimizer (no derivative of z* needed).
Let $a\in\mathbb{R}_{+}^{m}$, $b\in\mathbb{R}_{+}^{n}$ be histograms and $C\in\mathbb{R}^{m\times n}$ a cost matrix. The entropic OT cost is
$W_{\epsilon}(a,b;C):=min_{P\in\mathbb{R}_{i}^{m\times n}}\{\langle C,P\rangle+\epsilon\sum_{i,j}P_{ij}(\log~P_{ij}-1)\}$

**(1)** Using the envelope theorem on this primal problem, give the gradient $\nabla_{C}W_{\epsilon}(a,b;C)$.

**(2)** Assume the cost comes from positions: $x=(x_{1},...,x_{m})\subset\mathbb{R}^{d},$ y $y=(y_{1},...,y_{n})\subset\mathbb{R}^{d}$ and $C_{ij}=\frac{1}{2}||x_{i}-y_{j}||^{2}$. Compute $\nabla_{x_{1}}W_{\epsilon}(a,b;C)$.

**(3)** Recall the dual of entropic OT
$W_{\epsilon}(a, b; C) = \max_{f,g} \{ \langle f, a \rangle + \langle g, b \rangle - \epsilon \sum_{i,j} \exp(\frac{f_i+g_j-C_{ij}}{\epsilon}) \}$
Using again the envelope theorem, give $\nabla_{a}W_{\epsilon}(a,b;C).$

{{< spoiler "Solution" >}}
**(1)**
Let the objective be $F(P, C) = \sum C_{ij} P_{ij} + \epsilon H(P)$.
By Envelope Theorem, $\nabla_C W_\epsilon = \nabla_C F(P^*, C)$.
$\frac{\partial F}{\partial C_{ij}} = P_{ij}$.
So $\nabla_C W_{\epsilon} = P^*$, the optimal transport plan.

**(2)**
Using the chain rule: $\nabla_{x_1} W_\epsilon = \sum_{j} \frac{\partial W_\epsilon}{\partial C_{1j}} \nabla_{x_1} C_{1j}$.
From (1), $\frac{\partial W_\epsilon}{\partial C_{1j}} = P^*_{1j}$.
$C_{1j} = \frac{1}{2} \|x_1 - y_j\|^2 \implies \nabla_{x_1} C_{1j} = x_1 - y_j$.
$\nabla_{x_1} W_\epsilon = \sum_{j} P^*_{1j} (x_1 - y_j) = x_1 (\sum_j P^*_{1j}) - \sum_j P^*_{1j} y_j$.
Using $\sum_j P^*_{1j} = a_1$:
$$\nabla_{x_1} W_\epsilon = a_1 x_1 - \sum_{j} P^*_{1j} y_j$$
(This is $a_1(x_1 - T_\epsilon(x_1))$ where $T_\epsilon$ is the barycentric projection).

**(3)**
Let the dual objective be $G(f, g, a)$.
$\nabla_a W_\epsilon = \nabla_a G(f^*, g^*, a)$.
The term involving $a$ is $\langle f, a \rangle$.
$\nabla_a \langle f, a \rangle = f$.
So $\nabla_a W_{\epsilon} = f^*$, the optimal dual potential.
{{< /spoiler >}}

6. Exercise 6 (Entropic OT, joint convexity, and semi-relaxed reformulation). Let $a=(a_{1},...,a_{m})\in\Delta_{m}$ and $b=(b_{1},...,b_{n})\in\Delta_{n}$ be probability vectors and let $C\in\mathbb{R}^{m\times n}$ be a cost matrix.
Consider the (balanced) entropic OT problem
$W_{\epsilon}(a,b) := \min_{P\in\mathbb{R}_{+}^{m\times n}, P1=a, P^{\top}1=b} \{\langle C,P\rangle+H(P)\}, \quad H(P):=\sum_{i,j}P_{ij}(\log~P_{ij}-1) .$
It is well known (and you may take it for granted) that the dual of this problem is
$W_{\epsilon}(a,b)=sup_{f\in\mathbb{R}^{m},g\in\mathbb{R}^{n}}\{\langle f,a\rangle+\langle g,b\rangle-\epsilon\sum_{i=1}^{m}\sum_{j=1}^{n}exp(\frac{f_{i}+g_{j}-C_{ij}}{\epsilon})\}$

**(1)** Using the dual expression above, show that both maps $a\mapsto W_{\epsilon}(a,b)$ and $b\mapsto W_{\epsilon}(a,b)$ are convex, and in fact that that $W_{\epsilon}(a,b)$ is jointly convex in (a, b).

**(2)** Show that the outer problem $\min_{a\in\Delta_{m}}W_{\epsilon}(a,b)$ is equivalent to the semi-relaxed problem $\min_{P\ge0, P^\top 1 = b}\langle C,P\rangle+\epsilon H(P)$.

**(3)** Solve this semi-relaxed problem in closed form.

{{< spoiler "Solution" >}}
**(1)**
$W_\epsilon(a, b)$ is the supremum of a family of functions $L_{f,g}(a, b) = \langle f, a \rangle + \langle g, b \rangle - \text{const}_{f,g}$.
$L_{f,g}(a, b)$ is linear in $a$, linear in $b$, and linear in $(a, b)$.
Since the supremum of convex (here linear) functions is convex, $W_\epsilon(a, b)$ is convex in $a$, convex in $b$, and jointly convex in $(a, b)$.

**(2)**
$\min_{a \in \Delta_m} W_\epsilon(a, b) = \min_{a} \min_{P: P1=a, P^\top 1=b} \dots$
The constraint $a \in \Delta_m$ is redundant if $P^\top 1 = b \in \Delta_n$ because summing $P$ over all indices gives 1, so $P1$ is automatically a probability vector.
Collapsing the minimization:
$\min_{P \ge 0} \{ \dots \mid \exists a, P1=a, P^\top 1=b \} = \min_{P \ge 0, P^\top 1=b} \langle C, P \rangle + \epsilon H(P)$.

**(3)**
This separates into $n$ independent problems for each column $j$.
Minimize $\sum_i C_{ij} P_{ij} + \epsilon \sum_i P_{ij}(\log P_{ij} - 1)$ subject to $\sum_i P_{ij} = b_j$.
Lagrangian for column $j$: $\sum_i (C_{ij} P_{ij} + \epsilon P_{ij}\log P_{ij} - \epsilon P_{ij}) + \lambda_j (b_j - \sum_i P_{ij})$.
Optimality: $C_{ij} + \epsilon \log P_{ij} - \lambda_j = 0 \implies P_{ij} \propto e^{-C_{ij}/\epsilon}$.
Normalizing to sum to $b_j$:
$$P_{ij}^* = b_j \frac{e^{-C_{ij}/\epsilon}}{\sum_k e^{-C_{kj}/\epsilon}}$$
{{< /spoiler >}}

7. Exercise 7 (Invariance and primal/dual recovery (continuous setting)). Let (X, ) and (Y, v) be measurable spaces and let on X and on Y be probability measures.
For a measurable cost $c:X\times Y\rightarrow\mathbb{R}$ and $\epsilon>0$ consider the entropic optimal transport problem
$min_{\pi\in\Pi(\alpha,\beta)}\{\int_{X\times Y}c(x,y)d\pi(x,y)+\epsilon\int_{X\times Y}(log\frac{d\pi}{d(\alpha\otimes\beta)}(x,y)-1)d\pi(x,y)\}$
where $\Pi(\alpha,\beta)$ is the set of couplings of a and and we assume $\pi\ll\alpha\otimes\beta$ for all admissible π.

**(1)** (Invariance under potentials) Let $u:X\rightarrow\mathbb{R}$ Rand $v:Y\rightarrow\mathbb{R}$ be integrable. Show that replacing the cost by $c^{\prime}(x,y)=c(x,y)+u(x)+v(y)$ does not change the optimal plan: the minimizer for ' is the same coupling as for c.

**(2)** (Scaling of the cost) For $\lambda>0$, denote by $\pi_{c,\epsilon}$ the optimal coupling for cost c and regularization $\epsilon$, and by $\pi_{\lambda c,\epsilon}$ the one for the scaled cost Ac. Show that
$\pi_{\lambda c,\epsilon}=\pi_{c,\epsilon/\lambda},$
i.e. scaling the cost by is the same as keeping the cost and scaling the regularization by 1/λ.

{{< spoiler "Solution" >}}
**(1)**
$\int c' d\pi = \int (c(x,y) + u(x) + v(y)) d\pi(x,y) = \int c d\pi + \int u d\pi + \int v d\pi$.
Since $\pi \in \Pi(\alpha, \beta)$, marginals are fixed.
$\int u(x) d\pi(x,y) = \int u(x) d\alpha(x)$ (constant).
$\int v(y) d\pi(x,y) = \int v(y) d\beta(y)$ (constant).
The objective function shifts by a constant independent of $\pi$. The minimizer remains the same.

**(2)**
Objective for $(\lambda c, \epsilon)$: $\int \lambda c d\pi + \epsilon H(\pi)$.
Divide by $\lambda > 0$: $\int c d\pi + \frac{\epsilon}{\lambda} H(\pi)$.
This is the objective for parameters $(c, \epsilon/\lambda)$.
Thus $\pi_{\lambda c, \epsilon} = \pi_{c, \epsilon/\lambda}$.
{{< /spoiler >}}
