<?php
/**
 * Block Name: Curaduría arte y cultura
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
            <?php while(have_rows('items'): the_row();) ?>
                <a href="#" class="item"></a>
            <?php endwhile;?>
        <?php endif; ?>
    </div>
    <div class="right">
        <?php echo $texto ?>
    </div>
</div>
