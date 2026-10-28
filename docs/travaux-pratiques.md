---
title: Travaux pratiques
sidebar_label: 🛠️ Travaux pratiques
description: Résumé des trois TP et des notions à utiliser pour chacun.
---

# Travaux pratiques 🛠️

Les énoncés complets (barème, captures d'écran) sont sur le site officiel : [TP1](https://info.cegepmontpetit.ca/3M5-Intro-Mobile/tp/tp1) · [TP2](https://info.cegepmontpetit.ca/3M5-Intro-Mobile/tp/tp2) · [TP3](https://info.cegepmontpetit.ca/3M5-Intro-Mobile/tp/tp3). Ici : un résumé et **les notes à relire pour chaque partie**.

:::caution Remplace « Dupont » par TON nom de famille partout.
:::

---

## TP1 — KotCrawler 🕷️ (Kotlin console)

Programme qui lit un fichier d'URL, télécharge chaque page, affiche son titre et extrait les **courriels valides** dans un fichier.

| Exigence | Notes utiles |
|---|---|
| Dépôt GitHub, ≥ 4 commits en français correct, au moins 1 par semaine | [Git](/kotlin/revision-intra#révision-git-gitkraken-ou-ligne-de-commande) |
| Fichier `KotCrawlerDupont.kt`, package `crawly.dupont` | [Intro Kotlin](/kotlin/intro-kotlin) |
| Message `Bienvenue dans KotCrawlerDupont` | — |
| 2 arguments en ligne de commande, sinon message d'utilisation | [Arguments](/kotlin/intro-kotlin#passer-des-arguments-configuration-dexécution) |
| Fichier d'URL : existe ? lisible ? | [Fichiers](/kotlin/librairie-standard#4-fichiers-javaiofile) |
| Fichier de courriels : n'existe pas déjà ? dossier accessible en écriture ? | [Fichiers](/kotlin/librairie-standard#4-fichiers-javaiofile) |
| Plan de test de la validation des arguments | [Plan de test](/kotlin/tests-unitaires#5-le-plan-de-test) |
| Téléchargement avec gestion des erreurs (URL malformée, page introuvable) | [Jsoup](/kotlin/librairies-tierces) · [Exceptions](/kotlin/exceptions) |
| Extraction et validation des courriels | [Commons Validator](/kotlin/librairies-tierces#validationcourriel-avec-apache-commons-validator) |

Squelette de départ :

```kotlin title="src/main/kotlin/crawly/dupont/KotCrawlerDupont.kt"
package crawly.dupont

import java.io.File

fun main(args: Array<String>) {
    println("Bienvenue dans KotCrawlerDupont")
    if (!argumentsValides(args)) return
    val urls: List<String> = File(args[0]).readLines()
    // TODO explorer chaque URL avec Jsoup dans un try/catch
}

fun argumentsValides(args: Array<String>): Boolean {
    if (args.size != 2) {
        println("""
            Merci de nous fournir 2 arguments :
            - le chemin vers le fichier contenant les URL à explorer
            - le nom du fichier à créer pour sauvegarder les courriels
            Par exemple : urls.txt ../courriels.txt
        """.trimIndent())
        return false
    }
    val entree = File(args[0])
    if (!entree.exists()) {
        println("Nous avons rencontré un problème avec le chemin fourni : ${args[0]}")
        println("Merci de fournir un chemin vers un fichier existant.")
        return false
    }
    if (!entree.canRead()) {
        println("Nous avons rencontré un problème avec le chemin fourni : ${args[0]}")
        println("Le fichier existe mais ne semble pas accessible en lecture.")
        return false
    }
    val sortie = File(args[1])
    if (sortie.exists()) {
        println("Le fichier ${args[1]} existe déjà.")
        return false
    }
    if (!sortie.absoluteFile.parentFile.canWrite()) {
        println("Le chemin spécifié n'est pas accessible en écriture.")
        return false
    }
    return true
}
```

---

## TP2 — Interface graphique Android 📱 (application de sondages)

4 écrans : **Accueil** (liste des sujets), **Création d'un sujet**, **Vote** (0 à 5 étoiles + nom), **Résultats** (moyenne + graphique). Données codées en dur. ≥ 8 commits, 2 par semaine.

| Exigence | Notes utiles |
|---|---|
| Mise en page fidèle aux captures | [Intro Android](/android/intro-android) |
| Navigation entre les 4 écrans | [Navigation](/android/navigation) |
| Liste des sujets | [Listes](/android/listes) |
| Étoiles de vote (état) | [État](/android/etat) · [Icônes](/android/logo-icones) |
| Graphique de distribution des notes | [Graphique](/android/graphique) |
| Traduction français + anglais, sans fautes | [Multilingue](/android/multilingue) |
| Aucun plantage (points négatifs) | — |

Étoiles de vote :

```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.StarOutline

@Composable
fun Etoiles(note: Int, onNoteChange: (Int) -> Unit, modifier: Modifier = Modifier) {
    Row(modifier, horizontalArrangement = Arrangement.Center) {
        for (i in 1..5) {
            IconButton(onClick = { onNoteChange(if (note == i) 0 else i) }) {   // re-cliquer = 0 étoile
                Icon(
                    imageVector = if (i <= note) Icons.Filled.Star else Icons.Outlined.StarOutline,
                    contentDescription = "$i étoile(s)"
                )
            }
        }
    }
}

// Utilisation (centré horizontalement) :
// var note by remember { mutableIntStateOf(0) }
// Etoiles(note, { note = it }, Modifier.fillMaxWidth())
```

---

## TP3 — Appli Android complète 🗃️

Branchement à une **BD** (librairie Room fournie via JitPack), **classe de service** + **tests**, **tiroir de navigation**. ≥ 5 commits.

| Exigence | Notes utiles |
|---|---|
| Importer la librairie BD (JitPack) | [JitPack](/kotlin/librairies-tierces#recette-b--librairie-hébergée-sur-github--jitpack) · [doc de la librairie](https://info.cegepmontpetit.ca/3N5-TP3-Librairie-BD/) |
| `DupontService` : validation, tri, moyenne, distribution, suppressions | [Service](/android/structure-service) |
| Exceptions significatives + messages d'erreur dans l'interface | [Gérer les erreurs](/android/structure-service#4-gérer-les-erreurs--le-service-lance-linterface-attrape) |
| Tests du service (`androidTest`) | [Tests Android](/android/tests-android) |
| Tiroir dans toutes les activités, suppression des votes / sujets | [Tiroir](/android/tiroir) |

Tester la BD rapidement :

```kotlin
val database: SujetVoteDataBase = UtilitaireBD.get(LocalContext.current)
val dao: SujetVoteDAO = database.dao()
val sujet = Sujet()
sujet.contenu = "test"
dao.ajouterSujet(sujet)
println(dao.tousLesSujets())   // à voir dans le Logcat
```

Inspecter la BD : **View → Tool Windows → App Inspection → Database Inspector**.

Exemples de méthodes de service :

```kotlin
fun listeSujets(): List<Sujet> =
    dao.tousLesSujets().sortedByDescending { sujet -> dao.votesPourSujet(sujet.id).size }  // adapter aux méthodes du DAO

fun moyenneVotes(id: Long): Double {
    val votes = dao.votesPourSujet(id)          // adapter au nom réel de la méthode du DAO
    return if (votes.isEmpty()) 0.0 else votes.map { it.note }.average()
}

fun distributionVotes(id: Long): Map<Int, Int> {
    val votes = dao.votesPourSujet(id)
    return (0..5).associateWith { note -> votes.count { it.note == note } }
}
```

:::note
Les noms exacts des méthodes du DAO et des champs (`note`, `votesPourSujet`…) dépendent de la librairie fournie : vérifie dans sa [documentation](https://info.cegepmontpetit.ca/3N5-TP3-Librairie-BD/).
:::
