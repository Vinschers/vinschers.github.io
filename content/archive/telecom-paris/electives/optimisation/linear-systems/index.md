+++
title = "Linear Systems"
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

## Finding eigenvalues

{{< notice "definition" "Eigenvector and eigenvalue" >}}
{{< markdown >}}

We say that $\mathbf{x} \neq 0 \in \mathbb{R}^n$ is an **eigenvector** with associated **eigenvalue** $\lambda \in \mathbb{C}$ of $A \in \mathbb{R}^{n \times n}$ if
$$
A \mathbf{x} = \lambda \mathbf{x} \iff (A - \lambda I) \mathbf{x} = 0
$$

The tuple $(\mathbf{x}, \lambda)$ is usually referred to as an _eigenpair_ of $A$.
We say $\lambda(A) \subset \mathbb{C}$ is the spectrum of $A$ if it contains all eigenvalues of $A$.

{{< /markdown >}}
{{< /notice >}}

{{< notice "note" >}}
{{< markdown >}}

If $0 \not\in \lambda(A)$, then $A$ is invertible.

{{< /markdown >}}
{{< /notice >}}

To find the eigenvalues of $A$, it suffices to solve the following equation:
$$
\det{(A - \lambda I)} = 0
$$

However, by the Abel-Ruffini theorem, there is no close formula to find roots of polynomials of degree 5 or higher!

{{< notice "info" >}}
{{< markdown >}}

If $A$ is a diagonal matrix with the elements in its diagonal being $a_1, \dots, a_n$, then
$$
\lambda(A) = \{ a_1, \dots, a_n \}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" >}}
{{< markdown >}}

If $O \in \mathbb{R}^{n \times n}$ is an orthogonal matrix, then every $\lambda \in \lambda(O)$ is such that $\vert \lambda \vert = 1$.

{{< /markdown >}}
{{< /notice >}}

{{< notice "definition" "Similarity transform" >}}
{{< markdown >}}

We say that $A \in \mathbb{R}^{n \times n}$ is _similar_ to $B \in \mathbb{R}^{n \times n}$ if there exists $P \in \mathbb{R}^{n \times n}$ invertible such that
$$
A = P^{-1} B P
$$

$A$ is said to be **diagonalisable** if $B$ is a diagonal matrix.

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" >}}
{{< markdown >}}

If $A, B \in \mathbb{R}^{n \times n}$ are similar matrices, then $\lambda(A) = \lambda(B)$.

{{< /markdown >}}
{{< /notice >}}

So, our idea is to diagonalise a matrix $A$ in order to find its eigenvalues.

{{< notice "theorem" "Spectral theorem for symmetric matrices" >}}
{{< markdown >}}

Let $A \in \mathbb{R}^{n \times n}$ be symmetric. Then there exists an orthogonal matrix $V \in \mathbb{R}^{n \times n}$ and a diagonal matrix $\Lambda \in \mathbb{R}^{n \times n}$ such that
$$
A = V \Lambda V^{-1}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "theorem" "Singular Value Decomposition" >}}
{{< markdown >}}

Let $A \in \mathbb{R}^{m \times n}$. There exists orthogonal matrices $U \in \mathbb{R}^{m \times m}$ and $V \in \mathbb{R}^{n \times n}$ such that
$$
U^\top A V = \Sigma = \mathrm{diag}(\sigma_1, \dots, \sigma_p), \quad \text{where} \; p = \min{\{n, m\}},
$$
and where $\sigma_1 \geq \dots \geq \sigma_p \geq 0$.

{{< /markdown >}}
{{< /notice >}}

So, we can use both theorems to diagonalise a symmetric matrix $A$ using similarity transforms.
$$
A = V \Lambda V^\top \implies V^\top A V = \Lambda
$$

This gives rise to the **Jacobi method**.

### Jacobi method

**Main idea**: minimize the offset of the matrix, $\mathrm{off}(A)$:
$$
\mathrm{off}(A) = \sum_{i=1}^n \sum_{i \neq j} a_{ij}^2 = \Vert A \Vert_F^2 - \sum_{i=1}^n a_{ii}^2
$$

**Iteration**:
1. Find largest off-diagonal element $a_{ij}$.
$$
a_{pq} = \max_{1 \leq i < j \leq n} \vert a_{ij} \vert
$$
2. Replace $a_{pq}$ with $0$ using the Givens-Jacobi transform.
$$
A^{(k + 1)} = [\Omega^{(k)}]^\top A^{(k)} \Omega^{(k)}
$$

The transform matrix in the $k$-th iteration is the following:
$$
\Omega^{(k)}(p, q, \theta) = (\omega^{(k)})_{i, j} = \begin{cases}
\cos{\theta} & i = j = p \;\; \text{or} \;\; i = j = q \\
\sin{\theta} & i = p \;\; \text{and} \;\; j = q \\
-\sin{\theta} & i = q \;\; \text{and} \;\; j = p \\
1 & i = j \\
0 & \text{otherwise}
\end{cases}
$$
in other words, it is an identity matrix with a rotation matrix in the positions $(p, p)$, $(p, q)$, $(q, p)$ and $(q, q)$

Carefully choosing $\theta$ eliminates $a_{pq}$ and $a_{qp}$.
To do so, we can solve the following equation:
$$
\tan{\theta} = \min{\{ \vert - x \pm \sqrt{x^2 + 1} \vert \}} \qquad \text{where} \;\; x = \frac{a_{qq} - a_{pp}}{2 a_{pq}}
$$

Then, we can find the values of the sine and cosine:
$$
cos{\theta} = \frac{1}{\sqrt{1 + \tan^2{\theta}}} \qquad \text{and} \qquad \sin{\theta} = \cos{\theta} \tan{\theta}
$$

We can therefore repeat these steps while $\mathrm{off}(A) > \epsilon$.

{{< notice "theorem" >}}
{{< markdown >}}

Let $A \in \mathbb{R}^{n \times n}$ be a symmetric matrix. The iterates $A^{(k)}$ of the Jacobi method converge to a diagonal matrix at a rate of
$$
\mathrm{off}(A^{(k)}) \leq \left( 1 - \frac{2}{n (n - 1)} \right)^k \mathrm{off}(A).
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" >}}
{{< markdown >}}

There are some fast ways to compute $B = [\Omega^{(k)}]^\top A^{(k)} \Omega^{(k)}$:
$$
\begin{cases}
b_{ij} = b_{ji} = a_{ij} & i \not\in \{p, q\} \; \text{and} \; j \not\in \{p, q\} \\
b_{pi} = b_{ip} = \cos{\theta} a_{pi} - \sin{\theta} a_{qi} & i \not\in \{p, q\} \\
b_{qi} = b_{iq} = \sin{\theta} a_{pi} + \cos{\theta} a_{qi} & i \not\in \{p, q\} \\
b_{pp} = a_{pp} - \tan{\theta} a_{pq} \\
b_{qq} = a_{qq} + \tan{\theta} a_{pq}
\end{cases}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "tip" >}}
{{< markdown >}}

After we finish the iterations, the matrix $A^{(k)}$ will have $\lambda(A)$ in its diagonal.
Also, the columns of $\Omega_1 \times \dots \times \Omega_k$ are an orthonormal set of eigenvectors of $A$.

{{< /markdown >}}
{{< /notice >}}

## Exercises

### Exercise 1

Let $\varepsilon$ be positive real: $\varepsilon > 0$. Let $A_\varepsilon$ be the matrix:
$$
\begin{pmatrix}
1 & 1 \\
1 & 1 + 2 \varepsilon
\end{pmatrix}
$$
Let $\mathbf{R}$ denote the set of real numbers.
We consider the linear system $S_\varepsilon$ defined in $\mathbf{R}^2$ by $A_\varepsilon X = (a, b)^\top$ where $X = (x_1, x_2)^\top$ is the vector of the variables and where $a$ and $b$ are given reals.

1. Thanks to the Gauss method, determine the $LU$ factorization of $A_\varepsilon$.

2. Thanks to the $LU$ factorization of $A_\varepsilon$, solve $S_\varepsilon$.

3. Deduce the inverse of $A_\varepsilon$ from the above.

4. Thanks to the Jacobi method, determine the eigenvalues of $A_\varepsilon$ (it is not asked to compute the eigenvectors of $A_\varepsilon$); detail the computations.

5. What are the values of $\varepsilon$ for which the Cholesky method can be applied to $A_\varepsilon$?
For these values of $\varepsilon$, apply the Cholesky method to $A_\varepsilon$.

6. Determine the conditioning of $A_\varepsilon$ for matrix norms 1, 2 and $\infty$.

7. What can be said about the conditioning of $A_\varepsilon$ for each one of these three norms when $\varepsilon$ tends towards $0$?
Is the system $S_\varepsilon$ well-conditioned when $\varepsilon$ is small?

### Exercise 2

1. Let $A$ be the following matrix:
$$
\begin{pmatrix}
-1 & 6 & -2 \sqrt{5} \\
6 & 8 & \sqrt{5} \\
-2 \sqrt{5} & \sqrt{5} & 4
\end{pmatrix}.
$$
Thanks to the classical Jacobi method (in which, at each iteration, we consider the non-diagonal term of greatest absolute value), determine the eigenvalues and an orthonormal basis of eigenvectors of $A$; detail the calculations.

2. Let $A = (a_{jk})_{1 \leq j \leq 3, 1 \leq k \leq 3}$ be a $3 \times 3$ matrix which is symmetric and non-diagonal.
Let $B = (b_{jk})_{1 \leq j \leq 3, 1 \leq k \leq 3}$ be the matrix obtained by applying one iteration of the Jacobi method to $A$.
_Indication for the next questions_: by calling $p$ and $q$ the indices of the entry of $A$ that we want to transform into $0$ with the Jacobi method, $i$ will denote the "third index" (so as to have $\{i, p, q\} = \{1, 2, 3\}$); then consider the formulas giving $b_{ip}$ and $b_{iq}$.

    (a) Assume that $a_{12}$, $a_{13}$ and $a_{23}$ are all non-zero. Prove that $B$ is not diagonal.

    (b) Assume that one and only one of the three entries $a_{12}$, $a_{13}$ and $a_{23}$ is equal to $0$. Prove that $B$ contains exactly one entry $b_{jk}$ equal to $0$ with $j < k$.

    (c) Assume that two of the three entries $a_{12}$, $a_{13}$ and $a_{23}$ are equal to $0$. What can be said about $B$?

3. We are interested in the convergence of the Jacobi method for $3 \times 3$ matrices $A = (a_{jk})_{1 \leq j \leq 3, 1 \leq k \leq 3}$ which are symmetric and non-diagonal.
What can be said, according to the number of non-zero entries $a_{12}$, $a_{13}$ and $a_{23}$, about the number of iterations performed by the Jacobi method when applied to $A$?

### Exercise 3

We consider the following matrix:
$$
A = \begin{pmatrix}
1 & 0 & -1 & 0 \\
0 & 1 & 2 & 1 \\
-1 & 2 & 6 & 2 \\
0 & 1 & 2 & 2
\end{pmatrix}
$$
and set $X = (x, y, z, t)^\top$.

1. Show that $A$ is positive definite.

2. Determine the classic $LU$ factorization of $A$; detail the steps.

3. What can be said about the classic Cholesky factorization of $A$? Specify this factorization if it exists.

4. Let $\beta = (a, b, c, d)^\top$ be a vector in $\mathbb{R}^4$. Solve the linear system $A X = \beta$ thanks to the $LU$ factorization of $A$. State $X$ in function of $a$, $b$, $c$ and $d$.

5. Deduce $A^{-1}$ from the previous question.

6.
    (a) Specify the conditionings $\mathrm{cond}_1$ and $\mathrm{cond}_\infty$ of the linear system $A X = \beta$.

    (b) We consider the system $A X_0 = \beta$ with $\beta = (1, 1, 1, 0)^\top$ and we admit the solution of the system is $X_0 = (1, 2, 0, -1)^\top$. From the system $A X_0 = \beta$, small variations of $\beta$ are envisaged. More precisely, let $\delta$ be a vector in $\mathbb{R}^4$. We consider the linear system $A (X_0 + \delta X_0) = \beta + \delta$ where $\delta X_0$ is the vector corresponding to the variations of $X_0$ when $\beta$ varies from $\delta$. Thanks to the conditionings $\mathrm{cond}_1$ and $\mathrm{cond}_\infty$, specify an upper bound of $\Vert \delta X_0 \Vert_1$ and of $\Vert \delta X_0 \Vert_\infty$ with respect to $\Vert \delta \Vert_1$ and $\Vert \delta \Vert_\infty$.
