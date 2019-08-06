(function ($, root, undefined) {

    $(function () {

        $('.banner-botones').each(function () {
            var index = 0;
            var total = $(this).find('.item_nav').length;

            $parent_temporal = $(this);
            $parent_temporal.find('.item_nav:nth-child(' + (index + 1) + ')').addClass('active');
            $parent_temporal.find('.img').css({
                'background-image': 'url("' + $parent_temporal.find('.item_nav:nth-child(' + (index + 1) + ')').attr('data-img') + '")'
            });

            $parent_temporal.find('.inside_navigation .nav').on('click', function () {
                if ($(this).hasClass('next')) {
                    if (index < total - 1) index++;
                    else index = 0;
                } else {
                    if (index > 1) index--;
                    else index = total;
                }


                $newItem = $parent_temporal.find('.item_nav:nth-child(' + (index + 1) + ')');
                $parent_temporal.find('.item_nav.active').removeClass('active');
                $newItem.addClass('active');
                $parent_temporal.find('.img').css({
                    'background-image': 'url("' + $newItem.attr('data-img') + '")'
                });
            });
        });

    });

})(jQuery, this);