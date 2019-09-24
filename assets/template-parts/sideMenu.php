<div id="menu_lateral">
<div class="menu-wrapper">
	<div class="main-menu">
		<div class="item">
			<div class="inside">
				<div class="name">Recorre</div>
				<!-- <div class="des">
					{{darCopy('recorre')}}
				</div> -->
			</div>
			<nav class="secondLvl">
				<ul>
					<li><a href="<?php echo PROYECTO ?>" data-target="#" class="itemChild">
						<span>Sobre el proyecto</span>
					</a></li>
					<li><a href="<?php echo EDIFICIO ?>" data-target="#" class="itemChild">
						<span>Diseño del edificio</span>
					</a></li>
					<li><a href="<?php echo PLANMUSEO ?>" data-target="#" class="itemChild">
						<span>Plan museológico</span>
					</a></li>
					<li><a href="http://museodememoria.gov.co/informate/" data-target="#" class="itemChild">
						<span>Infórmate</span>
					</a></li>
				</ul>
			</nav>
		</div>
		<div class="item">
			<div class="inside">
				<div class="name">Comprende</div>
				<!-- <div class="des">
					{{darCopy('comprende')}}
				</div> -->
			</div>
			<nav class="secondLvl">
				<ul>
					<li><a href="<?php echo ARTE; ?>" class="itemChild">
					<span>Arte y Cultura</span>
					</a></li>
					<li><a href="<?php echo VOCES?>" data-target="#" class="itemChild">
						<span>Voces para transformar</span>
					</a></li>
					<li><a href="#" data-target="#" class="itemChild">
						<span>Archivo DDHH</span>
					</a></li>
					<li><a href="http://centrodememoriahistorica.gov.co/observatorio/" data-target="#" class="itemChild">
						<span>Observatorio de cifras</span>
					</a></li>		
				</ul>
			</nav>
		</div>
		<div class="item">
			<div class="inside">
				<div class="name">Transforma</div>
				<!-- <div class="des">
					{{darCopy('comprende')}}
				</div> -->
			</div>
			<nav class="secondLvl">
				<ul>
					<li><a href="<?php echo EDUCACION ?>" data-target="#" class="itemChild">
						<span>Educación</span>
					</a></li>
					<li><a href="<?php echo PROGRAMACION ?>" data-target="#" class="itemChild">
						<span>Agenda</span>
					</a></li>			
				</ul>
			</nav>
		</div>
	</div>
	<div class="right">
		<?php
          $args = array (
            'post_type' => 'post',
            'tax_query' => array(
              array(
              'taxonomy' => 'category',
              'field' => 'slug',
              'terms' => 'noticias',
              'operator'  => 'IN'
              )
            ),
            'posts_per_page'   => 6,
          );

          $noticias = get_posts($args);

        foreach($noticias as $noticia):
          $img = get_field('imagen_top', $noticia->ID);
          $des = get_field('extracto', $noticia->ID);
        ?>
		<a href="<?php get_permalink($noticia->ID)?>">
            <div class="item_noticia" style="background-image: url('<?php echo $img['sizes']['large']?>')"></div>
			<h3 class="title"><?php echo $noticia->post_title?></h3>
			<p class="descripcion"><?php echo $noticia->post_excerpt?></p>
		</a>
		<?php endforeach; ?>
	</div>

	<nav id="right_menu_nav">
		<div class="item prev">
			<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <g> <path d="M18.8,22c1.7,0,3.2,1.4,3.2,3.2c0,1.7-1.4,3.2-3.2,3.2c-1.7,0-3.2-1.4-3.2-3.2C15.7,23.4,17.1,22,18.8,22z"/> <path d="M31.8,9c1.7,0,3.2,1.4,3.2,3.2c0,1.7-1.4,3.2-3.2,3.2c-1.7,0-3.2-1.4-3.2-3.2C28.7,10.4,30.1,9,31.8,9z"/> <path d="M28.7,38.2c0-1.7,1.4-3.2,3.2-3.2c1.7,0,3.2,1.4,3.2,3.2c0,1.7-1.4,3.2-3.2,3.2C30.1,41.3,28.7,39.9,28.7,38.2 z"/> </g> </svg>
		</div>
		<div class="item next">
			<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <g> <path d="M31.8,27.8c-1.7,0-3.2-1.4-3.2-3.2c0-1.7,1.4-3.2,3.2-3.2c1.7,0,3.2,1.4,3.2,3.2C35,26.4,33.6,27.8,31.8,27.8z "/> <path d="M18.8,40.8c-1.7,0-3.2-1.4-3.2-3.2c0-1.7,1.4-3.2,3.2-3.2c1.7,0,3.2,1.4,3.2,3.2C22,39.4,20.6,40.8,18.8,40.8z "/> <path d="M22,11.6c0,1.7-1.4,3.2-3.2,3.2c-1.7,0-3.2-1.4-3.2-3.2c0-1.7,1.4-3.2,3.2-3.2C20.6,8.5,22,9.9,22,11.6z"/> </g> </svg>
		</div>
	</nav>
</div>
</div>
