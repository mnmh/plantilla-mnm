<?php
/**
 * Block Name: Banner con texto
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$titulo = get_field('titulo');
$texto = get_field('texto');
$imagen = get_field('imagen');

?>

<div class="banner btm">
    <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
    <div class="inside">
        <div class="content">
            <h1 class="titulo">
                <strong><?php echo $titulo ?></strong>
            </h1>
            <div class="txt">
                <?php echo $texto ?>
            </div>
        </div>
    </div>
</div>