<?php
/**
 * Block Name: Lista tarjeras
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$titulo = get_field('titulo');
$subtitulo = get_field('subtitulo');

?>

<div class="tarjetas galeria noticias btm">
    <h1 class="sec"><?php echo $titulo; ?></h1>
    <div class="subtitulo-sec"><?php echo $subtitulo; ?></div>

    <div class="inside">
    <?php if(have_rows('tarjetas')): while(have_rows('tarjetas')): the_row(); ?>
        <?php
            $titulo = get_sub_field('titulo');
            $imagen = get_sub_field('imagen');
        ?>

        <a href="<?php echo get_sub_field('enlace') ?>" class="item">

            <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>

            <div class="tarjeta-description">
                <h3><?php echo $titulo ?></h3>
                <p class="texto-descriptivo"><?php echo get_sub_field('descripcion') ?></p>
            </div>
        </a>
    <?php endwhile; endif; ?>
    </div>
    

</div>