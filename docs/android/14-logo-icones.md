---
title: "8.2 – Logo et icônes"
sidebar_label: "8.2 Logo et icônes 🎨"
description: Changer l'icône de l'application avec Image Asset Studio et utiliser les Material Icons étendues.
---

# 8.2 / 9.1 – Logo de l'application et icônes 🎨

---

## 1. Changer le logo (icône de lancement)

Le logo est ce que l'usager voit sur son écran d'accueil et dans le Play Store : il fait partie de l'**identité visuelle** de l'app.

📚 [Codelab officiel : changer l'icône](https://developer.android.com/codelabs/basic-android-kotlin-compose-training-change-app-icon?hl=fr)

### Recette avec Image Asset Studio

1. Télécharge ton image (ex. [le logo de l'exercice](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/web/docs/01-cours/_13.2-multilingue)) — idéalement un PNG carré ≥ 512×512 ou un SVG.
2. Dans la vue **Project/Android**, clic droit sur **`res`** → **New** → **Image Asset**.
3. **Icon type** : `Launcher Icons (Adaptive and Legacy)`.
4. **Name** : laisse `ic_launcher` (pour remplacer l'icône existante).
5. Onglet **Foreground Layer** :
   - **Asset type** : `Image` ;
   - **Path** : choisis ton fichier ;
   - ajuste **Resize** pour que le logo reste dans le cercle de sécurité.
6. Onglet **Background Layer** : choisis une **couleur** (ou une image).
7. **Next** → **Finish** (accepte d'écraser les fichiers existants).
8. Désinstalle l'app de l'émulateur puis relance (le lanceur garde parfois l'ancienne icône en cache).

Le manifeste pointe déjà vers ces fichiers :

```xml title="app/src/main/AndroidManifest.xml"
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:label="@string/app_name"
    ... >
```

---

## 2. Afficher une image dans l'interface

1. Copie ton fichier (`logo.png`, nom en **minuscules**, sans espaces ni tirets) dans `app/src/main/res/drawable/`.
2. Affiche-le :

```kotlin
import androidx.compose.foundation.Image
import androidx.compose.ui.res.painterResource

Image(
    painter = painterResource(id = R.drawable.logo),
    contentDescription = "Logo de l'application",
    modifier = Modifier.size(120.dp)
)
```

---

## 3. Icônes Material

Les icônes de base (`Icons.Filled.Home`, `Menu`, `Add`, `Close`, `Favorite`…) sont incluses. Pour **toutes** les icônes (Lightbulb, BarChart, HowToVote…) il faut la librairie **étendue**.

### Étape 1 — Déclarer la librairie dans le catalogue

```toml title="gradle/libs.versions.toml"
[libraries]
# ... librairies existantes
androidx-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
```

Pas de `version.ref` : la version vient du **Compose BOM** déjà présent dans le projet.

### Étape 2 — Ajouter la dépendance

```kotlin title="app/build.gradle.kts"
dependencies {
    implementation(platform(libs.androidx.compose.bom))   // déjà présent normalement
    implementation(libs.androidx.material.icons.extended)
}
```

Puis **Sync Now** 🐘.

### Étape 3 — Utiliser une icône

```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton

IconButton(onClick = { /* action */ }) {
    Icon(
        imageVector = Icons.Filled.Favorite,
        contentDescription = "Statistiques"   // lu par les lecteurs d'écran (accessibilité)
    )
}
```

### Les styles d'icônes

| Style | Import | Exemple |
|---|---|---|
| Filled | `androidx.compose.material.icons.filled.*` | `Icons.Filled.Lightbulb` |
| Outlined | `androidx.compose.material.icons.outlined.*` | `Icons.Outlined.Lightbulb` |
| Rounded | `androidx.compose.material.icons.rounded.*` | `Icons.Rounded.Star` |
| AutoMirrored | `androidx.compose.material.icons.automirrored.filled.*` | `Icons.AutoMirrored.Filled.ArrowBack` (s'inverse en arabe/hébreu) |

🔎 Pour trouver le nom d'une icône : [fonts.google.com/icons](https://fonts.google.com/icons) (le nom `light_bulb` devient `Lightbulb`).

### Icône + texte dans un bouton

```kotlin
Button(onClick = { }) {
    Icon(Icons.Filled.Add, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
    Spacer(Modifier.size(ButtonDefaults.IconSpacing))
    Text("Ajouter")
}
```

### Bouton flottant (FAB)

```kotlin
Scaffold(
    floatingActionButton = {
        FloatingActionButton(onClick = { navController.navigate("ajout") }) {
            Icon(Icons.Filled.Add, contentDescription = "Ajouter un sujet")
        }
    }
) { padding -> /* contenu */ }
```
