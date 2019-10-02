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
$activar = get_field('activar_boton');
?>

<div class="banner overlay btm">
    <div class="img" style="background-image:url('<?php echo $imagen['url'] ?>')"></div>
    <div class="inside">
        <div class="content texto-abajo">

            <div class="contenedor-txt">
                <h1 class="titulo">
                    <strong><?php echo $titulo ?></strong>
                </h1>
                
                <div class="txt">
                    <?php echo $texto ?>
                </div>
                <?php if($activar == 1): ?>
                <div class="btn"> Saber más </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>