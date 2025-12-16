+++
title = "Duality"
date = 2025-10-15
+++

## Summary

In this chapter, we transition from the Primal formulation of Optimal Transport (minimizing cost) to its **Dual formulation** (maximizing profit/potential). Duality provides powerful theoretical tools for proving existence and uniqueness of optimal maps (e.g., Brenier's Theorem) and enables efficient computational algorithms (e.g., semi-discrete OT).
Instead of optimizing over a coupling matrix or map, we optimize over two potential functions, $f$ and $g$, which act as "prices" for transporting mass.

## Discrete Duality

Let $\alpha = \sum a_i \delta_{x_i}$ and $\beta = \sum b_j \delta_{y_j}$ be discrete measures with cost matrix $C_{ij}$. The primal Kantorovich problem is a linear program minimizing $\langle C, P \rangle$.
The dual problem maximizes the sum of potentials subject to a pointwise constraint.

{{< definition "Discrete Dual Problem" >}}
The dual formulation is given by:
$$
L_C(a, b) = \max_{(u, v) \in R(a,b)} \langle u, a \rangle + \langle v, b \rangle
$$
where the set of admissible potentials is:
$$
R(a,b) = \left\{ (u, v) \in \mathbb{R}^n \times \mathbb{R}^m \mid u_i + v_j \le C_{ij} \right\}.
$$

{{< /definition >}}

The constraint $u_i + v_j \le C_{ij}$ implies that the sum of the prices at the source and destination cannot exceed the transport cost.

{{< theorem "Strong Duality" >}}
For linear programming in OT, strong duality holds:
$$
\min_{P \in U(a,b)} \langle C, P \rangle = \max_{u \oplus v \le C} \langle u, a \rangle + \langle v, b \rangle.
$$
Furthermore, by complementary slackness, the optimal plan $P^*$ and optimal potentials $(u^*, v^*)$ satisfy:
$$
P^*_{ij} > 0 \implies u^*_i + v^*_j = C_{ij}.
$$

{{< /theorem >}}

## The $c$-Transform

To solve the dual problem efficiently, we observe that for a fixed potential $f$, the optimal $g$ is fully determined. We want $g(y)$ to be as large as possible without violating the constraint $f(x) + g(y) \le c(x,y)$. This leads to the notion of the **$c$-transform**.

{{< definition "c-Transform" >}}
Given a function $f: \mathcal{X} \to \mathbb{R}$, its $c$-transform $f^c: \mathcal{Y} \to \mathbb{R}$ is defined as:
$$
f^c(y) = \inf_{x \in \mathcal{X}} \left( c(x, y) - f(x) \right).
$$
Similarly, for $g: \mathcal{Y} \to \mathbb{R}$, its $\bar{c}$-transform is $g^{\bar{c}}(x) = \inf_{y \in \mathcal{Y}} \left( c(x, y) - g(y) \right)$.

{{< /definition >}}

{{< tip "Properties" >}}
1.  **Improvement:** Replacing a pair $(f, g)$ with $(f, f^c)$ always improves the dual objective while maintaining feasibility.
2.  **Regularity:** If the cost $c(x, \cdot)$ is $L$-Lipschitz, then the $c$-transform $f^c$ is also $L$-Lipschitz. This regularity is crucial for existence proofs in continuous settings.
3.  **Concavity:** Functions of the form $f^c$ are called **$c$-concave**. In the Euclidean quadratic case, this relates to standard concavity via the Legendre transform.
{{< /tip >}}

## General Continuous Duality

For arbitrary probability measures $\alpha$ and $\beta$, the duality extends using continuous functions.

{{< theorem "Kantorovich Duality" >}}
$$
\mathcal{L}_c(\alpha, \beta) = \sup_{(f, g) \in \mathcal{R}(c)} \int_{\mathcal{X}} f(x) \mathrm{d}\alpha(x) + \int_{\mathcal{Y}} g(y) \mathrm{d}\beta(y)
$$
where $\mathcal{R}(c) = \{ (f, g) \in \mathcal{C}(\mathcal{X}) \times \mathcal{C}(\mathcal{Y}) \mid f(x) + g(y) \le c(x, y) \}$.
Using the $c$-transform, this can be simplified to a maximization over a single $c$-concave potential:
$$
\mathcal{L}_c(\alpha, \beta) = \sup_{f} \int_{\mathcal{X}} f \mathrm{d}\alpha + \int_{\mathcal{Y}} f^c \mathrm{d}\beta.
$$

{{< /theorem >}}

### Euclidean Case ($W_2$)
When $c(x,y) = \frac{1}{2}\|x-y\|^2$, the duality is closely related to convex analysis.
The condition $f(x) + g(y) \le \frac{1}{2}\|x-y\|^2$ leads to the optimal map being the gradient of a convex function (Brenier's Theorem).
Specifically, if we define $\varphi(x) = \frac{1}{2}\|x\|^2 - f(x)$, then $\varphi$ is convex, and the optimal map is $T(x) = \nabla \varphi(x)$.

### Wasserstein-1 Distance ($W_1$)
When the cost is a metric $c(x,y) = d(x,y)$, the structure simplifies significantly.
The $c$-transform condition $g(y) \le d(x,y) - f(x)$ implies that $f$ must be **1-Lipschitz**.

{{< theorem "Kantorovich-Rubinstein" >}}
For $c(x,y) = d(x,y)$, the dual formulation becomes a maximization over 1-Lipschitz functions:
$$
W_1(\alpha, \beta) = \sup_{f: \text{Lip}(f) \le 1} \int_{\mathcal{X}} f(x) \mathrm{d}(\alpha - \beta)(x).
$$
This shows that $W_1$ is a norm (the dual of the Lipschitz norm).

{{< /theorem >}}

## Semi-Discrete Optimal Transport

A practically important case is **Semi-Discrete OT**, where $\alpha$ is a continuous density and $\beta = \sum_{j=1}^m b_j \delta_{y_j}$ is discrete.
The dual problem becomes finite-dimensional optimization over the vector $g \in \mathbb{R}^m$.

{{< definition "Laguerre Cells" >}}
For a dual vector $g$, the space $\mathcal{X}$ is partitioned into **Laguerre Cells** (weighted Voronoi regions):
$$
\mathbb{L}_j(g) = \{ x \in \mathcal{X} \mid c(x, y_j) - g_j \le c(x, y_k) - g_k, \forall k \}.
$$
The optimal transport map $T$ maps the entire cell $\mathbb{L}_j(g)$ to the point $y_j$.

{{< /definition >}}

The dual energy to maximize is:
$$
\mathcal{E}(g) = \sum_{j=1}^m \int_{\mathbb{L}_j(g)} (c(x, y_j) - g_j) \mathrm{d}\alpha(x) + \sum_{j=1}^m g_j b_j.
$$
This function is concave and smooth (if $\alpha$ has a density). Its gradient is simply the mass mismatch: $\nabla \mathcal{E}(g)_j = b_j - \alpha(\mathbb{L}_j(g))$.

## Exam Preparation

{{< question "1. Support of Optimal Plan" >}}
**Problem:** Let $\pi^*$ be an optimal coupling for the Kantorovich problem with continuous cost $c$. Let $(f, g)$ be optimal dual potentials. What is the relation between the support of $\pi^*$ and the potentials?

**Solution:**
The support of $\pi^*$ is contained in the set where the dual constraint is active. That is:
$$
\text{supp}(\pi^*) \subseteq \{ (x, y) \in \mathcal{X} \times \mathcal{Y} \mid f(x) + g(y) = c(x, y) \}.
$$
Everywhere else (where $f(x) + g(y) < c(x,y)$), the transport mass $\pi^*(x,y)$ must be zero.

{{< /question >}}

{{< question "2. W1 and Lipschitz Functions" >}}
**Problem:** Prove that if $c(x,y) = d(x,y)$ (a metric), then any function $f$ satisfying $f^c = -f$ must be 1-Lipschitz.

**Solution:**
The condition $f^c = -f$ implies that $f$ is $c$-concave.
If $f(y) = \inf_x d(x,y) - f(x)$ (which is $-f^c(y)$), we have:
$$
f(x) - f(y) \le d(x,y)
$$
for all $x,y$. Swapping $x$ and $y$ gives $f(y) - f(x) \le d(y,x)$.
Since $d$ is symmetric, $|f(x) - f(y)| \le d(x,y)$, which is the definition of a 1-Lipschitz function.

{{< /question >}}

{{< question "3. Semi-Discrete Gradient" >}}
**Problem:** In the semi-discrete setting where we maximize $\mathcal{E}(g) = \int g^{\bar{c}} d\alpha + \langle g, b \rangle$, derive the gradient with respect to $g_j$.

**Solution:**
The function $g^{\bar{c}}(x) = \min_k (c(x, y_k) - g_k)$ is the lower envelope of affine functions in $g$.
The derivative of the minimum is the derivative of the active term. The term $k=j$ is active exactly when $x$ is in the Laguerre cell $\mathbb{L}_j(g)$.
Thus:
$$
\frac{\partial}{\partial g_j} \int_{\mathcal{X}} g^{\bar{c}}(x) d\alpha(x) = \int_{\mathbb{L}_j(g)} (-1) d\alpha(x) = -\alpha(\mathbb{L}_j(g)).
$$
Adding the linear term $\langle g, b \rangle$, we get:
$$
\nabla_g \mathcal{E}(g)_j = b_j - \alpha(\mathbb{L}_j(g)).
$$

{{< /question >}}

## Exercises

1. **Exercise 1 (Total variation and $0/1$ cost).** Let $d(x,y)=1_{x\ne y}$ be the discrete $0/1$ distance. We wish to show that for any $p\ge1$, and probability measures $\alpha$ and $\beta$,
$$W_{p}^{p}(\alpha,\beta)=\frac{1}{2}||\alpha-\beta||_{TV}.$$
Start with two discrete probability measures $\alpha=\sum_{i}a_{i}\delta_{x_{i}}$ and $\beta=\sum_{i}b_{i}\delta_{x_{i}}$ on the same finite set $\{x_{i}\}_{i}$ with weights $a=(a_{i})$ and $b=(b_{i})$ on the same support.

{{< spoiler "Solution" >}}
First, recall the definition of the Total Variation distance:
$$\frac{1}{2} \|\alpha - \beta\|_{TV} = \frac{1}{2} \sum_i |b_i - a_i|$$

For the Wasserstein distance with cost $c(x,y) = \mathbb{1}_{\{x \neq y\}}$:
$$W_p^p(\alpha, \beta) = \inf_{\substack{X \sim \alpha \\ Y \sim \beta}} \mathbb{E}[\mathbb{1}_{\{X \neq Y\}}]$$

This implies the cost matrix is $\mathbb{C} = \mathbb{1}\mathbb{1}^T - I$ (where $\mathbb{1}\mathbb{1}^T$ is the all-ones matrix and $I$ is the identity matrix).

We can rewrite the minimization problem over the coupling matrix $P$:
$$\min_{\substack{P^T \mathbb{1} = b \\ P \mathbb{1} = a}} \langle P, \mathbb{C} \rangle = \min \text{Tr}((\mathbb{1}\mathbb{1}^T - I)^T P) = \min (\underbrace{\text{Tr}(\mathbb{1}\mathbb{1}^T P)}_{1} - \text{Tr}(P))$$
$$= 1 - \max_{\substack{P \mathbb{1} = a \\ P^T \mathbb{1} = b}} \text{Tr}(P) = 1 - \sum_i \min\{a_i, b_i\}$$

Now, we manipulate the expression to match the TV norm:
$$= \frac{1}{2} \left( \sum_i a_i + \sum_i b_i - \sum_i \min\{a_i, b_i\} - \sum_i \min\{a_i, b_i\} \right)$$
$$= \frac{1}{2} \left( \sum_i (a_i - \min\{a_i, b_i\}) + \sum_i (b_i - \min\{a_i, b_i\}) \right)$$
$$= \frac{1}{2} \sum_i \left( \max\{0, a_i - b_i\} + \max\{0, b_i - a_i\} \right)$$
$$= \frac{1}{2} \sum_i |a_i - b_i| = \frac{1}{2} \|\alpha - \beta\|_{TV}$$
{{< /spoiler >}}

2. **Exercise 2 (Equivalence of topologies on a finite discrete metric space).** Let $(X, d)$ be a finite discrete metric space. Define
$$d_{min}:=\min_{x\ne y}d(x,y) , \quad d_{max}:=\max_{x,y}d(x,y)$$
Show that for all probability measures $\alpha, \beta$ on $X$,
$$\frac{d_{min}}{2}||\alpha-\beta||_{TV}\le W_{1}(\alpha,\beta)\le\frac{d_{max}}{2}||\alpha-\beta||_{TV}.$$
Conclude that the $W_{1}$-topology and the total variation topology coincide on $\mathcal{P}(X)$.

{{< spoiler "Solution" >}}
We have $\|\alpha - \beta\|_{TV} = \sum |a_i - b_i|$.

For the lower bound:
$$W_1(\alpha, \beta) = \mathcal{L}(\alpha, \beta) = \min_{\substack{P \mathbb{1} = a \\ P^T \mathbb{1} = b}} \sum d(x_i, x_j) P_{ij}$$
Since $d(x_i, x_j) \ge d_{min}$ for $i \neq j$ and $0$ otherwise:
$$\ge \min_{\substack{P \mathbb{1} = a \\ P^T \mathbb{1} = b}} \langle P, d_{min} (\mathbb{1}\mathbb{1}^T - I_d) \rangle$$
Using the result from Exercise 1 for the $0/1$ cost structure:
$$\Rightarrow W_1(\alpha, \beta) \ge d_{min} \left[ 1 - \max_{\substack{P \mathbb{1} = a \\ P^T \mathbb{1} = b}} \text{Tr}(P) \right] = d_{min} \frac{1}{2} \|\alpha - \beta\|_{TV}$$

Similarly for the upper bound, replacing $d(x,y)$ with $d_{max}$ for $x \neq y$:
$$W_1(\alpha, \beta) \le \frac{d_{max}}{2} \|\alpha - \beta\|_{TV}$$

Thus, $\frac{d_{min}}{2} \|\alpha - \beta\|_{TV} \le W_1(\alpha, \beta) \le \frac{d_{max}}{2} \|\alpha - \beta\|_{TV}$.

**Conclusion:**
Then, if $\alpha_n \to \alpha$ in TV, then $\|\alpha_n - \alpha\|_{TV} \to 0 \Rightarrow W_1(\alpha, \alpha_n) \to 0$.
Similarly, if $W_1(\alpha_n, \alpha) \to 0$, $\|\alpha - \alpha_n\|_{TV} \to 0$. Thus, the topologies coincide.
{{< /spoiler >}}

3. **Exercise 3 (c-transforms).** Show the following identities
* $f\le f^{\prime}\rightarrow f^{c}\ge f^{\prime c}$
* $f^{c\overline{c}}\ge f$
* $g^{\overline{c}c}\ge g$
* $f^{c\overline{c}c}=f^{c}$

{{< spoiler "Solution" >}}
Remind definitions: $f^c(y) = \inf_x c(x,y) - f(x)$ and $g^{\bar{c}}(x) = \inf_y c(x,y) - g(y)$.

**1. Proof that $f \le f' \Rightarrow f^c \ge f'^c$:**
$$f \le f' \Rightarrow \inf_x (c(x,y) - f(x)) \ge \inf_x (c(x,y) - f'(x))$$
$$\Rightarrow f^c \ge f'^c$$

**2. Proof that $f^{c\bar{c}} \ge f$:**
$$f^{c\bar{c}}(x) = \inf_y c(x,y) - f^c(y) = \inf_y \left( c(x,y) - \inf_z (c(z,y) - f(z)) \right)$$
$$= \inf_y \left( c(x,y) + \sup_z (f(z) - c(z,y)) \right)$$
$$= \inf_y \sup_z (c(x,y) - c(z,y) + f(z))$$
We can choose a specific $z = x$ to find a lower bound:
$$\ge \inf_y (c(x,y) - c(x,y) + f(x)) = f(x)$$

**3. Proof that $g^{\bar{c}c} \ge g$:**
$$g^{\bar{c}c}(y) = \inf_x c(x,y) - g^{\bar{c}}(x) = \inf_x \left( c(x,y) - \inf_z (c(x,z) - g(z)) \right)$$
$$= \inf_x \left( c(x,y) + \sup_z (g(z) - c(x,z)) \right)$$
We can choose a specific $z = y$ to find a lower bound:
$$\ge \inf_x (c(x,y) + g(y) - c(x,y)) = g(y)$$

**4. Proof that $f^{c\bar{c}c} = f^c$:**
Let $f' = f^{c\bar{c}}$. Then, by the first point ($f \le f^{c\bar{c}}$ from step 2), we have $f^c \ge f'^{c} = f^{c\bar{c}c}$.
Now, let $g = f^c$. By the third point, $g^{\bar{c}c} \ge g \Rightarrow f^{c\bar{c}c} \ge f^c$.
Thus, combining both inequalities, $f^{c\bar{c}c} = f^c$.
{{< /spoiler >}}
