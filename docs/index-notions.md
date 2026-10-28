---
title: Index des notions
sidebar_label: 🔎 Index des notions
description: Table des matières détaillée et index alphabétique des notions clés, avec un lien vers la section exacte où chaque notion est expliquée.
---

# Index des notions 🔎

Trouve une notion et clique pour aller **directement à la section** qui l'explique.

:::tip Recherche
Tu peux aussi utiliser la **barre de recherche** en haut à droite (raccourci `Ctrl+K`) : elle cherche dans le texte **et** dans le code de toutes les pages.
:::

**Aller à :** [Je veux…](#je-veux) · [Table des matières](#table-des-matières) · [Index A–Z](#index-az)

---

## Je veux…

### Kotlin (console)

| Je veux… | Section |
|---|---|
| Créer un projet Kotlin dans IntelliJ | [Intro › Créer un projet](/kotlin/intro-kotlin#2-créer-un-projet-kotlin-gradle-dans-intellij) |
| Passer des arguments à mon programme | [Intro › Configuration d'exécution](/kotlin/intro-kotlin#passer-des-arguments-configuration-dexécution) |
| Utiliser le débogueur / points d'arrêt | [Intro › Débogueur](/kotlin/intro-kotlin#5-points-darrêt-et-débogueur-) |
| Ajouter une librairie (Maven, Jsoup…) | [Librairies › Recette A](/kotlin/librairies-tierces#recette-a--ajouter-une-librairie-depuis-maven-central) |
| Ajouter une librairie depuis GitHub (JitPack) | [Librairies › Recette B](/kotlin/librairies-tierces#recette-b--librairie-hébergée-sur-github--jitpack) |
| Lire / écrire un fichier, vérifier s'il existe | [Librairie standard › Fichiers](/kotlin/librairie-standard#4-fichiers-javaiofile) |
| Lire ce que l'usager tape au clavier | [Librairie standard › readln](/kotlin/librairie-standard#3-lire-au-clavier--readln) |
| Créer ma propre exception | [Exceptions › Exception personnalisée](/kotlin/exceptions#recette--exception-personnalisée) |
| Savoir si je dois attraper ou laisser passer une exception | [Exceptions › Attraper ou transmettre](/kotlin/exceptions#5-attraper--ou-transmettre--) |
| Découper une grosse fonction | [Structurer › Refactorings](/kotlin/structurer#2-les-refactorings-dintellij-à-connaître-par-cœur) |
| Écrire des tests unitaires | [Tests › Recette](/kotlin/tests-unitaires#3-recette--écrire-des-tests-unitaires) |
| Configurer JUnit 5 dans Gradle | [Tests › Configuration Gradle](/kotlin/tests-unitaires#2-configuration-gradle-projet-kotlin-intellij) |
| Écrire un plan de test | [Tests › Plan de test](/kotlin/tests-unitaires#5-le-plan-de-test) |
| Faire une trace d'exécution | [Révision intra › Trace](/kotlin/revision-intra#produire-une-trace-dexécution) |
| Me préparer à un examen | [Révision intra › Stratégie](/kotlin/revision-intra#stratégie-pour-passer-un-examen-) |
| Faire commit / push | [Révision intra › Git](/kotlin/revision-intra#révision-git-gitkraken-ou-ligne-de-commande) |

### Android / Compose

| Je veux… | Section |
|---|---|
| Créer un projet Android Compose | [Intro Android › Créer un projet](/android/intro-android#1-créer-un-projet-android-compose) |
| Comprendre `MainActivity`, `setContent`, `Scaffold` | [Intro Android › MainActivity expliqué](/android/intro-android#le-mainactivity-de-base-expliqué) |
| Placer des éléments (Row, Column, weight) | [Intro Android › Mise en page](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) |
| Centrer / aligner des éléments | [Intro Android › Alignements](/android/intro-android#alignements) |
| Ajouter une barre de titre | [Intro Android › TopAppBar](/android/intro-android#6-barre-du-haut-topappbar) |
| Afficher un message rapide | [Intro Android › Toast](/android/intro-android#4-toast-petit-message-temporaire) |
| Écrire dans Logcat | [Intro Android › Logcat](/android/intro-android#3-logcat-et-log) |
| Comprendre pourquoi ma mise en page est brisée | [Intro Android › Layout Inspector](/android/intro-android#déboguer-une-mise-en-page--layout-inspector) |
| Naviguer entre des écrans | [Navigation › Étape 1 à 4](/android/navigation#étape-1--ajouter-la-dépendance) |
| Passer un paramètre à un écran (`detail/{id}`) | [Navigation › Paramètres](/android/navigation#étape-5--paramètres-typés-et-optionnels) |
| Revenir à l'écran précédent | [Navigation › Naviguer](/android/navigation#étape-4--naviguer-entre-les-écrans) |
| Ouvrir le téléphone / le navigateur (Intent) | [Navigation › Intent](/android/navigation#optionnel-et-téléphone-maison---intent) |
| Afficher une liste | [Listes › Liste simple](/android/listes#1-liste-simple) |
| Cliquer sur un élément de liste pour voir son détail | [Listes › Liste + détail](/android/listes#2-liste-dobjets--écran-de-détail) |
| Supprimer un élément d'une liste | [Listes › Liste modifiable](/android/listes#3-liste-modifiable-supprimer-ajouter--avec-létat) |
| Afficher une boîte de dialogue | [Listes › AlertDialog](/android/listes#4-boîte-de-dialogue-alertdialog) |
| Afficher une image depuis Internet | [Listes › Coil](/android/listes#5-image-depuis-une-url-avec-coil-optionnel) |
| Que l'écran se mette à jour quand une valeur change | [État › Recomposition](/android/etat#1-le-principe--recomposition) |
| Partager une valeur entre deux composables | [État › State hoisting](/android/etat#3-où-déclarer-létat--state-hoisting--remontée-détat) |
| Ajouter un champ de texte | [État › TextField](/android/etat#4-champ-de-texte-textfield) |
| Traduire mon application (i18n) | [Multilingue › Étape 1](/android/multilingue#étape-1--mettre-tous-les-textes-dans-resvaluesstringsxml) |
| Créer `values-fr` / `values-fr-rCA` | [Multilingue › Étape 2](/android/multilingue#étape-2--créer-le-fichier-de-traduction-française) |
| Utiliser une chaîne traduite dans le code | [Multilingue › Étape 4](/android/multilingue#étape-4--utiliser-les-chaînes-dans-le-code) |
| Utiliser une chaîne traduite dans un Toast / onClick | [Multilingue › Hors composable](/android/multilingue#en-dehors-dun-composable-toast-service-onclick) |
| Tester ma traduction | [Multilingue › Étape 6](/android/multilingue#étape-6--tester) |
| Changer le logo de l'application | [Logo › Image Asset Studio](/android/logo-icones#recette-avec-image-asset-studio) |
| Avoir plus d'icônes (Lightbulb, Star…) | [Icônes › Material Icons](/android/logo-icones#3-icônes-material) |
| Ajouter un bouton flottant (FAB) | [Icônes › FAB](/android/logo-icones#bouton-flottant-fab) |
| Afficher un graphique | [Graphique › Recette](/android/graphique#2-recette-graphique-version-du-dépôt--mpchartcompose) |
| Afficher un graphique à barres (votes) | [Graphique › BarChart](/android/graphique#3-variante-classique--mpandroidchart--androidview-graphique-à-barres) |
| Utiliser un composant Android classique (WebView…) | [Graphique › AndroidView](/android/graphique#1-composants-classiques-dans-compose--androidview) |
| Comprendre la syntaxe `Row { }` / trailing lambda | [Syntaxe Compose › Lambdas](/android/syntaxe-compose#-intermédiaire--lambdas-et-trailing-lambda) |
| Comprendre l'ordre des `Modifier` | [Syntaxe Compose › Modifier](/android/syntaxe-compose#-difficile--le-modifier) |
| Organiser mes fichiers en packages | [Service › Packages](/android/structure-service#1-organiser-les-fichiers-en-packages) |
| Créer une classe de service | [Service › Décomposer](/android/structure-service#2-recette--décomposer-en-modèle-entités-et-service-actions) |
| Afficher les erreurs du service dans l'interface | [Service › Gérer les erreurs](/android/structure-service#4-gérer-les-erreurs--le-service-lance-linterface-attrape) |
| Tester mon service avec la BD | [Tests Android › androidTest](/android/tests-android#3-test-instrumenté-dun-service-avec-bd-dossier-androidtest--tp3) |
| Vérifier des tests générés par l'IA | [Tests Android › Checklist](/android/tests-android#5-est-ce-que-lia-a-fait-une-bonne-job---checklist) |
| Ajouter un tiroir de navigation (hamburger) | [Tiroir › Étape 2](/android/tiroir#étape-2--le-tiroir--un-composable-réutilisable) |
| Ouvrir/fermer le tiroir avec le hamburger | [Tiroir › Étape 3](/android/tiroir#étape-3--modalnavigationdrawer--hamburger-dans-chaque-écran) |
| Installer Copilot | [Copilot › Installer](/android/copilot-iag#1-installer-copilot-avant-la-séance) |

---

## Table des matières

### Partie 1 — Kotlin

- **[1.1 Intro Kotlin](/kotlin/intro-kotlin)** — [Dépôt GitHub](/kotlin/intro-kotlin#1-créer-ton-dépôt-dexercices-sur-github) · [Projet IntelliJ](/kotlin/intro-kotlin#2-créer-un-projet-kotlin-gradle-dans-intellij) · [main](/kotlin/intro-kotlin#3-le-main-en-kotlin) · [Arguments](/kotlin/intro-kotlin#passer-des-arguments-configuration-dexécution) · [Fonctions](/kotlin/intro-kotlin#4-définir-une-fonction) · [Débogueur](/kotlin/intro-kotlin#5-points-darrêt-et-débogueur-) · [Gradle / Jsoup](/kotlin/intro-kotlin#6-ajouter-une-librairie-avec-gradle-ex-jsoup) · [Exercices](/kotlin/intro-kotlin#exercices-de-la-semaine-avec-pistes-de-solution)
- **[2.1 Impératif](/kotlin/imperatif)** — [val / var](/kotlin/imperatif#1-val-vs-var) · [Types](/kotlin/imperatif#2-les-types-de-base-et-linférence) · [Null safety](/kotlin/imperatif#3-null-safety-️) · [if / when](/kotlin/imperatif#4-conditions--if-et-when) · [Boucles](/kotlin/imperatif#5-boucles-et-intervalles) · [Tableaux](/kotlin/imperatif#6-tableaux-array-et-aléatoire) · [Conversions](/kotlin/imperatif#7-conversions-de-types) · [Exercices](/kotlin/imperatif#exercices-pistes-de-solution)
- **[2.2 Librairie standard](/kotlin/librairie-standard)** — [List / Set / Map](/kotlin/librairie-standard#1-les-3-collections-principales) · [Fonctions des collections](/kotlin/librairie-standard#2-fonctions-utiles-des-collections-sans-boucle-) · [readln](/kotlin/librairie-standard#3-lire-au-clavier--readln) · [Fichiers](/kotlin/librairie-standard#4-fichiers-javaiofile) · [Classes / data class](/kotlin/librairie-standard#5-classes-et-data-class) · [Récursivité](/kotlin/librairie-standard#6-récursivité--trace-de-factorielle) · [Exercices](/kotlin/librairie-standard#exercices-pistes-de-solution)
- **[3.1 Librairies tierces](/kotlin/librairies-tierces)** — [Maven Central](/kotlin/librairies-tierces#recette-a--ajouter-une-librairie-depuis-maven-central) · [JitPack](/kotlin/librairies-tierces#recette-b--librairie-hébergée-sur-github--jitpack) · [Jsoup](/kotlin/librairies-tierces#jsoup--extraire-les-liens-dune-page) · [Validation courriel](/kotlin/librairies-tierces#validationcourriel-avec-apache-commons-validator) · [Performances des listes](/kotlin/librairies-tierces#superliste--comparer-les-performances)
- **[3.2 Exceptions](/kotlin/exceptions)** — [Pile d'appels](/kotlin/exceptions#1-la-pile-dappels-call-stack) · [try / catch / finally](/kotlin/exceptions#2-try--catch--finally) · [throw et exception personnalisée](/kotlin/exceptions#3-lancer-une-exception-et-créer-la-sienne) · [Bon ou pas](/kotlin/exceptions#4-bon-️-ou-pas--) · [Attraper ou transmettre](/kotlin/exceptions#5-attraper--ou-transmettre--) · [try dans la boucle](/kotlin/exceptions#6-boucle-dans-le-try-ou-try-dans-la-boucle-) · [Exceptions courantes](/kotlin/exceptions#exceptions-courantes)
- **[4.1 Structurer son code](/kotlin/structurer)** — [Quand extraire](/kotlin/structurer#1-quand-extraire-une-fonction-) · [Refactorings](/kotlin/structurer#2-les-refactorings-dintellij-à-connaître-par-cœur) · [Valeur vs référence](/kotlin/structurer#3-passage-par-valeur-vs-par-référence) · [Jimmy et Johnny](/kotlin/structurer#exercice-jimmy-et-johnny-)
- **[4.2 Tests unitaires](/kotlin/tests-unitaires)** — [Dossiers](/kotlin/tests-unitaires#1-où-mettre-les-tests-) · [Gradle](/kotlin/tests-unitaires#2-configuration-gradle-projet-kotlin-intellij) · [Recette AAA](/kotlin/tests-unitaires#3-recette--écrire-des-tests-unitaires) · [Assertions](/kotlin/tests-unitaires#4-les-assertions-utiles-junit-5) · [Plan de test](/kotlin/tests-unitaires#5-le-plan-de-test) · [Regex code postal](/kotlin/tests-unitaires#code-postal-expression-régulière--séance-12) · [Regex courriel](/kotlin/tests-unitaires#courriel-expression-régulière)
- **[5.1 Révision / Intra](/kotlin/revision-intra)** — [Trace d'exécution](/kotlin/revision-intra#produire-une-trace-dexécution) · [Pièges de types](/kotlin/revision-intra#pièges-classiques--types-et-valeurs-) · [Stratégie d'examen](/kotlin/revision-intra#stratégie-pour-passer-un-examen-) · [Git](/kotlin/revision-intra#révision-git-gitkraken-ou-ligne-de-commande)

### Partie 2 — Android / Compose

- **[6.2 Intro Android](/android/intro-android)** — [Créer un projet](/android/intro-android#1-créer-un-projet-android-compose) · [Structure](/android/intro-android#structure-dun-projet) · [Émulateur](/android/intro-android#2-exécuter--émulateur-ou-appareil) · [Logcat](/android/intro-android#3-logcat-et-log) · [Toast](/android/intro-android#4-toast-petit-message-temporaire) · [Mise en page](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) · [Preview](/android/intro-android#prévisualiser-sans-lancer-lémulateur) · [TopAppBar](/android/intro-android#6-barre-du-haut-topappbar) · [Tape le lapin](/android/intro-android#tape-le-lapin--version-condensée-du-code-annoté)
- **[7.1 Navigation](/android/navigation)** — [Dépendance](/android/navigation#étape-1--ajouter-la-dépendance) · [Routes](/android/navigation#étape-2--définir-les-routes-dans-un-composable-navigation) · [setContent](/android/navigation#étape-3--appeler-navigation-dans-setcontent) · [navigate / popBackStack](/android/navigation#étape-4--naviguer-entre-les-écrans) · [Paramètres](/android/navigation#étape-5--paramètres-typés-et-optionnels) · [Exercice transfert](/android/navigation#exercice-navigation-transfert-piste-de-solution) · [Intent](/android/navigation#optionnel-et-téléphone-maison---intent)
- **[7.2 Listes](/android/listes)** — [LazyColumn](/android/listes#1-liste-simple) · [Liste + détail](/android/listes#2-liste-dobjets--écran-de-détail) · [Supprimer](/android/listes#3-liste-modifiable-supprimer-ajouter--avec-létat) · [AlertDialog](/android/listes#4-boîte-de-dialogue-alertdialog) · [Coil](/android/listes#5-image-depuis-une-url-avec-coil-optionnel) · [Exercices](/android/listes#exercices-pistes-de-solution)
- **[8.2 État](/android/etat)** — [Recomposition](/android/etat#1-le-principe--recomposition) · [Types d'état](/android/etat#2-les-types-détat) · [State hoisting](/android/etat#3-où-déclarer-létat--state-hoisting--remontée-détat) · [TextField](/android/etat#4-champ-de-texte-textfield) · [Lampes](/android/etat#lampes--allumer-jusquà-la-lampe-cliquée)
- **[8.2 Multilingue](/android/multilingue)** — [Principe](/android/multilingue#le-principe--un-niveau-dindirection) · [strings.xml](/android/multilingue#étape-1--mettre-tous-les-textes-dans-resvaluesstringsxml) · [values-fr](/android/multilingue#étape-2--créer-le-fichier-de-traduction-française) · [Traduire](/android/multilingue#étape-3--traduire) · [stringResource](/android/multilingue#étape-4--utiliser-les-chaînes-dans-le-code) · [Formats](/android/multilingue#formats-disponibles) · [Tester](/android/multilingue#étape-6--tester) · [Checklist](/android/multilingue#checklist-i18n-)
- **[8.2 Logo et icônes](/android/logo-icones)** — [Logo](/android/logo-icones#1-changer-le-logo-icône-de-lancement) · [Image](/android/logo-icones#2-afficher-une-image-dans-linterface) · [Icônes étendues](/android/logo-icones#3-icônes-material) · [Styles](/android/logo-icones#les-styles-dicônes) · [FAB](/android/logo-icones#bouton-flottant-fab)
- **[9.2 Graphique](/android/graphique)** — [AndroidView](/android/graphique#1-composants-classiques-dans-compose--androidview) · [Graphique en tarte](/android/graphique#2-recette-graphique-version-du-dépôt--mpchartcompose) · [Graphique à barres](/android/graphique#3-variante-classique--mpandroidchart--androidview-graphique-à-barres)
- **[10.2 Syntaxe Compose](/android/syntaxe-compose)** — [Majuscules](/android/syntaxe-compose#-facile--des-fonctions-en-majuscule) · [Lambdas](/android/syntaxe-compose#-intermédiaire--lambdas-et-trailing-lambda) · [Modifier](/android/syntaxe-compose#-difficile--le-modifier) · [remember](/android/syntaxe-compose#-god-mode--remember)
- **[11.1 Service et packages](/android/structure-service)** — [Packages](/android/structure-service#1-organiser-les-fichiers-en-packages) · [Modèle / service](/android/structure-service#2-recette--décomposer-en-modèle-entités-et-service-actions) · [Approche service](/android/structure-service#3-lapproche-service) · [Erreurs](/android/structure-service#4-gérer-les-erreurs--le-service-lance-linterface-attrape)
- **[11.2 Tests Android](/android/tests-android)** — [test vs androidTest](/android/tests-android#1-les-deux-dossiers-de-tests-dun-projet-android) · [Test local](/android/tests-android#2-test-unitaire-local-dossier-test) · [Test du service](/android/tests-android#3-test-instrumenté-dun-service-avec-bd-dossier-androidtest--tp3) · [IA](/android/tests-android#4-générer-des-tests-avec-lia-copilot--chatgpt) · [Checklist](/android/tests-android#5-est-ce-que-lia-a-fait-une-bonne-job---checklist)
- **[12.2 Tiroir](/android/tiroir)** — [Navigation](/android/tiroir#étape-1--la-navigation-dabord) · [Tiroir](/android/tiroir#étape-2--le-tiroir--un-composable-réutilisable) · [Hamburger](/android/tiroir#étape-3--modalnavigationdrawer--hamburger-dans-chaque-écran) · [Exercices](/android/tiroir#exercices-pistes-de-solution)
- **[13.2 Copilot](/android/copilot-iag)** — [Installer](/android/copilot-iag#1-installer-copilot-avant-la-séance) · [Modes](/android/copilot-iag#2-les-modes-dutilisation) · [Comparer les modèles](/android/copilot-iag#3-exercice-modelesmd--comparer-les-modèles) · [Bonnes pratiques](/android/copilot-iag#4-bonnes-pratiques--piloter-pas-être-passager-️)
- **[15.1 Révision finale](/android/revision-finale)** — [Plan de révision](/android/revision-finale#plan-de-révision) · [Questions types](/android/revision-finale#questions-types-de-la-partie-papier-compose)

### Ressources

- **[Aide-mémoire](/aide-memoire)** — [Kotlin](/aide-memoire#kotlin) · [Gradle Android](/aide-memoire#gradle-android) · [Compose](/aide-memoire#compose) · [Multilingue](/aide-memoire#multilingue) · [Raccourcis](/aide-memoire#raccourcis-ide-windows)
- **[Travaux pratiques](/travaux-pratiques)** — TP1 KotCrawler · TP2 Interface Android · TP3 Appli complète

---

## Index A–Z

| Notion | Où c'est expliqué |
|---|---|
| **AAA** (Arrange / Act / Assert) | [Tests unitaires](/kotlin/tests-unitaires#étape-3--écrire-les-tests-modèle-aaa) |
| **`AlertDialog`** | [Listes](/android/listes#4-boîte-de-dialogue-alertdialog) |
| **Alignement** (`Arrangement`, `Alignment`) | [Intro Android](/android/intro-android#alignements) |
| **`androidTest`** (tests instrumentés) | [Tests Android](/android/tests-android#1-les-deux-dossiers-de-tests-dun-projet-android) |
| **`AndroidView`** | [Graphique](/android/graphique#1-composants-classiques-dans-compose--androidview) |
| **Apostrophe dans `strings.xml`** (`\'`) | [Multilingue](/android/multilingue#étape-3--traduire) |
| **Arguments de ligne de commande** (`args`) | [Intro Kotlin](/kotlin/intro-kotlin#passer-des-arguments-configuration-dexécution) |
| **`Array`** (tableau) | [Impératif](/kotlin/imperatif#6-tableaux-array-et-aléatoire) |
| **`assertEquals`, `assertThrows`…** | [Tests unitaires](/kotlin/tests-unitaires#4-les-assertions-utiles-junit-5) |
| **`BarChart`** (graphique à barres) | [Graphique](/android/graphique#3-variante-classique--mpandroidchart--androidview-graphique-à-barres) |
| **Boucles** (`for`, `while`, `until`, `downTo`, `step`) | [Impératif](/kotlin/imperatif#5-boucles-et-intervalles) |
| **`build.gradle.kts`** | [Librairies tierces](/kotlin/librairies-tierces#étape-2--coller-dans-buildgradlekts) |
| **`catch`** (ordre, catch vide) | [Exceptions](/kotlin/exceptions#4-bon-️-ou-pas--) |
| **Classe de service** | [Service](/android/structure-service#2-recette--décomposer-en-modèle-entités-et-service-actions) |
| **Coil** (image depuis une URL) | [Listes](/android/listes#5-image-depuis-une-url-avec-coil-optionnel) |
| **Collections** (`List`, `Set`, `Map`) | [Librairie standard](/kotlin/librairie-standard#1-les-3-collections-principales) |
| **`Column`** | [Intro Android](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) |
| **`@Composable`** | [Intro Android](/android/intro-android#le-mainactivity-de-base-expliqué) · [Syntaxe](/android/syntaxe-compose#-facile--des-fonctions-en-majuscule) |
| **`Context` / `LocalContext`** | [Intro Android › Toast](/android/intro-android#4-toast-petit-message-temporaire) |
| **Conversions de types** (`toInt`, `toIntOrNull`…) | [Impératif](/kotlin/imperatif#7-conversions-de-types) |
| **Copilot** | [Copilot](/android/copilot-iag) |
| **Coroutine** (`rememberCoroutineScope`, `launch`) | [Tiroir](/android/tiroir#étape-3--modalnavigationdrawer--hamburger-dans-chaque-écran) |
| **Courriel** (validation) | [Librairies tierces](/kotlin/librairies-tierces#validationcourriel-avec-apache-commons-validator) · [Regex](/kotlin/tests-unitaires#courriel-expression-régulière) |
| **`data class`** | [Librairie standard](/kotlin/librairie-standard#5-classes-et-data-class) |
| **DAO / BD** (TP3) | [Tests Android](/android/tests-android#3-test-instrumenté-dun-service-avec-bd-dossier-androidtest--tp3) · [TP3](/travaux-pratiques#tp3--appli-android-complète-️) |
| **Débogueur** (points d'arrêt, F7, F8) | [Intro Kotlin](/kotlin/intro-kotlin#5-points-darrêt-et-débogueur-) |
| **`dp` / `sp`** | [Intro Android](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) |
| **`drawerState`** | [Tiroir](/android/tiroir#étape-3--modalnavigationdrawer--hamburger-dans-chaque-écran) |
| **Elvis** (`?:`) | [Impératif](/kotlin/imperatif#3-null-safety-️) |
| **Émulateur** | [Intro Android](/android/intro-android#2-exécuter--émulateur-ou-appareil) |
| **Exception personnalisée** | [Exceptions](/kotlin/exceptions#recette--exception-personnalisée) |
| **Exceptions courantes** | [Exceptions](/kotlin/exceptions#exceptions-courantes) |
| **Extract Function** (`Ctrl+Alt+M`) | [Structurer](/kotlin/structurer#2-les-refactorings-dintellij-à-connaître-par-cœur) |
| **FAB** (`FloatingActionButton`) | [Logo et icônes](/android/logo-icones#bouton-flottant-fab) |
| **Fichiers** (`File`, `readLines`, `canRead`…) | [Librairie standard](/kotlin/librairie-standard#4-fichiers-javaiofile) |
| **`filter`, `map`, `count`, `sorted`…** | [Librairie standard](/kotlin/librairie-standard#2-fonctions-utiles-des-collections-sans-boucle-) |
| **`finally`** | [Exceptions](/kotlin/exceptions#2-try--catch--finally) |
| **Fonction** (`fun`) | [Intro Kotlin](/kotlin/intro-kotlin#4-définir-une-fonction) |
| **Formats** (`%1$s`, `%1$d`) | [Multilingue](/android/multilingue#formats-disponibles) |
| **Git** (commit, push, pull) | [Révision intra](/kotlin/revision-intra#révision-git-gitkraken-ou-ligne-de-commande) · [Intro](/kotlin/intro-kotlin#1-créer-ton-dépôt-dexercices-sur-github) |
| **`.gitignore`** | [Intro Kotlin](/kotlin/intro-kotlin#1-créer-ton-dépôt-dexercices-sur-github) |
| **Gradle** (ajouter une dépendance) | [Librairies tierces](/kotlin/librairies-tierces#recette-a--ajouter-une-librairie-depuis-maven-central) |
| **Graphique** (MPAndroidChart) | [Graphique](/android/graphique#2-recette-graphique-version-du-dépôt--mpchartcompose) |
| **Hamburger** (menu ☰) | [Tiroir](/android/tiroir#étape-3--modalnavigationdrawer--hamburger-dans-chaque-écran) |
| **i18n** (internationalisation) | [Multilingue](/android/multilingue) |
| **Icônes** (`Icons.Filled…`, étendues) | [Logo et icônes](/android/logo-icones#3-icônes-material) |
| **`if` / `when`** | [Impératif](/kotlin/imperatif#4-conditions--if-et-when) |
| **Image** (`painterResource`) | [Logo et icônes](/android/logo-icones#2-afficher-une-image-dans-linterface) |
| **Image Asset Studio** | [Logo et icônes](/android/logo-icones#recette-avec-image-asset-studio) |
| **IntelliJ** (nouveau projet) | [Intro Kotlin](/kotlin/intro-kotlin#2-créer-un-projet-kotlin-gradle-dans-intellij) |
| **Intent** (`ACTION_DIAL`, `ACTION_VIEW`) | [Navigation](/android/navigation#optionnel-et-téléphone-maison---intent) |
| **`it`** (paramètre implicite) | [Librairie standard](/kotlin/librairie-standard#2-fonctions-utiles-des-collections-sans-boucle-) |
| **`item` / `items` / `itemsIndexed`** | [Listes](/android/listes#1-liste-simple) |
| **JitPack** | [Librairies tierces](/kotlin/librairies-tierces#recette-b--librairie-hébergée-sur-github--jitpack) |
| **Jsoup** | [Librairies tierces](/kotlin/librairies-tierces#jsoup--extraire-les-liens-dune-page) · [Intro](/kotlin/intro-kotlin#6-ajouter-une-librairie-avec-gradle-ex-jsoup) |
| **JUnit 4** (Android) | [Tests Android](/android/tests-android#2-test-unitaire-local-dossier-test) |
| **JUnit 5** (IntelliJ) | [Tests unitaires](/kotlin/tests-unitaires#2-configuration-gradle-projet-kotlin-intellij) |
| **`key`** (dans `items`) | [Listes](/android/listes#3-liste-modifiable-supprimer-ajouter--avec-létat) |
| **Lambda / trailing lambda** | [Syntaxe Compose](/android/syntaxe-compose#-intermédiaire--lambdas-et-trailing-lambda) |
| **Layout Inspector** | [Intro Android](/android/intro-android#déboguer-une-mise-en-page--layout-inspector) |
| **`LazyColumn`** | [Listes](/android/listes#1-liste-simple) |
| **`libs.versions.toml`** | [Navigation](/android/navigation#étape-1--ajouter-la-dépendance) · [Icônes](/android/logo-icones#étape-1--déclarer-la-librairie-dans-le-catalogue) |
| **Locale** (`values-fr`, `values-fr-rCA`) | [Multilingue](/android/multilingue#étape-2--créer-le-fichier-de-traduction-française) |
| **Log / Logcat** | [Intro Android](/android/intro-android#3-logcat-et-log) |
| **Logo** de l'application | [Logo et icônes](/android/logo-icones#1-changer-le-logo-icône-de-lancement) |
| **`main`** | [Intro Kotlin](/kotlin/intro-kotlin#3-le-main-en-kotlin) |
| **`MainActivity` / `onCreate` / `setContent`** | [Intro Android](/android/intro-android#le-mainactivity-de-base-expliqué) |
| **Maven Central / mvnrepository** | [Librairies tierces](/kotlin/librairies-tierces#recette-a--ajouter-une-librairie-depuis-maven-central) |
| **Mise en page** | [Intro Android](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) |
| **`ModalNavigationDrawer`** | [Tiroir](/android/tiroir#étape-3--modalnavigationdrawer--hamburger-dans-chaque-écran) |
| **Modèle de données** (entités) | [Service](/android/structure-service#2-recette--décomposer-en-modèle-entités-et-service-actions) |
| **`Modifier`** (ordre, chaînage) | [Syntaxe Compose](/android/syntaxe-compose#-difficile--le-modifier) |
| **`mutableStateListOf`** | [État](/android/etat#2-les-types-détat) |
| **`mutableStateOf` / `mutableIntStateOf`** | [État](/android/etat#2-les-types-détat) |
| **`NavController` / `navigate` / `popBackStack`** | [Navigation](/android/navigation#étape-4--naviguer-entre-les-écrans) |
| **`NavHost` / routes** | [Navigation](/android/navigation#étape-2--définir-les-routes-dans-un-composable-navigation) |
| **`navArgument`** (paramètres typés) | [Navigation](/android/navigation#étape-5--paramètres-typés-et-optionnels) |
| **`NavigationDrawerItem`** | [Tiroir](/android/tiroir#étape-2--le-tiroir--un-composable-réutilisable) |
| **Null safety** (`?`, `?.`, `!!`) | [Impératif](/kotlin/imperatif#3-null-safety-️) |
| **`NumberPicker`** | [Navigation](/android/navigation#exercice-navigation-transfert-piste-de-solution) |
| **Packages** (organisation) | [Service](/android/structure-service#1-organiser-les-fichiers-en-packages) |
| **Passage par valeur / référence** | [Structurer](/kotlin/structurer#3-passage-par-valeur-vs-par-référence) |
| **Permission Internet** | [Listes](/android/listes#étape-2--permission-internet) |
| **Pile d'appels** (stack trace) | [Exceptions](/kotlin/exceptions#1-la-pile-dappels-call-stack) |
| **Plan de test** (normal, limite, invalide) | [Tests unitaires](/kotlin/tests-unitaires#5-le-plan-de-test) |
| **Pluriels** (`pluralStringResource`) | [Multilingue](/android/multilingue#dans-une-fonction-composable) |
| **`@Preview`** | [Intro Android](/android/intro-android#prévisualiser-sans-lancer-lémulateur) · [Multilingue](/android/multilingue#étape-6--tester) |
| **`Random`** | [Impératif](/kotlin/imperatif#6-tableaux-array-et-aléatoire) |
| **`readln`** | [Librairie standard](/kotlin/librairie-standard#3-lire-au-clavier--readln) |
| **Recomposition** | [État](/android/etat#1-le-principe--recomposition) |
| **Récursivité** | [Librairie standard](/kotlin/librairie-standard#6-récursivité--trace-de-factorielle) |
| **Refactoring** (Rename, Extract…) | [Structurer](/kotlin/structurer#2-les-refactorings-dintellij-à-connaître-par-cœur) |
| **Regex** (expressions régulières) | [Tests unitaires](/kotlin/tests-unitaires#code-postal-expression-régulière--séance-12) |
| **`remember` / `rememberSaveable`** | [État](/android/etat#1-le-principe--recomposition) · [Syntaxe](/android/syntaxe-compose#-god-mode--remember) |
| **`Row`** | [Intro Android](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) |
| **`Scaffold` / `innerPadding`** | [Intro Android](/android/intro-android#le-mainactivity-de-base-expliqué) |
| **Service** (approche, erreurs) | [Service](/android/structure-service#3-lapproche-service) |
| **`settings.gradle.kts`** | [Librairies tierces](/kotlin/librairies-tierces#étape-1--ajouter-le-dépôt-jitpack-dans-settingsgradlekts) |
| **`Spacer`** | [Intro Android](/android/intro-android#exemple--mise-en-page-simple-) |
| **State hoisting** (remontée d'état) | [État](/android/etat#3-où-déclarer-létat--state-hoisting--remontée-détat) |
| **Stratégie d'examen** | [Révision intra](/kotlin/revision-intra#stratégie-pour-passer-un-examen-) |
| **`stringResource` / `getString`** | [Multilingue](/android/multilingue#étape-4--utiliser-les-chaînes-dans-le-code) |
| **`strings.xml`** | [Multilingue](/android/multilingue#étape-1--mettre-tous-les-textes-dans-resvaluesstringsxml) |
| **Tests générés par l'IA** | [Tests Android](/android/tests-android#4-générer-des-tests-avec-lia-copilot--chatgpt) |
| **Tests unitaires** | [Tests unitaires](/kotlin/tests-unitaires#3-recette--écrire-des-tests-unitaires) |
| **`TextField`** | [État](/android/etat#4-champ-de-texte-textfield) |
| **`throw`** | [Exceptions](/kotlin/exceptions#3-lancer-une-exception-et-créer-la-sienne) |
| **Tiroir de navigation** | [Tiroir](/android/tiroir) |
| **Toast** | [Intro Android](/android/intro-android#4-toast-petit-message-temporaire) |
| **`TopAppBar`** | [Intro Android](/android/intro-android#6-barre-du-haut-topappbar) |
| **Trace d'exécution** | [Révision intra](/kotlin/revision-intra#produire-une-trace-dexécution) |
| **Translations Editor** | [Multilingue](/android/multilingue#étape-2--créer-le-fichier-de-traduction-française) |
| **`try` / `catch`** | [Exceptions](/kotlin/exceptions#2-try--catch--finally) |
| **Types** (`Int`, `Long`, `Double`, `String`…) | [Impératif](/kotlin/imperatif#2-les-types-de-base-et-linférence) |
| **Types et valeurs** (pièges) | [Révision intra](/kotlin/revision-intra#pièges-classiques--types-et-valeurs-) |
| **`val` / `var`** | [Impératif](/kotlin/imperatif#1-val-vs-var) |
| **`weight`** | [Intro Android](/android/intro-android#5-recette--faire-une-mise-en-page-avec-row-et-column) |
| **WebView** | [Graphique](/android/graphique#1-composants-classiques-dans-compose--androidview) |
