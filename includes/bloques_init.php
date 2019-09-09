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
        
        // Bloque de botones
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

		// Bloque tres botones
		acf_register_block(array(
			'name'				=> 'tres_botones_segunda',
			'title'				=> __('Tres botones segunda version'),
			'description'		=> __('Un bloque para tres botones'),
			'render_callback'	=> 'bloque_callback_tres_botones_segunda',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'botones', 'imagen' ),
		));

		// Bloque de lista
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

		// Bloque de linea del tiempo
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
include( get_theme_file_path("/includes/campos/bloque-equipo.php") );

?>