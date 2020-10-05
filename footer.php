			
			<div class="photo-gallery">
				<button class="close-slider"></button>
				<ul class="photo-container">
				
				</ul>
			</div>

			<audio src="#" id="audioPlayer"></audio>

			</main>
			<!-- /CONTENIDO -->
		</div>
		<!-- /Wrap -->

		<footer class="content-info site-footer">
			<div class="footer_container">
				<section>
					<h2>Museo de Memoria de Colombia</h2>
					<div class="footer-museo">
						<ul class="museo-links">
							<h3>Recorre</h3>
							<li><a href="http://museodememoria.gov.co/sobre-el-proyecto/que-es-el-museo-de-memoria-de-colombia/">Sobre el proyecto</a></li>
							<li><a href="http://museodememoria.gov.co/diseno-del-edificio/72-pro/">Diseño del edificio</a></li>
							<li><a href="http://museodememoria.gov.co/plan-museologico/guion-conceptual/">Plan museológico</a></li>
							<li><a href="http://museodememoria.gov.co/informate/">Infórmate</a></li>
						</ul>
						<ul class="museo-links">
							<h3>Comprende</h3>
							<li><a href="http://museodememoria.gov.co/arte-y-cultura/">Arte y Cultura</a></li>
							<li><a href="http://museodememoria.gov.co/voces-para-transformar/">Voces para transformar</a></li>
							<li><a href="http://www.archivodelosddhh.gov.co">Archivo DDHH</a></li>
							<li><a href="http://centrodememoriahistorica.gov.co/observatorio/">Observatorio</a></li>
						</ul>
						<ul class="museo-links">
							<h3>Transformar</h3>
							<li><a href="http://museodememoria.gov.co/programacion-2/">Agenda</a></li>
							<li><a href="http://museodememoria.gov.co/pagina-principal/educacion/">Educación</a></li>
						</ul>

						<ul class="cnmh-links">
							<h3>CNMH</h3>
							<li><a href="http://www.centrodememoriahistorica.gov.co/que-es-el-cnmh" target="_blank">Qué es el CNMH</a></li>
							<li><a href="http://www.centrodememoriahistorica.gov.co/areas-de-trabajo" target="_blank">Áreas de Trabajo</a></li>
							<li><a href="http://www.centrodememoriahistorica.gov.co/ley-de-victimas" target="_blank">Ley de Víctimas</a></li>
							<li><a href="http://www.centrodememoriahistorica.gov.co/informes" target="_blank">Publicaciones CNMH</a></li>
							<li><a href="http://www.centrodememoriahistorica.gov.co/practicas-laborales" target="_blank">Pasantías y Prácticas</a></li>
						</ul>
					</div>
				</section>

				<section class="form_mail">
					<h3>Recibe nuestras noticias</h3>
					<?php
						$settings = array(
							'field_groups' => array('group_5d7667e2d999e'),
							'submit_value' => 'Suscribirme',
							'post_id' => 'new_post',
							'new_post'		=> array(
								'post_type'		=> 'base_datos_correos',
								'post_status'	=> 'publish'
							)
						);
					?>
					<?php acf_form($settings); ?>
				</section>

				<section class="footer-logo">
					<div class="img" style="background-image: url('<?php echo get_template_directory_uri(); ?>/img/sprite_imagen.png')"></div>
				</section>

				<ul class="info-links">
					<h3>Más información</h3>
					<li><a class="mail" href="mailto:museodelamemoria@cnmh.gov.co"><strong>museodelamemoria@cnmh.gov.co</strong></a></li>
					<ul class="social">
						<li><a href="https://www.facebook.com/museomemoriacolombia/" target="_blank"><svg class="svg-inline--fa fa-facebook fa-w-14 fa-lg" aria-hidden="true" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"></path></svg><!-- <i class="fab fa-facebook fa-lg"></i> --></a></li>
						<li><a href="https://twitter.com/MuseoMemoria_Co" target="_blank"><svg class="svg-inline--fa fa-twitter fa-w-16 fa-lg" aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg><!-- <i class="fab fa-twitter fa-lg"></i> --></a></li>
						<li><a href="https://www.youtube.com/MuseoMemoriaColombia" target="_blank"><svg class="svg-inline--fa fa-youtube fa-w-18 fa-lg" aria-hidden="true" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg><!-- <i class="fab fa-youtube fa-lg"></i> --></a></li>
						<li><a href="https://www.instagram.com/museomemoriacolombia/" target="_blank"><svg class="svg-inline--fa fa-instagram fa-w-14 fa-lg" aria-hidden="true" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg><!-- <i class="fab fa-instagram fa-lg"></i> --></a></li>
					</ul>
					<div class="git">Esta plantilla de <a href="https://es-co.wordpress.org/">Wordpress</a> ha sido desarrollada por el equipo del laboratorio virtual del Museo de Memoria de Colombia y está disponible en <a href="https://github.com/mnmh/plantilla-mnm">Github</a></div>
				</ul>
			</div>
		</footer>
		
		<?php wp_footer(); ?>

		<!-- analytics -->
		<?php if(!is_user_logged_in()): ?>
			<!-- Global site tag (gtag.js) - Google Analytics -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=UA-116884043-1"></script>
				<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'UA-116884043-1');

			</script>

		<?php endif; ?>

	</body>
</html>
