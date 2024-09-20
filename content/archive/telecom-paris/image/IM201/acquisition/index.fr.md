+++
title = "Acquisition d'Images"
date = 2024-09-16
draft = false
+++

## Le modèle sténopé

{{< figure src="images/modele_stenope.png" width="450" >}}

La première manière trés simple d'acquerir des images, c'est avec le modèle sténopé.
Ici, une partie de la lumière issue de l'objet passe par une petite trou d'ouverture $O$ et se projette sur le plan focal.

{{< figure src="images/modele_stenope_optique.png" width="600" >}}

La distance $f$ est appelée distance focale.
Supposons qu'on a le modèle suivant pour décrire le sténopé:

{{< figure src="images/stenope_rayons.png" width="600" >}}

Puisque l'ouverture $O$ est finie, les rayons produisent du flou.
Cet effet peut être modelisé par
$$
g_z \ast S
$$
où $S$ serait l'image "réel" et $g_z$ est la fonction indicatrice d'un disque de rayon $\frac{(z + f) D}{z}$.

{{< notice "note" >}}
Une fonction indicatrice sur un ensemble $E$ est nulle n'importe où sauf dans $E$, où elle est toujours $1$.
{{< /notice >}}

## L'utilisation de lentilles

Pour avoir une image plus nette, nous pouvons ajouter une lentille.
Elle se comporte comme indiqué dans l'image suivante.

{{< figure src="images/stenope_lentille.png" width="600" >}}

À retenir:
1. Les rayons qui passent à l'horizontal convergent au point focal;
2. Les rayons qui passent par l'origine $O$ ne changent pas;
3. Les rayons qui passent par une point focal sortent à l'horizontal.

Il est possible de calculer la distance focale $f$ avec la **Relation de Descartes**.
$$
\frac{1}{d} + \frac{1}{d^\prime} = \frac{1}{f}
$$

## Profondeur de champ

{{< figure src="images/rayons_profondeur_de_champ.png" width="600" >}}

La profondeur de champ est la distance séparant l'objet net le plus proche de l'appareil de l'objet net le plus lointain.
$$
\Delta \approx \frac{2 \varepsilon p^2}{D f}
$$
où $p$ est la distance de l'objet.
