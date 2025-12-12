+++
title = "Sinkhorn - Entropic Regularization"
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
