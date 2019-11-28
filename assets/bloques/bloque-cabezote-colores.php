<?php
/**
 * Block Name: Cabezote colores
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$img = get_field('imagen');
$texto = get_field('texto');
$color = get_field('color');
?>

<div class="header-columna btm colores <?php echo $color ?>">
    <div class="inside">
        <div class="contenedor">
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