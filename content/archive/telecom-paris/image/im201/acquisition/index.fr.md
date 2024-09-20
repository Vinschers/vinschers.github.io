+++
title = "Acquisition des Images"
date = 2024-09-16
draft = false
+++

## Le modèle sténopé

{{< figure src="images/modele_stenope.png" width="450" >}}

La première manière trés simple d'acquérir des images, c'est avec le modèle sténopé.
Ici, une partie de la lumière issue de l'objet passe par une petite trou d'ouverture $O$ et se projette sur le plan focal.
Nous faisons comme ça pour que chaque point de l'objet soit représenté par un rayon.
Sinon, l'image ne serait pas formée.

{{< figure src="images/modele_stenope_optique.png" width="600" >}}

La distance $f$ est appelée distance focale.
Supposons qu'on a le modèle suivant pour décrire le sténopé:

{{< figure src="images/stenope_rayons.png" width="600" >}}

Puisque l'ouverture $O$ est finie, les rayons produisent du flou.
Cet effet peut être modélisé par
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

{{< notice "info" >}}
Le nombre d'ouverture $N$ est défini par $N = \frac{f}{D}$.
D'habitude, il apparait en progression géométrique (à $q = \sqrt{2}$) et est représenté par $f / \cdot$.

{{< markdown >}}

- e.g. $f / 4$ signifie $N = 4$.

Quand $N$ augmente (à $f$ constant):

1. $\Delta$ augmente;
2. Les défauts de diffraction augmentent;
3. Les défauts de vignettage (image plus sombre près du bord) augmentent;

{{< /markdown >}}

{{< /notice >}}

## Echantillonnage

Maintenant, le but, c'est de transformer les photons de l'image en quelque chose électrique qui peut être digitalisé.

$$
\left( f \colon \mathbb{R}^2 \mapsto \mathbb{R} \right) \rightarrow (\{f(k)\}_{k \in \Omega}).
$$

On peut formaliser mathématiquement la comptage des photons par une convolution avec $g_{\text{capt}}$, qui est la fonction indicatrice du capteur.

$$
I_{i, j} = (I \ast g_{\text{capt}})(i, j)
$$

L'image suivante présente une example de grille de capteurs.
{{< figure src="images/capteur.png" width="250" >}}

L'échantillonnage d'une fonction $f$ en un point $\mathbf{x}$ est modélisé par
$$
f \cdot \delta_{\mathbf{x}}
$$

Donc, pour modéliser l'acquisition des images, nous allons utiliser le peigne de Dirac, $\Pi_\Gamma$, qui est défini prochainement.
$$
\Pi_\Gamma = \sum_{\gamma \in \Gamma} \delta_\gamma
$$
où $\Gamma$ est l'ensemble de positions où les détecteurs sont placées (e.g. $\Gamma \subset \mathbb{N}^2$).

Nous pouvons aussi places les détecteurs en un réseau hexagonal.
Ça peut apporté des avantages parfois.

{{< figure src="images/reseau_hex.png" width="350" >}}

## Le repliement

Si la fréquence d'échantillonnage est plus petit que le limite de Nyquist, le signal sera sous-échantillonné.
Ainsi, nous aurons une perte d'informations.

{{< figure src="images/sous_echantillonnage.png" width="500" >}}

Si une image a un repliement, on peut réduire les défauts avec un filtre passe-bas, mais le spectre est fondamentalement détérioré de manière irréversible.
Le repliement apparait généralement comme une "pixellisation" de l'image.

{{< figure src="images/aliasing.png" width="600" >}}

## Transformation de Fourier

Pour $f \in L^1(\mathbb{R}^2)$,
$$
\mathcal{F}(f)(\omega) = \hat{f}(\omega) = \int_{\mathbb{R}^2} f(\mathbf{x}) e^{- i \mathbf{x} \omega} \; \text{d} \mathbf{x}
$$

{{< notice "note" >}}
$\hat{f}$ est continue et tende à 0 à l'infini.
{{< /notice >}}

$$
\mathcal{F^{-1}}(\hat{f})(\mathbf{x}) = f(\mathbf{x}) = \frac{1}{(2 \pi)^2} \int_{\mathbb{R}^2} \hat{f}(\omega) e^{i \mathbf{x} \omega} \; \text{d} \omega
$$

Quelques propriétés importantes:

1. $\mathcal{F}(f \ast g) = \mathcal{F}(f) \cdot \mathcal{F}(g)$;
2. $\mathcal{F}(f \cdot g) = \frac{1}{(2 \pi)^2} \mathcal{F}(f) \ast \mathcal{F}(g)$;
3. $\mathcal{F}(f(\mathbf{x} - \mathbf{a})) = e^{- i \omega \mathbf{a}} \mathcal{F}(f(\mathbf{x}))$;
4. $\mathcal{F}(e^{i \mathbf{a} \mathbf{x}} f(\mathbf{x}))(\omega) = \mathcal{F}(f(\mathbf{x}))(\omega - \mathbf{a})$;

## Le ringing

## Modèle d'acquisition

## Modèle de bruit
