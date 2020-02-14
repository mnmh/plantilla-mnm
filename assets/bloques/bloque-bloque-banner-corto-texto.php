<?php
/**
 * Block Name: Banner con botones
 *
 */

// id unico para el bloque

$id = 'bloque-' . $block['id'];
$texto = get_field('texto');
$imagen = get_field('imagen');

?>

<div class="banner texto-imagen-corto  btm" style="background-image:url('<?php echo $imagen['url']; ?>')"> 
    <div class="contenedor-banner">
        <div class="left">
            <h1 class="titulo"><?php echo $texto; ?></h1>
        </div>
    </div>
</div>