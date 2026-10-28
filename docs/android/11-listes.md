---
title: "7.2 – 8.1 Listes et LazyColumn"
sidebar_label: "7.2 Listes ☰"
description: LazyColumn, items, item, liste d'objets, navigation vers un détail, suppression, images avec Coil.
---

# 7.2 / 8.1 – Listes et `LazyColumn` ☰

Code des recettes : [ComposeListe](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeListe) · [ComposeListeNav](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeListeNav)

---

## 1. Liste simple

### Étape 1 — Le `LazyColumn`

```kotlin
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items   // ⚠️ à importer à la main parfois !

LazyColumn(
    modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
) {
    // contenu : items(...) et/ou item { ... }
}
```

### Étape 2 — Remplir avec `items`

`items` prend une **collection** et une lambda qui transforme chaque élément en composable :

```kotlin
val trucs: List<Double> = listOf(12.0, 34.0, 56.0, 78.0, 90.0)
LazyColumn {
    items(trucs) { truc ->
        Machin(name = "Truc #$truc", modifier = Modifier.padding(8.dp).height(150.dp))
    }
}
```

Variante avec un **nombre** d'éléments :

```kotlin
LazyColumn {
    items(10) { index ->
        Text("Item #$index", Modifier.padding(8.dp))
    }
}
```

### Étape 3 — Ou ajouter des éléments un par un avec `item`

Utile quand les données sont dans plusieurs collections, ou pour ajouter un en-tête :

```kotlin
LazyColumn {
    item { Text("En-tête", style = MaterialTheme.typography.headlineSmall) }

    val patentes = listOf("a", "b", "c")
    for (patente in patentes) {
        item { Machin(name = patente) }
    }

    items(trucs) { truc -> Machin(name = "Truc #$truc") }   // on peut combiner !
}
```

### Pourquoi « Lazy » (paresseux) ?

`LazyColumn` ne crée **que les éléments visibles** à l'écran. Mets un point d'arrêt dans la lambda de `items` et fais défiler : elle est appelée au fur et à mesure. Une `Column` normale créerait les 10 000 éléments d'un coup.

:::warning
Ne mets pas de `LazyColumn` dans une `Column` avec `verticalScroll` : donne-lui plutôt une taille (`weight(1f)` ou `fillMaxSize()`).
:::

---

## 2. Liste d'objets + écran de détail

### Étape 1 — La classe de données

```kotlin title="Donnees.kt"
data class Donnee(
    val id: Int,
    val nom: String
)

fun donnees(): List<Donnee> = listOf(
    Donnee(1, "Homer Simpson"),
    Donnee(2, "Marge Simpson"),
    Donnee(3, "Bart Simpson"),
    Donnee(4, "Lisa Simpson"),
    Donnee(5, "Maggie Simpson"),
)

fun donnee(id: Int): Donnee =
    donnees().firstOrNull { it.id == id } ?: Donnee(0, "Inconnu")
```

### Étape 2 — La navigation (voir [Navigation](/android/navigation))

```kotlin
@Composable
fun Navigation(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(navController = navController, startDestination = "liste") {
        composable(route = "liste") { Liste(navController, modifier) }
        composable(route = "detail/{id}") {
            val id = it.arguments?.getString("id")!!.toInt()
            Detail(navController, modifier, id)
        }
    }
}
```

### Étape 3 — L'écran liste

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Liste(navController: NavHostController, modifier: Modifier = Modifier) {
    Scaffold(
        modifier = modifier.fillMaxSize(),
        topBar = { TopAppBar(title = { Text("Liste") }) }
    ) { padding ->
        LazyColumn(modifier = Modifier.fillMaxSize().padding(padding)) {
            items(donnees()) { truc ->
                BoitePourElement(truc = truc, navController = navController)
            }
        }
    }
}
```

### Étape 4 — Un composable par élément (recommandé)

```kotlin
@Composable
fun BoitePourElement(
    truc: Donnee,
    navController: NavController,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier.fillMaxWidth().padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = truc.nom, modifier = Modifier.weight(1f).padding(8.dp))
        Button(onClick = { navController.navigate("detail/" + truc.id) }) {
            Text("détail")
        }
    }
}
```

:::tip Toute la ligne cliquable
Au lieu d'un bouton : `Row(modifier = Modifier.clickable { navController.navigate("detail/${truc.id}") })`.
:::

### Étape 5 — L'écran de détail

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Detail(navController: NavHostController, modifier: Modifier = Modifier, id: Int) {
    val donnee = donnee(id)
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Détail") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Retour")
                    }
                }
            )
        }
    ) { padding ->
        Column(Modifier.fillMaxSize().padding(padding)) {
            Text("Détail de l'élément avec id $id", Modifier.padding(20.dp))
            Text(donnee.nom, Modifier.padding(20.dp))
        }
    }
}
```

---

## 3. Liste modifiable (supprimer, ajouter) — avec l'état

Pour que l'écran se mette à jour quand la liste change, la liste doit être un **état** : `mutableStateListOf`.

```kotlin
data class Album(
    val id: Int,
    val name: String,
    val artistName: String,
)

@Composable
fun AlbumsFavoris(modifier: Modifier = Modifier) {
    val albums = remember {
        mutableStateListOf(
            Album(1, "Abbey Road", "The Beatles"),
            Album(2, "Thriller", "Michael Jackson"),
            Album(3, "Random Access Memories", "Daft Punk"),
        )
    }
    LazyColumn(modifier) {
        // key = identifiant stable → animations et performances correctes
        items(albums, key = { it.id }) { album ->
            Row(
                Modifier.fillMaxWidth().height(150.dp).padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(Modifier.weight(1f)) {
                    Text(album.name, style = MaterialTheme.typography.titleMedium)
                    Text(album.artistName)
                }
                Button(onClick = { albums.remove(album) }) {   // l'écran se met à jour seul
                    Text("Supprimer")
                }
            }
            HorizontalDivider()   // séparateur entre les éléments
        }
    }
}
```

---

## 4. Boîte de dialogue (`AlertDialog`)

```kotlin
var afficherDialogue by remember { mutableStateOf(false) }

if (afficherDialogue) {
    AlertDialog(
        onDismissRequest = { afficherDialogue = false },
        title = { Text("Bravo ! 🎉") },
        text = { Text("La liste est dans l'ordre alphabétique.") },
        confirmButton = {
            TextButton(onClick = { afficherDialogue = false }) { Text("Rejouer") }
        }
    )
}
```

---

## 5. Image depuis une URL avec Coil (optionnel)

### Étape 1 — Dépendances

```kotlin title="app/build.gradle.kts"
dependencies {
    implementation("io.coil-kt.coil3:coil-compose:3.0.4")
    implementation("io.coil-kt.coil3:coil-network-okhttp:3.0.4")
}
```

### Étape 2 — Permission Internet

```xml title="app/src/main/AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- highlight-next-line -->
    <uses-permission android:name="android.permission.INTERNET" />
    <application ...>
```

### Étape 3 — Afficher

```kotlin
import coil3.compose.AsyncImage

AsyncImage(
    model = album.coverUrl,
    contentDescription = "Pochette de ${album.name}",
    modifier = Modifier.size(100.dp)
)
```

---

## Exercices (pistes de solution)

<details>
<summary>Bingo — tirages uniques</summary>

```kotlin
data class Tirage(val numeroTirage: Int, val boule: Int) {
    val lettre: Char
        get() = when (boule) {
            in 1..15 -> 'B'
            in 16..30 -> 'I'
            in 31..45 -> 'N'
            in 46..60 -> 'G'
            else -> 'O'
        }
}

fun genererTirages(): List<Tirage> =
    (1..75).shuffled()                                      // chaque boule une seule fois
        .mapIndexed { index, boule -> Tirage(index + 1, boule) }

@Composable
fun Bingo(modifier: Modifier = Modifier) {
    val tirages = remember { genererTirages() }
    LazyColumn(modifier) {
        items(tirages) { t ->
            Text("Tirage #${t.numeroTirage} : ${t.lettre} ${t.boule}", Modifier.padding(12.dp))
        }
    }
}
```
</details>

<details>
<summary>Duplicata — chaque clic dédouble l'élément</summary>

```kotlin
@Composable
fun Duplicata(modifier: Modifier = Modifier) {
    val nombres = remember { mutableStateListOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) }
    LazyColumn(modifier) {
        itemsIndexed(nombres) { index, n ->
            Text(
                "$n",
                Modifier.fillMaxWidth().clickable { nombres.add(index + 1, n) }.padding(16.dp)
            )
        }
    }
}
```
</details>

<details>
<summary>OrdreAlpha — monter/descendre + victoire</summary>

```kotlin
@Composable
fun OrdreAlpha(modifier: Modifier = Modifier) {
    val prenoms = remember { mutableStateListOf(*listOf("Alice", "Bob", "Chloé", "David", "Emma").shuffled().toTypedArray()) }
    var gagne by remember { mutableStateOf(false) }

    fun echanger(i: Int, j: Int) {
        if (i !in prenoms.indices || j !in prenoms.indices) return
        val tmp = prenoms[i]; prenoms[i] = prenoms[j]; prenoms[j] = tmp
        if (prenoms.toList() == prenoms.sorted()) gagne = true
    }

    LazyColumn(modifier) {
        itemsIndexed(prenoms) { index, prenom ->
            Row(Modifier.fillMaxWidth().padding(8.dp), verticalAlignment = Alignment.CenterVertically) {
                Text(prenom, Modifier.weight(1f))
                Button(onClick = { echanger(index, index - 1) }) { Text("↑") }
                Button(onClick = { echanger(index, index + 1) }) { Text("↓") }
            }
        }
    }
    if (gagne) {
        AlertDialog(
            onDismissRequest = {},
            title = { Text("Félicitations !") },
            confirmButton = {
                TextButton(onClick = {
                    val melange = prenoms.shuffled()
                    prenoms.clear(); prenoms.addAll(melange)
                    gagne = false
                }) { Text("Rejouer") }
            }
        )
    }
}
```

`itemsIndexed` s'importe avec `import androidx.compose.foundation.lazy.itemsIndexed`.
</details>
