---
title: "2.2 – Librairie standard"
sidebar_label: "2.2 Librairie standard 📘"
description: Collections (List, Set, Map), lecture console, fichiers, classes et data class.
---

# 2.2 – Kotlin, librairie standard 📘

📺 Vidéos : [1](https://youtu.be/vV_nT5Sj7J4) · [2](https://youtu.be/5PhJMt4Qwhk) · [3](https://youtu.be/JEL8ord98nY) · [4](https://youtu.be/pv-A40Dy-XA) · [5](https://youtu.be/VB1uKiTiqiw) — [code des vidéos](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/VideosLibrairieStandard)

📚 [Collections](https://kotlinlang.org/docs/collections-overview.html) · [Tutoriel collections](https://kotlinlang.org/docs/kotlin-tour-collections.html) · [Tutoriel classes](https://kotlinlang.org/docs/kotlin-tour-classes.html)

---

## 1. Les 3 collections principales

| Collection | Ordre | Doublons | Immuable | Mutable |
|---|---|---|---|---|
| **List** | ✅ indexée | ✅ | `listOf()` | `mutableListOf()` / `ArrayList()` |
| **Set** | ❌ (sauf `LinkedHashSet`) | ❌ | `setOf()` | `mutableSetOf()` |
| **Map** | clés uniques | valeurs ✅ | `mapOf()` | `mutableMapOf()` |

```kotlin
// LIST
val nombres: List<Int> = listOf(3, 1, 2)
val mut: MutableList<Int> = mutableListOf(3, 1, 2)
mut.add(4)            // [3, 1, 2, 4]
mut.add(0, 99)        // insère à l'index 0 -> [99, 3, 1, 2, 4]
mut.removeAt(0)       // [3, 1, 2, 4]
println(mut[0])       // 3
println(mut.size)     // 4

// SET : pas de doublons
val mots: MutableSet<String> = mutableSetOf("on", "me", "on")
println(mots)         // [on, me]

// MAP : clé -> valeur
val ages: MutableMap<String, Int> = mutableMapOf("Alice" to 20, "Bob" to 25)
ages["Chloé"] = 30
println(ages["Alice"])        // 20
println(ages["Inconnu"])      // null
for ((nom, age) in ages) println("$nom a $age ans")
```

---

## 2. Fonctions utiles des collections (sans boucle !)

```kotlin
val liste = listOf(0.1, 12.34, -0.1234, 3.1416)

liste.reversed()          // [3.1416, -0.1234, 12.34, 0.1]   inverse l'ordre
liste.sorted()            // tri croissant
liste.sortedDescending()  // tri décroissant
liste.contains(0.1)       // true    (ou : 0.1 in liste)
liste.count { it > 0 }    // 3       compte selon une condition
liste.filter { it > 1 }   // [12.34, 3.1416]
liste.map { it * 2 }      // multiplie chaque élément
liste.sum(); liste.average(); liste.max(); liste.min()
liste.first(); liste.last(); liste.firstOrNull { it < 0 }

val entiers = listOf(1, 2, 2, 3, 2)
entiers.count { it == 2 } // 3 apparitions de 2
entiers.distinct()        // [1, 2, 3]
entiers.toSet()           // {1, 2, 3}
entiers.groupingBy { it }.eachCount() // {1=1, 2=3, 3=1}
entiers.joinToString(", ")            // "1, 2, 2, 3, 2"
```

:::tip `it`
Dans une lambda à **un seul paramètre**, `it` désigne ce paramètre : `filter { it > 1 }` = `filter { x -> x > 1 }`.
:::

---

## 3. Lire au clavier : `readln()`

```kotlin title="EntrezUnNombre.kt"
fun main() {
    println("Veuillez entrer un nombre :")
    var nombre: Int? = readln().toIntOrNull()
    while (nombre == null) {
        println("Ceci n’est pas un nombre, veuillez entrer un nombre :")
        nombre = readln().toIntOrNull()
    }
    println("Merci, votre nombre est $nombre.")
}
```

---

## 4. Fichiers (`java.io.File`)

```kotlin
import java.io.File

fun main() {
    // Créer un fichier vide dans le dossier courant (dossier du projet quand on lance depuis IntelliJ)
    File("vide.txt").createNewFile()

    // Écrire (écrase le contenu)
    File("../nom.txt").writeText("Dupont Jean")

    // Ajouter à la fin
    File("journal.txt").appendText("Nouvelle ligne\n")

    // Lire tout le contenu
    val contenu: String = File("nom.txt").readText()

    // Lire ligne par ligne
    val lignes: List<String> = File("urls.txt").readLines()

    // Vérifications utiles (TP1 !)
    val f = File("urls.txt")
    println(f.exists())        // existe ?
    println(f.isFile)          // est un fichier (pas un dossier) ?
    println(f.canRead())       // lisible ?
    println(f.absolutePath)    // chemin complet
    println(f.absoluteFile.parentFile.canWrite()) // dossier parent accessible en écriture ?
}
```

### Lire plusieurs fichiers passés en arguments

```kotlin title="LireFichier.kt"
import java.io.File

fun main(args: Array<String>) {
    for (chemin in args) {
        println(File(chemin).readText())
        println("-------------")
    }
}
```

---

## 5. Classes et `data class`

```kotlin
// Classe « normale » avec constructeur principal
class Truc(var pipo: Int, var popi: String) {
    override fun toString(): String = "Truc(pipo=$pipo, popi=$popi)"
}

// data class : toString, equals, hashCode, copy générés automatiquement
data class Album(
    val id: Int,
    val name: String,
    val artistName: String,
)

fun main() {
    val a = Album(1, "Abbey Road", "The Beatles")
    println(a)                         // Album(id=1, name=Abbey Road, artistName=The Beatles)
    val b = a.copy(name = "Help!")     // copie avec un champ modifié
    println(a == Album(1, "Abbey Road", "The Beatles")) // true : comparaison par contenu
}
```

---

## 6. Récursivité — trace de `factorielle`

```kotlin
fun main() {
    println(factorielle(2))
}
fun factorielle(n: Int): Int {
    if (n == 0) {
        return 1
    } else {
        return n * factorielle(n - 1)
    }
}
```

| ligne exécutée | effet | pile d'appels |
|---|---|---|
| `println(factorielle(2))` | appelle factorielle avec 2→n | **main** |
| `if (n == 0)` | n: 2, faux | **factorielle(2)**<br/>main |
| `return n * factorielle(n - 1)` | appelle factorielle avec 1→n | **factorielle(2)**<br/>main |
| `if (n == 0)` | n: 1, faux | **factorielle(1)**<br/>factorielle(2)<br/>main |
| `return n * factorielle(n - 1)` | appelle factorielle avec 0→n | **factorielle(1)**<br/>factorielle(2)<br/>main |
| `if (n == 0)` | n: 0, vrai | **factorielle(0)**<br/>factorielle(1)<br/>factorielle(2)<br/>main |
| `return 1` | retourne 1 | **factorielle(0)**<br/>factorielle(1)<br/>factorielle(2)<br/>main |
| `return n * factorielle(n - 1)` | n: 1, 1 * 1, retourne 1 | **factorielle(1)**<br/>factorielle(2)<br/>main |
| `return n * factorielle(n - 1)` | n: 2, 2 * 1, retourne 2 | **factorielle(2)**<br/>main |
| `println(factorielle(2))` | affiche « 2 » | **main** |

---

## Exercices (pistes de solution)

<details>
<summary>ListeSimple — repete(n, nombreFois)</summary>

```kotlin
fun repete(n: Int, nombreFois: Int): List<Int> {
    val resultat = mutableListOf<Int>()
    for (i in 1..n) {
        repeat(nombreFois) { resultat.add(i) }
    }
    return resultat
}

fun main() {
    println(repete(4, 2))   // [1, 1, 2, 2, 3, 3, 4, 4]
}
```
</details>

<details>
<summary>TriSimple — à la main vs avec la librairie</summary>

```kotlin
fun triInverseALaMain(liste: List<Double>): List<Double> {
    val resultat = mutableListOf<Double>()
    for (element in liste) {
        resultat.add(0, element)  // on insère au début -> ordre inversé
    }
    return resultat
}

fun triInverse(liste: List<Double>): List<Double> = liste.reversed()

fun main() {
    val l = listOf(0.1, 12.34, -0.1234, 3.1416)
    println(triInverseALaMain(l))   // [3.1416, -0.1234, 12.34, 0.1]
    println(triInverse(l))
}
```
</details>

<details>
<summary>TrouvePisCompte</summary>

```kotlin
fun trouveALaMain(element: Int, liste: List<Int>): Boolean {
    for (e in liste) if (e == element) return true
    return false
}
fun trouve(element: Int, liste: List<Int>): Boolean = liste.contains(element)

fun compteALaMain(element: Int, liste: List<Int>): Int {
    var compte = 0
    for (e in liste) if (e == element) compte++
    return compte
}
fun compte(element: Int, liste: List<Int>): Int = liste.count { it == element }
```
</details>

<details>
<summary>Ensemble — mots uniques triés</summary>

```kotlin
fun main(args: Array<String>) {
    val mots: Set<String> = args.toSortedSet()
    mots.forEach { println(it) }
}
```
</details>

<details>
<summary>Compteur — occurrences avec une Map</summary>

```kotlin
fun main(args: Array<String>) {
    val compteur: MutableMap<String, Int> = mutableMapOf()
    for (mot in args) {
        compteur[mot] = (compteur[mot] ?: 0) + 1
    }
    println(compteur)   // {on=4, me=4, voit=4, plus=2}
    // Version librairie : args.groupingBy { it }.eachCount()
}
```
</details>
