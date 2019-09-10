(function ($, root, undefined) {

    $(function () {

        $('.banner .tarjetas .item').on('click', function () {
            $parent = $(this).parent().parent().parent();
            $parent.find('.img').attr('style', $(this).attr('data-imagen'));
            $('.banner .tarjetas .item.active').removeClass('active');
            $(this).addClass('active');
            var titulo = $(this).attr('data-titulo');
            var des = $(this).attr('data-des');
            $parent.find('.content .titulo').html(titulo);
            $parent.find('.content .txt').html(des);
        });

        $('.banner .tarjetas .item:first-child').click();

        $('.audio.piepag .tarjetas .play').on('click', function(){
            var audio = document.getElementById("audioPlayer");

            if(!$(this).hasClass('playing')){
                var urlAudio = $(this).attr('data-audio');
                console.log(urlAudio);
                // var urlAudio = '/audio.mp3';
                audio.setAttribute('src', urlAudio);

                $('.audio.piepag .tarjetas .play.playing').removeClass('playing').removeClass('paused');
                $(this).addClass('playing');

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
                $(this).addClass('paused');
            }
            

        });

        $('.banner.audio .play').on('click', function() {
            var audio = document.getElementById("audioPlayer");
            if(!$(this).hasClass('playing')){
                var urlAudio = $(this).attr('data-url');
                audio.setAttribute('src', urlAudio);

                $('.banner.audio .play.playing').removeClass('playing').removeClass('paused');
                $(this).addClass('playing');

                audio.oncanplay = () => {
                    audio.play();
                }
            } else {
                audio.pause();
                $(this).addClass('paused');
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
    
            $('.reproductor .current').attr('style', 'width: '+porcentaje+'%');
            $('.reproductor .time').html(secondsTimeSpanToHMS(current) + "/" + secondsTimeSpanToHMS(total));
        }

    });

})(jQuery, this);