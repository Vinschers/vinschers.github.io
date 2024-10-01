+++
title = "Image restauration"
date = 2024-09-30
draft = false
+++

There are inherit defects when an image is captured.

## Noise

The noise is an error of measurement in each pixel.
There are essentially 2 sources:

1. Read noise (uniform);
2. Photonic noise (depends on the luminosity): each photon has a probability $p$ to be measured ($p < 1$ to read only the color we want) in a Poisson distribution, then, $\mathbb{E}[Y] = N p (1 - p)$ and $\mathrm{Var}(Y) = N p (1 - p)$.

The relative photonic noise is, however,
$$
\frac{\sqrt{\mathrm{Var}(Y)}}{\mathbb{E}[Y]} = \frac{1}{\sqrt{N p (1 - p)}}
$$
so, the darker the place, the greater the relative noise.

{{< figure src="images/noise.png" width="400" >}}

## Blur

The blur can come from a variety of sources:

1. Optic: Good camera adjustment (less than 1 pixel of blur from field depth);
{{< figure src="images/optic_blur.png" width="150" >}}
2. Atmospheric turbulence: Gaussian model;
3. Movement;
{{< figure src="images/movement_blur.png" width="150" >}}
4. Diffraction: $\theta \propto \frac{\lambda}{D}$.
{{< figure src="images/diffraction_blur.png" width="150" >}}

## Geometric aberrations

...

## Bad sampling

The optic capacity is limited by the diffraction.

{{< figure src="images/bad_sampling.png" width="150" >}}

## Defects model

$$
g = f \ast K + b
$$
where:

- $f$ is the perfect image;
- $g$ is the observation;
- $K$ kernel of blur;
- $b$ noise (we suppose it is uniform and independent of the signal).

We will also suppose that the discretization is without loss and that the image is periodic.
Then, we can rewrite as
$$
g = A f + b
$$
where $A$ is the convolution matrix $N^2 \times N^2$ and $f$, $g$ and $b$ are matrices $N \times N$.
