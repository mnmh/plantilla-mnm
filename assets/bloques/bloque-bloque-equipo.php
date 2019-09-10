<?php
/**
 * Block Name: Carrousel cuadros verticales
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];

// titulo del carrousel
$titulo = get_field('titulo_del_carrousel');

?>

<div class="personas_slider pad">
<nav class="hori_scroll">
	<div class="prev"></div>
	<div class="next"></div>
</nav>
<ul class="personas_list">
    <?php if(have_rows('items_del_carrousel')): while(have_rows('items_del_carrousel')): the_row(); ?>
        
        <?php
            $img = get_sub_field('imagen');
        ?>
    
        <li class="persona_item" data-des="<?php echo get_sub_field('descripcion') ?>">
            <div class="image-wrapper" style="background-image: url('<?php echo $img['sizes']['large'] ?>')"></div>
            <div class="inside">
                <h2><?php echo get_sub_field('titulo') ?></h2>
            </div>
        </li>
    <?php endwhile; endif; ?>
</ul>

<div class="des"></div>
</div>