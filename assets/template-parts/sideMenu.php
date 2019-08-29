<div id="menu_lateral">
    <div class="menu-wrapper">
        <div class="main-menu">
            <div class="item">
                <div class="inside">
                    <div class="name">Recorre</div>
                </div>
                <nav class="secondLvl">
                    <ul>
                        <li><a href="<?php echo PROYECTO?>" data-target="#" class="itemChild">
                            <span>Proyecto</span>
                        </a></li>
                        <li><a href="<?php echo PUBLICACIONES?>" data-target="#" class="itemChild">
                            <span>Publicaciones</span>
                        </a></li>
                        <li><a href="<?php echo EQUIPO?>" data-target="#" class="itemChild">
                            <span>Equipo</span>
                        </a></li>
                    </ul>
                </nav>
            </div>
            <div class="item">
                <div class="inside">
                    <div class="name">Comprende</div>
                </div>
                <nav class="secondLvl">
                    <ul>
                        <li><a href="<?php echo ARTE?>" class="itemChild">
                        <span>Arte y Cultura</span>
                        </a></li>
                        <li><a href="<?php echo VOCES?>" data-target="#" class="itemChild">
                            <span>Voces para transformar</span>
                        </a></li>			
                    </ul>
                </nav>
            </div>
            <div class="logo-bar item">
                <img src="<?php echo wp_get_attachment_url(3271)?>" alt="Gobierno de Colombia">
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
            ?>

            <?php foreach($noticias as $noticia):
            $img = get_field('imagen_top', $noticia->ID);
            $des = get_field('extracto', $noticia->ID);
            ?>
            <a href="<?php echo get_permalink($noticia->ID)?>">
                <div class="item_noticia" style="background-image: url('<?php echo $img['sizes']['medium']?>')"></div>
                <h3 class="title"><?php echo $noticia->post_title?></h3>
                <p class="descripcion"><?php echo $noticia->post_excerpt?></p>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>
