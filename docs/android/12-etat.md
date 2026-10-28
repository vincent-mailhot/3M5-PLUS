---
title: "8.2 – Gestion de l'état"
sidebar_label: "8.2 État 🔄"
description: remember, mutableStateOf, mutableStateListOf, state hoisting, rememberSaveable, TextField.
---

# 8.2 / 9.1 – Gestion de l'état avec Jetpack Compose 🔄

Code de démonstration : [ComposeEtat](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeEtat) — lis-le, exécute-le, et place des points d'arrêt sur les `TODO` pour voir **quand** chaque fonction est rappelée.

---

## 1. Le principe : recomposition

En Compose, l'interface est une **fonction de l'état** : `UI = f(état)`.
Quand un **état** change, Compose **ré-exécute** (recompose) les fonctions `@Composable` qui le lisent.

- Une variable normale (`var x = 0`) **ne déclenche rien** quand elle change → l'écran ne bouge pas.
- Un **état** (`mutableStateOf`) prévient Compose → l'écran se met à jour.
- `remember { }` garde la valeur **entre les recompositions** (sinon elle serait réinitialisée à chaque fois).

```kotlin
import androidx.compose.runtime.*   // remember, mutableStateOf, getValue, setValue

@Composable
fun Compteur() {
    var count by remember { mutableStateOf(0) }    // ou mutableIntStateOf(0)
    Button(onClick = { count++ }) {
        Text("Compteur : $count")
    }
}
```

:::warning Import du `by`
Pour utiliser `by remember { ... }`, il faut les imports `androidx.compose.runtime.getValue` et `androidx.compose.runtime.setValue` (ou `androidx.compose.runtime.*`). `Alt+Enter` les ajoute.
:::

---

## 2. Les types d'état

| Besoin | Code |
|---|---|
| Un `Int` | `var n by remember { mutableIntStateOf(0) }` |
| Un `Float` / `Double` | `mutableFloatStateOf(0f)` / `mutableDoubleStateOf(0.0)` |
| Un `String`, `Boolean`, objet | `var texte by remember { mutableStateOf("") }` |
| Une **liste** modifiable | `val liste = remember { mutableStateListOf(1, 2, 3) }` |
| Une **map** modifiable | `val map = remember { mutableStateMapOf<String, Int>() }` |
| Survivre à la **rotation** de l'écran | `var n by rememberSaveable { mutableIntStateOf(0) }` |

```kotlin
// ⚠️ Liste : on MODIFIE la liste, on ne la remplace pas
val listeMemoire: SnapshotStateList<Int> = remember { mutableStateListOf(1, 2, 3) }
Button(onClick = { listeMemoire.add(listeMemoire.size * 2) }) { Text("Ajout Liste") }
Text("la liste est " + listeMemoire.joinToString(", "))
```

:::danger Piège classique
`val liste = remember { mutableListOf(1, 2, 3) }` (une `MutableList` normale) : la liste change mais **l'écran ne se met pas à jour**. Utilise `mutableStateListOf`.
:::

---

## 3. Où déclarer l'état ? (*state hoisting* / remontée d'état)

> L'état se déclare dans la fonction **la plus haute** qui en a besoin, puis on le **descend** en paramètre aux enfants, et les enfants **remontent** les événements avec des **lambdas**.

```kotlin
@Composable
fun EcranPrincipal(modifier: Modifier = Modifier) {
    var compteur by remember { mutableIntStateOf(0) }       // l'état vit ICI

    Column(modifier.fillMaxSize()) {
        AfficherCompteur(compteur = compteur)               // ⬇ on descend la VALEUR
        BoutonPourIncrementer(
            quandOnCliqueSurIncrementer = { compteur++ }    // ⬆ l'enfant remonte l'ÉVÉNEMENT
        )
    }
}

@Composable
private fun AfficherCompteur(compteur: Int) {
    Text("$compteur pushs sur le bouton", fontSize = 25.sp)
}

@Composable
private fun BoutonPourIncrementer(quandOnCliqueSurIncrementer: () -> Unit) {
    Button(onClick = quandOnCliqueSurIncrementer) {
        Text("Incrémenter")
    }
}
```

**Pourquoi une lambda ?** Si on passait `compteur` (un `Int`) à l'enfant, il recevrait une **copie** : la modifier n'aurait aucun effet sur l'état du parent.

---

## 4. Champ de texte (`TextField`)

📚 [Documentation : saisie de texte](https://developer.android.com/develop/ui/compose/text/user-input?hl=fr)

```kotlin
@Composable
fun SaisiePrenom(modifier: Modifier = Modifier) {
    var prenom by remember { mutableStateOf("") }

    Column(modifier.padding(16.dp)) {
        // 1. Champ vide avec un libellé
        TextField(
            value = prenom,
            onValueChange = { nouveauTexte -> prenom = nouveauTexte },   // mise à jour de l'état
            label = { Text("Prénom") },
            singleLine = true
        )
        // 2. Message mis à jour en temps réel
        Text("Bonjour, $prenom")

        // 3. Bouton Effacer, désactivé si le champ est vide
        Button(
            onClick = { prenom = "" },
            enabled = prenom.isNotEmpty()
        ) {
            Text("Effacer")
        }
    }
}
```

Variantes : `OutlinedTextField` (bordure), `keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)` pour un clavier numérique.

---

## Exercices (pistes de solution)

### Compteur avec un bouton réutilisable

```kotlin
@Composable
fun Bouton(
    texteAffiché: String,             // texte du bouton
    changerCompteur: () -> Unit,      // fonction qui modifie le compteur
    modifier: Modifier = Modifier
) {
    Button(onClick = changerCompteur, modifier = modifier) {
        Text(texteAffiché)
    }
}

@Composable
fun EcranCompteur(modifier: Modifier = Modifier) {
    var compteur by remember { mutableIntStateOf(0) }
    Column(
        modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("$compteur", fontSize = 48.sp)
        Row {
            Bouton("-", { compteur-- })
            Spacer(Modifier.width(16.dp))
            Bouton("+", { compteur++ })
        }
    }
}
```

### Lampes 💡 (allumer jusqu'à la lampe cliquée)

Nécessite les icônes étendues (voir [Logo et icônes](/android/logo-icones)).

```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.outlined.Lightbulb

@Composable
fun RangeeDeLampes(nombreLampes: Int = 5, modifier: Modifier = Modifier) {
    var nbAllumees by remember { mutableIntStateOf(0) }

    Column(modifier, horizontalAlignment = Alignment.CenterHorizontally) {
        Row {
            for (i in 0 until nombreLampes) {
                IconButton(onClick = { nbAllumees = i + 1 }) {   // allume de 0 jusqu'à i
                    Icon(
                        imageVector = if (i < nbAllumees) Icons.Filled.Lightbulb else Icons.Outlined.Lightbulb,
                        contentDescription = "Lampe ${i + 1}",
                        tint = if (i < nbAllumees) Color(0xFFFFC107) else Color.Gray
                    )
                }
            }
        }
        Button(onClick = { nbAllumees = 0 }) { Text("Tout éteindre") }
    }
}
```

Version « une seule lampe on/off » :

```kotlin
var allumee by remember { mutableStateOf(false) }
IconButton(onClick = { allumee = !allumee }) {
    Icon(
        if (allumee) Icons.Filled.Lightbulb else Icons.Outlined.Lightbulb,
        contentDescription = if (allumee) "Allumée" else "Éteinte"
    )
}
```

Version « chaque lampe indépendante » :

```kotlin
val lampes = remember { mutableStateListOf(false, false, false, false, false) }
Row {
    lampes.forEachIndexed { i, allumee ->
        IconButton(onClick = { lampes[i] = !allumee }) {
            Icon(if (allumee) Icons.Filled.Lightbulb else Icons.Outlined.Lightbulb, null)
        }
    }
}
```
