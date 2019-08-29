<?php
/**
 * Block Name: Lista tarjeras
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];

?>

<div class="tarjetas galeria pad btm">
    <h1 class="sec">Tarjetas</h1>

    <div class="inside">
    <?php if(have_rows('tarjetas')): while(have_rows('tarjetas')): the_row(); ?>
        <?php $tipo = get_sub_field('tipo'); ?>
        <?php
            if($tipo == 'video'):
                $imagen = get_sub_field('imagen');
                $titulo = get_sub_field('titulo');
                $video = get_sub_field('id_video');
            else:
                $post = get_sub_field('galeria');
                $titulo = $post->post_title;
                $galeria = get_field('galeria', $post->ID);
                $imagen = $galeria[0];
            endif;
        ?>
        <div class="item <?php echo $tipo ?>" data-video="<?php echo $video ?>">

            <?php if($tipo == 'galeria'): ?>
                <div class="gal">
                    <?php foreach($galeria as $img): ?>
                    <div class="itemgal" data-img="<?php echo $img['sizes']['visor'] ?>"></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>
            <h3><?php echo $titulo ?></h3>
        </div>
    <?php endwhile; endif; ?>
    </div>
    

</div>