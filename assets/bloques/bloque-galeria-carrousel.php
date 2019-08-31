<?php
/**
 * Block Name: Galeria carrousel
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div id="galeria_voces" class="pad">
    <div class="next"></div>
    <div class="prev"></div>

    <div class="inside">
        <?php
            $galeria = get_field('galeria');
            foreach($galeria as $img):
        ?>
            <div class="item" style="position: absolute; left: 0%;">
                <img src="<?php echo $img['url'] ?>">
                <div class="des">
                    <span class="leyenda"><?php echo $img['title'] ?></span>
                    <p class="descripcion"><?php echo $img['description'] ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>