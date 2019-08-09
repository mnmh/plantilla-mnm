<nav id="secondary_menu">
	<?php
    	$terms_disciplina = wp_get_post_terms(get_the_ID(), 'disciplina');
		$terms_tecnica = wp_get_post_terms(get_the_ID(), 'tecnica');
		$terms_autor = wp_get_post_terms(get_the_ID(), 'autor');

		$galeria = get_field('galeria');
		$videos = get_field('videos');
    ?>

    <div class="parent-nav">
    	<ul class="dropdown">
    		<?php foreach($terms_autor as $term): ?>
				<li class="link">
					<?php $term->name; ?>
				</li>
            <?php endforeach; ?>

			<?php foreach($terms_disciplina as $term): ?>
				<?php if($term->term_id != 142 && $term->term_id != 143 && $term->term_id != 141): ?>
					<?php
						$term_color = get_field('color', $term);
						list($r, $g, $b) = sscanf($term_color, "#%02x%02x%02x");
					?>
					<li class="link categoria" style="background-color: rgb(<?php $r; ?>, <?php $g; ?>, <?php $b; ?>)">
						<?php $term->name; ?>
					</li>
                <?php endif; ?>
            <?php endforeach; ?>
    	</ul>
    </div>
</nav>