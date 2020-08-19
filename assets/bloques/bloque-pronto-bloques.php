<?php
/**
 * Block Name: Slider dos columnas
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
?>

<div class="fila-botones">
<?php
    $elem = get_field('elementos');
    if(have_rows('elementos')): while(have_rows('elementos')): the_row();
    $w = 100 / count($elem);
    $url = get_sub_field('url');
    $img = get_sub_field('imagen');

    if($url != ''):
?>
    <a style="width: <?php echo $w ?>vw; height: <?php echo $w + 5 ?>vw;" href="<?php echo get_sub_field('url') ?>" class="item">
        <div class="inside" style="background-image: url('<?php echo $img['sizes']['large'] ?>')">
            <div class="name">
                <?php echo get_sub_field('nombre') ?>
            </div>
        </div>
    </a>
<?php
    else:
?>
    <div style="width: <?php echo $w ?>vw; height: <?php echo $w + 5 ?>vw;" class="item">
        <div class="inside" style="background-image: url('<?php echo $img['sizes']['large'] ?>')">
        </div>
    </div>
<?php
    endif;endwhile; endif;
?>
</div>