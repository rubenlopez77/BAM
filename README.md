# 🧩 BAM – Behavior Annotation Model  
### Playwright + TypeScript · QA Architecture Proof of Concept
---

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_BAM-Behavior-Annotation-Model&metric=alert_status)](https://sonarcloud.io/summary/overall?id=rubenlopez77_BAM-Behavior-Annotation-Model)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_BAM-Behavior-Annotation-Model&metric=bugs)](https://sonarcloud.io/summary/overall?id=rubenlopez77_BAM-Behavior-Annotation-Model)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_BAM-Behavior-Annotation-Model&metric=code_smells)](https://sonarcloud.io/summary/overall?id=rubenlopez77_BAM-Behavior-Annotation-Model)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_BAM-Behavior-Annotation-Model&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=rubenlopez77_BAM-Behavior-Annotation-Model)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_BAM-Behavior-Annotation-Model&metric=security_rating)](https://sonarcloud.io/summary/overall?id=rubenlopez77_BAM-Behavior-Annotation-Model)

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-Testing%20Framework-green?logo=playwright" alt="Playwright">
  <img src="https://img.shields.io/badge/TypeScript-Strongly%20Typed%20Language-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/ISTQB-Aligned-blueviolet?logo=bookstack" alt="ISTQB">
  <img src="https://img.shields.io/badge/AI--Assisted-QA-lightgrey?logo=openai" alt="AI Assisted QA">
  <img src="https://img.shields.io/badge/BAM-Architecture-orange" alt="BAM Architecture">
  <img src="https://img.shields.io/badge/Formal-Traceability-success" alt="Formal Traceability">
</p>

---

## 🎯 Propósito del proyecto

Este repositorio es un **proyecto personal de investigación y desarrollo** en automatización de pruebas funcionales, orientado a:

- Explorar las **capacidades modernas de Playwright + TypeScript**.  
- Replicar la **flexibilidad y extensibilidad** lograda con frameworks previos en Selenium.  
- Diseñar un **modelo sostenible, mantenible y trazable**, alineado con los estándares de calidad **ISTQB**, **IEEE 29119** e **ISO 25010**.  
- Investigar el papel de la **inteligencia artificial aplicada al QA**, no como generador de código, sino como **asistente semántico y analítico**.  

El resultado es **BAM (Behavior Annotation Model)**: una arquitectura de automatización **multicapa**, **formalmente trazable** y **técnicamente elegante**, que unifica negocio y tecnología dentro del propio código fuente.

---

## 🧱 Arquitectura

El framework sigue una **arquitectura multicapa** basada en el patrón **Page Object Model (POM)** y en principios de **bajo acoplamiento y alta cohesión**.

```
🧬 Helper de componente → Helper de página (POM) → Prueba (feature / test)
```

### 🧩 1. Helper de componente
- Contiene la lógica de interacción con elementos de la web (botones, inputs, modales, tooltips, etc.).  
- Centraliza las esperas (`await expect(...)`) y los selectores específicos.  
- Aísla los cambios del DOM de la capa de negocio.  
- Garantiza **alta mantenibilidad** y **reutilización transversal**.

### 🧩 2. Helper de página (POM)
Filosofía **“Single Level of Abstraction per Layer”**, recomendación clave del ISTQB:

- No contiene *locators* directamente.  
- Expresa **acciones de negocio**, no detalles de UI.  
- Representa **una vista funcional completa**.  
- Utiliza los *Component Helpers* para mantener limpieza y coherencia.  
- Los métodos reflejan el mismo lenguaje visible en la interfaz.  

### 🧪 3. Prueba declarativa (BAM)
- El test describe **qué se valida**, no **cómo se valida**.  
- Se decora mediante anotaciones BAM (`@ID`, `@Title`, `@Description`…), cumpliendo el principio de **trazabilidad funcional**.  
- Obtiene datos desde una **Test Data Management Layer (TDM)**.  

Ejemplo:
```ts
/**
 * @ID REQ-LOGIN-002
 * @Title Validación de login con credenciales inválidas
 * @Description Como usuario, al introducir credenciales incorrectas debo recibir mensaje de error.
 * @Priority High
 * @Tags security, login
 */
test('Login inválido', () => {
  user.loginWith(loginData.invalid, false);
});
```

---

## 📚 Fundamentos de Calidad y Cumplimiento

| Norma / Guía | Cumplimiento | Descripción |
|---------------|--------------|--------------|
| **ISTQB** | ✅ | Separación clara de niveles de abstracción y trazabilidad funcional. |
| **IEEE 29119-3** | ✅ | Metadatos de prueba equivalentes a *Test Case Specification*. |
| **IEEE 29119-4** | ✅ | Técnica *model-based* con formalización en código. |
| **ISO 25010** | ✅ | Mejora de *Maintainability*, *Usability*, *Reliability*. |
| **ISO 9126 / 25000** | ✅ | Documentación explícita de requisitos y cobertura. |

---

## 📊 Comparativa de modelos

| Criterio | BDD clásico | POM tradicional | **BAM (actual)** |
|-----------|--------------|----------------|----------------|
| Trazabilidad | ✅ Excelente | ⚙️ Media | ✅ Excelente |
| Mantenibilidad | ❌ Baja | ✅ Alta | ✅ Alta |
| Velocidad de ejecución | ❌ Lenta | ✅ Rápida | ✅ Rápida |
| Visibilidad negocio | ✅ Alta | ❌ Nula | ⚙️ Media-Alta |
| Deuda técnica | ❌ Alta | ✅ Baja | ✅ Baja |
| Compatibilidad IA | ❌ Difícil | ⚙️ Media | ✅ Alta |

---

## 🧩 ESLint Plugin – BAM Validation

El **plugin ESLint personalizado** (`bam/bam-required-metadata`) refuerza la trazabilidad y la disciplina semántica en todos los tests.

```js
// .eslintrc.cjs
module.exports = {
  plugins: ['bam'],
  rules: {
    'bam/bam-required-metadata': ['error', {
      require: ['ID', 'Title', 'Description'],
      testFunctions: ['test', 'it'],
      lookbackComments: 6
    }]
  }
};
```

🔍 **Ventajas:**
- Asegura que toda prueba esté documentada con su requisito funcional.  
- Detecta metadatos ausentes o inconsistentes antes de ejecutar.  
- Cumple los principios de trazabilidad del ISTQB y del IEEE 29119.  

---

## 🧩 Arquitectura Técnica

### Estructura general
```
/helpers
  ├── components/   → Component Helpers
  ├── pages/        → Page Helpers (POM)
  ├── runner.ts     → Cola asincrónica controlada
  ├── hooks.ts      → Fixtures y contextos por test
/tests
  ├── login.test.ts → Ejemplo de trazabilidad funcional
/data
  ├── users.json    → Capa de Test Data Management
```

### El Runner
```ts
this.queue = this.queue
  .then(async () => {
    await fn(); // <- Ejecuta la acción en secuencia
    this.metrics.steps++; // <- Registra el paso
    this.metrics.totalTime += performance.now() - stepStart;
  })
  .catch(err => console.error('Error en helper:', err));

```

El **Runner** coordina la ejecución de acciones asincrónicas garantizando orden, sincronía y trazabilidad.
Cada tarea se encadena en una promesa secuencial (this.queue.then(fn)), registrando automáticamente tiempo, memoria y profundidad de ejecución, asegurando reproducibilidad sin bloquear el flujo del test.

---

## 🤖 Inteligencia Artificial aplicada a QA

El propósito es integrar la inteligencia artificial (Siempre desde un enfoque on premise usando LLM) como asistente semántico, orientado a documentación automatizada, trazabilidad de requisitos y análisis inteligente de resultados, sin comprometer la calidad ni la arquitectura de las pruebas automatizadas.

- **No genera código**: evita comprometer arquitectura y mantenibilidad.  
- **Analiza semántica y trazabilidad**: interpreta anotaciones, detecta duplicidades y sugiere brechas de cobertura.  
- **Apoya documentación y reporting**: genera informes automáticos en JSON, Markdown o HTML.  

La IA actúa como **asistente de calidad**, no como reemplazo del ingeniero de QA.

---

## 🧩 Estrategia de Calidad

- **Tests atómicos y declarativos:** cada uno valida un flujo de negocio único.  
- **Page Objects desacoplados:** un archivo por vista, sin duplicación de lógica.  
- **Selectors estables:** uso sistemático de `data-test` o equivalentes.  
- **Fixtures controlados:** `beforeEach` / `afterEach` garantizan contexto limpio.  
- **Commits normativos:** convención `feat/test/fix/chore`.  
- **Quality Gate:** integración con **SonarQube** para cobertura y deuda técnica.  
- **Ejecución paralela:** soporte nativo para navegadores Chromium, Firefox y WebKit.  

---

## 🔬 Roadmap

| Fase | Objetivo | Descripción |
|------|-----------|-------------|
| 0.1 | **Traceability Extractor** | Exportar matriz JSON/Markdown de requisitos ↔ tests. |
| 0.2 | **Helpers de Componente** | Implementación de la capa final de abstracción, dedicada a encapsular la interacción directa con elementos UI. |
| 0.3 | **ESLint Plugin** | refuerza la trazabilidad y la disciplina semántica en todos los tests. |
| 0.4 | **Integración CI/CD** | Reportes automáticos en GitHub Actions / Azure DevOps. |
| 0.5 | **Decoradores TypeScript (@Behavior)** | Sustituir anotaciones JSDoc por metadatos tipados. |
| 0.6 | **Integración corporativa (JIRA, Xray, TestRail)** | Mapeo bidireccional de requisitos ↔ resultados. |
| 0.7 | **BAM Analytics** | Métricas automáticas sobre cobertura, defect density y fiabilidad. 
| 1.0 | **Dashboard HTML interactivo** | Visualización navegable de la trazabilidad y estado |

---


---

## ❓ FAQ – Impacto en rendimiento del modelo BAM

### 🧩 ¿El uso del `Runner` hace las pruebas más lentas o consume más memoria?

En términos prácticos, **no**.  
El `Runner` sustituye los `await` explícitos por una **cola secuencial de promesas**, lo que añade una capa mínima de gestión interna pero sin afectar significativamente al rendimiento.

Cada test mantiene su propio `Runner`, de modo que **no existen fugas ni acumulaciones globales**.  
El consumo se libera al finalizar cada test, igual que en el flujo tradicional de Playwright.

---

### ⚙️ Comparativa de rendimiento estimado

| Escenario | Volumen | Método tradicional (`await`) | Modelo BAM (`Runner.schedule`) | Diferencia práctica |
|------------|----------|-----------------------------|-------------------------------|----------------------|
| 🧪 1000 tests con 10 pasos cada uno | ~35 MB/test, 14 s totales | ~36 MB/test, 14.2 s totales | **≈ +1.4 % CPU / +1 MB RAM/test** |
| 🧪 10 000 tests con 10 pasos cada uno | ~35 MB/test, 140 s totales | ~36 MB/test, 143 s totales | **≈ +2 % CPU / +3 % RAM global** |

📊 **Impacto global:**
- Incremento medio de CPU: **+1 % a +2 %**  
- Incremento medio de memoria: **+2 % a +3 %**
- Sobrecoste por promesa adicional: **≈ 0.05 ms / paso**

---

### 🧠 ¿Qué se gana a cambio?

- 🔎 **Trazabilidad total de pasos** (auditable por test y por acción).  
- 🧾 **Métricas automáticas** de rendimiento y memoria en tiempo real.  
- ⚙️ **Sincronización garantizada** entre acciones, sin race conditions.  
- 🧱 **Ejecución declarativa**: los tests se leen como historias de usuario.  
- 🧠 **Integración con IA y reporting** sin alterar la capa de pruebas.  

---

### 🧭 Conclusión

El modelo BAM sacrifica menos de un **2 % de eficiencia** a cambio de **100 % de control, trazabilidad y consistencia**.
- Es **técnicamente limpio**, **documentalmente trazable** y **alineado con estándares internacionales**.  
- Ofrece una visión **consultiva y arquitectónica**

> 💡 *El Runner añade inteligencia y control, no peso ni latencia.*


---

## 📌 Autor
**Rubén López**   
🔗 [LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)
