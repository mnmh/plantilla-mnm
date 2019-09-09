<?php
/**
 * Block Name: Testimonios carrousel
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$testimonios = get_posts(array('post_type' => 'citas', 'posts_per_page' => 10));
// print_r($testimonios);
?>

<div class="citas-container btm">
    <div id="citas">
        <div class="inside">
            <?php foreach($testimonios as $testimonio): ?>
            <div class="item">
                <div class="content">
                    <?php echo $testimonio->post_content; ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>