---
title: "2.1 – Programmation impérative"
sidebar_label: "2.1 Impératif ✊"
description: Types, val vs var, null safety, conditions, boucles, tableaux, conversions.
---

# 2.1 – Programmation impérative en Kotlin ✊

📺 [Vidéo : programmation impérative](https://youtu.be/o_avNxctpVI) — [code après la vidéo](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/VideoProgrammationImperative)

📚 [Tutoriel fonctions](https://kotlinlang.org/docs/kotlin-tour-functions.html) · [Null safety](https://kotlinlang.org/docs/kotlin-tour-null-safety.html) · [Types](https://kotlinlang.org/docs/types-overview.html)

---

## 1. `val` vs `var`

| Mot-clé | Signification | Réassignable ? |
|---|---|---|
| `val` | **valeur** (lecture seule, comme `readonly`/`final`) | ❌ Non |
| `var` | **variable** | ✅ Oui |

```kotlin
val pi: Double = 3.1416
// pi = 3.0          // ❌ Erreur de compilation : Val cannot be reassigned

var score: Int = 0
score = score + 10     // ✅
score += 5             // ✅

val liste = mutableListOf(1, 2)
liste.add(3)           // ✅ la RÉFÉRENCE est constante, pas le contenu de l'objet !
```

:::tip Règle du pouce
Utilise `val` par défaut. Passe à `var` seulement si tu dois vraiment réassigner.
:::

---

## 2. Les types de base et l'inférence

Kotlin **déduit** le type à partir de la valeur (inférence), mais on recommande de l'**annoter** pendant l'apprentissage.

```kotlin
val a = 1                                // Int
val aa = 1L                              // Long (suffixe L)
val aaa = a * 25 + aa * 100              // Long  (Int * Long -> Long) : 125
val b = 1.0                              // Double
val f = 1.0f                             // Float (suffixe f)
val c = "1"                              // String
val d = true                             // Boolean
val e = '\n'                             // Char
val laChose = c + b                      // String : "11.0"  (String + n'importe quoi = String)
val k = listOf("1", "2", "3")            // List<String>  (immuable)
val l = mutableListOf(true, false, true) // MutableList<Boolean>
```

:::info Astuce IntelliJ
Survole une variable avec la souris (ou `Ctrl+Shift+P`) pour voir son type déduit.
Tu peux aussi activer les *inlay hints* pour afficher les types directement dans l'éditeur.
:::

---

## 3. Null safety 🛡️

En Kotlin, un type **ne peut pas** contenir `null` à moins d'ajouter `?`.

```kotlin
var nom: String = "Bob"
// nom = null                    // ❌ Erreur de compilation

var surnom: String? = null       // ✅ type « nullable »

// Appel sécuritaire ?. : retourne null au lieu de planter
val longueur: Int? = surnom?.length

// Opérateur Elvis ?: : valeur par défaut si null
val longueurOuZero: Int = surnom?.length ?: 0

// Vérification classique : après le if, Kotlin sait que surnom n'est pas null (smart cast)
if (surnom != null) {
    println(surnom.length)
}

// !! : « je te jure que ce n'est pas null » → NullPointerException sinon. À ÉVITER.
val risque: Int = surnom!!.length
```

Conversions qui peuvent échouer → version `OrNull` :

```kotlin
val nombre: Int? = "123".toIntOrNull()   // 123
val pasNombre: Int? = "abc".toIntOrNull() // null (pas d'exception)
val plante: Int = "abc".toInt()          // 💥 NumberFormatException
```

---

## 4. Conditions : `if` et `when`

```kotlin
val age: Int = 20

// if est une EXPRESSION : il retourne une valeur
val statut: String = if (age >= 18) "majeur" else "mineur"

// when remplace le switch
val note: Int = 85
val lettre: Char = when {
    note >= 90 -> 'A'
    note >= 80 -> 'B'
    note >= 70 -> 'C'
    note >= 60 -> 'D'
    note >= 50 -> 'E'
    else -> 'F'
}

// when sur une valeur
val jour: Int = 3
when (jour) {
    1, 7 -> println("Fin de semaine")
    in 2..6 -> println("Semaine")
    else -> println("Jour invalide")
}
```

---

## 5. Boucles et intervalles

```kotlin
for (i in 1..5) print(i)            // 12345        (1 à 5 inclus)
for (i in 0 until 5) print(i)       // 01234        (5 exclu)
for (i in 0..<5) print(i)           // 01234        (syntaxe équivalente récente)
for (i in 5 downTo 1) print(i)      // 54321
for (i in 0..10 step 2) print(i)    // 0246810

val fruits = listOf("pomme", "poire")
for (fruit in fruits) println(fruit)
for ((index, fruit) in fruits.withIndex()) println("$index : $fruit")

var n = 3
while (n > 0) {
    println(n)
    n--
}
```

---

## 6. Tableaux (`Array`) et aléatoire

```kotlin
import kotlin.random.Random

fun creeTableauAleatoire(n: Int): Array<Int> {
    return Array(n) { Random.nextInt(0, 101) }   // 0 à 100 inclus (101 exclu)
}

fun afficherStatistiques(tableau: Array<Int>) {
    println("Somme   : ${tableau.sum()}")
    println("Moyenne : ${tableau.average()}")
    println("Min     : ${tableau.min()}")
    println("Max     : ${tableau.max()}")
}

fun main() {
    val tab: Array<Int> = creeTableauAleatoire(10)
    println(tab.joinToString(", "))
    afficherStatistiques(tab)
}
```

---

## 7. Conversions de types

```kotlin
val i: Int = 42
val f: Float = i.toFloat()        // 42.0
val d: Double = 3.99
val tronque: Int = d.toInt()      // 3   (tronque, n'arrondit pas !)
val arrondi: Int = Math.round(d).toInt() // 4
val s: String = i.toString()      // "42"
val dd: Double = f.toDouble()
val binaire: String = Integer.toBinaryString(10) // "1010"
val binaire2: String = 10.toString(2)            // "1010"
```

---

## Exercices (pistes de solution)

### EclateTaString

<details>
<summary>Solution possible</summary>

```kotlin title="EclateTaString.kt"
fun main(args: Array<String>) {
    val chaine: String = args[0]
    for (caractere: Char in chaine) {
        println(caractere)
    }
}
```
</details>

### Pyramide

<details>
<summary>Solution possible</summary>

```kotlin title="Pyramide.kt"
fun pyramide(hauteur: Int): String {
    val sb = StringBuilder()
    for (ligne in 1..hauteur) {
        sb.append(" ".repeat(hauteur - ligne))
        sb.append("*".repeat(2 * ligne - 1))
        sb.append("\n")
    }
    return sb.toString()
}

fun main(args: Array<String>) {
    for (arg in args) {
        print(pyramide(arg.toInt()))
    }
}
```
</details>

### BinariseTonEntier

<details>
<summary>Solution possible</summary>

```kotlin title="BinariseTonEntier.kt"
fun main(args: Array<String>) {
    val nombre: Int? = args.getOrNull(0)?.toIntOrNull()
    if (nombre == null) {
        println("Merci de fournir un entier en argument")
        return
    }
    println("$nombre en binaire : ${nombre.toString(2)}")
}
```
</details>

### Web : afficher le contenu d'une page (librairie standard)

```kotlin title="Web.kt"
import java.net.URI

fun main(args: Array<String>) {
    val contenu: String = URI(args[0]).toURL().readText()
    println(contenu)
}
```

### Trace et pile d'appels

```kotlin
fun main() {
    val a : Int = addition(4 + 5, 100)
    val b : Int = multiplication( multiplication(4, a), multiplication(2, 3) )
}
fun addition(a: Int, y: Int): Int { return a + y }
fun multiplication(x: Int, b: Int): Int { return x * b }
```

<details>
<summary>Trace attendue</summary>

| ligne exécutée | effet | pile d'appels |
|---|---|---|
| `val a = addition(4 + 5, 100)` | appelle addition avec 9→a, 100→y | **main** |
| `return a + y` | a: 9, y: 100, retourne 109 | **addition**<br/>main |
| `val a = addition(4 + 5, 100)` | a: 109 | **main** |
| `val b = multiplication(multiplication(4, a), …)` | a: 109, appelle multiplication avec 4→x, 109→b | **main** |
| `return x * b` | x: 4, b: 109, retourne 436 | **multiplication**<br/>main |
| `val b = …` | appelle multiplication avec 2→x, 3→b | **main** |
| `return x * b` | x: 2, b: 3, retourne 6 | **multiplication**<br/>main |
| `val b = …` | appelle multiplication avec 436→x, 6→b | **main** |
| `return x * b` | x: 436, b: 6, retourne 2616 | **multiplication**<br/>main |
| `val b = …` | a: 109, b: 2616 | **main** |

</details>
