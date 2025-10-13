
# Playwright_fun 🧪

Proyecto personal para experimentar con **Playwright + TypeScript**, con el objetivo de replicar la flexibilidad que tenía con Selenium, y explorar nuevas posibilidades.

---

## 📁 Estructura del proyecto

```
.
├── .github/
│   └── workflows/         # Configuraciones de CI / pipelines
├── .vscode/                # Configuraciones locales del editor
├── namespace/
│   ├── pruebas/            # Tests organizados por módulo / funcionalidad
│   │   ├── user/
│   │   │   └── login/       # Flujos de login, etc.
│   │   └── …                # Otros módulos
│   └── main.test.ts         # Archivo “de juguete” para pruebas generales
├── .env.dev                 # Variables de entorno para desarrollo
├── .env.qa                  # Variables de entorno para QA / entorno de pruebas
├── .gitignore
├── connect‑cdp.js           # (script auxiliar para conectar CDP / Debugging)
├── package.json
├── package-lock.json
└── playwright.config.ts     # Configuración de Playwright (browsers, timeouts, etc.)
```

---

## 🚀 Cómo ejecutar los tests

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Crea o ajusta los archivos `.env.dev` / `.env.qa` según tu configuración. Por ejemplo:
   ```
   URL=https://tu-app.com
   USER=usuario
   PASS=contraseña
   ```

3. Para ejecutar los tests en modo headless:
   ```bash
   npx playwright test
   ```

4. Para ejecutar en modo UI (modo interactivo):
   ```bash
   npx playwright test --ui
   ```

---

## 🧠 Organización de tests

- Los archivos de test tienen extensión `*.test.ts` y se encuentran bajo `namespace/pruebas/`.
- `main.test.ts` puede servir como sandbox para pruebas rápidas o exploratorias.

---

## ⚙️ Configuración / Variables de entorno

- **.env.dev** → configuración para entorno de desarrollo.
- **.env.qa** → configuración para entorno de QA / pruebas.
- Variables típicas:
  - `URL` → URL base de la aplicación bajo prueba.
  - `USER`, `PASS` → credenciales u otros parámetros que necesites resolver de forma dinámica.

---
## 📈 Próximos pasos

- [ ] Integración con herramientas de reporte (por ejemplo Allure, Mochawesome, etc.)
- [ ] Uso de grabación de video, trazas (tracing), capturas de pantalla automáticas al fallar.
- [ ] Paralelización, inyección de datos, fixtures más sofisticadas.
- [ ] Intentar replicar el patrón **Core Layer (Component / Element Layer)**  
- [ ] Integrar **métricas de rendimiento** (tiempos por Step / Escenario)
- [ ] Herramientas de  **login** y **reporte**

---

## 📚 Recursos útiles

- [Documentación oficial de Playwright](https://playwright.dev)
- Ejemplos open source de test suites con Playwright + TypeScript
- Comparativas entre Selenium y Playwright
- Blogs / vídeos de experiencia de migración (Selenium → Playwright)

---

## 📝 Notas adicionales

- Este repositorio es de carácter **experimental / personal**.

