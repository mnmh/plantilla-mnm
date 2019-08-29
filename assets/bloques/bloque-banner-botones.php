<?php
/**
 * Block Name: Banner con botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$titulo = get_field('titulo');
$texto = get_field('texto');
?>

<div class="banner banner-botones btm">
    <div class="img"></div>
    <div class="inside">
        <div class="content">
            <h1 class="titulo">
                <strong><?php echo $titulo ?></strong>
            </h1>
            <div class="txt">
                <?php echo $texto ?>
            </div>

            <div class="inside_navigation">
                <div class="btns">
                    <div class="nav next"></div>
                    <div class="nav prev"></div>
                </div>

                <div class="botones">
                    <?php if(have_rows('botones')): while(have_rows('botones')): the_row(); ?>

                    <div class="item_nav" data-img="<?php echo get_sub_field('imagen')['url'] ?>">
                        <div class="name"><?php the_sub_field('nombre') ?></div>
                        <div class="copy"><?php the_sub_field('texto') ?></div>
                    </div>

                    <?php endwhile; endif; ?>
                </div>
                

            </div>
        </div>
    </div>
</div>