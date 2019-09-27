<?php /* Template Name: Inscripciones a eventos */ get_header(); ?>

<?php
$args = array (
    'post_type' => 'correos',
    'posts_per_page'   => -1
);

// get posts
$posts = get_posts($args);

foreach($posts as $post):
?>

<div class="itemListado">

</div>

<?php endforeach; ?>

<?php get_footer(); ?>