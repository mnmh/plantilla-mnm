<?php /* Template Name: Plantilla uno */ get_header(); ?>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<?php
	
		$blocks = parse_blocks( get_the_content() );
		if(count($blocks) > 0):
			echo render_block($blocks[0]);
		endif;
	?>
	<div class="columnas">
		<div class="left">
			<?php
				$parentID = $post->post_parent;
				$args = array(
					'post_parent' => $parentID,
					'numberposts' => -1,
					'post_type' => 'page',
					'order' => 'ASC'
				);

				$children = get_children($args);

				// print_r($children);

				foreach($children as $child):

					$class = '';
					if($post->ID == $child->ID)
						$class = 'active';
			?>
				<a href="<?php echo get_permalink($child->ID) ?>" class="<?php echo $class ?> itemList"><?php echo $child->post_title ?></a>
			<?php endforeach;?>
		</div>
		<div class="right">
			<?php
				for($i = 1; $i < count($blocks); $i++):
					echo render_block($blocks[$i]);
				endfor;
			?>
		</div>
	</div>
	

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
