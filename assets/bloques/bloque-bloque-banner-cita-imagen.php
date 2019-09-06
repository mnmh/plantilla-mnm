<?php
/**
 * Block Name: Banner con botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$cita = get_field('cita');
$enlace = get_field('enlace');
$textoEnlace = get_field('texto_del_enlace');
$imagen = get_field('imagen');

?>

<div class="banner cita-imagen btm">
    <div class="contenedor-banner">
        <div class="left">
            <div class="cita"><?php echo $cita; ?></div>
            <a href="<?php echo $enlace; ?>" class="link"><?php echo $textoEnlace; ?></a>
        </div>
        <div class="right">
            <div class="img" style="background-image: url('<?php echo $imagen['url']; ?>')"></div>
        </div>
    </div>
</div>