			
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
					<div class="footer-museo">
						<ul class="museo-links">
							<img class="logo-gov" src="https://museodememoria.gov.co/wp-content/uploads/2022/03/logo-header-govco-01-01.png">
							<img class="logo-co" src="https://museodememoria.gov.co/wp-content/themes/plantilla-mnm/img/logo_Footer_CO.png">
						</ul>
						<ul class="museo-links">
							<h3>Museo de Memoria de Colombia</h3>
							<li>Carrera 7 No 32-42 Pisos 30 y 31 Bogotá, Colombia.</li>
							<li>Código Postal: 110421</li>
							<li>Horario de Atención: Lunes a Viernes 08:00 am - 03:00pm</li>
							<ul class="social-media">
								<li>
									<a target="_blank" href="https://twitter.com/museomemoria_co">
										<img src="https://museodememoria.gov.co/wp-content/themes/plantilla-mnm/img/Logo_twitter.svg">
									</a>
								</li>
								<li>
									<a target="_blank" href="https://www.facebook.com/museomemoriacolombia/">
										<img src="https://museodememoria.gov.co/wp-content/themes/plantilla-mnm/img/Logo_facebook.svg">
									</a>
								</li>
								<li>
									<a target="_blank" href="https://www.instagram.com/museomemoriacolombia/">
										<img src="https://museodememoria.gov.co/wp-content/themes/plantilla-mnm/img/Logo_instagram.svg">
									</a>
								</li>
								<li>
									<a target="_blank" href="https://www.youtube.com/museomemoriacolombia">
										<img src="https://museodememoria.gov.co/wp-content/themes/plantilla-mnm/img/Logo_youtube.svg">
									</a>
								</li>
							</ul>
						</ul>
						<ul class="museo-links">
							<h3><img src="https://museodememoria.gov.co/wp-content/themes/plantilla-mnm/img/telefono_Contacto.svg"> Contacto</h3>
							<li>Teléfono conmutador: (601) 796 5060</li>
							<li>Buzón notificaciones judiciales: notificaciones@cnmh.gov.co</li>
							<li>Correo radicación electrónica: radicacion@cnmh.gov.co</li>
							<li><a href="#">Mapas del sitio</a></li>
							<li><a href="#">Políticas, lineamientos y manuales</a></li>
						</ul>
					</div>
				</section>
			</div>
		</footer>

		<script>

		jQuery(window).scroll(function() {    
			var scroll = jQuery(window).scrollTop();

			if (scroll >= 100) {
				jQuery("#top_menu").addClass("fixedmenu");
			} else {
				jQuery("#top_menu").removeClass("fixedmenu");
			}
		});


		</script>

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
