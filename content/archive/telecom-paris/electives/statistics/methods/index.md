+++
title = "Estimation methods"
date = 2024-10-01
+++

Consider a statistical model with unknown parameter $\theta$.
We want to develop some methods to find $\theta$. $\DeclareMathOperator*{\argmax}{arg \,max \,} \DeclareMathOperator*{\argmin}{arg \,min \,}$

## Rao-Blackwell theorem

{{< notice "tip" >}}
{{< markdown >}}

For any two random variables $X$ and $Y$,
$$
\begin{align*}
\mathbb{E}[\mathbb{E}[X \mid Y]] &= \mathbb{E}[X] \\
\mathbb{E}[\mathbb{E}[X \mid Y]^2] &\leq \mathbb{E}[\mathbb{E}[X^2 \mid Y]] \\
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" "Rao-Blackwell theorem" >}}
{{< markdown >}}

Let $T$ be a sufficient statistic, and let $\delta$ be an unbiased estimator of $\theta$.
The estimator $\hat{\theta}$, defined as follows, is unbiased and has a lower quadratic risk than $\delta$.
$$
\hat{\theta} = \mathbb{E}[\delta \mid T]
$$

{{< /markdown >}}
{{< /notice >}}

**Proof**:
We begin proving that $\hat{\theta}$ is unbiased if $\delta$ is unbiased.
$$
\begin{align*}
b(\hat{\theta}) &= \mathbb{E}[\hat{\theta}] - \theta \\
&= \mathbb{E}[\mathbb{E}[\delta \mid T]] - \theta \\
&= \mathbb{E}[\delta] - \theta \\
&= \theta - \theta \\
&= 0
\end{align*}
$$
Now, we can compute the risk of $\hat{\theta}$.
$$
\mathbb{E}[\hat{\theta}^2] = \mathbb{E}[\mathbb{E}[\delta \mid T]^2] \leq \mathbb{E}[\mathbb{E}[\delta^2 \mid T]] = \mathbb{E}[\delta^2]
$$
$$
\begin{align*}
R(\hat{\theta}) &= \mathrm{Var}(\hat{\theta}) \\
&= \mathbb{E}[\hat{\theta}^2] - \mathbb{E}^2[\hat{\theta}] \\
&\leq \mathbb{E}[\delta^2] - \theta^2 \\
&= \mathrm{Var}(\delta) \\
&= R(\delta)
\end{align*}
$$
So, we can say that $b(\hat{\theta}) = 0$ and $R(\hat{\theta}) \leq R(\delta)$.

## Maximum likelihood

Suppose we know the statistical model $p_\theta$ of some random data.
If $X$ is a random variable, then $p_\theta(X)$ is the likelihood of obtaining $X$ given the parameter $\theta$.
Since we sampled $X$, it makes sense to suppose that the probability of sampling $X$ is high.
So, let us estimate $\theta$ by choosing the parameter that maximizes de change of getting $X$ from a random sample.

$$
\hat{\theta} = \argmax_{\theta \in \Theta}{p_\theta(X)}
$$

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model $\mathcal{P} = \{ P_\theta \sim \mathcal{B}(\theta) \mid \theta \in [0, 1] \}$, we have $p_\theta(x) = \theta^x (1 - \theta)^{1 - x}$.

- If $x = 1$, then $p_\theta(1) = \theta \implies \hat{\theta} = 1$.
- If $x = 0$, then $p_\theta(0) = 1 - \theta \implies \hat{\theta} = 0$.

Thus, $\hat{\theta} = X$.

{{< /markdown >}}
{{< /notice >}}

If we have $n$ independent observations $X = (X_1, \dots, X_n)$, the likelihood function is the product of all the $X_i$.
We can apply the $\log$ to the likelihood and just maximize it, since the $\log$ is an increasing function.

$$
\hat{\theta} = \argmax_{\theta \in \Theta} {\sum_{i = 1}^n \log p_\theta(X_i)}
$$

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model with $n$ i.i.d. observations, the log-likelihood is:
$$
\begin{align*}
\log{p_\theta(X)} &= \sum_{i = 1}^n X_i \log{(\theta)} + (1 - X_i) \log{(1 - \theta)} \\
&= \log{(\theta)} \left(\sum_{i = 1}^n X_i \right) + \log{(1 - \theta)} \left(n - \sum_{i = 1}^n X_i\right) \\
&= (\log{(\theta)} - \log{(1 - \theta)}) \left(\sum_{i = 1}^n X_i \right) + n \log{(1 - \theta)} \\
\end{align*}
$$

Now, let us maximize the log-likelihood.
$$
\begin{align*}
\frac{\partial p_\theta(X)}{\partial \theta} &= 0 \\
\left( \frac{1}{\theta} + \frac{1}{1 - \theta} \right) \left(\sum_{i = 1}^n X_i \right) - \frac{n}{1 - \theta} &= 0 \\
\frac{1}{\theta (1 - \theta)} \left(\sum_{i = 1}^n X_i \right) &= \frac{n}{1 - \theta} \\
\theta &= \frac{1}{n} \left(\sum_{i = 1}^n X_i \right) \\
\end{align*}
$$

So, our estimator is $\hat{\theta} = \frac{1}{n} \left(\sum_{i = 1}^n X_i \right)$.

{{< /markdown >}}
{{< /notice >}}

## Method of moments

Another approach relies on the Strong Law of Large Numbers (SLLN).
For simplicity, we assume that $\Theta \subseteq \mathbb{R}$.

{{< notice "info" >}}
{{< markdown >}}

Let $X_1, \dots, X_n$ be i.i.d. observations with distribution $P_\theta$.
For large $n$, we have that
$$
\mathbb{E}_\theta[X_i] \approx \frac{1}{n} \sum_{i = 1}^n X_i.
$$

{{< /markdown >}}
{{< /notice >}}

The method of moments consists of finding $\theta$ that makes the approximation above exact.

{{< notice "example" >}}
{{< markdown >}}

For the Bernoulli model with $n$ i.i.d. observations, we have $X \sim \mathcal{B}(\theta)$ and $\mathbb{E}_\theta[X] = \theta$.
Note that if we set the parameter to $\bar{X}$, we arrive at the following:
$$
\mathbb{E}_\bar{X}[X] = \bar{X} = \frac{1}{n} \sum_{i = 1}^n X_i
$$

So, $\hat{\theta} = \bar{X}$ is our estimator.

{{< /markdown >}}
{{< /notice >}}

When $\mathbb{E}_\theta[X]$ does not depend on $\theta$ (like with $\mathcal{N}(0, \theta^2)$), we can use the same idea with other moments.

{{< notice "tip" "Statistical moments" >}}
{{< markdown >}}

1. First moment (mean):

    $$
    \mu = \mathbb{E}[X] = \int_{-\infty}^{\infty} x f(x) \, \mathrm{d}x = 0
    $$

2. Second moment (variance):

    $$
    \sigma^2 = \mathbb{E}[(X - \mu)^2]
    $$

3. Third moment (Skewness):

    $$
    \frac{\mathbb{E}[(X - \mu)^3]}{\sigma^3}
    $$

4. Fourth Moment (Kurtosis):

    $$
    \frac{\mathbb{E}[(X - \mu)^4]}{\sigma^4}
    $$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

Consider the Gaussian model with unknown variance $\theta > 0$.
We have $n$ i.i.d. observations $X_1, \dots, X_n \sim \mathcal{N}(0, \theta)$.
Since $\mathbb{E}_\theta[X] = 0$, we get the estimator based on the variance:
$$
\hat{\theta} = \frac{1}{n} \sum_{i = 1}^n X_i^2
$$

{{< /markdown >}}
{{< /notice >}}

## Method of least squares

Let $X_1, \dots, X_n$ be random observations where $X_i = f_\theta(t_i) + Z_i$, for some known parameters $t_1, \dots, t_n$.
The function $f_\theta$ is deterministic and depends on some unknown parameter $\theta$.
The variables $Z_1, \dots, Z_n$ are i.i.d. and correspond to some random noise added.

The least square estimator of $\theta$ is that minimizing the mean square error:

$$
\hat{\theta} = \argmin_{\theta \in \Theta}{\sum_{i = 1}^n (X_i - f_\theta(t_i))^2}
$$

{{< notice "info" >}}
{{< markdown >}}

If $Z_1, \dots, Z_n$ are centered Gaussian random variables with known variance, then the least square estimator coincides with the maximum likelihood estimator.
In other words,
$$
\begin{align*}
\argmax_{\theta \in \Theta} {\sum_{i = 1}^n \log p_\theta(X_i)} &= \argmin_{\theta \in \Theta}{\sum_{i = 1}^n (X_i - f_\theta(t_i))^2} \\
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" "Poisson distribution" >}}
{{< markdown >}}

$$
\begin{align*}
p_\theta(x) &= \frac{e^{- \theta} \theta^x}{x!} \\
\mathbb{E}[X] &= \theta \\
\mathrm{Var}(X) &= \theta
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

## Exercises

1. (Rao-Blackwell – Bernoulli). Consider the Bernoulli model with parameter $\theta \in [0, 1]$.
You want to estimate $\theta$ using $n$ i.i.d. samples $X_1, \dots, X_n$.

    (a) Check that the estimator $\delta = X_1$ is unbiased and compute its quadratic risk.

    (b) Show that the statistic $T = X_1 + \dots + X_n$ is sufficient.

    (c) Propose a new estimator $\hat{\theta}$ using Rao-Blackwell theorem.

    (d) Is $\hat{\theta}$ efficient?

    {{< spoiler "Show answer" >}}
    (a)
    $$
    b(\theta) = \mathbb{E}[X_1] - \theta = \theta - \theta = 0
    $$
    $$
    R(\theta) = \mathrm{Var}(\delta) = \mathrm{Var}(X_1) = \theta (1 - \theta)
    $$

    (b)
    $$
    \begin{align*}
    p_\theta(x) &= \prod_{i = 1}^n \theta^{x_i} (1 - \theta)^{1 - x_i} \\
    &= \theta^{\sum_{i = 1}^n x_i} (1 - \theta)^{n - \sum_{i = 1}^n x_i} \\
    &= \theta^t (1 - \theta)^{n - t}
    \end{align*}
    $$
    By the Fisher factorization theorem, $T$ is sufficient. <br>

    (c)
    $$
    \begin{align*}
    \hat{\theta} &= \mathbb{E}[\delta \mid T] \\
    &= \mathbb{E}[X_1 \mid T] \\
    &= \frac{T}{n}
    \end{align*}
    $$

    (d)
    $$
    R(\theta) = \frac{\theta (1 - \theta)}{n}
    $$
    $$
    I_{X_1}(\theta) = \mathbb{E}[S^2(X_1)] = \mathbb{E}\left[\left(\frac{x}{\theta} - \frac{1 - x}{1 - \theta}\right)^2\right] = \frac{1}{\theta (1 - \theta)} \implies I_X(\theta) = \frac{n}{\theta (1 - \theta)}
    $$
    {{< /spoiler >}}

2. (Rao-Blackwell – Poisson). Consider the Poisson model with parameter $\theta > 0$. You want to estimate $g(\theta) = e^{- \theta}$ using $n$ i.i.d. samples $X_1, \dots, X_n$.

    (a) Check that the estimator $\delta = \mathbb{1}_{X_1 = 0}$ is unbiased and compute its quadratic risk.

    (b) Show that the statistic $T = X_1 + \dots + X_n$ is sufficient.

    (c) Propose a new estimator $\hat{\theta}$ using Rao-Blackwell theorem.

    (d) Is $\hat{\theta}$ efficient?

    {{< spoiler "Show answer" >}}
    (a)
    $$
    b(\theta) = \mathbb{E}[\delta] - g(\theta) = \mathbb{P}(X_1 = 0) - e^{- \theta} = e^{- \theta} - e^{- \theta} = 0
    $$
    $$
    R(\theta) = \mathrm{Var}(\delta) = e^{- \theta} (1 - e^{- \theta})
    $$

    (b)
    $$
    \begin{align*}
    p_\theta(x) &= \prod_{i = 1}^n \frac{e^{- \theta} \theta^{x_i}}{x_i!} \\
    &= e^{- n \theta} \theta^T \frac{1}{x_1! \dots x_n!}
    \end{align*}
    $$
    By the Fisher factorization theorem, $T$ is sufficient. <br>

    (c)
    $$
    \begin{align*}
    \hat{\theta} = \mathbb{E}[\delta \mid T] = \mathbb{P}(T = t \mid X_1 = 0) &= \frac{\mathbb{P}(X_1 = 0, T = t)}{\mathbb{P}(T = t)} \\
    &= \theta^t e^{- n \theta} \sum_{x_2 + \dots + x_n = t}^n \frac{1}{x_1! \dots x_n!} \left[ \frac{\theta^t}{t!} e^{-n \theta} n^t \right]^{-1} \\
    &= \frac{\theta^t}{t!} e^{-n \theta} (n - 1)^t \theta^t e^{- n \theta} \sum_{x_2 + \dots + x_n = t} \frac{1}{x_1! \dots x_n!} \left[ \frac{\theta^t}{t!} e^{-n \theta} n^t \right]^{-1} \\
    &= \left( \frac{n - 1}{n} \right)^T
    \end{align*}
    $$
    {{< /spoiler >}}

3. (Gaussian model). Consider the Gaussian model with unknown mean $\theta$ and known variance $\sigma^2$. You want to estimate $\theta$ using $n$ i.i.d. samples $X_1, \dots, X_n$.

    (a) Give the maximum likelihood estimator.

    (b) Retrieve this estimator by the method of moments.

    {{< spoiler "Show answer" >}}
    (a)
    $$
    \begin{align*}
    \log{p_\theta(x)} &\propto - \frac{1}{2 \sigma^2} \sum_{i = 1}^n (x_i - \theta)^2 \\
    \implies \frac{\partial \log{p_\theta(x)}}{\partial \theta} &= \frac{1}{\sigma^2} \sum_{i = 1}^n (x_i - \theta) \\
    \end{align*}
    $$
    Now, we equal the derivative to $0$ and solve for $\theta$ to find the maximum.
    $$
    \frac{1}{\sigma^2} \sum_{i = 1}^n (x_i - \theta) = 0 \implies \theta = \frac{1}{n} \sum_{i = 1}^n x_i
    $$
    That is our estimator. <br>

    (b) Since $\mathbb{E}[X_i] = \theta$, we can simply write
    $$
    \hat{\theta} = \frac{1}{n} \sum_{i = 1}^n X_i
    $$
    {{< /spoiler >}}
