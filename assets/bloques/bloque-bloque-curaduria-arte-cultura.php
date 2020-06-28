<?php
/**
 * Block Name: Curaduría
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$items = get_field('items');
$texto = get_field('texto');
?>

<div class="curaduria-ac">
    <div class="left">
        <?php if(have_rows('items')): ?>
            <?php while(have_rows('items')): the_row(); ?>
            <?php
                $elem = get_sub_field('elemento');
                $galeria = get_field('galeria', $elem->ID);
                
            ?>
                <a href="<?php echo get_permalink($elem->ID) ?>" class="item">
                    <div class="img" style="background-image: url('<?php echo $galeria[0]['sizes']['large']?>')"></div>
                    <div class="titulo"><?php echo get_the_title($elem->ID) ?></div>
                </a>
            <?php endwhile;?>
        <?php endif; ?>
    </div>
    <div class="right">
        <?php echo $texto ?>
    </div>
</div>
