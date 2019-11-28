<?php
/**
 * Block Name: Tres botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="titulo-modulo <?php echo $block['className'] ?>">
    <h2 class="sec"><?php echo get_field('titulo'); ?></h2>
    <div class="subtitulo-sec"><?php echo get_field('subtitulo'); ?></div>
</div>