<?php /* Template Name: Plantilla caminando la memoria */ get_header(); ?>

<?php if (have_posts()): while (have_posts()) : the_post(); ?>

<div class="topHeader">
	<?php get_template_part('/assets/template-parts/logo-caminando') ?>
</div>

<div class="informacion">
	<div class="inside">

		<div class="txt btm">
			<p>Las iniciativas y lugares de memoria son símbolos de reconciliación, además de memoriales de reconocimiento a las víctimas y lugares de encuentro e intercambio que fomentan la superación de la violencia.</p>
			<p>Desde el Museo de Memoria de Colombia acompañamos y visibilizamos todas las iniciativas de reparación simbólica que se construyen desde las regiones, a través de “Caminando la Memoria”, una plataforma que busca fortalecer la memoria colectiva sobre los hechos desarrollados en la historia reciente de la violencia en Colombia.</p>
		</div>
		<div class="title">
			<div class="icon">
			<?php get_template_part('/assets/template-parts/logo-simple-caminando') ?>
			</div>
			<div class="content">
				<h2>Un proyecto colectivo</h2>
			</div>
		</div>
		<div class="txt">
			<p>Caminando la Memoria empieza su travesía por Colombia convocando a las iniciativas y lugares de Memoria a visibilizar en un mapa georeferenciado, sus historias, fotos y ubicación para construir de manera colectiva una plataforma que visibilice las iniciativas de memoria. </p>
			<p>Caminando la Memoria se convierte en la ventana para todos los procesos y acciones de las iniciativas de Memoria que ocurren en el territorio Nacional.</p>
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