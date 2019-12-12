<?php
/**
 * Block Name: Tres botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="tres-botones segunda">
    <ul class="botones">
        <?php if(have_rows('listado_botones')): while(have_rows('listado_botones')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <div class="name">
                    <a class="btn" href="<?php echo get_sub_field('enlace') ?>"><?php the_sub_field('nombre') ?> </a>
                    <p><?php the_sub_field('descripcion') ?></p>
                </div>
            </li>
        <?php endwhile; endif; ?>
    </ul>
</div>