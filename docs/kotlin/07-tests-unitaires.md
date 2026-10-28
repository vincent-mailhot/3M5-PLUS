---
title: "4.2 – Tests unitaires et plan de test"
sidebar_label: "4.2 Tests unitaires 🧪"
description: Configurer JUnit 5 dans IntelliJ, modèle AAA, plan de test (cas normal, limite, invalide).
---

# 4.2 – Tests unitaires et plan de test 🧪

📺 [Vidéo tests](https://youtu.be/TsvblQf--nI)

Chaque fonction doit être testée sur **tous ses scénarios** : tes fonctions seront réutilisées dans des contextes que tu n'avais pas prévus.

:::warning Un test vert ne prouve pas l'absence de bug
Il confirme seulement que, **pour ce scénario précis**, le résultat est celui attendu. D'où l'importance d'un bon **plan de test**.
:::

---

## 1. Où mettre les tests ?

```text
src/
├── main/
│   └── kotlin/
│       └── Calculatrice.kt        ← code de l'application
└── test/
    └── kotlin/
        └── CalculatriceTest.kt    ← EXCLUSIVEMENT le code de test
```

---

## 2. Configuration Gradle (projet Kotlin IntelliJ)

Un projet Kotlin/Gradle créé par IntelliJ contient déjà normalement :

```kotlin title="build.gradle.kts"
dependencies {
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
```

Si les annotations `org.junit.jupiter.api.*` ne sont pas reconnues ou si Gradle se plaint du *launcher*, utilise cette configuration complète :

```kotlin title="build.gradle.kts — configuration JUnit 5 complète"
dependencies {
    testImplementation(kotlin("test"))
    testImplementation(platform("org.junit:junit-bom:5.11.4"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
}
```

Puis 🐘 *Load Gradle Changes*.

---

## 3. Recette : écrire des tests unitaires

### Étape 1 : la fonction à tester

```kotlin title="src/main/kotlin/Calculatrice.kt"
fun addition(a: Int, b: Int): Int = a + b

fun division(a: Int, b: Int): Int? {   // Int? : on autorise un retour null
    if (b == 0) {
        return null                    // division par zéro interdite
    }
    return a / b
}
```

### Étape 2 : créer la classe de test

Dans `src/test/kotlin`, crée `[NomDeLaClasse]Test.kt` → ici `CalculatriceTest.kt`.

:::tip Raccourci
Place le curseur sur le nom de la fonction ou de la classe → `Ctrl+Shift+T` → **Create New Test…** : IntelliJ crée le fichier au bon endroit.
:::

### Étape 3 : écrire les tests (modèle **AAA**)

Chaque test :
1. a un **nom descriptif** ;
2. est annoté **`@Test`** ;
3. suit **Arrange / Act / Assert** ;
4. vérifie **un seul** comportement.

```kotlin title="src/test/kotlin/CalculatriceTest.kt"
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test

class CalculatriceTest {

    @Test
    fun divisionNormaleRetourneLeQuotient() {
        // Arrange
        val a = 10
        val b = 2
        val resultatAttendu = 5

        // Act
        val resultat = division(a, b)

        // Assert
        assertEquals(resultatAttendu, resultat)
    }

    @Test
    fun divisionEntiereTronqueLeResultat() {
        val resultat = division(7, 2)
        assertEquals(3, resultat)
    }

    @Test
    fun divisionDeZeroRetourneZero() {
        assertEquals(0, division(0, 5))
    }

    @Test
    fun divisionParZeroRetourneNull() {
        assertNull(division(10, 0))
    }

    @Test
    fun additionDeDeuxPositifs() {
        assertEquals(5, addition(2, 3))
    }

    @Test
    fun additionAvecNegatif() {
        assertEquals(0, addition(-1, 1))
    }
}
```

:::note Package
Si ton code est dans un package (ex. `org.dupont`), ajoute `import org.dupont.division` ou mets le test dans le même package.
:::

### Étape 4 : exécuter

- ▶ à gauche d'**une** fonction de test → ce test seulement.
- ▶ à gauche de la **classe** → tous les tests de la classe.
- Clic droit sur `src/test/kotlin` → **Run 'All Tests'**.
- En ligne de commande : `./gradlew test` (Windows : `gradlew.bat test`).

---

## 4. Les assertions utiles (JUnit 5)

```kotlin
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.assertThrows

assertEquals(attendu, obtenu)
assertNotEquals(a, b)
assertTrue(condition)
assertFalse(condition)
assertNull(valeur)
assertNotNull(valeur)
assertEquals(0.3, 0.1 + 0.1 + 0.1, 0.0001)   // Double : avec une tolérance !

// Vérifier qu'une exception est lancée
val e = assertThrows<IllegalArgumentException> {
    calculerNote(150)
}
assertEquals("Note invalide", e.message)
```

---

## 5. Le plan de test

Impossible de tout tester : on choisit des **cas représentatifs**.

| Type de cas | Définition | Exemple (note entre 0 et 100) |
|---|---|---|
| **Normal** | Utilisation valide et habituelle | `85` |
| **Limite** | À la frontière d'une règle ou d'un changement de comportement | `0`, `100`, `89`, `90` |
| **Invalide** | Entrée qui ne respecte pas les règles | `-1`, `101` |

**Couverture minimale :**
- un cas **normal** par comportement principal ;
- des cas **limites** pour chaque frontière (valeur min, max, juste avant, juste après) ;
- un cas **invalide** par **type** d'entrée invalide.

👉 **Un test unitaire distinct par ligne du plan de test.**

### Gabarit à copier (Markdown)

```markdown title="PlanDeTest.md"
## Fonction : `division(a: Int, b: Int): Int?`

**Description :** Retourne le quotient entier de `a` par `b`, ou `null` si `b` vaut 0.

**Entrées attendues :** deux entiers (`a`, `b`)

**Sortie attendue :** un entier (division entière tronquée) ou `null`

| # | Description du cas | Entrée(s) | Résultat attendu |
|---|---|---|---|
| 1 | Division normale | a=10, b=2 | 5 |
| 2 | Division entière tronquée (cas limite) | a=7, b=2 | 3 |
| 3 | Dividende égal à zéro (cas limite) | a=0, b=5 | 0 |
| 4 | Division par zéro (cas invalide) | a=10, b=0 | null |
```

---

## Exercices (pistes de solution)

### Calcul de note — fonction + plan + tests

```kotlin title="src/main/kotlin/Note.kt"
fun calculerNote(note: Int): Char {
    require(note in 0..100) { "Note invalide" }   // lance IllegalArgumentException
    return when {
        note >= 90 -> 'A'
        note >= 80 -> 'B'
        note >= 70 -> 'C'
        note >= 60 -> 'D'
        note >= 50 -> 'E'
        else -> 'F'
    }
}
```

| # | Cas | Entrée | Attendu |
|---|---|---|---|
| 1 | Normal A | 95 | 'A' |
| 2 | Limite A | 90 | 'A' |
| 3 | Limite B (juste sous A) | 89 | 'B' |
| 4 | Limite max | 100 | 'A' |
| 5 | Limite E | 50 | 'E' |
| 6 | Limite F | 49 | 'F' |
| 7 | Limite min | 0 | 'F' |
| 8 | Invalide négatif | -1 | IllegalArgumentException |
| 9 | Invalide trop grand | 101 | IllegalArgumentException |

```kotlin title="src/test/kotlin/NoteTest.kt"
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class NoteTest {
    @Test fun noteNormaleA() = assertEquals('A', calculerNote(95))
    @Test fun limiteA() = assertEquals('A', calculerNote(90))
    @Test fun limiteSousA() = assertEquals('B', calculerNote(89))
    @Test fun limiteMax() = assertEquals('A', calculerNote(100))
    @Test fun limiteE() = assertEquals('E', calculerNote(50))
    @Test fun limiteF() = assertEquals('F', calculerNote(49))
    @Test fun limiteMin() = assertEquals('F', calculerNote(0))

    @Test
    fun negatifLanceException() {
        assertThrows<IllegalArgumentException> { calculerNote(-1) }
    }

    @Test
    fun tropGrandLanceException() {
        assertThrows<IllegalArgumentException> { calculerNote(101) }
    }
}
```

### Parité

```kotlin
fun estPair(n: Int): Boolean = n % 2 == 0
// Plan : 4 → true ; 7 → false ; 0 → true (limite) ; -3 → false (négatif) ; Int.MAX_VALUE → false
```

### Mot de passe (8 caractères min + 1 chiffre)

```kotlin
fun motDePasseValide(mdp: String): Boolean =
    mdp.length >= 8 && mdp.any { it.isDigit() }

// Version plus stricte : majuscule + caractère spécial
fun motDePasseFort(mdp: String): Boolean =
    mdp.length >= 8 &&
    mdp.any { it.isDigit() } &&
    mdp.any { it.isUpperCase() } &&
    mdp.any { !it.isLetterOrDigit() }
```

### Username + mot de passe

```kotlin
val comptes: Map<String, String> = mapOf("alice" to "secret123", "bob" to "motdepasse1")

fun connexionValide(username: String, motDePasse: String): Boolean =
    comptes[username] == motDePasse
```

### Code postal (expression régulière) — séance 12

```kotlin
fun isValidZipCode(zippy: String): Boolean {
    // lettre chiffre lettre, puis 0 à 2 espaces OU un tiret, puis chiffre lettre chiffre
    val regex = Regex("^[A-Za-z]\\d[A-Za-z]( {0,2}|-)\\d[A-Za-z]\\d$")
    return regex.matches(zippy)
}
```

```kotlin title="src/test/kotlin/Tests.kt"
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class Tests {
    @Test fun colle() = assertTrue(isValidZipCode("H1Y1E1"))
    @Test fun unEspace() = assertTrue(isValidZipCode("H1Y 1E1"))
    @Test fun minuscules() = assertTrue(isValidZipCode("h3Y 1E8"))
    @Test fun tiret() = assertTrue(isValidZipCode("H1Y-1E1"))
    @Test fun troisEspaces() = assertFalse(isValidZipCode("H1Y   1E1"))
    @Test fun soulignement() = assertFalse(isValidZipCode("H1Y_1E1"))
    @Test fun lettreAuLieuDeChiffre() = assertFalse(isValidZipCode("h3Y 1TO"))
}
```

### Courriel (expression régulière)

```kotlin
fun isValidEmail(courriel: String): Boolean {
    val regex = Regex("^[A-Za-z0-9_%+-]+(\\.[A-Za-z0-9_%+-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}$")
    return regex.matches(courriel)
}
// OK : bob@smith.org, a.b.c@pipo.com, Rodgere.Federer@tennis.info
// KO : bob@smith, a..b@popi.org, john.doe@.com, john.doe@plop.c
```
