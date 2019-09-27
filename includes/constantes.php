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
define("VOCES", get_permalink(2165));
define("VOCESMEDALLO", get_permalink(3107));
define("SOBRE_LA_EXPO", get_permalink(2326));


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

?>