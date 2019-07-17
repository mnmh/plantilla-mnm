<?php

// Este archivo define los scripts JS que se cargan a la página

add_action('init', 'header_scripts');

function header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        wp_register_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0.0');
        wp_enqueue_script('scripts');
    }
}

?>