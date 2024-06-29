+++
title = 'Pinocchio: Nearly Practical Verifiable Computation'
date = 2024-06-28
draft = false
+++

## Introduction

- $F$ only with $+$ and $\times$

## Background

### Verifiable Computations

The main idea of Pinocchio is to provide a effective framework for verifiable computation.
But what really *is* verifiable computation?

{{< notice definition "Public Verifiable Computation" >}}
{{< markdown >}}
A public verifiable computation scheme $\mathcal{VC}$ consists of a set of three polynomial-time algorithms (KeyGen, Compute, Verify) defined as follows.

- $(\text{EK}_F, \text{VK}_F) \leftarrow \text{KeyGen}(F, 1^\lambda)$: Outputs a *public* evaluation key $\text{EK}_F$ and a public verification key $\text{VK}_F$.

- $(y, \pi_y) \leftarrow \text{Compute}(\text{EK}_F, u)$: Outputs $y \leftarrow F(u)$ and a proof $\pi_y$.

- $\{0, 1\} \leftarrow \text{Verify}(\text{VK}_F, u, y, \pi_y)$: Uses $\text{VK}_F$ and outputs whether $F(u) = y$.
{{< /markdown >}}
{{< /notice >}}

In other words, a Public Verifiable Computation scheme (VC scheme for short) allows us to compute any function $F$ on input $u$ and, then, *publicly* verify that $F(u)$ is indeed equal to $y$.
We shall also utilise the following definitions for correctness, security and efficiency:

- **Correctness**: For any function $F$, and any input $u$ to $F$, if we run $(\text{EK}_F, \text{VK}_F) \leftarrow \text{KeyGen}(F, 1^\lambda)$ and $(y, \pi_y) \leftarrow \text{Compute}(\text{EK}_F, u)$, then we always get $1 = \text{Verify}(\text{VK}_F, u, y, \pi_y)$.

- **Security**: For any function $F$ and any probabilistic polynomial-time adversary $\mathcal{A}$, $\text{Pr}[(\hat{u}, \hat{y}, \hat{\pi_y}) \leftarrow \mathcal{A}(\text{EK}_F, \text{VK}_F) \colon F(\hat(u) \neq \hat{y} \; \text{and} \; 1 = \text{Verify}(\text{VK}_F, \hat{u}, \hat{y}, \hat{\pi_y})] \leq \text{negl}(\lambda)$.

- **Efficiency**: KeyGen is assumed to be a one-time operation whose cost is amortized over many calculations, but we require that Verify is cheaper than evaluating $F$.

Note that when specifying the security of a VC scheme, we allow for and adversary to be able to fake a computation that did not occur in reality.
However, by the correctness of the scheme, a computation that happened will never return 0 after a Verify function call.

It is worth mentioning that many previous VC schemes were not publicly verifiable, which increased the attack surface since a leak of the verification key, $\text{VK}_F$, could lead to attacks on the system.
A public scheme avoids these issues.

The whole idea of Pinocchio is to build such a VC scheme that works securely and efficiently.
To this end, we will use the notion of Quadratic Arithmetic Programs, which will be defined and explained in the next section.

### Quadratic Arithmetic Programs

Since we are interested in functions $F$ that can be expressed with sums and multiplications, a great way to represent such functions is by an arithmetic circuit.
Such circuit is made up from nodes (or gates) that represent operations (sums or multiplications) and a set of input and output wires.
Each node is connected with wires that carry values from a field $\mathbb{F}$.
A way to encode (represent) such circuit is by using a *Quadratic Arithmetic Program* (QAP).

{{< notice definition "Quadratic Arithmetic Program" >}}
A QAP $Q$ over field $\mathbb{F}$ contains three sets of $m + 1$ polynomials $\mathcal{V} = \{ v_k(x) \}$, $\mathcal{W} = \{ w_k(x) \}$, $\mathcal{Y} = \{ y_k(x) \}$, for $k \in \{0, \dots, m\}$, and a target polynomial $t(x)$.
{{< /notice >}}

We will also need the concept of a QAP that *computes* a function $F$.

{{< notice info "Computation of a QAP" >}}
{{< markdown >}}
Suppose $F$ is a function that takes as input $n$ elements of $\mathbb{F}$ and outputs $n^\prime$ elements, for a total of $N = n + n^\prime$ I/O elements.
Then, we say that $Q$ *computes* $F$ if:

$(c_1, \dots, c_N) \in \mathbb{F}^N$ is a valid assignment of $F$'s inputs and outputs *if, and only if,* there exist coefficients $(c_{N + 1}, \dots, c_m)$ such that $t(x)$ divides $p(x)$, where:
$$
p(x) = v(x) w(x) - y(x)
$$
and
$$
v(x) = v_0(x) + \sum_{k = 1}^{m} c_k v_k(x)
$$
$$
w(x) = w_0(x) + \sum_{k = 1}^{m} c_k w_k(x)
$$
$$
y(x) = y_0(x) + \sum_{k = 1}^{m} c_k y_k(x)
$$
{{< /markdown >}}
{{< /notice >}}

In other words, there must exist $h(x)$ such that $t(x) h(x) = p(x)$.
The size of $Q$ in this case is $m$ and its degree is the same as $t(x)$'s degree.

Remember that a QAP is only a way to represent an arithmetic circuit.
Let us, then, show how to build a QAP from a circuit C.
First, we choose an arbitrary root $r_g \in \mathbb{F}$ for each multiplication gate, $g$, in C.
Then, our target polynomial $t(x)$ will be:
$$
t(x) = \prod_{g \in C} (x - r_g)
$$
Thus, the roots of $t$ are precisely the roots we specified for the multiplicative gates.
Now, we assign the index $k \in [n] = \{1, \dots, n\}$ to each of the $n$ inputs of the circuit and the index $k \in [n + 1, m] \subset \mathbb{N}$ to each of the outputs of multiplication gates $g \in C$.

Finally, we let $v_k(x)$, $w_k(x)$ and $y_k(x)$ encode the left input, right input and output of each gate, respectively.
The way the encode works is as follows:
if $k$-th wire is a left input of gate $g$, then $v_k(r_g) = 1$.
Otherwise, $v_k(r_g) = 0$.
The same goes for $w_k(x)$ and $y_k(x)$.

This way, we just defined $\mathcal{V}$, $\mathcal{W}$ and $\mathcal{Y}$ from the definition of the QAP.

{{< notice example >}}
Let $F(c_1, c_2, c_3, c_4) = (c_1 + c_2) \times (c_3 \times c_4)$ be a function of 4 inputs and 1 output.
The following figure shows an arithmetic circuit that computes this function.

{{< mermaid >}}
graph TB
1[$c_1$]
2[$c_2$]
3[$c_3$]
4[$c_4$]

1 & 2 --- op1(($+$))
3 & 4 --- op2(($\times$))

op2 --- 5[$c_5$]

op1 & 5 --- op3(($\times$))
op3 --- 6[$c_6$]
{{< /mermaid >}}

{{< markdown >}}
Let us say that the multiplication gate between $c_1$ and $c_2$ is $r_5$, its output wire is $c_5$ and $c_6$ is the output of the last multiplication gate, which is $r_6$.
Below are some evaluations of polynomials from $\mathcal{V}$, $\mathcal{W}$ and $\mathcal{Y}$:

- $v_1(r_5) = 0$; $v_1(r_6) = 1$.

- $v_2(r_5) = 0$; $v_2(r_6) = 1$.

- $w_3(r_5) = 0$; $w_3(r_6) = 0$.

- $w_4(r_5) = 1$; $w_4(r_6) = 0$.

- $y_5(r_5) = 1$; $y_5(r_6) = 0$.

- $y_6(r_5) = 0$; $y_6(r_6) = 1$.

We can also say that $t(x) = (x - r_5) (x - r_6)$.

{{< /markdown >}}
{{< /notice >}}

Following our definitions of $\mathcal{V}$, $\mathcal{W}$ and $\mathcal{Y}$, it is easy to see that
$$
v(r_g) w(r_g) = \left( \sum_{k \in I_\text{left}} c_k \right) \left( \sum_{k \in I_\text{right}} c_k \right) = c_g y_k(r_g) = c_g,
$$
when considering a particular multiplication gate $g$ and its root $r_g$.
Thus, we have $p(r_g) = 0$ for every multiplicative gate.
This means that we can check whether $t(x)$ divides $p(x)$ simply by checking the evaluation of $p(x)$ at the roots of the multiplication gates.
Note that in order for $p(x)$ to have roots at the points $r_g$, all $c_i$, $i \in [m]$, must be computed, which in turn include the outputs of $F$

### Bilinear Groups

The last idea we need before getting into Pinocchio's implementation is the concept of *bilinear groups*.

{{< notice definition "Bilinear groups" >}}
{{< markdown >}}
Bilinear groups are a set of three abstract algebraic groups, $\mathbb{G}_1$, $\mathbb{G}_2$ and $\mathbb{G}_T$, together with a deterministic function $e \colon \mathbb{G}_1 \times \mathbb{G}_2 \to \mathbb{G}_T$, called a bilinear map.
{{< /markdown >}}
{{< /notice >}}

The special property we are looking for is the bilinearity of $e$.

{{< notice info "Bilinearity of map" >}}
{{< markdown >}}
Suppose $|\mathbb{G}_1| = |\mathbb{G}_2| = |\mathbb{G}_T| = Q$, $g_1 \in \mathbb{G}_1$ generates group $\mathbb{G}_1$ and $g_2 \in \mathbb{G}_2$ generates group $\mathbb{G}_2$.
Then, for all $a, b < Q$, we have that
$$
e(g_1^a, g_2^b) = e(g_1, g_2)^{ab}.
$$
{{< /markdown >}}
{{< /notice >}}

The main thing to keep in mind is what happens to the exponents $a$ and $b$ during the mapping: they are multiplied.
Usually, we have $\mathbb{G}_1, \mathbb{G}_2 \neq \mathbb{G}_T$, so the output of the function cannot be used again in $e$ as input.

From the property of bilinearity, we can derive several other useful properties.
We highlight two of them that we will need later on:

- $e(g_1^a, g_2^b) = e(g_1, g_2)^{ab} = e(g_1^{ab}, g_2)$.

- If $c < Q$, then $\frac{e(g_1^{ab}, g_2)}{e(g_1^c, g_2)} = \frac{e(g_1, g_2)^{ab}}{e(g_1, g_2)^{c}} = e(g_1, g_2)^{ab - c} = e(g_1^{ab - c}, g_2)$.

### Schwartz-Zippel lemma

The Schwartz-Zippel lemma is a very useful mathematical tool to check for the equality of two polynomials efficiently.
The lemma is given below.

{{< notice tip "Schwartz-Zippel lemma" >}}
{{< markdown >}}
Let $f(x) \in \mathbb{F}[x]$ be a non-zero polynomial of degree $d \geq 0$.
Then, if we sample $s$ uniformly at random from $\mathbb{F}$, it holds that
$$
\text{Pr}[f(s) = 0] \leq \frac{d}{|\mathbb{F}|}
$$
{{< /markdown >}}
{{< /notice >}}

The key consequence of the lemma is that the probability of two polynomials of degree less than or equal to $d$ evaluating to the same value at a random point if $\mathbb{F}$ is also bounded by $\frac{d}{|\mathbb{F}|}$.
In other words, if two polynomials, $p_1$ and $p_2$, are equal at a random point $s \in \mathbb{F}$, the probability that $p_1 \neq p_2$ is at most $\frac{d}{|\mathbb{F}|}$, which is unlikely if the field $\mathbb{F}$ is big enough.

All this to say that we will assume polynomials $p_1(x)$ and $p_2(x)$ are equal for all $x \in \mathbb{F}$ if they are equal at a random point.

## Pinocchio

Now we have all the theoretic background we need to implement Pinocchio.
Just a small recapitulation: our goal is to build a generic VC scheme that computes any function $F$ that can be written with sums and multiplications.
To this end, we will describe Pinocchio's implementation for each of the functions specified in the definition of a VC scheme.

### Key generation

The KeyGen function takes as input the function $F$ and the security parameter $\lambda$ and it outputs the evaluation key $\text{EK}_F$ and the verification key $\text{VK}_F$.
The first step is to convert $F$ into an arithmetic circuit $C$ and, then, build the corresponding QAP $Q = (t(x), \mathcal{V}, \mathcal{W}, \mathcal{Y})$ of size $m$ and degree $d$.
Also, let $I_\text{mid} = \{N + 1, \dots, m\}$ be the non-IO-related indices, $e \colon \mathbb{G} \times \mathbb{G} \to \mathbb{G}_T$ be a non-trivial bilinear map, and $g \in \mathbb{G}$ be a generator of $\mathbb{G}$.

Now, choose $r_v, r_w, s, \alpha_v, \alpha_w, \alpha_y, \beta, \gamma \xleftarrow{R} \mathbb{F}$ and set $r_y = r_v r_w$, $g_v = g^{r_v}$, $g_w = g^{r_w}$ and $g_y = g^{r_y}$.
Here, $s$ is a secret and random value that will be used in conjunction to the Schwartz-Zippel lemma later.
Finally, we define the evaluation and verification keys as follows:
$$
\begin{align*}
    \text{EK}_F = (\quad &\{g_v^{v_k(s)}\}_{k \in I_\text{mid}}, &&\{g_w^{w_k(s)}\}_{k \in I_\text{mid}}, &\{g_y^{y_k(s)}\}_{k \in I_\text{mid}}, \\
    &\{g_v^{\alpha_v v_k(s)}\}_{k \in I_\text{mid}}, &&\{g_w^{\alpha_w w_k(s)}\}_{k \in I_\text{mid}}, &\{g_y^{\alpha_y y_k(s)}\}_{k \in I_\text{mid}}, \\
    &\{g^{s^i}\}_{i \in [d]}, && \{g_v^{\beta v_k(s)} g_w^{\beta w_k(s)} g_y^{\beta y_k(s)}\}_{k \in I_\text{mid}} \quad)
\end{align*}
$$
$$
\text{VK}_F = (g^1, g^{\alpha_v}, g^{\alpha_w}, g^{\alpha_y}, g^{\gamma}, g^{\beta \gamma}, g_y^{t(s)}, \{g_v^{v_k(s)}, g_w^{w_k(s)}, g_y^{y_k(s)}\}_{k \in \{0\} \cup [N]})
$$

### Computation

The Compute function takes as input the evaluation key, $\text{EK}_F$, and the input of $F$, $u$, and outputs $(y, \pi_y)$ where $y = F(u)$ and $\pi_y$ is a proof that the computation was indeed executed.

To do so, the worker simply evaluates $F(u)$ using the circuit $C$ and stores the output in $y$.
By doing it, the worker is also able to compute all $c_i$, $i \in [m]$, inside the circuit.
Since it knows the QAP $Q$ as well, the worker can calculate $h(x)$ by doing the polynomial division below.
$$
\frac{p(x)}{t(x)} = h(x) = h_0 + h_1 x + h_2 x^2 + \dots + h_d x^d
$$

Now, it is easy for the worker to compute $v_\text{mid}(s)$, $w_\text{mid}(s)$, and $y_\text{mid}(s)$ using the properties of exponentiation.

$$
\prod_{k \in I_\text{mid}} \left( g_v^{v_k(s)} \right)^{c_k} = g_v^{\sum_{k \in I_\text{mid}} c_k v_k(s)} = g_v^{v_\text{mid}(s)}
$$
$$
\prod_{k \in I_\text{mid}} \left( g_w^{w_k(s)} \right)^{c_k} = g_w^{\sum_{k \in I_\text{mid}} c_k w_k(s)} = g_w^{w_\text{mid}(s)}
$$
$$
\prod_{k \in I_\text{mid}} \left( g_y^{y_k(s)} \right)^{c_k} = g_y^{\sum_{k \in I_\text{mid}} c_k y_k(s)} = g_y^{y_\text{mid}(s)}
$$

The same idea can be extended to $\alpha_v v_\text{mid}(s)$, $\alpha_w w_\text{mid}(s)$, $\alpha_y y_\text{mid}(s)$ and $g_v^{\beta v_\text{mid}(s)} g_w^{\beta w_\text{mid}(s)} g_y^{\beta y_\text{mid}(s)}$.
Finally, we determine $h(s)$:
$$
\prod_{i \in \{0\} \cup [d]} \left( g^{s^i} \right)^{h_i} = g^{\sum_{i \in \{0\} \cup [d]} h_i s^i} = g^{h(s)}
$$

Thus, our proof $\pi_y$ is as follows.
$$
\begin{align*}
    \pi_y = (\quad &g_v^{v_\text{mid}(s)}, &&g_w^{w_\text{mid}(s)}, &g_y^{y_\text{mid}(s)}, \\
    &g_v^{\alpha_v v_\text{mid}(s)}, &&g_w^{\alpha_w w_\text{mid}(s)}, &g_y^{\alpha_y y_\text{mid}(s)}, \\
    &g^{h(s)}, &&g_v^{\beta v_\text{mid}(s)} g_w^{\beta w_\text{mid}(s)} g_y^{\beta y_\text{mid}(s)} \quad)
\end{align*}
$$

### Verification

### Security

### Zero-knowledge proofs

## Results

## Comparison to other works

## Conclusion