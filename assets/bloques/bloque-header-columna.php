<?php
/**
 * Block Name: Header Columna
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$img = get_field('imagen');
?>

<div class="header-columna">
    <div class="left">
        <?php echo get_field('contenido');?>
    </div>
    <div class="right">
        <img src="<?php echo $img['url'];?>" alt="">
    </div>
</div>