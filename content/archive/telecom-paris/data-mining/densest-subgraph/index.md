+++
title = "k-cores and Densest Subgraph"
date = 2024-10-09
+++

{{< notice definition "Induced subgraph" >}}
{{< markdown >}}

A graph $H = (V_H, E_H)$ is an induced subgraph of $G = (V_G, E_G)$ if $V_H \subseteq V_G$ and if $u, v \in V_H$ and $(u, v) \in E_G$, then $(u, v) \in E_H$.

{{< /markdown >}}
{{< /notice >}}

We will say that $\delta_G(v)$ is the number of edges incident to $v$ in $G$.

{{< notice definition "$k$-core" >}}
{{< markdown >}}

Given a graph $G$ and $k \geq 0$, a subgraph $H$ of $G$ is a $k$-core if:
- $\delta_H(v) \geq k$, for all $v \in V_H$;
- $|V_H|$ is maximum.

{{< /markdown >}}
{{< /notice >}}

{{< notice info >}}
{{< markdown >}}

A $k$-core can be computed in $\mathcal{O}(|E_G|)$ time using the following algorithm.

- While there is $v$ such that $\delta_H(v) < k$, do
    - Remove all vertices that have degree less than $k$ from $H$.

{{< /markdown >}}
{{< /notice >}}

{{< notice definition "$k$-core decomposition" >}}
{{< markdown >}}

A $k$-core decomposition specifies for each node $v \in V_G$ an integer $k_v$ such that $v$ is in the $k_v$-core of $G$ and $k_v$ is maximum.

{{< /markdown >}}
{{< /notice >}}

{{< notice note >}}
{{< markdown >}}

- A $k$-core might not be connected;
- The $k$-core is unique;
- If $v$ belongs to the $k$-core, then $v$ also belongs to any $\bar{k}$-core, where $\bar{k} < k$;
- A $k$-core decomposition can be computed in linear time.

{{< /markdown >}}
{{< /notice >}}

{{< notice definition "Average degree density" >}}
{{< markdown >}}

Let $G = (V, E)$ be a graph.
Its average degree density is:

$$
\rho(G) = \frac{|E|}{|V|} = \frac{m}{n}.
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice definition "Clique density" >}}
{{< markdown >}}

Let $G = (V, E)$ be a graph.
Its clique density is:

$$
\phi(G) = \frac{2 |E|}{|V| (|V| - 1)} = \frac{2m}{n (n - 1)}.
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice theorem "Handshake theorem" >}}
{{< markdown >}}

Let $G = (V, E)$ be a graph.
Then,

$$
\sum_{v \in V} \delta(v) = 2 |E| = 2m
$$

{{< /markdown >}}
{{< /notice >}}

{{< notice definition "Densest subgraph problem" >}}
{{< markdown >}}

Given a graph $G = (V, E)$, find a subgraph $H$ of $G$ with maximum average degree density.

{{< /markdown >}}
{{< /notice >}}

The problem can be solved in polynomial time.
However, we can compute an approximation in linear time with a greedy strategy.

{{< notice info "Densest subgraph algorithm" >}}
{{< markdown >}}

Let $G = (V, E)$ be a graph.
The algorithm goes as follows:

1. $H \leftarrow G$
2. While $E \geq 1$, do
    - $u \leftarrow \min_{v \in V} \delta(v)$
    - Remove $u$ and its edges from $G$
    - if $\rho(G) > \rho(H)$, then $H \leftarrow G$
3. Return $H$

This algorithm runs in $\mathcal{O}(V + E)$ time.
To do so, we can use three lists:
- A `degree` list: $\texttt{degree}[v] = \delta(v)$;
- A `bucket` list of degrees: $\texttt{bucket}[d] = \Delta_d = \{v_1, \dots, v_n\}$ where $\delta(v_i) = d$ (list of nodes that have degree $d$);
- A `location` list: $\texttt{location}[v] = i$, where $i$ is the index of $v$ in the list $\texttt{bucket}[\delta(v)]$.

With these three lists, one can remove a node and its edges in $\mathcal{O}(1)$ time and also update each of the neighbours of $u$ in $\mathcal{O}(1)$.
Note that the number of neighbours of $u$ is precisely $\delta(u)$.
This means that throughout the while loop in step 2, the complexity of updating the nodes is $\mathcal{O}(E)$.

Furthermore, in order to find the minimum degree in each iteration, we maintain a pointer to the previous minimum degree (`m`).
Then, we either have to decrease `m` by 1 or keep looking in the `bucket` list for the next `m`.
Overall, the complexity of this operation is $\mathcal{O}(V)$.

Adding everything up, we end up with an algorithm that runs in $\mathcal{O}(V + E)$ time.

{{< /markdown >}}
{{< /notice >}}

{{< notice theorem >}}
{{< markdown >}}

Let $O$ be the densest subgraph in $G$.
Our algorithm finds a subgraph $H$ such that
$$
\rho(H) \geq \frac{\rho(O)}{2}.
$$

{{< /markdown >}}
{{< /notice >}}

To find the optimal solution of the densest subgraph problem, we can use many strategies:
- Use a maximum flow algorithm;
- Use an algorithm based on Linear Programming;
- Use convex programming.

We can also modify the algorithm to compute the maximum densest clique of the graph by computing $\phi(G)$ and $\phi(H)$ at each iteration instead of $\rho(G)$ and $\rho(H)$ and also check for $V_H \geq k$.
