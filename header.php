<?php acf_form_head(); ?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<!-- Carga el contenido del HEAD del documento -->
		<div class="preheader">
				<img src="https://museodememoria.gov.co/wp-content/uploads/2022/03/logo-header-govco-01-01.png">
			</div>
		<?php get_template_part('/assets/template-parts/head') ?>
	</head>
	<?php get_template_part('/assets/template-parts/sideMenu') ?>
	<body <?php body_class(); ?>>

		<script type="text/javascript">
		document.getElementsByTagName('body')[0].classList.add(jsonOb.theme)
		document.getElementsByTagName('body')[0].classList.add('font_' + jsonOb.fontsize)
		</script>
		<div class="wrap" role="document">
			<!-- Carga la barra de arriba para la navegación -->
			<?php get_template_part('/assets/template-parts/top_header') ?>

			<!-- CONTENIDO -->
			<main id="contenidoGeneral">
