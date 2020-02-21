<meta charset="<?php bloginfo('charset'); ?>">
<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

<link href="//www.google-analytics.com" rel="dns-prefetch">
<link href="<?php echo get_template_directory_uri(); ?>/img/icons/logo_favicon.ico" rel="shortcut icon">
<link href="<?php echo get_template_directory_uri(); ?>/img/icons/logo_favicon.png" rel="apple-touch-icon-precomposed">

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="<?php bloginfo('description'); ?>">

<?php
    $img = get_the_post_thumbnail_url(get_the_ID(), 'large');
    $gal = get_field('galeria');
    if(get_post_type() == 'obras')
        $img = $gal[0]['url']
?>
<meta property="og:image" content="<?php echo $img ?>" />

<script type="text/javascript">
    var webURL = '<?php echo get_bloginfo('url'); ?>';

    var jsonOb = {
        theme: 'light',
        fontsize: 2
    }

    // localStorage.themeop = JSON.stringify(jsonOb)
    // localStorage.removeItem('themeop')
    if(!localStorage.themeop) localStorage.themeop = JSON.stringify(jsonOb)
    else {
        jsonOb = JSON.parse(localStorage.themeop)
    }
</script>

<?php wp_head(); ?>