<?php
/**
 * Block Name: Banner con botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];

$texto = get_field('texto_abajo');
$enlace = get_field('enlace');
?>

<div class="banner audio">
    <div class="img"></div>
    <div class="inside">
        <div class="content">
            <h1 class="titulo"><strong></strong></h1>
            <div class="txt"></div>
        </div>

        <div class="tarjetas">
            <?php if(have_rows('ejes')): while(have_rows('ejes')): the_row(); ?>
            <?php $imagen = get_sub_field('imagen') ?>
            <?php $thumbnail = get_sub_field('thumbnail') ?>
            <div class="item" data-titulo="<?php echo get_sub_field('titulo')?>" data-des="<?php echo get_sub_field('descripcion')?>" data-imagen="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"  style="background-image:url('<?php echo $thumbnail['sizes']['large'] ?>')">
                <div class="play"></div>
            </div>
            <?php endwhile; endif; ?>
        </div>
    </div>
</div>
<div class="texto_banner btm">
    <div class="inside">
        <p>
            <?php echo $texto ?>
            <a class="btn" href="<?php echo $enlace ?>">Saber más</a>
        </p>
    </div>
</div>