<?php
/**
 * Block Name: Linea del tiempo
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$elementos = get_field('elementos');
$items_count = count(get_field('elementos'));
?>

<div class="linea-tiempo btm">
    <div class="logo">
    <?php get_template_part('/assets/template-parts/logo-simple-caminando') ?>
    </div>
<div class="nav">
        <div class="prev"></div>
        <div class="inside">
            <?php for($i = 0; $i < $items_count; $i++): ?>
                <div class="dot">
                    <div class="fecha"><?php print_r($elementos[$i]['fecha']) ?></div>
                </div>
            <?php endfor; ?>
        </div>
        <div class="next"></div>
    </div>
    <div class="top">
        <?php if(have_rows('elementos')): while(have_rows('elementos')): the_row(); ?>
            <div class="item">
                <div class="left">
                    <div class="fecha"><?php echo get_sub_field('fecha') ?></div>
                    <h2><?php echo get_sub_field('titulo'); ?></h2>
                    <p class="txt">
                        <?php echo get_sub_field('contenido'); ?>
                    </p>
                </div>
                <!-- <?php $imagen = get_sub_field('imagen') ?>
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div> -->
                <div class="resultados">
                    <?php echo get_sub_field('resultados'); ?>
                </div>
            </div>
        <?php endwhile; endif; ?>
    </div>
    
</div>