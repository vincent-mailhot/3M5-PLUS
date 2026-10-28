---
title: "13.2 – Copilot et IA générative"
sidebar_label: "13.2 Copilot et moi 🤖"
description: Installer GitHub Copilot, mode agent, choix du modèle, utiliser l'IA sans perdre ses compétences.
---

# 13.2 – Le pilote et le co-pilote 🧑‍✈️🤖

L'intelligence artificielle générative (IAG) transforme le travail de développeur. Objectifs :
- voir **ce que l'IAG peut faire** aujourd'hui ;
- l'utiliser **sans devenir moins compétent** ;
- déterminer **quelles tâches** lui confier.

---

## 1. Installer Copilot (avant la séance)

1. Active le **GitHub Student Developer Pack** : [education.github.com/pack](https://education.github.com/pack).
2. Active **Copilot Pro** (gratuit pour les étudiants) : [github.com/github-copilot/free_signup](https://github.com/github-copilot/free_signup).
3. Dans **IntelliJ** et **Android Studio** : *Settings* → **Plugins** → *Marketplace* → cherche **GitHub Copilot** → **Install** → redémarre l'IDE.
4. Connecte-toi : icône Copilot en bas à droite → **Login to GitHub** → colle le code dans le navigateur.

---

## 2. Les modes d'utilisation

| Mode | Comment | Pour quoi |
|---|---|---|
| **Complétion** | Tape du code ou un commentaire → suggestion grise → `Tab` pour accepter, `Échap` pour refuser | Petites portions, code répétitif |
| **Chat** | Panneau *Copilot Chat* : poser une question sur le code sélectionné | Expliquer, corriger une erreur, générer des tests |
| **Agent** | Panneau Chat → mode **Agent** : il modifie plusieurs fichiers, lance des commandes | Fonctionnalités complètes (à surveiller de près !) |

Dans le chat, on peut **choisir le modèle** (Claude, Gemini, GPT…) dans la liste déroulante.

---

## 3. Exercice `Modeles.md` — comparer les modèles

Pour chaque modèle, crée un projet Android Studio (*Empty Activity*) : **AppliGPT**, **AppliClaude**, **AppliGemini**. Puis en mode Agent :

```text title="Prompt 1 — précis"
crée une interface Compose (Jetpack) avec une top bar contenant le titre **Accueil**,
un menu déclenché par le hamburger qui contient une zone en haut indiquant
l'utilisateur connecté puis les options Accueil avec une icône de maison et
Profil avec une icône de profil. Dans la top bar, je veux aussi une action avec
l'icône de partage qui pour l'instant déclenche juste un println qui dit "coucou"
dans logcat. Je veux aussi un Floating Action Button.
```

```text title="Prompt 2 — vague"
Crée un écran de profil et traduis l'interface au complet
```

```text title="Prompt 3 — très large"
Gère la navigation entre les écrans existants, ajoute une liste de tâches à faire dans
l'écran d'accueil avec tout ce qu'il faut pour créer/modifier une tâche stockée en base de données,
ajoute des comptes avec inscription, connexion et déconnexion, et un écran de chargement
avec un logo généré qui montre que l'application gère des TODO lists.
```

Après chaque prompt : **lance l'application** et note dans un commentaire si ça fonctionne.

Gabarit de réponse :

```markdown title="Modeles.md"
# Comparaison des modèles

| Critère | GPT | Claude | Gemini |
|---|---|---|---|
| Prompt 1 fonctionne ? | | | |
| Prompt 2 fonctionne ? | | | |
| Prompt 3 fonctionne ? | | | |
| % du code que je comprends | | | |

## Avez-vous un favori ? Pourquoi ?

## Avez-vous le contrôle précis sur le code produit ?

## Quel pourcentage du code comprenez-vous ? (10, 20, 50, 80, 100 ?)

## Quel modèle vous a semblé le plus performant ?
```

---

## 4. Bonnes pratiques : piloter, pas être passager ✈️

- **Comprends chaque ligne** que tu acceptes. Si tu ne peux pas l'expliquer à l'examen (sans IA !), ne la garde pas.
- Donne du **contexte** : nom des classes, contraintes du TP, version de Compose, « utilise des routes String avec NavHost ».
- Demande des **petites étapes** plutôt qu'une application complète.
- **Compile et teste** après chaque génération. Commit souvent → retour facile en arrière.
- Vérifie les **tests générés** (voir [Tests Android](/android/tests-android#5-est-ce-que-lia-a-fait-une-bonne-job---checklist)).
- Utilise-la pour **apprendre** : « Explique-moi pourquoi on utilise `remember` ici ».

**Discussion :** Copilot va-t-il remplacer les développeurs ? Les juniors ? Développer, est-ce *produire* le code, le *comprendre*, ou *garantir* au client qu'il fonctionne ?

---

## Exercice `QueDesPrompts.md`

Reproduis une interface donnée **uniquement avec des prompts** en mode Agent, et copie l'historique de tes prompts dans `QueDesPrompts.md` à la racine du dépôt.
