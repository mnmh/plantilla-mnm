<?php
/**
 * Block Name: Slider dos columnas
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$nav = get_field('nav');
$color = get_field('color');
$class = '';
if($nav == 1) $class = 'ocultar';
?>
<div class="slider-columna <?php echo $block['className'] ?> colores <?php echo $color ?>">
    <div class="left">
        <div class="subtitulo">
            
        </div>
        <div class="titulo">

        </div>
        <a class="enlace">

        </a>
    </div>
    <div class="right">
        <div class="inside">
            <?php if(have_rows('elementos')): while(have_rows('elementos')): the_row(); ?>
                <?php
                    $img = get_sub_field('imagen');
                ?>
                <div class="item" style="background-image: url('<?php echo $img['url'] ?>')" data-titulo="<?php echo get_sub_field('titulo') ?>" data-subtitulo="<?php echo get_sub_field('subtitulo') ?>" data-enlace="<?php echo get_sub_field('enlace') ?>" data-textoenlace="<?php echo get_sub_field('texto_enlace') ?>"></div>
            <?php endwhile; endif; ?>
        </div>
        <div class="nav <?php echo $class?>">
            <div class="prev"></div>
            <div class="next"></div>
        </div>
    </div>
</div>
