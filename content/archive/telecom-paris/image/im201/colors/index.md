+++
title = "Colors"
date = 2024-10-07
+++

Color is the result of 3 things:

1. An illuminant: source of light ($I(\lambda)$);
2. An object: absorbs and reflects light ($R(\lambda)$);
3. An observer: sensor ($S(\lambda) = I(\lambda) R(\lambda)$).

We perceive colors by multiplying ...

## White balance

{{< figure src="images/wb.png" width="400" >}}

The idea is to do a linear transformation in each color channel.
If the illuminant has a color $(R_0, G_0, B_0)$, then we apply the following transformation:
$$
T \colon (R, G, B) \to \left( \frac{R_1}{R_0} R, \frac{G_1}{G_0} G, \frac{B_1}{B_0} B \right)
$$

where $(R_1, G_1, B_1)$ represents the reference illuminant.
There are many ways to estimate $(R_0, G_0, B_0)$:

- Gray world: global average of channels
- White patch: usage of the brightest pixels.

## Alternative representative spaces (HSV)

With HSV, we separate the Hue (color), Saturation and Lightness.
With such a model, we are able to apply all 1-dimensional algorithms to colored images.

{{< figure src="images/hsv.png" width="400" >}}
