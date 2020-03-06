<?php get_header(); ?>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<?php the_content() ?>

    <?php
        $contenidoID = get_query_var('contenido');

        if($contenidoID !=  ''):
    ?>

    <?php
        $url = "http://cc.museodememoria.gov.co/wp-json/wp/v2/posts/" . $contenidoID;

        $client = curl_init($url);
        curl_setopt($client,CURLOPT_RETURNTRANSFER,true);
        $response = curl_exec($client);

        $result = json_decode($response, true);



        $args = array( 'posts_per_page' => 4, 'category' => 'informativa' );

        $noticias = get_posts($args);
        
    ?>

    <div id="cc-contenido-top">
        <div class="left">
            <div class="titulo"><?php echo $result['titulo'] ?></div>
            <div class="tipo"><?php echo $result['tipo-de-contenido'][0]['name'] ?></div>

            <div class="descripcion">
                <div class="top">Descripción:</div>
                <div class="inside"><?php echo $result['descripcion'] ?></div>
            </div>
        </div>
        <div class="right">
            <?php
                if($result['tipo-de-contenido'][0]['name'] == 'Sonoro'):
            ?>
            <div class="player">
                    <audio id="audio-cc" src="<?php echo $result['archivo']['archivo']['url'] ?>"></audio>
                    <div class="slider_player">
                        <div class="current"></div>
                    </div>
                    <div class="btn-play">Reproducir</div>
            </div>
            <?php elseif($result['tipo-de-contenido'][0]['name'] == 'Audiovisual'): ?>
                <div class="player">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $result['enlace'] ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            <?php elseif($result['tipo-de-contenido'][0]['name'] == 'Publicación'): ?>
                <div class="player">
                    <a href="<?php echo $result['archivo']['archivo']['url'] ?>" class="btn-play publicacion">Descargar publicación</a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="tarjetas galeria noticias btm">
        <div class="inside">
            <?php foreach($noticias as $noticia): ?>

            <?php
                $imagen = get_the_post_thumbnail_url($noticia->ID)
            ?>

            <a href="<?php echo get_permalink($noticia->ID) ?>" class="item">

                <div class="img" style="background-image:url('<?php echo $imagen ?>')"></div>

                <div class="tarjeta-description">
                    <h3><?php echo $noticia->post_title ?></h3>
                </div>
            </a>

            <?php endforeach; ?>
        </div>
    </div>
    <!-- <div id="cc-acordeon">
        <div class="top">
            Detalles básicos
        </div>
        <div class="inside">
            <div class="col">
                <?php darDetalles('Titulo', $result['titulo']) ?>
                <?php darDetalles('Tipo de archivo o contenido', $result['tipo-de-contenido'][0]['name']) ?>
                <?php darDetalles('Fecha', $result['fecha']) ?>
                <?php darDetalles('País', $result['pais'][0]['name']) ?>
                <?php darDetalles('Departamento', $result['departamento'][0]['name']) ?>
            </div>
        </div>
    </div> -->

    <?php else: ?>

    <?php endif;?>

	<?php endwhile; endif; ?>

    <?php function darDetalles($name, $item) {
        if($item != '' && $item): ?>
            <div class="item">
                <div class="name"><?php echo $name ?>:</div>
                <div class="content"><?php echo $item ?></div>
            </div>
    <?php endif;} ?>

<?php get_footer(); ?>
