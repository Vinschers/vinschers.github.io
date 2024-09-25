+++
title = "Efficient Estimation"
date = 2024-09-24
draft = false
+++

Our goal is to characterize efficient estimators for $\theta$ in terms of mean squared error using the notion of Fisher information.

## Estimator

Let $P_\theta$ be a probability distribution where $\theta \in \Theta \subset \mathbb{R}^d$, $d \in \mathbb{N}$.

{{< notice "definition" "Estimator" >}}
An estimator of $\theta$ is any statistic $\hat{\theta}$ taking values in $\Theta$.
{{< /notice >}}

## Bias

We want $\hat{\theta}(X)$ to be close to $\theta$.
Since the estimator is a random variable, we can calculate its expectation.

{{< notice "definition" "Bias" >}}
The bias of the estimator $\hat{\theta}$ is:
$$
b(\theta) = \mathbb{E}(\hat{\theta}(X)) - \theta.
$$
{{< /notice >}}

Observe that the bias is unknown to the statistician.

{{< notice "info" >}}
{{< markdown >}}

An estimator is unbiased if $b(\theta) = 0$ for all $\theta \in \Theta$.

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model, $X \sim \mathcal{B}(\theta)$, the estimator $\hat{\theta}(X) = X$ is unbiased.
$$
\mathbb{E}(\hat{\theta}(X)) = \theta \implies b(\theta) = 0
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" "Geometric distribution" >}}
{{< markdown >}}

The Geometric distribution $\mathcal{G}(\theta)$ is the probability distribution of the number $X$ of Bernoulli trials until the first success.

When the support of the probability is $\mathbb{N}$, then
$$
\mathrm{Pr}(X = k) = (1 - \theta)^{k - 1} \theta
$$

Also, we have
$$
\begin{align*}
\mathbb{E}(X) &= \frac{1}{\theta} \\
\mathrm{Var}(X) &= \frac{1 - \theta}{\theta^2}
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" "Jensen's inequality" >}}
{{< markdown >}}

Let $f \colon \mathbb{R} \to \mathbb{R}$ be a convex function, and let $X$ be a random variable.
Then,
$$
f(\mathbb{E}(X)) \leq \mathbb{E}(f(X))
$$

If $f$ is concave, then
$$
f(\mathbb{E}(X)) \geq \mathbb{E}(f(X))
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

For the geometric model, $X \sim \mathcal{G}(\theta)$, the estimator $\hat{\theta}(X) = \frac{1}{X}$ is biased.
By the Jensen's inequality,
$$
\mathbb{E}(\hat{\theta}(X)) = \mathbb{E}\left( \frac{1}{X} \right) > \frac{1}{\mathbb{E}(X)} = \frac{1}{\frac{1}{\theta}} = \theta \implies b(\theta) > 0
$$

{{< /markdown >}}
{{< /notice >}}

## Quadratic risk

A common performance metric is the quadratic risk.

{{< notice "definition" "Quadratic risk" >}}
{{< markdown >}}

The quadratic risk (or mean squared error) of the estimator $\hat{\theta}$ is:
$$
R(\theta) = \mathbb{E}(\Vert \hat{\theta}(X) - \theta \Vert^2)
$$

{{< /markdown >}}
{{< /notice >}}

Since it is a function of $\theta$ we can know $R$, but not $R(\theta)$ ($\theta$ is still unknown).

{{< notice "definition" "Bias-variance decomposition" >}}
{{< markdown >}}

The quadratic risk satisfies:
$$
R(\theta) = \Vert b(\theta) \Vert^2 + \mathrm{tr}(\mathrm{Cov}(\hat{\theta}(X))).
$$

In the scalar case, it is
$$
R(\theta) = [b(\theta)]^2 + \mathrm{Var}(\hat{\theta}(X)).
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model, $X \sim \mathcal{B}(\theta)$, the risk of the unbiased estimator $\hat{\theta}(X) = X$ is:
$$
\begin{align*}
R(\theta) &= [b(\theta)]^2 + \mathrm{Var}(\hat{\theta}(X)) \\
&= 0^2 + [\mathbb{E}(X^2) - \mathbb{E}^2(X)] \\
&= \theta - \theta^2 \\
&= \theta (1 - \theta)
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model, $X_1, \dots, X_n \sim \mathcal{B}(\theta)$, the risk of the unbiased estimator $\hat{\theta}(X) = \frac{1}{n} \sum_{i = 1}^n X_i$ is:
$$
\begin{align*}
R(\theta) &= [b(\theta)]^2 + \mathrm{Var}(\hat{\theta}(X)) \\
&= \frac{\theta (1 - \theta)}{n}
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

## Cramer-Rao bound

The Cramer-Rao bound is a lower bound for $R(\theta)$.
We assume $I(\theta) > 0$.

{{< notice "theorem" "Cramer-Rao bound" >}}
{{< markdown >}}

The quadratic risk of an unbiased estimator satisfies:
$$
\forall \theta \in \Theta, \quad R(\theta) \geq \mathrm{tr}(I^{-1}(\theta)).
$$

For the scalar case, $R(\theta) \geq [I(\theta)]^{-1}$.

If the relation is an equality, then the estimator is said to be *efficient*.

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

Let $X_1, \dots, X_n \sim \mathcal{B}(\theta)$, and let $\hat{\theta}(X) = \frac{1}{n} \sum_{i = 1}^n X_i$.

We know that $\hat{\theta}$ is unbiased and that $R(\theta) = \frac{\theta (1 - \theta)}{n}$.
As we have seen previously, $I(\theta) = \frac{n}{\theta (1 - \theta)}$.

Since $R(\theta) = I(\theta)^{-1}$ for all $\theta$, we can say that $\hat{\theta}$ is efficient.

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" >}}
$$
\mathrm{Cov}(X, Y) = \mathbb{E}(X Y) - \mathbb{E}(X) \mathbb{E}(Y)
$$
{{< /notice >}}

### Functional estimation

Assume that we want to estimate the parameter $g(\theta)$, for some differentiable function $g$.
Let $\hat{g}$ be an estimator of $g(\theta)$.

The bias and the quadratic risk of $\hat{\theta}$ are respectively given by:
$$
b(\theta) = \mathbb{E}(\hat{g}(X)) - g(\theta) \qquad \mathrm{and} \qquad R(\theta) = \mathbb{E}(\Vert \hat{g}(X) - g(\theta) \Vert^2).
$$

The quadratic risk satisfies:
$$
R(\theta) = \Vert b(\theta) \Vert^2 + \mathrm{tr}(\mathrm{Cov}(\hat{g}(X))).
$$

In the scalar case, it is
$$
R(\theta) = [b(\theta)]^2 + \mathrm{Var}(\hat{g}(X)).
$$

If the estimator $\hat{g}$ is unbiased, we have the Cramer-Rao bound:
$$
R(\theta) \geq \nabla g(\theta)^T I(\theta)^{-1} \nabla g(\theta).
$$
For the scalar case, it is:
$$
R(\theta) \geq \frac{g^\prime(\theta)^2}{I(\theta)}.
$$

### Biased estimation

We now consider any estimator of $\theta$, potentially biased.
We assume $b(\theta)$ is differentiable.
Then,
$$
R(\theta) \geq b(\theta)^2 + \frac{(1 + b^\prime(\theta))}{I(\theta)}
$$

In the multi-dimensional case, the quadratic risk has a lower bound given by:
$$
R(\theta) \geq \Vert b(\theta) \Vert^2 + \mathrm{tr}[ (\mathrm{Id} + \nabla b(\theta))^T I(\theta)^{-1} (\mathrm{Id} + \nabla b(\theta)) ].
$$

{{< notice "warning" >}}
{{< markdown >}}

For biased estimators, $R(\theta)$ depends on $\hat{\theta}$.

For unbiased estimators, $R(\theta)$ is the same regardless of $\hat{\theta}$.

In particular, if $R(\theta) = \frac{1}{I(\theta)}$ for all $\theta$, then $\hat{\theta}$ is unbiased.

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" >}}
If the estimator $\hat{\theta}$ is unbiased, then
$$
\mathrm{Cov}(\hat{\theta}(X)) \geq I(\theta)^{-1}.
$$
{{< /notice >}}

{{< notice "theorem" "Generalized Cauchy-Schwartz inequality" >}}
{{< markdown >}}

Let $U$, $V$ be random vectors of any finite dimensions (not necessarily the same).
If $\mathrm{Cov}(V)$ is definite, then
$$
\mathrm{Cov}(U) \geq \mathrm{Cov}(U, V) \mathrm{Cov}(V)^{-1} \mathrm{Cov}(V, U).
$$

In 1 dimension, this can be simplified to
$$
\mathrm{Var}(U) \mathrm{Var}(V) \geq \mathrm{Cov}(U, V)^2.
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" >}}
$$
\nabla_\theta p = p \nabla_\theta \log{p} = \mathbb{E}(\nabla_\theta \log{p})
$$
{{< /notice >}}
