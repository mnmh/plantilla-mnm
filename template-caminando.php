<?php /* Template Name: Plantilla caminando la memoria */ get_header(); ?>

<?php if (have_posts()): while (have_posts()) : the_post(); ?>

<?php
$resp = $_GET['updated'];
?>

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

<?php
	if($resp == true):
?>

<a href="http://museodememoria.gov.co/caminando-la-memoria/" class="main_btn">Ver los otros lugares de memoria</a>

<div class="mapaContainer form btm">
	<?php
		acf_form(array(
			'post_id'   => 'new_post',
			'post_title'  => true,
			'field_groups' => array(4087),
			'new_post'    => array(
				'post_type'   => 'lugares',
				'post_status' => 'draft'
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
			<p class="label">Web<span>*</span></p>
			<input id="campo_web" type="text">
			<p class="label">Actor que apoya<span>*</span></p>
			<input id="campo_actor" type="text">
			<p class="label">Descripción del lugar de memoria<span>*</span></p>
			<textarea id="campo_des" name="description" id="" cols="30" rows="10"></textarea>
			<p class="label">Escoge un color que represente tu lugar de memoria<span>*</span></p>
		</div>
	</div>

	<p class="copy"><a href="http://centrodememoriahistorica.gov.co/politica-de-tratamiento-de-la-informacion-y-datos-personales/">Política de tratamiento de la información y datos personales.</a></p>
</div>

<?php
	else:
?>

<a href="http://museodememoria.gov.co/caminando-la-memoria/?updated=true" class="main_btn">Ingresar tu lugar de memoria</a>

		<div id="lugares_memoria_hidden">
          <?php
            $args = array (
              'post_type' => 'lugares',
              'posts_per_page'   => -1,
            );

          // get posts
          $posts = get_posts($args);
          ?>

          <?php foreach($posts as $lugar):

              $nombre = get_the_title($lugar->ID);
              $nombre_lugar = get_field('nombre_del_lugar_de_memoria', $lugar->ID);
              $coor = get_field('mapa_2', $lugar->ID);
              $texto = get_field('texto_sobre_su_lugar', $lugar->ID);
              $color = get_field('elige_un_color', $lugar->ID);
            ?>

            <div class="item" id="<?php echo $lugar->ID?>" data-nombre="<?php echo $nombre?>" data-lugar="<?php echo $nombre_lugar?>" data-coor="<?php echo $coor?>" data-texto="<?php echo $texto?>" data-color="<?php echo $color?>"></div>
		  <?php endforeach; ?>
		</div>
		
		<div class="mapaContainer display btm">
		<!-- <div id="mapaid" class="main" style="height: calc(100vh - 100px - 1.5em); z-index: 1;"></div> -->
		<div class="mapaCC">
			<?php get_template_part('/assets/template-parts/mapa-cc') ?>
		</div>
		<div class="sideMap">
			<div class="content">
				<div class="info">
				<div class="lugar"></div>
				</div>
				<div class="texto">Haz click en un lugar de memoria del mapa</div>
			</div>
		</div>
		</div>



<?php
	endif;
?>

<?php the_content() ?>

<?php endwhile; endif; ?>

<?php get_footer(); ?>