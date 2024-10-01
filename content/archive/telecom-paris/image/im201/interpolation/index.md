+++
title = "Interpolation, geometric transformations and filtering"
date = 2024-09-30
+++

## Interpolation

Our goal is to calculate the value of a pixel that is outside the grid of the image.
To this end, we will *interpolate* the image.

Depending on our hypothesis, we can arrive to different interpolation methods.

1. Constant by parts: nearest neighbor;
2. Continue: bi-linear;
3. Polynomial of degree 3: bi-cubic;
4. Limited band: Fourier interpolation.

We will call our discrete image $I_d$ and the continuous image after interpolation $I_c$.

In the following example grid, where $\alpha, \beta, \gamma, \delta$ are the corner pixel values and we try to estimate the pixel in the black dot (we will call $\xi$).

{{< figure src="images/grid.png" width="500" >}}

### Nearest neighbor

$$
I_c(x, y) = I_d(\lfloor x + 0.5 \rfloor, \lfloor y + 0.5 \rfloor)
$$

This function can also be expressed as a convolution:
$$
I_c = I_d \ast T_0, \qquad T_0(x, y) = \begin{cases} 1 & \vert x \vert, \vert y \vert < 0.5 \\ 0 & \text{otherwise} \end{cases}
$$

### Bi-linear interpolation

Now, we suppose that $I_d$ is piecewise linear.
To simplify our notation, we will consider $i_0 = \lfloor x \rfloor$, $j_0 = \lfloor y \rfloor$, $x_F = x - i_0$ and $y_F = y - j_0$.
Then,

$$
\begin{align*}
I_c(x, y) = & x_F \times y_F \times I_d(i_0 + 1, j_0 + 1) \\
& + (1 - x_F) \times y_F \times I_d(i_0, j_0 + 1) \\
& + x_F \times (1 - y_F) \times I_d(i_0 + 1, j_0) \\
& + (1 - x_F) \times (1 - y_F) \times I_d(i_0, j_0)
\end{align*}
$$

We can also express this interpolation as a convolution:

$$
I_c = I_d \ast T_1, \qquad T_1(x, y) = \begin{cases} (1 - \vert x \vert) (1 - \vert y \vert) & \vert x \vert, \vert y \vert < 1 \\ 0 & \text{otherwise} \end{cases}
$$
Here, $T_1$ is a triangular function.

### Bi-cubic interpolation
