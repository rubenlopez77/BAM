
Proyecto personal para **experimentar** con Playwright y TypeScript, con el objetivo de comparar y replicar la flexibilidad de Selenium


### Launch test 

```
npx playwright test
```

### Launch test on UI mode

```
npx playwright test --ui
```



El proyecto utiliza archivos .env para gestionar las variables de entorno:

.env.dev: Configuración para el entorno de desarrollo.

.env.qa: Configuración para un supuesto entorno de QA

```
URL=https://www.demoblaze.com
USER=user
PASS=pass

```


- Las pruebas se encuentran en la carpeta /namespace/pruebas. Cada archivo de prueba sigue el formato *.test.ts 
- /preuebas/main.test.ts es el lugar para juguetear



