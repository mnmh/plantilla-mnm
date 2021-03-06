(function ($, root, undefined) {

    $(function () {
        $('.banner .carrousel').each(function (i) {
            $parent = $(this).parents('.banner');
            var flkty = new Flickity(this, {
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'left',
                adaptiveHeight: false,
                wrapAround: true,
                autoPlay: 20000
            });

            flkty.on('select', function (index) {
                $selected = $parent.find('.item:nth-child(' + (index + 1) + ')');
                console.log($selected.attr('data-sub'));
                cambiarTexto();
            });

            $selected = $parent.find('.item:nth-child(1)');
            cambiarTexto();

            function cambiarTexto() {
                $parent.parent().find('.content .titulo').html($selected.attr('data-titulo'));
                $parent.parent().find('.content .subtitulo').html($selected.attr('data-sub'));
                $parent.parent().find('.content .txt').html($selected.attr('data-des'));
                $parent.parent().find('.content .btn').attr('href', $selected.attr('data-enlace'));
                $parent.parent().find('.content .btn').html($selected.attr('data-btn'));
            }

            var $previousButton = $parent.parent().find('.nav .prev');
            var $nextButton = $parent.parent().find('.nav .next');

            if ($previousButton.length > 0) {
                $previousButton.on('click', function () {
                    flkty.previous();
                });
                $nextButton.on('click', function () {
                    flkty.next();
                });
            }
        });
    });

})(jQuery, this);