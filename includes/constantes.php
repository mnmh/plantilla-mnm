<?php

// Este archivo define las constantes que se cargan al tema

define("EDUCACION", get_permalink(4796));
define("ALCANCE", get_permalink(73));
define("ARQUITECTURA", get_permalink(65));
define("BIENVENIDOS", get_permalink(61));
define("PUBLICACIONES", get_permalink(82));
define("EQUIPO", get_permalink(39));
define("CURADURIA", get_permalink(87));
define("LABORATORIO", get_permalink(85));
define("PROGRAMACION", get_permalink(4466));
define("ARTE", get_blogInfo('url') . '/arte-y-cultura');

define("PROYECTO", get_permalink(4519));
define("OBRA", get_blogInfo('url') . '/obras');
define("PLANMUSEO", get_permalink(4642));
define("EDIFICIO", get_permalink(4588));

define("NINOS", get_permalink(53));
define("PROGRAMA_EDU", get_permalink(51));

define("AGRADECIMIENTOS", get_permalink(1231));
define("VOCES", get_permalink(8448));
define("VOCESMEDALLO", get_permalink(3107));
define("SOBRE_LA_EXPO", get_permalink(2326));

define("DIMEN", get_permalink(8629));
define("INFORMATE", get_permalink(5937));


function elimina_acentos($text) {
    $text = htmlentities($text, ENT_QUOTES, 'UTF-8');
    $text = strtolower($text);
    $patron = array (
        // Espacios, puntos y comas por guion
        //'/[\., ]+/' => ' ',

        // Vocales
        '/\+/' => '',
        '/&agrave;/' => 'a',
        '/&egrave;/' => 'e',
        '/&igrave;/' => 'i',
        '/&ograve;/' => 'o',
        '/&ugrave;/' => 'u',

        '/&aacute;/' => 'a',
        '/&eacute;/' => 'e',
        '/&iacute;/' => 'i',
        '/&oacute;/' => 'o',
        '/&uacute;/' => 'u',

        '/&acirc;/' => 'a',
        '/&ecirc;/' => 'e',
        '/&icirc;/' => 'i',
        '/&ocirc;/' => 'o',
        '/&ucirc;/' => 'u',

        '/&atilde;/' => 'a',
        '/&etilde;/' => 'e',
        '/&itilde;/' => 'i',
        '/&otilde;/' => 'o',
        '/&utilde;/' => 'u',

        '/&auml;/' => 'a',
        '/&euml;/' => 'e',
        '/&iuml;/' => 'i',
        '/&ouml;/' => 'o',
        '/&uuml;/' => 'u',

        '/&auml;/' => 'a',
        '/&euml;/' => 'e',
        '/&iuml;/' => 'i',
        '/&ouml;/' => 'o',
        '/&uuml;/' => 'u',

        // Otras letras y caracteres especiales
        '/&aring;/' => 'a',
        '/&ntilde;/' => 'n',

        // Agregar aqui mas caracteres si es necesario

    );

    $text = preg_replace(array_keys($patron),array_values($patron),$text);
    return $text;
}

function darMesEspanol($mes){
    if($mes == 'April')
        $mes = 'Abril';
    elseif($mes == 'May')
        $mes = 'Mayo';
    elseif($mes == 'September')
        $mes = 'Septiembre';
    elseif($mes == 'October')
        $mes = 'Octubre';

    return $mes;
}

function darDiaEspanol($dia){
    if($dia == 'Mon')
        $dia = 'Lun';
    elseif($dia == 'Tue')
        $dia = 'Mar';
    elseif($dia == 'Wed')
        $dia = 'Mie';
    elseif($dia == 'Thu')
        $dia = 'Jue';
    elseif($dia == 'Fri')
        $dia = 'Vie';
    elseif($dia == 'Sat')
        $dia = 'Sab';
    elseif($dia == 'Sun')
        $dia = 'Dom';

    return $dia;
}

function getVimeoId($url)
{
    if (preg_match('#(?:https?://)?(?:www.)?(?:player.)?vimeo.com/(?:[a-z]*/)*([0-9]{6,11})[?]?.*#', $url, $m)) {
        return $m[1];
    }
    return false;
}

function getYoutubeId($url)
{
    $parts = parse_url($url);
    if (isset($parts['host'])) {
        $host = $parts['host'];
        if (
            false === strpos($host, 'youtube') &&
            false === strpos($host, 'youtu.be')
        ) {
            return false;
        }
    }
    if (isset($parts['query'])) {
        parse_str($parts['query'], $qs);
        if (isset($qs['v'])) {
            return $qs['v'];
        }
        else if (isset($qs['vi'])) {
            return $qs['vi'];
        }
    }
    if (isset($parts['path'])) {
        $path = explode('/', trim($parts['path'], '/'));
        return $path[count($path) - 1];
    }
    return false;
}


function wpse_287931_register_categories_names_field() {

    register_rest_field( 'obras',
        'disciplina_names',
        array(
            'get_callback'    => 'wpse_287931_get_disciplina_names',
            'update_callback' => null,
            'schema'          => null,
        )
    );

    register_rest_field( 'obras',
        'autores_names',
        array(
            'get_callback'    => 'wpse_287931_get_autores_names',
            'update_callback' => null,
            'schema'          => null,
        )
    );

    register_rest_field( 'obras',
        'autores',
        array(
            'get_callback'    => 'wpse_287931_get_autores',
            'update_callback' => null,
            'schema'          => null,
        )
    );

    register_rest_field( 'obras',
        'disciplinas',
        array(
            'get_callback'    => 'wpse_287931_get_disciplinas',
            'update_callback' => null,
            'schema'          => null,
        )
    );

    register_rest_field( 'obras',
        'disciplinas_rgb',
        array(
            'get_callback'    => 'wpse_287931_get_disciplinas_rgb',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

add_action( 'rest_api_init', 'wpse_287931_register_categories_names_field' );

function wpse_287931_get_disciplina_names( $object, $field_name, $request ) {

    $formatted_categories = array();

    $categories = wp_get_post_terms( $object['id'] , 'disciplina');

    foreach ($categories as $category) {
        $formatted_categories[] = $category->name;
    }

    return $formatted_categories;
}

function wpse_287931_get_disciplinas_rgb( $object, $field_name, $request ) {

    $formatted_categories = array();

    $categories = wp_get_post_terms( $object['id'] , 'disciplina');

    foreach ($categories as $category) {
        $term_color = get_field('color', $category);
        list($r, $g, $b) = sscanf($term_color, "#%02x%02x%02x");
        $formatted_categories[] = 'rgb(' . $r . ',' . $g . ',' . $b . ')';
    }

    return $formatted_categories;
}

function wpse_287931_get_autores_names( $object, $field_name, $request ) {

    $formatted_categories = array();

    $categories = wp_get_post_terms( $object['id'] , 'autor');

    foreach ($categories as $category) {
        $formatted_categories[] = $category->name;
    }

    return $formatted_categories;
}

function wpse_287931_get_autores( $object, $field_name, $request ) {

    $formatted_categories = array();

    $categories = wp_get_post_terms( $object['id'] , 'autor');

    foreach ($categories as $category) {
        $formatted_categories[] = $category->term_id;
    }

    return $formatted_categories;
}

function wpse_287931_get_disciplinas( $object, $field_name, $request ) {

    $formatted_categories = array();

    $categories = wp_get_post_terms( $object['id'] , 'disciplina');

    foreach ($categories as $category) {
        $formatted_categories[] = $category->term_id;
    }

    return $formatted_categories;
}

function wedevs_cpt_sticky_at_top( $posts ) {

    // apply the magic on post archive only
    if ( is_main_query() && is_post_type_archive() ) {
        global $wp_query;

        $sticky_posts = get_option( 'sticky_posts' );
        $num_posts = count( $posts );
        $sticky_offset = 0;

        // loop through the post array and find the sticky post
        for ($i = 0; $i < $num_posts; $i++) {

            // Put sticky posts at the top of the posts array
            if ( in_array( $posts[$i]->ID, $sticky_posts ) ) {
                $sticky_post = $posts[$i];

                // Remove sticky from current position
                array_splice( $posts, $i, 1 );

                // Move to front, after other stickies
                array_splice( $posts, $sticky_offset, 0, array($sticky_post) );
                $sticky_offset++;

                // Remove post from sticky posts array
                $offset = array_search($sticky_post->ID, $sticky_posts);
                unset( $sticky_posts[$offset] );
            }
        }

        // Fetch sticky posts that weren't in the query results
        if ( !empty( $sticky_posts) ) {

            $stickies = get_posts( array(
                'post__in' => $sticky_posts,
                'post_type' => $wp_query->query_vars['post_type'],
                'post_status' => 'publish',
                'nopaging' => true
            ) );

            foreach ( $stickies as $sticky_post ) {
                array_splice( $posts, $sticky_offset, 0, array( $sticky_post ) );
                $sticky_offset++;
            }
        }

    }

    return $posts;
}


?>