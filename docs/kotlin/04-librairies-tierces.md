---
title: "3.1 – Librairies tierces"
sidebar_label: "3.1 Librairies tierces 📦"
description: Trouver une librairie sur Maven, l'ajouter avec Gradle, ou depuis GitHub avec JitPack.
---

# 3.1 – Librairies tierces 📦

Il existe des milliers de librairies Java/Kotlin (Google, Square, Apache…). Elles sont **interopérables** : une librairie Java s'utilise directement en Kotlin.

:::warning Lis la doc !
Quand on commence avec une nouvelle librairie, on lit d'abord la **documentation** et les **exemples** fournis par ses développeurs.
:::

---

## Recette A — Ajouter une librairie depuis Maven Central

### Étape 1 : trouver la librairie

1. Va sur [mvnrepository.com](https://mvnrepository.com/).
2. Tape le nom (ex. `jsoup`) dans la recherche et clique sur la bonne librairie.
3. Choisis une version :
   - ❌ éviter les versions marquées **vulnerability** ;
   - ❌ éviter les versions **alpha, beta, RC, SNAPSHOT** ;
   - ✅ prendre la version **stable** la plus récente.
4. Clique sur le numéro de version, puis l'onglet **Gradle (Kotlin)**.
5. Copie la ligne `implementation(...)`.

### Étape 2 : coller dans `build.gradle.kts`

```kotlin title="build.gradle.kts (projet IntelliJ)"
plugins {
    kotlin("jvm") version "2.1.0"
}

repositories {
    mavenCentral()
}

dependencies {
    // highlight-start
    implementation("org.jsoup:jsoup:1.18.3")
    implementation("commons-validator:commons-validator:1.9.0")
    // highlight-end
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
```

:::note
Garde la version du plugin `kotlin("jvm")` que IntelliJ a générée pour ton projet ; ajoute seulement les lignes surlignées.
:::

### Étape 3 : recharger Gradle

- Clique sur l'**éléphant** 🐘 *Load Gradle Changes* (en haut à droite de l'éditeur),
- ou `Ctrl+Shift+O`.

### Étape 4 : tester

```kotlin
import org.jsoup.Jsoup
import org.jsoup.nodes.Document

fun main() {
    val doc: Document = Jsoup.connect("http://example.com/").get()
    println(doc.title())
}
```

Si IntelliJ propose les `import` et que ça compile, la librairie est bien ajoutée ✅.

---

## Recette B — Librairie hébergée sur GitHub : JitPack

[JitPack](https://jitpack.io) construit et publie des projets GitHub pour qu'on puisse les importer avec Gradle.
**On s'en sert en Android** (graphiques MPAndroidChart, librairie BD du TP3).

### Étape 1 : ajouter le dépôt JitPack dans `settings.gradle.kts`

```kotlin title="settings.gradle.kts"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // highlight-next-line
        maven { url = uri("https://jitpack.io") }   // ← ajout de JitPack
    }
}
```

### Étape 2 : choisir la version sur jitpack.io

Sur `https://jitpack.io/#UTILISATEUR/DEPOT`, choisis une version (tag ou commit) et clique **Get it** : la ligne d'implémentation s'affiche.

### Étape 3 : ajouter la dépendance dans le module

```kotlin title="app/build.gradle.kts"
dependencies {
    // Format : com.github.UTILISATEUR:DEPOT:VERSION
    implementation("com.github.PhilJay:MPAndroidChart:v3.1.0")
}
```

### Étape 4 : Sync

Android Studio : **Sync Now** (bandeau jaune) ou l'éléphant 🐘.

---

## Exercices (pistes de solution)

### Jsoup : extraire les liens d'une page

```kotlin title="Liens.kt"
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.select.Elements

fun main(args: Array<String>) {
    val url: String = args[0]
    val doc: Document = Jsoup.connect(url).get()
    val liens: Elements = doc.select("a[href]")
    for (lien in liens) {
        // text() = texte du lien, attr("href") = valeur brute, absUrl("href") = URL complète
        println("${lien.text()} = ${lien.attr("href")}")
    }
}
```

### ValidationCourriel avec Apache Commons Validator

```kotlin title="ValidationCourriel.kt"
import org.apache.commons.validator.routines.EmailValidator

fun main() {
    val validateur: EmailValidator = EmailValidator.getInstance()
    val exemples = listOf(
        "jo@pipo.org", "ma_mu@m.ca", "a.a@a.ca",          // attendus OK
        "a.a@a.aa", "ab@ab", "a.b@ab", "jo"               // attendus KO
    )
    for (courriel in exemples) {
        val ok = if (validateur.isValid(courriel)) "Ok" else "Ko"
        println("$ok : $courriel")
    }
}
```

:::info
`a.a@a.aa` : le domaine `.aa` n'existe pas, un bon validateur doit le refuser. C'est justement ce qu'on veut vérifier : la librairie fait-elle ce qu'on attend ?
:::

### SuperListe : comparer les performances

```kotlin title="SuperListe.kt"
import java.util.LinkedList
import kotlin.random.Random

fun testeCetteListe(nom: String, liste: MutableList<Int>) {
    val random = Random(1234)
    val a = System.currentTimeMillis()
    for (i in 0 until 100_000) liste.add(i)                                  // à la fin
    val b = System.currentTimeMillis()
    for (i in 0 until 100_000) liste.add(0, i)                               // au début
    val c = System.currentTimeMillis()
    for (i in 0 until 100_000) liste.add(random.nextInt(liste.size + 1), i)  // au hasard
    val d = System.currentTimeMillis()
    println("$nom -> fin: ${b - a} ms, début: ${c - b} ms, hasard: ${d - c} ms")
}

fun main() {
    testeCetteListe("ArrayList", ArrayList())
    testeCetteListe("LinkedList", LinkedList())
    // GapList : ajouter org.magicwerk:brownies-collections (voir mvnrepository) puis
    // testeCetteListe("GapList", org.magicwerk.brownies.collections.GapList())
}
```

| Liste | Ajout à la fin | Ajout au début | Ajout au hasard |
|---|---|---|---|
| `ArrayList` | ⚡ rapide | 🐢 lent (décale tout) | 🐢 moyen |
| `LinkedList` | ⚡ rapide | ⚡ rapide | 🐢🐢 très lent (parcours) |
| `GapList` | ⚡ | ⚡ | ⚡ meilleur compromis |
