---
title: "5.1 – 6.1 Intégration et examens intra"
sidebar_label: "5.1 Révision / Intra 📝"
description: Produire une trace d'exécution, stratégie d'examen, révision Git et formatifs.
---

# 5.1 → 6.1 – Intégration, révision et examens intra 📝

| Séance | Contenu |
|---|---|
| 5.1 | Intégration (pas de nouveau contenu) — remise du TP1 |
| 5.2 | **Examen théorique papier (5 %)** — 30 min, puis formatif pratique |
| 6.1 | **Examen pratique sur machine (15 %)** — 1 h 40 |

**Examen théorique :** une feuille de notes recto-verso permise, aucun appareil électronique. Questions de type **trace d'exécution**, **types et valeurs**, **plan de test**.

**Examen pratique :** accès au site du cours, au dépôt GitHub du cours, à tes exercices et ton TP (**clone-les localement AVANT l'examen**).

📄 Formatifs : [A26 papier](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/static/A26-intra-formatif-papier.md) · [A25 papier](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/static/A25-intra-formatif-papier.md) · [A26 machine](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/static/A26-intra-formatif-ordi.md) · [A25 machine](https://github.com/departement-info-cem/3M5-Intro-Mobile/blob/main/web/static/A25-intra-formatif-ordi.md)

---

## Produire une trace d'exécution

On veut indiquer :
1. **quelles lignes** s'exécutent et **dans quel ordre** ;
2. l'**effet** de chaque ligne (valeurs des variables, affichage, valeur retournée) ;
3. la **pile d'appels** (fonction courante **en gras** en haut).

### Exemple simple

```kotlin showLineNumbers
fun main() {
    val a = 3 + 4
    val b = a * 2
    println("salut " + b)
}
```

| ligne exécutée | effet | pile d'appels |
|---|---|---|
| `val a = 3 + 4` | a: 7 | **main** |
| `val b = a * 2` | a: 7, b: 14 | **main** |
| `println("salut " + b)` | a: 7, b: 14, affiche « salut 14 » | **main** |

### Avec une boucle

On n'écrit **que les lignes réellement exécutées** ; une ligne peut apparaître plusieurs fois.

```kotlin showLineNumbers
fun main() {
    for (i in 1..3) {
        if (i % 2 == 0) {
            println("c'est pair " + i)
        } else {
            println("ah ben ah ben, c'est impair " + i)
        }
    }
}
```

| ligne exécutée | effet | pile |
|---|---|---|
| `for (i in 1..3)` | i parcourt 1, 2, 3 — i: 1 | **main** |
| `if (i % 2 == 0)` | i: 1, i%2 vaut 1 → faux | **main** |
| `println("ah ben … impair " + i)` | affiche « ah ben ah ben, c'est impair 1 » | **main** |
| `for (i in 1..3)` | i: 2 | **main** |
| `if (i % 2 == 0)` | i: 2, i%2 vaut 0 → vrai | **main** |
| `println("c'est pair " + i)` | affiche « c'est pair 2 » | **main** |
| `for (i in 1..3)` | i: 3 | **main** |
| `if (i % 2 == 0)` | i: 3 → faux | **main** |
| `println("ah ben … impair " + i)` | affiche « ah ben ah ben, c'est impair 3 » | **main** |

### Avec une fonction

```kotlin showLineNumbers
fun ma_fonction(a: Int, b: Int): Int {
    val c = a + b
    return c
}

fun main() {
    var mavariable = 3
    var tavariable = 5
    var z = ma_fonction(mavariable, tavariable)
    var y = ma_fonction(4, 9)
    print("z vaut " + z + " et y vaut " + y)
}
```

| ligne exécutée | effet | pile |
|---|---|---|
| `var mavariable = 3` | mavariable: 3 | **main** |
| `var tavariable = 5` | mavariable: 3, tavariable: 5 | **main** |
| `var z = ma_fonction(…)` | appelle ma_fonction avec 3→a, 5→b | **main** |
| `val c = a + b` | a: 3, b: 5, c: 8 | **ma_fonction**<br/>main |
| `return c` | retourne 8 | **ma_fonction**<br/>main |
| `var z = ma_fonction(…)` | mavariable: 3, tavariable: 5, z: 8 | **main** |
| `var y = ma_fonction(4, 9)` | appelle ma_fonction avec 4→a, 9→b | **main** |
| `val c = a + b` | a: 4, b: 9, c: 13 | **ma_fonction**<br/>main |
| `return c` | retourne 13 | **ma_fonction**<br/>main |
| `var y = ma_fonction(4, 9)` | z: 8, y: 13 | **main** |
| `print(…)` | affiche « z vaut 8 et y vaut 13 » | **main** |

### Gabarit Markdown (pour ton dépôt)

````markdown title="TraceSimple.md"
```kotlin
fun main() {
    val a = 3 + 4
    val b = a * 2
    println("salut " + b)
}
```

| ligne exécutée  | effet                             | pile d'appels |
|-----------------|-----------------------------------|---------------|
| val a = 3 + 4   | a: 7                              | __main__      |
| val b = a * 2   | a: 7, b: 14                       | __main__      |
| println(...)    | affiche "salut 14"                | __main__      |
````

:::tip Retour de ligne dans une cellule
Utilise `<br/>` : `__ma_fonction__ <br/> main`.
:::

### Valider sa trace avec le débogueur

1. Point d'arrêt sur la **première ligne** exécutée.
2. Lancer en **Debug** 🐞.
3. `F8` (Step Over) / `F7` (Step Into) ligne par ligne, et comparer avec ta trace (panneau *Variables* et *Frames*).

---

## Pièges classiques « types et valeurs »

```kotlin
val x = 7 / 2            // 3        Int / Int = division ENTIÈRE
val y = 7 / 2.0          // 3.5      un Double → résultat Double
val z = 7 % 3            // 1        modulo
val s = "1" + 2 + 3      // "123"    String + ... = concaténation
val t = "" + 1 + 2       // "12"     la String à gauche « contamine » tout
// val e = 1 + "2"       // ❌ ne compile pas : Int + String n'existe pas en Kotlin
val u = .1 + .1 + .1     // 0.30000000000000004
val v = 10 / 3 * 3       // 9
val w = 'a' + 1          // 'b'      Char + Int = Char
val n: Int? = "x".toIntOrNull()  // null
val l = 5L * 2           // 10L      Long
```

---

## Stratégie pour passer un examen 🎯

**Au début :**
1. **Lis tout l'énoncé** et marque chaque question :
   - **Ok** : je suis sûr de savoir ;
   - **Bof** : peut-être en y réfléchissant ;
   - **Ko** : aucune chance.
2. Calcule ton **ratio minutes/point** (ex. 120 min / 13 pts ≈ 9 min/point → une question de 3 pts ≈ 27 min).
3. Décide de l'**ordre** : *aucune loi ne t'oblige à commencer par la question 1*.

**Pendant :**
1. Commence par les **Ok** au meilleur rapport points/temps. Si tu dépasses le temps prévu et que ça s'annonce mal → passe à la suivante.
2. Épuise les **Ok**, puis décide : finir un Ok ou tenter un **Bof**.
3. Garde les **5 dernières minutes** pour vérifier que tout compile et que tu n'as rien cassé.

---

## Révision Git (GitKraken ou ligne de commande)

📺 Vidéos Git : [1](https://youtu.be/rP3T0Ee6pLU) · [2](https://youtu.be/v10jAu1ELac) · [3](https://youtu.be/isaklh8bj44) · [4](https://youtu.be/JZ7b4o3LrDY) · [5](https://youtu.be/rdUsNAfiFYA) · [6](https://youtu.be/wJ9lpwJw6Cc) — [Règles et procédure du département](https://departement-info-cem.github.io/git)

```bash title="Commandes Git essentielles"
git clone https://github.com/USAGER/DEPOT.git   # cloner un dépôt distant
git status                                      # voir les changements
git diff                                        # détail des changements depuis le dernier commit
git add .                                       # préparer tous les fichiers
git commit -m "Ajout de la validation des arguments"   # message en français correct
git push                                        # envoyer vers GitHub
git pull                                        # récupérer les changements distants
git log --oneline                               # historique
```

:::tip Bons messages de commit
Phrase courte, au présent ou à l'infinitif, **en français correct** : « Ajout de l'écran de vote », « Correction du plantage quand la liste est vide ». Évite « update », « fix », « asdf ».
:::
