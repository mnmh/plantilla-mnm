# [Museo de Memoria Histórica](http://museodememoria.gov.co)

> **AVISO:** Esta plantilla esta en desarrollo y no representa un producto final del equipo virtual del MNM. El MNM y el CNMH no se responsabilizan por el uso que se le de ni de lo que resulte de este.

## Estructura de la carpeta raíz

    ├── assets/                  # Partes del tema separados por archivos
        ├── css/                 # Carpeta con los archivos SCSS para el estilo
        ├── bloques/             # Archivos PHP con los bloques usados en la plataforma
        └── template-parts/      # Carpeta con los archivos PHP para cada parte de la estructura
    ├── fonts/                   # Fuentes con los iconos de la página
    ├── img/                     # Imágenes del tema
    ├── includes/                # Funciones del tema, organizadas por archivos, todas se importan al archivo functions.php
    ├── js/                      # Javascript de la página
    ├── languages/
    ├── functions.php            # Funciones del tema, archivo raíz
    └── page.php                 # Plantilla para todos los módulos. Aqui se cargan los bloques.

## Estructura de la carpeta /assets/bloques

    └── bloques/
        ├── bloque-carrousel-verticales.php             # Carrousel con cuadros verticales
        ├── bloque-carrousel-botones.php                # Carrousel de botones
        ├── bloque-carrousel-cuadros.php                # Carrousel de cuadros
        ├── bloque-banner-texto.php                     # Carrousel banner con texto
        ├── bloque-linea-tiempo.php                     # Linea del tiempo
        ├── bloque-lista-tarjetas.php                   # Listado de tarjetas (videos y galerías)
        └── bloque-botones.php                          # Botones

- [x] Carrousel con cuadros verticales
- [x] Carrousel con cuadros de noticias
- [x] Banner con texto
- [ ] Banner con tarjetas (banner prototipo) // pendiente nueva versión
- [x] Banner con botones
- [x] Lista de tarjetas
- [x] Lista de tarjetas con filtro
- [x] Linea del tiempo
- [x] Carrousel botones

## Estructura de la carpeta /assets/css/bloques

    └── bloques/
        ├── banner-texto.scss                       # Estilo banner texto
        ├── banner-botones.scss                     # Estilo banner botones
        └── carrousel-verticales.scss               # Estilo carrousel vertical
        └── carrousel-cuadros.scss                  # Estilo carrousel cuadros
        └── carrousel-botones.scss                  # Estilo carrousel botones
        └── linea-tiempo.scss                       # Estilo linea del tiempo
        └── lista-tarjetas.scss                     # Estilo listado de tarjetas
        └── carrousel-botones.scss                  # Estilo carrousel botones

## Estructura de la carpeta /assets/template-parts

    └── template-parts/
        ├── head.php                    # Contenido del HEAD
        └── top_header.php              # Menu superior transversal a toda la página

## Estructura de la carpeta /js

    └── js/
        ├── lib/
        |    └── flickity.js                    # Librería flickity
        ├── bloques/
        |    └── carrousel-vertical.js          # Scripts para el bloque carrousel vertical
        |    └── carrousel-botones.js           # Scripts para el bloque carrousel botones
        |    └── linea-tiempo.js                # Scripts para el bloque linea del tiempo
        |    └── lista-tarjetas.js              # Scripts para el bloque lista-tarjetas
        |    └── banner-botones.js              # Scripts para el banner con botones
        └── scripts.js                          # Scripts generales de la plataforma

## Scripts para desarollo

La plantilla usa el compilador para SASS de NODE.js
Para usarlo en el terminal, se debe primero instalar las dependencias:

```bash
npm install
```

Al momento del desarrollo, hay dos opciones. La primera compilar el CSS una vez:

```bash
npm run css
```

O activar el watch para que se actualice auntomaticamente cada vez que detecta cambios en los archivos de la carpeta:

```bash
npm run watch
```
