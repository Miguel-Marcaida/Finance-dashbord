
<!-- Guía generada para agentes IA que trabajan en este repositorio -->

# Instrucciones de Copilot para Finance-dashboard

Propósito: Ayudar a un agente IA a ser productivo rápidamente en este repositorio describiendo la arquitectura, flujos de trabajo y patrones concretos del proyecto.

**Visión general**:
- **Tipo de app:** Sitio estático del lado cliente (candidato a SPA). Ver `index.html` en la raíz.
- **Carpetas principales:** `js/` (código), `css/` (estilos), `assets/` (recursos e íconos).
- **Estructura prevista:** `js/` contiene `app.js` y subcarpetas `controllers/`, `models/`, `views/`, `utils/`. Se sigue un patrón tipo MVC:
  - **Models:** acceso a datos y estado (ej.: `js/models/*`).
  - **Controllers:** coordina eventos y lógica (ej.: `js/controllers/*`).
  - **Views:** renderizado DOM/plantillas (ej.: `js/views/*`).
  - **Utils:** utilidades pequeñas (ej.: `js/utils/*`).

**Convenciones específicas del proyecto (observadas)**:
- El código se organiza en módulos pequeños bajo `js/`. Prefiere módulos ES (export/import) y usa `app.js` como punto de entrada.
- Nombres descriptivos y agrupados por rol: p. ej. `js/controllers/transactionsController.js`, `js/models/transactionsModel.js`, `js/views/transactionsView.js`.
- Los estilos globales van en `css/main.css`. Los íconos estáticos en `assets/icons/`.

**Flujos de trabajo y depuración**:
- No hay sistema de build presente. Para probar en local, sirve los archivos como estáticos. Ejemplos:
  - `powershell`: `python -m http.server 8000` (desde la raíz del repo)
  - `npm` (opcional): `npx serve .` (sirve la carpeta actual)
- Para edición en vivo en VS Code, usar la extensión Live Server y abrir `index.html`.

**Patrones y ejemplos concretos**:
- Controlador (inicializador exportado):
  - Archivo: `js/controllers/exampleController.js`
  - Patrón: `export function init() { /* adjuntar eventos DOM, llamar models, actualizar views */ }`
- Modelo (envoltorio API / estado):
  - Archivo: `js/models/exampleModel.js`
  - Patrón: `export async function fetchData() { /* fetch o leer localStorage */ }`
- Vista (función de render):
  - Archivo: `js/views/exampleView.js`
  - Patrón: `export function render(container, data) { container.innerHTML = ... }`

**Puntos de integración a vigilar**:
- `index.html` es la entrada única; los scripts deben estar referenciados ahí o cargarse desde `app.js`.
- `css/main.css` contiene estilos globales — mantener clases globables (p. ej. `.footer` en `index.html`).
- `assets/icons/` almacena SVG/PNG pequeños; referéncialos con rutas relativas.

**Qué NO cambiar sin confirmar**:
- No introducir una herramienta de build (Webpack/Vite) ni reorganizar el layout del repo sin aprobación del mantenedor — actualmente es un sitio estático simple.

**Al crear archivos nuevos**:
- Colócalos bajo `js/` en la carpeta correspondiente (`controllers/models/views/utils`). Añade un comentario corto que indique propósito y exportaciones.
- Mantén funciones pequeñas y con responsabilidad única. Prefiere `named exports` para facilitar pruebas y reutilización.

Si algo no cuadra o quieres que las instrucciones reflejen otro objetivo (por ejemplo añadir bundler o tests), consulta al propietario del repositorio.

-- Fin de la guía --
