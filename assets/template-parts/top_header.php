<nav id="top_menu">
	<!-- Boton el menu lateral -->
		<div class="main-wrapper">
			<div class="left_area">
				<div id="menu_lateral_btn">
					<div class="inside">
					<svg class="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="896.374 -5312.277 15.326 15.325"><g transform="translate(896.374 -5312.277)"><ellipse class="a equis-3" cx="1.533" cy="1.533" rx="1.533" ry="1.533" transform="translate(12.26 12.26)"/><ellipse class="a equis-4" cx="1.533" cy="1.533" rx="1.533" ry="1.533" transform="translate(6.13 12.26)"/><ellipse class="a" cx="1.533" cy="1.533" rx="1.533" ry="1.533" transform="translate(6.13 6.13)"/><ellipse class="a equis-1" cx="1.533" cy="1.533" rx="1.533" ry="1.533" transform="translate(0 12.26)"/><ellipse class="a equis-5" cx="1.533" cy="1.533" rx="1.533" ry="1.533" transform="translate(12.26 6.13)"/><ellipse class="a equis-2" cx="1.533" cy="1.533" rx="1.533" ry="1.533" transform="translate(12.26)"/></g></svg>					</div>
				</div>

				<!-- Titulo -->
				<h1 id="title">
					<a href="<?php get_blogInfo('url') ?>"><?php get_blogInfo('name') ?></a>
				</h1>
			</div>
		</div>

	<?php if(is_page(array(2165, 2194, 2192, 2231, 2205, 2326, 1231, 3107)) || (is_single() && get_post_type() == 'post' && !has_category('lugares-de-memoria'))): ?>

	<?php elseif(is_post_type_archive('obras')): ?>
	<?php get_template_part('/assets/template-parts/navegacion-obras') ?>
	<?php elseif(is_single() && get_post_type() == 'obras'): ?>
	<?php get_template_part('/assets/template-parts/navegacion-obras-single') ?>
	<?php endif; ?>
</nav>
<div class="share-box">
	<ul class="share-options">
		<li><a class="facebook-share" target="_blank"><i class="fab fa-facebook fa-2x"></i></a></li>
		<li><a class="twitter-share" href="https://twitter.com/intent/tweet?text=Museo+de+Memoria+Histórica+de+Colombia&url=http%3A%2F%2Fmuseodememoria.gov.co" target="_blank"><i class="fab fa-twitter fa-2x"></i></a></li>
		<li><a class="whatsapp-share" href="whatsapp://send?text=http://museodememoria.gov.co/" data-action="share/whatsapp/share"><i class="fab fa-whatsapp fa-2x"></i></a></li>
		<li class="link">
			<input type="text" value="http://museodememoria.gov.co" readonly>
		</li>
		<li>
			<button class="copy">Copiar</button>
		</li>
	</ul>
</div>
