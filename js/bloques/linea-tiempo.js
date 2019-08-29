(function ($, root, undefined) {

    $(function () {
        $('.linea-tiempo .nav .dot').on('click', function () {
            $('.linea-tiempo .nav .dot.active').removeClass('active');
            $(this).addClass('active');

            var index = $(this).index() + 1;
            $('.linea-tiempo .top .item.active').removeClass('active');
            $('.linea-tiempo .top .item:nth-child(' + index + ')').addClass('active');
        });

        $('.linea-tiempo .nav .dot:first-child').click();
    });

})(jQuery, this);