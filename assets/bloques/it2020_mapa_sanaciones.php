<?php
/**
 * Block Name: It2020 - Mapa sanaciones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="map_nav btm">
    <div class="mapa_contenedor" id="<?php echo $id ?>">
    </div>
    <div class="right">
        <div class="back" style="background-image: url('<?php echo get_template_directory_uri() ?>/img/it2020/back.png')"></div>
        <div class="content"></div>
    </div>
</div>

<div class="map_lineatiempo">
    <svg viewBox="0 0 500 500" id="<?php echo $id ?>_2"></svg>
    <div class="right">
        <div class="back" style="background-image: url('<?php echo get_template_directory_uri() ?>/img/it2020/back.png')"></div>
        <div class="content">
            <div class="nav"></div>
            <div class="info hide">
                <div class="backnav">< volver</div>
                <div class="inside"></div>
            </div>
        </div>
    </div>
</div>