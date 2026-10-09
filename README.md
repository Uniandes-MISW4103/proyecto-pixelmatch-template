# Proyecto Base: Pruebas de Regresión Visual (VRT) con Pixelmatch

[pixelmatch](https://github.com/mapbox/pixelmatch) es una librería pequeña y rápida que compara dos
imágenes píxel a píxel, detecta el _antialiasing_ y genera una imagen con las diferencias. En este
módulo se combina con [Playwright Test](https://playwright.dev), que toma las capturas de pantalla.

Este módulo contiene la configuración base y un ejemplo de regresión visual que pueden usar como
punto de partida para comparar versiones de la aplicación del proyecto.

## Requisitos

- Node.js 24 (`lts/krypton`). El módulo incluye un `.nvmrc`, por lo que pueden usar `nvm use`.
- npm (incluido con Node.js).
- Navegador: `prepare` descarga Chromium para Playwright. En Linux (por ejemplo, en un servidor de
  CI) también se necesitan librerías del sistema: `npx playwright install --with-deps chromium`.

## Instalación

Desde la **raíz del repositorio** del proyecto:

```bash
npm run pixelmatch:install
npm run pixelmatch:prepare
```

> [!IMPORTANT]
> Instalen siempre desde la raíz. `pixelmatch:install` deja las dependencias del módulo en su propia
> carpeta `node_modules`, aisladas de los demás módulos. Un `npm install` dentro de la carpeta del
> módulo instala en la raíz del repositorio y modifica el `package-lock.json` raíz sin ese aislamiento.

## Ejecución

| Acción | Desde la raíz | Desde `vrt/misw-4103-pixelmatch` |
|---|---|---|
| Tomar las capturas y compararlas | `npm run pixelmatch:test` | `npm test` |
| Generar el reporte de imágenes (después de `test`) | `npm run pixelmatch:report` | `npm run report` |
| Ver el reporte HTML de Playwright | — | `npx playwright show-report` |

El reporte de imágenes queda en `test-results/<carpeta-de-la-prueba>/index.html` dentro del módulo,
junto a las capturas `before-*.png`, `after-*.png` y la diferencia `compare-*.png`.

## Estructura

```plaintext
misw-4103-pixelmatch/
├── .nvmrc
├── package.json
├── abp.cjs                # lee la configuración de la aplicación bajo pruebas (.env)
├── playwright.config.js   # configuración de Playwright Test
├── vrt.config.js          # opciones de pixelmatch
├── index.js               # genera el reporte HTML de imágenes
├── public/index.css       # estilos del reporte
└── e2e/
    └── example.spec.js    # ejemplo incluido
```

`test-results/` y `playwright-report/` están en el `.gitignore`, igual que todos los `*.png` y
`*.html` del módulo.

## Configuración

La URL de las dos versiones y el administrador de la aplicación bajo pruebas (ABP) están en el
archivo `.env` de la raíz del repositorio, el mismo que usa `npm run abp:up` para desplegar Ghost. No
los copien en el módulo: `abp.cjs` lee ese archivo. Las variables disponibles son `ABP_URL` (versión
base), `ABP_RC_URL` (versión nueva), `ABP_ADMIN_NAME`, `ABP_ADMIN_EMAIL` y `ABP_ADMIN_PASSWORD`. Una
variable de entorno con el mismo nombre tiene prioridad sobre el `.env`; fuera de un repositorio del
proyecto (sin `.env`) se usan los valores por defecto de `abp.cjs`. Las pruebas importan las variables así:

```javascript
import abp from "../abp.cjs";

await page.goto(`${abp.ABP_RC_URL}/ghost/`);
```

- **`playwright.config.js`**: `use.baseURL` es `ABP_URL`, la versión base de la aplicación
  (`page.goto("/ghost/")`); `outputDir` es `./test-results`; solo se usa Chromium.
- **`vrt.config.js`**: opciones que se pasan a `pixelmatch`:
  - `threshold` (0 a 1): sensibilidad por píxel; valores menores detectan diferencias más pequeñas.
  - `includeAA`: si es `true`, los píxeles de _antialiasing_ también cuentan como diferencia.
  - `alpha`: opacidad de la imagen original en el fondo de la imagen de diferencias.
  - `aaColor` y `diffColor`: colores con los que se pintan el _antialiasing_ y las diferencias.

## Ejemplo incluido

`e2e/example.spec.js` abre la página de registro del demo
[angular-6-registration-login-example](https://angular-6-registration-login-example.stackblitz.io) alojado en StackBlitz (no la ABP), inicia el proyecto
y toma una captura; llena el formulario con el nombre, el correo y la contraseña de `ABP_ADMIN_*`,
toma otra captura y las compara con `pixelmatch`. `report` arma una página con las tres imágenes.
Muestra cómo usar las credenciales del `.env` sin resolver las pruebas del proyecto.

El ejemplo **no tiene aserciones**: siempre pasa y sirve para ver el flujo completo. En sus pruebas
usen el valor que retorna `pixelmatch` (cantidad de píxeles distintos) para decidir si hay una
regresión, y comparen la misma página en las dos versiones de la aplicación (`ABP_URL` y
`ABP_RC_URL`).

## Solución de problemas

- **`Executable doesn't exist at …`**: falta el navegador; ejecuten `npm run pixelmatch:prepare`.
- **`Image sizes do not match`**: pixelmatch solo compara imágenes del mismo tamaño; usen el mismo
  _viewport_ (y `fullPage` igual) en las dos capturas.
- **`No test result folders found`** al generar el reporte: ejecuten antes `pixelmatch:test`. Si
  cambian el nombre del archivo, del `describe` o de la prueba, actualicen `OUTPUT_FOLDER_PREFIX` en
  `index.js`, porque Playwright nombra la carpeta de resultados con ellos.
- **Al fallar una prueba la terminal se queda esperando**: Playwright abrió su reporte HTML; usen
  `Ctrl+C` o definan `PW_TEST_HTML_REPORT_OPEN=never`.
- **Advertencia `EBADENGINE`**: están usando una versión de Node.js anterior a la 24.

## Referencias

- [pixelmatch](https://github.com/mapbox/pixelmatch)
- [Capturas de pantalla en Playwright](https://playwright.dev/docs/screenshots)
- [Documentación de Playwright Test](https://playwright.dev/docs/intro)
