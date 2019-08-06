<?php
/**
 * Block Name: Banner imagen con botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$imagen = get_field('imagen');
?>

<div class="banner btm botones">
    <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
    <div class="botones">
        <?php if(have_rows('botones')): while(have_rows('botones')): the_row(); ?>
            <a class="item" href="<?php echo get_sub_field('enlace') ?>">
                <?php echo get_sub_field('nombre') ?>
            </a>
        <?php endwhile; endif; ?>
    </div>    
</div>