+++
title = "Statistics and Information"
date = 2024-09-17
draft = false
+++

## Parametric model

A statistical model is *parametric* if the probability distribution of $X$ belongs to some family of distributions indexed by some parameter $\theta$ of finite dimension.

{{< notice "definition" "Parametric model" >}}
A parametric model is a set of probability distributions $\mathcal{P} = \{P_\theta, \theta \in \Theta\}$ with $\Theta \subset \mathbb{R}^d$ for some finite dimension $d$.
{{< /notice >}}

Our main goal is to use the observations $X_1, \dots, X_n$ to learn the value of $\theta$.
Note that it is possible to do so only if each probability distribution $P_\theta \in \mathcal{P}$ is defined by a *unique* parameter $\theta$.

{{< notice "definition" "Identifiability" >}}
{{< markdown >}}
The parametric model $\mathcal{P}$ is *identifiable* if the mapping $\theta \mapsto P_\theta$ is a bijection.
{{< /markdown >}}
{{< /notice >}}

In most practical cases, the probability distribution $P_\theta$ has a density.

{{< notice "definition" "Dominated model" >}}
{{< markdown >}}
The parametric model $\mathcal{P}$ is *dominated* if it has a density function, $p_\theta$ for all $\theta \in \Theta$.
{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}
The model $\mathcal{P} = \{ P_\theta \sim \mathcal{N}(\mu, \sigma^2), \theta = (\mu, \sigma^2) \in \mathbb{R} \times \mathbb{R}_+ \}$ of Gaussian distributions is dominated by the density function $p_\theta(x) = \frac{1}{\sqrt{2 \pi \sigma^2}} e^{-\frac{(x - \mu)^2}{2 \sigma^2}}$.

The model $\mathcal{P} = \{ P_\theta \sim \mathcal{B}(\theta), \theta \in [0, 1] \}$ of Bernoulli distributions is dominated by the density function $p_\theta(x) = \theta^x (1 - \theta)^{1 - x}$.
{{< /markdown >}}
{{< /notice >}}

{{< notice "info" "Independent observations" >}}
For a dominated model with $n$ independent observations $x = (x_1, \ldots, x_n)$, we have
$$p_\theta(x) = \prod_{i = 1}^n p_\theta(x_i).$$
{{< /notice >}}

## Decision function

{{< notice "definition" "Decision function" >}}
A decision function $\delta$ is a mapping from the set of observations $\mathcal{X}$ to the set of actions $\mathcal{A}$.
{{< /notice >}}

We may have many sets of actions:

1. If we want to find the value of $\theta$ based on observations, then $\mathcal{A} = \Theta$;
2. If we want to answer a binary question, i.e. do a hypothesis test, then $\mathcal{A} = \{0, 1\}$;
3. If we want to find a confidence region for $\theta$, then $\mathcal{A} = \mathcal{P}(\Theta)$.

## Loss function

A loss function is used to determine the quality of an action $a \in \mathcal{A}$.
This quality dependes on $\theta$.

{{< notice "definition" "Loss function" >}}
A loss function $L$ is a mapping from $\Theta \times \mathcal{A}$ to $\mathbb{R}_+$ so that $L(\theta, a)$ is the cost of selection action $a$ for the parameter $\theta$.
{{< /notice >}}

A common loss function is $L(\theta, a) = (\theta - a)^2$.

## Risk

In order to evaluate the quality of the decision function, $\delta$, we use *risk*.
We take all possible actions in account and compute their average loss.

{{< notice "definition" "Risk" >}}
The risk $R$ is the expectation of the loss function $L$ over all observations.
$$R(\theta, \delta) = \mathbb{E}_\theta (L(\theta, \delta(X)))$$
{{< /notice >}}

{{< notice "tip" "Expected value" >}}
{{< markdown >}}
For discrete distributions, the expected value is the weighted average of the possible outcomes.
Let $x_1, \ldots, x_n$ be the possible outcomes and $p_1, \ldots, p_n$ the corresponding probabilities.
$$
\mathbb{E}(X) = \sum_{i = 1}^n x_i p_i
$$

For continuous probability densities, the expected value can be computed using an integral.
$$
\mathbb{E}(X) = \int_{-\infty}^{\infty} x p_\theta(x) \; \mathrm{d} x
$$
{{< /markdown >}}
{{< /notice >}}

## Notions of statistic

Let $P_\theta$ be a probability distribution that depends on some unknown parameter $\theta \in \Theta$ with $\Theta \subset \mathbb{R}^d$ for some finite $d$.
We assume that $P_\theta$ is dominates, which means that it has a density function $p_\theta$.
We denote by $X = (X_1, \ldots, X_n)$ a sequence of $n$ i.i.d. samples from $P_\theta$, and by $x = (x_1, \ldots, x_n)$ the values taken by $X$.

{{< notice "definition" "Statistic" >}}
A statistic is any function $T$ of the observations $x$ only. It does not depend on $\theta$.
{{< /notice >}}

Some statistics are better than other.
There may be statistics that do not provide any information at all (free statistics) or statistics that provide all the information possible (sufficient statistic).

{{< notice "definition" "Free statistic" >}}
A statistic $T$ is free if the distribution of $T(X)$ is independent of $\theta$.
{{< /notice >}}

{{< notice "example" "Free statistic" >}}
Let $X_1, X_2 \sim \mathcal{N}(0, 1)$ and $T(x) = x_1 - x_2$.
Then, $T(X) = X_1 - X_2 \implies T(X) \sim \mathcal{N}(0, 2)$.
Since $T(X)$ does not depend on $\theta$ at all, $T$ does not give any information about $\theta$.
Hence, it is free.
{{< /notice >}}

{{< notice "definition" "Sufficient statistic" >}}
{{< markdown >}}
A statistic $T$ is sufficient if the distribution of $X$ given $T(X)$ is independent of $\theta$.
{{< /markdown >}}
{{< /notice >}}

In other words, this means that the information that $T(X)$ gives is all the information that $X$ provides.

{{< notice "example" "Sufficient statistic #1" >}}
{{< markdown >}}

Let $X \sim \mathcal{N}(\mu, \sigma^2)$. Suppose we know $\sigma^2$ but not $\mu$.
The sample mean, $T_1(x) = \frac{1}{n} \sum_{i = 1}^n x_i$, is a sufficient statistic because no further information about $\mu$ can be obtained from $X$.

On the other hand, the sample median, $T_2(X)$, is not a sufficient statistic, since knowing $X$ itself would provide more information about $\mu$.

{{< /markdown >}}
{{< /notice >}}

Unfortunately, it is not always obvious whether a statistic is sufficient.
The following theorem shows a criterion that helps us identify sufficient statistics.

{{< notice "theorem" "Fisher Factorization Theorem" >}}
A statistic $T$ is sufficient if and only if there exist some functions $g_\theta$ and $h$ (independent of $\theta$) such that
$$
\forall x, \qquad p_\theta(x) = g_\theta(T(x)) h(x)
$$
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

In the Bernoulli model $\mathcal{P} = \{ P_\theta \sim \mathcal{B}(\theta), \theta \in [0, 1] \}$ the statistic $T(x) = \sum_{i = 1}^n x_i$ is sufficient.

For a single experiment, $p_\theta(x) = \theta^x (1 - \theta)^{1 - x}$.
Since $X_1, \ldots, X_n$ are independent, then their joined density function is
$$
\begin{align*}
p_\theta(x) &= p_\theta(x_1) p_\theta(x_2) \ldots p_\theta(x_n) \\
&= \prod_{i = 1}^n \theta^{x_i} (1 - \theta)^{1 - x_i} \\
&= \left( \prod_{i = 1}^n \theta^{x_i} \right) \left( \prod_{i = 1}^n (1 - \theta)^{1 - x_i} \right) \\
&= \theta^{\sum_{i = 1}^n x_i} (1 - \theta)^{n - \sum_{i = 1}^n x_i}
\end{align*}
$$

So, if we have $g_\theta(t) = \theta^t (1 - \theta)^{n - t}$ and $h(x) = 1$, $p_\theta(x) = g_\theta(T(x)) h(x)$.
Thus, $T(X)$ is sufficient.
{{< /markdown >}}
{{< /notice >}}

## Entropy

We can use entropy to measure the amount of information in $X$.

{{< notice "definition" "Entropy" >}}
{{< markdown >}}

The entropy of the random variable $X$ is
$$
H(X) = - \int_{-\infty}^{\infty} p(x) \log{p(x)} \; \mathrm{d}x = - \mathbb{E}(\log{p(x)}).
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

The entropy of a Bernoulli random variable $X \sim \mathcal{B}(\theta)$ is:

$$
\begin{align*}
H(X) &= - \sum_{x = 0}^1 p_\theta(x) \log{p_\theta(x)} \\
&= - \theta^0 (1 - \theta)^{1 - 0} \log{(\theta^0 (1 - \theta)^{1 - 0})} - \theta^1 (1 - \theta)^{1 - 1} \log{(\theta^1 (1 - \theta)^{1 - 1})} \\
&= - (1 - \theta) \log{(1 - \theta)} - \theta \log{\theta}
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

In general, for two random variables $X$, $Y$ with joint probability density function $p(x, y)$, the entropy of the distribution $Y$ given $X = x$, denoted by $p(y \vert x)$, expected over the distribution of $X$ is:

$$
\begin{align*}
H(Y \vert X) &= \int p(x) H(Y \vert X = x) \; \mathrm{d} x \\
&= - \int p(x) \left( \int p(y \vert x) \log{p(y \vert x)} \; \mathrm{d} y \right) \; \mathrm{d} x
\end{align*}
$$

Note, here, that $p(x) p(y \vert x)$ is equal to $p(x, y)$.
Then,

$$
\begin{align*}
H(Y \vert X) &= - \int p(x, y) \log{p(y \vert x)} \; \mathrm{d} x \, \mathrm{d} y \\
&= - \mathbb{E}(\log{p(Y \vert X)})
\end{align*}
$$

{{< notice "info" "Chain rule" >}}
{{< markdown >}}

For any random variables $X_1, \ldots, X_n$ (not necessarily independent),

$$
H(X_1, \ldots, X_n) = H(X_1) + H(X_2 \vert X_1) + \ldots + H(X_n \vert X_1, \ldots, X_{n - 1})
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" >}}
{{< markdown >}}

If $X$ and $Y$ are independent, then $H(Y \vert X) = H(Y)$.
This means that

$$
H(X, Y) = H(X) + H(Y)
$$

{{< /markdown >}}
{{< /notice >}}

An important consequence of the chain rule is that a statistic cannot contain more information than the original data.

We now introduce a notion of information gap between two probability distributions $P$, $Q$ related to entropy.

{{< notice "theorem" "Kullback-Leibler divergence" >}}
{{< markdown >}}

The Kullback-Leibler divergence between $P$ and $Q$ is defined by:

$$
D(P \Vert Q) = \int p(x) \log{\left( \frac{p(x)}{q(x)} \right)} \; \mathrm{d} x = \mathbb{E}\left( \log{\frac{p(X)}{q(X)}} \right)
$$

with $X \sim P$.
In this case, $\log{\frac{p(X)}{q(X)}}$ plays the role of $X$.

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

The Kullback-Leibler divergence between two Bernoulli distributions, $P \sim \mathcal{B}(p)$ and $Q \sim \mathcal{B}(q)$, is:

$$
\begin{align*}
D(P \Vert Q) &= \mathbb{E}\left( \log{\frac{p^x (1 - p)^{1 - x}}{q^x (1 - q)^{1 - x}}} \right) \\
&= \log{\frac{p^0 (1 - p)^{1 - 0}}{q^0 (1 - q)^{1 - 0}}} p^0 (1 - p)^{1 - 0} + \log{\frac{p^1 (1 - p)^{1 - 1}}{q^1 (1 - q)^{1 - 1}}} p^1 (1 - p)^{1 - 1} \\
&= (1 - p) \log{\frac{1 - p}{1 - q}} + p \log{\frac{p}{q}} \\
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "info" >}}
{{< markdown >}}

$D(P \Vert Q) \geq 0$ for every $P$ and $Q$.
Particularly, $D(P \Vert Q) = 0$ if and only if $P = Q$.

{{< /markdown >}}
{{< /notice >}}

## Fisher information

The Fisher information quantifies the information on $\theta$ contained in $X$ when $X \sim P_\theta$.
Its standard notation is $I(\theta)$ or $I_X(\theta)$.

There are some conditions for the existence of $I(\theta)$:

1. $\frac{\partial \log{p_\theta}}{\partial \theta}$ exists,
2. The support of $p_\theta$ is independent of $\theta$,
3. $\mathbb{E}(X)$ and $\frac{\partial p_\theta}{\partial \theta}$ are inversible.

### Scalar case

We first consider the scalar case $\Theta \subset \mathbb{R}$.

{{< notice "definition" "Score" >}}
The score of $X$ is defined by
$$
S(X) = \frac{\partial \log{p_\theta}}{\partial \theta}.
$$
{{< /notice >}}

{{< notice "definition" "Fisher information" >}}
The Fisher information of $\theta$ is the variance of the score of $X$.

$$
I(\theta) = \mathrm{Var} \left( \frac{\partial \log{p_\theta}}{\partial \theta} \right).
$$
{{< /notice >}}

{{< notice "tip" "Variance" >}}
{{< markdown >}}
$$
\mathrm{Var}(X) = \mathbb{E}[(X - \mathbb{E}(X))^2] = \mathbb{E}(X^2) - \mathbb{E}^2(X)
$$

Since $\mathbb{E}(S(X)) = 0$, we can simplify $I(\theta)$ to
$$
I(\theta) = \mathbb{E}(S^2(X))
$$

We can also say that the Fisher information is the opposite of the curvature of the log-likelihood:
$$
I(\theta) = - \mathbb{E}\left( \frac{\partial^2 \log{p_\theta(X)}}{\partial \theta^2} \right).
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "example" >}}
{{< markdown >}}

For a Bernoulli random variable $X \sim \mathcal{B}(\theta)$ with $\theta \in (0, 1)$, we have:

$$
\begin{align*}
S(X) &= \frac{\partial}{\partial \theta} \log{(\theta^X (1 - \theta)^{1 - X})} \\
&= \frac{\partial}{\partial \theta} X \log{\theta} + (1 - X) \log{(1 - \theta)} \\
&= \frac{X}{\theta} - \frac{1 - X}{1 - \theta} = \frac{X - \theta}{\theta(1 - \theta)}
\end{align*}
$$

Then,
$$
\begin{align*}
I(\theta) &= \mathbb{E}(S^2(X)) \\
&= (1 - \theta) S^2(0) + \theta S^2(1) \\
&= (1 - \theta) \left(- \frac{1}{1 - \theta} \right)^2 + \theta \left( \frac{1}{\theta} \right)^2 \\
&= \frac{1}{1 - \theta} + \frac{1}{\theta} = \frac{1}{\theta (1 - \theta)}
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

Now, let for two random variables $X$, $Y$ with joint probability density function $p_\theta(x, y)$.
We define the notion of Fisher information of $Y$ given $X$ on $\theta$ by:

$$
\begin{align*}
I_{Y \vert X}(\theta) &= \int p_\theta(x) \mathrm{Var}\left( \frac{\partial \log{p_\theta(Y \vert X = x)}}{\partial \theta} \right) \; \mathrm{d} x \\
&= \mathbb{E}\left[ \left( \frac{\partial \log{p_\theta(Y \vert X)}}{\partial \theta} \right)^2 \right]
\end{align*}
$$

Observe that $I_{Y \vert X}(\theta) = I_Y(\theta)$ if $X$ and $Y$ are independent.

{{< notice "info" "Chain rule" >}}
{{< markdown >}}

For any random variables $X_1, \ldots, X_n$ (not necessarily independent),

$$
I_{X_1, \ldots, X_n}(\theta) = I_{X_1}(\theta) + I_{X_2 \vert X_1}(\theta) + \ldots + I_{X_n \vert X_1, \ldots, X_{n - 1}}(\theta).
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" "Data processing inequality" >}}
{{< markdown >}}

For any statistic $T$,

$$
\begin{align*}
H(T(X)) &\leq H(X) \\
I_{T(X)}(\theta) &\leq I_X(\theta) \quad \forall \theta \in \Theta
\end{align*}
$$

{{< /markdown >}}
{{< /notice >}}

Observe that $0 \leq I_{T(X)}(\theta) \leq I_X(\theta)$ with:

- $I_{T(X)}(\theta) = 0$ if $T$ is free,
- $I_{T(X)}(\theta) = I_X(\theta)$ if $T$ is sufficient (by the chain rule).

{{< notice "note" "Entropy and Fisher information" >}}
{{< markdown >}}

The link between both notions of information is provided by the following result:

$$
\forall h, \quad D(P_\theta \Vert P_{\theta + h}) = \frac{1}{2} I(\theta) h^2 + o(h^2).
$$

{{< /markdown >}}
{{< /notice >}}

### Vectorial case

When $\theta$ is a vector, that is $\Theta \subset \mathbb{R}^d$, the score is the gradient and the Fisher information becomes a matrix.

{{< notice "definition" "Score" >}}
The score of $X$ is defined by
$$
S(X) = \nabla_\theta \log{p_\theta(X)}
$$
{{< /notice >}}

{{< notice "definition" "Fisher information" >}}
The Fisher information of $\theta$ is the covariance matrix of the score.

$$
I(\theta) = \mathrm{Cov} (\nabla_\theta \log{p_\theta(X)})
$$
{{< /notice >}}

The score is a centered, $\mathbb{E}(S(X)) = 0$, so that the Fisher information matrix can be written:
$$
I(\theta) = \mathrm{Cov}(S(X)) = \mathbb{E}(S(X) S(X)^T).
$$

The chain rule and the data processing inequality hold.
The link with entropy is given by:
$$
\forall h, \quad D(P_\theta \Vert P_{\theta + h}) = \frac{1}{2} h^T I(\theta) h + o(\Vert h \Vert^2).
$$

## Exercises

1. (Identifiability) For any $\theta = (\theta_1, \theta_2) \in \mathbb{R}^2$, let $X \sim \mathcal{N}(\theta_1 \lor \theta_2, 1)$ and $Y \sim \mathcal{N}(\theta_1 \land \theta_2, 1)$ be independent random variables. We denote by $P_\theta$ the probability distribution of $(X, Y)$.

    (a) Explain why the corresponding statistical model is parametric.

    (b) Is this model identifiable?

    {{< spoiler "Show answer" >}}

    (a) The model is parametric because it is defined by the parameter $\theta$. <br>

    (b) Suppose $X \sim \mathcal{N}(\theta_1 \lor \theta_2, 1)$ and $Y \sim \mathcal{N}(\theta_1 \land \theta_2, 1)$.
    Then, $\mathbb{E}(X) = \theta_1 \lor \theta_2$ and $\mathbb{E}(Y) = \theta_1 \land \theta_2$.
    However, we will never be able to distinguish between $\theta_1$ and $\theta_2$.
    We can have both $\theta = (\theta_1, \theta_2) \in \mathbb{R}^2$ or $\theta = (\theta_2, \theta_1) \in \mathbb{R}^2$.

    {{< /spoiler >}}

2. (Statistics) Let $X = (X_1, X_2)$ where $X_1, X_2 \sim \mathcal{N}(\theta, 1)$ are independent random variables, with $\theta \in \mathbb{R}$ some unknown parameter.

    (a) Show that $T(X) = X_1 - X_2$ is a free statistic.

    (b) Show that $T(X) = X_1 + X_2$ is a sufficient statistic.

    {{< spoiler "Show answer" >}}
    (a) Let $T(X) = X_1 - X_2$.
    $$
    \mathbb{E}(T(X)) = \mathbb{E}(X_1 - X_2) = \mathbb{E}(X_1) - \mathbb{E}(X_2) = \theta - \theta = 0
    $$
    $$
    \mathrm{Var}(T(X)) = \mathrm{Var}(X_1 - X_2) = \mathrm{Var}(X_1) + \mathrm{Var}(X_2) = 1 + 1 = 2
    $$
    So, we can say that $T(X) \sim \mathcal{N}(0, 2)$. Hence, it is a free statistic. <br>

    (b) Let $T(X) = X_1 + X_2$.
    $$
    \begin{align*}
    p_\theta(x) &= \frac{1}{2 \pi} e^{- \frac{(x_1 - \theta)^2}{2} - \frac{((x_2 - \theta))^2}{2}} \\
    &= \frac{1}{2 \pi} e^{- \frac{1}{2} (x_1^2 - 2 x_1 \theta + \theta^2 + x_2^2 - 2 x_2 \theta + \theta^2)} \\
    &= \frac{1}{2 \pi} e^{x_1 \theta + x_2 \theta - \theta^2 - \frac{1}{2} (x_1^2 + x_2^2)} \\
    &= \frac{1}{2 \pi} e^{\theta (x_1 + x_2 - \theta) - \frac{x_1^2 + x_2^2}{2}} \\
    \end{align*}
    $$
    Then, let $g_\theta(t) = \frac{1}{2 \pi} e^{\theta (t - \theta)}$ and $h(x) = e^{- \frac{1}{2} (x_1^2 + x_2^2)}$.
    This means that $p_\theta(x) = g_\theta(T(x)) h(x)$. By the Fisher factorization theorem, $T$ is sufficient.
    {{< /spoiler >}}

3. (Statistics) Let $X = (X_1, X_2)$ where $X_1, X_2$ are independent random variables, uniformly distributed over $(0, \theta)$ some unknown parameter $\theta > 0$.

    (a) Show that $T(X) = \max{(X_1, X_2)}$ is a sufficient statistic.

    (b) Is $T(X) = X_1 + X_2$ a free statistic? A sufficient statistic?

    {{< spoiler "Show answer" >}}
    (a) Note that the distribution of $\min{(X_1, X_2)}$ given $T(X) = t$ is uniform in the interval $(0, t)$. Then, $\mathbb{P}[X = (\min{(X_1, X_2}), t)] = \mathbb{P}[X = (t, \min{(X_1, X_2)})] = \frac{1}{2}$. Since the probability of $X$ given $T(X)$ does not depend of $\theta$, $T$ is a sufficient statistic. <br>

    (b) Clearly, the distribution of $T(X) = X_1 + X_2$ is uniform in the interval $(0, 2 \theta)$. Since the distribution of $T$ depends on $\theta$, $T$ is not free.
    Also, the probability distribution of $X$ given $T(X) = t$ is uniform in the interval $(t - \theta, \theta)$, which still depends of $\theta$. Thus, $T$ is not sufficient.
    {{< /spoiler >}}

4. (Entropy, Fisher information) Let $X \sim \mathcal{N}(\theta, \sigma^2)$ where $\theta \in \mathbb{R}$ is some unknown parameter.

    (a) Compute the entropy $H(X)$.

    (b) Compute the Fisher information $I_X(\theta)$.

    (c) Interpret the results.

    {{< spoiler "Show answer" >}}
    (a) Since $H(X) = - \mathbb{E}[\log{p}]$, we have
    $$
    \begin{align*}
    H(X) &= - \mathbb{E}\left[ \log{\left( \frac{1}{\sigma \sqrt{2 \pi}} \right)} - \frac{(x - \theta)^2}{2 \sigma^2} \right] \\
    &= \log{(\sigma \sqrt{2 \pi})} + \frac{1}{2 \sigma^2} \underbrace{\mathbb{E}[(x - \theta)^2]}_{\mathrm{Var}(X)} \\
    &= \log{(\sigma \sqrt{2 \pi})} + \frac{1}{2 \sigma^2} \sigma^2 \\
    &= \frac{1}{2} + \log{(\sigma \sqrt{2 \pi})}
    \end{align*}
    $$

    (b) First, let us compute the score $S(X)$.
    $$
    \frac{\partial \log{p}}{\partial \theta} = \frac{\partial}{\partial \theta}\left[ - \log{(\sigma \sqrt{2 \pi})} - \frac{(x - \theta)^2}{2 \sigma^2} \right] = \frac{x - \theta}{\sigma^2}
    $$
    Now, we can find $I_X(\theta)$ as:
    $$
    I_X(\theta) = \mathbb{E}[S^2(X)] = \frac{1}{\sigma^4} \mathbb{E}[(x - \theta)^2] = \sigma^{-2}.
    $$

    (c) Both the entropy and the Fisher information do not depend on $\theta$. While the entropy increases with $\sigma$, the Fisher information decreases with $\sigma$ (more randomness = less information about $\theta$).
    {{< /spoiler >}}

5. (Entropy, data processing inequality) Let $X = (X_1, X_2)$ where $X_1$, $X_2$ are independent Bernoulli random variables with parameter $\frac{1}{2}$.

    (a) Compute $H(X)$.

    (b) Compute $H(T(X))$ with $T(X) = X_1 + X_2$.

    (c) Check the data processing inequality.

    {{< spoiler "Show answer" >}}
    (a) We consider the log base 2.
    $$
    \begin{align*}
    H(X_i) &= - \mathbb{E}[\log{p}] \\
    &= - \mathbb{E}[X \log{2^{-1}} + (1 - X) \log{1 - 2^{-1}}] \\
    &= \mathbb{E}[X + (1 - X)] = 1 \\
    \implies H(X) &= H(X_1) + H(X_2) = 1 + 1 = 2
    \end{align*}
    $$

    (b) We can calculate the entropy with the discrete formula.
    $$
    \begin{align*}
    H(T(X)) &= - \mathbb{E}[\log{p_T(X)}] \\
    &= - \sum_{i = 0}^2 \mathbb{P}[T(X) = i] \log{(\mathbb{P}[T(X) = i])} \\
    &= - [ 2^{-2} \log{2^{-2}} + 2^{-1} \log{2^{-1}} + 2^{-2} \log{2^{-2}} ] \\
    &= 2^{-1} + 2^{-1} + 2^{-1} \\
    &= \frac{3}{2}
    \end{align*}
    $$

    (c) Indeed,
    $$
    H(T(X)) \leq H(X) \quad \text{since} \quad \frac{3}{2} \leq 2.
    $$
    {{< /spoiler >}}

6. (Data processing inequality, sufficiency) Let $X = (X_1, \ldots, X_n)$ where $X_1, \ldots, X_n$ are i.i.d. Bernoulli random variables with parameter $\theta$. Let $T(x) = x_1 + \ldots + x_n$ for any $x \in \mathbb{R}^n$.

    (a) Compute $I_X(\theta)$ and $I_{T(X)}(\theta)$.

    (b) Check the data processing inequality.

    (c) Is $T$ a sufficient statistic for $X$?

    {{< spoiler "Show answer" >}}
    (a) Since $X_1, \ldots, X_n$ are independent, then
    $$
        I_X(\theta) = n I_{X_1}(\theta) = \frac{n}{\theta (1 - \theta)}.
    $$
        $T(x) = x_1 + \ldots + x_n \implies T(X) \sim \mathcal{B}(n, \theta) \implies p_\theta(t) = \binom{n}{t} \theta^t (1 - \theta)^{n - t}$
    $$
        S(T) = \frac{T}{\theta} - \frac{n - T}{1 - \theta} = \frac{T}{\theta (1 - \theta)} - \frac{n}{1 - \theta}
    $$
    $$
        \implies I_{T(X)}(\theta) = \frac{n}{\theta (1 - \theta)}
    $$

    (b) Indeed,
    $$
        \frac{n}{\theta (1 - \theta)} \leq \frac{n}{\theta (1 - \theta)}.
    $$

    (c) Yes, because $I_X(\theta) = I_{T(X)}(\theta)$.
    {{< /spoiler >}}

7. (Fisher information and Kullback-Leibler divergence) Let $X \sim \mathcal{N}(\theta, \sigma^2)$ where the variance $\sigma^2$ is known. Denote by $P_\theta$ the corresponding probability distribution.

    (a) Compute the Kullback-Leibler divergence $D(P_\theta \Vert P_{\theta + h})$ for any $h \in \mathbb{R}$.

    (b) Compute the Fisher information $I_X(\theta)$.

    (c) Check the behaviour of $D(P_\theta \Vert P_{\theta + h})$ when $h \to 0$.

    {{< spoiler "Show answer" >}}
    (a)
    $$
    D(P_\theta \Vert P_{\theta + h}) = \mathbb{E}\left[ \log{\frac{p_\theta(X)}{p_{\theta + h}(X)}} \right]
    $$
    Let us calculate $\log{\frac{p_\theta(X)}{p_{\theta + h}(X)}}$.
    $$
    \begin{align*}
        \log{\frac{p_\theta(X)}{p_{\theta + h}(X)}} &= - \frac{(x - \theta)^2}{2 \sigma^2} - \left( - \frac{(x - (\theta + h))^2}{2 \sigma^2} \right) \\
        &= \frac{1}{2 \sigma^2} \left[ - (x^2 - 2 x \theta + \theta^2) + x^2 - 2 x (\theta + h) + (\theta + h)^2 \right] \\
        &= \frac{1}{2 \sigma^2} \left[ 2 x \theta - \theta^2 - 2 x \theta - 2 x h + (\theta^2 + 2 \theta h + h^2) \right] \\
        &= \frac{1}{2 \sigma^2} \left[ h^2 - 2 x h + 2 \theta h \right] \\
        &= \frac{h}{2 \sigma^2} \left( h + 2 \theta - 2 x \right)
    \end{align*}
    $$
    Now, we can compute $D(P_\theta \Vert P_{\theta + h})$.
    $$
    \begin{align*}
    D(P_\theta \Vert P_{\theta + h}) &= \mathbb{E}\left[ \frac{h}{2 \sigma^2} \left( h + 2 \theta - 2 x \right) \right] \\
    &= \frac{h}{2 \sigma^2} \left( h + 2 \theta - 2 \mathbb{E}[X] \right) \\
    &= \frac{h}{2 \sigma^2} \left( h + 2 \theta - 2 \theta \right) \\
    &= \frac{h^2}{2 \sigma^2}.
    \end{align*}
    $$

    (b) First, let us compute the score $S(X)$.
    $$
    S(X) = \frac{\partial}{\partial \theta}\left[ - \log{(\sigma \sqrt{2 \pi})} - \frac{(x - \theta)^2}{2 \sigma^2} \right] = \frac{x - \theta}{\sigma^2}
    $$
    Then,
    $$
    I_X(\theta) = \mathbb{E}[S^2(X)] = \sigma^{-2}.
    $$

    (c)
    $$
    \lim_{h \to 0} D(P_\theta \Vert P_{\theta + h}) = \lim_{h \to 0} \frac{h^2}{2 \sigma^2} = 0.
    $$
    {{< /spoiler >}}

8. (Independent random variables) Let $X = (X_1, \ldots, X_n)$ and $Y = (Y_1, \ldots, Y_n)$ where $X_k \sim \mathcal{N}(\cos{(k \theta)}, 1)$ and $Y_k \sim \mathcal{N}(\sin{(k \theta)}, 1)$, $k = 1, \ldots, n$, are independent variables.

    (a) Compute the Fisher informations $I_X(\theta)$ and $I_Y(\theta)$.

    (b) Deduce the Fisher information $I_{X, Y}(\theta)$.

    {{< spoiler "Show answer" >}}
    (a) Since all $X$ and $Y$ independent variables, we have
    $$
    \begin{align*}
    I_X(\theta) &= \sum_{k = 1}^n I_{X_k}(\theta) \\
    I_Y(\theta) &= \sum_{k = 1}^n I_{Y_k}(\theta)
    \end{align*}
    $$
    Let us calculate $I_{X_k}(\theta)$.
    $$
    \begin{align*}
    S(X_k) &= \frac{\partial}{\partial \theta}\left[ - \log{(\sigma \sqrt{2 \pi})} - \frac{(x - \cos{(k \theta)})^2}{2} \right] = - k \sin{(k \theta)} (x - \cos{(k \theta)}) \\
    \implies I_{X_k}(\theta) &= \mathbb{E}[S(X_k)^2] = k^2 \sin^2{(k \theta)} \mathbb{E}[(x - \cos{(k \theta)})^2] = k^2 \sin^2{(k \theta)}.
    \end{align*}
    $$
    Similarly, $I_{Y_k}(\theta) = k^2 \cos^2{(k \theta)}$.
    Thus,
    $$
    \begin{align*}
    I_X(\theta) &= \sum_{k = 1}^n k^2 \sin^2{(k \theta)} \\
    I_Y(\theta) &= \sum_{k = 1}^n k^2 \cos^2{(k \theta)}
    \end{align*}
    $$
    (b) Since $X$ and $Y$ are independent, we have
    $$
    I_{X, Y}(\theta) = I_X(\theta) + I_Y(\theta) = \sum_{k = 1}^n k^2 = \frac{n (n + 1) (2n + 1)}{6}
    $$
    {{< /spoiler >}}

9. (Fisher information matrix) For any $\theta = (\theta_1, \theta_2) \in \mathbb{R}^2$, let $Y_1 \sim \mathcal{N}(\theta_1, 1)$, $Y_2 \sim \mathcal{N}(\theta_2, 1)$ be independent random variables. Let $X = (X_1, X_2) \sim P_\theta$ with $X_1 = 2Y_1 + Y_2$, $X_2 = Y_1 + Y_2$.

    (a) Show that the model is identifiable.

    (b) Compute the Fisher information matrix $I_X(\theta)$.

    (c) Deduce the behavior of $D(P_\theta \Vert P_{\theta + h})$ when $h \to 0$.

    {{< spoiler "Show answer" >}}
    (a) Since $X_1$ and $X_2$ are linearly independent, we can say that the model $X$ is identifiable. <br>

    (b) We can say that $X \sim \mathcal{N}(\mu, \Gamma)$ where $\mu$ is the mean vector and $\Gamma$ is the covariance matrix.
    $$
    \begin{align*}
    \mu &= \begin{pmatrix}
        2 \theta_1 + \theta_2 \\
        \theta_1 + \theta_2
    \end{pmatrix} \\
    \Gamma &= \begin{pmatrix}
    \mathrm{Cov}(X_1, X_1) & \mathrm{Cov}(X_1, X_2) \\
    \mathrm{Cov}(X_2, X_1) & \mathrm{Cov}(X_2, X_2)
    \end{pmatrix}
    \end{align*}
    $$
    where
    $$
    \begin{align*}
    \mathrm{Cov}(X_1, X_1) &= \mathrm{Cov}(2 Y_1 + Y_2, 2 Y_1 + Y_2) = 5 \\
    \mathrm{Cov}(X_1, X_2) &= \mathrm{Cov}(X_2, X_1) = \mathrm{Cov}(Y_1 + Y_2, 2 Y_1 + Y_2) = 3 \\
    \mathrm{Cov}(X_2, X_2) &= \mathrm{Cov}(Y_1 + Y_2, Y_1 + Y_2) = 2 \\
    \implies \Gamma &= \begin{pmatrix}
    5 & 3 \\
    3 & 2
    \end{pmatrix}
    \end{align*}
    $$
    We can, now, write the probability distribution of $X$:
    $$
    p_\theta(\mathbf{x}) = \frac{1}{\sqrt{(2 \pi)^2 \det{\Gamma}}} e^{-\frac{1}{2} (\mathbf{x} - \mu)^\top \Gamma^{-1} (\mathbf{x} - \mu)}
    $$
    Then, we compute the score $S(X)$:
    $$
    \begin{align*}
    S(X) &= \nabla_\theta \log{p_\theta(X)} \\
    &= \nabla_\theta \left( - \log{2 \pi} - \frac{1}{2} (\mathbf{x} - \mu)^\top \Gamma^{-1} (\mathbf{x} - \mu) \right) \\
    &= - \frac{1}{2} \nabla_\theta ((\mathbf{x} - \mu)^\top \Gamma^{-1} (\mathbf{x} - \mu) ) \\
    &= - \frac{1}{2} \nabla_\theta (\mathbf{x} - \mu)^\top \Gamma^{-1} (\mathbf{x} - \mu) + (\mathbf{x} - \mu)^\top \Gamma^{-1} \nabla_\theta (\mathbf{x} - \mu) \\
    &= - \frac{1}{2} (- \nabla_\theta \mu)^\top \Gamma^{-1} (\mathbf{x} - \mu) + (\mathbf{x} - \mu)^\top \Gamma^{-1} ( - \nabla_\theta \mu ) \\
    &= (\mathbf{x} - \mu)^\top \Gamma^{-1} ( \nabla_\theta \mu )
    \end{align*}
    $$

    Now, we are able to find $I_X(\theta)$.
    $$
    \begin{align*}
    I_X(\theta) &= \mathbb{E}[S(X) S(X)^\top] \\
    &= \mathbb{E}[ (\mathbf{x} - \mu)^\top \Gamma^{-1} (\nabla_\theta \mu) (\nabla_\theta \mu)^\top \Gamma^{-1} (\mathbf{x} - \mu) ] \\
    \end{align*}
    $$
    {{< /spoiler >}}
