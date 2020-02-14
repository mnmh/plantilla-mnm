<?php
/**
 * Block Name: Barra iconos cc
 *
 */

$terms = get_terms( 'post_tag', array(
    'hide_empty' => false,
) );

$out = '';
$alfa = '';
$current_first = '';

foreach($terms as $term): ?>
    <?php
        $str = trim($term->name);
        $str = strtolower($str);
        $str = elimina_acentos($str);
        $first_temp = substr($str, 0, 1);
        if($first_temp != $current_first){
            $current_first = $first_temp;
            $alfa .= '<div class="letter" data-div="letter_'.$current_first.'">';
            $alfa .= $current_first;
            $alfa .= '</div>';
        }
        $out .= '<li data-url="'.get_blogInfo('url').'/wp-json/wp/v2/obras?autor='.$term->term_id.'&per_page=20" data-bio="'.get_blogInfo('url').'/wp-json/wp/v2/autor/'.$term->term_id.'" data-name="'.$term->name.'" class="letter_'.$current_first.'">'.$term->name.'</li>';
    ?>
<?php endforeach;?>


<div class="filtro_tags center">
    <div class="alfa">
        <?php echo $alfa;?>
    </div>

    <ul class="listado">
        <?php echo $out;?>
    </ul>
</div>
