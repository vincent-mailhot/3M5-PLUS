---
title: "9.2 – Graphiques et composants classiques"
sidebar_label: "9.2 Graphique 📈"
description: MPAndroidChart via JitPack, PieChart et BarChart, AndroidView pour intégrer une View classique (WebView).
---

# 9.2 – Graphiques 📈 et composants Android classiques

Code des recettes : [ComposeGraphique](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeGraphique) · [ComposeClassique](https://github.com/departement-info-cem/3M5-Intro-Mobile/tree/main/code/ComposeClassique)

On utilise la librairie [MPAndroidChart](https://github.com/PhilJay/MPAndroidChart). C'est une **combinaison de deux recettes** :
1. la librairie n'est disponible que via **JitPack** ;
2. MPAndroidChart fournit des objets graphiques **classiques** (`View`) → il faut **`AndroidView`** pour les afficher dans Compose (ou la variante Compose du dépôt).

---

## 1. Composants classiques dans Compose : `AndroidView`

**Contexte :**
- Android (2008) : interface faite d'**objets** qui héritent de `View`.
- Jetpack Compose (2020) : interface faite de **fonctions** composables.
- Plusieurs composants (WebView, MapView, graphiques, NumberPicker…) n'existent qu'en version classique.

```kotlin title="ComposantAndroidClassique.kt"
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

@Composable
fun ComposantAndroidClassique(modifier: Modifier = Modifier) {
    val mUrl = "https://info.cegepmontpetit.ca/3M5-Intro-Mobile/"
    AndroidView(
        modifier = modifier,
        // factory : reçoit un Context (it), CRÉE et RETOURNE l'objet classique (appelé une seule fois)
        factory = { context ->
            WebView(context).apply {
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
                webViewClient = WebViewClient()
                loadUrl(mUrl)
            }
        },
        // update : appelé à chaque recomposition pour mettre à jour l'objet avec l'état actuel
        update = { webView ->
            webView.loadUrl(mUrl)
        }
    )
}
```

Une `WebView` a besoin de la permission Internet :

```xml title="app/src/main/AndroidManifest.xml"
<uses-permission android:name="android.permission.INTERNET" />
```

---

## 2. Recette graphique (version du dépôt : `MPChartCompose`)

### Étape 1 — Ajouter JitPack

```kotlin title="settings.gradle.kts"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // highlight-next-line
        maven { url = uri("https://jitpack.io") }
    }
}
```

### Étape 2 — Ajouter la dépendance

```kotlin title="app/build.gradle.kts"
dependencies {
    // ...
    implementation("com.github.PhilJay.MPAndroidChart:MPChartCompose:v4.0.1")
}
```

**Sync Now** 🐘.

### Étape 3 — Un graphique en tarte

```kotlin title="MainActivity.kt"
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import com.github.mikephil.charting.compose.PieChart
import com.github.mikephil.charting.compose.setColors
import com.github.mikephil.charting.data.PieData
import com.github.mikephil.charting.data.PieDataSet
import com.github.mikephil.charting.data.PieEntry

@Composable
fun PieChartView(modifier: Modifier = Modifier) {
    val data = remember {
        val set = PieDataSet(
            listOf(
                PieEntry(30f, "Section 1"),
                PieEntry(45f, "Section 2"),
                PieEntry(25f, "★★★★★"),
            ),
            "Données"
        ).apply {
            setColors(listOf(Color(255, 102, 102), Color(102, 178, 255), Color(102, 255, 102)))
            valueTextSize = 16f
            valueTextColor = Color.White.toArgb()
        }
        PieData(set)
    }
    val holeColor = MaterialTheme.colorScheme.surface.toArgb()

    PieChart(
        data = data,
        modifier = modifier.fillMaxSize(),   // à ajuster selon ta mise en page
        contentDescription = "Répartition des avis",
        setup = {                            // configuration initiale (une fois)
            description.isEnabled = false
            isDrawHoleEnabled = true
            holeRadius = 40f
            transparentCircleRadius = 45f
            entryLabelColor = Color.Black.toArgb()
            entryLabelTextSize = 12f
        },
        update = {                           // à chaque recomposition
            this.holeColor = holeColor
        },
    )
}
```

---

## 3. Variante classique : `MPAndroidChart` + `AndroidView` (graphique à barres)

Pratique pour le TP (distribution des votes de 0 à 5 étoiles).

```kotlin title="app/build.gradle.kts"
dependencies {
    implementation("com.github.PhilJay:MPAndroidChart:v3.1.0")
}
```

```kotlin title="GraphiqueVotes.kt"
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry

/**
 * distribution : nombre de votes pour chaque note, ex. mapOf(0 to 1, 1 to 0, 2 to 3, 3 to 5, 4 to 2, 5 to 7)
 */
@Composable
fun GraphiqueVotes(distribution: Map<Int, Int>, modifier: Modifier = Modifier) {
    AndroidView(
        modifier = modifier.fillMaxWidth().height(300.dp),
        factory = { context ->
            BarChart(context).apply {
                description.isEnabled = false
                axisRight.isEnabled = false
                axisLeft.axisMinimum = 0f
                axisLeft.granularity = 1f        // pas de 1 vote
                xAxis.granularity = 1f           // une barre par note
                legend.isEnabled = false
            }
        },
        update = { chart ->
            val entrees = (0..5).map { note ->
                BarEntry(note.toFloat(), (distribution[note] ?: 0).toFloat())
            }
            val dataSet = BarDataSet(entrees, "Votes")
            chart.data = BarData(dataSet)
            chart.invalidate()                   // redessine le graphique
        }
    )
}
```

:::tip
- Les données changent ? Mets-les dans `update`, pas dans `factory` (appelée une seule fois).
- Toujours donner une **hauteur** au graphique (`height(300.dp)` ou `weight(1f)`), sinon il peut être invisible.
:::
