<?php
/**
 * Block Name: Lista tarjeras
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];

?>

<div class="tarjetas galeria btm halftop">
    <div class="filtros">
        <div class="ciudades container_filtro">
            <div class="item_filtro name active">Ciudades</div>
            <div class="item_filtro filter" data-filter="ciudad_bogota">Bogotá</div>
            <div class="item_filtro filter" data-filter="ciudad_cali">Cali</div>
            <div class="item_filtro filter" data-filter="ciudad_cucuta">Cúcuta</div>
            <div class="item_filtro filter" data-filter="ciudad_villavicencio">Villavicencio</div>
            <div class="item_filtro filter" data-filter="ciudad_medellin">Medellín</div>
            <div class="item_filtro todos">Ver todos</div>
        </div>
        <div class="tipos container_filtro">
            <div class="item_filtro name active">Formato</div>
            <div class="item_filtro filter" data-filter="tipo_video">Videos</div>
            <div class="item_filtro filter" data-filter="tipo_audio">Audios</div>
            <div class="item_filtro filter" data-filter="tipo_galeria">Galerías</div>
            <div class="item_filtro filter" data-filter="tipo_texto">Textos</div>
            <div class="item_filtro todos">Ver todos</div>
        </div>
        <div class="container_filtro tipos">
            <div class="item_filtro name active">Año</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2012</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2013</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2014</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2015</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2016</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2017</div>
            <div class="item_filtro filter" data-filter="fecha_2018">2018</div>
            <div class="item_filtro filter" data-filter="fecha_2019">2019</div>
            <div class="item_filtro filter" data-filter="fecha_2020">2020</div>
            <div class="item_filtro todos">Ver todos</div>
        </div>
    </div>

    <div class="inside">
    <?php if(have_rows('tarjetas')): while(have_rows('tarjetas')): the_row(); ?>
        <?php $tipo = get_sub_field('tipo'); ?>
        <?php $fecha = get_sub_field('fecha'); ?>
        <?php $ciudad = get_sub_field('ciudad'); ?>
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

        <?php if($tipo != 'texto'): ?>
            <div class="item tipo_<?php echo $tipo ?> fecha_<?php echo $fecha;?> ciudad_<?php echo $ciudad ?>" data-video="<?php echo $video ?>">

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
        <?php else: $imagen = get_sub_field('imagen');?>
            <a href="<?php echo get_sub_field('id_video')?>" class="item tipo_<?php echo $tipo ?> fecha_<?php echo $fecha;?> ciudad_<?php echo $ciudad ?>" data-video="<?php echo $video ?>">

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
            </a>
        <?php endif; ?>
    <?php endwhile; endif; ?>
    </div>
    

</div>