(function ($, root, undefined) {

    $(function () {
        $('.slider-columna:not(.half) .right .inside').each(function (i) {
            $parent = $(this).parents('.slider-columna');
            var flkty = new Flickity(this, {
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'left',
                wrapAround: true
            });

            flkty.on('select', function (index) {
                $selected = $parent.find('.right .item:nth-child(' + (index + 1) + ')');
                $parent.find('.left .titulo').html($selected.attr('data-titulo'));
                $parent.find('.left .subtitulo').html($selected.attr('data-subtitulo'));
                $parent.find('.left .enlace').attr('href', $selected.attr('data-enlace'));
                $parent.find('.left .enlace').html($selected.attr('data-textoenlace'));
            });

            $selected = $parent.find('.right .item:nth-child(1)');
            $parent.find('.left .titulo').html($selected.attr('data-titulo'));
            $parent.find('.left .subtitulo').html($selected.attr('data-subtitulo'));
            $parent.find('.left .enlace').attr('href', $selected.attr('data-enlace'));
            $parent.find('.left .enlace').html($selected.attr('data-textoenlace'));

            var $previousButton = $(this).parent().parent().find('.nav .prev');
            var $nextButton = $(this).parent().parent().find('.nav .next');

            if ($previousButton.length > 0) {
                $previousButton.on('click', function () {
                    flkty.previous();
                })
                $nextButton.on('click', function () {
                    flkty.next();
                })
            }
        });
    });

})(jQuery, this);