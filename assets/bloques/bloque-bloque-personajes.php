<?php
/**
 * Block Name: Footer con botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];

$texto = get_field('texto_abajo');
$enlace = get_field('enlace');
?>

<div class="audio piepag">

    <div class="contenedor">

        <div class="left">

            <div class="textos">
                    <h1> 
                        Grandes conversaciones
                    </h1>
                    <p> 
                        A lo largo de sus vidas, Víctor Gaviria, Felipe Aljure y Mariana Arruti se han preocupado por dejar en la memoria historias de la gente anónima. 
                    </p>
            </div> 
        

            <div class="reproductor">
                <div class="slider">
                    <div class="current"></div>
                    <div class="total"></div>
                </div>
                <div class="time">
                    00:00 / 00:00
                </div>
            </div>

        </div>
 
        <div class="tarjetas right">
            <?php if(have_rows('ejes')): while(have_rows('ejes')): the_row(); ?>
            <?php $imagen = get_sub_field('imagen') ?>
            <?php $thumbnail = get_sub_field('thumbnail') ?>
            <?php $audio = get_sub_field('audio') ?>
            <div class="item" data-titulo="<?php echo get_sub_field('titulo')?>" data-des="<?php echo get_sub_field('descripcion')?>" data-imagen="background-image:url('<?php echo $imagen['sizes']['large'] ?>')"  style="background-image:url('<?php echo $thumbnail['sizes']['large'] ?>')">
                <div class="btn-play play" data-audio="<?php echo $audio['url'] ?>"> Escuchar</div>
            </div>
            <?php endwhile; endif; ?>
        </div>

    </div>
</div>