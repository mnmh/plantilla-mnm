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
    <h1 class="titulo"> <?php echo $titulo?> </h1>
    <div class="contenedor <?php echo $class?>">
        <div class="left">
            <div class="texto">
                <?php echo $texto?>
            </div>
        </div>
        <div class="right">
            <div class="img" style="background-image:url('<?php echo $img['url'] ?>')"></div>
        </div>
    </div>
</div>