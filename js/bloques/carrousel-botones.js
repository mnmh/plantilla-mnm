(function ($, root, undefined) {

    $(function () {

        $('.botones-carrousel .botones, .cuadros-carrousel .cuadros').each(function (i) {
            var flkty = new Flickity(this, {
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'left',
                wrapAround: true
            });

            flkty.on('select', function () {

            });


            var $previousButton = $(this).parent().find('.hori_scroll .prev');
            var $nextButton = $(this).parent().find('.hori_scroll .next');

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