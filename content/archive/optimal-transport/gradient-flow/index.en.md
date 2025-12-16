+++
title = "Wasserstein Gradient Flows and Diffusion Models"
date = 2025-11-19
+++


{{< warning >}}
This is a very preliminary set of notes.
I have no idea about what is going on here.
{{< /warning >}}

Using the [Dynamical formuation of OT]({{< ref "archive/optimal-transport/dynamic-ot" >}}), we were able to translate the dynamics of $\alpha_t \in \mathcal{P}(\R^d)$ to the Lagrangian $\dot{x} = v_t(x)$ speed formulation.
Our goal is to solve a general minimization problem
$$
\inf_\alpha f(\alpha),
$$
where $\alpha$ is any measure.
Our goal here is to "generalize" the optimization of functions within densities.

## Discrete particles

Before thinking about minimizations, let us model the motion of particles.
We consider particles $x$ that move in time.
The initial position $x(0)$ is mapped to $x(t)$ by a transport $T_t : x(0) \mapsto x(t)$.
If $\alpha_t$ is the density of the particles at time $t$, we know that $\alpha_t = (T_t)_\# \alpha_0$.
In the "Lagrangian" way, we can simply say that the particles move according to a velocity field $v_t(x)$:
$$
\frac{\d x(t)}{\d t} = v_t (x(t)).
$$

### Particle descent
Let $X(t) = (x_1(t), \ldots, x_n(t))$.
Then we have
$$
\alpha_t = \frac{1}{n} \sum_i \delta_{x_i(t)}.
$$
and
$$
g(X) = f \left(\frac{1}{n} \sum_i \delta_{x_i(t)} \right).
$$
If these, we can model
$$
\dot{X} = - \nabla g(X).
$$

{{< example >}}
If $g(X) = \frac{1}{n^2} \sum_{ij} k(x_i, x_j)$, one can say that
$$
f(\alpha) = \iint k(x_1, x_2) \, \d \alpha(x_1) \, \d \alpha(x_2).
$$
{{< /example >}}

## JKO Method (Jordan-Kinderlehrer-Otto)

Using the Implicit Euler Method, given $\tau > 0$ a step size, we have
$$
\alpha_{t + \tau} = \argmin_\alpha \frac{1}{2 \tau} \W_2^2 (\alpha_t, \alpha) + f(\alpha).
$$

For a single particle, we have the following two formulations.
$$
\begin{aligned}
\text{Forward Euler} \qquad x_{t + \tau} &= (\mathrm{Id} - \tau \nabla g) (x_t) \\
\text{Backward Euler} \qquad x_{t + \tau} &= (\mathrm{Id} - \tau \nabla g)^{-1} (x_{t + \tau}) \\
\end{aligned}
$$

When $\tau \to 0$, assume $(\alpha_t)_t$ converging to $t \in \R^+ \to \alpha_t$.
Thus, this leads us to a PDE
$$
\partial_t v_t + \mathrm{div}(\alpha_t v_t) = 0.
$$

{{< definition "Vertical derivative $\delta f$" >}}
The vertical derivative, denoted $\delta f (\alpha)$, is a **scalar function**, i.e., $\delta f (\alpha) \in \mathcal{C}$ such that $\delta f(\alpha)(x) \in \R$.
Take $\beta \in \mathcal{P}(\R^d)$, and $\gamma - \beta - \alpha$ with zero total mass.
If we linearise the convex expansion of $f$ under $\alpha$ and $\beta$, we retrieve $\delta f (\alpha)$.

$$
\begin{aligned}
f(t \beta + (1 - t) \alpha) &= f(\alpha + t \gamma) \\
&= \ldots \\
&= f(\alpha) + t \langle \gamma, \delta f (\alpha) \rangle + o(t) \\
&= f(\alpha) + t \iint (\delta f(\alpha))(x) \, \d \gamma(x) + o(t).
\end{aligned}
$$
{{< /definition >}}


{{< example >}}
Let $f(\alpha) = \int g(x) \, \d \alpha$.
If $\alpha$ is discrete, we have
$$
f(\alpha) = \frac{1}{n} \sum_i g(x_i).
$$
Now, let's compute the expansion.
$$
f(\alpha + t \gamma) = f(\alpha) + t \int g \, \d \gamma + 0 \implies \delta f(\alpha) = g
$$
{{< /example >}}

{{< example >}}
Let $f(\alpha) = \iint k(x, y) \, \d (\alpha + t \gamma)(x) \, \d \alpha(y)$.
Then,
$$
f(\alpha + t \gamma) = f(\alpha) + t \left[ \iint k(x, y) \, \d \alpha(x) \, \d \gamma(y) + \iint k(x, y) \, \d \gamma(x) \, \d \alpha(y) \right] + o(t)
$$
Thus,
$$
\delta f(\alpha)(x) = \int k(x, y) \, \d \alpha(y) + \int k (y, x) \, \d \alpha(y).
$$
{{< /example >}}

{{< example >}}
Let $f(\alpha) = \int U( \rho (x) ) \, \d x$, where $\rho = \frac{\d \alpha}{\d x}$ and $\eta = \frac{\d \gamma}{\d x}$.
Then,
$$
\begin{aligned}
f(\alpha + t \gamma) &= \int U (\rho(x) + t \eta (x)) \, \d x \\
&= \int U(\rho(x)) + t U'(\rho(x)) \eta(x) + o(t) \, \d x \\
&= f(\alpha) + t \int U'(\rho(x)) \eta(x) \, \d \gamma + o(t)
\end{aligned}
$$
Thus,
$$
\delta f(\alpha) = U'(\rho).
$$
If, for example, $U(s) = s \log{s}$, then $\delta f(\alpha) (x) = \log{(\rho(x))}$.
{{< /example >}}

{{< definition "Wasserstein gradient $\nabla_{\W}$" >}}
Also called the **horizontal derivative**, it returns a **vector function**, i.e., $\nabla_{\W} f(\alpha)(x) \in \R^d$.
By definition, it is the regular gradient of the vertical derivative.
$$
\nabla_{\W} f(\alpha)(x) = \nabla [\delta f(\alpha)]
$$
{{< /definition >}}

{{< theorem >}}
If $\alpha_t$ (in the limit of $\tau \to 0$) exists, and the following PDE exists
$$
\partial_t \alpha + \mathrm{div}(\alpha v_t) = 0,
$$
then,
$$
v = - \nabla_{\W} f(\alpha).
$$
{{< /theorem >}}

{{< example "Linear" >}}
$$
f(\alpha) = \int g \, \d \alpha \implies \delta f(\alpha) = g \implies \nabla_{\W} f (\alpha)(x) = \nabla g(x).
$$
By the PDE, we have
$$
\partial_t \alpha = - \mathrm{div}(\alpha \nabla g) \iff \dot{x} = - \nabla g(x).
$$
{{< /example >}}

{{< example "Quadratic" >}}
Let $K$ be a symmetric function.
$$
f(\alpha) = \iint K \, \d (\alpha \otimes \alpha) \implies \delta f(\alpha) = 2 \int K(\cdot, y) \, \d \alpha(y).
$$
So, the Wasserstein gradient is $\nabla_{\W} f(\alpha)(x) = 2 \int \nabla K (\cdot, y) \, \d \alpha(y)$.
By the PDE, and if we assume $\alpha = \frac{1}{n} \sum \delta_{x_i}$, we have
$$
\dot{x}_i (t) = - \frac{2}{n} \sum_j \nabla K (x_i - x_j).
$$
{{< /example >}}

{{< example "Internal" >}}
$$
f(\alpha) = \int U (\rho) \, \d x \implies \delta f(\alpha) = U'(\rho) \implies \nabla_{\W} f(\alpha)(x) = U''(\rho) \nabla \rho.
$$
If $U(x) = x \log{x}$, then $\nabla_{\W} f(\alpha) = \nabla \log{\rho}$, which is the score of the distribution of $\alpha$.
By the PDE, and if we assume $\alpha = \frac{1}{n} \sum \delta_{x_i}$, we have
$$
\partial_t \rho = - \Delta \rho.
$$
{{< /example >}}


## Application: 2-layer MLP
