<?php
if( function_exists('acf_add_local_field_group') ):

    acf_add_local_field_group(array(
        'key' => 'group_5ef8931e321c4',
        'title' => 'Bloque curaduria',
        'fields' => array(
            array(
                'key' => 'field_5ef89324fb656',
                'label' => 'Elementos',
                'name' => 'items',
                'type' => 'repeater',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'acfe_permissions' => '',
                'acfe_repeater_stylised_button' => 0,
                'collapsed' => '',
                'min' => 2,
                'max' => 4,
                'layout' => 'table',
                'button_label' => '',
                'sub_fields' => array(
                    array(
                        'key' => 'field_5ef89334fb657',
                        'label' => 'Elemento',
                        'name' => 'elemento',
                        'type' => 'post_object',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => '',
                        ),
                        'acfe_permissions' => '',
                        'post_type' => array(
                            0 => 'obras',
                        ),
                        'taxonomy' => '',
                        'allow_null' => 0,
                        'multiple' => 0,
                        'return_format' => 'object',
                        'allow_custom' => 0,
                        'save_post_status' => 'publish',
                        'acfe_bidirectional' => array(
                            'acfe_bidirectional_enabled' => '0',
                        ),
                        'ui' => 1,
                    ),
                ),
            ),
            array(
                'key' => 'field_5ef89606fb658',
                'label' => 'Texto',
                'name' => 'texto',
                'type' => 'wysiwyg',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'acfe_permissions' => '',
                'default_value' => '',
                'tabs' => 'all',
                'toolbar' => 'full',
                'media_upload' => 1,
                'delay' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'block',
                    'operator' => '==',
                    'value' => 'acf/bloque-curaduria-arte-cultura',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'left',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
        'acfe_display_title' => '',
        'acfe_autosync' => '',
        'acfe_permissions' => '',
        'acfe_form' => 0,
        'acfe_meta' => '',
        'acfe_note' => '',
    ));
    
    endif;
?>