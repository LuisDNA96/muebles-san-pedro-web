# Sistema Web para la Transformación Digital de Muebles San Pedro

## Descripción

El proyecto consiste en desarrollar un sistema web para la transformación digital de Muebles San Pedro, para establecer una presencia digital en el negocio y facilitar a los clientes la consulta de productos y el contacto con la empresa.

## Objetivo del proyecto

Desarrollar una plataforma web que permita mostrar el catálogo de productos de Muebles San Pedro, facilitar la búsqueda de información y proporcionar medios digitales de contacto y solicitud de cotizaciones.

## Metodología

El proyecto se desarrolla utilizando la metodología ágil Scrum, mediante Sprints de dos semanas.

## Tecnologías

- Vue.js
- JavaScript
- HTML
- CSS
- Git
- GitHub

## Sprint 1

### Objetivo

Establecer la estructura inicial del sistema web, configurar el entorno de desarrollo, preparar el repositorio y establecer la navegación básica de la aplicación.

### Actividades realizadas

- Creación del repositorio en GitHub.
- Configuración inicial del proyecto Vue.js.
- Configuración de Vue Router.
- Creación de las vistas iniciales.
- Implementación de la navegación básica.
- Creación de la página de inicio.
- Creación de la sección de productos.
- Creación de la sección de contacto.

### Vistas desarrolladas

- Inicio
- Productos
- Contacto

## Equipo

- Luis David Narvaez Altamirano – Product Owner
- Edgar Daniel Jiménez Ceja – Scrum Master
- Miguel Angel Garcia Aguilar – Frontend / UX-UI
- Jaime Alberto Padron Reyna – Backend / QA

## Sprint 3 – Búsqueda, filtros y detalle de productos

### Funcionalidades implementadas

- Búsqueda en tiempo real por nombre y descripción, sin distinguir mayúsculas ni acentos.
- Filtros por las categorías disponibles en el catálogo, combinables con la búsqueda.
- Limpieza de la búsqueda y mensajes cuando no existen coincidencias.
- Vista individual en `/productos/:id`, accesible desde cualquier tarjeta.
- Manejo de productos inexistentes y rutas inválidas.
- Fuente centralizada de datos para mantener consistencia entre el catálogo y el detalle.

### Instrucciones para probar

1. Ejecuta `npm run dev`.
2. Abre la ruta `/productos`.
3. Escribe `sala`, `SALA` o una búsqueda con/sin acento en el buscador.
4. Selecciona una categoría y comprueba que puede combinarse con el texto.
5. Usa `Limpiar` y `Todos` para restaurar el catálogo.
6. Selecciona una tarjeta para abrir su detalle; prueba también `/productos/999` y una ruta inexistente.

El catálogo continúa utilizando las imágenes remotas que ya formaban parte del proyecto. No se incluyen pagos, carrito ni persistencia de datos, ya que corresponden a futuros sprints.

## Sprint 5 – Integración del sistema de contacto

### Objetivo del Sprint

Conectar el formulario de contacto con un endpoint serverless, validar las solicitudes también en el servidor y ofrecer estados claros de envío, éxito y error sin confirmar solicitudes que no hayan sido recibidas por un servicio configurado.

### Funcionalidades desarrolladas

- Endpoint `POST /api/contact` compatible con funciones serverless de Vercel.
- Validación independiente de nombre, correo, teléfono opcional, asunto, mensaje y `productId`.
- Límites de longitud y tamaño de solicitud.
- Normalización de espacios y respuestas JSON con códigos HTTP apropiados.
- Reenvío opcional a un servicio receptor mediante `CONTACT_WEBHOOK_URL` y `CONTACT_WEBHOOK_TOKEN`, mantenidos exclusivamente en el servidor.
- Integración del formulario Vue con estados inicial, enviando, enviado y error.
- Prevención de envíos duplicados mientras se procesa y después de una confirmación exitosa.
- Conservación de los datos ante errores de red o servicio no configurado.

### Arquitectura del servicio de contacto

El navegador envía los datos a `/api/contact`. La función valida el cuerpo y, si `CONTACT_WEBHOOK_URL` está configurada, reenvía la solicitud al servicio receptor fijo. El cliente nunca recibe ni conoce el token opcional. Si la variable no existe, el endpoint devuelve `503 Service Unavailable`; por tanto, el frontend no muestra éxito falso.

El repositorio no incluye una cuenta, dominio o proveedor de correo. `CONTACT_WEBHOOK_URL` debe apuntar a un receptor autorizado por el responsable del negocio; el endpoint no permite que el usuario elija el destinatario.

### Variables de entorno

Consulta `.env.example` y configura estas variables en el entorno de Vercel o en un archivo `.env.local` no versionado:

```text
CONTACT_WEBHOOK_URL=https://servicio-receptor-configurado.example/contact
CONTACT_WEBHOOK_TOKEN=token-configurado-en-el-servidor
```

No uses el prefijo `VITE_` para secretos. En Vercel, agrega las variables desde **Project Settings > Environment Variables** y vuelve a desplegar. El ejemplo anterior es ilustrativo y no es una credencial real.

### Ejecución local y comprobación segura

1. Ejecuta `npm install` y `npm run dev`.
2. Para probar la validación sin enviar datos personales, usa un cuerpo de ejemplo:

```bash
curl -i -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Prueba\",\"correo\":\"prueba@example.com\",\"telefono\":\"\",\"asunto\":\"Consulta demo\",\"mensaje\":\"Mensaje de prueba con más de veinte caracteres\",\"productId\":1}"
```

Sin `CONTACT_WEBHOOK_URL`, la respuesta esperada para un cuerpo válido es `503`. Para una solicitud inválida, por ejemplo un mensaje corto, la respuesta esperada es `400`. Un `200` solo es posible cuando el receptor configurado responde correctamente.

### Pruebas realizadas

- `npm run build`.
- `npx eslint . --no-cache`.
- `npx oxlint .`.
- `git diff --check`.
- Pruebas directas del endpoint con cuerpos válidos, inválidos, método no permitido y servicio no configurado.
- Smoke test HTTP de `/contacto`.

La prueba real de entrega a un proveedor externo queda pendiente hasta disponer de una URL y credencial de servicio autorizadas. No se declara como realizada.

### Limitaciones y funcionalidades pendientes

- Falta configurar un proveedor real de correo o webhook y verificar su recepción.
- No se incorporó almacenamiento de solicitudes ni datos personales.
- La protección avanzada contra spam, rate limiting distribuido y revisión integral de privacidad quedan para el Sprint 6.
- Las pruebas E2E automatizadas todavía no forman parte del proyecto; deben añadirse cuando se defina el entorno de CI.

## Sprint 4 – Contacto, validaciones, pruebas y ajustes finales

### Objetivo del Sprint

Completar la experiencia de contacto, validar los datos antes de una futura integración de backend y dejar documentadas las comprobaciones funcionales y responsive.

### Historias de usuario implementadas

- **HU-01 y HU-02:** formulario responsive de contacto con nombre, correo, teléfono opcional, asunto y mensaje; validación de obligatorios, correo, teléfono opcional, longitud mínima, espacios innecesarios y mensajes accesibles.
- **HU-03:** las tarjetas y el detalle incluyen **Solicitar información**. El producto se transporta mediante el parámetro `productId`, se muestra como referencia y se precarga el asunto.
- **HU-04:** no existe servicio de envío en el proyecto. El formulario valida y deja claro que no transmite datos; no se añadieron credenciales ni servicios externos.
- **HU-06:** se añadieron estados de foco, textos alternativos existentes, enlaces claros y ajustes responsive para formulario, catálogo y detalle.

### Archivos creados o modificados

- `src/views/ContactoView.vue`: formulario, validaciones, referencia de producto y estado de envío no conectado.
- `src/components/ProductCard.vue`: acción para solicitar información.
- `src/views/ProductDetailView.vue`: acción para solicitar información desde el detalle.
- `README.md`: documentación del sprint, pruebas y limitaciones.

### Pruebas realizadas

Se ejecutaron `npm run build`, `npx eslint . --no-cache` y `npx oxlint .`; además, la ruta `/contacto` respondió correctamente con HTTP 200 en un smoke test del servidor de desarrollo. Queda como validación manual en navegador recorrer `/`, `/productos`, `/productos/:id`, `/contacto` y la ruta de no encontrado, además de comprobar búsqueda, filtros, referencia de producto, campos obligatorios, correo inválido, mensaje corto y adaptación móvil.

### Resultados y errores corregidos

La vista de Contacto dejó de ser un placeholder. Se corrigió la ausencia de integración entre productos y contacto, se evitó presentar un envío ficticio, se añadieron estados de error accesibles y se reforzaron los estados de foco y la distribución móvil.

### Limitaciones y pendientes

El formulario todavía no persiste ni envía solicitudes porque el repositorio no incluye backend o servicio de formularios. Antes de producción debe añadirse un endpoint seguro con validación en servidor, protección contra abuso y política de privacidad. Las pruebas automatizadas E2E/componentes aún no están configuradas; las comprobaciones de este sprint son manuales y de compilación.

## Sprint 5 – Revisión funcional, contacto y optimización de interfaz

### Objetivo

Revisar las funcionalidades acumuladas de los Sprints 1–5, corregir inconsistencias comprobables y documentar el estado real del contacto, la interfaz responsive y las opciones de comunicación.

### Funcionalidades revisadas y mejoras implementadas

- Navegación, catálogo, búsqueda, filtros, detalle y flujo `productId` hacia Contacto.
- Formulario con validación cliente/servidor, estados de envío, errores y respuesta `503` cuando el receptor no está configurado.
- Límites de longitud del formulario alineados con el endpoint mediante `maxlength` y validación local.
- Rechazo explícito de cuerpos con `Content-Type` distinto de JSON (`415`).
- Tiempo máximo de ocho segundos para esperar al servicio receptor; los timeouts devuelven un error controlado.
- Estilos globales de cuerpo y `box-sizing` movidos al componente persistente `App.vue`, evitando que el aspecto base dependa de permanecer en Inicio.
- Estados de foco visibles para la marca y la navegación.

### WhatsApp y redes sociales

No se encontró en el repositorio un número oficial autorizado de WhatsApp ni enlaces oficiales de Facebook, Instagram u otras redes. No se agregaron números, perfiles ni enlaces ficticios. Para habilitarlos se necesita recibir del negocio el número internacional autorizado y las URL oficiales; entonces puede añadirse un enlace `https://wa.me/NUMERO?text=...` con `encodeURIComponent` y atributos seguros.

### Consistencia visual y responsive

Se conservaron los colores, tipografías, radios, sombras y jerarquía visual existentes. Se revisaron los puntos de quiebre declarados para catálogo, detalle, encabezado y formulario. No se ejecutó una inspección visual automatizada en navegador en este entorno; la comprobación a 390 px, 768 px y 1440 px debe realizarse manualmente o mediante Playwright en CI.

### Pruebas e incidencias reales

Se ejecutaron build, ESLint, Oxlint, `git diff --check` y pruebas directas del handler con datos ficticios. Las respuestas verificadas incluyen `400` para datos inválidos, `405` para método no permitido, `415` para contenido no JSON, `503` sin receptor y `200` con un receptor HTTP local ficticio.

Durante esta revisión se identificaron y corrigieron tres incidencias:

1. **S5-01 — Validación de longitudes desalineada:** el formulario no limitaba localmente los tamaños aceptados por el endpoint. Se añadieron límites y mensajes equivalentes.
2. **S5-02 — Contrato HTTP incompleto:** el endpoint no rechazaba explícitamente contenido no JSON ni tenía timeout del receptor. Se añadió respuesta `415` y timeout de ocho segundos con respuesta controlada.
3. **S5-03 — Estilos base dependientes de Inicio:** `body` y `box-sizing` estaban definidos en `HomeView.vue`; se centralizaron en `App.vue` para mantener consistencia al navegar.

No se detectaron errores adicionales en las verificaciones ejecutadas. No se declara como probada la entrega a un proveedor externo ni la revisión visual real en los tres tamaños.

### Estado, limitaciones y recomendaciones

- **Completado:** revisión estática del código, correcciones anteriores, endpoint y documentación.
- **Parcial:** pruebas funcionales automatizadas y responsive; faltan pruebas E2E y navegador automatizado.
- **Pendiente:** configurar proveedor de recepción, número oficial de WhatsApp, redes sociales oficiales y pruebas de entrega en producción.

Para el Sprint 6 se recomienda añadir Playwright en CI, rate limiting, protección antispam, política de privacidad y monitoreo sin registrar datos personales completos.

### Mejoras complementarias – Footer y pruebas de contacto

#### Footer y redes sociales

Se creó [`src/components/AppFooter.vue`](./src/components/AppFooter.vue) y se integró en [`src/App.vue`](./src/App.vue), por lo que aparece de forma consistente en Inicio, Productos, detalle y Contacto sin duplicar marcado.

- Incluye identidad del negocio, navegación con Vue Router y copyright.
- Instagram, Facebook y WhatsApp se muestran como elementos no interactivos con la etiqueta **Próximamente**.
- No existen en el repositorio números o enlaces oficiales autorizados; no se inventaron datos ni se utilizaron enlaces `#`.
- Para activar redes posteriormente se requiere recibir las URL oficiales y, para WhatsApp, el número internacional aprobado por el negocio. El mensaje del producto deberá codificarse con `encodeURIComponent`.
- El footer usa columnas en escritorio y una distribución vertical en pantallas de hasta 700 px. No utiliza posición fija.

#### Pruebas con Webhook.site

No se ejecutó una prueba real con Webhook.site porque el repositorio no contiene una URL temporal autorizada. Para realizarla sin modificar producción:

1. Abre [Webhook.site](https://webhook.site/) y copia la URL temporal generada.
2. Configúrala únicamente como `CONTACT_WEBHOOK_URL` en el entorno local serverless o en las variables de Preview de Vercel. No la escribas en el código ni en `.env.example`.
3. Ejecuta las funciones con Vercel CLI (`vercel dev`) o utiliza el entorno Preview; `npm run dev` de Vite por sí solo no ejecuta `api/contact.js`.
4. Completa el formulario con datos ficticios y verifica la petición `POST` en Webhook.site.
5. El receptor debe responder con un estado `2xx` para que el frontend muestre éxito. Un `4xx`, `5xx` o timeout produce `502`.
6. Elimina la variable temporal al terminar y no la uses en producción.

Escenarios ya verificables localmente mediante el handler:

- Solicitud válida sin receptor: `503`.
- Mensaje inválido o `productId` inexistente: `400`.
- Método no permitido: `405`.
- Contenido no JSON: `415`.
- Receptor local ficticio que responde `204`: `200`.

No se afirmará recepción en Webhook.site hasta ejecutar la prueba con una URL temporal real.

#### Mailtrap Email Sandbox

Mailtrap no es compatible directamente con el webhook genérico actual para generar un correo: requiere su API o SMTP, credenciales de sandbox y un destinatario de prueba. No se añadió un adaptador porque faltan cuenta y credenciales autorizadas, y no es necesario para verificar el contrato HTTP existente. La integración queda preparada como una decisión posterior del backend; no se probó envío de correo.

#### Evidencias recomendadas

- Formulario inicial sin datos personales reales.
- Webhook.site mostrando el `POST` recibido.
- Cuerpo recibido con datos ficticios y `productId`.
- Respuesta `200` del endpoint cuando el receptor confirme.
- Caso inválido con respuesta `400`.
- Servicio sin configurar con respuesta `503`.

Las pruebas visuales en 390 px, 768 px y 1440 px y las pruebas E2E del footer quedan pendientes de ejecutar en un navegador automatizado.
