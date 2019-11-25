<nav id="secondary_menu" class="archivo-obras">
	<div class="parent-nav">
		<ul class="dropdown">
			<li class="item_drop color" data-div=".autores">Autor
                <span></span>
			</li>

            <?php
                $terms = get_terms( 'disciplina', array(
                    'hide_empty' => true,
                ) );
                $out = '';
            ?>
                <?php foreach($terms as $term): ?>
                <?php if($term->term_id != 142 && $term->term_id != 143 && $term->term_id != 141): ?>
                    <?php
                        $term_color = get_field('color', $term);
                        list($r, $g, $b) = sscanf($term_color, "#%02x%02x%02x");
                        $out .= '<li data-name="'.$term->name.'" class="item_drop categoria '.$term->slug.' categ_'.$term->term_id.'" data-url="'.get_blogInfo('url').'/wp-json/wp/v2/obras?disciplina='.$term->term_id.'&per_page=20" style="background-color: rgb('.$r.', '.$g.', '.$b.')">'.$term->name.'<span style="color: rgb('.$r.', '.$g.', '.$b.')" class="number">'.$term->count.'</span></li>';
                    ?>
                <?php endif; endforeach; ?>
                    <?php echo $out; ?>
		</ul>
	</div>
</nav>