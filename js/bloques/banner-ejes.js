(function ($, root, undefined) {

    $(function () {

        $('.banner .tarjetas .item').on('click', function () {
            $parent = $(this).parent().parent().parent();
            $parent.find('.img').attr('style', $(this).attr('style'));
            $('.banner .tarjetas .item.active').removeClass('active');
            $(this).addClass('active');
            var titulo = $(this).attr('data-titulo');
            var des = $(this).attr('data-des');
            $parent.find('.content .titulo').html(titulo);
            $parent.find('.content .txt').html(des);
        });

    });

})(jQuery, this);