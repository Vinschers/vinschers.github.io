+++
title = "Sliced Optimal Transport"
date = 2025-10-29
+++

## Exercises

1. *(Comparing isotropic centered Gaussians).* Consider $\mu = \mathcal{N}(0, \sigma^2 \mathbf{I}_d)$ and $\nu = \mathcal{N}(0, \tau^2 \mathbf{I}_d)$, with $\sigma \ge 0, \tau \ge 0$.

    **(a)** Compute the Sliced-Wasserstein distance of order 2 between $\mu$ and $\nu$.

    **(b)** Compare the obtained expression with the Wasserstein distance of order 2 between $\mu$ and $\nu$.

{{< spoiler "Solution" >}}
**(a)** First, note that $p_\theta$ performs a linear operation (namely, projection).
Recall that Gaussians remain Gaussian under linear transformations.
So, $(p_\theta)_\# \mu \sim \mathcal{N}(\mathbb{E}_{X \sim (p_\theta)_\# \mu}[X], \mathrm{Var}_{X \sim (p_\theta)_\# \mu}(X))$.
Let us compute these parameters.
$$
\begin{aligned}
\E_{X \sim (p_\theta)_\# \mu}[X] &= \mathbb{E}_{X \sim \mu}[p_\theta(X)] \\
&= \mathbb{E}_{X \sim \mu}[\langle \theta, X \rangle] \\
&= \left\langle \theta, \underbrace{\mathbb{E}_{X \sim \mu}[X]}_0 \right\rangle \\
&= 0.
\end{aligned}
$$
$$
\begin{aligned}
\Var_{X \sim (p_\theta)_\# \mu}(X) &= \Var_{X \sim \mu}(p_\theta(X)) \\
&= \Var_{X \sim \mu}(\theta^\top X) \\
&= \theta^\top \Var_{X \sim \mu}(X) \theta \\
&= \theta^\top \sigma^2 \mathbf{I}_d \theta \\
&= \sigma^2 \| \theta \|^2
\end{aligned}
$$
By construction of $\SW_2$, we have $\| \theta \|^2 = 1 \implies \mathrm{Var}_{X \sim (p_\theta)_\# \mu}(X) = \sigma^2$.
Thus, $(p_\theta)_\# \mu \sim \mathcal{N}(0, \sigma^2)$ and, similarly, $(p_\theta)_\# \nu \sim \mathcal{N}(0, \tau^2)$.
Now, recall that the $2$-Wasserstein distance between two 1-D Gaussians is $\W_2^2(\alpha, \beta) = (\mu_\alpha - \mu_\beta)^2 + (\sigma_\alpha - \sigma_\beta)^2$.
In this case,
$$
\W_2^2 ((p_\theta)_\# \mu, (p_\theta)_\# \nu) = (\sigma - \tau)^2.
$$
Now, to compute the Sliced-Wasserstein distance, we take the expectation around $\mathcal{U}_{\mathbb{S}^{d - 1}}$.
$$
\begin{aligned}
\SW_2^2 (\mu, \nu) &= \mathbb{E}_{\theta \sim \mathcal{U}_{\mathbb{S}^{d - 1}}}[\W_2^2((p_\theta)_\# \mu, (p_\theta)_\# \nu)] \\
&= \mathbb{E}_{\theta \sim \mathcal{U}_{\mathbb{S}^{d - 1}}}[\underbrace{(\sigma - \tau)^2}_{\text{Constant w.r.t. $\theta$}}] \\
&= (\sigma - \tau)^2 \implies \SW_2 (\mu, \nu) = | \sigma - \tau |.
\end{aligned}
$$

**(b)** Recall the expression of 2-Wasserstein for centered Gaussians:
$$
\W_2^2 (\alpha, \beta) = \mathrm{Tr}(\Sigma_\alpha) + \mathrm{Tr}(\Sigma_\beta) - 2 \Tr[\left(\Sigma_\alpha^\frac{1}{2} \Sigma_\beta \Sigma_\alpha^\frac{1}{2}\right)^{\frac{1}{2}}].
$$
Substituting the above with the given covariances, we have
$$
\begin{aligned}
\W_2^2 (\mu, \nu) &= d \sigma^2 + d \tau^2 - 2 d \sigma \tau \\
&= d (\sigma - \tau)^2 \implies \W_2 (\mu, \nu) = \sqrt{d} |\sigma - \tau|.
\end{aligned}
$$
Thus, $\SW_2 (\mu, \nu) = \sqrt{d} \, \W_2 (\mu, \nu)$.
{{< /spoiler >}}

2. *(Projected optimal transport plans).* Let $\mu, \nu \in \mathcal{P}_2(\mathbb{R}^d)$ (measures on $\mathbb{R}^d$ with finite second moments). Denote by $\gamma$ an optimal transport plan between $\mu$ and $\nu$. For any $\theta \in \mathbb{S}^{d-1}$, define $\gamma_\theta = (p_\theta \otimes p_\theta)_\# \gamma$.

    **(a)** Show that $\gamma_\theta$ is a transport plan between $(p_\theta)_\# \mu$ and $(p_\theta)_\# \nu$.

    **(b)** Is $\gamma_\theta$ an optimal transport plan between $(p_\theta)_\# \mu$ and $(p_\theta)_\# \nu$?

{{< spoiler "Solution" >}}
**(a)** We want to show that $(P_1)_\# \gamma_\theta = (p_\theta)_\# \mu$ and $(P_2)_\# \gamma_\theta = (p_\theta)_\# \nu$.
$$
\begin{aligned}
(P_1)_\# \gamma_\theta &= ((P_1)_\# (p_\theta \otimes p_\theta))_\# \gamma \\
&= (\underbrace{P_1 \circ (p_\theta \otimes p_\theta)}_{(x, y) \mapsto p_\theta(x)})_\# \gamma \\
&= (p_\theta \circ P_1)_\# \gamma \\
&= (p_\theta)_\# (P_1)_\# \gamma \\
&= (p_\theta)_\# \mu.
\end{aligned}
$$
Similarly, $(P_2)_\# \gamma_\theta = (p_\theta)_\# \nu$.
Thus, $\gamma_\theta$ is a map between $(p_\theta)_\# \mu$ and $(p_\theta)_\# \nu$.

**(b)** No. The following picture shows a counter-example for $d = 2$.
![counter-example](images/ex2.jpeg)

We clearly see that $\gamma_\theta$ is not optimal, even though $\gamma$ is.
{{< /spoiler >}}

3. *(Translation decomposition for $\mathbf{SW}_2$).* Let $\mu, \nu \in \mathcal{P}_2(\mathbb{R}^d)$ (measures on $\mathbb{R}^d$ with finite second moments), and denote by $\mu_0, \nu_0$ the respective *centered* versions.

    **(a)** Prove that for any $\theta \sim \mathcal{U}_{\mathbb{S}^{d-1}}$, $\mathbb{E}_{s \sim (p_\theta)_\# \mu}[s] = \langle \theta, \mathbb{E}_{x \sim \mu}[x] \rangle$ and $\mathbb{E}_{t \sim (p_\theta)_\# \nu}[t] = \langle \theta, \mathbb{E}_{y \sim \nu}[y] \rangle$.

    **(b)** Prove that $((p_\theta)_\# \mu)_0 = (p_\theta)_\# \mu_0$ and $((p_\theta)_\# \nu)_0 = (p_\theta)_\# \nu_0$, with $\mu_0 = (T_{-u})_\# \mu$ and $\nu_0 = (T_{-v})_\# \nu$ for a unique pair $(u, v) \in \mathbb{R}^d \times \mathbb{R}^d$ (whose values must be precised).

    **(c)** Show that $\mathbf{SW}_2(\mu, \nu)$ admits the following decomposition,
    $$
    \mathbf{SW}_2(\mu, \nu)^2 = \frac{1}{d} \|u - v\|^2 + \mathbf{SW}_2(\mu_0, \nu_0)^2
    $$
    *(Hint: $\mathbb{E}_{\theta \sim \mathcal{U}_{\mathbb{S}^{d-1}}} [\theta \theta^T] = (1/d) \mathbf{I}_d$.)*

{{< spoiler "Solution" >}}
**(a)** Let $f$ be a measurable function and $T$ be a transport map.
$$
\begin{aligned}
\E_{s \sim T_\# \mu}[f(s)] &= \int f(s) \, \mathrm{d} T_\# \mu (s) \\
&= \int f(T(x)) \, \mathrm{d} \mu \qquad \because \text{Definition of pushforward} \\
&= \E_{x \sim \mu}[f(T(x))].
\end{aligned}
$$
Now, if we let $f(s) = s$ and $T = p_\theta$, it is clear that
$$
\begin{aligned}
\E_{s \sim (p_\theta)_\# \mu}[s] &= \E_{x \sim \mu}[p_\theta(x)] \\
&= \E_{x \sim \mu}[\theta^\top x] = \theta^\top \E_{x \sim \mu}[x] = \langle \theta, \mathbb{E}_{x \sim \mu}[x] \rangle.
\end{aligned}
$$
Similarly, $\mathbb{E}_{t \sim (p_\theta)_\# \nu}[t] = \langle \theta, \mathbb{E}_{y \sim \nu}[y] \rangle$.

**(b)** Let $X \sim \mu$. Then, $S \sim (p_\theta)_\# \mu$ if and only if $S = \langle \theta, X \rangle$.
To have the centered distribution, $S_0 \sim ((p_\theta)_\# \mu)_0$ if $S_0 = S - \E{S} = \langle \theta, X - \E[X] \rangle$, as per item (a).
Coming from the other side, $X_0 \sim \mu_0$ if and only if $X_0 = X - u$.
This means that $S' \sim (p_\theta)_\# \mu_0$ if $S' = \langle \theta, X_0 \rangle = \langle \theta, X - u \rangle$.
Thus, we conclude that $S_0 = S'$ if, and only if, $u = \E_\mu [X]$.
Similarly, $v = \E_\nu [Y]$.

**(c)** Recall that for any $\alpha, \beta$, we have
$$
\W_2^2 (\alpha, \beta) = \| \E_\alpha [X] - \E_\beta [Y] \|^2 + \W_2^2 (\alpha_0, \beta_0).
$$
Using this with $(p_\theta)_\# \mu$ and $(p_\theta)_\# \nu$, we retrieve
$$
\begin{aligned}
\W_2^2 ((p_\theta)_\# \mu, (p_\theta)_\# \nu) &= \| \E_{(p_\theta)_\# \mu}[X] - \E_{(p_\theta)_\# \nu}[Y] \|^2 + \W_2^2 (((p_\theta)_\# \mu)_0, ((p_\theta)_\# \nu)_0) \\
&= \| \langle \theta, \E_\mu [X] \rangle - \langle \theta, \E_\nu [Y] \rangle \|^2 + \W_2^2 ((p_\theta)_\# \mu_0, (p_\theta)_\# \nu_0) \\
&= (u - v)^\top \theta \theta^\top (u - v) + \W_2^2 ((p_\theta)_\# \mu_0, (p_\theta)_\# \nu_0).
\end{aligned}
$$
Then, we apply the definition of $\SW_2^2$.
$$
\begin{aligned}
\SW_2^2 (\mu, \nu) &= \E_{\theta} [\W_2^2 ((p_\theta)_\# \mu, (p_\theta)_\# \nu)] \\
&= \E_{\theta} [(u - v)^\top \theta \theta^\top (u - v) + \W_2^2 ((p_\theta)_\# \mu_0, (p_\theta)_\# \nu_0)] \\
&= (u - v)^\top \E_{\theta} [\theta \theta^\top] (u - v) + \E_{\theta} [\W_2^2 ((p_\theta)_\# \mu_0, (p_\theta)_\# \nu_0)] \\
&= \frac{1}{d} \| u - v \|^2 + \SW_2^2 (\mu_0, \nu_0).
\end{aligned}
$$

{{< /spoiler >}}
