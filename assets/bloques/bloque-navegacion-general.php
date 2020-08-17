<?php
/**
 * Block Name: Navegación especiales
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="parent-nav">
<div class="navegacion_especiales" id="<?php echo $id ?>">
<?php
    if(have_rows('elementos')): while(have_rows('elementos')): the_row();

    $elem = get_sub_field('item');
    $class = '';
    if(get_the_ID() == $elem->ID) $class='active';
?>
    <a href="<?php echo $elem->guid ?>" class="item <?php echo $class ?>">
        <?php echo $elem->post_title ?>
    </a>
<?php
    endwhile; endif;
?>
</div>
</div>
