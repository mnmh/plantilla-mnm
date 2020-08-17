<?php
/**
 * Block Name: Navegación por scroll
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="parent-nav">
<div class="navegacion_scroll" id="<?php echo $id ?>">
<?php
    if(have_rows('elementos')): while(have_rows('elementos')): the_row()
?>
    <a href="#<?php echo get_sub_field('id') ?>" class="item">
        <?php echo get_sub_field('nombre') ?>
    </a>
<?php
    endwhile; endif;
?>
</div>
</div>


<div class="spacer_nav_scroll"></div>