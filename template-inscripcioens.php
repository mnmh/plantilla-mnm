<?php /* Template Name: Inscripciones a eventos */ get_header(); ?>
<?php if(is_user_logged_in()): ?>
<table>
<tbody>
	<?php
	$args = array (
		'post_type' => 'correos',
		'posts_per_page'   => -1
	);

	// get posts
	$posts = get_posts($args);

	foreach($posts as $post):

		$post_id = get_field('post_id', $post->ID);
		$nombre = get_field('nombre', $post->ID);
		$correo = get_field('correo', $post->ID);
		$victima = get_field('victima', $post->ID);
		$tipo_de_poblacion = get_field('tipo_de_poblacion', $post->ID);
		$evento_title = get_the_title($post_id);
	?>

	<tr class="itemListado_tabla">
		<th class="date">
			<?php echo get_the_time('U', $post->ID); ?>
		</th>
		<th class="evento">
			<?php echo $evento_title ?>
		</th>
		<th class="nombre">
			<?php echo $nombre; ?>
		</th>
		<th class="correo">
			<?php echo $correo; ?>
		</th>
		<th class="victima">
			<?php echo $victima; ?>
		</th>
		<th class="tipo_de_poblacion">
			<?php echo $tipo_de_poblacion; ?>
		</th>
	</tr>

	<?php endforeach; ?>
</tbody>
</table>
<?php endif; ?>

<?php get_footer(); ?>