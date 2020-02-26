(function ($, root, undefined) {

    $(function () {

        $('.filtro-cc .item').on('click', function(){
            $parent = $('.filtro-cc')
            if(!$(this).hasClass('active')) $(this).addClass('active')
            else $(this).removeClass('active')
            //return false;
        });

        $('.filtro_tags.cc .alfa .letter').on('click', function () {
            var div = $(this).attr('data-div');
            $('.filtro_tags .alfa .active').removeClass('active');
            $(this).addClass('active');
            $('.filtro_tags .listado li').hide();
            $('.filtro_tags .listado li.' + div).show();
        });

        $('.filtro_tags.cc .listado li').on('click', function() {
            if(!$(this).hasClass('active')) $(this).addClass('active')
            else $(this).removeClass('active')

            updateFiltroTagParent();
        })

        function updateFiltroTagParent() {
            var $parent = $('.filtro_tags.cc .alfa .letter.active')
            var div = $parent.attr('data-div')
            if($('.filtro_tags.cc .listado li.active.' + div).length > 0) $parent.addClass('active-persistent')
            else $parent.removeClass('active-persistent')
        }

    });

})(jQuery, this);