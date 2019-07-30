<?php

// Este archivo define los scripts JS que se cargan a la página

add_action('init', 'header_scripts');

function header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        // Cargar librerias
        wp_register_script('flickity', get_template_directory_uri() . '/js/lib/flickity.js', array('jquery'), '1.0.0');
        wp_enqueue_script('flickity');

        wp_register_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', array('jquery'), '1.0.0');
        wp_enqueue_script('gsap');

        // Cargar scripts de los bloques
        wp_register_script('carrousel-vertical', get_template_directory_uri() . '/js/bloques/carrousel-vertical.js', array('jquery'), '1.0.0');
        wp_enqueue_script('carrousel-vertical');

        wp_register_script('banner-botones', get_template_directory_uri() . '/js/bloques/banner-botones.js', array('jquery'), '1.0.0');
        wp_enqueue_script('banner-botones');

        wp_register_script('carrousel-botones', get_template_directory_uri() . '/js/bloques/carrousel-botones.js', array('jquery'), '1.0.0');
        wp_enqueue_script('carrousel-botones');

        wp_register_script('lista-tarjetas', get_template_directory_uri() . '/js/bloques/lista-tarjetas.js', array('jquery'), '1.0.0');
        wp_enqueue_script('lista-tarjetas');

        wp_register_script('linea-tiempo', get_template_directory_uri() . '/js/bloques/linea-tiempo.js', array('jquery'), '1.0.0');
        wp_enqueue_script('linea-tiempo');

        wp_register_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0.0');
        wp_enqueue_script('scripts');
    }
}

?>