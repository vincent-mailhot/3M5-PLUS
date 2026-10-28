---
title: "12.2 – 13.1 Tiroir de navigation"
sidebar_label: "12.2 Tiroir 🗄️"
description: ModalNavigationDrawer, drawerState, hamburger, NavigationDrawerItem, tiroir réutilisable.
---

# 12.2 / 13.1 – Tiroir de navigation 🗄️

Code de la recette : [ComposeTiroir](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeTiroir)

Le tiroir (*navigation drawer*) est le menu qui glisse depuis la gauche, ouvert avec l'icône **hamburger** ☰ (pain, steak, pain).

---

## Étape 1 — La navigation d'abord

Mets en place la navigation comme dans la [recette Navigation](/android/navigation) :
1. dépendance `navigation-compose` ;
2. routes dans un composable `Navigation()` ;
3. `Navigation()` appelé dans `setContent`.

```kotlin title="MainActivity.kt"
@Composable
fun Navigation(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(navController = navController, startDestination = "accueil") {
        composable(route = "accueil") { Accueil(navController, modifier) }
        composable(route = "ajout") { Ajout(navController, modifier) }
        composable(route = "connexion") { Connexion(navController, modifier) }
    }
}
```

Les icônes `Home`, `Add`, `Close`, `Menu` sont dans les icônes de base. Pour d'autres, ajoute les [icônes étendues](/android/logo-icones).

---

## Étape 2 — Le tiroir : un composable réutilisable

```kotlin title="MonTiroir.kt"
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController

@Composable
fun MonSuperTiroir(
    controleurNavigation: NavHostController,   // pour naviguer au clic
    routeActuelle: String,                     // pour surligner l'item courant
    fermerTiroir: () -> Unit,                  // agit sur le drawerState défini plus haut
    modifier: Modifier = Modifier
) {
    ModalDrawerSheet(modifier) {
        Text(
            "Mon application",
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(horizontal = 28.dp, vertical = 24.dp)
        )
        NavigationDrawerItem(
            label = { Text("Accueil") },
            icon = { Icon(Icons.Filled.Home, contentDescription = null) },
            selected = routeActuelle == "accueil",
            onClick = {
                controleurNavigation.navigate("accueil")
                fermerTiroir()
            },
            modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding)
        )
        NavigationDrawerItem(
            label = { Text("Ajout") },
            icon = { Icon(Icons.Filled.Add, contentDescription = null) },
            selected = routeActuelle == "ajout",
            onClick = {
                controleurNavigation.navigate("ajout")
                fermerTiroir()
            },
            modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding)
        )
        HorizontalDivider()
        NavigationDrawerItem(
            label = { Text("Déconnexion") },
            icon = { Icon(Icons.Filled.Close, contentDescription = null) },
            selected = false,
            onClick = {
                controleurNavigation.navigate("connexion")
                fermerTiroir()
            },
            modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding)
        )
    }
}
```

---

## Étape 3 — `ModalNavigationDrawer` + hamburger dans chaque écran

- Le **`drawerState`** est déclaré dans l'écran car il est **partagé** entre le hamburger (qui ouvre) et le tiroir (qui ferme).
- `open()` et `close()` sont des fonctions **suspend** (animation) → il faut une **coroutine** : `rememberCoroutineScope()` + `launch { }`.

```kotlin title="Accueil.kt"
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Accueil(controlerNav: NavHostController, modifier: Modifier = Modifier) {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val coroutineScope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            MonSuperTiroir(
                controleurNavigation = controlerNav,
                routeActuelle = "accueil",
                fermerTiroir = { coroutineScope.launch { drawerState.close() } }
            )
        }
    ) {
        // Le contenu de l'écran
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Accueil") },
                    navigationIcon = {
                        // Le hamburger, en haut à gauche par convention
                        IconButton(onClick = { coroutineScope.launch { drawerState.open() } }) {
                            Icon(Icons.Filled.Menu, contentDescription = "Ouvrir le menu")
                        }
                    }
                )
            },
            floatingActionButton = {
                FloatingActionButton(onClick = { controlerNav.navigate("ajout") }) {
                    Icon(Icons.Filled.Add, contentDescription = "Ajouter")
                }
            }
        ) { padding ->
            Text(
                "Contenu de l'accueil",
                modifier = modifier.fillMaxSize().padding(padding).padding(16.dp)
            )
        }
    }
}
```

:::tip Éviter la duplication dans chaque écran
Crée un composable « gabarit » qui contient le tiroir + Scaffold + TopAppBar, et passe-lui le titre, la route et le contenu :

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EcranAvecTiroir(
    titre: String,
    route: String,
    navController: NavHostController,
    contenu: @Composable (PaddingValues) -> Unit
) {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            MonSuperTiroir(navController, route, { scope.launch { drawerState.close() } })
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(titre) },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Filled.Menu, contentDescription = "Menu")
                        }
                    }
                )
            }
        ) { padding -> contenu(padding) }
    }
}

// Utilisation :
@Composable
fun Ajout(navController: NavHostController) {
    EcranAvecTiroir("Ajout", "ajout", navController) { padding ->
        Text("Contenu de l'ajout", Modifier.padding(padding))
    }
}
```
:::

---

## Exercices (pistes de solution)

### TiroirA — actions sans navigation

```kotlin
val context = LocalContext.current
val activity = context as? android.app.Activity

NavigationDrawerItem(
    label = { Text("Accueil") },
    selected = false,
    onClick = { activity?.finish() }                       // ferme l'application
)
NavigationDrawerItem(
    label = { Text("Profil") },
    selected = false,
    onClick = { Toast.makeText(context, "Alice", Toast.LENGTH_SHORT).show() }
)
NavigationDrawerItem(
    label = { Text("Déconnexion") },
    selected = false,
    onClick = { Log.d("TiroirA", "Déconnexion demandée") }   // visible dans Logcat
)
```

### TiroirB

Copie TiroirA et ajoute le hamburger dans la `TopAppBar` (étape 3) pour ouvrir/fermer le tiroir.

### TP3 — supprimer les votes / sujets depuis le tiroir

```kotlin
NavigationDrawerItem(
    label = { Text(stringResource(R.string.suppr_votes)) },
    selected = false,
    onClick = {
        service.supprimerTousLesVotes()
        fermerTiroir()
        navController.navigate("accueil") {                 // retour à la liste
            popUpTo("accueil") { inclusive = true }
        }
    }
)
```
