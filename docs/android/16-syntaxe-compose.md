---
title: "10.2 – Composables et syntaxe"
sidebar_label: "10.2 Syntaxe Compose 🧩"
description: Fonctions en majuscule, lambdas, trailing lambda, Modifier en chaîne, remember.
---

# 10.2 – Compose : les subtilités de la syntaxe 🧩

Projet d'exercices : [WhatTheCompose](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/WhatTheCompose) (projet Kotlin pur, à ouvrir dans IntelliJ).

---

## 🟢 Facile : des fonctions en majuscule

Les composables commencent par une **majuscule**, contrairement à la convention Kotlin.
- C'est une convention **propre à Compose**.
- Ça peut prêter à confusion avec un appel de **constructeur** :
  - `Row()` → appel de **fonction** composable ;
  - `Random()` → appel de **constructeur**.

---

## 🟡 Intermédiaire : lambdas et *trailing lambda*

### Une fonction qui reçoit une fonction

```kotlin title="A-Lambdas.kt"
// comparer est un PARAMÈTRE de type fonction : (T, T) -> Boolean
fun <T> triBulle(tab: Array<T>, comparer: (T, T) -> Boolean) {
    val n = tab.size
    for (i in 0 until n - 1) {
        for (j in 0 until n - i - 1) {
            if (comparer(tab[j + 1], tab[j])) {
                val tmp = tab[j]; tab[j] = tab[j + 1]; tab[j + 1] = tmp
            }
        }
    }
}

fun comparerCroissant(a: Int, b: Int): Boolean = a < b

fun main() {
    val tableau1 = arrayOf(52, 242, -8432, 120, 4)
    triBulle(tableau1) { a, b -> a > b }               // lambda : décroissant
    println(tableau1.joinToString())

    val tableau2 = arrayOf(5, 2, 8, -1, 1, 4)
    triBulle(tableau2, ::comparerCroissant)            // référence à une fonction nommée
    println(tableau2.joinToString())

    // Exercice : trier du nombre le plus « court » au plus « long » (nombre de caractères)
    val tableau3 = arrayOf(5, 55, -12, 2034)
    triBulle(tableau3) { a, b -> a.toString().length < b.toString().length }
    println(tableau3.joinToString())                   // 5, 55, -12, 2034
}
```

### Trailing lambda : la lambda sort des parenthèses

En Kotlin, si le **dernier** paramètre est une lambda, on peut l'écrire **après** les parenthèses :

```kotlin title="B-TrailingLambda.kt"
fun faireQuelqueChose(message: String, action: () -> Unit) {
    println("Avant l'action : $message")
    action()
    println("Après l'action")
}

fun main() {
    // paramètre nommé
    faireQuelqueChose(message = "nommé", action = { println("Action !") })
    // trailing lambda : même chose
    faireQuelqueChose("trailing") {
        println("Action !")
    }
}
```

C'est exactement ce qu'on fait en Compose :

```kotlin
// Ces deux écritures sont ÉQUIVALENTES
Row {
    Column { /* contenu */ }
    Column { /* contenu */ }
}

Row(content = {
    Column { /* contenu */ }
    Column { /* contenu */ }
})
```

Le code source de `Column` montre que `content` est le **dernier paramètre** :

```kotlin
@Composable
inline fun Column(
    modifier: Modifier = Modifier,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: @Composable ColumnScope.() -> Unit
)
```

Même chose pour `Button(onClick = { ... }) { Text("OK") }` : `onClick` est une lambda **dans** les parenthèses, `content` est la **trailing lambda**.

---

## 🔴 Difficile : le `Modifier`

Chaque appel (`padding`, `background`, `fillMaxWidth`…) **retourne un nouveau `Modifier`** → on peut les **chaîner**. Patron *Chain of Responsibility*.

```kotlin
Row(
    modifier = Modifier
        .padding(8.dp)
        .background(Color.LightGray)
        .fillMaxWidth()
) { /* contenu */ }
```

:::warning L'ordre compte !
```kotlin
Modifier.padding(16.dp).background(Color.Red)   // marge EXTÉRIEURE, fond rouge à l'intérieur
Modifier.background(Color.Red).padding(16.dp)   // fond rouge partout, marge INTÉRIEURE
```
:::

Le même principe en Kotlin pur (exercice du café ☕) :

```kotlin title="C-Modifier-Voodoo-Magic.kt"
class Café private constructor(private val ajouts: List<Pair<String, Double>>) {
    constructor() : this(emptyList())

    fun creme(nb: Int): Café = Café(ajouts + List(nb) { "crème" to 0.5 })
    fun lait(nb: Int): Café = Café(ajouts + List(nb) { "lait" to 0.4 })
    fun sucre(nb: Int): Café = Café(ajouts + List(nb) { "sucre" to 0.2 })
    // Exercice : ajouter la vanille française
    fun vanilleFrançaise(nb: Int): Café = Café(ajouts + List(nb) { "vanille française" to 0.75 })

    fun prix(): Double = 1.0 + ajouts.sumOf { it.second }

    override fun toString(): String =
        if (ajouts.isEmpty()) "Café nature : 1.00\$CA"
        else "Café avec ${ajouts.joinToString { it.first }} : %.2f\$CA".format(prix())

    companion object {
        fun creme(nb: Int): Café = Café().creme(nb)
        fun lait(nb: Int): Café = Café().lait(nb)
        fun sucre(nb: Int): Café = Café().sucre(nb)
    }
}

fun main() {
    val cafe = Café.creme(2).sucre(4).vanilleFrançaise(1)   // comme Modifier.padding().background()
    println(cafe)
}
```

### Convention : le paramètre `modifier`

```kotlin
@Composable
fun MonBouton(
    texte: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier      // 1er paramètre optionnel, valeur par défaut Modifier
) {
    Button(onClick = onClick, modifier = modifier) {   // on l'applique à l'élément RACINE
        Text(texte)
    }
}
```

---

## ⚫ God mode : `remember`

`remember` conserve une valeur **à travers les recompositions**. Sans lui, la variable serait recréée à chaque fois que la fonction est réexécutée.

```kotlin
@Composable
fun Compteur() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Compteur : $count")
    }
}
```

Voir la note complète : [Gestion de l'état](/android/etat).
