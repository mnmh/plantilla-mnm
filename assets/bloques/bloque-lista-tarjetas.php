<?php
/**
 * Block Name: Lista tarjeras
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];

?>

<div class="tarjetas galeria btm">
    <h1 class="sec"><?php echo get_field('titulo') ?></h1>
    <div class="subtitulo-sec"><?php echo get_field('subtitulo') ?></div>

    <div class="filtros">
        <div class="ciudades container_filtro">
            <div class="item_filtro name active">Ciudades</div>
            <div class="item_filtro filter">Bogotá</div>
            <div class="item_filtro filter">Cali</div>
            <div class="item_filtro filter">Medellín</div>
            <div class="item_filtro todos">Ver todos</div>
        </div>
        <div class="tipos container_filtro">
            <div class="item_filtro name active">Formato</div>
            <div class="item_filtro filter" data-filter="tipo_video">Videos</div>
            <div class="item_filtro filter" data-filter="tipo_audio">Audios</div>
            <div class="item_filtro filter" data-filter="tipo_galeria">Galerías</div>
            <div class="item_filtro todos">Ver todos</div>
        </div>
    </div>

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
        <div class="item tipo_<?php echo $tipo ?>" data-video="<?php echo $video ?>">

            <?php if($tipo == 'galeria'): ?>
                <div class="gal">
                    <?php foreach($galeria as $img): ?>
                    <div class="itemgal" data-img="<?php echo $img['sizes']['visor'] ?>"></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="img" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"></div>

            <div class="tarjeta-description">
                <h3><?php echo $titulo ?></h3>
                <p class="texto-descriptivo"><?php echo get_sub_field('descripcion') ?></p>
            </div>
        </div>
    <?php endwhile; endif; ?>
    </div>
    

</div>