<?php
/**
 * Block Name: Lista noticias auto
 *
 */

// id unico para el bloque
$id = 'lista-noticias-' . $block['id'];
$id_categ = get_field('categoria');
$num = get_field('numero');

$args = array( 'posts_per_page' => $num, 'category' => $id_categ );

$noticias = get_posts($args);
?>
<div class="tarjetas galeria noticias btm">
<div class="inside">
<?php foreach($noticias as $noticia): ?>

<?php
    $imagen = get_the_post_thumbnail_url($noticia->ID)
?>

<a href="<?php echo get_permalink($noticia->ID) ?>" class="item">

    <div class="img" style="background-image:url('<?php echo $imagen ?>')"></div>

    <div class="tarjeta-description">
        <h3><?php echo $noticia->post_title ?></h3>
    </div>
</a>

<?php endforeach; ?>
</div>
</div>