<?php /* Template Name: Plantilla caminando la memoria */ get_header(); ?>

<?php if (have_posts()): while (have_posts()) : the_post(); ?>

<div class="topHeader">
	<?php get_template_part('/assets/template-parts/logo-caminando') ?>
</div>

<div class="informacion">
	<div class="inside">
		<div class="title">
			<div class="icon">
			<?php get_template_part('/assets/template-parts/logo-simple-caminando') ?>
			</div>
			<div class="content">
				<h2>Sobre este proyecto</h2>
				<h3>Planes de fortalecimiento</h3>
			</div>
		</div>
		<div class="txt">
			<p>Lorem ipsum dolor sit amet, consectetuer adipiscing
elit, sed diam nonummy nibh euismod tincidunt ut
laoreet dolore magna aliquam erat volutpat. Ut wisi

enim ad minim veniam, quis nostrud exerci tation ul-
lamcorper suscipit lobortis nisl ut aliquip ex ea com-
modo consequat. Duis autem vel eum iriure dolor in

hendrerit in vulputate velit esse molestie consequat,
vel illum dolore eu feugiat nulla facilisis at vero eros
et accumsan et iusto odio dignissim qui blandit
praesent luptatum zzril delenit augue duis dolore te
feugait nulla facilisi</p>
		</div>
	</div>
	
</div>

<div class="mapaContainer">
	<?php
		acf_form(array(
			'post_id'   => 'new_post',
			'post_title'  => true,
			'field_groups' => array(4087),
			'new_post'    => array(
				'post_type'   => 'lugares',
				'post_status' => 'publish'
			),
			'submit_value' => 'Sube tu espacio'
		));
	?>

	<div class="sideContent">
		<div class="handle"></div>
		<div class="content">
			<div class="info">
				Haz click en el mapa y completa la información para agregar tu lugar de memoria al mapa.
			</div>
			<p class="label">Nombre del lugar de memoria<span>*</span></p>
			<input id="campo_titulo" type="text">
			<p class="label">Ciudad<span>*</span></p>
			<input id="campo_ciudad" type="text">
			<p class="label">Celular<span>*</span></p>
			<input id="campo_cel" type="text">
			<p class="label">Correo electrónico<span>*</span></p>
			<input id="campo_mail" type="text">
			<p class="label">Descripción del lugar de memoria<span>*</span></p>
			<textarea id="campo_des" name="description" id="" cols="30" rows="10"></textarea>
			<p class="label">Escoge un color que represente tu lugar de memoria<span>*</span></p>
		</div>
	</div>
</div>

<?php the_content() ?>

<?php endwhile; endif; ?>

<?php get_footer(); ?>