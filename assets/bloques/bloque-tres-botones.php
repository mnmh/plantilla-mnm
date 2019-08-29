<?php
/**
 * Block Name: Tres botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="pad tres-botones btm">
    <ul class="botones">
        <?php if(have_rows('listado_botones')): while(have_rows('listado_botones')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton"><a href="#">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <div class="name">
                    <h2><?php the_sub_field('nombre') ?></h2>
                    <h4><?php the_sub_field('descripcion') ?>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat ultrices lectus nec interdum.</h4>
                </div>
            </a></li>
        <?php endwhile; endif; ?>
    </ul>
</div>