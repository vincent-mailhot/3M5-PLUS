---
title: Aide-mémoire
sidebar_label: 📋 Aide-mémoire
description: Tous les bouts de code essentiels du cours sur une page, prêts à copier.
---

# Aide-mémoire 📋

Les extraits essentiels, prêts à copier. Idéal pour préparer ta feuille de notes d'examen.

## Kotlin

```kotlin title="Syntaxe de base"
val constante: Int = 5                 // non réassignable
var variable: String = "a"             // réassignable
var peutEtreNull: String? = null
val longueur: Int = peutEtreNull?.length ?: 0
val nombre: Int? = "42".toIntOrNull()

fun addition(a: Int, b: Int): Int = a + b

if (x > 0) { } else if (x < 0) { } else { }
val signe = when { x > 0 -> "+"; x < 0 -> "-"; else -> "0" }

for (i in 1..5) {}          // 1 à 5
for (i in 0 until n) {}     // 0 à n-1
for (i in 10 downTo 0 step 2) {}
for (e in liste) {}
for ((i, e) in liste.withIndex()) {}
while (cond) {}
```

```kotlin title="Collections"
val l = mutableListOf(3, 1, 2); l.add(4); l.removeAt(0); l[0]; l.size
val s = mutableSetOf("a", "b")
val m = mutableMapOf("a" to 1); m["b"] = 2; m["a"]; for ((k, v) in m) {}
l.sorted(); l.reversed(); l.filter { it > 1 }; l.map { it * 2 }; l.count { it == 2 }
l.sum(); l.average(); l.max(); l.contains(3); l.joinToString(", ")
l.groupingBy { it }.eachCount()
```

```kotlin title="Fichiers"
import java.io.File
File("f.txt").exists(); File("f.txt").canRead(); File("f.txt").readLines()
File("f.txt").writeText("..."); File("f.txt").appendText("...")
File("f.txt").absoluteFile.parentFile.canWrite()
```

```kotlin title="Exceptions"
class MonException(message: String) : Exception(message)

try {
    risque()
} catch (e: MonException) {           // spécifique d'abord
    println(e.message)
} catch (e: Exception) {              // général ensuite
} finally { }

throw MonException("explication")
```

```kotlin title="Test JUnit 5 (IntelliJ, src/test/kotlin)"
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class CalculTest {
    @Test
    fun divisionNormale() {
        val resultat = division(10, 2)        // Act
        assertEquals(5, resultat)             // Assert
    }
    @Test
    fun noteInvalide() {
        assertThrows<IllegalArgumentException> { calculerNote(101) }
    }
}
```

```kotlin title="build.gradle.kts (IntelliJ)"
dependencies {
    implementation("org.jsoup:jsoup:1.18.3")
    testImplementation(kotlin("test"))
}
tasks.test { useJUnitPlatform() }
```

## Gradle Android

```toml title="gradle/libs.versions.toml"
[versions]
navigationCompose = "2.10.2"

[libraries]
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
androidx-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
```

```kotlin title="app/build.gradle.kts"
dependencies {
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.material.icons.extended)
    implementation("com.github.PhilJay:MPAndroidChart:v3.1.0")   // nécessite JitPack
}
```

```kotlin title="settings.gradle.kts (JitPack)"
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```

## Compose

```kotlin title="Mise en page"
Column(
    modifier = Modifier.fillMaxSize().padding(16.dp),
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("Titre", fontSize = 24.sp, fontWeight = FontWeight.Bold)
    Row(Modifier.fillMaxWidth()) {
        Text("Gauche", Modifier.weight(1f))
        Text("Droite", Modifier.weight(2f))      // 2x plus large
    }
    Spacer(Modifier.weight(1f))                  // pousse la suite en bas
    Button(onClick = { }) { Text("OK") }
}
```

```kotlin title="État"
var n by remember { mutableIntStateOf(0) }
var texte by remember { mutableStateOf("") }
val liste = remember { mutableStateListOf<String>() }
var survitRotation by rememberSaveable { mutableIntStateOf(0) }

TextField(value = texte, onValueChange = { texte = it }, label = { Text("Nom") })
Button(onClick = { n++ }, enabled = texte.isNotEmpty()) { Text("$n") }

// State hoisting : on descend la valeur, on remonte l'événement
@Composable
fun Enfant(valeur: Int, onIncrementer: () -> Unit) { Button(onClick = onIncrementer) { Text("$valeur") } }
```

```kotlin title="Scaffold + TopAppBar + FAB"
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Ecran() {
    Scaffold(
        topBar = { TopAppBar(title = { Text(stringResource(R.string.titre)) }) },
        floatingActionButton = {
            FloatingActionButton(onClick = { }) { Icon(Icons.Filled.Add, contentDescription = "Ajouter") }
        }
    ) { padding ->
        Column(Modifier.padding(padding)) { }
    }
}
```

```kotlin title="Navigation"
@Composable
fun Navigation(navController: NavHostController = rememberNavController()) {
    NavHost(navController = navController, startDestination = "liste") {
        composable("liste") { Liste(navController) }
        composable("detail/{id}") { entry ->
            val id = entry.arguments?.getString("id")?.toInt() ?: 0
            Detail(navController, id)
        }
    }
}
// navController.navigate("detail/${item.id}")
// navController.popBackStack()
```

```kotlin title="Liste"
LazyColumn(Modifier.fillMaxSize()) {
    items(elements, key = { it.id }) { element ->
        Row(Modifier.fillMaxWidth().clickable { navController.navigate("detail/${element.id}") }.padding(16.dp)) {
            Text(element.nom, Modifier.weight(1f))
            IconButton(onClick = { elements.remove(element) }) { Icon(Icons.Filled.Delete, null) }
        }
    }
}
```

```kotlin title="Tiroir"
val drawerState = rememberDrawerState(DrawerValue.Closed)
val scope = rememberCoroutineScope()
ModalNavigationDrawer(
    drawerState = drawerState,
    drawerContent = {
        ModalDrawerSheet {
            NavigationDrawerItem(
                label = { Text("Accueil") },
                icon = { Icon(Icons.Filled.Home, null) },
                selected = true,
                onClick = { navController.navigate("accueil"); scope.launch { drawerState.close() } }
            )
        }
    }
) {
    // Scaffold avec navigationIcon = { IconButton(onClick = { scope.launch { drawerState.open() } }) { Icon(Icons.Filled.Menu, null) } }
}
```

```kotlin title="Toast, Log, Intent, AndroidView"
val context = LocalContext.current
Toast.makeText(context, "Message", Toast.LENGTH_SHORT).show()
Log.d("MonTag", "message")
context.startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:5145551234")))

AndroidView(
    factory = { ctx -> WebView(ctx).apply { loadUrl("https://example.com") } },
    update = { vue -> /* mise à jour avec l'état */ }
)
```

## Multilingue

```xml title="res/values/strings.xml (défaut)"
<resources>
    <string name="app_name">My app</string>
    <string name="bonjour_nom">Hello %1$s!</string>
    <string name="apostrophe">It\'s fine</string>
</resources>
```

```xml title="res/values-fr/strings.xml  (+ values-fr-rCA pour le Québec)"
<resources>
    <string name="app_name">Mon app</string>
    <string name="bonjour_nom">Bonjour %1$s!</string>
    <string name="apostrophe">C\'est correct</string>
</resources>
```

```kotlin
Text(stringResource(R.string.bonjour_nom, "Alice"))     // dans un @Composable
context.getString(R.string.app_name)                    // ailleurs (onClick, Toast…)
pluralStringResource(R.plurals.messages, n, n)
```

## Raccourcis IDE (Windows)

| Action | Raccourci |
|---|---|
| Correction rapide / import | `Alt+Enter` |
| Renommer | `Shift+F6` |
| Extraire une fonction | `Ctrl+Alt+M` |
| Extraire une variable | `Ctrl+Alt+V` |
| Reformater | `Ctrl+Alt+L` |
| Chercher partout | `Shift` `Shift` |
| Créer un test | `Ctrl+Shift+T` |
| Debug : Step Over / Into / Out / Resume | `F8` / `F7` / `Shift+F8` / `F9` |
| Recharger Gradle | `Ctrl+Shift+O` |
