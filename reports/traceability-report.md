# 📋 Informe de Trazabilidad BAM

| ID | Test | Descripción | Prioridad | Tags | Archivo |
|----|------|-------------|------------|------|----------|
| REQ-LOGIN-001 | Validación de login con credenciales válidas | Como usuario, al introducir credenciales correctas debo poder acceder al sistema. | High | security, login | login.test.ts |
| REQ-LOGIN-002 | Validación de login con credenciales invalidas | Como usuario, al introducir credenciales correctas debo ver un m ensaje de erro. | High | security, login | login.test.ts |
| REQ-LOGIN-004 | Logout de la aplicación | Como usuario, y una vez logado debo poder cerrar sesión y volver al estado inicial. La sesión se debe limpiar. | High | security, login | login.test.ts |