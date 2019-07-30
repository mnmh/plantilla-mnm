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

// Cargar los campos de los bloques
include( get_theme_file_path("/includes/campos/carrousel-verticales.php") );
include( get_theme_file_path("/includes/campos/carrousel-botones.php") );
include( get_theme_file_path("/includes/campos/carrousel-cuadros.php") );
include( get_theme_file_path("/includes/campos/banner-texto.php") );
include( get_theme_file_path("/includes/campos/banner-botones.php") );
include( get_theme_file_path("/includes/campos/lista-tarjetas.php") );
include( get_theme_file_path("/includes/campos/linea-tiempo.php") );
?>