+++
title = "Linear Programming: Simplex method"
date = 2024-10-30
+++

## Simplex

We want to solve the following problem:
$$
\max{z} = \sum_{j = 1}^n c_j x_j
$$
where
$$
\begin{cases}
\sum_{j = 1}^n a_{ij} x_j &\leq b_i, \qquad i \in \{1, \dots, m\} \\
x_j &\geq 0, \qquad j \in \{1, \dots, n\}
\end{cases}
$$

Then, we find a tuple $x^\ast = (x_1^\ast, \dots, x_n^\ast)$ that is the solution of the optimization problem.

To this end, we build dictionaries such that

$$
\begin{cases}
x_{n + 1} = b_1 - \sum_{j = 1}^n a_{1j} x_j \\
\vdots \\
x_{n + m} = b_m - \sum_{j = 1}^n a_{mj} x_j \\
z = \sum_{j = 1}^n c_j x_j
\end{cases}
$$
Here, the variables $x$ on the left hand side are called *basic variables*.
The ones in the right hand side, are called *non-basic variables*.
All $x_{m + i}$ are the *slack variables*.
Throughout the execution of the algorithm, the non-basic variables are always equal to zero.

At each iteration, we choose one non-basic variable as the *leaving variable* and one basic variable as the *entering variable*.
After that, we rewrite the new dictionary with the new set of basic and non-basic variables.

### How to choose the leaving variable?

There are 3 ways to choose the leaving variable:
- **First criterion of Dantzig**: we choose the variable whose coefficient in $z$ is the greatest. *Easiest to compute*;
- **Second criterion of Dantzig**: we choose the variable whose maximum value (per the constraints) translates to the greatest increase in $z$. *Fastest convergence*;
- **Bland's rule**: we choose the variable with smallest index whose coefficient in $z$ is positive. *Prevents cycling*.

### How to choose the entering variable?

Let $x_k$ be the leaving variable.
Then, while keeping all the other non-basic variables equal to zero, we can isolate the $x_k$ in the constraints.
For example, in some constraint,
$$
\begin{align*}
x_{i} = C_i - c_k x_k \implies c_k x_k \leq C_i \\
x_{j} = C_j + c_k x_k \implies c_k x_k \geq C_j
\end{align*}
$$

The slack variable whose constraint on $x_k$ is the strictest is the one which is entering the basis.
If there are multiple potential entering variables, we can choose the one with smallest index (following Bland's rule).

### Zero not in the feasible region

If $x = \mathbf{0}$ is not a feasible solution, then we can use the two-phase method.
Instead of the original problem, solve the following problem:
$$
\max w = - x_0
$$
and add $-x_0$ to all the necessary constraints.
Then, just solve this auxiliary problem.

After obtaining the last dictionary, you can just remove the $x_0$ from all equations and replace $w$ for $z$ using the obtained equations in the dictionary.
Now, you can proceed to the solution using the usual simplex.

## Duality

Let the primal problem be:
$$
\begin{cases}
\max z &= \mathbf{c}^\top \mathbf{x} \\
A \mathbf{x} &\leq \mathbf{b} \\
\mathbf{x} &\geq \mathbf{0}
\end{cases}
$$

Then, the dual problem is:
$$
\begin{cases}
\min w &= \mathbf{b}^\top \mathbf{y} \\
A^\top \mathbf{y} &\geq \mathbf{c} \\
\mathbf{y} &\geq \mathbf{0}
\end{cases}
$$
which, written in standard form, is equivalent to:
$$
\begin{cases}
\max w &= (-\mathbf{b}^\top) \mathbf{y} \\
(-A^\top) \mathbf{y} &\leq - \mathbf{c} \\
\mathbf{y} &\geq \mathbf{0}
\end{cases}
$$

For any feasible solution of the primal and dual, we have
$$
\mathbf{c}^\top \mathbf{x} \leq \mathbf{b}^\top \mathbf{y}
$$
The equality will be satisfied if $\mathbf{x}$ and $\mathbf{y}$ are both optimal solutions.

{{< notice theorem >}}
If the primal problem is unbounded, then the dual problem has no feasible region.
{{< /notice >}}

{{< notice theorem >}}
Suppose we found an optimal solution to the primal problem and its last directory has objective function
$$
z = z^\ast - \sum_{k = 1}^{n + m} d_k x_k
$$

Then, the solution to the dual problem is $\mathbf{y}^\ast_i = d_{n + i}$.
Note that $\mathbf{y}^\ast \geq \mathbf{0}$.
{{< /notice >}}

{{< notice theorem "Complementary slackness theorem" >}}
{{< markdown >}}

Let $\mathbf{x}$ be a feasible solution to the primal problem.
It is optimal if, and only if, there exists a $\mathbf{y}$ such that:
1. $\mathbf{y}_i = 0$ if the $i$-th constraint in the primal is not tight;
2. $(A^\top)_j \cdot \mathbf{y} = c_j$ if $\mathbf{x}_j > 0$, where $(A^\top)_j$ is the $j$-th column of constraints in matrix $A$;
3. $\mathbf{y}$ is a feasible solution to the dual problem.

Then, not only $\mathbf{x}$ is optimal, but also $\mathbf{y}$ is optimal.

{{< /markdown >}}
{{< /notice >}}

### Economic interpretation

In the primal problem, each $c_j$ represents the amount gained by selling product $\mathbf{x}_j$.
In other words, it is the unit profit of the product.

In the dual problem, we can see $\mathbf{y}_i$ as the unit profit of *resource* $i$.
This means that we can buy more of resource $i$ if its unit price is not greater than $\mathbf{y}_i$.

{{< notice theorem >}}
Suppose $A$, $\mathbf{b}$ and $\mathbf{c}$ define a simplex problem $P$ whose objective function is maximized at $z^\ast$.
Now, consider another LP problem $P^\prime$ such that $\mathbf{b}^\prime = \mathbf{b} + \delta \mathbf{b}$.
If $\delta \mathbf{b}$ is small enough, then the objective function of $P^\prime$ is
$$
z^\prime = z^\ast + \delta \mathbf{b}^\top \mathbf{y}^\ast
$$
where $\mathbf{y}^\ast$ is the optimal solution of the dual of $P$.
{{< /notice >}}

### Dual-feasible problem

If $\mathbf{0}$ does not belong to the feasible region of the primal problem, we can simply solve the dual problem instead of using the two-phase method.
