
# Proyecto Base: Pruebas Visual Regression Testing (VRT) con Pixelmatch

[PixelMatch](https://github.com/mapbox/pixelmatch/blob/main/README.md) es una biblioteca de JavaScript para la comparación de imágenes a nivel de píxel, especialmente diseñada para detectar diferencias entre imágenes, por ejemplo, en pruebas de regresión. Es rápida y eficiente, trabajando con arrays de datos de imágenes y no dependiente de otras bibliotecas. 

## Caracteristicas Principles:
*Comparación de imágenes:*
Permite comparar dos imágenes y determinar si hay diferencias entre ellas. 

*A nivel de píxel:*
Analiza cada píxel individualmente para detectar diferencias. 

*Para pruebas:*
Ideal para comparar imágenes en pruebas de regresión, donde se busca detectar cambios no deseados. 

*Rápida y eficiente:*
Diseñada para ser rápida y no depender de otras bibliotecas, lo que la hace adecuada para pruebas automatizadas. 

## Detalles adicionales:

*Funciones de comparación:*
Incluye funciones para comparar imágenes basadas en la percepción del color (métricas de color perceptual) y para detectar píxeles antialiased. 

*Uso en pruebas automatizadas:*
Es común encontrarla en pruebas de integración continua, donde se comparan capturas de pantalla para asegurar que no haya cambios inesperados. 

*Implementación:*
Es una biblioteca relativamente pequeña y simple, con una implementación en alrededor de 120 líneas de código. 

*Versatilidad:*
Puede ser utilizada tanto en entornos de navegador como en entornos Node.js. 

## Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- npm o yarn para la gestión de dependencias.

## Instalación

Instala las dependencias necesarias utilizando npm:

```bash
npm install
```

## Ejecución de Pruebas VRT

Puedes ejecutar las pruebas en modo headless para Chrome, Firefox y Electron

- Para ejecutar las pruebas en modo headless:

    ```bash
    npm run test
    ```

- Para ver los resultados de las pruebas uan vez termine la ejecucion:

  ```bash
  npx playwright show-report
  ```

- Para generar el reporte básico con la generación de imágenes

  ```bash
  npm run report
  ```