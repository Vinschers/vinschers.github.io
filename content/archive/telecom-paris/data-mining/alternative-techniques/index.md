+++
title = "Alternative classification techniques"
date = 2024-10-09
+++

## K-Nearest Neighbors classifier

The idea is to represent each record in the data set as an element in $\mathbb{R}^n$ $\DeclareMathOperator*{\argmax}{arg \,max \,} \DeclareMathOperator*{\argmin}{arg \,min \,}$.
Then, to predict the class of a new point $x$, compute the $k$ points that are nearest to $x$.
The majority class of these $k$ points is the predicted class of $x$.

To run this algorithm, we need to define a distance function and also a value for $k$.

For the distance function, we usually use the euclidean distance or the cossine similarity.
Regarding the choice of $k$:
- If $k$ is too small, the model gets too sensitive to noise;
- If $k$ is too big, the model will consider data from other classes as neighbors.

It is a good idea to scale all the attributes before running the algorithm.
It suffers from the **curse of dimensionality**: data becomes sparse and leads to scalability issues.
Classifying new records is also relatively expensive.

## Naïve Bayes classifier

We assume that attributes and class labels are random variables.
Suppose the attributes of a record $X$ are $(a_1, \dots, a_n)$.
The goal is to maximize the probability of $X$ being of a given class.
In other words,
$$
c_X = \argmax_{c \in C} \mathbb{P}(c \mid X) = \argmax_{c \in C} \mathbb{P}(c \mid a_1, \dots, a_n)
$$
where $c_X$ is the predicted class of $X$ and $C$ is the set of all possible classes.

Using Bayes' theorem, we can rewrite $\mathbb{P}(c \mid X)$ as follows:
$$
\mathbb{P}(c \mid X) = \frac{\mathbb{P}(X \mid c) \mathbb{P}(c)}{\mathbb{P}(X)} \propto \mathbb{P}(a_1, \dots, a_n \mid c) \mathbb{P}(c)
$$

So, we have to choose $c$ to maximize the expression above.
Assuming that the attributes are independent, we have:
$$
\mathbb{P}(X \mid c) = \prod_{i = 1}^n \mathbb{P}(a_i \mid c)
$$

Then, for discrete attributes, it is easy to find the class that maximizes $\mathbb{P}(c \mid X)$.

### Dealing with continuous attributes

Our first attempt in handling continuous attributes might be to organize them into *buckets* of data.
However, this approach breaks the independence assumption.

We can also transform the continuous attributes into a boolean attribute that checks whether $A < v$ or not.
Although this preserves the independence, we lose a lot of information by doing this.

Lastly, we can suppose that the continuous attributes follow a probabilistic distribution.
From the training data, we can find the mean and the variance.
Using this information, we can calculate the probability density function and, thus, find $\mathbb{P}(A \mid c)$.

{{< notice warning >}}
{{< markdown >}}
Let $f(x)$ be a probability density function.
We **cannot** say that $\mathbb{P}(x) = f(x)$ (in a continuous model, it does not make sense).
However, we can use $f(x)$ because it still gives us a proportional likelihood.
{{< /markdown >}}
{{< /notice >}}

### Dealing with zeros in probabilities

Sometimes, one of the conditional probabilities is zero, i.e. $N_{ic} = 0$, where $N_{ic}$ is the number of records in class $c$ that have attribute $A_i$.
If this happens, $\mathbb{P}(X \mid c) = 0$, which is a problem.

To solve this issue, we can apply two tactics to solve this problem:
- **Laplace estimation**: we compute the conditional probability as
$$
\mathbb{P}(A_i \mid c) = \frac{N_{ic} + 1}{N_c + |C|}
$$
where $N_c$ is the number of records in class $c$ and $|C|$ is the number of classes.
- **m-estimate**:
$$
\mathbb{P}(A_i \mid c) = \frac{N_{ic} + mp}{N_c + m}
$$
where $m$ is a parameter that we choose and $p$ is the prior probability $\mathbb{P}(c)$.

### Dealing with missing attributes

There are two options:
- Delete the records that have an attribute whose value is missing;
- When computing the probability of an attribute that is missing, simply do not consider it in the calculation. If this record has some attributes with values, then it is considered.

### Conclusion

The Naïve Bayes classifier is robust to noise and can handle missing values well.
It is also robust to irrelevant attributes, since their probability will be very small.

However, we are assuming that given a class $c$, the attributes of each record are independent, which is not always the case.
