<?php

// Este archivo define las constantes que se cargan al tema

define("EDUCACION", get_permalink(46));
define("ALCANCE", get_permalink(73));
define("ARQUITECTURA", get_permalink(65));
define("BIENVENIDOS", get_permalink(61));
define("PUBLICACIONES", get_permalink(82));
define("EQUIPO", get_permalink(39));
define("CURADURIA", get_permalink(87));
define("LABORATORIO", get_permalink(85));
define("PROGRAMACION", get_blogInfo('url') . '/programacion');
define("ARTE", get_blogInfo('url') . '/arte-y-cultura');

define("PROYECTO", get_permalink(4403));
define("OBRA", get_blogInfo('url') . '/obras');
define("CONCURSO", get_permalink(67));
define("EDIFICIO", get_permalink(69));

define("NINOS", get_permalink(53));
define("PROGRAMA_EDU", get_permalink(51));

define("AGRADECIMIENTOS", get_permalink(1231));
define("VOCES", get_permalink(4433));
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

?>