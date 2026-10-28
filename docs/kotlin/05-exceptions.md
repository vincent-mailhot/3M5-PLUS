---
title: "3.2 – Pile d'appels et exceptions"
sidebar_label: "3.2 Exceptions ⚠️"
description: Pile d'appels, try/catch/finally, throw, exceptions personnalisées, attraper ou transmettre.
---

# 3.2 – Pile d'appels et exceptions ⚠️

📺 [Vidéo exceptions](https://www.youtube.com/watch?v=7BrKDnNnuqU) — [code](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/VideoExceptions)
📺 [Vidéo pile d'appels](https://youtu.be/M1WfpIARfQo) — [code](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/VideoPile)
📚 [Exceptions en Kotlin](https://kotlinlang.org/docs/exceptions.html)

---

## 1. La pile d'appels (call stack)

Chaque appel de fonction **empile** un contexte (ses paramètres et variables locales). Quand la fonction retourne, son contexte est **dépilé**.

```kotlin title="VideoPile/Main.kt"
class MaSuperException(message: String) : Exception(message)

fun main() { premierNiveau() }
fun premierNiveau() { println("Je suis au premier niveau"); deuxiemeNiveau() }
fun deuxiemeNiveau() {
    val texte = "Je suis seulement disponible au niveau deux"
    println("Je suis au deuxième niveau")
    troisiemeNiveau()
}
fun troisiemeNiveau() { println("Je suis au troisième niveau"); quatriemeNiveau() }
fun quatriemeNiveau() {
    for (i in 1..10) {
        println("Je l'élément $i")
        if (i == 7) throw MaSuperException("Erreur sur l'élément 7")
    }
}
```

Au moment du `throw`, la pile est :

```text
quatriemeNiveau   ← sommet (fonction en cours)
troisiemeNiveau
deuxiemeNiveau    ← la variable "texte" n'existe QUE dans ce contexte
premierNiveau
main
```

L'exception **remonte** la pile jusqu'à trouver un `catch` compatible. Si personne ne l'attrape → le programme plante et affiche la **stack trace** :

```text
Exception in thread "main" org.example.MaSuperException: Erreur sur l'élément 7
	at org.example.MainKt.quatriemeNiveau(Main.kt:27)
	at org.example.MainKt.troisiemeNiveau(Main.kt:20)
	at org.example.MainKt.deuxiemeNiveau(Main.kt:15)
	...
```

:::tip Lire une stack trace
1. La **première ligne** donne le type d'exception et le message.
2. La première ligne `at …` qui pointe vers **ton code** indique où ça a planté (clique dessus dans IntelliJ).
3. Les lignes suivantes montrent **qui a appelé qui**.
:::

Dans le débogueur, le panneau **Frames** montre cette pile : clique sur un niveau pour voir ses variables.

---

## 2. `try` / `catch` / `finally`

```kotlin
import java.io.File
import java.io.FileNotFoundException
import java.io.IOException

fun main() {
    try {
        val contenu = File("inexistant.txt").readText()
        println(contenu)
    } catch (e: FileNotFoundException) {     // le plus SPÉCIFIQUE d'abord
        println("Fichier introuvable : ${e.message}")
    } catch (e: IOException) {               // puis le plus général
        println("Problème de lecture : ${e.message}")
    } finally {
        println("Exécuté dans tous les cas")
    }
}
```

`try` est aussi une **expression** :

```kotlin
val nombre: Int = try { "12a".toInt() } catch (e: NumberFormatException) { 0 }
```

---

## 3. Lancer une exception et créer la sienne

### Recette : exception personnalisée

1. Crée une classe qui **hérite de `Exception`**, avec un nom **significatif**.
2. Lance-la avec `throw` quand la situation anormale arrive.
3. Attrape-la avec `try/catch` là où on sait **quoi faire** de l'erreur.

```kotlin title="ElementIntrouvableException.kt"
class ElementIntrouvableException(message: String) : Exception(message)
```

```kotlin title="TrouveLaValeur.kt"
fun trouver(tableau: Array<String>, cherche: String): Int {
    for (i in tableau.indices) {
        if (tableau[i] == cherche) {
            return i                      // index de la première occurrence
        }
    }
    throw ElementIntrouvableException("'$cherche' n'est pas dans le tableau")
}

fun main() {
    val tab = arrayOf("pomme", "poire", "banane")

    // Appel normal
    println(trouver(tab, "poire"))        // 1

    // Appel exceptionnel
    try {
        trouver(tab, "kiwi")
    } catch (e: ElementIntrouvableException) {
        println("Erreur : ${e.message}")
    }
}
```

Exemple de la vidéo (cantine) avec un `when` :

```kotlin
class MauvaisChoixCantineException : Exception("Désolé, ce choix n'est pas disponible.")

fun calculerChoix(choix: String): Float = when (choix) {
    "Hotdog" -> 2f
    "Hamburger" -> 3.5f
    "Poutine" -> 4f
    else -> throw MauvaisChoixCantineException()
}
```

---

## 4. Bon ✔️ ou pas ❌ ?

### Ordre des `catch`

```kotlin
try {
    // du code…
} catch (e: Exception) {
    println("Erreur : $e")
} catch (a: ArrayIndexOutOfBoundsException) {   // ❌ JAMAIS atteint
    println("Erreur : $a")
}
```

❌ **Pas bon** : `Exception` attrape tout, donc le second `catch` est inutile. Toujours mettre les exceptions **spécifiques en premier**.

### `catch` vide

```kotlin
try {
    // calculs compliqués...
} catch (e: NumberFormatException) {}   // ❌ on avale l'erreur
```

❌ **Pas bon** : l'erreur disparaît silencieusement, impossible de déboguer. Au minimum, afficher/journaliser, ou laisser remonter.

---

## 5. Attraper 🎣 ou transmettre 📡 ?

| Situation | Décision |
|---|---|
| La fonction **sait quoi faire** de l'erreur (valeur par défaut, message à l'utilisateur, réessayer) | 🎣 `catch` |
| La fonction **ne sait pas** comment réagir (ex. `lireFichier()` ne connaît pas l'interface) | 📡 laisser remonter |
| Un `main` (ou l'interface) attrape déjà les différents cas | 📡 laisser remonter jusqu'à lui |
| Une étape d'une suite d'étapes dépendantes échoue | 📡 remonter : les étapes suivantes ne doivent pas s'exécuter |

---

## 6. Boucle dans le `try` ou `try` dans la boucle ?

```kotlin
// A : try DANS la boucle → une erreur n'arrête que l'itération courante
fun lireDesFichiersForTry() {
    for (i in 1 until 10) {
        try {
            lireFichier("$i.txt")
        } catch (e: FileNotFoundException) {
            println("fichier n'existe pas")
        }
    }
}

// B : boucle DANS le try → la première erreur arrête TOUTE la boucle
fun lireDesFichiersTryFor() {
    try {
        for (i in 1 until 10) {
            lireFichier("$i.txt")
        }
    } catch (e: FileNotFoundException) {
        println("fichier n'existe pas")
    }
}
```

👉 **Pas le même résultat** si un fichier au milieu manque : A continue avec les fichiers suivants, B s'arrête au premier fichier manquant. (C'est le même piège que l'exercice *Jimmy et Johnny*.)

---

## Exceptions courantes

| Exception | Cause typique |
|---|---|
| `NullPointerException` | `!!` sur une valeur nulle |
| `NumberFormatException` | `"abc".toInt()` |
| `IndexOutOfBoundsException` / `ArrayIndexOutOfBoundsException` | `liste[10]` sur une liste de 3 éléments |
| `FileNotFoundException` | fichier inexistant |
| `IOException` | problème d'entrée/sortie (réseau, disque) |
| `IllegalArgumentException` | argument invalide (`require(...)`) |
| `IllegalStateException` | état invalide (`check(...)`, `error(...)`) |
| `ArithmeticException` | division entière par zéro |
| `UnsupportedOperationException` | méthode pas encore implémentée |
