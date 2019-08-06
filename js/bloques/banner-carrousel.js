(function ($, root, undefined) {

    $(function () {
        $('.banner .carrousel').each(function (i) {
            $parent = $(this);
            var flkty = new Flickity(this, {
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'left',
            });

            flkty.on('select', function (index) {
                $selected = $parent.find('.item:nth-child(' + (index + 1) + ')');
                $parent.parent().find('.content .titulo').html($selected.attr('data-titulo'));
            });

            $selected = $parent.find('.item:nth-child(1)');
            $parent.parent().find('.content .titulo').html($selected.attr('data-titulo'));


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