<?php
/**
 * Block Name: Tres botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="destacados-cc">
    <ul class="listado">
        <?php if(have_rows('elementos')): while(have_rows('elementos')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton"><a href="<?php echo get_sub_field('enlace'); ?>">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <div class="name">
                    <h1><?php the_sub_field('nombre') ?></h1>
                    <h4><?php the_sub_field('descripcion') ?></h4>
                </div>
            </a></li>
        <?php endwhile; endif; ?>
    </ul>
</div>