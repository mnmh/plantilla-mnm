<?php
/**
 * Block Name: Header Columna
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$img = get_field('imagen');
$texto = get_field('texto');
$invertido = get_field('invertido');
$class = '';
if($invertido == 1) $class = 'invertido';
?>

<div class="header-columna <?php echo $class?>">
    <div class="left">
        <?php echo $texto?>
    </div>
    <div class="right">
        <img src="<?php echo $img['url'];?>" alt="">
    </div>
</div>