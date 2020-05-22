<?php
/**
 * Block Name: BOTONES
 *
 */

// id unico para el bloque
$id = 'botones-' . $block['id'];
$titulo = get_field('titulo');

?>

<div class="botones-carrousel btmdoble">
    <nav class="hori_scroll">
        <div class="prev"></div>
        <div class="next"></div>
    </nav>

    <ul class="botones">
        <?php if(have_rows('identificador_centro_de_contenido')): while(have_rows('identificador_centro_de_contenido')): the_row(); ?>
        <?php
            $id = get_sub_field('id');
            $url = "http://cc.museodememoria.gov.co/wp-json/wp/v2/posts/" . $id;

            $client = curl_init($url);
            curl_setopt($client,CURLOPT_RETURNTRANSFER,true);
            $response = curl_exec($client);

            $result = json_decode($response, true);
        ?>
            <li class="boton">
                <div class="img" style="background-image:url('<?php echo $result['imagen_destacada']['sizes']['large'] ?>')"></div>
                <div class="info">
                    <h2 class="name"><?php echo $result['titulo'] ?></h2>
                </div>
                <a href="/centro-de-contenido/?contenido=<?php echo $id ?>" class="btn">Ver más</a>
            </li>
        <?php endwhile; endif; ?>
    </ul>
</div>