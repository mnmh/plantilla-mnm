<?php
/**
 * Block Name: BOTONES
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$titulo = get_field('titulo');

?>

<div class="botones-carrousel btmdoble">
    <h1 class="sec"><?php echo $titulo; ?></h1>
    <div class="subtitulo-sec"><?php echo get_field('subtitulo') ?></div>
    <nav class="hori_scroll">
        <div class="prev"></div>
        <div class="next"></div>
    </nav>

    <ul class="botones">
        <?php if(have_rows('listado_botones')): while(have_rows('listado_botones')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <div class="info">
                    <h2 class="name"><?php the_sub_field('nombre') ?></h2>
                    <p class="subtitulo-tarjetas"><?php echo get_sub_field('descripcion') ?></p>
                </div>
                <a href="#" class="btn">Ver más</a>
            </li>
        <?php endwhile; endif; ?>
    </ul>
</div>