+++
title = "Kantorovich Relaxation"
date = 2025-10-08
draft = true
+++

## Summary

This chapter introduces the **Kantorovich formulation** of Optimal Transport. This relaxation of the Monge problem allows for mass splitting, transforming the transport problem into a convex optimization problem (specifically, a linear program). This ensures the existence of solutions even when Monge maps do not exist.

The chapter covers the discrete and continuous formulations, the metric properties of the resulting **Wasserstein distance**, and the geometry of the space of probability measures via **displacement interpolation**.

## Discrete Kantorovich Problem

Let $\alpha = \sum_{i=1}^n a_i \delta_{x_i}$ and $\beta = \sum_{j=1}^m b_j \delta_{y_j}$ be discrete probability measures with weight vectors $a \in \Sigma_n$ and $b \in \Sigma_m$.

Instead of a map $T$, we optimize over a **coupling matrix** $P \in \mathbb{R}_+^{n \times m}$, where $P_{ij}$ represents the amount of mass transported from $x_i$ to $y_j$.

{{< definition "Discrete Kantorovich Problem" >}}
The problem is a Linear Program (LP):
$$
\min_{P \in U(a, b)} \langle C, P \rangle = \sum_{i=1}^n \sum_{j=1}^m C_{ij} P_{ij}
$$
where the polytope of admissible couplings is:
$$
U(a, b) = \left\{ P \in \mathbb{R}_+^{n \times m} \mid P \mathbf{1}_m = a, \, P^\top \mathbf{1}_n = b \right\}.
$$

{{< /definition >}}

### Key Properties
* **Existence:** The set $U(a, b)$ is a non-empty, bounded polytope (compact). Since the cost function is linear (continuous), a minimum always exists.
* **Complexity:** Solvable in polynomial time via LP algorithms (e.g., Network Simplex).
* **Sparsity:** There exists an optimal solution with at most $n + m - 1$ non-zero entries (vertices of the polytope).

{{< theorem "Birkhoff-von Neumann Theorem" >}}
In the assignment case ($n=m$ and $a_i = b_j = 1/n$), the vertices of the polytope $U(\mathbf{1}/n, \mathbf{1}/n)$ are the permutation matrices.
$$
\operatorname{Extr}(\mathcal{B}_n) = \mathcal{P}_n
$$
Thus, for strictly convex costs where the solution is unique, the optimal Kantorovich coupling is a permutation matrix, recovering the Monge solution.
{{< /theorem >}}

## Continuous Kantorovich Problem

We generalize to arbitrary probability measures $\alpha \in \mathcal{P}(\mathcal{X})$ and $\beta \in \mathcal{P}(\mathcal{Y})$. The unknown variable is now a joint probability measure $\pi$ on $\mathcal{X} \times \mathcal{Y}$.

{{< definition "Continuous Coupling" >}}
A measure $\pi \in \mathcal{P}(\mathcal{X} \times \mathcal{Y})$ is a coupling of $\alpha$ and $\beta$ if its marginals are $\alpha$ and $\beta$:
$$
(P_1)_\# \pi = \alpha \quad \text{and} \quad (P_2)_\# \pi = \beta.
$$
The set of all couplings is denoted $\Pi(\alpha, \beta)$. The Kantorovich problem is:
$$
\mathcal{L}_c(\alpha, \beta) = \inf_{\pi \in \Pi(\alpha, \beta)} \int_{\mathcal{X} \times \mathcal{Y}} c(x, y) \, \mathrm{d}\pi(x, y).
$$

{{< /definition >}}

{{< info "Monge vs. Kantorovich" >}}
* **Relaxation:** Kantorovich relaxes the deterministic constraint. If $T$ is a Monge map, then $\pi = (\mathrm{Id}, T)_\# \alpha$ is a valid coupling supported on the graph of $T$.
* **Equivalence:** For quadratic costs on $\mathbb{R}^d$ with absolutely continuous $\alpha$, the unique optimal coupling is a Monge map (Brenier's Theorem).
* **Strict Improvement:** If $\alpha = \delta_0$ and $\beta = \frac{1}{2}\delta_{-1} + \frac{1}{2}\delta_1$, no Monge map exists (cost is undefined or $\infty$), but a Kantorovich coupling exists with finite cost.
{{< /info >}}

## Wasserstein Distance

When the cost is a metric power $c(x,y) = d(x,y)^p$ ($p \ge 1$), the optimal transport value defines a metric on the space of probability distributions.

{{< definition "Wasserstein Distance" >}}
The $p$-Wasserstein distance is defined as:
$$
\mathcal{W}_p(\alpha, \beta) = \left( \inf_{\pi \in \Pi(\alpha, \beta)} \int_{\mathcal{X} \times \mathcal{Y}} d(x, y)^p \, \mathrm{d}\pi(x, y) \right)^{1/p}
$$

{{< /definition >}}

### Properties and Topology
* **Triangle Inequality:** Proved using the **Gluing Lemma**. Given optimal couplings $\pi_{\alpha \beta}$ and $\pi_{\beta \gamma}$, one can construct a measure on $\mathcal{X} \times \mathcal{X} \times \mathcal{X}$ with marginals $\alpha, \beta, \gamma$ to show $\mathcal{W}_p(\alpha, \gamma) \le \mathcal{W}_p(\alpha, \beta) + \mathcal{W}_p(\beta, \gamma)$.
* **Weak Convergence:** The Wasserstein distance metrizes weak convergence plus convergence of the $p$-th moment.
    $$
    \mathcal{W}_p(\alpha_n, \alpha) \to 0 \iff \alpha_n \rightharpoonup \alpha \text{ and } \int |x|^p \mathrm{d}\alpha_n \to \int |x|^p \mathrm{d}\alpha
    $$
* **Comparison to TV:** $\mathcal{W}_p$ handles shifted supports correctly ($\mathcal{W}_p(\delta_x, \delta_y) = |x-y|$), whereas Total Variation is discontinuous ($TV(\delta_x, \delta_y) = 2$ for $x \neq y$).

## Displacement Interpolation

The space $(\mathcal{P}_2(\mathbb{R}^d), \mathcal{W}_2)$ is a geodesic space. The geodesics correspond to interpolating the optimal transport map.

{{< definition "McCann's Interpolation" >}}
Let $\pi^*$ be the optimal coupling between $\alpha$ and $\beta$. The displacement interpolation $\alpha_t$ (for $t \in [0, 1]$) is the law of the random variable:
$$
X_t = (1-t)X + tY, \quad \text{where } (X, Y) \sim \pi^*.
$$
In the Monge case ($Y = T(X)$), this is $\alpha_t = ((1-t)\mathrm{Id} + tT)_\# \alpha$.
This path satisfies $\mathcal{W}_2(\alpha_s, \alpha_t) = |t-s|\mathcal{W}_2(\alpha_0, \alpha_1)$.
{{< /definition >}}


## Exercises

### Discrete Kantorovich

1.  **(1D discrete optimal Kantorovich plan).** Let $n=m=3$ and consider two 1D discrete measures with sorted supports and weights $a=(1.1, 0.8, 1.1)$ and $b=(1, 1, 1)$. For the quadratic cost $c(x,y)=|x-y|^2$, compute the optimal coupling matrix $P \in \mathbb{R}_{+}^{3 \times 3}$.

{{< spoiler "Solution" >}}
Since the cost is quadratic ($c(x,y) = |x-y|^2$) and the supports are sorted, the optimal strategy satisfies the **monotonicity property** (no crossing). For discrete measures, this is solved greedily using the **North-West Corner Rule**: filling the matrix from top-left to bottom-right to satisfy the marginal constraints.

**Step-by-step construction:**

1.  **Entry (1,1):** supply $a_1=1.1$, demand $b_1=1$.
      * Take $P_{11} = \min(1.1, 1) = 1$.
      * Remaining supply $a_1' = 0.1$. Demand $b_1$ satisfied ($0$).
2.  **Entry (1,2):** supply $a_1'=0.1$, demand $b_2=1$.
      * Take $P_{12} = \min(0.1, 1) = 0.1$.
      * Supply $a_1$ exhausted ($0$). Remaining demand $b_2' = 0.9$.
3.  **Entry (2,2):** supply $a_2=0.8$, demand $b_2'=0.9$.
      * Take $P_{22} = \min(0.8, 0.9) = 0.8$.
      * Supply $a_2$ exhausted ($0$). Remaining demand $b_2'' = 0.1$.
4.  **Entry (3,2):** supply $a_3=1.1$, demand $b_2''=0.1$.
      * Take $P_{32} = \min(1.1, 0.1) = 0.1$.
      * Remaining supply $a_3' = 1$. Demand $b_2$ satisfied ($0$).
5.  **Entry (3,3):** supply $a_3'=1$, demand $b_3=1$.
      * Take $P_{33} = 1$.

**Optimal Coupling Matrix:**

$$
P = \begin{pmatrix}
1 & 0.1 & 0 \\
0 & 0.8 & 0 \\
0 & 0.1 & 1
\end{pmatrix}
$$

{{< /spoiler >}}

2.  **(Parametric 1D cases).**
    **(1)** Two against two: $a=(1+\varepsilon, 1-\varepsilon)$ and $b=(1,1)$ with $|\varepsilon| \le 1$. Compute the optimal $P$.
    **(2)** Three against three: $a=(1+\varepsilon, 1+\eta, 1-\varepsilon-\eta)$ and $b=(1,1,1)$. Compute optimal monotone $P$ for (i) $\varepsilon>0, \eta>0$ and (ii) $\varepsilon<0, \eta>0$.

{{< spoiler "Solution" >}}
**(1) Two against two:**
Using the monotonicity (North-West corner) rule:

  * **If $\varepsilon > 0$:** $a_1 = 1+\varepsilon > 1$.
    $$P = \begin{pmatrix} 1 & \varepsilon \\ 0 & 1-\varepsilon \end{pmatrix}$$
  * **If $\varepsilon < 0$:** $a_1 = 1+\varepsilon < 1$.
    $$P = \begin{pmatrix} 1+\varepsilon & 0 \\ -\varepsilon & 1 \end{pmatrix}$$

**(2) Three against three:**

  * **(i) $\varepsilon > 0, \eta > 0$:**
      * $a_1 = 1+\varepsilon > 1$. $P_{11}=1, P_{12}=\varepsilon$.
      * $a_2 = 1+\eta$. Need to fill $b_2$ (remaining $1-\varepsilon$). $P_{22} = 1-\varepsilon$.
      * Remaining $a_2 = 1+\eta - (1-\varepsilon) = \varepsilon+\eta$. $P_{23} = \varepsilon+\eta$.
      * $a_3 = 1-\varepsilon-\eta$. $P_{33} = 1-\varepsilon-\eta$.
        $$P = \begin{pmatrix} 1 & \varepsilon & 0 \\ 0 & 1-\varepsilon & \varepsilon+\eta \\ 0 & 0 & 1-\varepsilon-\eta \end{pmatrix}$$
  * **(ii) $\varepsilon < 0, \eta > 0$:**
      * $a_1 = 1+\varepsilon < 1$. $P_{11} = 1+\varepsilon$.
      * $b_1$ remaining $= -\varepsilon$. $P_{21} = -\varepsilon$.
      * $a_2 = 1+\eta$. Remaining $a_2 = 1+\eta-(-\varepsilon) = 1+\eta+\varepsilon$.
      * This fills $b_2=1$ entirely if $\eta+\varepsilon \ge 0$. Assuming greedy fill for $b_2$: $P_{22}=1$.
      * Wait, standard NW rule: $P_{21}$ took $-\varepsilon$ from $a_2$. Rem $a_2 = 1+\eta+\varepsilon$.
      * Fill $b_2$: $P_{22} = \min(1+\eta+\varepsilon, 1)$. Since $\varepsilon$ is small negative and $\eta>0$, let's assume $1+\eta+\varepsilon \ge 1$. Then $P_{22}=1$, remainder to $P_{23}$.
        $$P = \begin{pmatrix} 1+\varepsilon & 0 & 0 \\ -\varepsilon & 1 & \eta+\varepsilon \\ 0 & 0 & 1-\eta-\varepsilon \end{pmatrix}$$
        *(Note: exact split depends on magnitude of $\eta$ vs $\varepsilon$, but this follows the monotonicity logic).*

{{< /spoiler >}}

3.  **(Couplings in basic cases).**
    **(a)** What are the couplings between $\delta_x$ and $\delta_y$?
    **(b)** What are the couplings between $\delta_x$ and $\frac{1}{2}(\delta_y + \delta_z)$ ($y \neq z$)?
    **(c)** Let $\alpha, \beta$ be finite positive measures with different total masses. What is $\Pi(\alpha, \beta)$?

{{< spoiler "Solution" >}}
**(a)** There is only **one** coupling: the product measure $\delta_x \otimes \delta_y = \delta_{(x,y)}$.
$$P = [1]$$

**(b)** The source has mass 1 at $x$. The target has mass $0.5$ at $y$ and $0.5$ at $z$.
Mass conservation forces the mass at $x$ to split. There is only **one** coupling:
$$\pi = \delta_x \otimes \left(\frac{1}{2}\delta_y + \frac{1}{2}\delta_z\right) = \frac{1}{2}\delta_{(x,y)} + \frac{1}{2}\delta_{(x,z)}$$
$$P = \begin{bmatrix} 1/2 & 1/2 \end{bmatrix}$$

**(c)** The set of couplings $\Pi(\alpha, \beta)$ is **empty** ($\emptyset$).
Definition of coupling requires $\pi(\mathcal{X} \times \mathcal{Y}) = \alpha(\mathcal{X})$ and $\pi(\mathcal{X} \times \mathcal{Y}) = \beta(\mathcal{Y})$.
If $\alpha(\mathcal{X}) \neq \beta(\mathcal{Y})$, no such measure exists.

{{< /spoiler >}}

4.  **(Discrete $\alpha_t$ from a coupling).** Let $\pi = \sum_{i,j} P_{ij} \delta_{(x_i, y_j)}$ be an optimal coupling. For $t \in [0,1]$, define $P_t(x,y) = (1-t)x + ty$ and $\alpha_t := (P_t)_\# \pi$.
    **(a)** Show $\alpha_t$ interpolates between $\alpha_0$ and $\alpha_1$.
    **(b)** Prove $\alpha_t$ is discrete. Bound the number of atoms.
    **(c)** Give the explicit expression of $\alpha_t$ in terms of the matrix $P$.
    **(d)** Assume $n=m$. Under which condition(s) can one choose an optimal coupling so that $\alpha_t$ has exactly $n$ Dirac masses for all $t$?

{{< spoiler "Solution" >}}
**(a)** $P_0(x,y) = x = P_1(x,y)$ (projection to 1st component).
$\alpha_0 = (P_0)_\# \pi = (P_1)_\# \pi = \alpha$. Similarly for $\alpha_1 = \beta$.

**(b)** Since $\pi$ is a discrete sum of Diracs, its pushforward by *any* map $P_t$ is also a discrete sum of Diracs.
$\alpha_t = \sum_{i,j} P_{ij} \delta_{P_t(x_i, y_j)}$.
The number of atoms is at most the number of non-zero entries in $P$.
Bound: $nm$ (trivial) or $n+m-1$ (using sparse LP solution).

**(c)**
$$\alpha_t = \sum_{i=1}^n \sum_{j=1}^m P_{ij} \delta_{(1-t)x_i + t y_j}$$

**(d)** For $\alpha_t$ to have exactly $n$ masses (same as source/target), the coupling $P$ must be a **permutation matrix** (possibly scaled by $1/n$).
This implies $b$ is a permutation of $a$ (weights match) and the optimal transport is deterministic (Monge map exists).
$$b_i = a_{\sigma(i)} = 1/n \implies P_{ij} = \frac{1}{n}\delta_{j, \sigma(i)}.$$

{{< /spoiler >}}

5.  **(When does a finite-cost coupling exist?).** Let $\alpha, \beta$ be uniform discrete measures on $n$ points. Cost matrix $C_{ij} \in \mathbb{R} \cup \{+\infty\}$.
    **(i)** $2 \times 2$ case: determine when a finite cost coupling exists.
    **(ii)** General case: Prove existence $\iff$ exists permutation $\sigma$ such that $(i, \sigma(i))$ are allowed edges.

{{< spoiler "Solution" >}}
**(i) 2x2 Case:**
Constraints: $P_{11}+P_{12}=1/2$, $P_{21}+P_{22}=1/2$, etc.
Finite cost exists if we can place mass only on entries where $C_{ij} < \infty$.
Possible configurations of finite $C_{ij}$ ($E$ edges):
- If 0, 1, or 2 edges (unless diagonal/anti-diagonal): Usually impossible or requires specific mass balance.
- Specifically, we need to cover the rows and columns.
- Valid configurations: The finite entries must contain a **perfect matching** (e.g., $C_{11}, C_{22} < \infty$ OR $C_{12}, C_{21} < \infty$). If only one row/col is covered (e.g. only $C_{11}, C_{12}$ finite), we cannot satisfy the marginal for the second row.

**(ii) General Case:**
Let $E = \{(i,j) : C_{ij} < \infty\}$.

If OT $\pi$ exists, then for each row or column we have at least one $C_{i j} < 0$.
Since the masses of $\alpha$ and $\beta$ are equal, there exists a coupling that is a permutation.

If there exists a permutation $(i, \sigma(i)) \in E$, we can use this permutation as a possible finite coupling because the masses of $\alpha$ and $\beta$ are equal.

{{< /spoiler >}}

### Continuous Kantorovich

1.  **(Couplings in basic cases).**
    **(a)** Let $\alpha, \beta$ be finite positive measures with different total masses. What is $\Pi(\alpha, \beta)$?
    **(b)** (i) Couplings between $\delta_x$ and $\mathcal{U}[0,1]$?
    (ii) Couplings between $\frac{1}{2}(\delta_x + \delta_y)$ and $\mathcal{U}[0,1]$?

{{< spoiler "Solution" >}}
**(a)** $\emptyset$ (Empty set). Mass conservation fails.

**(b)(i)** $\alpha=\delta_x$. The only coupling is $\pi = \delta_x \otimes \mathcal{U}[0,1]$.
Proof: Support of $\pi$ must be in $\{x\} \times [0,1]$. $\pi(A \times B) = \int_A \pi_x(B) d\alpha(x) = \mathbb{1}_A(x) \beta(B)$.

**(b)(ii)** $\alpha = 0.5\delta_x + 0.5\delta_y$.
There are **infinite** couplings.
We just need to split the mass of $\mathcal{U}[0,1]$ into two parts $\mu_1, \mu_2$ each with mass $0.5$, and assign them to $x$ and $y$.
$\pi = 0.5 \delta_x \otimes (2\mu_1) + 0.5 \delta_y \otimes (2\mu_2)$, where $\mu_1 + \mu_2 = \mathcal{U}[0,1]$.
Example: $x$ gets $[0, 0.5]$, $y$ gets $(0.5, 1]$. Or $x$ gets $[0, 1]$ (scaled by 0.5) and $y$ gets $[0, 1]$ (scaled).

{{< /spoiler >}}

2.  **(Gaussian couplings in $\mathbb{R}$).** $\alpha \sim \mathcal{N}(0, \sigma_\alpha^2)$, $\beta \sim \mathcal{N}(0, \sigma_\beta^2)$. Coupling $\pi \sim \mathcal{N}(0, \Sigma)$ with $\Sigma = \begin{pmatrix} \sigma_\alpha^2 & c \\ c & \sigma_\beta^2 \end{pmatrix}$.
    **(a)** Cost $\mathbb{E}[(X-Y)^2]$ in terms of $c$.
    **(b)** Constraint on $c$.
    **(c)** Solve Kantorovich.
    **(d)** Rank and support of optimal $\pi$.

{{< spoiler "Solution" >}}
**(a)** $\mathbb{E}[X^2 + Y^2 - 2XY] = \sigma_\alpha^2 + \sigma_\beta^2 - 2c$.

**(b)** $\Sigma \ge 0 \iff \det(\Sigma) \ge 0 \iff \sigma_\alpha^2 \sigma_\beta^2 - c^2 \ge 0 \implies |c| \le \sigma_\alpha \sigma_\beta$.

**(c)** Minimize cost $\iff$ Maximize $c$.
Max valid $c = \sigma_\alpha \sigma_\beta$.
Min cost $= \sigma_\alpha^2 + \sigma_\beta^2 - 2\sigma_\alpha \sigma_\beta = (\sigma_\alpha - \sigma_\beta)^2$.

**(d)** At optimal $c = \sigma_\alpha \sigma_\beta$:
$\det(\Sigma) = 0$. The rank is **1**.
The support is the line where correlation is 1: $Y = \frac{\sigma_\beta}{\sigma_\alpha}X$.
This recovers the **Monge map**.

{{< /spoiler >}}

3.  **(Gaussian couplings in $\mathbb{R}^d$).** $\alpha \sim \mathcal{N}(0, \Sigma_\alpha)$, $\beta \sim \mathcal{N}(0, \Sigma_\beta)$. $\pi \sim \mathcal{N}(0, \Sigma)$ with off-diagonal block $K$.
    **(a)** Cost in terms of $K$.
    **(b)** Constraint on $K$.
    **(c)** Solve by minimizing cost.
    **(d)** Rank and support.

{{< spoiler "Solution" >}}
**(a)** $\mathbb{E}[\|X-Y\|^2] = \text{Tr}(\Sigma_\alpha) + \text{Tr}(\Sigma_\beta) - 2\text{Tr}(K)$.

**(b)** Schur complement condition for $\Sigma \ge 0$:
$\Sigma_\beta - K^\top \Sigma_\alpha^{-1} K \succeq 0$.

**(c)** Maximize $\text{Tr}(K)$ subject to constraint.
Solution involves matrix square roots (Bures metric).
$K^* = \Sigma_\alpha^{1/2} (\Sigma_\alpha^{1/2} \Sigma_\beta \Sigma_\alpha^{1/2})^{1/2} \Sigma_\alpha^{-1/2}$. (Assuming commutativity or specific derivation path, usually leads to $K = \Sigma_\alpha^{1/2} (\Sigma_\alpha^{1/2} \Sigma_\beta \Sigma_\alpha^{1/2})^{1/2} \Sigma_\alpha^{-1/2} \Sigma_\alpha$ ... actually simplies to $K = \Sigma_\alpha A^T$).
The optimal value recovers the Wasserstein-2 distance: $\text{Tr}(\Sigma_\alpha) + \text{Tr}(\Sigma_\beta) - 2\text{Tr}((\Sigma_\alpha^{1/2} \Sigma_\beta \Sigma_\alpha^{1/2})^{1/2})$.

**(d)**
(i) Strict feasibility: $\Sigma > 0$, Rank $2d$, Support $\mathbb{R}^{2d}$.
(ii) Optimizer: The optimal $\pi$ is supported on the graph of the Monge map $T(x) = Ax$. Rank is $d$. Support is a $d$-dimensional subspace.

{{< /spoiler >}}

4.  **(Uniform vs Two Diracs).** Fix distinct $x, y \in \mathbb{R}$. $\alpha = \mathcal{U}[0,1]$, $\beta = \frac{1}{2}\delta_x + \frac{1}{2}\delta_y$. Cost $|u-v|^p$.
    **(a)** Find optimal Monge map $T$.
    **(b)** Is there a Monge map $S$ from $\beta$ to $\alpha$?
    **(c)** Describe optimal Kantorovich coupling.

{{< spoiler "Solution" >}}
**(a)** $T$ must be non-decreasing (1D optimal transport).
It must map mass $0.5$ to $x$ and $0.5$ to $y$.

$$
T(u) = \begin{cases} x & \text{if } 0 \le u \le 1/2 \\ y & \text{if } 1/2 < u \le 1 \end{cases}
$$
(Assuming $x < y$).

**(b)** No. $S$ must map $x \to s_1$ and $y \to s_2$. $S_\# \beta = 0.5 \delta_{s_1} + 0.5 \delta_{s_2}$.
This is discrete, so it cannot equal the continuous measure $\alpha = \mathcal{U}[0,1]$.

**(c)** The optimal coupling $\pi$ is unique (since $\alpha$ is continuous). It is supported on the graph of $T$:
$$\pi = (Id, T)_\# \alpha.$$
It distributes the mass of $[0, 1/2]$ onto $x$ and $(1/2, 1]$ onto $y$.
{{< /spoiler >}}

5.  **(A non-Monge optimal plan in $\mathbb{R}^2$).** $\alpha$ uniform on vertical segment $S_0=\{0\}\times[0,1]$. $\beta$ split equally on $S_-=\{-1\}\times[0,1]$ and $S_+=\{1\}\times[0,1]$. Quadratic cost.
    **(a)** Lower bound on cost.
    **(b)** Optimal coupling $\pi^*$ and its cost.
    **(c)** Show no Monge map attains minimum.
    **(d)** Structure of optimizer vs Brenier.

{{< spoiler "Solution" >}}
**(a)** Horizontal distance is always 1. $\|x-y\|^2 = 1^2 + (y_2-x_2)^2 \ge 1$. Thus Cost $\ge 1$.

**(b)** $\pi^*$ splits every point $(0,s)$ equally to $(-1,s)$ and $(1,s)$.
Cost $= \int 1 \, d\pi = 1$. This matches the lower bound, so it's optimal.

**(c)** A Monge map $T$ cannot split mass. $T(0,s)$ is either $(-1, \cdot)$ or $(1, \cdot)$.
To match marginals, it must map a set $A$ of measure $1/2$ to $S_-$ and $A^c$ to $S_+$.
However, $\beta$ is uniform on $S_-$ and $S_+$. $T$ would need to "stretch" $A$ to cover $S_-$, implying vertical movement ($y_2 \neq s$).
Vertical movement means $(y_2-s)^2 > 0$, so Cost $> 1$.
Thus, no Monge map is optimal.

**(d)** Support is $S_0 \times (S_- \cup S_+)$ (specifically pairs $((0,s), (\pm 1, s))$).
This is a "multivalued" map (one-to-two).
**Brenier's Theorem** requires $\alpha$ to be absolutely continuous w.r.t. Lebesgue measure on $\mathbb{R}^d$ ($\mathbb{R}^2$ here).
Here, $\alpha$ is supported on a line (1D subspace), so it is singular in $\mathbb{R}^2$. Brenier's density condition fails, so a Monge map is not guaranteed.

{{< /spoiler >}}

6.  **(Bottleneck cost).** $c(x,y) = 0$ if $x=y$, else $m(x)+m(y)$. $m > 0$.
    **(a)** Show $d(x,y)=c(x,y)$ is a metric.
    **(b)** Compute Kantorovich value $W_c(\alpha, \beta)$ in closed form.
    **(c)** Explicit optimal plan.

{{< spoiler "Solution" >}}
**(a)**
\* $d=0 \iff x=y$ (def).
\* Symmetry clear.
\* Triangle: $d(x,z) \le d(x,y) + d(y,z)$.
If $x=z$, $0 \le \dots$ (ok).
If $x \neq z$, LHS $= m(x)+m(z)$.
If $y$ is distinct from $x,z$, RHS $= m(x)+m(y) + m(y)+m(z)$. Since $m>0$, LHS $<$ RHS.
If $y=x$ or $y=z$, inequality holds trivially.

**(b)** Transport logic: If $x$ stays at $x$, cost 0. If $x$ moves to $y$, cost $m(x)+m(y)$.
We want to keep as much mass fixed as possible.
Max mass that can stay = $\mu = \alpha \wedge \beta$ (common mass).
Remaining mass $(\alpha-\mu)$ must move to $(\beta-\mu)$.
Cost:
$$\int m \, d(\alpha-\mu) + \int m \, d(\beta-\mu) = \int m \, d(\alpha + \beta - 2(\alpha \wedge \beta))$$
$$= \|\alpha-\beta\|_{L^1(m)}$$ (if measures have densities). basically weighted $L^1$ of the difference.

**(c)** Optimal Plan:
1\.  Keep $\mu = \alpha \wedge \beta$ on the diagonal: $\pi_{diag} = (Id, Id)_\# \mu$.
2\.  Transport residual $\alpha' = \alpha - \mu$ to $\beta' = \beta - \mu$.
Since any movement costs $m(x)+m(y)$, and the cost is a metric, we just need *any* coupling between the residuals (actually, because the metric is "transit through a hub", all couplings between residuals might have same cost? No, $\int (m(x)+m(y)) d\pi = \int m d\alpha' + \int m d\beta'$. The coupling doesn't matter for the cost value as long as marginals are right\!).
$\pi = (Id, Id)_\# (\alpha \wedge \beta) + (\alpha-\beta)_+ \otimes (\beta-\alpha)_+$ (normalized).
Actually, simply: Any plan that keeps $\alpha \wedge \beta$ fixed is optimal.
{{< /spoiler >}}
