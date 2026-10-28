# Notes 3M5 – Intro Mobile

Site Docusaurus de notes de cours détaillées pour le cours
[3M5 – Intro Mobile](https://info.cegepmontpetit.ca/3M5-Intro-Mobile/) (Kotlin, Jetpack Compose, Android).

## Prérequis

- [Node.js](https://nodejs.org/) 18 ou plus récent (LTS recommandé)

## Lancer le site

```bash
npm install
npm start          # http://localhost:3000, rechargement automatique
```

## Générer la version statique

```bash
npm run build
npm run serve      # prévisualiser le dossier build/
```

## Structure

```text
docs/
├── accueil.md              ← page d'accueil (/)
├── kotlin/                 ← Partie 1 : séances 1.1 à 6.1
├── android/                ← Partie 2 : séances 6.2 à 15.2
├── aide-memoire.md         ← tous les extraits essentiels
└── travaux-pratiques.md    ← résumé des TP1, TP2, TP3
```

Pour ajouter une note : crée un fichier `docs/android/22-mon-sujet.md` ; il apparaît automatiquement dans le menu (ordre selon le préfixe numérique).

Note : `package.json` force `webpack` 5.99.9 (`overrides`) pour éviter une incompatibilité connue de la barre de progression de Docusaurus avec les versions plus récentes de webpack.
