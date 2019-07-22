(function ($, root, undefined) {

    $(function () {

        $('.banner-botones').each(function () {
            var index = 0;
            var total = $(this).find('.item_nav').length - 1;

            $parent = $(this);
            $parent.find('.item_nav:nth-child(' + (index + 1) + ')').addClass('active');
            $parent.find('.img').css({
                'background-image': 'url("' + $parent.find('.item_nav:nth-child(' + (index + 1) + ')').attr('data-img') + '")'
            });

            $(this).find('.inside_navigation .nav').on('click', function () {
                if ($(this).hasClass('next')) {
                    if (index < total) index++;
                    else index = 0;
                } else {
                    if (index > 0) index--;
                    else index = total;
                }

                $parent.find('.item_nav.active').removeClass('active');
                $parent.find('.item_nav:nth-child(' + (index + 1) + ')').addClass('active');
                $parent.find('.img').css({
                    'background-image': 'url("' + $parent.find('.item_nav:nth-child(' + (index + 1) + ')').attr('data-img') + '")'
                });
            });
        });

    });

})(jQuery, this);