+++
title = "Finding eigenvalues"
date = 2024-09-24
+++

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

## Jacobi method

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
