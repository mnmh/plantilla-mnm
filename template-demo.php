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
