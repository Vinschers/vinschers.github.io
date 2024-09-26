+++
title = "Solving Linear Systems"
date = 2024-09-17
+++

Let $A \in \mathbb{R}^{m \times n}$ and $\mathbf{b} \in \mathbb{R}^m$.
Our goal is to solve the linear system $A\mathbf{x} = \mathbf{b}$ where $\mathbf{x} \in \mathbb{R}^n$.

{{< notice "info" >}}
{{< markdown >}}

Some facts about matrices:

- If $A A^\top = A^\top A$, then $A$ is *normal*;
- If $A = A^\top$, then $A$ is *symmetric*;
- If $A A^\top = A^\top A = I_n$, then $A$ is *orthogonal*.

{{< /markdown >}}
{{< /notice >}}

### Norms

The following norms are used often:

- $L_1$ norm: $\Vert \mathbf{x} \Vert_1 = \sum_{i=1}^n |x_i|$;
- $L_2$ norm: $\Vert \mathbf{x} \Vert_2 = \sqrt{\sum_{i=1}^n x_i^2}$;
- Frobenius norm: $\Vert A \Vert_F = \sqrt{\mathrm{tr}(A^\top A)}$;
- $L_1$ norm: $\Vert A \Vert_1 = \max_{1 \leq j \leq n} \sum_{i=1}^n |a_{ij}|$, which is the maximum absolute *column* sum of $A$;
- $L_\infty$ norm: $\Vert A \Vert_\infty = \max_{1 \leq i \leq n} \sum_{j=1}^n |a_{ij}|$, which is the maximum absolute *row* sum of $A$;
- $L_2$ norm: $\Vert A \Vert_2 = \rho(A) = \max\{\vert \lambda(A) \vert \}$, which is the *spectral radius* of $A$, i.e., the maximum absolute eigenvalue of $A$.;

{{< notice "theorem" >}}
{{< markdown >}}

If $A \in \mathbb{R}^{n \times n}$ is an orthogonal matrix, then
$$
\forall \mathbf{x} \in \mathbb{R}^n, \qquad \Vert A \mathbf{x} \Vert_2 = \Vert \mathbf{x} \Vert_2
$$

{{< /markdown >}}
{{< /notice >}}

## Conditioning

{{< notice "definition" "Condition number" >}}
{{< markdown >}}

The condition number of a matrix $A$ is a measure of how sensitive the solution of a linear system is to changes in the input.
$$
\mathrm{cond}(A) = \Vert A \Vert \Vert A^{-1} \Vert
$$

The greater $\mathrm{cond}(A)$ is, the more sensitive the solution is.

{{< /markdown >}}
{{< /notice >}}

There are some important properties of $\mathrm{cond}(A)$:

- $\mathrm{cond}(A) \geq 1$;
- $\mathrm{cond}(A) = \mathrm{cond}(A^{-1})$;
- $\mathrm{cond}(\alpha A) = \mathrm{cond}(A)$ for any $\alpha \in \mathbb{R}^\star$;
- $\mathrm{cond}_2(A) = \frac{\lambda_n(A)}{\lambda_1(A)}$, where $\lambda_n(A)$ and $\lambda_1(A)$ are largest and smallest absolute eigenvalues of $A$;

{{< notice "tip" "Finding the eigenvalues" >}}
{{< markdown >}}

We can find the eigenvalues of $A$ by hand by solving the following equation:
$$
\det{(A - \lambda I)} = 0
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" "Calculating the determinant" >}}
{{< markdown >}}

We can calculate the determinant of $A$ using cofactors expansion.
$$
\det{(A)} = a_{11} C_{11} + a_{12} C_{12} + \ldots + a_{1n} C_{1n}
$$
where
$$
C_{i, j} = (-1)^{i+j} \det{(M_{ij})}
$$
and $M_{ij}$ is obtained by removing the $i$-th row and $j$-th column from $A$.

**Note**: The algorithm works for every row or column, not just the first row.

{{< /markdown >}}
{{< /notice >}}

## Triangular systems

This is the easiest type of system to solve.
Without loss of generality, we will assume *upper* triangular matrices.
We can do **Forward substitution** and **Backward substitution**, but we will focus on the latter method.

Starting with $i = n$, we have
$$
a_{nn} x_n = b_n \implies x_n = \frac{b_n}{a_{nn}}.
$$

Then, for $i \leq n$, we have
$$
a_{ii} x_i + \sum_{j = i + 1}^n a_{ij} x_j = b_i \implies x_i = \frac{b_i - \sum_{j = i + 1}^n a_{ij} x_j}{a_{ii}}.
$$

Solving this expression for each $i$ is precisely the algorithm, which has a time complexity of $\mathcal{O}(n^2)$.

## Gaussian elimination

The idea is to transform a general matrix $A$ into an upper triangular matrix $U$ using invertible operations $P_1, \dots, P_k$.

$$
P_k \dots P_1 A = U \implies U \mathbf{x} = P_k \dots P_1 b
$$

The operations we are interested in are of the type $R_i \leftarrow R_i - \alpha R_j$.
These operation can be represented using the matrices $P_i$ as follows:
$$
P_k = I - \frac{\mathbf{v}_k \mathbf{e}_k^\top}{a^{(k)}_{kk}}
$$
where
$$
\mathbf{v}_k = (\underbrace{0, \dots, 0}_k, a^{(k)}_{k+1, k}, \dots, a^{(k)}_{n, k})^\top \in \mathbb{R}^n.
$$

Then, $A^{(k + 1)} = P_k A^{(k)}$.

{{< notice "info" >}}
{{< markdown >}}

$$
P_k^{-1} = I + \frac{\mathbf{v}_k \mathbf{e}_k^\top}{a^{(k)}_{kk}}
$$

{{< /markdown >}}
{{< /notice >}}

In the end, the Gaussian elimination algorithm just keeps applying these matrices to $A$ and $b$.
It has time complexity of $\mathcal{O}(n^3)$.

{{< notice "warning" >}}
{{< markdown >}}

We can improve numerical stability by choosing a pivot other than $a_{kk}$

1. **Partial pivot**: Choose the element in the column under the diagonal with largest absolute value. Then, we need to switch the diagonal and the element's row.
2. **Total pivot**: Choose the element under the diagonal (in any column) with largest absolute value. Then, we need to switch both the row and column.

{{< /markdown >}}
{{< /notice >}}

### LU decomposition

If we use the inverse of the $P_k$, we are able to obtain a *lower* triangular matrix $L$.
$$
(P_n \dots P_1)^{-1} = P_1^{-1} \dots P_n^{-1} = L.
$$
So, we can say that
$$
A = LU
$$.

We can use the $LU$ decomposition to solve multiple linear systems with same matrix $A$ in a faster way.
For each system, we have $A \mathbf{x}^{(i)} = \mathbf{b}^{(i)}$.
Then, we solve the following systems:
$$
L \mathbf{y} = \mathbf{b}^{(i)} \implies U \mathbf{x}^{(i)} = \mathbf{y}
$$
Each system costs $\mathcal{O}(n^2)$, so if we have $m$ systems, we can solve everything in $\mathcal{O}(m n^2)$ instead of $\mathcal{O}(m n^3)$.

### Matrix inversion

The linear system $A \mathbf{x}^{(i)} = \mathbf{e}_i$ has a solution that is precisely the $i$-th column of $A^{-1}$.
This means that by applying the Gaussian elimination both in $A$ and $I$, we can obtain $A^{-1}$ in $\mathcal{O}(n^3)$ time.

## Cholesky decomposition

{{< notice "definition" "Positive definite matrix" >}}
{{< markdown >}}

We say that a matrix $A$ is positive definite if for every non-zero vector $\mathbf{v} \in \mathbb{R}^n$,
$$
\mathbf{v}^\top A \mathbf{v} > 0.
$$

{{< /markdown >}}
{{< /notice >}}

For positive definite matrices, we can efficiently compute the $LU$ decomposition with $L = U^\top$.
In this context, we call the lower triangular matrix $B$, so that $A = B B^\top$.

We can calculate the $j$-th column of $B$, $\mathbf{b}_{\colon j}$, using the following formula:
$$
\mathbf{b}_{\colon j} = \frac{\mathbf{v}}{\sqrt{\mathbf{v}_j}}
$$
where
$$
\mathbf{v} = a_{\colon j} - \sum_{k = 1}^{j - 1} b_{j k} b_{\colon k}.
$$
Each term in the summation is the multiplication of the $k$-th column of $B$ by its $j$-th element.
This algorithm runs in $\mathcal{O}(n^3)$ time.

{{< notice "info" >}}
{{< markdown >}}

$$
\det{(A)} = (b_{11} \dots b_{nn})^2
$$

{{< /markdown >}}
{{< /notice >}}
