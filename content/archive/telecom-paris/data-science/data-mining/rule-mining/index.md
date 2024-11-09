+++
title = "Rule Mining"
date = 2024-11-06
+++

**Goal**: Identify items that are bought together by sufficiently many customers.

We will do so by finding dependencies among items from data collected.
Our **input** is composed of a table of items and a table of baskets.
Each basket is a list of items purchased together.
Then, we use the baskets to find dependencies of the form $\{x, y, z\} \rightarrow \{v, w\}$.

{{< notice definition "Support" >}}
{{< markdown >}}

The *support* of a set of items $I$ is the number of baskets that contain all the items in $I$.

{{< /markdown >}}
{{< /notice >}}

Given a *support threshold*, we can classify itemsets as frequent of not.

$I = \{i_1, \dots, i_k\} \rightarrow j$ means that a basket that contains $i_1, \dots, i_k$ is also likely to contain $j$.
We can then compute the **confidence** of this association rule.
$$
\mathrm{conf}(I \rightarrow j) = \frac{\mathrm{supp}(I \cup j)}{\mathrm{supp}(I)}
$$
It is also possible to compute the **support** of this association rule.
$$
\mathrm{supp}(I \rightarrow j) = \mathrm{supp}(I)
$$

The **lift** measures the likelihood of $I$ and $j$ being observed together and how often they would be expected to be observed together.
$$
\mathrm{lift}(I \rightarrow j) = \frac{\mathrm{supp}(I \cup j)}{\mathrm{supp}(I) \times \mathrm{supp}(j)}
$$

**Problem**: find all association rules with support greater than $s$ and confidence greater than $c$.

The hard part is finding all the frequent itemsets.

## Finding frequent itemsets

### Frequent pairs
First, we generate all possible pairs of items.
Then, we prune the ones whose confidence is smaller than the threshold.

The naïve approach has huge complexity: $\mathcal{O}(n^2)$.
Instead, we can:
- count all pairs using a triangular matrix of size $n \times n$.
- Use a hashtable to count pairs $(i, j)$.

### Apriori algorithm

**Monotonicity**: If set $I$ is frequent, so is every set $J \subseteq I$.
The contrapositive says that if item $i$ does not appear in $s$ baskets, then no pair including $i$ is frequent.

Using this idea, we can prune non-frequent items in $\mathcal{O}(n)$.
Then, we can compute the pairs that only consist of frequent items.

We can extend the monotonicity approach to find $n$-tuples.
For example: we can find triplets by using frequent items and frequent pairs to form triplets.

### Park-Chen-Yu algorithm
