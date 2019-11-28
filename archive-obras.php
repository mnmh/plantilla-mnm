<?php get_header(); ?>

<?php
	$content = get_post_field('post_content', 7408);
	$blocks = parse_blocks( $content );
	if(count($blocks) > 1):
		echo render_block($blocks[0]);
		echo render_block($blocks[1]);
		echo render_block($blocks[2]);
		echo render_block($blocks[3]);
		echo render_block($blocks[4]);
	endif;
?>


<article class="page-obras">
	<?php get_template_part('/assets/template-parts/navegacion-obras-nuevo') ?>

	<div class="navegacionFiltros">
        <?php
            $terms = get_terms( 'autor', array(
				'hide_empty' => true,
			) );
			$out = '';
			$alfa = '';
			$current_first = '';
        ?>
        <div class="autores">
            <?php foreach($terms as $term): ?>
                <?php
                    $str = trim($term->name);
					$str = strtolower($str);
					$str = elimina_acentos($str);
					$first_temp = substr($str, 0, 1);
					if($first_temp != $current_first){
						$current_first = $first_temp;
						$alfa .= '<div class="letter" data-div="letter_'.$current_first.'">';
						$alfa .= $current_first;
						$alfa .= '</div>';
					}
					$out .= '<li data-url="'.get_blogInfo('url').'/wp-json/wp/v2/obras?autor='.$term->term_id.'&per_page=20" data-bio="'.get_blogInfo('url').'/wp-json/wp/v2/autor/'.$term->term_id.'" data-name="'.$term->name.'" class="letter_'.$current_first.'">'.$term->name.'<span class="number">'.$term->count.'</span></li>';
                ?>
            <?php endforeach;?>

            <div class="alfa">
				<?php echo $alfa;?>
			</div>

            <ul class="listado">
				<?php echo $out;?>
			</ul>
        </div>

        
    </div>

	<div class="items btm">
		
        <?php
            $args = array (
				'post_type' => 'obras',
				'posts_per_page'   => 20,
			);

			$posts = get_posts($args);

			$sticky_posts = get_option( 'sticky_posts' );
			$sticky_offset = 0;

			for($i = 0; $i < sizeof($posts); $i++){
				if ( in_array( $posts[$i]->ID, $sticky_posts ) ) {
	                $sticky_post = $posts[$i];

	                array_splice( $posts, $i, 1 );
	            }
			}


			for($i = 0; $i < sizeof($sticky_posts); $i++){
				if(get_post_type($sticky_posts[$i]) == 'obras'){
					$sticky_post = get_post($sticky_posts[$i]);
					array_splice( $posts, $sticky_offset, 0, array($sticky_post) );
					$sticky_offset++;
				}
			}

            $prev_item = 0;

            foreach($posts as $item): if($item->ID != $prev_item):

                $img = get_field('galeria', $item->ID);
				$url = get_permalink($item->ID);
				$terms_disciplina = wp_get_post_terms($item->ID, 'disciplina');
				$terms_tecnica = wp_get_post_terms($item->ID, 'tecnica');
				$terms_autor = wp_get_post_terms($item->ID, 'autor');

				$class = '';
				if(in_array( $item->ID, $sticky_posts ))
					$class = 'sticky';
        ?>
            <a href="<?php echo $url?>" class="obra <?php echo $class?>" data-id="<?php echo $item->ID?>">
				<div class="img" style="background-image: url('<?php echo $img[0]['sizes']['archivo_thumb']?>')"></div>
				<div class="title">
					<?php echo $item->post_title?>
				</div>
				<ul class="autor_listado">
					<?php foreach($terms_autor as $term): ?>
						<li><?php echo $term->name?></li>
					<?php endforeach; ?>
				</ul>

				<ul class="disciplina">
					<?php foreach($terms_disciplina as $term): ?>
						<?php if($term->term_id != 142 && $term->term_id != 143 && $term->term_id != 141): ?>
                            <?php
								$term_color = get_field('color', $term);
								list($r, $g, $b) = sscanf($term_color, "#%02x%02x%02x");
							?>
							
							<!-- <div style="background-color: rgb(<?php echo $r?>, <?php echo $g?>, <?php echo $b?>)"> -->
								<li class="li_categ" data-categ="categ_<?php echo $term->term_id?>" style="background-color: rgb(<?php echo $r?>, <?php echo $g?>, <?php echo $b?>)"></li>
							<!-- </div> -->
                        <?php endif;?>
					<?php endforeach; ?>
				</ul>		
			</a>
            <?php $prev_item = $item->ID; ?>
            <?php endif; endforeach;?>
            <div class="moreNav" data-url="<?php echo get_blogInfo('url')?>/wp-json/wp/v2/obras?per_page=20&page=" data-page="2">
		</div>
	</div>

    
</article>

<?php
	if(count($blocks) > 4):
		for($i = 5; $i < count($blocks); $i++):
			echo render_block($blocks[$i]);
		endfor;
	endif;
?>

<?php get_footer(); ?>
