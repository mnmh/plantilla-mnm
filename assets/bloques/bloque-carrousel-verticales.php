<?php
/**
 * Block Name: Carrousel cuadros verticales
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$nav = get_field('nav');

// titulo del carrousel
$titulo = get_field('titulo_del_carrousel');

?>

<div class="carrousel-vertical-container <?php echo $block['className'] ?>">
    <h1 class="sec"><?php echo $titulo; ?></h1>
    <div class="subtitulo-sec"><?php echo get_field('subtitulo') ?></div>
    <nav class="hori_scroll">
        <div class="prev"></div>
        <div class="next"></div>
    </nav>
    <ul class="profiles-list">
        
        <?php if(have_rows('items_del_carrousel')): while(have_rows('items_del_carrousel')): the_row(); ?>
            <?php
                $imagen = get_sub_field('imagen');
                $titulo_item = get_sub_field('titulo');
                $subtitulo = get_sub_field('sub-titulo');
                $descripcion = get_sub_field('descripcion');
                $enlace = get_sub_field('enlace');
            ?>
            <li class="profiles-item">

                <?php if($enlace): ?>
                    <a href="<?php echo $enlace; ?>" target="_blank" class="image-wrapper itinerancias" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')">
                <?php else: ?>
                    <div class="image-wrapper itinerancias" style="background-image:url('<?php echo $imagen['sizes']['large'] ?>')">
                <?php endif; ?>

                    <div class="opacity-layer">

                        <div class="inside_content">
                            <?php if($subtitulo): ?>
                                <h3><?php echo $subtitulo ?></h3>
                            <?php endif ?>
                            <?php if($titulo_item): ?>
                                <h2><?php echo $titulo_item ?></h2>
                            <?php endif ?>
                            <?php if($descripcion): ?>
                                <div class="descripcion">
                                    <?php echo $descripcion ?>
                                </div>
                            <?php endif ?>
                        </div>

                    </div>

                <?php if($enlace): ?>
                    </a>
                <?php else: ?>
                    </div>
                <?php endif; ?>

            </li>

        <?php endwhile; endif; ?>
    </ul>
</div>