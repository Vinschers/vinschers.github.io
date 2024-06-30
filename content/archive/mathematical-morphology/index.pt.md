+++
title = 'Morfologia matemática'
date = 2024-06-13
draft = false
+++

## Fundamentos matemáticos

Vamos usar *teoria de conjuntos* para representar a forma dos objetos em uma imagem.
Por convenção, objetos em uma imagem binária serão representados por pixels pretos (valor 1), enquanto o fundo será formado por pixels brancos (valor 0).
Dessa forma, uma imagem binária pode ser considerada uma coleção de coordenadas discretas que correspondem aos pontos pertencentes aos objetos na imagem, expressa pelo conjunto $\{(x, y) \mid f(x, y) = 1\} \subset \mathbb{Z}^2$.

{{< notice warning >}}
A representação dos pontos é $(x, y)$, i.e., $(\text{coluna}, \text{linha})$.
{{< /notice >}}

Sejam A e B duas imagens binárias representadas pelos conjuntos no espaço $\mathbb{Z}^2$.

A *translação* de $A$ pelo elemento $p \in \mathbb{Z}^2$, denotada $A + p$, é definida como
$$
A + p = \{a + p \mid a \in A\}
$$

A *reflexão* de $A$, denotada $\hat{A}$, é definida como
$$
\hat{A} = \{-a \mid a \in A\}
$$

O *complemento* de $A$, denotado $A^c$, é o conjunto de todos os pixels que não pertencem a $A$, dado por
$$
A^c = \{p \mid p \not\in A\}
$$

As operações de *união*, *intersecção* e *diferença* são as usuais em teoria de conjuntos.

Um **operador morfológico** é um mapeamento entre o conjunto $A$ que define a imagem e um conjunto $B$, chamado **elemento estruturante**, também definido em $\mathbb{Z}^2$.
O elemento estruturante é expresso com respeito a uma origem local, marcada com uma cruz ($+$).

{{< notice example >}}
Exemplos de elementos estruturantes:

![Exemplos de elementos estruturantes](/mc920/mathematical-morphology/ex_structuring_element.png "400")

{{< /notice >}}

A *adição de Minkowski* entre $A$ e $B$, denotada $A \oplus B$, é definida como
$$
A \oplus B = \bigcup_{b \in B} (A + b) = \bigcup_{\substack{a \in A \\ b \in B}} (a + b)
$$
Portanto, a adição $A \oplus B$ é obtida pela translação de $A$ com relação a cada elemento de $B$, tomando-se a união de todas as translações resultantes.
Algumas propriedades desta operação são:

- $A \oplus \{\overline{O}\} = A$, em que $\overline{O}$ denota a origem $(0, 0)$
- $A \oplus \{p\} = A + p$, para qualquer $p \in \mathbb{Z}^2$
- $A \oplus B = B \oplus A$ (comutatividade)
- $(A \oplus B) \oplus C = A \oplus (B \oplus C)$ (associatividade)

{{< notice example >}}
Um exemplo de adição de Minkowski pode ser visto a seguir.

![Exemplo de adição de Minkowski](/mc920/mathematical-morphology/ex_minkowski_sum.png "600")
{{< /notice >}}

A *subtração de Minkowski* entre $A$ e $B$, denotada $A \ominus B$, é definida como
$$
A \ominus B = \bigcap_{b \in B} (A - b) = \bigcap_{b \in \hat{B}} (A + b)
$$
tal que $A \ominus B$ é a intersecção de todas as translações de A pelo elemento $-b \in B$ ou, equivalentemente, por $b \in \hat{B}$, em que $\hat{B}$ é a reflexão de $B$.

{{< notice example >}}
Um exemplo de subtração de Minkowski pode ser visto a seguir.

![Exemplo de subtração de Minkowski](/mc920/mathematical-morphology/ex_minkowski_sub.png "600")
{{< /notice >}}

A subtração de Minkowski **não é associativa**.
Nós temos as seguintes relações desta operação:

- $(A \ominus B) \ominus C = A \ominus (B \oplus C)$
- $(A \ominus B) \ominus C = (A \ominus C) \ominus B$
- $(A \oplus B)^c = A^c \ominus \hat{B}$
- $(A \ominus B)^c = A^c \oplus \hat{B}$

## Operadores morfológicos em imagens binárias

A operação de *dilatação* entre o conjunto $A$ e o elemento estruturante $B$ é definida como a adição de Minkowski, ou seja
$$
\mathcal{D}(A, B) = A \oplus B
$$

A operação de *erosão* entre o conjunto $A$ e o elemento estruturante $B$ é definida como a subtração de Minkowski, ou seja
$$
\mathcal{E}(A, B) = A \ominus B
$$

{{< notice example >}}
Os efeitos das operações de dilatação e erosão podem ser observados na figura a seguir.

![Efeitos da dilatação e erosão](/mc920/mathematical-morphology/dilation_erosion_effects.png "800")
{{< /notice >}}

{{< notice tip >}}
Uma forma mais simples de visualizar o resultado da dilatação consiste em mover a origem do elemento estruturante $B$ sobre cada pixel dos objetos na imagem binária $A$ e atribuir o valor $1$ a cada posição da imagem que é sobreposta pelo elemento estruturante.

A erosão consiste em mover a origem do elemento estruturante $B$ sobre a imagem
$A$, tal que, caso o elemento estruturante esteja totalmente contido em $A$, o pixel da
imagem sob a origem de $B$ pertencerá à erosão entre $A$ e $B$.
{{< /notice >}}

{{< notice example >}}
Mais exemplos de dilatação e erosão:

![Exemplo de dilatação](/mc920/mathematical-morphology/ex_dilation.png "500")

![Exemplo de erosão](/mc920/mathematical-morphology/ex_erosion.png "500")
{{< /notice >}}

{{< notice info >}}
Para a dilatação e erosão, podemos decompor o elemento estruturante $B$ para reduzir a complexidade computacional.

![Exemplo de erosão](/mc920/mathematical-morphology/decomposition_structuring_element.png "500")
{{< /notice >}}

$A \bullet B = (A \oplus B) \ominus B$

$A \circ B = (A \ominus B) \oplus B$
