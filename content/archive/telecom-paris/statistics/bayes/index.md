+++
title = "Bayesian Statistics"
date = 2024-10-07
+++

{{< tip "Beta distribution" >}}

The Beta distribution is a continuous probability distribution defined on the interval $[0, 1]$.
It has two parameters: $\theta = (\alpha, \beta)$.
Then, we have:

$$
\begin{align*}
p_\theta(x) &= \frac{x^{\alpha - 1} (1 - x)^{\beta - 1}}{B(\alpha, \beta)} \\
\mathbb{E}[X] &= \frac{\alpha}{\alpha + \beta} \\
\mathrm{Var}(X) &= \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)},
\end{align*}
$$
where $B(\alpha, \beta)$ is the Beta function, defined as:
$$
B(\alpha, \beta) = \frac{\Gamma(\alpha) \Gamma(\beta)}{\Gamma(\alpha + \beta)}
$$

{{< /tip >}}

Here, we are considering $\theta \in \Theta$ as a random variable. $\DeclareMathOperator*{\argmax}{arg \,max \,} \DeclareMathOperator*{\argmin}{arg \,min \,}$

## Prior and posterior distributions

{{< definition "Prior" >}}
The *prior* $\pi$ is the distribution of $\theta$ before any observation.
{{< /definition >}}

{{< example >}}
For the Bernoulli model with an uniform prior, we get:
$$
\pi(\theta) = \mathbb{1}_{[0, 1]}(\theta)
$$
and
$$
\mathbb{P}_\theta(X) = \mathbb{P}(x \mid \theta) \sim \mathcal{B}(\theta).
$$
{{< /example >}}

We can compute the distribution of $\theta$ after observation $x$ using Bayes's theorem:
$$
p(\theta \mid x) = \frac{p(x \mid \theta) \pi(\theta)}{p(x)}.
$$

Here, we consider $p(x)$ as a constant.
This gives rise to the *posterior* of $\theta$.

{{< notice "definition" "Posterior" >}}
{{< markdown >}}

The *posterior* $p(\theta \mid x)$ is the distribution of $\theta$ after observation; it depends on the prior:
$$
p(\theta \mid x) \propto \pi(\theta) p(x \mid \theta)
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model with an uniform prior, we have $p(x \mid \theta) = \theta^x (1 - \theta)^{1 - x}$, and $\pi(\theta) = \mathbb{1}_{[0, 1]}(\theta)$, so that:

$$
\begin{align*}
p(\theta \mid X = 0) &= \mathbb{1}_{[0, 1]}(\theta) (1 -\theta), \\
p(\theta \mid X = 1) &= \mathbb{1}_{[0, 1]}(\theta) \theta.
\end{align*}
$$

Since the posterior is also a distribution, it must obey the usual property of distributions:
$$
\int_{-\infty}^{\infty} p(\theta \mid x) \, \mathrm{d}\theta = 1.
$$

This way, we can deduce that
$$
\begin{align*}
p(\theta \mid X = 0) &= 2 (1 - \theta) \mathbb{1}_{[0, 1]}(\theta), \\
p(\theta \mid X = 1) &= 2 \theta \mathbb{1}_{[0, 1]}(\theta).
\end{align*}
$$

These are $\mathrm{Beta}(2, 1)$ and $\mathrm{Beta}(1, 2)$ distributions, respectively.

{{< /markdown >}}
{{< /notice >}}

## Bayes metrics

{{< notice "definition" "Bayes bias and quadratic risk" >}}
{{< markdown >}}

Bayes bias and Bayes quadratic risk are the expected values of the bias and the quadratic risk according to the prior distribution:
$$
\begin{align*}
b &= \mathbb{E}[\hat{\theta} - \theta] \\
R &= \mathbb{E}[(\hat{\theta} - \theta)^2]
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

## Bayes estimator

Given the posterior distribution $p(\theta \mid x)$, a natural choice for estimating $\theta$ is the expected value.
This is called *Bayes estimator*.

{{< notice "definition" "Bayes estimator" >}}
{{< markdown >}}

$$
\hat{\theta}(x) = \mathbb{E}[\theta \mid x]
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

Consider the Bernoulli model with a uniform prior.
We already know that
$$
\begin{align*}
p(\theta \mid X = 0) &= 2 (1 - \theta) \mathbb{1}_{[0, 1]}(\theta), \\
p(\theta \mid X = 1) &= 2 \theta \mathbb{1}_{[0, 1]}(\theta).
\end{align*}
$$

Then,
$$
\begin{align*}
\hat{\theta}(0) &= \mathbb{E}[\theta \mid X = 0] \\
&= \int_{-\infty}^{\infty} \theta \times 2 (1 - \theta) \mathbb{1}_{[0, 1]}(\theta) \, \mathrm{d} \theta \\
&= \int_0^1 2 \theta - 2 \theta^2 \, \mathrm{d} \theta \\
&= \frac{1}{3}.
\end{align*}
$$

Similarly, $\hat{\theta}(1) = \frac{2}{3}$.

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" >}}
{{< markdown >}}

Bayes estimator has no Bayes bias and minimizes Bayes quadratic risk.

{{< /markdown >}}
{{< /notice >}}

## Maximum a posteriori

Another natural choice for the estimator is the *mode* of the posterior distribution.
This is called the Maximum A Posteriori (MAP) estimator.

{{< notice "definition" "MAP estimator" >}}
{{< markdown >}}

$$
\hat{\theta}(x) = \argmax_{\theta \in \Theta} {p(\theta \mid x)}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

Consider the Bernoulli model with a uniform prior.
We already know that
$$
\begin{align*}
p(\theta \mid X = 0) &= 2 (1 - \theta) \mathbb{1}_{[0, 1]}(\theta), \\
p(\theta \mid X = 1) &= 2 \theta \mathbb{1}_{[0, 1]}(\theta).
\end{align*}
$$

Then,
$$
\begin{align*}
\hat{\theta}(0) &= \argmax_{\theta \in [0, 1]}{2 (1 - \theta) \mathbb{1}_{[0, 1]}(\theta)} \\
&= 0
\end{align*}
$$

Similarly, $\hat{\theta}(1) = 1$.
**Observation**: in this example, the MAP estimator coincides with the MLE estimator.

{{< /markdown >}}
{{< /notice >}}

## Conjugate prior

{{< notice "definition" "Conjugate prior" >}}
{{< markdown >}}

We say that $\pi$ is a conjugate prior of the statistical model $p(x \mid \theta)$ if the posterior distribution, $p(\theta \mid x)$, belongs to the same family of distributions as $\pi$.

{{< /markdown >}}
{{< /notice >}}

When the prior and posterior distributions belong to the same family (are conjugate), it is usually harder to compute the posterior distribution.

{{< notice "example" >}}
{{< markdown >}}

Consider the Bernoulli model with $n$ observations.
The Beta distribution is a conjugate prior.
Let $s = \sum_{i = 1}^n x_i$ and assume the prior is a Beta distribution with parameters $(a, b)$:
$$
\pi(\theta) \propto \theta^{a - 1} (1 - \theta)^{b - 1}.
$$

Since $p(x \mid \theta) = \theta^s (1 - \theta)^{n - s}$, we have the following:
$$
\begin{align*}
p(\theta \mid x) &\propto \pi(\theta) \times p(x \mid \theta) \\
&\propto \theta^{a - 1} (1 - \theta)^{b - 1} \times \theta^s (1 - \theta)^{n - s} \\
&\propto \theta^{a + s - 1} (1 - \theta)^{n + b - s - 1} \\
&\sim \mathrm{Beta}(a + s, b + n - s)
\end{align*}
$$

Therefore, the posterior distribution has a Beta distribution as well.

{{< /markdown >}}
{{< /notice >}}
