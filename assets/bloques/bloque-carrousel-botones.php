<?php
/**
 * Block Name: BOTONES
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];

$titulo = get_field('titulo');

?>

<div class="botones-carrousel pad btm">
    <h1 class="sec"><?php echo $titulo; ?></h1>
    <nav class="hori_scroll">
        <div class="prev"></div>
        <div class="next"></div>
    </nav>

    <ul class="botones">
        <?php if(have_rows('listado_botones')): while(have_rows('listado_botones')): the_row(); ?>
        <?php
            $imagen = get_sub_field('imagen');
        ?>
            <li class="boton">
                <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
                <h2 class="name"><?php the_sub_field('nombre') ?></h2>
            </li>
        <?php endwhile; endif; ?>
    </ul>
</div>