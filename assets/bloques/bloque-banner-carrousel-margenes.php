<?php
/**
 * Block Name: Banner con carrousel y margenes
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$txtbtn = get_field('txtbtn');
?>

<div class="banner banner-margenes">

    <div class="contenedor-carrusel">
        <div class="carrousel">
            <?php if(have_rows('elementos')): while(have_rows('elementos')): the_row(); ?>
                <?php $imagen = get_sub_field('imagen') ?>
                <div class="item" data-des="<?php echo get_sub_field('descripcion') ?>" data-titulo="<?php echo get_sub_field('titulo') ?>" data-enlace="<?php echo get_sub_field('enlace') ?>">
                    <div class="img" style="background-image:url('<?php echo $imagen['url'] ?>')"></div>
                </div>
            <?php endwhile; endif; ?>
        </div>
        <div class="inside">
            <div class="content">
                <div class="subtitulo"><?php echo get_sub_field('subtitulo') ?></div>
                <h1 class="titulo"><strong></strong></h1>
                <div class="txt"></div>
                <a href="#" class="btn"><?php echo $txtbtn ?></a>
            </div>
        </div>
    </div>  
    <div class="nav">
        <div class="item prev"></div>
        <div class="item next"></div>
    </div>
</div>