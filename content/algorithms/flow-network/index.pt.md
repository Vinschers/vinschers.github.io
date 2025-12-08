+++
title = 'Fluxos em Redes'
date = 2024-06-13
draft = false
+++

## Definição do problema

> Seja $G$ um grafo orientado com capacidades não-negativas $w_{i, j}$ nos arcos, e dois vértices $s$ (origem) e $t$ (destino).
Qual o fluxo máximo que pode ser enviado de $s$ para $t$ respeitando as capacidades dos arcos?

A tabela abaixo mostra 3 algoritmos famosos que resolvem o problema do fluxo máximo em redes.

| Algoritmo      | Complexidade de tempo | Complexidade de espaço | Observações |
| :------------- | :-------------------: | :--------------------: | ----------- |
| Ford-Fulkerson |  $\mathcal{O}(n)$   |   $\mathcal{O}(n)$   |             |
| Edmonds-Karp   |  $\mathcal{O}(n)$   |   $\mathcal{O}(n)$   |             |
| Dinic          |  $\mathcal{O}(n)$   |   $\mathcal{O}(n)$   |             |

## Algoritmo de Ford-Fulkerson

Este algoritmo busca por um **caminho aumentante** $p$ a cada iteração, ou seja, um caminho de $s$ para $t$ que passa somente por arcos com capacidade positiva no grafo residual.
O **grafo residual** é inicializado igual ao grafo original, mas assim que um fluxo escoa por um caminho, as **capacidades residuais** dos arcos pertencentes ao caminho são atualizadas.

Uma vez que um caminho aumentante $p$ é encontrado, verifica-se a capacidade mínima $f$ (**gargalo**) dos arcos que pertencem ao caminho.
Em seguida, duas operações são realizadas:

1. Para cada arco de "**avanço**" $(i, j)$, subtrair de sua capacidade residual $\text{res}_{i, j}$ o montante $f$, i.e., $\text{res}_{i, j} = \text{res}_{i, j} - f$.
2. Para cada arco de "**retrocesso**" $(j, i)$, somar à sua capacidade residual $\text{res}_{j, i}$ o montante $f$, i.e., $\text{res}_{j, i} = \text{res}_{j, i} + f$.

{{< spoiler "Mostrar implementação" >}}

{{< tabs >}}

{{< tab tabName="C++" >}}
{{< code language="cpp" source="ford-fulkerson.cpp" >}}
{{< /tab >}}

{{< tab tabName="Python" >}}
{{< code language="python" source="ford-fulkerson.py" >}}
{{< /tab >}}

{{< /tabs >}}

{{< /spoiler >}}

## Algoritmo de Edmonds-Karp

## Algoritmo de Dinic
