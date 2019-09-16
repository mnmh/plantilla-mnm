<?php get_header(); ?>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

        <?php $galeria = get_field('galeria') ?>
        <?php $tipo = get_field('tipo_ev') ?>
        <?php $inicio = get_field('hora_de_inicio') ?>
        <?php $final = get_field('hora_de_fin') ?>
        <?php $dia = get_field('dia') ?>
        <?php $dia_fin = get_field('dia_fin') ?>

        <?php if($galeria): ?>
            <figure class="wp-block-image btm">
                <img src="<?php echo $galeria[0]['url'] ?>" alt="">
            </figure>
        <?php endif; ?>

        <h2><?php the_title() ?></h2>

        <?php if($tipo): ?>
            <p class="halfbtm">
                <em><?php echo $tipo ?></em>
            </p>
        <?php endif; ?>

        <?php if($tipo): ?>
            <p class="halfbtm">
                <em><?php echo $tipo ?></em>
            </p>
        <?php endif; ?>

        <a class="inscripcion btn" data-id="<?php echo get_the_ID() ?>">Inscribirse</a>
    


    <?php the_content() ?>
    
    <div class="popup">
    <?php
        $settings = array(
            'field_groups' => array('group_5d756c588f0df'),
            'submit_value' => 'Inscribirse',
            'post_id' => 'new_post',
            'new_post'		=> array(
                'post_type'		=> 'correos',
                'post_status'	=> 'publish'
            )
        );

        acf_form($settings);
    ?>
    </div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
