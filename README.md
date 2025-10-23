# 🧪 BAM! Playwright + TypeScript  + IA

Proyecto personal para **experimentar** con **Playwright + TypeScript**, con el objetivo de replicar la flexibilidad lograda previamente con Selenium, y explorar nuevas posibilidades en testing moderno orientado a **mantenibilidad, paralelización y trazabilidad**, incorporando además un enfoque experimental con **inteligencia artificial** para optimizar la generación, análisis y priorización de pruebas.  

El objetivo a medio plazo es consolidar un modelo de automatización sostenible, trazable y alineado con las buenas prácticas **ISTQB**, explorando extensiones experimentales como el modelo **BAM (Behavior Annotation Model)**.

---

## 🤖 Enfoque experimental de IA

A diferencia de muchas soluciones de IA que intentan generar código o tests a partir de texto libre  que suelen ignorar las buenas prácticas de diseño QA como el Page Object Model (POM) o la capa de componentes, este proyecto adopta un enfoque más controlado y técnico.

El propósito es integrar la inteligencia artificial como asistente semántico, orientado a documentación automatizada, trazabilidad de requisitos y análisis inteligente de resultados, sin comprometer la calidad ni la arquitectura de las pruebas automatizadas.

De este modo, la IA contribuye en tareas de análisis de logs, detección de patrones de fallos y optimización de la cobertura, reforzando la coherencia y consistencia del proceso de testing sin generar código por sí misma.

---

## 🧩 Behavior Annotation Model (BAM!)

El modelo **BAM!** surge como una evolución natural del POM multicapa, combinando la claridad declarativa del BDD con el rigor tipado de TypeScript.

Este enfoque híbrido permite mantener trazabilidad y semántica funcional sin duplicar código ni depender de ficheros .feature sin alterar la base técnica del framework

El resultado es una arquitectura más ligera, verificable y alineada con ISTQB, que unifica comunicación de negocio y control técnico dentro del propio código fuente.

```typescript
/**
 * @ID REQ-LOGIN-001
 * @Title Validación de login con credenciales inválidas
 * @Description Como usuario, al introducir credenciales incorrectas debo recibir mensaje de error.
 * @Priority High
 * @Tags security, login
 */
```


📊 **Matriz de Evaluación**
| Criterio | BDD Clásico | Arquitectura Multicapa | BAM! |
|-----------|-------------|------------------------|-----|
| **Trazabilidad** | ✅ Excelente | ❌ Limitada | ✅ Excelente |
| **Mantenibilidad** | ❌ Baja | ✅ Alta | ✅ Alta |
| **Velocidad Ejecución** | ❌ Lenta | ✅ Rápida | ✅ Rápida |
| **Business Visibility** | ✅ Alta | ❌ Nula | ⚙️ Media‑Alta |
| **Technical Debt** | ❌ Alta | ✅ Baja | ✅ Baja |
| **AI Compatibility** | ❌ Difícil | ⚙️ Media | ✅ Alta |


## 🧩 ESLint Plugin – BAM! Validation
El BAM! ESLint Plugin es una herramienta de validación estática diseñada para garantizar la trazabilidad y consistencia semántica de los tests.

De este modo, se asegura que todas las pruebas estén correctamente vinculadas a sus requisitos funcionales, cumpliendo los principios de trazabilidad promovidos por ISTQB y evitando la pérdida de contexto entre especificación y ejecución.
- Garantiza trazabilidad automática (requisito ↔ test ↔ resultado).
- Refuerza la conformidad del estándar BAM en todos los tests.
- Evita errores de documentación o metadatos incompletos.

```ts
// .eslintrc.cjs
module.exports = {
  plugins: ['bam'],
  rules: {
    'bam/bam-required-metadata': ['error', {
      require: ['ID', 'Title', 'Description'],
      testFunctions: ['test', 'it'],
      lookbackComments: 6
    }]
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        'bam/bam-required-metadata': 'error'
      }
    }
  ]
};
```


---

## 🧱 Capas de Abstracción y Arquitectura de Automatización

El framework sigue una **arquitectura multicapa** basada en el patrón **Page Object Model (POM)** y en principios de **bajo acoplamiento y alta cohesión**.

🧬 **Helper de componente → Helper de página (POM) → Prueba (feature / test)**

Este ejemplo muestra cómo una prueba sencilla de login utiliza la arquitectura propuesta, separando responsabilidades entre la prueba, el helper de página y los helpers de componentes.

#### 🧩 1. Helper de componente
- Contiene la lógica de interacción con **elementos** de la web (botones, inputs, selectores, modales, tooltips, etc.).  
- Se encarga de las esperas (`await expect(...)`), selectores y validaciones específicas de ese componente.  Esto genera limpieza en el resto de capas.
- Alta mantenibilidad 

```typescript
export class TextBoxHelper {
  constructor(private readonly page: Page, private readonly selector: string) {}

  async fillTextBox(value: string) {
    const field = this.page.locator(this.selector);
    await expect(field).toBeVisible();
    await field.fill(value);
  }
}
```

#### 🧩 2. Helper de página (POM)
Filosofía “Single Level of Abstraction per Layer”,  recomendación clave del ISTQB.
- No contiene locators directamente.
- Expresa la acción de negocio, no los detalles de UI.
- Representa una página completa o una vista funcional.  
- **No repite lógica de bajo nivel**, sino que **utiliza los helpers de componentes** para mantener la capa limpia.  
- Define métodos con el mismo nombre visible en la web. 

```typescript
 
  private username = new TextBoxHelper(this.page, '#loginusername');
  private password = new TextBoxHelper(this.page, '#loginpassword');
  private loginButton = new ButtonHelper(this.page, '#login');

	async loginWith(credentials: LoginCredentials, shouldSucceed: boolean) {
	  this.username.fillTextBox(credentials.username);
	  this.password.fillTextBox(credentials.password);
	  this.loginButton.press();
	  
	  // Validación
	  this.verifyLoginResult(shouldSucceed);
	}


```

#### 🧪 3. Prueba
- El test es **declarativo**, solo indica *qué* se valida, no *cómo*.
- Se decora utilizando BAM lo que cumple el principio de trazabilidad.
- Los datos se obtienen de una capa Test Data Management Layer 

```typescript
  /**
 * @ID REQ-LOGIN-001
 * @Title Validación de login con credenciales inválidas
 * @Description Usuario recibe error al introducir credenciales incorrectas
 */
  test('should fail login with invalid credentials', async ({ page }) => { 

	const user = new User(page);
	const loginData = LoginTestData.INVALID_CREDENTIALS;
	
	user.loginWith(loginData, false);

  });

```

---

## 🧩 Estrategia de Calidad y Mejores Prácticas
- **Behavior Annotation Model (BAM!)** extensión experimental, que añade **trazabilidad funcional y visibilidad de negocio** mediante anotaciones estructuradas directamente en el código.
- **Page Objects:** una clase por página con acciones claras (`home()`, `login(user,pass)` etc.) con el mismo nombre del botón o enlace. *“El código se lee como una historia.”*  
- **Selectors:** usar siempre `data-test` o atributos específicos del DOM.  
- **Fixtures:** inicializar datos y estados en `beforeAll` o `beforeEach`.  
- **Tests atómicos:** cada escenario debe validar un único flujo de negocio.  
- **Commits limpios:** convención `feat/test/fix/chore`.  
- **Quality Gate con SonarQube:** define umbrales mínimos de cobertura, duplicación y deuda técnica antes de aceptar merges.  
- **Ejecución en paralelo y cross-browser:** aprovechar la capacidad nativa de Playwright para correr tests simultáneamente en **Chromium**, **Firefox** y **WebKit**.  
- **Alta reutilización de componentes:** promover abstracción y modularidad en fixtures, utilidades y Page Objects para minimizar duplicación y facilitar mantenimiento.  
- **AI-assisted QA*: explorar el uso de inteligencia artificial como asistente semántico para documentación automatizada, trazabilidad de requisitos y análisis inteligente 

---

## 🧩 Integración continua y Roadmap

El proyecto se encuentra en una fase inicial pretende crecer, incorporando progresivamente herramientas de validación, trazabilidad y automatización inteligente dentro de un marco de calidad medible.

**Roadmap (en desarrollo):**
- [ ] Habilitar SonarQube Quality Gate
- [ ] **BAM! ESLint Plugin** descargable
- [ ] Definir **Test Data Management Layer** estructurada  
- [ ] Integrar **Allure/HTML Reporter** con extracción de metadatos BAM  
- [ ] Explorar integración con **JIRA** para sincronización de requisitos (experimental)  
- [ ] Evaluar uso de **IA semántica** para generación automática de anotaciones y análisis de logs  


🔧 Calidad y Validación

- [ ] Habilitar SonarQube Quality Gate
- [ ] BAM! ESLint Plugin descargable y validado
- [ ]  Añadir validadores de anotaciones extendidas (@Priority, @Tags, @Risk)
- [ ] Incorporar lint rule para consistencia de naming en metadatos (REQ- prefix obligatorio)
- [ ]  Añadir BAM! Pre-commit hook con Husky / lint-staged para prevenir merges sin trazabilidad

🧱 Arquitectura y Mantenibilidad

 - [ ] Definir Test Data Management Layer estructurada
 - [ ] Introducir una Domain Abstraction Layer (ej. User, Admin, Customer) para escenarios cross-page
 - [ ] Implementar persistence mocks / data fixtures inteligentes para escenarios dinámicos
 - [ ] Crear un Playwright Context Manager unificado para inicializar sesiones, data y logs de forma declarativa
 - [ ]  Añadir Performance Metrics Layer (auto-medición de tiempo medio por flujo funcional)

📊 Reporting y Trazabilidad

- [ ] Integrar Allure/HTML Reporter con extracción automática de metadatos BAM! (@ID, @Priority)
- [ ]  Generar matriz de trazabilidad dinámica (requisito ↔ test ↔ resultado) exportable a CSV/HTML
- [ ]  Añadir BAM! Dashboard (UI minimalista en React) para visualizar resultados y cobertura. Ya veremos :)
 - [ ]  Implementar CI status annotations → los IDs de BAM! se marcan automáticamente en Pull Requests

🔗 Integraciones y Gobernanza

- [ ]  Explorar integración con JIRA / Xray / TestRail para sincronización bidireccional de requisitos
- [ ]  Generar automáticamente tickets de bug con metadatos BAM! en caso de fallo crítico
- [ ]   Añadir API BAM! REST/GraphQL para exponer resultados y cobertura hacia otros sistemas


🤖 Inteligencia Semántica y Asistida

- [ ]  Evaluar uso de IA semántica para generación automática de anotaciones y análisis de logs
- [ ]   Entrenar un modelo de clasificación de tests (por riesgo, prioridad, estabilidad)
- [ ]  Incorporar un BAM! Linter inteligente con IA que sugiera mejoras semánticas (por ejemplo, resúmenes automáticos en @Description)


🧩 Visión futura: BAM! Framework 1.0

- [ ]  Consolidar un ecosistema unificado de automatización BAM!-Driven Testing, donde la trazabilidad, la semántica y la calidad sean parte nativa del ciclo de desarrollo.
- [ ]  Publicar npm package oficial bam-playwright-kit
- [ ]  Integrar validación declarativa en CI pipelines (GitHub Actions / Jenkins)
- [ ]   Definir “BAM! Certification Checklist” (batería de criterios ISTQB + BAM! para auditar proyectos QA)

---

## 👨‍💻 Autor

**Rubén López**  
🧑‍🔬 QA Senior 📦 [GitHub](https://github.com/rubenlopez77) 🔗 [LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)
