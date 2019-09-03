<?php
/**
 * Block Name: Linea del tiempo
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$items_count = count(get_field('elementos'));
?>

<div class="linea-tiempo btm">
    <h1 class="sec">Línea del tiempo</h1>
    <div class="top">
        <?php if(have_rows('elementos')): while(have_rows('elementos')): the_row(); ?>
            <div class="item">
                <div class="left">
                    <h2><?php echo get_sub_field('titulo'); ?></h2>
                    <p class="txt">
                        <?php echo get_sub_field('contenido'); ?>
                    </p>
                </div>
                <?php $imagen = get_sub_field('imagen') ?>
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
            </div>
        <?php endwhile; endif; ?>
    </div>
    <div class="nav">
        <div class="prev"></div>
        <div class="inside">
            <?php for($i = 0; $i < $items_count; $i++): ?>
                <div class="dot"></div>
            <?php endfor; ?>
        </div>
        <div class="next"></div>
    </div>
</div>