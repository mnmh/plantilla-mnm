(function ($, root, undefined) {

    $(function () {
        $('.reproductor_sencillo .left .btn').each(function(){
            id = $(this).attr('data-id')
            $item = $(this).parent().parent().parent()
            $audio = $item.find('audio')

            $audio[0].ontimeupdate = () => {
                var timeCurrent = $audio[0].currentTime;
                var timeTotal = $audio[0].duration;

                var porcentaje = ((timeCurrent * 100)/timeTotal);
        
                $item.find('.time .bar').attr('style', 'width: '+porcentaje+'%');
                $item.find('.time .num').html("<span>" + secondsTimeSpanToHMS(timeCurrent) + "</span> / " + secondsTimeSpanToHMS(timeTotal));
            }

            function secondsTimeSpanToHMS(s) {
                var h = Math.floor(s/3600);
                s -= h*3600;
                var m = Math.floor(s/60);
                s -= m*60;
        
                s = Math.floor(s);
                return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s);
            }
            
            $(this).on('click', function() {
                $item = $(this).parent().parent().parent()
                $audio = $item.find('audio')
                
                if($(this).hasClass('playing')){
                    $audio[0].pause()
                    $(this).removeClass('playing')
                } else {
                    $audio[0].play()
                    $(this).addClass('playing')
                }
                
            })
        })
    });

})(jQuery, this);