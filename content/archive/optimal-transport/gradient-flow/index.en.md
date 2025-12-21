+++
title = "Wasserstein Gradient Flows and Diffusion Models"
date = 2025-11-19
draft = true
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


## Exercises

1. Exercise 1 ($\phi$-divergences and Wasserstein gradient flow). Let $\nu$ be a reference probability measure on $\mathbb{R}^{d}$ and let $\varphi:\mathbb{R}_{+}\rightarrow\mathbb{R}$ be a convex $\mathcal{C}^{1}$ function with $\varphi(1)=0$. For a probability measure $\alpha$ such that $\alpha\ll\nu$ with density $\rho:=\frac{d\alpha}{d\nu}$ the $\phi$-divergence of $\alpha$ with respect to $\nu$ is defined by
$$D_{\varphi}(\alpha|\nu):=\int_{\mathbb{R}^{d}}\varphi\left(\frac{d\alpha}{d\nu}(x)\right)d\nu(x)=\int_{\mathbb{R}^{d}}\varphi(\rho(x))d\nu(x).$$

**(1)** Show that $D_{\varphi}(\alpha|\nu)\ge0$.

**(2)** Consider the functional $f(\alpha):=D_{\varphi}(\alpha|\nu)$ on $W_{2}(\mathbb{R}^{d})$ Assume that both $\nu$ and $\alpha$ admit smooth strictly positive densities with respect to Lebesgue measure.
**(a)** Compute the first variation $\frac{\delta f}{\delta\alpha}(\alpha)(x)$ and deduce the Wasserstein gradient $\nabla_{W}f(\alpha)(x)$.
**(b)** Write the corresponding Wasserstein gradient flow PDE.
**(c)** Specialize your formulas to the case $\varphi(s)=s \log s$.

{{< spoiler "Solution" >}}
**(1)**
Since $\varphi$ is convex, we can apply Jensen's inequality. Let $X$ be a random variable distributed according to $\nu$. Then:
$$D_{\varphi}(\alpha|\nu) = \mathbb{E}_{\nu}[\varphi(\rho(X))] \ge \varphi(\mathbb{E}_{\nu}[\rho(X)]) $$
Since $\rho = \frac{d\alpha}{d\nu}$, we have $\mathbb{E}_{\nu}[\rho(X)] = \int \frac{d\alpha}{d\nu} d\nu = \int d\alpha = 1$ (since $\alpha$ is a probability measure).
Given $\varphi(1) = 0$, we have:
$$D_{\varphi}(\alpha|\nu) \ge \varphi(1) = 0.$$

**(2a)**
Let the densities with respect to Lebesgue measure be denoted by $\rho_\alpha$ and $\rho_\nu$, so $\rho(x) = \frac{d\alpha}{d\nu}(x) = \frac{\rho_\alpha(x)}{\rho_\nu(x)}$.
The functional is $F(\rho_\alpha) = \int \varphi\left(\frac{\rho_\alpha(x)}{\rho_\nu(x)}\right) \rho_\nu(x) dx$.
To find the first variation, consider a perturbation $\rho_\alpha + \epsilon \eta$.
$$\frac{d}{d\epsilon}\bigg|_{\epsilon=0} \int \varphi\left(\frac{\rho_\alpha + \epsilon \eta}{\rho_\nu}\right) \rho_\nu dx = \int \varphi'\left(\frac{\rho_\alpha}{\rho_\nu}\right) \frac{\eta}{\rho_\nu} \rho_\nu dx = \int \varphi'(\rho(x)) \eta(x) dx.$$
Thus, the first variation ($L^2$ gradient) is:
$$\frac{\delta f}{\delta \alpha}(\alpha)(x) = \varphi'(\rho(x)).$$
The Wasserstein gradient is the spatial gradient of the first variation:
$$\nabla_W f(\alpha)(x) = \nabla_x \left( \frac{\delta f}{\delta \alpha} \right) = \nabla_x (\varphi'(\rho(x))).$$

**(2b)**
The Wasserstein gradient flow equation is the continuity equation with velocity field $v = -\nabla_W f(\alpha)$:
$$\partial_t \rho_\alpha + \nabla \cdot (\rho_\alpha v) = 0 \implies \partial_t \rho_\alpha - \nabla \cdot \left( \rho_\alpha \nabla (\varphi'(\rho)) \right) = 0.$$

**(2c)**
For $\varphi(s) = s \log s$, we have $\varphi'(s) = \log s + 1$.
Substituting $\rho = \frac{\rho_\alpha}{\rho_\nu}$:
$$\nabla_W f = \nabla (\log \rho + 1) = \nabla \log \rho = \frac{\nabla \rho}{\rho} = \frac{\nabla (\rho_\alpha/\rho_\nu)}{\rho_\alpha/\rho_\nu} = \nabla \log \rho_\alpha - \nabla \log \rho_\nu.$$
The PDE becomes:
$$\partial_t \rho_\alpha - \nabla \cdot \left( \rho_\alpha (\nabla \log \rho_\alpha - \nabla \log \rho_\nu) \right) = 0$$
$$\partial_t \rho_\alpha = \nabla \cdot (\nabla \rho_\alpha - \rho_\alpha \nabla \log \rho_\nu) = \Delta \rho_\alpha - \nabla \cdot (\rho_\alpha \nabla \log \rho_\nu).$$
This is the Fokker-Planck equation involving the potential $V = -\log \rho_\nu$. If $\nu$ is the Lebesgue measure ($\rho_\nu = 1$), this reduces to the Heat Equation $\partial_t \rho_\alpha = \Delta \rho_\alpha$.
{{< /spoiler >}}

2. Exercise 2 (Gradient flows of Dirichlet energy and Fisher information).
We denote $\alpha_{t}$ be a family of probability measures on $\mathbb{R}^{d}$ with smooth positive density $\alpha_{t}(dx)=\rho_{t}(x)dx$.

**(1)** Consider the Dirichlet energy $\mathcal{E}(\alpha):=\int_{\mathbb{R}^{d}}|\nabla\rho(x)|^{2}dx$, $\rho=\frac{d\alpha}{dx}$.
**(a)** Compute first variation $\delta f(\alpha)$ and write down the "$L^{2}(dx)$" gradient flow PDE, which is $\partial_{t}\rho_{t}=-\delta f(\alpha_{t})$ i.e. the steepest descent for $\mathcal{E}$ with respect to the $L^{2}(dx)$ metric.
**(b)** Compute the $W_{2}$-gradient of $\mathcal{E}$ and write the associated Wasserstein gradient flow PDE.

**(2)** Consider now the Fisher information $\mathcal{I}(\alpha):=\int_{\mathbb{R}^{d}}|\nabla \log~\rho(x)|^{2}dx$, $\rho=\frac{d\alpha}{dx}$. Same questions.

{{< spoiler "Solution" >}}
**(1a)**
$\mathcal{E}(\rho) = \int \nabla \rho \cdot \nabla \rho \, dx$.
Perturbation $\rho + \epsilon \eta$:
$$\delta \mathcal{E} = \int 2 \nabla \rho \cdot \nabla \eta \, dx = - \int 2 \Delta \rho \, \eta \, dx \quad \text{(integration by parts)}.$$
First variation: $\frac{\delta \mathcal{E}}{\delta \rho} = -2 \Delta \rho$.
$L^2$ gradient flow ($\partial_t \rho = -\frac{\delta \mathcal{E}}{\delta \rho}$):
$$\partial_t \rho = 2 \Delta \rho.$$
(This is the heat equation, up to a factor of 2).

**(1b)**
Wasserstein gradient $\nabla_W \mathcal{E} = \nabla \left( \frac{\delta \mathcal{E}}{\delta \rho} \right) = \nabla (-2 \Delta \rho)$.
Wasserstein gradient flow ($\partial_t \rho + \nabla \cdot (\rho v) = 0$, $v = -\nabla_W \mathcal{E}$):
$$\partial_t \rho + \nabla \cdot (\rho (2 \nabla \Delta \rho)) = 0 \implies \partial_t \rho = -2 \nabla \cdot (\rho \nabla \Delta \rho).$$
This is a fourth-order non-linear PDE.

**(2a)**
Fisher Information $\mathcal{I}(\rho) = \int \frac{|\nabla \rho|^2}{\rho} dx = 4 \int |\nabla \sqrt{\rho}|^2 dx$. Let $u = \sqrt{\rho}$.
$\delta \mathcal{I} / \delta u = -8 \Delta u$ (similar to Dirichlet).
Using chain rule $\frac{\delta \mathcal{I}}{\delta \rho} = \frac{\delta \mathcal{I}}{\delta u} \frac{du}{d\rho} = (-8 \Delta \sqrt{\rho}) \frac{1}{2\sqrt{\rho}} = -4 \frac{\Delta \sqrt{\rho}}{\sqrt{\rho}}$.
$L^2$ gradient flow:
$$\partial_t \rho = 4 \frac{\Delta \sqrt{\rho}}{\sqrt{\rho}}.$$

**(2b)**
Wasserstein gradient $\nabla_W \mathcal{I} = \nabla \left( -4 \frac{\Delta \sqrt{\rho}}{\sqrt{\rho}} \right)$.
Wasserstein gradient flow:
$$\partial_t \rho = \nabla \cdot \left( \rho \nabla \left( 4 \frac{\Delta \sqrt{\rho}}{\sqrt{\rho}} \right) \right).$$
This is the Derrida-Lebowitz-Speer-Spohn (DLSS) equation, which appears in the study of quantum semi-conductor models.
{{< /spoiler >}}

3. Exercise 3 (Gaussian evolution under linear dynamics).
Let $(X_{t})_{t\in\mathbb{N}}$ be a sequence of random variables in $\mathbb{R}^{d}$ defined by the linear recursion
$X_{t+1}=X_{t}-\tau A_{t}X_{t}$ ($t=0,1,2,...$),
where $\tau>0$ is a fixed step size and, for each $t$, $A_{t}\in\mathbb{R}^{d\times d}$ is a deterministic matrix. Denote by $\alpha_{t}$ the law of $X_{t}$.

**(1)** Assume that the initial condition is Gaussian $X_{0}\sim\mathcal{N}(0,\Sigma_{0})$, for some symmetric positive semidefinite covariance matrix $\Sigma_{0}\in\mathbb{R}^{d\times d}$. Show that each $X_{t}$ is also Gaussian, and describe the evolution of the law $\alpha_{t}=\mathcal{L}(X_{t})$ by giving an explicit recursion for the covariance matrices $\Sigma_{t}$.

**(2)** Consider now the continuous time ODE $\dot{X}_{t}=-A_{t}X_{t}$ ($t\ge0$) with $A_{t}\in\mathbb{R}^{d\times d}$ a (say, continuous) time dependent matrix and random initial condition $X_{0}\sim\mathcal{N}(0,\Sigma_{0})$. Explain why $X_{t}$ is Gaussian for every $t>0$, say $X_{t}\sim\mathcal{N}(0,\Sigma_{t})$, and, by considering the $\tau\rightarrow0$ in the discrete time recursion from part (1), show that $(\Sigma_{t})_{t\ge0}$ solves a matrix ODE that you should identify.

{{< spoiler "Solution" >}}
**(1)**
The recursion is $X_{t+1} = (I - \tau A_t) X_t$.
Since a linear transformation of a Gaussian vector is Gaussian, if $X_t \sim \mathcal{N}(0, \Sigma_t)$, then $X_{t+1}$ is Gaussian with mean $(I - \tau A_t) \cdot 0 = 0$ and covariance:
$$\Sigma_{t+1} = (I - \tau A_t) \Sigma_t (I - \tau A_t)^\top.$$
By induction, if $X_0$ is Gaussian, all $X_t$ are Gaussian.

**(2)**
The solution to the linear ODE $\dot{X}_t = -A_t X_t$ is given by $X_t = \Phi(t, 0) X_0$, where $\Phi(t, 0)$ is the transition matrix (fundamental matrix solution). Since $X_t$ is a linear transformation of the initial Gaussian $X_0$, $X_t$ remains Gaussian with mean 0.
To find the ODE for $\Sigma_t$, consider the limit of the discrete step:
$$\Sigma_{t+\tau} = (I - \tau A_t) \Sigma_t (I - \tau A_t)^\top = \Sigma_t - \tau A_t \Sigma_t - \tau \Sigma_t A_t^\top + \tau^2 A_t \Sigma_t A_t^\top.$$
Rearranging and taking the limit $\tau \to 0$:
$$\lim_{\tau \to 0} \frac{\Sigma_{t+\tau} - \Sigma_t}{\tau} = -A_t \Sigma_t - \Sigma_t A_t^\top.$$
Thus, $\Sigma_t$ satisfies the matrix ODE:
$$\dot{\Sigma}_t = -A_t \Sigma_t - \Sigma_t A_t^\top.$$
{{< /spoiler >}}

4. Exercise 4 (Wasserstein flow for quadratic kernels). Let $\alpha\in\mathcal{P}_{2}(\mathbb{R}^{d})$ and denote its mean and covariance by $m(\alpha):=\int_{\mathbb{R}^{d}}x~d\alpha(x)$ and $\Sigma(\alpha) := \int (x-m(\alpha))(x-m(\alpha))^\top d\alpha(x)$.
Consider the functionals
$$f(\alpha):=\iint_{\mathbb{R}^{d}\times\mathbb{R}^{d}}k(x,y)d\alpha(x)d\alpha(y)$$
on the Wasserstein space $W_{2}(\mathbb{R}^{d})$, where the kernels $k$ are given below.

**(1)** Let $k(x,y)=\langle Ax,y\rangle$, $A\in\mathbb{R}^{d\times d}$.
**(a)** Express $f(\alpha)$ in terms of $m(\alpha)$ and $A$.
**(b)** Compute the Wasserstein gradient $\nabla_{W}f(\alpha)$.
**(c)** Write the Wasserstein gradient flow PDE, and, for a general initial condition $\alpha_{t=0}=\alpha_{0}$, give an explicit expression of $\alpha_{t}$ in terms of $\alpha_{0}$.

**(2)** Let $k(x,y)=\langle Ax,y\rangle\langle Bx,y\rangle$, $A,B\in\mathbb{R}^{d\times d}$.
**(a)** Compute the Wasserstein gradient $\nabla_{W}f(\alpha)$.
**(b)** Using the previous exercise on linear ODEs with Gaussian initial data, show that if $\alpha_{t=0}=\mathcal{N}(0,\Sigma_{0})$, then $\alpha_{t}=\mathcal{N}(0,\Sigma_{t})$ for all $t\ge0,$ and derive the matrix ODE satisfied by $(\Sigma_{t})_{t\ge0}$.

{{< spoiler "Solution" >}}
**(1a)**
$$f(\alpha) = \iint y^\top A x \, d\alpha(x) d\alpha(y) = \left(\int y d\alpha(y)\right)^\top A \left(\int x d\alpha(x)\right) = m(\alpha)^\top A m(\alpha) = \langle A m(\alpha), m(\alpha) \rangle.$$

**(1b)**
First variation:
$$\frac{\delta f}{\delta \alpha}(x) = \int k(x,y) d\alpha(y) + \int k(z,x) d\alpha(z) = \langle Ax, m(\alpha) \rangle + \langle Am(\alpha), x \rangle = \langle (A + A^\top)m(\alpha), x \rangle.$$
Wasserstein gradient:
$$\nabla_W f(\alpha)(x) = \nabla_x \left( \langle (A + A^\top)m(\alpha), x \rangle \right) = (A + A^\top)m(\alpha).$$

**(1c)**
PDE: $\partial_t \rho + \nabla \cdot (\rho v_t) = 0$ with $v_t(x) = -\nabla_W f = -(A+A^\top)m(\alpha_t)$.
Since the velocity field $v_t$ is constant in space (independent of $x$), the transport map is a pure translation.
The mean evolves as $\dot{m}_t = v_t = -(A+A^\top)m_t$.
Solution: $m_t = e^{-(A+A^\top)t} m_0$.
The density evolves by translation: $\alpha_t$ is the pushforward of $\alpha_0$ by $x \mapsto x + (m_t - m_0)$. Explicitly:
$$\alpha_t(x) = \alpha_0(x - (e^{-(A+A^\top)t} - I)m_0).$$

**(2a)**
Symmetrizing the kernel (if necessary, though product form implies structure), the first variation is:
$$\frac{\delta f}{\delta \alpha}(x) = \int (k(x,y) + k(y,x)) d\alpha(y) = \int (\langle Ax, y \rangle \langle Bx, y \rangle + \langle Ay, x \rangle \langle By, x \rangle) d\alpha(y).$$
1. Term 1: $\int (x^\top A^\top y) (y^\top B x) d\alpha(y) = x^\top A^\top (\int yy^\top) B x = x^\top A^\top Q_\alpha B x$, where $Q_\alpha = \Sigma + mm^\top$ is the second moment matrix.
2. Term 2: $\int (y^\top A^\top x) (x^\top B^\top y) d\alpha(y) = \text{Tr}(x x^\top B^\top (\int yy^\top) A^\top) = x^\top B^\top Q_\alpha A^\top x$.
Thus $\frac{\delta f}{\delta \alpha}(x) = x^\top (A^\top Q_\alpha B + B^\top Q_\alpha A) x$.
Wasserstein gradient:
$$\nabla_W f(\alpha)(x) = \nabla_x (x^\top M_t x) = (M_t + M_t^\top) x = 2 M_t x$$
(Assuming $A, B$ symmetry or simplifying $M_t = A^\top Q_\alpha B + B^\top Q_\alpha A$). Generally, $\nabla_W f(\alpha)(x) = 2(A^\top Q_\alpha B + B^\top Q_\alpha A)_{sym} x$.

**(2b)**
The velocity field is linear: $v_t(x) = -\nabla_W f(x) = -2 M_t x$.
This fits the form $\dot{X}_t = - \tilde{A}_t X_t$ from Exercise 3. Since the dynamics are linear, if $\alpha_0$ is Gaussian $\mathcal{N}(0, \Sigma_0)$, then $\alpha_t$ remains Gaussian $\mathcal{N}(0, \Sigma_t)$ (means stay 0).
The covariance matrix $\Sigma_t$ (which equals $Q_{\alpha_t}$ since mean is 0) evolves according to the ODE derived in Exercise 3, with $\tilde{A}_t = 2(A^\top \Sigma_t B + B^\top \Sigma_t A)$:
$$\dot{\Sigma}_t = -\tilde{A}_t \Sigma_t - \Sigma_t \tilde{A}_t^\top.$$
{{< /spoiler >}}
