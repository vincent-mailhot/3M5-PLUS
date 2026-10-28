---
slug: /
title: Accueil
sidebar_label: 🏠 Accueil
---

# Notes de cours — 3M5 Intro Mobile 📱

Ces notes résument et **détaillent** le contenu du cours
[3M5 – Intro Mobile](https://info.cegepmontpetit.ca/3M5-Intro-Mobile/) du Cégep Édouard-Montpetit,
en s'appuyant sur les **recettes** et le **code du dépôt GitHub**
([departement-info-cem/3M5-Intro-Mobile](https://github.com/departement-info-cem/3M5-Intro-Mobile)).

:::tip Comment utiliser ces notes
- Chaque page correspond à une **séance (ou un bloc de séances) du cours**, dans le même ordre que sur le site officiel.
- Chaque procédure est découpée en **étapes numérotées**.
- Chaque bloc de code a un bouton **📋 Copier** (en haut à droite au survol) : le code est prêt à coller.
- Le titre du bloc de code indique **dans quel fichier** coller le code (ex. `app/build.gradle.kts`).
:::

## Plan du cours

| Séance(s) | Sujet | Note |
|---|---|---|
| 1.1 – 1.2 | Intro Kotlin, IntelliJ, débogueur, Gradle | [Intro Kotlin](/kotlin/intro-kotlin) |
| 2.1 | Programmation impérative, types, null safety | [Impératif](/kotlin/imperatif) |
| 2.2 | Librairie standard : collections, fichiers, classes | [Librairie standard](/kotlin/librairie-standard) |
| 3.1 | Librairies tierces (Maven, Gradle, Jsoup) | [Librairies tierces](/kotlin/librairies-tierces) |
| 3.2 | Pile d'appels et exceptions | [Exceptions](/kotlin/exceptions) |
| 4.1 | Structurer son code, refactoring, valeur vs référence | [Structurer](/kotlin/structurer) |
| 4.2 | Tests unitaires et plan de test | [Tests](/kotlin/tests-unitaires) |
| 5.1 – 6.1 | Intégration, traces d'exécution, examens intra | [Révision intra](/kotlin/revision-intra) |
| 6.2 | Intro Android, Compose, mise en page | [Intro Android](/android/intro-android) |
| 7.1 | Navigation entre écrans | [Navigation](/android/navigation) |
| 7.2 – 8.1 | Listes (`LazyColumn`) | [Listes](/android/listes) |
| 8.2 – 9.1 | État, multilingue (i18n), logo, icônes | [État](/android/etat) · [i18n](/android/multilingue) · [Logo & icônes](/android/logo-icones) |
| 9.2 | Graphiques (MPAndroidChart) et `AndroidView` | [Graphique](/android/graphique) |
| 10.1 | Intégration + examen théorique | [Révision intra](/kotlin/revision-intra) |
| 10.2 | Syntaxe Compose : lambdas, `Modifier`, `remember` | [Syntaxe Compose](/android/syntaxe-compose) |
| 11.1 | Structurer en Android : packages, service | [Service & packages](/android/structure-service) |
| 11.2 – 12.1 | Tests Android et IA | [Tests Android](/android/tests-android) |
| 12.2 – 13.1 | Tiroir de navigation | [Tiroir](/android/tiroir) |
| 13.2 | Copilot et IA générative | [Copilot](/android/copilot-iag) |
| 14.1 – 15.2 | Intégration, formatif et examen final | [Révision finale](/android/revision-finale) |

## Outils à installer

| Outil | Pour quoi | Lien |
|---|---|---|
| IntelliJ IDEA (Community ou Ultimate) | Projets Kotlin « console » (partie 1) | [jetbrains.com/idea](https://www.jetbrains.com/idea/download/) |
| Android Studio | Projets Android / Compose (partie 2) | [developer.android.com/studio](https://developer.android.com/studio) |
| Git + GitKraken (ou ligne de commande) | Remise des exercices et TP | [git-scm.com](https://git-scm.com/) |
| Documentation Kotlin | Référence du langage | [kotlinlang.org/docs](https://kotlinlang.org/docs/home.html) |

## Les mantras du cours 🧘

> **« En Kotlin, chaque `val` ou `var`, le type tu annoteras. »**
> Pas obligatoire, mais on débute : on écrit le type pour être sûr d'être d'accord avec soi-même.

> **« En Kotlin, chaque fonction, le type de retour tu annoteras. »**

> **« En Kotlin, 50 lignes par méthode maximum tu taperas. »**
> Si ton code dépasse un écran, une sous-fonction attend d'être extraite.

> **« Utilise ton IntelliJ pour refactor, il sait faire. »**
> Le code qui fonctionne est précieux : les outils de refactor garantissent qu'il fonctionnera pareil.

```kotlin title="Le mantra appliqué"
val nom: String = "Dupont"            // type annoté
var compteur: Int = 0                  // type annoté

fun double(x: Int): Int {              // type de retour annoté
    return x * 2
}
```
