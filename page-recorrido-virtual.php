<?php get_header(); ?>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<div id="visor_recorrido">
      
    </div>
  	<div id="mapa3d">
  		<div class="intro">
  			Bienvenido al recorrido virtual de Voces para transformar
        <div class="img">
          <img src="{{wp_get_attachment_url(3272)}}">
        </div>
  		</div>

  		<div class="inside">
  			
  		</div>

      <nav class="controls">
        <div class="prev"></div>
        <div class="next"></div>
      </nav>

      <div class="mediador">
        
      </div>

      <div id="slider3d">
        <?php if(have_rows('imagenes_360')): while(have_rows('imagenes_360')): the_row(); ?>
            <?php
              $name = get_sub_field('nombre');
              $audio = get_sub_field('audio');
              $img = get_sub_field('mediador');
              $imagen_360 = get_sub_field('imagen_360');
              $galeria = get_sub_field('galeria');
              $coor = get_sub_field('coordenadas');
              $coordenadas = explode(',', $coor);
              // $coor_y
            ?>
            <div class="item" data-coor-x="<?php echo $coordenadas[0]?>" data-coor-y="<?php echo $coordenadas[1]?>" data-coor-z="<?php echo $coordenadas[2]?>" data-audio="<?php echo $audio['url']?>" data-img="<?php echo $imagen_360['url']?>">

              <div class="txt">
                <?php echo $name?>
              </div>

              

              <nav class="box">
                <?php if($imagen_360): ?>
                  <div class="itemBox openfull"></div>
                <?php endif; ?>
                <?php if($galeria): ?>
                  <div class="itemBox open-gallery">
                  <div class="gal">
                    <?php if($galeria): foreach($galeria as $gal): ?>
                        <div class="itemgal" data-img="<?php echo $gal['sizes']['visor']?>">
                        
                        </div>
                    <?php endforeach; endif; ?>
                    </div>
                  </div>
                <?php endif; ?>
                <?php if($audio): ?>
                  <div data-url="<?php echo $audio['url']?>" class="itemBox audio" data-img="<?php echo $img['sizes']['thumbnail']?>"></div>
                <?php endif; ?>
              </nav>

                
            </div>

        <?php endwhile; endif; ?>
      </div>
  	</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
