<?php

add_action('acf/init', 'my_acf_init');
function my_acf_init() {
	
	if( function_exists('acf_register_block') ) {
        
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

// Carga la plantilla del bloque botones
function bloque_callback_botones( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	if( file_exists( get_theme_file_path("/assets/bloques/bloque-{$slug}.php") ) ) {
		include( get_theme_file_path("/assets/bloques/bloque-{$slug}.php") );
	}
}
?>