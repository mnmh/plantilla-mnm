<?php
/**
 * Block Name: Agenda
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];

$today = date('Ymd');
$args = array (
    'post_type' => 'programacion',
    'meta_query' => array(
        'relation' => 'AND',
        'dia' => array(
            'key'		=> 'dia',
            'compare'	=> '>=',
            'value'		=> $today,
        ),
        'hora' => array(
            'key'		=> 'hora_de_inicio',
            'compare'	=> 'EXISTS'
        )
    ),
    'tax_query' => array(
        array(
            'taxonomy' => 'tipo_evento',
            'field' => 'slug',
            'terms' => 'radio',
            'operator'  => 'NOT IN'
        )
    ),
    'posts_per_page'   => -1,
    'orderby' => array(
        'dia' => ASC,
        'hora' => ASC
    )
);

// get posts
$posts = get_posts($args);
// print_r($posts);

$mes = '';
$dia = '';
$dia_num = '';

$array_meses = array();
$array_dias = array();

$outmeses = '';
$outdias = '';
$out = '';

foreach($posts as $post):
    // echo 'hola';
    $id = $post->ID;
    $url = get_permalink($id);
    $date = get_field('dia', $id);
    $date = str_replace('/', '-', $date);
    $time = strtotime($date);
    $title = $post->post_title;
    $hora_inicio = get_field('hora_de_inicio', $id);
    $hora_fin = get_field('hora_de_fin', $id);
    $lugar = get_field('lugar', $id);
    $participante = get_field('participante', $id);

    $tipo = get_field('tipo_ev', $id);
    if(!$tipo) $tipo = '';

    $mes_temp = date('F',$time);
    $mes_temp = darMesEspanol($mes_temp);
    $dia_num_temp = date('d',$time);

    $dia_temp = date('D',$time);
    $dia_temp = darDiaEspanol($dia_temp);

    if(!in_array($mes_temp, $array_meses)){
        $mes = $mes_temp;
        $array_meses[] = $mes;
        $outmeses .= '<div data-div=".'.sanitize_title($mes).'" class="item">'.$mes.'</div>';
    }

    if(!in_array($dia_num_temp, $array_dias)){
        $dia_num = $dia_num_temp;
        $dia = $dia_temp;
        $array_dias[] = $dia_num;
        $outdias .= '<div data-div=".'.sanitize_title($dia).'-'.$dia_num.'" class="item '.sanitize_title($mes_temp).'"><span>'.$dia.'</span>'.$dia_num.'</div>';
    }

    $out .= '<div class="item-agenda '.$mes_temp.' '.sanitize_title($dia_temp).'-'.$dia_num_temp.'">
        <div class="hora">'.str_replace(":","&#58;",$hora_inicio).'</div>
        <div class="inside">
        <div class="tipo">'.$tipo.'</div>
        <div class="nombre">'.$title.'</div>
        <div class="ubicacion">'.$lugar.'</div>
        <div class="time">'.$hora_inicio.' - '.$hora_fin.'</div>
        <a class="inscripcion btn">Inscribirse</a>
        <div class="texto">'.$post->post_content.'</div>
        <div class="texto participante">'.$participante.'</div>
        </div>
    </div>';

endforeach;

?>

<div class="agenda medallo">

    <div class="nav">
        <div data-div="agenda_dias" class="itemNav btn active">Vista por días</div>
        <div data-div="calendario_mes" class="itemNav btn">Vista por mes</div>
    </div>
    
    <div class="agenda_dias">
        <nav class="timeNav">
            <div class="meses"><?php echo $outmeses ?></div>
            <div class="dias"><?php echo $outdias ?></div>
        </nav>
        <div class="agenda-wrapper">
            <nav class="hori_scroll">
                <span class="num"></span>
                <div class="prev"></div>
                <div class="next"></div>
            </nav>
            <div class="items">
                <?php echo $out ?>
            </div>
        </div>
    </div>

    <div class="calendario_mes">
        <div class="listado">
            <?php
                foreach($posts as $post):
                    $id = $post->ID;
                    $date = get_field('dia', $id);
                    $date = str_replace('/', '-', $date);
                    $time = strtotime($date);
                    $title = $post->post_title;
                    $hora_inicio = get_field('hora_de_inicio', $id);
                    $mes_temp = date('m',$time);
                    $dia_num_temp = date('d',$time);
            ?>
                    <div class="itemListado" data-mes="<?php echo 'mes_' . $mes_temp ?>" data-date="<?php echo 'dia_' . $dia_num_temp ?>">
                        <div class="hora"><?php echo $hora_inicio; ?></div>
                        <div class="title"><?php echo $title; ?></div>
                    </div>
            <?php endforeach; ?>
        </div>
        <div id="calendario">
            <?php crearMes(); ?>
            <?php crearMesSiguiente(); ?>
        </div>
        
    </div>
 
</div>

<div class="popup">
<?php
    $settings = array(
        'field_groups' => array('group_5d756c588f0df'),
        'submit_value' => 'Inscribirse'
    );

    acf_form($settings);
?>
</div>