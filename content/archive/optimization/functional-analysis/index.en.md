+++
title = "Basic overview of Functional Analysis"
date = 2026-01-09
+++

The study of optimization of general functions often rely on many Functional Analysis tools, particularly Hilbert spaces.
One can think about Hilbert spaces as a generalization of Euclidean spaces.
This allows us to define most algorithms in a generalized fashion, without worrying about the underlying structure of the problem's domain.
Of course, most applications consider an Euclidean space $\mathbb{R}^d$, but it is just a special case of a Hilbert space.

## Hilbert spaces

{{< definition "Hilbert space" >}}
A (real) Hilbert space $\H$ is a [_complete_](https://en.wikipedia.org/wiki/Complete_metric_space) [vector space](https://en.wikipedia.org/wiki/Vector_space), equipped with an inner product $\< \cdot, \cdot \>_\H$.
One can also define the associated standard norm:

$$
\| x \|_\H = \sqrt{\< x, x \>_\H}.
$$

{{< /definition >}}

Looking at this definition, it is immediately clear that $\R^d$ is a Hilbert space with the standard inner product.

## Linear operators

One can also define **linear operators** between Hilbert spaces.
We say a linear operator $L \colon \H \to \mathcal{G}$ is **bounded** if

$$
\| L \| = \sup_{\| x \|_H \leq 1} \| L x \|_\mathcal{G} < + \infty.
$$

In the case of Euclidean spaces, $L$ is a matrix and the inequality above basically says that the spectral norm (greatest eigenvalue) of $L$ is finite.
Clearly, in finite dimension, every linear operator is bounded.

When considering bounded linear operators, we define the adjoint of the operator $L^*$ as the one that satisfies

$$
\< L x, y \>_\mathcal{G} = \< x, L^* y \>_\H.
$$

If we are dealing with real numbers and an orthonormal basis within the Hilbert space, $L^*$ is simply $L^\top$.
Some useful properties are

- $\| L^* \| = \| L \|$
- If $L$ is bijective (isomorphism) then $(L^{-1})^* = (L^*)^{-1}$.

## Functional definitions

{{< definition "Domain and proper function" >}}
Let $f \colon \H \to \R \cup \{+\infty\}$.
The domain of $f$ is

$$
\dom{f} = \{ x \in \H \mid f(x) < + \infty \}.
$$

If $\dom{f} \neq \emptyset$, the $f$ is **proper**.
{{< /definition >}}

{{< definition "Epigraph" >}}
Let $f \colon \H \to \R \cup \{+\infty\}$.
The **epigraph** of $f$ is

$$
\epi{f} = \{(x, \xi) \in \dom{f} \times \R \mid f(x) \leq \xi \}.
$$

{{< /definition >}}

{{< definition "Lower semi-continuity" >}}
Let $f \colon \H \to \R \cup \{+\infty\}$.
$f$ is **lower semi-continuous** at $x \in \H$ if, for every sequence $(a_n)_{n \in \N}$ of $\H$,

$$
a_n \to x \implies \liminf f(a_n) = \lim_{n \to \infty} \inf \{f(a_k) \mid k \geq n\} \geq f(x).
$$

Equivalently, $f$ is lower semi-continuous if $\epi{f}$ is closed.
{{< /definition >}}
Note that standard continuity implies lower semi-continuity.

{{< definition "Coercive function" >}}
Let $f \colon \H \to \R \cup \{+\infty\}$.
$f$ is **coercive** if

$$
\lim_{\| x \|_\H \to + \infty} f(x) = + \infty.
$$

{{< /definition >}}

## Minimizers

We make a distinction between local and global minimizers.
When the word minimizer is used without precising whether it is local or global, we mean it as a global minimizer.

{{< theorem "Weierstrass theorem" >}}
Let $S \subset \H$ be a non-empty compact set and let $f \colon S \to \R \cup \{+\infty\}$ be proper and lower semi-continuous.
Then, there exists $\hat{x} \in S$ such that

$$
f(\hat{x}) = \inf_{x \in S} f(x).
$$

{{< /theorem >}}

In other words, the infimum is atteinable within a compact set, so local minimizers always exist.

The most important theorem, however is the following.

{{< theorem >}}
Let $\H$ be a finite dimensional Hilbert space and let $f \colon S \to \R \cup \{+\infty\}$ be proper, lower semi-continuous and coercive.
Then, the set of **global minimizers of $f$ is a nonempty [compact set](https://en.wikipedia.org/wiki/Compact_space)**.
{{< /theorem >}}

{{< example >}}
Let $\H = \R$ and $f(x) = x^4 - 2x^2$.
We can look at the graph of $f$ below.

{{< tikz "figures/ex1.tikz" >}}

$f$ is coercive, continuous and proper, so our set of minimizers $S = \{-1, 1\}$ is non-empty and compact.
This example illustrates how convexity might be often needed in optimization.
{{< /example >}}

{{< info "$\Gamma_0(\H)$" >}}
We call $\Gamma_0(\H)$ the class of convex, lower semi-continuous and proper functions from $\H$ to $\R \cup \{+ \infty \}$.
{{< /info >}}
