<?php
/**
 * Block Name: Galeria carrousel
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div id="galeria_voces">  
    <h1 class="sec"><?php echo get_field('titulo') ?></h1>
    <div class="subtitulo-sec"><?php echo get_field('subtitulo') ?></div>
    <div class="nav">
        <div class="next"></div>
        <div class="prev"></div>
    </div>

    <div class="inside">
        <?php
            $galeria = get_field('galeria');
            foreach($galeria as $img):
        ?>
            <div class="item" style="position: absolute; left: 0%;">
                <img src="<?php echo $img['sizes']['large'] ?>">
                <div class="des">
                    <span class="leyenda"><?php echo $img['title'] ?></span>
                    <p class="descripcion"><?php echo $img['description'] ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>