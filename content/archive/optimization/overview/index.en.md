+++
title = "Overview"
date = 2026-01-10
+++

### Summary

This post serves as a broad overview of many optimization methods and algorithms.
For specifics, please refer to the post of each algorithm.
It is advised to read the post about [Functional Analysis](/archive/optimization/functional-analysis) to better understand the notation used here.

## Setup

We are going to consider a function
$$
f = g + h.
$$
Depending on the different hypothesis of $f$, $g$ and $h$ we may be able to use different optimization algorithms.

## Algorithms



| Algorithm                  | Hypothesis                                                                                                                             | Notes                                                                               |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Gradient Descent           | $f \in \Gamma_0(\H)$ and differentiable with $\nabla f$ being $L$-Lipschitz, $L > 0$.                                                  | Converges weakly to minimizer.                                                      |
| Newton's Method            | $f \in \Gamma_0(\H)$ and twice-differentiable with $\nabla^2 f \succ 0$ being $L$-Lipschitz, $L > 0$.                                                  | Quadratic convergence to minimizer. May be computationally expensive.        |
| Forward-Backward           | $g \in \Gamma_0(\H)$ and differentiable with $\nabla g$ being $L$-Lipschitz, $L > 0$. $h \in \Gamma_0(\H)$.                            | Converges weakly to minimizer.                                                      |
| Projected Gradient Descent | $g \in \Gamma_0(\H)$ and differentiable with $\nabla g$ being $L$-Lipschitz, $L > 0$. $h = \iota_C$, where $C$ is convex.              | Converges weakly to minimizer in $C$.                                               |
| Proximal Point             | $f \in \Gamma_0(\H)$ and $\mathrm{prox}_f$ can be computed efficiently.                                                                | Converges weakly to minimizer.                                                      |
| Douglas-Rachford           | $f \in \Gamma_0(\H)$.                                                                                                                  | Converges weakly to minimizer.                                                      |
| ADMM                       | $g, h \in \Gamma_0(\H)$ and $f = g + h \circ L$ where $L \in \mathcal{B}(\H, \mathcal{G})$ and $L^* L$ is an isomorphism.              | Converges weakly to minimizer of primal and dual ($g^* \circ (-L^*) + h^*$).        |
| Primal-dual                | $g, h, p \in \Gamma_0(\H)$ and $f = g + p + h \circ L$ where $L \in \mathcal{B}(\H, \mathcal{G})$ and $\nabla p$ is $\beta$-Lipschitz. | Converges weakly to minimizer of primal and dual ($(g + p)^* \circ (-L^ *) + h^*$). |
| Majorization-Minimization  | There exists an easily optimizable function that majorizes $f$.                                                                        |                                                                                     |
