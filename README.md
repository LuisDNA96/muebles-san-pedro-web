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
