(function ($, root, undefined) {

    $(function () {
        var current = 1;
        var total = $('.linea-tiempo .nav .dot').length;

        // console.log(current, total)

        $('.linea-tiempo .nav .dot').on('click', function () {
            $('.linea-tiempo .nav .dot.active').removeClass('active');
            $(this).addClass('active');

            var index = $(this).index() + 1;
            $('.linea-tiempo .top .item.active').removeClass('active');
            $('.linea-tiempo .top .item:nth-child(' + index + ')').addClass('active');
        });

        $('.linea-tiempo .nav .next').on('click', function() {
            if(current < total) {
                current++;
                $('.linea-tiempo .nav .dot:nth-child('+current+')').click();
            }
        })

        $('.linea-tiempo .nav .prev').on('click', function() {
            if(current > 1) {
                current--
                $('.linea-tiempo .nav .dot:nth-child('+current+')').click();
            }
        })

        $('.linea-tiempo .nav .dot:first-child').click();
    });

})(jQuery, this);