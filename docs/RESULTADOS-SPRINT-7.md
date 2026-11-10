# Resultados del séptimo Sprint – Muebles San Pedro

## Alcance y objetivo

Este sprint cerró la revisión del sistema existente sin añadir funcionalidades comerciales fuera del alcance. Se verificaron estructura, catálogo, búsqueda, filtros, navegación, contacto, responsive, calidad estática, dependencias, documentación y preparación para entrega.

## Resultados de las diez actividades

| Actividad | Resultado real | Estado | Evidencia |
|---|---|---|---|
| Revisión general de estructura | Se revisaron `src`, `api`, `tests`, configuración, estilos y rutas. La fuente de productos está centralizada y no se detectó código muerto o credenciales versionadas. | Completado | `src/App.vue`, `src/components/`, `src/views/`, `src/data/products.js`, `api/contact.js` |
| Verificación del catálogo | Se verificaron cuatro productos, IDs únicos, categorías, descripciones, precios, imágenes, detalle y enlaces de solicitud. | Completado | `src/data/products.js`, `tests/products.test.js` |
| Búsqueda y filtros | Las pruebas cubren nombre, descripción, mayúsculas, acentos, búsqueda vacía, cero resultados, categorías y filtros combinados. | Completado | `src/data/products.js`, `tests/products.test.js` |
| Navegación | Las rutas, parámetros `id` y `productId`, enlaces del encabezado/footer y ruta inexistente fueron revisados estáticamente. Falta un recorrido E2E en navegador. | Parcial | `src/router/index.js`, vistas y `AppFooter.vue` |
| Opciones de contacto | Se verificaron validaciones, estados, conservación de datos, bloqueo durante envío, endpoint y respuestas simuladas del receptor. No se verificó un proveedor externo real. | Parcial | `src/views/ContactoView.vue`, `api/contact.js`, `tests/contact.test.js` |
| Adaptación móvil | Se revisaron los breakpoints CSS de móvil, tablet y escritorio. No se ejecutó una inspección visual real ni se generaron capturas. | Parcial | CSS scoped de vistas y `AppFooter.vue` |
| Corrección de errores | No se reprodujeron errores nuevos en las verificaciones. Se mantuvo la corrección S6-01 del encabezado Bearer y se comprobó su regresión con mock. | Completado | `api/contact.js`, `tests/contact.test.js` |
| Actualización del repositorio | `git status`, `git diff`, archivos ignorados y ausencia de archivos `.env` rastreados fueron revisados. No se hizo commit ni push. | Completado | comandos Git y `.gitignore` |
| Documentación técnica | Se añadió esta memoria, `.env.example` y un resumen enlazable desde el README; se conservaron los Sprints 1–6. | Completado | `README.md`, `docs/RESULTADOS-SPRINT-7.md` |
| Preparación de versión final | Instalación existente, tests, build, linters y diff check fueron comprobados. Ambos dominios Vercel respondieron `200`, pero no se pudo identificar el dominio canónico o commit desplegado. | Parcial | `package.json`, salida de verificaciones y comprobación HTTP |

## Métricas verificables

- Actividades planeadas: **10**.
- Actividades completadas: **6**.
- Actividades parcialmente completadas: **4**.
- Actividades pendientes: **0** como actividad completa; quedan evidencias parciales de navegador y despliegue.
- Cumplimiento considerando completadas: **60 %**.
- Errores nuevos detectados en Sprint 7: **0**.
- Errores nuevos corregidos en Sprint 7: **0**.
- Errores nuevos pendientes: **0**.
- Pruebas unitarias/integración ejecutadas: **9**; aprobadas **9**; fallidas **0**.
- Verificaciones estáticas ejecutadas: **4**; aprobadas **4**: build, ESLint, Oxlint y `git diff --check`.
- Pruebas E2E ejecutadas: **0**; Playwright no está instalado.
- Pruebas visuales/manuales en 390 × 844, 768 × 1024 y 1440 × 900: **0** ejecutadas.
- Pruebas no ejecutadas: recorrido completo en navegador, capturas, entrega a receptor externo autorizado y asociación del despliegue con un commit.

Las nueve pruebas automatizadas son unitarias o de integración: cuatro del catálogo y cinco del endpoint. El build y los linters no se contabilizan como E2E.

## Incidencias y correcciones

No se registraron incidencias nuevas reproducibles durante Sprint 7. La regresión de S6-01 se comprobó ejecutando el handler con un receptor simulado: la solicitud válida respondió `200` y el encabezado de autorización se construyó con el token del servidor, sin exponerlo al cliente.

## Revisión de dependencias

`npm audit --omit=dev --json` reportó **2 vulnerabilidades altas**: `source-map-js` transitiva y `vite` directo. `npm audit --json` reportó **10 vulnerabilidades**: 3 críticas, 2 altas y 5 moderadas, principalmente en dependencias de desarrollo como Vitest, ESLint, `shell-quote` y `tinypool`.

No se ejecutó `npm audit fix --force`. Las correcciones disponibles para Vitest y ESLint implican cambios mayores; la actualización de Vite debe validarse en una tarea de mantenimiento separada antes de modificar el lockfile. Estas vulnerabilidades afectan principalmente herramientas de desarrollo, pero Vite y `source-map-js` deben actualizarse antes de exponer el entorno de desarrollo a usuarios no confiables.

La instalación limpia con `npm ci --ignore-scripts` quedó bloqueada por `EPERM` al reemplazar el binario nativo de Oxlint en Windows. `npm install --ignore-scripts --no-audit --no-fund` restauró las dependencias y permitió repetir las pruebas; npm mostró advertencias porque el entorno usa Node **22.19.0** y algunas dependencias requieren **22.22.2** o posterior.

## Responsive, accesibilidad y redes

El CSS incluye breakpoints para móvil, tablet y escritorio, imágenes adaptables, etiquetas de formulario, mensajes asociados mediante ARIA y focos visibles en enlaces y botones. La aprobación visual no se declara porque no se utilizó un navegador automatizado.

Instagram, Facebook y WhatsApp permanecen como **Próximamente**. No se inventaron perfiles, números ni enlaces oficiales.

## Servicio de contacto y limitaciones

El endpoint valida solicitudes, rechaza métodos y JSON inválidos, valida `productId`, devuelve `503` si no existe `CONTACT_WEBHOOK_URL` y devuelve `502` ante fallos del receptor. La prueba exitosa usa un mock local; no demuestra recepción de correo ni recepción en Webhook.site o producción.

Limitaciones pendientes: ejecutar E2E con Playwright, realizar revisión visual y capturas en las tres resoluciones, configurar un receptor autorizado, definir proveedor de correo, revisar rate limiting/antispam y actualizar dependencias.

## Despliegue

`https://muebles-san-pedro-web-xico.vercel.app/` y `https://muebles-san-pedro-web.vercel.app/` respondieron `HTTP 200` y presentaron el mismo ETag durante la revisión. El repositorio contiene metadatos locales del proyecto Vercel, pero no permite probar cuál URL es la vigente ni qué commit está publicado. No se modificó producción.

## Archivos creados o modificados en Sprint 7

- Creado: `.env.example`.
- Creado: `docs/RESULTADOS-SPRINT-7.md`.
- Modificado: `README.md`.
- No se modificaron componentes ni lógica de negocio porque las verificaciones funcionales existentes fueron aprobadas.

## Resumen de los siete Sprints

1. Se establecieron Vue, Vue Router, vistas iniciales y navegación.
2. Se desarrollaron catálogo y componentes reutilizables.
3. Se añadieron búsqueda, filtros, detalle y fuente centralizada de productos.
4. Se construyó el formulario de contacto, sus validaciones y el flujo `productId`.
5. Se integró el endpoint serverless, estados de envío, footer y contrato de errores.
6. Se centralizó la lógica, se añadieron pruebas Vitest, ajustes responsive y se corrigió S6-01.
7. Se revisó la calidad final, se ejecutaron verificaciones, se documentaron limitaciones y se preparó la entrega sin desplegar ni publicar cambios automáticamente.

## Evidencias recomendadas para Sprint Review

1. Salida de `npm test`, `npm run build`, ESLint, Oxlint y `git diff --check`.
2. Catálogo, búsqueda combinada, detalle y referencia `productId` con datos ficticios.
3. Ruta inexistente y enlaces del encabezado/footer.
4. Formulario con validación y respuestas `400`, `503` y `502` simuladas.
5. Capturas reales a 390 × 844, 768 × 1024 y 1440 × 900, cuando haya navegador disponible.
6. `git status` sin mostrar archivos `.env` ni valores de configuración.

## Propuesta de demostración de cinco minutos

1. Presentar el objetivo y la arquitectura Vue/Vue Router.
2. Mostrar Inicio y navegar a Productos.
3. Buscar por nombre o descripción y combinar con una categoría.
4. Abrir un detalle y usar **Solicitar información** para mostrar `productId`.
5. Mostrar las validaciones del formulario y explicar que el endpoint reenvía solo a un receptor configurado en servidor.
6. Presentar las nueve pruebas automatizadas, los cuatro checks estáticos y las limitaciones E2E/responsive.
7. Cerrar indicando que no hay correo real confirmado, que las redes siguen como Próximamente y que no se hizo despliegue desde esta sesión.

## Mensaje de commit sugerido

`docs: document sprint 7 final review and delivery readiness`
