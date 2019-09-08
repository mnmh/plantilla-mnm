<?php
/**
 * Block Name: Tres botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="tres-botones segunda">
    <h1 class="sec"> Título </h1>
    <div class="subtitulo-sec"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </div>
    <ul class="botones">
        <?php if(have_rows('listado_botones')): while(have_rows('listado_botones')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <div class="name">
                    <a class="btn" href="#"><?php the_sub_field('nombre') ?> </a>
                    <p><?php the_sub_field('descripcion') ?></p>
                </div>
            </li>
        <?php endwhile; endif; ?>
    </ul>
</div>