<?php
/**
 * Block Name: Tres botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="tres-botones segunda">
    <h1 class="sec"><?php echo get_field('titulo') ?></h1>
    <div class="subtitulo-sec"><?php echo get_field('subtitulo') ?></div>
    <ul class="botones">
        <?php if(have_rows('listado_botones')): while(have_rows('listado_botones')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <div class="name">
                    <?php print_r(get_sub_field('enlace')) ?>
                    <a class="btn" href="<?php echo get_sub_field('enlace') ?>"><?php the_sub_field('nombre') ?> </a>
                    <p><?php the_sub_field('descripcion') ?></p>
                </div>
            </li>
        <?php endwhile; endif; ?>
    </ul>
</div>