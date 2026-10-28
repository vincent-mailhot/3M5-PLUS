---
title: "1.1 – Intro Kotlin et environnement"
sidebar_label: "1.1 Intro Kotlin 🏠"
description: Premier projet Kotlin, IntelliJ, débogueur, arguments de ligne de commande et Gradle.
---

# 1.1 – Intro à Kotlin et environnement de développement 🏠

## Ce qu'on voit dans cette séance

- **Kotlin comme langage**, **Android comme plateforme** (la partie Android arrive à la mi-session).
- Créer un dépôt GitHub pour les exercices.
- Créer un projet Kotlin **Gradle** dans IntelliJ IDEA.
- Écrire un `main`, définir des fonctions.
- Utiliser des **points d'arrêt** et le **débogueur**.
- Passer des **arguments de ligne de commande** avec une configuration d'exécution.
- Ajouter une **librairie** avec Gradle.

📺 Vidéo du cours : [Intro Kotlin](https://youtu.be/uiPQ1FFjla8) — [code après la vidéo](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/VideoIntroductionKotlin)

📚 Lectures : [Tour d'horizon de Kotlin](https://kotlinlang.org/docs/kotlin-tour-welcome.html) (sections *Hello world* et *Basic types*) · [Déboguer sa première application Kotlin](https://www.jetbrains.com/help/idea/debug-your-first-kotlin-application.html)

---

## 1. Créer ton dépôt d'exercices sur GitHub

1. Sur [github.com](https://github.com), clique sur **New repository**.
2. Nom : `3M5-NomDeFamille-Prenom`, visibilité **Private**.
3. Coche **Add a README**, puis **Create repository**.
4. Clone-le sur ton poste :

```bash title="Terminal"
git clone https://github.com/TON-USAGER/3M5-NomDeFamille-Prenom.git
cd 3M5-NomDeFamille-Prenom
```

5. Après chaque exercice :

```bash title="Terminal — commit + push"
git add .
git commit -m "Ajout de l'exercice Triangle"
git push
```

:::warning Toujours commit + push
Les exercices comme les TP sont évalués sur GitHub. **N'oublie pas de faire un commit puis un push** après chaque exercice.
:::

Un bon `.gitignore` pour IntelliJ / Gradle :

```gitignore title=".gitignore"
.gradle/
build/
out/
.idea/workspace.xml
.idea/tasks.xml
.idea/shelf/
*.iml
local.properties
.kotlin/
```

---

## 2. Créer un projet Kotlin (Gradle) dans IntelliJ

1. **File → New → Project…**
2. À gauche, choisis **Kotlin** (ou *New Project* avec *Language: Kotlin*).
3. **Name** : `BonjourKotlin` — **Location** : le dossier de ton dépôt.
4. **Build system** : **Gradle** — **Gradle DSL** : **Kotlin**.
5. **JDK** : un JDK 17 ou plus récent (IntelliJ peut le télécharger).
6. Dans *Advanced Settings*, **GroupId** : `org.nomdefamille` (ton nom de famille).
7. Clique **Create**.

Structure obtenue :

```text
BonjourKotlin/
├── build.gradle.kts        ← dépendances (librairies)
├── settings.gradle.kts
└── src/
    ├── main/kotlin/        ← ton code
    │   └── Main.kt
    └── test/kotlin/        ← tes tests unitaires
```

---

## 3. Le `main` en Kotlin

Un fichier est **exécutable** s'il contient une fonction `main` au niveau du fichier (pas dans une classe).

```kotlin title="src/main/kotlin/NomDeFamille.kt"
fun main() {
    println("Bonjour Dupont")
}
```

Une flèche verte ▶ apparaît à gauche de `fun main` : clique dessus pour exécuter.

Version qui reçoit des **arguments de ligne de commande** :

```kotlin title="src/main/kotlin/Arguments.kt"
fun main(args: Array<String>) {
    println("Nombre d'arguments : ${args.size}")
    for (arg: String in args) {
        println("Argument : $arg")
    }
}
```

### Passer des arguments (configuration d'exécution)

1. Exécute une première fois le fichier (▶) : IntelliJ crée une **configuration d'exécution**.
2. En haut à droite, ouvre la liste des configurations → **Edit Configurations…**
3. Dans **Program arguments**, écris tes arguments séparés par des espaces : `4 2 10`
4. **OK**, puis relance.

:::tip
Crée **plusieurs configurations** (une par cas à tester : bons arguments, aucun argument, fichier inexistant…). C'est très utile pour le TP1.
Les configurations sont stockées dans le dossier `.idea/` du projet.
:::

---

## 4. Définir une fonction

```kotlin
// fun nom(param: Type, ...): TypeDeRetour { ... }
fun addition(a: Int, b: Int): Int {
    return a + b
}

// Version « expression » sur une ligne
fun multiplication(a: Int, b: Int): Int = a * b

// Fonction qui ne retourne rien : Unit (peut être omis)
fun saluer(nom: String): Unit {
    println("Salut $nom")
}

fun main() {
    val somme: Int = addition(2, 3)
    println("2 + 3 = $somme")              // template de chaîne avec $
    println("2 x 3 = ${multiplication(2, 3)}") // expression avec ${...}
    saluer("Kotlin")
}
```

---

## 5. Points d'arrêt et débogueur 🐞

1. Clique dans la **marge grise** à gauche d'une ligne → un point rouge apparaît (point d'arrêt).
2. Lance en mode **Debug** (icône d'insecte 🐞 ou clic droit → *Debug*).
3. L'exécution s'arrête **avant** d'exécuter la ligne marquée.
4. Utilise les boutons :

| Action | Raccourci (Windows) | Effet |
|---|---|---|
| **Step Over** | `F8` | Exécute la ligne, sans entrer dans les fonctions appelées |
| **Step Into** | `F7` | Entre dans la fonction appelée |
| **Step Out** | `Shift+F8` | Termine la fonction courante et revient à l'appelant |
| **Resume** | `F9` | Continue jusqu'au prochain point d'arrêt |

5. Le panneau **Variables** montre les valeurs ; le panneau **Frames** montre la **pile d'appels**.

---

## 6. Ajouter une librairie avec Gradle (ex. Jsoup)

Voir la note complète : [Librairies tierces](/kotlin/librairies-tierces).

1. Va sur [mvnrepository.com](https://mvnrepository.com/) et cherche `jsoup`.
2. Choisis une version **stable** (pas *alpha/beta/RC*) **sans vulnérabilité**.
3. Onglet **Gradle (Kotlin)** → copie la ligne `implementation(...)`.
4. Colle-la dans `build.gradle.kts` :

```kotlin title="build.gradle.kts"
dependencies {
    implementation("org.jsoup:jsoup:1.18.3")
    testImplementation(kotlin("test"))
}
```

5. Clique sur l'**éléphant** 🐘 (*Load Gradle Changes*) en haut à droite ou `Ctrl+Shift+O`.
6. Teste :

```kotlin title="src/main/kotlin/SuperDuperDemo.kt"
import org.jsoup.Jsoup
import org.jsoup.nodes.Document

fun main() {
    val doc: Document = Jsoup.connect("https://en.wikipedia.org/").get()
    println("Titre : ${doc.title()}")
    val liens = doc.select("#mp-itn b a")
    for (lien in liens) {
        println("${lien.attr("title")} -> ${lien.absUrl("href")}")
    }
}
```

:::tip Code Java → Kotlin
Les exemples de Jsoup sont en Java. Colle le code Java dans un fichier `.kt` : IntelliJ te propose de le **convertir automatiquement** en Kotlin.
:::

---

## Exercices de la semaine (avec pistes de solution)

### Bonjour Kotlin

Projet `BonjourKotlin`, GroupId `org.nomdefamille`, deux fichiers exécutables `NomDeFamille.kt` (affiche « Bonjour [Nom] ») et `PrenomDuProf.kt` (affiche « Salut [Prénom du prof] »).

### Triangle

Afficher un triangle dont la hauteur est reçue en argument.

<details>
<summary>Solution possible</summary>

```kotlin title="src/main/kotlin/Triangle.kt"
fun main(args: Array<String>) {
    val hauteur: Int = args[0].toInt()   // String -> Int
    for (ligne in 1..hauteur) {
        for (i in 1..ligne) {
            print("*")                  // pas de saut de ligne
        }
        println()                       // saut de ligne
    }
}
```
</details>

### Triangles (fonction qui retourne une `String`)

<details>
<summary>Solution possible</summary>

```kotlin title="src/main/kotlin/Triangles.kt"
fun triangle(hauteur: Int): String {
    var resultat: String = ""
    for (ligne in 1..hauteur) {
        resultat += "*".repeat(ligne) + "\n"
    }
    return resultat                     // aucun print dans la fonction !
}

fun main() {
    for (h in listOf(4, 8, 10, 100, 3)) {
        println(triangle(h))
    }
}
```
</details>

### Trace d'exécution

Faire la trace (voir la [recette de trace](/kotlin/revision-intra#produire-une-trace-dexécution)) de :

```kotlin
fun main() {
    val monNombre = .1 + .1 + .1
    var maChaine = "Bonjour"
    maChaine += " le monde"
    println("monNombre = $monNombre")
    println("maChaine = $maChaine")
}
```

:::info Surprise !
`monNombre` vaut `0.30000000000000004` et non `0.3` : les `Double` sont stockés en binaire et `0.1` n'est pas représentable exactement.
:::

### Défi : UnUn (suite « Look and say »)

<details>
<summary>Solution possible</summary>

```kotlin title="src/main/kotlin/UnUn.kt"
fun unUn(source: String): String {
    val resultat = StringBuilder()
    var i = 0
    while (i < source.length) {
        val chiffre: Char = source[i]
        var compte = 0
        while (i < source.length && source[i] == chiffre) {
            compte++
            i++
        }
        resultat.append(compte).append(chiffre)
    }
    return resultat.toString()
}

fun sequence(source: String, longueur: Int): List<String> {
    val liste = mutableListOf(source)
    while (liste.size < longueur) {
        liste.add(unUn(liste.last()))
    }
    return liste
}

fun main() {
    println(unUn("111213"))          // 31121113
    sequence("1", 6).forEach { println(it) }
}
```
</details>
