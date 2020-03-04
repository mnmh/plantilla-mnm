<?php
/**
 * Block Name: Barra iconos cc
 *
 */

// $terms = get_terms( 'post_tag', array(
//     'hide_empty' => false,
// ) );

$out = '';
$alfa = '';
$current_first = '';

$url = "http://cc.museodememoria.gov.co/wp-json/wp/v2/tags?per_page=100";
$terms = array();

for($i = 0; $i < 6; $i++){
    if($i > 0) $url . '&page=' . ($i + 1);

    $client = curl_init($url);
    curl_setopt($client,CURLOPT_RETURNTRANSFER,true);
    $response = curl_exec($client);

    $result = json_decode($response);

    array_merge($terms, $result);
    // print_r($result);
}

print_r($terms);

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
        $out .= '<li data-slug="'.$term->slug.'" class="letter_'.$current_first.'">'.$term->name.'</li>';
    ?>
<?php endforeach;?>


<div class="filtro_tags cc center <?php echo $block['className'] ?>">
    <div class="titulo-modulo">
        <h2 class="sec">Etiquetas</h2>
    </div>

    <div class="alfa">
        <?php echo $alfa;?>
    </div>

    <ul class="listado">
        <?php echo $out;?>
    </ul>

    <ul class="selected">
        <li class="default">Una pruba de tags</li>
    </ul>
</div>