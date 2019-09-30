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
        ├── bloque-banner-botones.php                   # Carrousel con cuadros verticales
        ├── bloque-banner-carrousel-margenes.php        # Carrousel con cuadros verticales
        ├── bloque-banner-carrousel.php                 # Carrousel con cuadros verticales
        ├── bloque-banner-tarjetas-audio.php            # Carrousel con cuadros verticales
        ├── bloque-banner-texto.php                     # Carrousel con cuadros verticales
        ├── bloque-bloque-agenda.php                    # Carrousel con cuadros verticales
        ├── bloque-bloque-banner-cita-imagen.php        # Carrousel con cuadros verticales
        ├── bloque-bloque-banner-corto-texto.php        # Carrousel con cuadros verticales
        ├── bloque-bloque-equipo.php                    # Carrousel con cuadros verticales
        ├── bloque-bloque-header-columna.php            # Carrousel con cuadros verticales
        ├── bloque-bloque-personajes.php                # Carrousel de botones
        ├── bloque-carrousel-botones.php                # Carrousel de botones
        ├── bloque-carrousel-cuadros.php                # Carrousel de cuadros
        ├── bloque-carrousel-verticales.php             # Carrousel de cuadros
        ├── bloque-cifra.php                            # Carrousel de cuadros
        ├── bloque-galeria-carrousel.php                # Imagen con botones
        ├── bloque-imagen-botones.php                   # Imagen con botones
        ├── bloque-linea-tiempo.php                     # Linea del tiempo
        ├── bloque-lista-tarjetas.php                   # Listado de tarjetas (videos y galerías)
        ├── bloque-listado-noticias.php                 # Listado de tarjetas (videos y galerías)
        ├── bloque-testimonios-carrousel.php            # Listado de tarjetas (videos y galerías)
        ├── bloque-tres-botones-segunda.php             # Listado de tarjetas (videos y galerías)
        └── bloque-tres-botones.php                     # Botones

### bloque-banner-botones

### bloque-banner-carrousel-margenes

## Estructura de la carpeta /assets/template-parts

    └── template-parts/
        ├── head.php                    # Contenido del HEAD
        ├── sideMenu.php                # Menu lateral
        └── top_header.php              # Menu superior transversal a toda la página

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
