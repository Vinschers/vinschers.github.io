+++
title = "Monge Problem"
date = 2025-10-01
+++

## Summary

In this chapter, we explore the **Monge Problem**, the original formulation of Optimal Transport.
The fundamental goal is to find a deterministic map $T$ that moves mass from a source distribution $\alpha$ to a target distribution $\beta$ with minimal effort.
While intuitively appealing, this formulation suffers from existence issues (e.g., splitting mass), which necessitates the relaxation to the Kantorovich problem (covered in later chapters).

## The Monge Formulation

Let $\alpha$ and $\beta$ be two probability measures on spaces $\mathcal{X}$ and $\mathcal{Y}$.
We seek a transport map $T: \mathcal{X} \to \mathcal{Y}$ that pushes $\alpha$ onto $\beta$ ($T_\# \alpha = \beta$) while minimizing the total transport cost.

{{< definition "Monge Problem" >}}
Given a cost function $c(x, y)$, the Monge problem is to find:
$$
\inf_{T} \left\{ \int_{\mathcal{X}} c(x, T(x)) \, \mathrm{d}\alpha(x) \mid T_\# \alpha = \beta \right\}.
$$

{{< /definition >}}

{{< warning "Existence Issues" >}}
A Monge map $T$ **may not exist**.
Since $T$ is a function, it cannot split mass.
If $\alpha = \delta_{x_0}$ (a single Dirac) and $\beta = 0.5\delta_{y_1} + 0.5\delta_{y_2}$ (two Diracs), no single map can satisfy $T_\# \alpha = \beta$ because $T(x_0)$ must be a single point, but the mass must land on two distinct points.
{{< /warning >}}

## Discrete Optimal Transport

When $\alpha$ and $\beta$ are discrete measures with the same number of atoms $n$ and uniform weights, the problem becomes a combinatorial assignment problem.
Let $\alpha = \sum_{i=1}^n \frac{1}{n} \delta_{x_i}$ and $\beta = \sum_{j=1}^n \frac{1}{n} \delta_{y_j}$.

{{< definition "Assignment Problem" >}}
We seek a permutation $\sigma \in \Sigma_n$ that minimizes:
$$
\min_{\sigma \in \Sigma_n} \sum_{i=1}^n c(x_i, y_{\sigma(i)}).
$$

{{< /definition >}}

While the general solution requires $O(n^3)$ operations (e.g., using the Hungarian algorithm), the 1D case is significantly simpler.

### 1D Case: Monotonic Rearrangement
If $\mathcal{X}, \mathcal{Y} \subseteq \mathbb{R}$ and the cost function is convex (e.g., $c(x,y) = |x-y|^p, p \ge 1$), the optimal strategy is to **never cross paths**.
The leftmost point in $\alpha$ must go to the leftmost point in $\beta$.

{{< algorithm >}}
\begin{algorithm}
\caption{1D Discrete Monge Solver}
\begin{algorithmic}
\INPUT Source atoms $X = \{x_1, \dots, x_n\}$, Target atoms $Y = \{y_1, \dots, y_n\}$, Cost $c(x,y)$ convex.
\OUTPUT Optimal map $T$ defined on $X$.

\STATE Sort $X$ such that $x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$
\STATE Sort $Y$ such that $y_{(1)} \le y_{(2)} \le \dots \le y_{(n)}$

\For{$i \gets 1 \textbf{ to } n$}
    \STATE $T(x_{(i)}) \gets y_{(i)}$
\EndFor

\RETURN $T$
\end{algorithmic}
\end{algorithm}
{{< /algorithm >}}

This reduces the complexity from $O(n^3)$ to **$O(n \log n)$** (dominated by sorting).

## Continuous 1D Transport

This sorting intuition generalizes to continuous probability measures using Cumulative Distribution Functions (CDFs).
Let $F_\alpha(x) = \alpha((-\infty, x])$ and $F_\beta(y) = \beta((-\infty, y])$.

{{< theorem "1D Optimal Map" >}}
For convex costs on $\mathbb{R}$, the unique optimal transport map $T$ is the increasing function:
$$
T(x) = F_\beta^{-1}(F_\alpha(x))
$$
where $F_\beta^{-1}$ is the generalized inverse (quantile function).

{{< /theorem >}}

{{< example "General 1D Uniform Transport" >}}
Let $\alpha \sim \mathcal{U}([a, b])$ and $\beta \sim \mathcal{U}([c, d])$.
The CDFs are $F_\alpha(x) = \frac{x-a}{b-a}$ and $F_\beta(y) = \frac{y-c}{d-c}$.
Solving $F_\alpha(x) = F_\beta(T(x))$ yields the affine scaling map:
$$
T(x) = \frac{d-c}{b-a}(x - a) + c.
$$
{{< /example >}}

## Brenier's Theorem (Multivariate)

In higher dimensions ($\mathbb{R}^d$), "sorting" is no longer well-defined.
However, for the quadratic cost $c(x,y) = \|x-y\|^2$, the concept of "monotonicity" is generalized by the **gradient of a convex function**.

{{< theorem "Brenier's Theorem" >}}
If $c(x,y) = \|x-y\|^2$ and $\alpha$ is absolutely continuous w.r.t. Lebesgue measure (has a density):
1. There exists a **unique** optimal Monge map $T$.
2. $T$ is the gradient of a convex function $\varphi$:
   $$
   T(x) = \nabla \varphi(x).
   $$
3. The map is determined by the Monge-Ampère equation:
   $$
   \det(\nabla^2 \varphi(x)) \rho_\beta(\nabla \varphi(x)) = \rho_\alpha(x).
   $$

{{< /theorem >}}

{{< example "Multidimensional Uniform" >}}
Let $\alpha$ be uniform on the square $[0,1]^2$ and $\beta$ be uniform on the rectangle $[0,2] \times [0,3]$.
The optimal map is the gradient of the convex potential $\varphi(x_1, x_2) = x_1^2 + \frac{3}{2}x_2^2$:
$$
T(x_1, x_2) = \nabla \varphi(x_1, x_2) = (2x_1, 3x_2).
$$
This map stretches the square independently along each axis to match the target rectangle.
{{< /example >}}

## Exam Preparation

The following questions cover standard computations and existence checks you might face.

{{< question "1. Bernoulli Transport (Existence)" >}}
**Problem:** Let $\alpha \sim \text{Bern}(p)$ and $\beta \sim \text{Bern}(q)$ with $p, q \in (0, 1)$ and $p \neq q$. Does a Monge map $T$ exist?

**Solution:**
No. $\alpha$ has mass $1-p$ at $0$ and $p$ at $1$. $\beta$ has mass $1-q$ at $0$ and $q$ at $1$.
Since $T$ must map atoms to atoms deterministically, $T(1)$ must be either $0$ or $1$.
* If $T(1) = 1$, we transport mass $p$ to $1$, but $\beta$ requires mass $q$. Since $p \neq q$, this violates $T_\# \alpha = \beta$.
* If $T(1) = 0$, we transport mass $p$ to $0$.
Thus, no map exists without splitting mass.
{{< /question >}}

{{< question "2. Atomic Mismatch" >}}
**Problem:** Let $\alpha = \delta_0$ and $\beta = \frac{1}{2}\delta_{-1} + \frac{1}{2}\delta_1$. Compute the Monge map $T$.

**Solution:**
**Impossible.** $\alpha$ consists of a single atom. Any function $T$ maps $0$ to a single value $y = T(0)$. The pushforward measure $T_\# \alpha$ would be $\delta_y$.
However, $\beta$ is supported on two points $\{-1, 1\}$. There is no $y$ such that $\delta_y = 0.5\delta_{-1} + 0.5\delta_1$.
Therefore, the **Monge problem admits no solution**. (Note: The Kantorovich relaxation would split the mass).
{{< /question >}}

{{< question "3. Gaussian W2" >}}
**Problem:** Compute $\mathcal{W}_2^2$ between $\alpha \sim \mathcal{N}(m_\alpha, \Sigma_\alpha)$ and $\beta \sim \mathcal{N}(m_\beta, \Sigma_\beta)$.

**Solution:**
Use the Bures metric formula. The optimal map is affine $T(x) = m_\beta + A(x-m_\alpha)$.
$$
\mathcal{W}_2^2(\alpha, \beta) = \|m_\alpha - m_\beta\|^2 + \mathrm{Tr}\left(\Sigma_\alpha + \Sigma_\beta - 2(\Sigma_\alpha^{1/2} \Sigma_\beta \Sigma_\alpha^{1/2})^{1/2}\right).
$$
If the matrices commute (e.g., are diagonal), the trace term simplifies to $\|\Sigma_\alpha^{1/2} - \Sigma_\beta^{1/2}\|_F^2$.
{{< /question >}}

### Summary Table of Optimal Maps

| Source $\alpha$ | Target $\beta$ | Optimal Map $T(x)$ | Condition |
| :--- | :--- | :--- | :--- |
| **Uniform** $\mathcal{U}[a,b]$ | **Uniform** $\mathcal{U}[c,d]$ | $T(x) = \frac{d-c}{b-a}(x-a) + c$ | 1D Affine Scaling |
| **Gaussian** $\mathcal{N}(m_1, \Sigma_1)$ | **Gaussian** $\mathcal{N}(m_2, \Sigma_2)$ | $T(x) = m_2 + A(x-m_1)$ | $A = \Sigma_1^{-1/2}(\Sigma_1^{1/2}\Sigma_2\Sigma_1^{1/2})^{1/2}\Sigma_1^{-1/2}$ |
| **Discrete** uniform $\{x_i\}$ | **Discrete** uniform $\{y_i\}$ | $T(x_{(i)}) = y_{(i)}$ | 1D, sorted indices |
| **One Atom** $\delta_{x}$ | **Two Atoms** $w_1 \delta_{y_1} + w_2 \delta_{y_2}$ | **Does Not Exist** | Mass splitting required |
| **Bernoulli** $(p)$ | **Bernoulli** $(q)$ | **Exists iff** $p=q$ | Discrete weight mismatch |

## Exercises

1. *(Warm-up (discrete assignment)).* Let $n = 3$ and
$$
C = \begin{pmatrix}
2 & 1 & 3 \\
3 & 2 & 2 \\
4 & 3 & 1
\end{pmatrix}.
$$
Identify every optimal assignment.

{{< spoiler "Solution" >}}
Every assignment has a cost of the form
$$
\sum_i C_{i, \sigma(i)},
$$
where $\sigma$ is a permutation of the indices.
If we let $\sigma = (1, 2, 3)$, we get a minimal cost of $5$.
We can get this same cost with $\sigma = (2, 1, 3)$.
{{< /spoiler >}}

2. *(Two points to two points: when does each permutation win?).* Fix $x_1, y_1, y_2 \in \mathbb{R}^d$ and let $x_2 = z \in \mathbb{R}^d$ vary. With quadratic cost $c(x, y) = \|x - y\|^2$, compare the two assignments
$$
\text{Id}: x_1 \mapsto y_1, \ z \mapsto y_2 \quad \text{vs} \quad \text{Swap}: x_1 \mapsto y_2, \ z \mapsto y_1.
$$
Show that the set of $z$ where Id is better than Swap is a half-space bounded by a hyperplane orthogonal to $y_1 - y_2$. Give the equation of this hyperplane and explain that it divides $\mathbb{R}^d$ into two regions, one for each optimal permutation.

{{< spoiler "Solution" >}}
$\mathrm{Id}$ is better than $\mathrm{Swap}$ when $\mathrm{Id} \leq \mathrm{Swap}$:
$$
\begin{aligned}
\|y_1 - x_1\|^2 + \|y_2 - z \|^2 &\leq \| y_2 - x_1 \|^2 + \|y_1 - z \|^2 \\
-2 \langle x_1, y_1 \rangle - 2 \langle z, y_2 \rangle &\leq - 2\langle x_1, y_2 \rangle - 2\langle z, y_1 \rangle \\
\langle x_1, y_1 \rangle + \langle z, y_2 \rangle &\geq \langle x_1, y_2 \rangle + \langle z, y_1 \rangle \\
\langle z, y_2 - y_1 \rangle &\geq \langle x_1, y_2 - y_1 \rangle \\
(y_1 - y_2)^\top z &\leq (y_1 - y_2)^\top x_1,
\end{aligned}
$$
which is a half-space.
{{< /spoiler >}}

3. *(Discrete $\to$ continuous and continuous $\to$ discrete).*

    **(1)** In 1D let $\alpha = \sum_{i=1}^N a_i \delta_{x_i}$ (finite support) and let $\beta$ be absolutely continuous. Show that there is no measurable map $T$ with $T_\# \alpha = \beta$.

    **(2)** Conversely, let $\alpha$ be absolutely continuous on $\mathbb{R}$ and let $\beta = \sum_{j=1}^M b_j \delta_{y_j}$ with $\sum_j b_j = 1$. Build many maps $T$ with $T_\# \alpha = \beta$.

    **(3)** Let $\alpha = \mathcal{U}[0, 1]$ and let $\beta = \sum_{j=1}^M b_j \delta_{y_j}$ on $\mathbb{R}$ with $b_j > 0$, $\sum_j b_j = 1$, and $y_1 < \dots < y_M$. For $p \ge 1$, compute the $\mathsf{W}_p$-optimal Monge map $T : [0, 1] \to \mathbb{R}$ from $\alpha$ to $\beta$.

    **(4)** Suppose $b_j = 1/n$ for $j = 1, \dots, n$ and $y_j = \frac{j - 1/2}{n}$ (midpoints of the $n$ equal subintervals of $[0, 1]$). Compute $\mathsf{W}_2^2(\alpha, \beta)$.

{{< spoiler "Solution" >}}
**(1)** We know that for any $T$,
$$
T_\# \alpha = \sum_{i = 1}^N a_i \delta_{T(x_i)}.
$$
Since $N$ is finite and $\beta$ is continuous, there is not way $T$ can push $\alpha$ to $\beta$.
As an concrete example, if $\beta = T_\# \alpha$, then for any set $A$, we would have $T_\# \alpha(A) = \beta(A)$, which is not true.
Take $A = \{ T(x_1) \}$. Then, $\beta(A) = 0 \neq a_1 = T_\# \alpha(A)$, which is a contradiction.

**(2)** Consider any partition of $\mathbb{R}$ into $M$ sets: $S_1, \dots, S_M$ such that for each $S_i$, there exists $b_j = \alpha(S_i)$.
Then, simply assign $S_i$ to $y_j$. Thus, $T_\#\alpha = \beta$.

**(3)** The optimal map in $1$ dimension is always $T = \mathcal{C}_\beta^{-1} \circ \mathcal{C}_\alpha$. Here, $\mathcal{C}_\alpha = \mathrm{Id}$ because $\alpha = \mathcal{U}[0, 1]$.
Also, $\mathcal{C}_\beta (y) = \sum_{j=1}^M b_j \mathbb{1}_{y_j \leq y}$. This implies $\mathcal{C}_\beta^{-1} (x) = \inf\{y_j \mid \sum_{j = 1}^N b_j \geq x \}$.
Thus, $T(x) = \inf\{y_j \mid \sum_{j = 1}^N b_j \geq x \}$.

Alternatively, we can partition the interval $[0, 1]$ into $M$ subintervals $[0, b_1), [b_1, b_1 + b_2), \dots, [b_1 + \dots b_{M - 1}, 1]$. Then, we map each interval $I_j$ to $y_j$ respectively.

**(4)** We can think of the cost as $n$ times the following integral.
$$
\begin{aligned}
\int_0^{\frac{1}{n}} \left(x - \frac{1}{2n}\right)^2 \, \d x &= \frac{1}{12 n^3} \\
\implies \W_2^2 (\alpha, \beta) &= \frac{1}{12 n^2} \implies \W_2 (\alpha, \beta) = \frac{1}{12 n}.
\end{aligned}
$$
{{< /spoiler >}}

4. *(Uniform laws on intervals, quadratic cost).* Let $\alpha = \mathcal{U}_{[a, b]}$ and $\beta = \mathcal{U}_{[c, d]}$ on $\mathbb{R}$ with $a < b$, $c < d$, and $c(x, y) = |x - y|^2$.

    **(i)** Find the Monge optimal transport map $T$.

    **(ii)** Compute $\mathsf{W}_2^2(\alpha, \beta)$ in closed form.

{{< spoiler "Solution" >}}
**(i)** Since we are in $1$ dimension, $T = \mathcal{C}_\beta^{-1} \circ \mathcal{C}_\alpha$.
Here, we have $\mathcal{C}_\alpha (x) = \frac{x - a}{b - a} \mathbb{1}_{a \leq x \leq b}$ and $\mathcal{C}_\beta^{-1}(y) = c + y (d - c)$.
Thus, $T(x) = c + \frac{x - a}{b - a} (d - c)$.
Notice, however, that
$$
T(x) = c + \underbrace{\frac{d - c}{2} - \frac{d - c}{2}}_0 + \frac{d - c}{b - a} (x - a) = \frac{c + d}{2} + \frac{d - c}{b - a} \left(x - \frac{a + b}{2}\right).
$$
If we call $s = \frac{d - c}{b - a}$, then $T(x) = \mu_\beta + s (x - \mu_\alpha)$.

**(ii)**
$$
\begin{aligned}
\W_2^2 (\alpha, \beta) &= \int \| x - T(x) \|^2 \, \d \alpha \\
&= \int ( x - \mu_\beta - s (x - \mu_\alpha) )^2 \, \d \alpha \\
&= \int [(\mu_\alpha - \mu_\beta) + (1 - s) (x - \mu_\alpha)]^2 \, \d \alpha \\
&= \E_\alpha [((\mu_\alpha - \mu_\beta) + (1 - s) (X - \mu_\alpha))^2] \\
&= (\mu_\alpha - \mu_\beta)^2 + (1 - s)^2 \Var_\alpha(X) - 2 (\mu_\alpha - \mu_\beta) (1 - s) \underbrace{\E_\alpha [X - \mu_\alpha]}_0 \\
&= (\mu_\alpha - \mu_\beta)^2 + \left(\frac{(b - a) - (d - c)}{b - a}\right)^2 \frac{(b - a)^2}{12} \\
&= (\mu_\alpha - \mu_\beta)^2 + \frac{(\ell_\alpha - \ell_\beta)^2}{12}.
\end{aligned}
$$
{{< /spoiler >}}

5. *(Many Monge solutions for $|x - y|$).* Let $\alpha = \mathcal{U}_{[0, 2]}$, $\beta = \mathcal{U}_{[1, 3]}$ and $c(x, y) = |x - y|$.

    **(i)** Show $T_1(x) = x + 1$ is optimal and $\mathsf{W}_1(\alpha, \beta) = 1$.

    **(ii)** Show
    $$
    T_2(x) = \begin{cases} x + 2, & x \in [0, 1], \\ x, & x \in (1, 2], \end{cases}
    $$
    is also optimal.

    **(iii)** Build a family of additional Monge solutions.

{{< spoiler "Solution" >}}
**(i)** Since $\alpha$ is defined in $[0, 2]$ and $\beta$, in $[1, 3]$, it is clear that $T_\# \alpha = \beta$.
Also, since $T$ is monotonically increasing and we are in $1$ dimension, $T$ is optimal.
Lastly,
$$
\W_1 (\alpha, \beta) = \E_\alpha [|X - T(X)|] = \E_\alpha [| X - X - 1| ] = \E_\alpha [1] = 1.
$$

**(ii)**
$$
\W_1^{(2)} (\alpha, \beta) = \int_0^1 \frac{1}{2} |x - x - 2| \, \d x + \int_1^2 \frac{1}{2} |x - x| \, \d x = 1 + 0 = 1.
$$

**(iii)**
Looking at the following figure, the solution is clear.
{{< tikz "figures/ex5" >}}

Thus, for $a \in [0, 1]$, define
$$
T_a (x) = \left\{
\begin{aligned}
&x + 3 - a, && x \in [0, a] \\
&x + 2 - a, && x \in (a, 1] \\
&x, && x \in (1, 2]
\end{aligned}
\right.
$$
One can verify that for all $T_a$, we have $\W_1 (\alpha, \beta) = 1$.

{{< /spoiler >}}

6. *(Affine images).*

    **(1) 1-D case.** Let $\nu = (x \mapsto ax + b)_\# \mu$ with $a > 0$. What is the Monge map from $\mu$ to $\nu$ for the quadratic cost? Compute the $W_2$ distance in terms of the mean $m_\mu = \int x \, d\mu$ and variance $\mathrm{Var}(\mu) = \int (x - m_\mu)^2 \, d\mu$.

    **(2) Higher dimension.** Let $\nu = (x \mapsto Ax + b)_\# \mu$ with $A \in \mathbb{R}^{d \times d}$. Give a simple condition on $A$ ensuring that $T(x) = Ax + b$ is the Brenier map (assume $\mu$ is absolutely continuous). Under this condition, compute the $W_2$ distance in terms of $m_\mu = \mathbb{E}[X]$ and the covariance $\Sigma_\mu = \mathbb{E}[(X - m_\mu)(X - m_\mu)^\top]$.

{{< spoiler "Solution" >}}
**(1)** Because we are in 1-D, $T(x) = ax + b$. Let us compute $\W_2^2$.
$$
\begin{aligned}
\W_2^2 &= \int (x - ax - b)^2 \, \d \mu \\
&= \E_\mu [((1 - a) x - b)^2] \\
&= \E_\mu [((1 - a) (x - m_\mu) - b + (1 - a) m_\mu)^2] \\
&= (1 - a)^2 \Var(\mu) + [(1 - a) m_\mu - b]^2.
\end{aligned}
$$

**(2)** By Brenier, $T = \nabla \varphi$, where $\varphi$ is a convex function. Then, a simple condition on $A$ is $A = \nabla^2 \varphi \succeq 0$.
$$
\begin{aligned}
\W_2^2 &= \E_\mu [\|X - AX - b\|^2] \\
&= \E_\mu [\|(\mathrm{Id} - A) (X - m_\mu) - b + (\mathrm{Id} - A) m_\mu\|^2] \\
&= \Tr[(\mathrm{Id} - A)^\top \Sigma_\mu (\mathrm{Id} - A)] + \| (\mathrm{Id} - A) m_\mu - b \|^2.
\end{aligned}
$$
{{< /spoiler >}}

7. *(Piecewise constant densities on $[0, 1)$, quadratic cost).* Let $\alpha$ have density $f = 1$ on $[0, \frac{1}{2})$ and $f = 2$ on $[\frac{1}{2}, 1]$, while $\beta$ has density $g = 2$ on $[0, \frac{1}{2})$ and $g = 1$ on $[\frac{1}{2}, 1]$. Construct (and sketch) the optimal Monge map on $\mathbb{R}$ for the quadratic cost and compute the exact cost (for the corresponding probability measures obtained by normalising by the common mass $3/2$).

{{< spoiler "Solution" >}}
First, we normalize the density functions.
$$
\mu(x) = \frac{2}{3} f(x) = \begin{cases} \frac{2}{3} & x \in [0, 1/2) \\ \frac{4}{3} & x \in [1/2, 1] \end{cases}, \qquad \nu(y) = \frac{2}{3} g(y) = \begin{cases} \frac{4}{3} & y \in [0, 1/2) \\ \frac{2}{3} & y \in [1/2, 1] \end{cases}.
$$
Because we are in $\R$, the optimal map is $T(x) = G^{-1}(F(x))$.
$$
\begin{aligned}
F(x) &= \begin{cases}
\frac{2}{3}x & x \in \left[ 0, \frac{1}{2} \right] \\
\frac{4}{3}x - \frac{1}{3} & x \in \left[\frac{1}{2}, 1\right]
\end{cases} \\
G(y) &= \begin{cases}
\frac{4}{3}y & y \in \left[ 0, \frac{1}{2} \right] \\
\frac{2}{3}y + \frac{1}{3} & y \in \left[\frac{1}{2}, 1\right]
\end{cases} \implies
G^{-1}(z) = \begin{cases}
\frac{3}{4}z & z \in \left[0, \frac{2}{3}\right] \\
\frac{3}{2}z - \frac{1}{2} & z \in \left[\frac{2}{3}, 1\right]
\end{cases}.
\end{aligned}
$$
Thus, we have
$$
T(x) = \begin{cases}
\frac{x}{2} & x \leq \frac{1}{2} \\
x - \frac{1}{4} & \frac{1}{2} < x \leq \frac{3}{4} \\
2x - 1 & \frac{3}{4} < x \leq 1
\end{cases}.
$$
Now, to compute the quadratic cost, we simply evaluate the integrals.
$$
\begin{aligned}
\int_0^\frac{1}{2} \left(x - \frac{x}{2}\right)^2 \, \d \mu &= \frac{1}{144} \\
\int_\frac{1}{2}^\frac{3}{4} \left(x - x + \frac{1}{4}\right)^2 \, \d \mu &= \frac{1}{48} \\
\int_\frac{3}{4}^1 \left(x - 2x + 1\right)^2 \, \d \mu &= \frac{1}{144}
\end{aligned}
$$
So, $\W_2^2 (\alpha, \beta) = \frac{1}{144} + \frac{1}{48} + \frac{1}{144} = \frac{5}{144}$.
{{< /spoiler >}}

8. *(Radial symmetry).* Let $\alpha, \beta$ be *radial* probability measures on $\mathbb{R}^d$ (i.e. invariant under all orthogonal maps $Q$: $Q_\# \alpha = \alpha$, $Q_\# \beta = \beta$). For any probability measure $\mu$ on $\mathbb{R}^d$, define its *radial cumulative distribution function* by
$$F_\mu(r) := \mu(B(0, r)) = \mathbb{P}_{X \sim \mu}(\|X\| \le r), \qquad r \ge 0.$$
One can show that if $\mu$ is invariant under rotation, then its density $f$ has a radial density satisfies $f(x) = h(\|x\|)$ w.r.t. Lebesgue. Assume in addition that $\alpha$ is absolutely continuous w.r.t. Lebesgue. Consider the quadratic cost $c(x, y) = \|x - y\|^2$.

    **(i)** Show that the Brenier (Monge) optimizer $T$ pushing $\alpha$ to $\beta$ is *radial*, i.e.
    $$T(x) = t(\|x\|) \frac{x}{\|x\|} \quad \text{for } x \ne 0, \qquad T(0) = 0,$$
    for some nondecreasing and non-negative function $t : [0, \infty) \to [0, \infty)$. You will first show that $T$ commutes with rotation, $Q \circ T \circ Q = T$ for any rotation $Q$.

    **(ii)** Prove that $t$ is characterised by mass conservation in radius:
    $$F_\alpha(r) = F_\beta(t(r)) \qquad \text{for all } r \ge 0,$$
    and hence $t(r) = F_\beta^{-1}(F_\alpha(r))$ (generalised inverse).

    **(iii)** If $\alpha = \mathcal{U}(B(0, R_\alpha))$ and $\beta = \mathcal{U}(B(0, R_\beta))$, instantiate the previous formula. Could you have guessed this formula directly?

{{< spoiler "Solution" >}}
**(i)** Let $Q$ be an arbitrary rotation matrix (orthogonal with $\det(Q)=1$). Since $\alpha$ and $\beta$ are radial measures, they are invariant under rotation: $Q_\# \alpha = \alpha$ and $Q_\# \beta = \beta$.

Let $T$ be the optimal Monge map transporting $\alpha$ to $\beta$ for the quadratic cost. According to Brenier's Theorem, $T = \nabla \psi$ for a convex potential $\psi$, and this map is unique almost everywhere.

Consider the rotated map $\tilde{T}(x) = Q^{-1} \circ T \circ Q(x) = Q^T T(Qx)$. We verify that $\tilde{T}$ transports $\alpha$ to $\beta$:
$$\tilde{T}_\# \alpha = (Q^{-1} \circ T \circ Q)_\# \alpha = (Q^{-1})_\# (T_\# (Q_\# \alpha)) = (Q^{-1})_\# (T_\# \alpha) = (Q^{-1})_\# \beta = \beta.$$
Next, we check if $\tilde{T}$ is a gradient of a convex function. Define $\tilde{\psi}(x) = \psi(Qx)$. Since $\psi$ is convex and $Q$ is linear, $\tilde{\psi}$ is convex. Its gradient is:
$$\nabla \tilde{\psi}(x) = Q^T \nabla \psi(Qx) = Q^{-1} T(Qx) = \tilde{T}(x).$$
By the uniqueness of the Brenier map, we must have $\tilde{T} = T$. Therefore, $Q^{-1} T(Qx) = T(x)$, or $T(Qx) = Q T(x)$.
Since $T$ commutes with all rotations, it must map radial lines to radial lines. Thus, $T$ is of the form:
$$T(x) = t(\|x\|) \frac{x}{\|x\|}.$$
Since $T = \nabla \psi$ where $\psi(x) = h(\|x\|)$ is a radial convex function, we have $T(x) = h'(\|x\|) \frac{x}{\|x\|}$, so $t(r) = h'(r)$. For $\psi$ to be convex, $h$ must be convex and non-decreasing, implying $t(r)$ is non-negative and non-decreasing (specifically, the eigenvalues of $\nabla^2 \psi$ are $t'(r)$ and $t(r)/r$, which must be non-negative).

**(ii)** We use the mass conservation property $T_\# \alpha = \beta$. By definition, for any $r \ge 0$:
$$F_\beta(t(r)) = \beta(B(0, t(r))).$$
Using the pushforward condition $\beta(A) = \alpha(T^{-1}(A))$:
$$F_\beta(t(r)) = \alpha\left( \{ x \in \mathbb{R}^d : \|T(x)\| \le t(r) \} \right).$$
Substituting the form of the map, $\|T(x)\| = \left\| t(\|x\|) \frac{x}{\|x\|} \right\| = t(\|x\|)$:
$$F_\beta(t(r)) = \alpha\left( \{ x \in \mathbb{R}^d : t(\|x\|) \le t(r) \} \right).$$
Since $t$ is non-decreasing, the inequality $t(\|x\|) \le t(r)$ is equivalent to $\|x\| \le r$:
$$F_\beta(t(r)) = \alpha\left( \{ x \in \mathbb{R}^d : \|x\| \le r \} \right) = \alpha(B(0, r)).$$
Thus, we arrive at the characterization:
$$F_\alpha(r) = F_\beta(t(r)).$$
Inverting $F_\beta$, we get $t(r) = F_\beta^{-1}(F_\alpha(r))$.

**(iii)** For a uniform distribution $\mu$ on a ball $B(0, R)$ in $\mathbb{R}^d$, the density is constant. The mass contained in a ball of radius $r \le R$ is proportional to the volume ratio:
$$F_\mu(r) = \frac{\text{Vol}(B(0, r))}{\text{Vol}(B(0, R))} = \frac{C_d r^d}{C_d R^d} = \left( \frac{r}{R} \right)^d.$$
Applying this to $\alpha = \mathcal{U}(B(0, R_\alpha))$ and $\beta = \mathcal{U}(B(0, R_\beta))$:
$$F_\alpha(r) = \left( \frac{r}{R_\alpha} \right)^d, \quad F_\beta(r) = \left( \frac{r}{R_\beta} \right)^d.$$
Using the formula $F_\beta(t(r)) = F_\alpha(r)$ derived in (ii):
$$\left( \frac{t(r)}{R_\beta} \right)^d = \left( \frac{r}{R_\alpha} \right)^d.$$
Taking the $d$-th root yields:
$$\frac{t(r)}{R_\beta} = \frac{r}{R_\alpha} \implies t(r) = \frac{R_\beta}{R_\alpha} r.$$
The optimal transport map is a simple linear scaling:
$$T(x) = \frac{R_\beta}{R_\alpha} x.$$
*Guessing directly:* Yes, one could have guessed this formula. Since both distributions are uniform on balls centered at the origin, the problem is self-similar. The most natural "economical" map to transport one ball to another while preserving the uniform density structure is a scaling centered at the origin.
{{< /spoiler >}}

9. *(Translation decomposition for $\mathsf{W}_2$).* Let $\alpha, \beta \in \mathcal{P}_2(\mathbb{R}^d)$ (finite second moments). For $u \in \mathbb{R}^d$ write $T_u(x) = x + u$.

    **(a)** Show there exist unique vectors $a, b$ such that the *centred* measures
    $$\alpha_0 := (T_{-a})_\# \alpha, \qquad \beta_0 := (T_{-b})_\# \beta$$
    satisfy $\int x \, d\alpha_0(x) = \int x \, d\beta_0(x) = 0$, and
    $$\alpha = (T_a)_\# \alpha_0, \qquad \beta = (T_b)_\# \beta_0.$$

    **(b)** Prove the decomposition
    $$\mathsf{W}_2^2(\alpha, \beta) = \|a - b\|^2 + \mathsf{W}_2^2(\alpha_0, \beta_0).$$

    **(c)** If $\alpha$ is absolutely continuous and $T_0$ is the Brenier map from $\alpha_0$ to $\beta_0$, show that
    $$T(x) := T_0(x - a) + b$$
    is the Brenier map from $\alpha$ to $\beta$.

{{< spoiler "Solution" >}}
**(a)**
Let $a = \int_{\mathbb{R}^d} x \, d\alpha(x)$ and $b = \int_{\mathbb{R}^d} x \, d\beta(x)$ be the barycenters (means) of $\alpha$ and $\beta$.
Define the centered measures by the pushforwards of the inverse translations:
$$\alpha_0 := (T_{-a})_\# \alpha, \qquad \beta_0 := (T_{-b})_\# \beta.$$
We verify the mean of $\alpha_0$:
$$\int x \, d\alpha_0(x) = \int T_{-a}(y) \, d\alpha(y) = \int (y - a) \, d\alpha(y) = a - a = 0.$$
Similarly, $\int x \, d\beta_0(x) = 0$.
The original measures are recovered by translating back: $\alpha = (T_a)_\# \alpha_0$ and $\beta = (T_b)_\# \beta_0$. The vectors $a, b$ are unique as means are unique.

**(b)**
$$
\begin{aligned}
\W_2^2 (\alpha, \beta) &= \inf \E_{\substack{X \sim \alpha \\ Y \sim \beta}} [\| X - Y \|^2] \\
&= \inf \E_{\substack{X \sim \alpha_0 \\ Y \sim \beta_0}} [\| (X + a) - (Y + b) \|^2] \\
&= \inf \E_{\substack{X \sim \alpha_0 \\ Y \sim \beta_0}} [\| (X - Y) - (b - a) \|^2] \\
&= \| b - a \|^2 + \inf \E_{\substack{X \sim \alpha_0 \\ Y \sim \beta_0}} [\| X - Y \|^2] - 2 \left( \langle b - a, \underbrace{\E_{\alpha_0} [X]}_0 \rangle - \langle b - a, \underbrace{\E_{\beta_0} [Y]}_0 \rangle \right) \\
&= \| b - a \|^2 + \W_2^2 (\alpha_0, \beta_0).
\end{aligned}
$$

**(c)**
Let $T_0 = \nabla \psi_0$ be the Brenier map from $\alpha_0$ to $\beta_0$, where $\psi_0$ is convex.
Define $T(x) := T_0(x - a) + b$.
First, we check the pushforward condition. If $X \sim \alpha$, then $X - a \sim \alpha_0$. Thus $T_0(X - a) \sim \beta_0$, and shifting by $b$ gives $T_0(X - a) + b \sim \beta$. So $T_\# \alpha = \beta$.
Second, we check the optimality condition (that $T$ is a gradient of a convex function).
$$T(x) = \nabla \psi_0(x - a) + b = \nabla_x \left( \psi_0(x - a) + b \cdot x \right).$$
The function $\psi(x) = \psi_0(x - a) + b \cdot x$ is convex because it is the composition of a convex function with a translation, plus a linear term.
Since $T$ is the gradient of a convex potential and pushes $\alpha$ to $\beta$, it is the unique Brenier map.
{{< /spoiler >}}

10. *(Adding separable terms; quadratic cost vs. $-\langle x, y \rangle$).* Fix probability measures $\alpha, \beta$ on $\mathbb{R}^d$ and consider Monge maps $T$ with $T_\# \alpha = \beta$.

    **(a)** Let $c : \mathbb{R}^d \times \mathbb{R}^d \to \mathbb{R}$ be a measurable cost and define $\tilde{c}(x, y) = c(x, y) + u(x) + v(y)$, with $u : \mathbb{R}^d \to \mathbb{R}, v : \mathbb{R}^d \to \mathbb{R}$. Show that the sets of Monge minimizers for $c$ and for $\tilde{c}$ (with the same marginals) coincide.

    **(b)** Let $\lambda > 0$ and define $\hat{c}(x, y) = \lambda c(x, y)$. Show that the Monge minimizers for $c$ and $\hat{c}$ coincide.

    **(c)** Take $c_{\text{quad}}(x, y) = \|x - y\|^2$, $c_{\text{lin}}(x, y) = -\langle x, y \rangle$. Prove that $c_{\text{quad}}$ and $c_{\text{lin}}$ have the same Monge minimizers (for fixed $\alpha, \beta$).

{{< spoiler "Solution" >}}
**(a)**
Let $T$ be any transport map such that $T_\# \alpha = \beta$. The total cost associated with $\tilde{c}$ is:
$$\mathcal{C}_{\tilde{c}}(T) = \int \tilde{c}(x, T(x)) \, d\alpha(x) = \int \left( c(x, T(x)) + u(x) + v(T(x)) \right) \, d\alpha(x).$$
By linearity of the integral:
$$\mathcal{C}_{\tilde{c}}(T) = \int c(x, T(x)) \, d\alpha(x) + \int u(x) \, d\alpha(x) + \int v(T(x)) \, d\alpha(x).$$
The term $\int u(x) \, d\alpha(x)$ depends only on the source measure $\alpha$, which is fixed.
The term $\int v(T(x)) \, d\alpha(x)$ can be rewritten using the change of variables formula (since $T_\# \alpha = \beta$) as $\int v(y) \, d\beta(y)$, which depends only on the target measure $\beta$, which is also fixed.
Thus,
$$\mathcal{C}_{\tilde{c}}(T) = \mathcal{C}_{c}(T) + \text{const}.$$
Minimizing $\mathcal{C}_{\tilde{c}}(T)$ is equivalent to minimizing $\mathcal{C}_{c}(T)$, so the sets of minimizers coincide.

**(b)**
The cost for $\hat{c}$ is:
$$\mathcal{C}_{\hat{c}}(T) = \int \lambda c(x, T(x)) \, d\alpha(x) = \lambda \int c(x, T(x)) \, d\alpha(x) = \lambda \, \mathcal{C}_{c}(T).$$
Since $\lambda > 0$, the inequality $\mathcal{C}_{c}(T_1) \le \mathcal{C}_{c}(T_2)$ holds if and only if $\lambda \mathcal{C}_{c}(T_1) \le \lambda \mathcal{C}_{c}(T_2)$. Therefore, the minimizers are identical.

**(c)**
Expand the quadratic cost:
$$c_{\text{quad}}(x, y) = \|x - y\|^2 = \|x\|^2 + \|y\|^2 - 2\langle x, y \rangle.$$
Let $u(x) = \|x\|^2$ and $v(y) = \|y\|^2$. Then:
$$c_{\text{quad}}(x, y) = -2\langle x, y \rangle + u(x) + v(y).$$
Using result **(a)**, the minimizers for $c_{\text{quad}}$ are the same as the minimizers for $-2\langle x, y \rangle$.
Using result **(b)** with $\lambda = 2$ (or effectively removing the factor 2), minimizing $-2\langle x, y \rangle$ is equivalent to minimizing $-\langle x, y \rangle = c_{\text{lin}}(x, y)$.
Thus, maximizing correlation (minimizing negative inner product) yields the same transport map as minimizing the squared Euclidean distance.
{{< /spoiler >}}

11. *(Quantile coupling: explicit computation).* Let $\mu = \mathcal{U}[0, 1]$ and let $\nu$ be supported on $[0, 1]$ with density $2y$.

    **(a)** Compute the cumulative distribution functions $F_\mu$ and $F_\nu$, and their quantile functions $F_\mu^{-1}$ and $F_\nu^{-1}$.

    **(b)** Using monotone transport in 1D, write the optimal map $T = F_\nu^{-1} \circ F_\mu$.

    **(c)** Compute $W_2^2(\mu, \nu)$; using both $\int_0^1 |x - T(x)|^2 \, dx$ and the 1D quantile formula $W_2^2(\mu, \nu) = \int_0^1 |F_\mu^{-1}(t) - F_\nu^{-1}(t)|^2 \, dt$.

{{< spoiler "Solution" >}}
**(a)**
For $\mu = \mathcal{U}[0, 1]$ (density $f(x)=1$ for $x \in [0,1]$):
$$F_\mu(x) = \int_0^x 1 \, dt = x, \quad x \in [0, 1].$$
The quantile function is $F_\mu^{-1}(t) = t$.

For $\nu$ with density $g(y) = 2y$ for $y \in [0, 1]$:
$$F_\nu(y) = \int_0^y 2t \, dt = y^2, \quad y \in [0, 1].$$
To find the quantile function, set $z = y^2$, which implies $y = \sqrt{z}$. Thus $F_\nu^{-1}(z) = \sqrt{z}$.

**(b)**
In 1D, the optimal Monge map for the quadratic cost is the unique non-decreasing map pushing $\mu$ to $\nu$, given by $T(x) = F_\nu^{-1}(F_\mu(x))$.
$$T(x) = F_\nu^{-1}(x) = \sqrt{x}.$$

**(c)**
**Method 1: Direct integration of the map cost.**
$$W_2^2(\mu, \nu) = \int_0^1 |x - T(x)|^2 f(x) \, dx = \int_0^1 (x - \sqrt{x})^2 \cdot 1 \, dx.$$
Expand the square: $(x - \sqrt{x})^2 = x^2 - 2x^{3/2} + x$.
$$\int_0^1 (x^2 - 2x^{3/2} + x) \, dx = \left[ \frac{x^3}{3} - 2\frac{2}{5}x^{5/2} + \frac{x^2}{2} \right]_0^1$$
$$= \frac{1}{3} - \frac{4}{5} + \frac{1}{2} = \frac{10 - 24 + 15}{30} = \frac{1}{30}.$$

**Method 2: Quantile formula.**
$$W_2^2(\mu, \nu) = \int_0^1 |F_\mu^{-1}(t) - F_\nu^{-1}(t)|^2 \, dt = \int_0^1 |t - \sqrt{t}|^2 \, dt.$$
This results in the exact same integral as above, yielding $1/30$.
{{< /spoiler >}}

12. *(Cumulative functions).* Let $\alpha$ be a probability measure on $\mathbb{R}$ and let its cumulative distribution function be
$$C_\alpha(x) = \alpha((-\infty, x]), \qquad x \in \mathbb{R}.$$
Consider the pushforward by $C_\alpha$, namely $(C_\alpha)_\# \alpha$.

    **(1)** Assume $\alpha$ has a density with respect to the Lebesgue measure (equivalently, $C_\alpha$ is continuous). Prove that
    $$(C_\alpha)_\# \alpha = \mathcal{U}[0, 1].$$
    In your proof, clearly point out *where* the density (continuity) assumption is used.

    **(2)** What happens if $\alpha$ is purely discrete, say $\alpha = \sum_i p_i \delta_{x_i}$ with $\sum_i p_i = 1$ and $x_1 < x_2 < \dots$? Describe the law of $C_\alpha(X)$ for $X \sim \alpha$, and show that for all $t \in [0, 1]$,
    $$\mathbb{P}(C_\alpha(X) \le t) \le t,$$
    with equality at the jump values of $C_\alpha$.

{{< spoiler "Solution" >}}
**(1)**
Let $Y = C_\alpha(X)$ where $X \sim \alpha$. We want to show $Y \sim \mathcal{U}[0, 1]$.
The CDF of $Y$ is $F_Y(y) = \mathbb{P}(Y \le y) = \mathbb{P}(C_\alpha(X) \le y)$.
Since $\alpha$ has a density w.r.t Lebesgue, $C_\alpha$ is a continuous, strictly increasing function on the support of $\alpha$. Therefore, $C_\alpha$ is invertible on its range $[0, 1]$.
$$\mathbb{P}(C_\alpha(X) \le y) = \mathbb{P}(X \le C_\alpha^{-1}(y)) = C_\alpha(C_\alpha^{-1}(y)) = y$$
for any $y \in (0, 1)$.
Since $F_Y(y) = y$, the variable $Y$ follows a uniform distribution on $[0, 1]$.
*Where density is used:* The assumption that $\alpha$ has a density implies $C_\alpha$ is continuous. If $C_\alpha$ had jumps (atoms in $\alpha$), the range of $C_\alpha$ would not be the full interval $[0, 1]$, and the inverse $C_\alpha^{-1}$ would not be strictly defined in the same way (one would use generalized inverses), leading to a non-uniform distribution. Specifically, continuity ensures $\mathbb{P}(C_\alpha(X) = y) = 0$.

**(2)**
Let $\alpha = \sum_i p_i \delta_{x_i}$. The CDF $C_\alpha$ is a right-continuous step function with jumps of height $p_i$ at $x_i$. The value $C_\alpha(x_i) = \sum_{j \le i} p_j$.
The random variable $Y = C_\alpha(X)$ can only take discrete values in the set $S = \{ s_i \mid s_i = \sum_{j \le i} p_j \}$.
Thus, the distribution of $Y$ is discrete, not uniform.
Consider $\mathbb{P}(Y \le t)$. Since $Y$ takes values $s_1 < s_2 < \dots$, let $s_k$ be the largest value in $S$ such that $s_k \le t$.
$$\mathbb{P}(Y \le t) = \mathbb{P}(Y \le s_k) = \mathbb{P}(X \le x_k) = C_\alpha(x_k) = s_k.$$
Since $s_k \le t$, we have $\mathbb{P}(Y \le t) \le t$.
Equality holds if and only if $t \in S$, i.e., at the jump values of the CDF. For $t$ between jump values (e.g., $s_k < t < s_{k+1}$), the probability stays constant at $s_k$, strictly less than $t$.
{{< /spoiler >}}

13. *(Pushforward of a uniform law by a nonlinear map).* Let $\alpha = \mathcal{U}[-1, 1]$ and consider the map $T : \mathbb{R} \to \mathbb{R}, T(x) = x^2$.

    **(1)** Compute the law $\beta = T_\# \alpha$, i.e. find its density with respect to Lebesgue measure.

    **(2)** Check that this density integrates to 1 over its support.

    **(3)** Sketch the graph of the density and comment on its behaviour near 0 and 1.

{{< spoiler "Solution" >}}
**(1)**
Let $X \sim \alpha$ and $Y = T(X) = X^2$. The support of $X$ is $[-1, 1]$, so the support of $Y$ is $[0, 1]$.
We compute the cumulative distribution function (CDF) of $Y$. For $y \in [0, 1]$:
$$F_\beta(y) = \mathbb{P}(Y \le y) = \mathbb{P}(X^2 \le y) = \mathbb{P}(-\sqrt{y} \le X \le \sqrt{y}).$$
Since $X$ has density $1/2$ on $[-1, 1]$:
$$F_\beta(y) = \int_{-\sqrt{y}}^{\sqrt{y}} \frac{1}{2} \, dx = \frac{1}{2} \left( \sqrt{y} - (-\sqrt{y}) \right) = \sqrt{y}.$$
The density $\beta(y)$ is the derivative of the CDF:
$$\beta(y) = \frac{d}{dy} (\sqrt{y}) = \frac{1}{2\sqrt{y}}, \quad \text{for } y \in (0, 1].$$
So, $\beta = \frac{1}{2\sqrt{y}} \mathbb{1}_{(0, 1]}$.

**(2)**
We check the integral over the support $[0, 1]$:
$$\int_0^1 \beta(y) \, dy = \int_0^1 \frac{1}{2} y^{-1/2} \, dy = \frac{1}{2} \left[ \frac{y^{1/2}}{1/2} \right]_0^1 = \left[ \sqrt{y} \right]_0^1 = 1 - 0 = 1.$$
The density is properly normalized.

**(3)**
- Near 0 The density diverges to $+\infty$ as $y \to 0^+$. This reflects the fact that the derivative of the map $T(x)=x^2$ is zero at $x=0$. A "flat" map compresses a lot of mass into a small region of the target space, creating a singularity in the density.
- Near 1: The density is finite and smooth, approaching $\beta(1) = 0.5$.

{{< tikz "figures/ex13" >}}
{{< /spoiler >}}
