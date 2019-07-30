(function ($, root, undefined) {

    $(function () {
        var $carousel = $('.photo-gallery .photo-container');

        var $next = $('<div class="next"></div>');
        var $prev = $('<div class="prev"></div>');

        $('.photo-gallery').append($next).append($prev);

        $carousel.flickity({
            cellAlign: 'left',
            contain: true,
            prevNextButtons: false,
            pageDots: false,
        });

        bindNav();

        function bindNav() {
            $next.on('click', function () {
                $carousel.flickity('next');
            });

            $prev.on('click', function () {
                $carousel.flickity('previous');
            });
        }

        $('.close-slider').on('click', function () {
            $('.photo-gallery').toggleClass('visible');
            var $gal = $(this).parent().parent().find('.gal .itemgal').clone();
            $gal.each(function () {
                var img = $(this).attr('data-img');
                $(this).css({
                    'background-image': "url('" + img + "')"
                });
            })
            if ($('.photo-gallery').hasClass('visible')) {
                $carousel.flickity('remove', $('.photo-gallery .itemgal'));
                $carousel.flickity('append', $gal);
            } else {
                $carousel.flickity('remove', $('.photo-gallery .itemgal'));
            }
        });

        $('.tarjetas .item.galeria').on('click', function () {
            $('.photo-gallery').toggleClass('visible');
            var $gal = $(this).find('.gal .itemgal').clone();
            $gal.each(function () {
                var img = $(this).attr('data-img');
                $(this).css({
                    'background-image': "url('" + img + "')"
                });
            })
            if ($('.photo-gallery').hasClass('visible')) {
                $carousel.flickity('remove', $('.photo-gallery .itemgal'));
                $carousel.flickity('append', $gal);
            } else {
                $carousel.flickity('remove', $('.photo-gallery .itemgal'));
            }
        });


        $('.tarjetas .item.video').on('click', function () {
            var video = $(this).attr('data-video');
            var url = 'https://www.youtube.com/embed/' + video + '?autoplay=1&controls=0&rel=0&showinfo=0&color=white';
            $('body').append('<div class="visor_video"><iframe></iframe></div>');
            $('.visor_video iframe').attr('src', url);

            var tl_temp = new TimelineMax();

            tl_temp.add('start')
                .fromTo('.visor_video', 0.2, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1
                });

            $('.visor_video').on('click', function () {
                $(this).remove();
            })
        });
    });

})(jQuery, this);