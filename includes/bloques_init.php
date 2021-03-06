<?php

add_action('acf/init', 'my_acf_init');

function my_acf_init() {
	
	if( function_exists('acf_register_block') ) {

		// Carrousel con cuadros verticales (perfil equipo y con enlace)
		acf_register_block(array(
			'name'				=> 'carrousel_verticales',
			'title'				=> __('Carrousel con cuadros verticales'),
			'description'		=> __('Un bloque para agregar un carrousel de cuadros verticales'),
			'render_callback'	=> 'bloque_callback_carrousel_verticales',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'carrousel', 'enlaces', 'vertical' ),
		));

		// Carrousel con cuadros
		acf_register_block(array(
			'name'				=> 'carrousel_cuadros',
			'title'				=> __('Carrousel con cuadros'),
			'description'		=> __('Un bloque para agregar un carrousel de cuadros'),
			'render_callback'	=> 'bloque_callback_carrousel_cuadros',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'carrousel', 'enlaces', 'noticias' ),
		));

		// Banner con texto
		acf_register_block(array(
			'name'				=> 'banner_texto',
			'title'				=> __('Banner con texto'),
			'description'		=> __('Un bloque para agregar un banner con texto'),
			'render_callback'	=> 'bloque_callback_banner_texto',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner' ),
		));

		// Banner con botones
		acf_register_block(array(
			'name'				=> 'banner_botones',
			'title'				=> __('Banner con botones'),
			'description'		=> __('Un bloque para agregar un banner con botones'),
			'render_callback'	=> 'bloque_callback_banner_botones',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner' ),
		));
        
        //Carrousel de botones
		acf_register_block(array(
			'name'				=> 'carrousel_botones',
			'title'				=> __('Carrousel botones'),
			'description'		=> __('Un bloque para agregar botones en un carrousel'),
			'render_callback'	=> 'bloque_callback_botones',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'botones', 'enlaces' ),
		));

		// Bloque tres botones
		acf_register_block(array(
			'name'				=> 'tres_botones',
			'title'				=> __('Tres botones'),
			'description'		=> __('Un bloque para tres botones'),
			'render_callback'	=> 'bloque_callback_tres_botones',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'botones', 'imagen' ),
		));

		// Bloque tres botones segunda version
		acf_register_block(array(
			'name'				=> 'tres_botones_segunda',
			'title'				=> __('Tres botones segunda version'),
			'description'		=> __('Un bloque para tres botones'),
			'render_callback'	=> 'bloque_callback_tres_botones_segunda',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'botones', 'imagen' ),
		));

		// Bloque de lista de tarjetas
		acf_register_block(array(
			'name'				=> 'lista_tarjetas',
			'title'				=> __('Lista tarjetas'),
			'description'		=> __('Un bloque para agregar una lista de tarjetas'),
			'render_callback'	=> 'bloque_callback_lista_tarjetas',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'lista', 'tarjetas' ),
		));

		// Bloque de linea del tiempo
		acf_register_block(array(
			'name'				=> 'linea_tiempo',
			'title'				=> __('Linea del tiempo'),
			'description'		=> __('Un bloque para agregar una linea del tiempo'),
			'render_callback'	=> 'bloque_callback_linea_tiempo',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'linea', 'tiempo' ),
		));

		// Bloque de banner tarjetas audio
		acf_register_block(array(
			'name'				=> 'banner_tarjetas_audio',
			'title'				=> __('Banner ejes audio'),
			'description'		=> __('Un bloque para agregar un banner con audios de cada eje'),
			'render_callback'	=> 'bloque_callback_banner_ejes',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'ejes', 'audio' ),
		));

		// Bloque banner con carrousel
		acf_register_block(array(
			'name'				=> 'banner_carrousel',
			'title'				=> __('Banner carrousel'),
			'description'		=> __('Un bloque para agregar un banner con carrousel'),
			'render_callback'	=> 'bloque_callback_banner_carrousel',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'carrousel' ),
		));

		// Bloque banner con carrousel
		acf_register_block(array(
			'name'				=> 'banner_carrousel_margenes',
			'title'				=> __('Banner carrousel con márgenes'),
			'description'		=> __('Un bloque para agregar un banner con carrousel y márgenes'),
			'render_callback'	=> 'bloque_callback_banner_carrousel_margenes',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'carrousel', 'margenes' ),
		));

		// Bloque imagen con botones
		acf_register_block(array(
			'name'				=> 'imagen_botones',
			'title'				=> __('Imagen con botones'),
			'description'		=> __('Un bloque para agregar un banner con carrousel'),
			'render_callback'	=> 'bloque_callback_imagen_botones',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'botones', 'imagen' ),
		));

		// Bloque con cifras
		acf_register_block(array(
			'name'				=> 'cifras',
			'title'				=> __('Bloque con cifras'),
			'description'		=> __('Un bloque para agregar cifras'),
			'render_callback'	=> 'bloque_callback_cifras',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'cifras' ),
		));

		// Bloque de galeria en carrousel
		acf_register_block(array(
			'name'				=> 'galeria carrousel',
			'title'				=> __('Bloque de galeria en un carrousel'),
			'description'		=> __('Un bloque para agregar una galeria'),
			'render_callback'	=> 'bloque_callback_galeria_carrousel',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'galeria', 'carrousel' ),
		));

		// Bloque testimonios carrousel
		acf_register_block(array(
			'name'				=> 'testimonios carrousel',
			'title'				=> __('Bloque de testimonios en un carrousel'),
			'description'		=> __('Un bloque para agregar testimonios'),
			'render_callback'	=> 'bloque_callback_testimonios_carrousel',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'testimonios', 'carrousel' ),
		));

		// Bloque agenda
		acf_register_block(array(
			'name'				=> 'bloque agenda',
			'title'				=> __('Bloque agenda'),
			'description'		=> __('Un bloque para mostrar agenda'),
			'render_callback'	=> 'bloque_callback_bloque_agenda',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'agenda', 'calendario' ),
		));

		// Bloque header columna
		acf_register_block(array(
			'name'				=> 'bloque header columna',
			'title'				=> __('Bloque header columna'),
			'description'		=> __('Un bloque para mostrar dos columnas de contenido'),
			'render_callback'	=> 'bloque_callback_bloque_header_columna',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'columna', 'header' ),
		));

		// Bloque Banner cita con imagen
		acf_register_block(array(
			'name'				=> 'bloque banner cita imagen',
			'title'				=> __('Bloque banner cita imagen'),
			'description'		=> __('Un bloque para mostrar una cita y una imagen'),
			'render_callback'	=> 'bloque_callback_bloque_banner_cita_imagen',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'cita', 'imagen' ),
		));

		// Bloque Banner corto con texto
		acf_register_block(array(
			'name'				=> 'bloque banner corto texto',
			'title'				=> __('Bloque banner corto con texto'),
			'description'		=> __('Un bloque para mostrar un texto y una imagen'),
			'render_callback'	=> 'bloque_callback_bloque_banner_corto_texto',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'corto', 'texto', 'imagen'),
		));
		
		// Bloque personajes
		acf_register_block(array(
			'name'				=> 'bloque personajes',
			'title'				=> __('Bloque personajes'),
			'description'		=> __('Un bloque para mostrar un reproductor para la radio'),
			'render_callback'	=> 'bloque_callback_bloque_personajes',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'personajes', 'texto', 'imagen'),
		));

		// Bloque listado noticias
		acf_register_block(array(
			'name'				=> 'listado noticias',
			'title'				=> __('Listado noticias'),
			'description'		=> __('Un bloque para mostrar un listado de noticias'),
			'render_callback'	=> 'bloque_callback_bloque_listado_noticias',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'personajes', 'texto', 'imagen'),
		));

		// Bloque listado noticias
		acf_register_block(array(
			'name'				=> 'listado noticias automatico',
			'title'				=> __('Listado noticias automatico'),
			'description'		=> __('Un bloque para mostrar un listado de noticias automatico'),
			'render_callback'	=> 'bloque_callback_bloque_listado_noticias_auto',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'banner', 'personajes', 'texto', 'imagen'),
		));

		// Bloque equipo
		acf_register_block(array(
			'name'				=> 'bloque equipo',
			'title'				=> __('Bloque equipo'),
			'description'		=> __('Un bloque para mostrar un listado de mediadores'),
			'render_callback'	=> 'bloque_callback_bloque_equipo',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'carrousel', 'equipo', 'listado'),
		));

		// Bloque slider Arte y cultura
		acf_register_block(array(
			'name'				=> 'slider dos columnas',
			'title'				=> __('Bloque slider columna'),
			'description'		=> __('Un bloque para mostrar un slider en arte y cultura'),
			'render_callback'	=> 'bloque_callback_bloque_slider_columnas',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'carrousel', 'slider', 'columna'),
		));

		acf_register_block(array(
			'name'				=> 'titulo modulo',
			'title'				=> __('Bloque titulo modulo'),
			'description'		=> __('Un bloque para mostrar un titulo'),
			'render_callback'	=> 'bloque_callback_bloque_titulo_modulo',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'titulo', 'modulo'),
		));

		acf_register_block(array(
			'name'				=> 'destacados cc',
			'title'				=> __('Bloque destacados cc'),
			'description'		=> __('Un bloque para mostrar un titulo'),
			'render_callback'	=> 'bloque_callback_bloque_destacados_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'destacados', 'cc'),
		));

		acf_register_block(array(
			'name'				=> 'cabezote colores',
			'title'				=> __('Cabezote colores'),
			'description'		=> __('Un bloque para mostar un cabezote con un fondo de color'),
			'render_callback'	=> 'bloque_callback_bloque_cabezote_colores',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'cabezote', 'colores'),
		));

		acf_register_block(array(
			'name'				=> 'cabezote color imagen',
			'title'				=> __('Cabezote color imagen'),
			'description'		=> __('Un bloque para mostar un cabezote con un fondo de color y una imagen'),
			'render_callback'	=> 'bloque_callback_bloque_cabezote_color_imagen',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'cabezote', 'colores'),
		));

		acf_register_block(array(
			'name'				=> 'cabezote color imagen separado',
			'title'				=> __('Cabezote color imagen separado'),
			'description'		=> __('Un bloque para mostar un cabezote con un fondo de color y una imagen'),
			'render_callback'	=> 'bloque_callback_bloque_cabezote_color_imagen_separado',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'cabezote', 'colores'),
		));

		acf_register_block(array(
			'name'				=> 'barra iconos cc',
			'title'				=> __('Iconos CC'),
			'description'		=> __('Un bloque para poner los iconos del CC'),
			'render_callback'	=> 'bloque_callback_iconos_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'iconos', 'cc'),
		));

		acf_register_block(array(
			'name'				=> 'busqueda cc',
			'title'				=> __('Busqueda CC'),
			'description'		=> __('Un bloque para la busqueda del CC'),
			'render_callback'	=> 'bloque_callback_buscar_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'buscar', 'cc'),
		));

		acf_register_block(array(
			'name'				=> 'filtro tipo cc',
			'title'				=> __('Filtro por tipo CC'),
			'description'		=> __('Un bloque para el filtro por tipo del CC'),
			'render_callback'	=> 'bloque_callback_filtro_tipo_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'filtro', 'cc'),
		));

		acf_register_block(array(
			'name'				=> 'filtro tags cc',
			'title'				=> __('Filtro por tags CC'),
			'description'		=> __('Un bloque para el filtro por tags del CC'),
			'render_callback'	=> 'bloque_callback_filtro_tags_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'filtro', 'cc'),
		));

		acf_register_block(array(
			'name'				=> 'Carrousel cc',
			'title'				=> __('Carrousel de contenido CC'),
			'description'		=> __('Un bloque para el Carrousel de contenido del CC'),
			'render_callback'	=> 'bloque_callback_carrousel_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'carrousel', 'cc'),
		));

		acf_register_block(array(
			'name'				=> 'Bloque video youtube',
			'title'				=> __('Un bloque para los videos de youtube'),
			'description'		=> __('Un bloque para los videos de youtube'),
			'render_callback'	=> 'bloque_callback_videos_youtube',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'videos', 'youtube'),
		));

		acf_register_block(array(
			'name'				=> 'Bloque curaduria arte cultura',
			'title'				=> __('Un bloque para las curadurias'),
			'description'		=> __('Un bloque para las curadurias'),
			'render_callback'	=> 'bloque_callback_curaduria',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'curaduria', 'arte y cultura'),
		));

		acf_register_block(array(
			'name'				=> 'Bloque linea del tiempo',
			'title'				=> __('Un bloque para las lineas del tiempo'),
			'description'		=> __('Un bloque para las lineas del tiempo'),
			'render_callback'	=> 'bloque_callback_linea_tiempo_caminando',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'linea del tiempo'),
		));

		acf_register_block(array(
			'name'				=> 'Mapa buscador',
			'title'				=> __('Un bloque para mostrar el mapa del cc'),
			'description'		=> __('Un bloque para mostrar el mapa del cc'),
			'render_callback'	=> 'bloque_callback_mapa_cc',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'cc', 'mapa'),
		));

		acf_register_block(array(
			'name'				=> 'Navegacion scroll',
			'title'				=> __('Un bloque para navegar por scroll a distintos bloques de una misma página'),
			'description'		=> __('Un bloque para navegar por scroll a distintos bloques de una misma página'),
			'render_callback'	=> 'bloque_callback_nav_scroll',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'scroll', 'nav'),
		));

		acf_register_block(array(
			'name'				=> 'Navegacion general',
			'title'				=> __('Un bloque para navegar a otras páginas de una mismo especial'),
			'description'		=> __('Un bloque para navegar a otras páginas de una mismo especial'),
			'render_callback'	=> 'bloque_callback_nav_especiales',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'general', 'especiales', 'nav'),
		));

		acf_register_block(array(
			'name'				=> 'Imagen zoom',
			'title'				=> __('Un bloque cargar una imagen en alta resolución'),
			'description'		=> __('Un bloque cargar una imagen en alta resolución'),
			'render_callback'	=> 'bloque_callback_zoomify',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'zoom', 'imagen'),
		));

		acf_register_block(array(
			'name'				=> 'Pronto bloques',
			'title'				=> __('Un bloque cargar cuadros para contenido por venir'),
			'description'		=> __('Un bloque cargar cuadros para contenido por venir'),
			'render_callback'	=> 'bloque_callback_pronto_bloques',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'pronto', 'imagen'),
		));

		/*
		ITINERANCIA 2020
		*/
		acf_register_block(array(
			'name'				=> 'Mapa sanaciones',
			'title'				=> __('Mapa sanaciones'),
			'description'		=> __('Un bloque que carga el mapa de sanaciones para la exposición 2020'),
			'render_callback'	=> 'bloque_callback_it2020_mapa_sanaciones',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'mapa', 'itinerancia'),
		));

		acf_register_block(array(
			'name'				=> 'Mapa bot',
			'title'				=> __('Mapa bot'),
			'description'		=> __('Un bloque que carga el mapa de las entradas al bot de whatsapp'),
			'render_callback'	=> 'bloque_callback_it2020_mapa_bot',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'mapa', 'bot', 'itinerancia'),
		));

		acf_register_block(array(
			'name'				=> 'Calendario Awa',
			'title'				=> __('Calendario Awa'),
			'description'		=> __('Un bloque que carga el calendario awá'),
			'render_callback'	=> 'bloque_callback_it2020_calendario_awa',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'calendario', 'itinerancia'),
		));

		acf_register_block(array(
			'name'				=> 'Calendario Chorrera',
			'title'				=> __('Calendario Chorrera'),
			'description'		=> __('Un bloque que carga el calendario chorrera'),
			'render_callback'	=> 'bloque_callback_it2020_calendario_chorrera',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'calendario', 'itinerancia'),
		));

		acf_register_block(array(
			'name'				=> 'Bloque reproductor audio',
			'title'				=> __('Bloque reproductor audio'),
			'description'		=> __('Un bloque que carga un reproductor sencillo'),
			'render_callback'	=> 'bloque_callback_audio_sencillo',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'audio', 'sencillo'),
		));

		acf_register_block(array(
			'name'				=> 'Bloque acordeon',
			'title'				=> __('Bloque acordeon'),
			'description'		=> __('Un bloque que carga un acordeon'),
			'render_callback'	=> 'bloque_callback_acordeon',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'acordeon', 'padre'),
		));
	}
}

/*
BLOQUES ITINERANCIA 2020
*/

function bloque_callback_acordeon($block) {
	if( file_exists( get_theme_file_path("assets/bloques/bloque-acordeon-menu.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-acordeon-menu.php") );
	}
}

function bloque_callback_audio_sencillo($block) {
	if( file_exists( get_theme_file_path("assets/bloques/bloque-reproductor-sencillo.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-reproductor-sencillo.php") );
	}
}

function bloque_callback_it2020_calendario_chorrera($block) {
	if( file_exists( get_theme_file_path("assets/bloques/it2020_calendario_chorrera.php") ) ) {
		include( get_theme_file_path("assets/bloques/it2020_calendario_chorrera.php") );
	}
}

function bloque_callback_it2020_calendario_awa($block) {
	if( file_exists( get_theme_file_path("assets/bloques/it2020_calendario_awa.php") ) ) {
		include( get_theme_file_path("assets/bloques/it2020_calendario_awa.php") );
	}
}

function bloque_callback_it2020_mapa_bot($block) {
	if( file_exists( get_theme_file_path("assets/bloques/it2020_mapa_bot.php") ) ) {
		include( get_theme_file_path("assets/bloques/it2020_mapa_bot.php") );
	}
}

function bloque_callback_it2020_mapa_sanaciones($block) {
	if( file_exists( get_theme_file_path("assets/bloques/it2020_mapa_sanaciones.php") ) ) {
		include( get_theme_file_path("assets/bloques/it2020_mapa_sanaciones.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_pronto_bloques( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_zoomify( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_nav_especiales( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_nav_scroll( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_mapa_cc( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}


// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_linea_tiempo_caminando( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}


// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_curaduria( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_videos_youtube( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_filtro_tags_cc( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_filtro_tipo_cc( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_buscar_cc( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_iconos_cc( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_cabezote_color_imagen_separado( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}


// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_cabezote_color_imagen( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}


// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_cabezote_colores( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_destacados_cc( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_titulo_modulo( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_slider_columnas( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_equipo( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_bloque_header_columna( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_lista_tarjetas( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_carrousel_verticales( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque carrousel con cuadros
function bloque_callback_carrousel_cuadros( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque banner con texto
function bloque_callback_banner_texto( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque banner con botones
function bloque_callback_banner_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque con tres botones
function bloque_callback_tres_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque con tres botones
function bloque_callback_tres_botones_segunda( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque botones en carrousel
function bloque_callback_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque linea del tiempo
function bloque_callback_linea_tiempo( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque banner con ejes
function bloque_callback_banner_ejes( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque banner con carrousel
function bloque_callback_banner_carrousel( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque banner con carrousel y márgenes
function bloque_callback_banner_carrousel_margenes( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque imagen con botones
function bloque_callback_imagen_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque cifras
function bloque_callback_cifras( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque cifras
function bloque_callback_galeria_carrousel( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga el bloque testimonios
function bloque_callback_testimonios_carrousel( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga el bloque testimonios
function bloque_callback_bloque_agenda( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga el bloque banner cita e imagen
function bloque_callback_bloque_banner_cita_imagen( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga el bloque banner corto con texto
function bloque_callback_bloque_banner_corto_texto( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga el bloque banner con personajes
function bloque_callback_bloque_personajes( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-bloque-personajes.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-bloque-personajes.php") );
	}
}

// Carga el bloque listado con noticias
function bloque_callback_bloque_listado_noticias( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-listado-noticias.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-listado-noticias.php") );
	}
}

// Carga el bloque listado con noticias automatico
function bloque_callback_bloque_listado_noticias_auto( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-listado-noticias-auto.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-listado-noticias-auto.php") );
	}
}

function bloque_callback_carrousel_cc($block) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-carrousel-cc.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-carrousel-cc.php") );
	}
}

// Cargar los campos de los bloques
include( get_theme_file_path("/includes/campos/carrousel-verticales.php") );
include( get_theme_file_path("/includes/campos/carrousel-botones.php") );
include( get_theme_file_path("/includes/campos/carrousel-cuadros.php") );
include( get_theme_file_path("/includes/campos/banner-texto.php") );
include( get_theme_file_path("/includes/campos/banner-botones.php") );
include( get_theme_file_path("/includes/campos/banner-carrousel.php") );
include( get_theme_file_path("/includes/campos/banner-ejes.php") );
include( get_theme_file_path("/includes/campos/lista-tarjetas.php") );
include( get_theme_file_path("/includes/campos/imagen-botones.php") );
include( get_theme_file_path("/includes/campos/linea-tiempo.php") );
include( get_theme_file_path("/includes/campos/tres-botones.php") );
include( get_theme_file_path("/includes/campos/banner-cita-imagen.php") );
include( get_theme_file_path("/includes/campos/banner-corto-texto.php") );
include( get_theme_file_path("/includes/campos/bloque-header-columna.php") );
include( get_theme_file_path("/includes/campos/formulario-correo.php") );
include( get_theme_file_path("/includes/campos/listado-noticias.php") );
include( get_theme_file_path("/includes/campos/listado-noticias-auto.php") );
include( get_theme_file_path("/includes/campos/bloque-equipo.php") );
include( get_theme_file_path("/includes/campos/bloque-cifras.php") );
include( get_theme_file_path("/includes/campos/galeria-carrousel.php") );
include( get_theme_file_path("/includes/campos/slider-columnas.php") );
include( get_theme_file_path("/includes/campos/titulo-modulo.php") );
include( get_theme_file_path("/includes/campos/destacados-cc.php") );
include( get_theme_file_path("/includes/campos/cabezote-color-imagen.php") );
include( get_theme_file_path("/includes/campos/carrousel-cc.php"));
include( get_theme_file_path("/includes/campos/bloque-curaduria.php"));
include( get_theme_file_path("/includes/campos/bloque-navegacion.php"));
include( get_theme_file_path("/includes/campos/bloque-pronto.php"));
include( get_theme_file_path("/includes/campos/bloque-reproductor-audio.php"));

?>