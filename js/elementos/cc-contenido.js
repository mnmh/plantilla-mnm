(function ($, root, undefined) {

    $(function () {
        var audio  = document.getElementById("audio-cc");

        $('#cc-contenido-top .btn-play').on('click', function(){
            var $elem = $(this)

            if(!$(this).hasClass('playing')){
                $elem.addClass('playing');

                audio.play();
                    audio.oncanplay = () => {
                    audio.play();
                }

                audio.ontimeupdate = () => {
                    var timeCurrent = audio.currentTime;
                    var timeTotal = audio.duration;
                    updateTimeText(timeCurrent, timeTotal);
                }

            } else {
                audio.pause();
                $(this).removeClass('playing');
            }

        })

        function secondsTimeSpanToHMS(s) {
            var h = Math.floor(s/3600);
            s -= h*3600;
            var m = Math.floor(s/60);
            s -= m*60;
    
            s = Math.floor(s);
            return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s);
        }

        function updateTimeText(current, total) {
            var porcentaje = ((current * 100)/total);

            if(porcentaje < 100){
                $('#cc-contenido-top .slider_player .current').attr('style', 'width: '+porcentaje+'%')
                $('#cc-contenido-top .btn-play').html(secondsTimeSpanToHMS(current) + "/" + secondsTimeSpanToHMS(total))
            } else {
                $('#cc-contenido-top .slider_player .current').attr('style', 'width: 0%')
                $('#cc-contenido-top .btn-play').html('Reproducir')
                $('#cc-contenido-top .btn-play').removeClass('playing')
            }
            
        }
    });

})(jQuery, this);