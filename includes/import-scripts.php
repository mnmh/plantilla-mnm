<?php

// Este archivo define los scripts JS que se cargan a la página

add_action('init', 'header_scripts');

function header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        // Cargar librerias
        wp_register_script('flickity', get_template_directory_uri() . '/js/lib/flickity.js', array('jquery'), '1.0.0');
        wp_enqueue_script('flickity');

        wp_register_script('gsap', get_template_directory_uri() . '/js/lib/gsap.js', array('jquery'), '1.0.0');
        wp_enqueue_script('gsap');

        wp_register_script('d3', get_template_directory_uri() . '/js/lib/d3.js', array('jquery'), '1.0.0');
        wp_enqueue_script('d3');

        wp_register_script('scrollto', get_template_directory_uri() . '/js/lib/scrollto.js', array('jquery'), '1.0.0');
        wp_enqueue_script('scrollto');

        wp_register_script('scroll', get_template_directory_uri() . '/js/lib/scroll.js', array('jquery'), '1.0.0');
        wp_enqueue_script('scroll');

        wp_register_script('scroll-gsap', get_template_directory_uri() . '/js/lib/scroll-plugin.js', array('jquery'), '1.0.0');
        wp_enqueue_script('scroll-gsap');

        // Cargar componentes generales
        wp_register_script('menu', get_template_directory_uri() . '/js/common/menu.js', array('jquery'), '1.0.0');
        wp_enqueue_script('menu');

        wp_register_script('listadoMenu', get_template_directory_uri() . '/js/common/listadoMenu.js', array('jquery'), '1.0.0');
        wp_enqueue_script('listadoMenu');

        // Cargar elementos
        wp_register_script('arte-cultura', get_template_directory_uri() . '/js/elementos/arte-cultura.js', array('jquery'), '1.0.0');
        wp_enqueue_script('arte-cultura');

        wp_register_script('caminando-memoria', get_template_directory_uri() . '/js/elementos/caminando-memoria.js', array('jquery'), '1.0.0');
        wp_enqueue_script('caminando-memoria');

        wp_register_script('recorridovirtual', get_template_directory_uri() . '/assets/js/index.js', array('jquery'), '1.0.0');
        wp_enqueue_script('recorridovirtual');

        // Cargar scripts de los bloques
        wp_register_script('carrousel-vertical', get_template_directory_uri() . '/js/bloques/carrousel-vertical.js', array('jquery'), '1.0.0');
        wp_enqueue_script('carrousel-vertical');

        wp_register_script('banner-botones', get_template_directory_uri() . '/js/bloques/banner-botones.js', array('jquery'), '1.0.0');
        wp_enqueue_script('banner-botones');

        wp_register_script('banner-ejes', get_template_directory_uri() . '/js/bloques/banner-ejes.js', array('jquery'), '1.0.0');
        wp_enqueue_script('banner-ejes');

        wp_register_script('banner-carrousel', get_template_directory_uri() . '/js/bloques/banner-carrousel.js', array('jquery'), '1.0.0');
        wp_enqueue_script('banner-carrousel');

        wp_register_script('carrousel-botones', get_template_directory_uri() . '/js/bloques/carrousel-botones.js', array('jquery'), '1.0.0');
        wp_enqueue_script('carrousel-botones');

        wp_register_script('lista-tarjetas', get_template_directory_uri() . '/js/bloques/lista-tarjetas.js', array('jquery'), '1.0.0');
        wp_enqueue_script('lista-tarjetas');

        wp_register_script('linea-tiempo', get_template_directory_uri() . '/js/bloques/linea-tiempo.js', array('jquery'), '1.0.0');
        wp_enqueue_script('linea-tiempo');

        wp_register_script('galeria-carrousel', get_template_directory_uri() . '/js/bloques/galeria-carrousel.js', array('jquery'), '1.0.0');
        wp_enqueue_script('galeria-carrousel');

        wp_register_script('citas-container', get_template_directory_uri() . '/js/bloques/citas-container.js', array('jquery'), '1.0.0');
        wp_enqueue_script('citas-container');

        wp_register_script('bloque-equipo', get_template_directory_uri() . '/js/bloques/bloque-equipo.js', array('jquery'), '1.0.0');
        wp_enqueue_script('bloque-equipo');

        wp_register_script('slider-columnas', get_template_directory_uri() . '/js/bloques/slider-columnas.js', array('jquery'), '1.0.0');
        wp_enqueue_script('slider-columnas');

        wp_register_script('reproductor-audio', get_template_directory_uri() . '/js/bloques/reproductor-audio.js', array('jquery'), '1.0.0');
        wp_enqueue_script('reproductor-audio');

        wp_register_script('animaciones', get_template_directory_uri() . '/js/common/animaciones.js', array('jquery'), '1.0.0');
        wp_enqueue_script('animaciones');

        wp_register_script('agenda', get_template_directory_uri() . '/js/bloques/agenda.js', array('jquery'), '1.0.0');
        wp_enqueue_script('agenda');

        wp_register_script('accesibilidad', get_template_directory_uri() . '/js/common/accesibilidad.js', array('jquery'), '1.0.0');
        wp_enqueue_script('accesibilidad');

        // wp_register_script('cc-busqueda', get_template_directory_uri() . '/js/elementos/cc-busqueda.js', array('jquery'), '1.0.0');
        // wp_enqueue_script('cc-busqueda');

        wp_register_script('cc-contenido', get_template_directory_uri() . '/js/elementos/cc-contenido.js', array('jquery'), '1.0.0');
        wp_enqueue_script('cc-contenido');

        wp_register_script('cc-generales', get_template_directory_uri() . '/js/elementos/cc-generales.js', array('jquery'), '1.0.0');
        wp_enqueue_script('cc-generales');

        wp_register_script('it2020', get_template_directory_uri() . '/js/elementos/it2020.js', array('jquery'), '1.0.0');
        wp_enqueue_script('it2020');

        wp_register_script('bloque-navscroll', get_template_directory_uri() . '/js/bloques/bloque-navscroll.js', array('jquery'), '1.0.0');
        wp_enqueue_script('bloque-navscroll');

        wp_register_script('imagen-zoom', get_template_directory_uri() . '/js/bloques/imagen-zoom.js', array('jquery'), '1.0.0');
        wp_enqueue_script('imagen-zoom');

        wp_register_script('bloque-acordeon', get_template_directory_uri() . '/js/bloques/bloque-acordeon.js', array('jquery'), '1.0.0');
        wp_enqueue_script('bloque-acordeon');

        // wp_register_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0.0');
        // wp_enqueue_script('scripts');
    }
}

?>