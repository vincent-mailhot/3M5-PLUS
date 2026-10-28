---
title: "14.1 – 15.2 Intégration et examen final"
sidebar_label: "15.1 Révision finale 🎓"
description: Formatifs, déroulement de l'examen final et plan de révision.
---

# 14.1 → 15.2 – Intégration, formatif et examen final 🎓

| Séance | Contenu |
|---|---|
| 14.1 – 14.2 | Intégration (pas de nouveau contenu) — remise / correction du TP3 |
| 15.1 | Formatif final |
| 15.2 | **Examen théorique papier (15 %)** + **examen pratique (20 %)** |

**Examen final :** 1 h 40. Partie **papier** (feuille recto-verso permise) et partie **ordinateur** (toute ta documentation papier, tes exercices et ton TP permis). Si tu as droit à du temps supplémentaire, **avise ton professeur**.

📄 Formatifs : [A24 partie papier](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/docs/A24-final-papier-compose.md) · [A24 formatif papier](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/docs/A24-final-papier-formatif-compose.md) · [A24 partie numérique (PDF)](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/static/A24-FINAL_pour_impression.pdf)

Stratégie d'examen : voir [Révision intra](/kotlin/revision-intra#stratégie-pour-passer-un-examen-).

---

## Plan de révision

1. Refais **sans regarder ta solution** les exercices clés :
   - [ ] Tape le lapin (état + grille Row/Column + Toast)
   - [ ] Navigation avec paramètre (`detail/{id}`)
   - [ ] Liste d'objets avec suppression (`mutableStateListOf`)
   - [ ] Compteur avec state hoisting (lambda en paramètre)
   - [ ] Multilingue (en / fr / fr-CA)
   - [ ] Tiroir de navigation
   - [ ] Service + exceptions + tests
2. Prépare des **projets de départ** dans ton dépôt (navigation + icônes étendues déjà configurées) — **clonés localement** avant l'examen.
3. Fais ta **feuille de notes** à partir de l'[aide-mémoire](/aide-memoire).
4. Révise les **traces d'exécution** et les **pièges de types** pour la partie papier.

## Questions types de la partie papier (Compose)

- Combien de fois cette fonction est-elle **recomposée** quand on clique sur le bouton ?
- Pourquoi l'écran **ne se met pas à jour** ? (→ variable normale au lieu d'un état, `mutableListOf` au lieu de `mutableStateListOf`, `remember` manquant)
- Dessine la mise en page produite par ce code (`Row`, `Column`, `weight`).
- Où faut-il déclarer l'état pour que deux composables le partagent ?
- Quel fichier `strings.xml` sera utilisé sur un téléphone en `fr-CA` ? en `de` ?
- Ce `try/catch` est-il correct ? Faut-il attraper ou transmettre l'exception ?
