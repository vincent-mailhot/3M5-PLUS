---
title: "11.2 – 12.1 Tests Android et IA"
sidebar_label: "11.2 Tests Android 🧪"
description: Tests unitaires (test) vs instrumentés (androidTest), tester un service, valider des tests générés par l'IA.
---

# 11.2 / 12.1 – Tests automatisés en Android 🧪

📺 Vidéos : [1](https://youtu.be/TsvblQf--nI) · [2](https://youtu.be/odT2vpyqVN8) · [3](https://youtu.be/IOpGBezfUww)

Rappel des bases (AAA, plan de test, cas limites) : [Tests unitaires](/kotlin/tests-unitaires).

---

## 1. Les deux dossiers de tests d'un projet Android

| Dossier | Type | S'exécute sur | Utilisé pour |
|---|---|---|---|
| `app/src/test/` | Tests **unitaires** locaux (JUnit 4) | ton ordinateur (JVM) — rapide | logique pure : validation, calculs, regex |
| `app/src/androidTest/` | Tests **instrumentés** | émulateur / appareil | tout ce qui a besoin d'Android : `Context`, BD Room, interface |

Les dépendances sont déjà là dans un projet Android Studio :

```kotlin title="app/build.gradle.kts"
dependencies {
    testImplementation(libs.junit)                         // JUnit 4 pour src/test
    androidTestImplementation(libs.androidx.junit)         // AndroidJUnit4 pour src/androidTest
    androidTestImplementation(libs.androidx.espresso.core)
}
```

:::warning JUnit 4 en Android
En Android, on utilise **JUnit 4** : `import org.junit.Test`, `import org.junit.Assert.assertEquals`, `@Before`, `@Test(expected = ...)`. (JUnit 5 = `org.junit.jupiter`, utilisé dans les projets IntelliJ.)
:::

---

## 2. Test unitaire local (dossier `test`)

```kotlin title="app/src/test/java/ca/cem/sondage/ValidationTest.kt"
package ca.cem.sondage

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ValidationTest {

    @Test
    fun nomVotantValide() {
        assertTrue(nomVotantValide("Alice"))
    }

    @Test
    fun nomVotantTropCourt() {
        assertFalse(nomVotantValide("Al"))
    }

    @Test
    fun nomVotantQueDesEspaces() {
        assertFalse(nomVotantValide("      "))
    }

    @Test
    fun moyenneCalculee() {
        assertEquals(3.5, moyenne(listOf(3, 4)), 0.0001)
    }
}
```

```kotlin title="app/src/main/java/ca/cem/sondage/Validation.kt"
fun nomVotantValide(nom: String): Boolean = nom.trim().length >= 4
fun moyenne(notes: List<Int>): Double = if (notes.isEmpty()) 0.0 else notes.average()
```

Lancer : ▶ dans la marge, ou clic droit sur le dossier `test` → **Run Tests**.

---

## 3. Test instrumenté d'un service avec BD (dossier `androidTest`) — TP3

Le service reçoit la **BD en paramètre** (injection) : l'application lui donne la vraie BD, les tests une **BD de test**.

```kotlin title="Utilisation dans l'application"
val service: DupontService = DupontService(UtilitaireBD.get(LocalContext.current))
service.ajouterSujet("Sujet 3")
```

```kotlin title="app/src/androidTest/java/.../TestsService.kt"
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class TestsService {

    private lateinit var service: DupontService

    @Before                                      // exécuté AVANT CHAQUE test → BD propre
    fun setup() {
        val appContext = InstrumentationRegistry.getInstrumentation().targetContext
        val db = UtilitaireBD.getForTests(appContext)   // BD en mémoire, ne touche pas aux vraies données
        service = DupontService(db)
    }

    @Test
    fun testAjoutOk() {
        service.ajouterSujet("Ceci est un sujet de test")
        val sujets = service.listeSujets()
        assertTrue(sujets.any { it.contenu == "Ceci est un sujet de test" })
    }

    @Test(expected = TexteVideException::class)
    fun testAjoutSujetVide() {
        service.ajouterSujet("")
    }

    @Test(expected = TexteCourtException::class)
    fun testAjoutSujetTropCourt() {
        service.ajouterSujet("Test")
    }

    @Test(expected = DejaPresentException::class)
    fun testAjoutSujetExistant() {
        service.ajouterSujet("Ceci est un sujet de test")
        service.ajouterSujet("Ceci est un sujet de test")
    }
}
```

Un **émulateur doit être lancé** pour exécuter les tests `androidTest`.

---

## 4. Générer des tests avec l'IA (Copilot / ChatGPT)

### Avec ChatGPT

```text title="Prompt"
Peux-tu me générer des tests unitaires Android (JUnit 4, dossier androidTest) pour mon service
dont voici le code source. Utilise une BD de test via UtilitaireBD.getForTests(context),
un test par cas (normal, limite, invalide) et le modèle Arrange/Act/Assert :

<COLLER LE CODE DU SERVICE ICI>
```

### Avec Copilot dans Android Studio

1. Crée la classe `TestsDupontService` dans `androidTest`.
2. Écris un commentaire : `// test de la fonction ajouterVote quand le votant a déjà voté`.
3. Saute une ligne : Copilot propose un test → **`Tab`** pour accepter.
4. Ou ouvre **Copilot Chat** et demande la génération des tests.

---

## 5. Est-ce que l'IA a fait une bonne job ? ✅ Checklist

- [ ] Les tests **échouent** si le code n'est pas encore écrit : remplace le corps des méthodes par `throw UnsupportedOperationException()` → tout doit être **rouge**.
- [ ] Les tests **passent** quand le code fonctionne.
- [ ] Un test qui **réussit toujours** ou **échoue toujours** ne teste rien.
- [ ] Les cas d'**exception** sont couverts (vide, trop court, déjà présent, id inexistant).
- [ ] Les tests utilisent une **BD de test en mémoire**, pas celle du téléphone.
- [ ] Les **cas limites** : moyenne mal calculée, vote avec un id qui n'existe pas, nom de 4000 caractères, sujet de 4000 caractères…

### Exemple : trouver le bug que les tests ne voient pas

```kotlin
fun ajouterSujet(contenu: String): Long {
    val sujet = Sujet()
    sujet.contenu = contenu
    val id = dao.ajouterSujet(sujet)     // ⚠️ AJOUT AVANT LA VALIDATION !
    if (contenu.length == 0) throw TexteVideException()
    if (contenu.length < 5) throw TexteCourtException()
    val existant: Optional<Sujet> = dao.sujetParContenu(contenu)
    if (existant.isPresent) throw DejaPresentException()
    return id
}
```

Les tests `@Test(expected = …)` passent (l'exception est bien lancée)… mais le sujet invalide est **quand même enregistré**, et `DejaPresentException` est lancée même pour un **nouveau** sujet (il vient d'être ajouté). Un meilleur test vérifie aussi **l'état de la BD** :

```kotlin
@Test
fun sujetVideNestPasEnregistre() {
    try {
        service.ajouterSujet("")
        fail("Une exception aurait dû être lancée")      // import org.junit.Assert.fail
    } catch (e: TexteVideException) {
        assertTrue(service.listeSujets().isEmpty())       // rien n'a été ajouté
    }
}

@Test
fun nouveauSujetNeLancePasDejaPresent() {
    val id = service.ajouterSujet("Un tout nouveau sujet")
    assertTrue(id > 0)
}
```
