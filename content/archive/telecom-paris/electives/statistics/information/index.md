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

{{< notice "info" "Free statistic" >}}
A statistic $T$ is free if the distribution of $T(X)$ is independent of $\theta$.
{{< /notice >}}

{{< notice "example" "Free statistic" >}}
{{< /notice >}}

{{< notice "info" "Sufficient statistic" >}}
{{< markdown >}}
A statistic $T$ is sufficient if the distribution of $X$ given $T(X)$ is independent of $\theta$.

In other words, this means that the information that $T(X)$ gives is all the information that $X$ provides.
{{< /markdown >}}
{{< /notice >}}

{{< notice "example" "Sufficient statistic #1" >}}
{{< markdown >}}

Let $X \sim \mathcal{N}(\mu, \sigma^2)$. Suppose we know $\sigma^2$ but not $\mu$.
The sample mean, $T_1(x) = \frac{1}{n} \sum_{i = 1}^n x_i$, is a sufficient statistic because no further information about $\mu$ can be obtained from $X$.

On the other hand, the sample median, $T_2(X)$, is not a sufficient statistic, since knowing $X$ itself would provide more information about $\mu$.

{{< /markdown >}}
{{< /notice >}}

Unfortunantely, it is not always obvious

## Exercises

1. (Identifiability) For any $\theta = (\theta_1, \theta_2) \in \mathbb{R}^2$, let $X \sim \mathcal{N}(\theta_1 \lor \theta_2, 1)$ and $Y \sim \mathcal{N}(\theta_1 \land \theta_2, 1)$ be independent random variables. We denote by $P_\theta$ the probability distribution of $(X, Y)$.

    (a) Explain why the corresponding statistical model is parametric.

    (b) Is this model identifiable?

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

2. (Statistics) Let $X = (X_1, X_2)$ where $X_1, X_2 \sim \mathcal{N}(\theta, 1)$ are independent random variables, with $\theta \in \mathbb{R}$ some unknown parameter.

    (a) Show that $T(X) = X_1 - X_2$ is a free statistic.

    (b) Show that $T(X) = X_1 + X_2$ is a sufficient statistic.

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

3. (Statistics) Let $X = (X_1, X_2)$ where $X_1, X_2$ are independent random variables, uniformly distributed over $(0, \theta)$ some unknown parameter $\theta > 0$.

    (a) Show that $T(X) = \max{(X_1, X_2)}$ is a sufficient statistic.

    (b) Is $T(X) = X_1 + X_2$ a free statistic? A sufficient statistic?

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

4. (Entropy, Fisher information) Let $X \sim \mathcal{N}(\mu, \sigma^2)$ where $\theta \in \mathbb{R}$ is some unknown parameter.

    (a) Compute the entropy $H(X)$.

    (b) Compute the Fisher information $I_X(\theta)$.

    (c) Interpret the results.

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

5. (Entropy, data processing inequality) Let $X = (X_1, X_2)$ where $X_1$, $X_2$ are independent Bernoulli random variables with parameter $\frac{1}{2}$.

    (a) Compute $H(X)$.

    (b) Compute $H(T(X))$ with $T(X) = X_1 + X_2$.

    (c) Check the data processing inequality.

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

6. (Data processing inequality, sufficiency) Let $X = (X_1, \ldots, X_n)$ where $X_1, \ldots, X_n$ are i.i.d. Bernoulli random variables with parameter $\theta$. Let $T(x) = x_1 + \ldots + x_n$ for any $x \in \mathbb{R}^n$.

    (a) Compute $I_X(\theta)$ and $I_{T(X)}(\theta)$.

    (b) Check the data processing inequality.

    (c) Is $T$ a sufficient statistic for $X$?

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

7. (Fisher information and Kullback-Leibler divergence) Let $X \sim \mathcal{N}(\theta, \sigma^2)$ where the variance $\sigma^2$ is known. Denote by $P_\theta$ the corresponding probability distribution.

    (a) Compute the Kullback-Leibler divergence $D(P_\theta \Vert P_{\theta + h})$ for any $h \in \mathbb{R}$.

    (b) Compute the Fisher information $I_X(\theta)$.

    (c) Check the behaviour of $D(P_\theta \Vert P_{\theta + h})$ when $h \to 0$.

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

8. (Independent random variables) Let $X = (X_1, \ldots, X_n)$ where $X_k \sim \mathcal{N}(\cos{(k \theta)}, 1)$, $k = 1, \ldots, n$, are independent variables.

    (a) Compute the Fisher informations $I_X(\theta)$ and $I_Y(\theta)$.

    (b) Deduce the Fisher information $I_{X, Y}(\theta)$.

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}

9. (Fisher information matrix) For any $\theta = (\theta_1, \theta_2) \in \mathbb{R}^2$, let $Y_1 \sim \mathcal{N}(\theta_1, 1)$, $Y_2 \sim \mathcal{N}(\theta_2, 1)$ be independent random variables. Let $X = (X_1, X_2) \sim P_\theta$ with $X_1 = 2Y_1 + Y_2$, $X_2 = Y_1 + Y_2$.

    (a) Show that the model is identifiable.

    (b) Compute the Fisher information matrix $I_X(\theta)$.

    (c) Deduce the behaviour of $D(P_\theta \Vert P_{\theta + h})$ when $h \to 0$.

    {{< spoiler "Show answer" >}}
    ...
    {{< /spoiler >}}
