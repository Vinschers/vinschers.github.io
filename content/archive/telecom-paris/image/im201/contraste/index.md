+++
title = "Contrast"
date = 2024-09-20
draft = false
+++

The perception of an image's content changes little when an increasing function is applied to it.
However, if the function is non-increasing, then the perception of the content changes completely.
**We are sensible to local rather than global changes of contrast**.

From now on, we are denoting $u \colon \Omega \to \mathbb{R}$ our image, where $\vert \Omega \vert = M \times N$ is a discrete rectangular grid.
Also, we are assuming that $u$ takes discrete values $y_0 < \dots < y_{n - 1}$ (usually $0$ to $255$).

## Histograms

{{< notice "definition" "Histogram" >}}
{{< markdown >}}

We can define the histogram $h_u$ of an image $u$ as follows:
$$
h_u = \sum_{i = 0}^{n - 1} \delta_{y_i} \underbrace{\frac{\vert \{ \mathbf{x} \in \Omega \mid u(\mathbf{x}) = y_i \} \vert}{\vert \Omega \vert}}_{h_i}
$$
where $\delta_{y_i}(y)$ is the indicator function $1$ if $y = y_i$ and $0$ otherwise.

{{< /markdown >}}
{{< /notice >}}

{{< figure src="images/histogram.png" width="600" >}}

The histogram characterizes de distribution of gray levels in an image.

{{< notice "info" >}}
The histogram in invariant to geometric transformations
{{< /notice >}}

{{< notice "definition" "Cumulative histogram" >}}
{{< markdown >}}

Let $u$ be a discrete image defined on a grid $\Omega$.
The *cumulative histogram* of $u$ is the function $H_u$ defined as follows:
$$
H_u(\lambda) = \frac{\vert \{ \mathbf{x} \in \Omega \mid u(\mathbf{x}) \leq \lambda \} \vert}{\vert \Omega \vert}
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice "definition" "Contrast change" >}}
{{< markdown >}}

We call contrast change an increasing function $g \colon \mathbb{R} \to \mathbb{R}$.
This contrast change transforms the image $u$ into $g(u)$.

{{< /markdown >}}
{{< /notice >}}

{{< notice "info" >}}
{{< markdown >}}

If $g$ is a strictly increasing contrast change, then
$$
H_{g(u)}(g(y_i)) = H_u(y_i) \qquad \forall i
$$

{{< /markdown >}}
{{< /notice >}}

## Classical contrast changes

### Luminosity & contrast

$$
u \mapsto ku + C
$$
where $k$ is the contrast and $C$, the luminosity.
If $k$ and $C$ are chosen so that the new image uses all the $y_i$, we call this **contrast stretching**.

{{< figure src="images/contrast_stretching.png" width="600" >}}

### Seuillage

$$
u \mapsto \mathbb{1}(u > \lambda)
$$

Image turns binary.

{{< figure src="images/seuillage.png" width="600" >}}

### Gamma transformation

$$
u \mapsto u^\gamma
$$

Older cameras would capture images in a non-linear form.
The gamma transformation was then used to "cancel" the non-linear aspect of the image (usually $\gamma = 2.5$).

{{< figure src="images/gamma.png" width="600" >}}

## Histogram equalization

{{< notice "definition" "Histogram equalization" >}}
{{< markdown >}}

We can do a contrast change where $g \equiv H_u$. This is called an **histogram equalization**.

{{< /markdown >}}
{{< /notice >}}

We call this operation "equalization" because the cumulative histogram of the result, $H_{g(u)}$ approximates the identity function.
More precisely,

{{< notice "info" >}}
{{< markdown >}}

We have $H_{H_u \circ u}(\lambda) \leq \lambda$ for all $\lambda$, with equality where $\lambda = H_u(y_i)$.

{{< /markdown >}}
{{< /notice >}}

{{< figure src="images/ex_equalization_1.png" width="600" >}}

However, the equalization has a big flaw: **regions with great contrast differences in the original image might have little contrast changes in the final image**.
We can observe this phenomenon in the following image:

{{< figure src="images/ex_equalization_2.png" width="600" >}}

Furthermore, the equalization can **increase the quantification noise**.

{{< figure src="images/ex_equalization_3.png" width="600" >}}

## Histogram specification

Now, instead of $H_{g(u)} \approx \mathrm{Id}$, we want $H_{g(u)}(\lambda) \approx F$, given an arbitrary strictly increasing function $F$.
To this end, we can set $g \equiv F^{-1} \circ H_u$.

Then, just like the histogram equalization, we will have $H_{F^{-1} \circ H_u \circ u}(\lambda) \leq F(\lambda)$ with equality when $\lambda = (F^{-1} \circ H_u)(y_i)$.

{{< figure src="images/ex_equalization_3.png" width="600" >}}

We can go further and try to give to $u$ the same histogram as another image $v$.
To do so, we can simply set $F \equiv H_v$ and use histogram specification.

However, we cannot be sure that $H_v^{-1}$ exists!
To solve this problem, we can define a *pseudo-inverse* of $H_v$ as follows:

{{< notice "definition" "Pseudo-inverse" >}}
{{< markdown >}}

$$
H_v^{-1}(\alpha) = \inf{\{ \lambda \mid H_v(\lambda) \geq \alpha \}}, \qquad \forall \alpha \in (0, 1]
$$
In simpler terms, this means that $H_v^{-1}$ will be constant by parts and for every point $\mathbf{x} \in \Omega$, we have $(H_v^{-1} \circ H_v)(v(\mathbf{x})) = v(\mathbf{x})$.

{{< /markdown >}}
{{< /notice >}}

## Quantification

## Dithering
