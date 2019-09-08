<?php
/**
 * Block Name: Cifras
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>
<div id="cifras">
<div class="cifras-container">

<?php if(have_rows('cifras')): while(have_rows('cifras')): the_row(); ?>
    <div class="cifra">
        <div class="num"><?php echo get_sub_field('numero') ?></div>
        <div class="des">
            <?php echo get_sub_field('nombre') ?> 
        </div>
    </div>
<?php endwhile; endif; ?>

</div>
</div>
