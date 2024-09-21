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
The parametric model $\mathcal{P}$ is identifiable if the mapping $\theta \mapsto P_\theta$ is a bijection.
{{< /notice >}}

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
