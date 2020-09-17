<?php
/**
 * Block Name: It2020 - Calendario awa
 *
 */

// id unico para el bloque
$id = 'bloque-' . $block['id'];
$audio = get_field('audio');
// print_r($audio);
?>

<div class="reproductor_sencillo halfbtm" id="<?php echo $id ?>">
    <audio src="<?php echo $audio['url'] ?>"></audio>
    <div class="time">
        <div class="bar">
            <div class="num"></div>
        </div>
    </div>
    <div class="inside">
        <div class="left">
            <div class="btn"></div>
        </div>
        <div class="right">
            <div class="inside_txt">
                <?php echo get_field('texto') ?>
            </div>
        </div>
    </div>
</div>