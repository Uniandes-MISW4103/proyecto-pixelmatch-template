# Proyecto Base: Pruebas Visual Regression Testing (VRT) con Pixelmatch

[PixelMatch](https://github.com/mapbox/pixelmatch/blob/main/README.md) es una biblioteca de JavaScript para la comparación de imágenes a nivel de píxel, especialmente diseñada para detectar diferencias entre imágenes, por ejemplo, en pruebas de regresión. Es rápida y eficiente, trabajando con arrays de datos de imágenes y no dependiente de otras bibliotecas.

## Caracteristicas Principles

_Comparación de imágenes:_
Permite comparar dos imágenes y determinar si hay diferencias entre ellas.

_A nivel de píxel:_
Analiza cada píxel individualmente para detectar diferencias.

_Para pruebas:_
Ideal para comparar imágenes en pruebas de regresión, donde se busca detectar cambios no deseados.

_Rápida y eficiente:_
Diseñada para ser rápida y no depender de otras bibliotecas, lo que la hace adecuada para pruebas automatizadas.

## Detalles adicionales

_Funciones de comparación:_
Incluye funciones para comparar imágenes basadas en la percepción del color (métricas de color perceptual) y para detectar píxeles antialiased.

_Uso en pruebas automatizadas:_
Es común encontrarla en pruebas de integración continua, donde se comparan capturas de pantalla para asegurar que no haya cambios inesperados.

_Implementación:_
Es una biblioteca relativamente pequeña y simple, con una implementación en alrededor de 120 líneas de código.

_Versatilidad:_
Puede ser utilizada tanto en entornos de navegador como en entornos Node.js.

## Requisitos Básicos

- Node.js (versión 22 o superior). Recomendamos utilizar la versión `lts/jod`.
- npm para la gestión de dependencias.

## Instalación

Desde la **raíz del repositorio**:

```bash
npm run pixelmatch:install
npm run pixelmatch:prepare
```

O bien, desde el directorio del módulo:

```bash
npm install
npm run prepare
```

## Ejecución de Pruebas VRT

Desde la **raíz del repositorio**:

- Para ejecutar las pruebas en modo headless con Chromium (navegador por defecto):

  ```bash
  npm run pixelmatch:test
  ```

- Para ver el reporte HTML de Playwright una vez termine la ejecución:

  ```bash
  npx playwright show-report
  ```

- Para generar el reporte básico con las imágenes comparadas (ejecutar después de `pixelmatch:test`):

  ```bash
  npm run pixelmatch:report
  ```

> **Nota:** El módulo usa `"type": "module"` (ES Modules) dado que `playwright.config.js` y `index.js` utilizan la sintaxis `import`/`export`.
