<?php function crearMes() {
    $dia_num = date("j");
    $mes_num = date("m");
    $year = date("Y");
    
    $date_today = getdate(mktime(0,0,0,$mes_num,1,$year));
    $mes_nombre = $date_today["month"];
    $primer_dia_mes = $date_today['wday'];
    $loop = true;
    $today = 27;
    while(($today <= 32) && ($loop)):
        $date_today = getdate(mktime(0,0,0,$mes_num,$today,$year));
        if($date_today["mon"] != $mes_num):
            $ultimo_dia = $today - 1;
            $loop = false;
        endif;
        $today++;
    endwhile;
?>
<div class="mes mes_<?php echo zerofill($mes_num, 2) ?>">
    <div class="item nav hide"></div>
    <div class="item nombre"><?php echo $mes_nombre ?></div>
    <div class="item nav next"></div>
    <div class="item dia_nom">
        <div class="inside">Dom</div>
    </div>
    <div class="item dia_nom">
        <div class="inside">Lun</div>
    </div>
    <div class="item dia_nom">
        <div class="inside">Mar</div>
    </div>
    <div class="item dia_nom">
        <div class="inside">Mie</div>
    </div>
    <div class="item dia_nom">
        <div class="inside">Jue</div>
    </div>
    <div class="item dia_nom">
        <div class="inside">Vie</div>
    </div>
    <div class="item dia_nom">
        <div class="inside">Sab</div>
    </div>

    <?php
        $dia = 1;
        $wday = $primer_dia_mes;
        $primera_semana = true;
        while($dia <= $ultimo_dia):
            if($primera_semana):
                for($i = 1; $i <= $primer_dia_mes; $i++): ?>
                    <div class="item vacio"></div>
                <?php endfor; $primera_semana = false; endif; ?>

            <?php
                $class = '';
                if($dia == $dia_num) $class = 'hoy';
            ?>
            <div class="item dia_<?php echo zerofill($dia, 2) ?> <?php echo $class ?>"><?php echo $dia ?></div>
            
            <?php
                $wday++;
                $wday = $wday % 7;
                $dia++;
            ?>
        <?php endwhile; ?>
        <?php while($wday <= 6): ?>
            <div class="item vacio"></div>
        <?php $wday++; endwhile; ?>

</div>

<?php } ?>
<?php function crearMesSiguiente() {
$dia_num = date("j");
$mes_num = date("m");
if($mes_num < 12) $mes_num++;
else $mes_num = 1;
$year = date("Y");
$date_new = getdate(mktime(0,0,0,$mes_num,1,$year));
$mes_nombre = $date_new["month"];
$primer_dia_mes = $date_new['wday'];
$loop = true;
$today = 27;
while(($today <= 32) && ($loop)):
    $date_new = getdate(mktime(0,0,0,$mes_num,$today,$year));
    if($date_new["mon"] != $mes_num):
        $ultimo_dia = $today - 1;
        $loop = false;
    endif;
    $today++;
endwhile;
?>
<div class="mes mes_<?php echo zerofill($mes_num, 2) ?> hide">
<div class="item nav prev"></div>
<div class="item nombre"><?php echo $mes_nombre ?></div>
<div class="item nav hide"></div>
<div class="item dia_nom">
    <div class="inside">Dom</div>
</div>
<div class="item dia_nom">
    <div class="inside">Lun</div>
</div>
<div class="item dia_nom">
    <div class="inside">Mar</div>
</div>
<div class="item dia_nom">
    <div class="inside">Mie</div>
</div>
<div class="item dia_nom">
    <div class="inside">Jue</div>
</div>
<div class="item dia_nom">
    <div class="inside">Vie</div>
</div>
<div class="item dia_nom">
    <div class="inside">Sab</div>
</div>

<?php
    $dia = 1;
    $wday = $primer_dia_mes;
    $primera_semana = true;
    while($dia <= $ultimo_dia):
        if($primera_semana):
            for($i = 1; $i <= $primer_dia_mes; $i++): ?>
                <div class="item vacio"></div>
            <?php endfor; $primera_semana = false; endif; ?>

        <div class="item dia_<?php echo zerofill($dia, 2) ?>"><?php echo $dia ?></div>
        
        <?php
            $wday++;
            $wday = $wday % 7;
            $dia++;
        ?>
    <?php endwhile; ?>
    <?php while($wday <= 6): ?>
        <div class="item vacio"></div>
    <?php $wday++; endwhile; ?>

</div>

<?php } 

function zerofill ($num, $zerofill = 5) {
	return str_pad($num, $zerofill, '0', STR_PAD_LEFT);
}
?>