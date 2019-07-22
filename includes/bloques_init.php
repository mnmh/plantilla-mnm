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
			'name'				=> 'botones',
			'title'				=> __('Botones'),
			'description'		=> __('Un bloque para agregar entre 3 y 6 botones en línea'),
			'render_callback'	=> 'bloque_callback_botones',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'botones', 'enlaces' ),
		));
	}
}

// Carga la plantilla del bloque carrousel con cuadros verticales
function bloque_callback_carrousel_verticales( $block ) {
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

// Carga la plantilla del bloque banner con texto
function bloque_callback_banner_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Carga la plantilla del bloque botones
function bloque_callback_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("assets/bloques/bloque-{$slug}.php") );
	}
}

// Cargar los campos de los bloques
include( get_theme_file_path("/includes/campos/carrousel-verticales.php") );
include( get_theme_file_path("/includes/campos/banner-texto.php") );
?>