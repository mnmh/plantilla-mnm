<?php
/**
 * Block Name: Footer con botones
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];

$videoid = get_field('videoid');
?>

<div class="videoFrame btm">
<iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $videoid ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>