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
