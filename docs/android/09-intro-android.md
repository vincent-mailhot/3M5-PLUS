---
title: "6.2 – Intro Android et mise en page"
sidebar_label: "6.2 Intro Android 🤖"
description: Projet Compose, structure, Scaffold, Row/Column/weight, Log, Toast, Layout Inspector.
---

# 6.2 – Introduction à Android, mise en page avec Compose 🤖

📺 [Vidéo Tape le lapin](https://youtu.be/daJusni_s2E) — [code](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeTapeLeLapin) · [code annoté (très utile !)](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/TapeLeLapinAnnote)
📚 [Documentation Android](https://developer.android.com/) · [Mise en page Compose](https://developer.android.com/develop/ui/compose/layouts/basics)

---

## 1. Créer un projet Android Compose

1. Android Studio → **New Project**.
2. Choisis **Empty Activity** (l'icône avec le logo Compose).
3. **Name** : `TapeLeLapin` — **Package name** : `ca.cem.tapelelapin` (ou ton nom).
4. **Minimum SDK** : API 26 (comme les projets du cours).
5. **Build configuration language** : Kotlin DSL (`build.gradle.kts`).
6. **Finish** et attends la fin du *Gradle Sync*.

### Structure d'un projet

```text
app/
├── build.gradle.kts                  ← dépendances du MODULE (implementation(...))
└── src/main/
    ├── AndroidManifest.xml           ← activités, permissions, icône, nom de l'app
    ├── java/ca/cem/tapelelapin/
    │   ├── MainActivity.kt           ← point d'entrée
    │   └── ui/theme/                 ← Color.kt, Theme.kt, Type.kt (couleurs, thème clair/sombre)
    └── res/
        ├── values/strings.xml        ← textes (traductions)
        ├── drawable/                 ← images
        └── mipmap-*/                 ← icône de l'application
gradle/libs.versions.toml             ← catalogue des versions des librairies
settings.gradle.kts                   ← dépôts (google, mavenCentral, jitpack)
```

### Le `MainActivity` de base, expliqué

```kotlin title="MainActivity.kt"
class MainActivity : ComponentActivity() {           // une activité = un « écran » Android
    override fun onCreate(savedInstanceState: Bundle?) {  // appelé par Android à la création
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()                           // l'interface peut passer sous les barres système
        setContent {                                 // remplace les anciens fichiers XML
            TapeLeLapinTheme {                       // applique les couleurs du thème
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    // innerPadding = espace occupé par les barres (à appliquer au contenu !)
                    Greeting(name = "Android", modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable                                          // fonction qui DÉCRIT une partie d'interface
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(text = "Hello $name!", modifier = modifier)
}
```

---

## 2. Exécuter : émulateur ou appareil

- **Émulateur** : *Device Manager* → **Create Virtual Device** → *Medium Phone* → image système récente → Finish. Puis ▶ **Run** (`Shift+F10`).
- **Tablette/téléphone réel** : activer les *Options pour les développeurs* (taper 7 fois sur « Numéro de build »), puis *Débogage USB*.
- **Débogage** : 🐞 *Debug* (`Shift+F9`) — les points d'arrêt fonctionnent comme dans IntelliJ.

:::tip Écran noir / émulateur bloqué
*Device Manager* → ⋮ à côté de l'émulateur → **Wipe Data**, puis relance.
:::

---

## 3. Logcat et `Log`

```kotlin
import android.util.Log

const val TAG = "TapeLeLapin"

Log.d(TAG, "Le lapin est en position $positionLapin")   // debug
Log.i(TAG, "Info")
Log.w(TAG, "Attention")
Log.e(TAG, "Erreur", exception)                          // avec la stack trace
println("Ça marche aussi : apparaît dans Logcat avec le tag System.out")
```

Dans la fenêtre **Logcat** (en bas), filtre avec : `tag:TapeLeLapin` ou `package:mine level:debug`.

---

## 4. Toast (petit message temporaire)

```kotlin
import android.widget.Toast
import androidx.compose.ui.platform.LocalContext

@Composable
fun BoutonPoof() {
    val context = LocalContext.current     // le contexte s'obtient DANS une fonction @Composable
    Button(onClick = {
        Toast.makeText(context, "POOF", Toast.LENGTH_SHORT).show()
    }) {
        Text("Tape")
    }
}
```

---

## 5. Recette : faire une mise en page avec `Row` et `Column`

1. Pars de l'**écran complet**.
2. Essaie de tracer une **ligne verticale** qui sépare au moins 2 sous-éléments → si possible, commence par une **`Row`**.
3. Sinon, une **ligne horizontale** → **`Column`**.
4. Pour chaque sous-élément :
   - si c'est un widget simple (`Text`, `Image`, `Button`…) → ajoute-le directement ;
   - sinon → **réapplique la recette** sur ce sous-élément.
5. **Dimensionne** chaque enfant avec le `Modifier` :
   - taille explicite : `Modifier.width(120.dp)` / `height(...)` ;
   - proportion de l'espace restant : `Modifier.weight(1f)`.

| Unité | Usage |
|---|---|
| `dp` | Tailles et espacements (indépendant de la densité de l'écran) |
| `sp` | Tailles de **texte** (respecte la taille de police choisie par l'usager) |

### Exemple « mise en page simple »

Structure : `Row { Column(poids 1) { Text, Spacer(poids), Button }, Box(poids 1) { Text } }`

```kotlin title="MiseEnPage.kt"
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun MepSimple(modifier: Modifier = Modifier) {
    Row(modifier = modifier.fillMaxWidth()) {
        // 1er enfant : une Column (on peut tracer des lignes horizontales dedans)
        Column(Modifier.weight(1f).fillMaxHeight()) {
            Text("Texte en haut")
            Spacer(Modifier.weight(1f))            // consomme l'espace restant
            Button(
                onClick = {},
                modifier = Modifier.padding(10.dp).fillMaxWidth()
            ) {
                Text("Clique moi")
            }
        }
        // 2e enfant : même poids → 50 % / 50 %
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxHeight()
                .background(Color.Blue)
        ) {
            Text("Yo mama", color = Color.White)
        }
    }
}
```

### Alignements

```kotlin
Column(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.Center,            // position verticale des enfants
    horizontalAlignment = Alignment.CenterHorizontally   // alignement horizontal
) { /* ... */ }

Row(
    horizontalArrangement = Arrangement.SpaceBetween,    // Start, End, Center, SpaceEvenly, spacedBy(8.dp)
    verticalAlignment = Alignment.CenterVertically
) { /* ... */ }

Box(contentAlignment = Alignment.Center) { /* éléments superposés */ }
```

:::warning Erreurs fréquentes
- Mettre un `weight` sur un élément qui contient du **texte** dans le sens de la hauteur → le texte peut disparaître.
- Oublier d'appliquer `innerPadding` → le contenu passe sous la barre du haut.
- `Modifier` vs `modifier` : `Modifier` crée un **nouveau** modificateur ; `modifier` utilise **celui reçu en paramètre**.
:::

### Déboguer une mise en page : Layout Inspector

1. Lance l'application.
2. **Tools → Layout Inspector** (ou l'onglet *Running Devices*).
3. Clique sur un élément pour voir sa taille, son `Modifier` et sa position dans l'arbre.
4. Corrige le code et relance.

### Prévisualiser sans lancer l'émulateur

```kotlin
import androidx.compose.ui.tooling.preview.Preview

@Preview(showBackground = true, widthDp = 360, heightDp = 640)
@Composable
fun ApercuMepSimple() {
    MepSimple()
}
```

---

## 6. Barre du haut (`TopAppBar`)

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Ecran() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Tape le lapin 🐇") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
                )
            )
        }
    ) { innerPadding ->
        Text("Contenu", Modifier.padding(innerPadding))
    }
}
```

---

## Exercices (pistes de solution)

### Italia 🇮🇹 — 3 `Surface` de même taille

```kotlin
@Composable
fun Italia(modifier: Modifier = Modifier) {
    Row(modifier = modifier.fillMaxSize()) {
        Surface(color = Color(0xFF009246), modifier = Modifier.weight(1f).fillMaxHeight()) {}
        Surface(color = Color.White,       modifier = Modifier.weight(1f).fillMaxHeight()) {}
        Surface(color = Color(0xFFCE2B37), modifier = Modifier.weight(1f).fillMaxHeight()) {}
    }
}
```

### Tape le lapin 🐇🔨 (version condensée du code annoté)

```kotlin title="MainActivity.kt (extrait)"
import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.random.Random

@Composable
fun EcranPrincipal(modifier: Modifier = Modifier) {
    // ÉTATS : quand ils changent, l'interface se redessine (voir la note « État »)
    var nbPafs by remember { mutableIntStateOf(0) }
    var nbFlops by remember { mutableIntStateOf(0) }
    var positionLapin by remember { mutableIntStateOf(Random.nextInt(9)) }  // cases 0 à 8
    val context = LocalContext.current

    Column(modifier = modifier.fillMaxSize()) {
        Row(Modifier.fillMaxWidth().weight(0.2f)) {
            Text("$nbPafs Pafs", Modifier.weight(1f), fontSize = 32.sp, textAlign = TextAlign.Center)
            Text("$nbFlops Flops", Modifier.weight(1f), fontSize = 32.sp, textAlign = TextAlign.Center)
        }
        Column(Modifier.fillMaxSize().weight(1f)) {
            for (i in 0..2) {
                Row(Modifier.fillMaxWidth().weight(1f)) {
                    for (j in 0..2) {
                        val index = i * 3 + j
                        val estLapin = index == positionLapin
                        ElevatedButton(
                            onClick = {
                                if (estLapin) {
                                    nbPafs++
                                    positionLapin = Random.nextInt(9)
                                    Toast.makeText(context, "POOF", Toast.LENGTH_SHORT).show()
                                } else {
                                    nbFlops++
                                }
                            },
                            modifier = Modifier.weight(1f).fillMaxHeight().padding(6.dp)
                        ) {
                            Text(if (estLapin) "🐰" else "🕳️", fontSize = 40.sp)
                        }
                    }
                }
            }
        }
    }
}
```

:::tip Pourquoi des lambdas `incrementePafs = { nbPafs++ }` dans le code annoté ?
Si on passait `nbPafs` (un `Int`) en paramètre à une sous-fonction, elle recevrait une **copie** : la modifier n'aurait aucun effet. On passe donc une **fonction** qui modifie l'état là où il est déclaré (*state hoisting*).
:::
