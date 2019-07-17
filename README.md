# [Museo de Memoria Histórica](http://museodememoria.gov.co)

## Estructura de la carpeta raíz

    ├── assets/                  # Partes del tema separados por archivos
        ├── css/                 # Carpeta con los archivos SCSS para el estilo
        ├── bloques/             # Archivos PHP con los bloques usados en la plataforma
        └── template-parts/      # Carpeta con los archivos PHP para cada parte del estilo
    ├── fonts/                   # Fuentes con los iconos de la página
    ├── img/                     # Imágenes del tema
    ├── includes/                # Funciones del tema, organizadas por archivos, todas se importan al archivo functions.php
    ├── js/                      # Javascript de la página
    ├── languages/
    ├── functions.php            # Funciones del tema, archivo raíz
    └── page.php                 # Plantilla para todos los módulos. Aqui se cargan los bloques.

## Estructura de la carpeta /assets/bloques

// TODO

- [ ] Carrousel con cuadros
- [ ] Carrousel de cabezote
- [ ] Noticias recientes
- [ ] Bloque con los botones
- [ ] Galería con filtro
- [ ] Cabezote con botones

## Estructura de la carpeta /assets/css

// TODO

## Estructura de la carpeta /assets/template-parts

    └── template-parts/
        ├── head.php # Contenido del HEAD
        └── top_header.php # Menu superior transversal a toda la página

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
