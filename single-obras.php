<?php get_header() ?>
<?php
$terms_disciplina = wp_get_post_terms(get_the_ID(), 'disciplina');
$terms_tecnica = wp_get_post_terms(get_the_ID(), 'tecnica');
$terms_autor = wp_get_post_terms(get_the_ID(), 'autor');

$galeria = get_field('galeria');
$videos = get_field('videos');
?>
 <article class="page-obras">
    	<div class="galeria">
            <div class="inside">
                <div class="item intro">
                    <div class="inside_content">
                        <h1><?php the_title()?></h1>
                        <ul class="autores">
                            <li class="autor fecha"><?php get_the_date('Y')?></li>
                            <?php foreach($terms_autor as $term):?>
                                <li class="autor"><?php echo $term->name?></li>
                            <?php endforeach ?>
                        </ul>

                        <ul class="tags">
                            
                            <?php foreach($terms_disciplina as $term):?>
                                <li class="tag"><?php echo $term->name?></li>
                            <?php endforeach ?>
                            <?php foreach($terms_tecnica as $term): ?>
                                <li class="tag"><?php echo $term->name?></li>
                            <?php endforeach ?>

                        </ul>
                    </div>
                </div>

                <?php foreach($galeria as $gal): ?>
                    <div class="item img">
                        <div class="inside" style="background-image: url('<?php echo $gal['url']?>')"></div>
                    </div>
                <?php endforeach ?>

                <?php if($videos): foreach($videos as $vid): ?>
                <?php
                    $servidor = $vid['servidor'];
                    $id = $vid['id'];

                    if($servidor == 'YouTube'):
                        $id = getYoutubeId($id);
                    elseif($servidor == 'Vimeo'):
                        $id = getVimeoId($id);
                    endif;
                ?>
                    <div class="item video <?php echo $servidor?>" data-id="<?php echo $id?>">
                        <div class="notice">Haz click para reproducir</div>
                        <div class="inside"></div>
                    </div>
                <?php endforeach; endif; ?>
            </div>
        	<nav class="gal_nav">
                <div class="item_nav prev"></div>
                <div class="item_nav next"></div>
            </nav>
    	</div>

        <div class="texto">
            <?php
                $obra = get_field('obra');
                $proceso = get_field('proceso');
                $contexto = get_field('contexto');
            ?>

            <ul class="left">
                <?php if($obra): ?>
                    <li class="item" data-div=".obra_txt">Obra</li>
                <?php endif; ?>
                <?php if($proceso): ?>
                    <li class="item" data-div=".proceso">Proceso</li>
                <?php endif; ?>
                <?php if($contexto): ?>
                    <li class="item" data-div=".contexto">Contexto</li>
                <?php endif; ?>
            </ul>
            <div class="content">
                <?php if($obra): ?>
                    <div class="inside obra_txt"><?php echo $obra ?></div>
                <?php endif; ?>
                <?php if($proceso): ?>
                    <div class="inside proceso"><?php echo $proceso ?></div>
                <?php endif; ?>
                <?php if($contexto): ?>
                    <div class="inside contexto"><?php echo $contexto ?></div>
                <?php endif; ?>
            </div>
        </div>
    </article>
<?php get_footer() ?>