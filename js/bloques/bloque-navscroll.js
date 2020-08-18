(function ($, root, undefined) {

    $(function () {

        if($('.navegacion_scroll').length > 0){
            var distancia = $('.navegacion_scroll').offset().top;
            $(window).scroll(function(event){
                scrollDistance = $(document).scrollTop() + $('#top_menu').outerHeight();
                var margin = scrollDistance - distancia;
                
                if(scrollDistance >= distancia){
                    $('.spacer_nav_scroll').css({'height': $('.navegacion_scroll').outerHeight()})
                    $('.parent-nav.nav_scroll').css({'margin-top': margin});
                    $('.parent-nav.nav_scroll').addClass('scroll');
                }
                else {
                    $('.spacer_nav_scroll').css({'height': 0})
                    $('.parent-nav.nav_scroll').css({'margin-top': 0});
                    $('.parent-nav.nav_scroll').removeClass('scroll');
                }
            });

            $('.navegacion_scroll .item').on('click', function(){
                var div = $(this).attr('href')
                $.scrollTo(div, 400, {offset: -150})
            })
        }
    });

})(jQuery, this);