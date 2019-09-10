<?php
/**
 * Block Name: Header Columna
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$titulo = get_field('titulo');
$img = get_field('imagen');
$texto = get_field('texto');
$invertido = get_field('invertido');
$class = '';
if($invertido == 1) $class = 'invertido';
?>

<div class="header-columna btm">
    <div class="inside">
        <div class="contenedor <?php echo $class?>">
            <div class="left">
                <div class="texto">
                    <?php echo $texto?>
                </div>
            </div>
            <div class="right">
                <img src="<?php echo $img['url'] ?>" alt="">
            </div>
        </div>
    </div>
    
</div>