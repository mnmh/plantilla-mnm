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

<div class="banner texto-imagen btm corto"> 
    <div class="left">
        <div class="texto"><?php echo $texto; ?></div>
    </div>
    <div class="right">
        <div class="img" style="background-image:url('<?php echo $imagen['url']; ?>')"></div>
        
    </div>
</div>