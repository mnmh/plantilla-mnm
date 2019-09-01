(function ($, root, undefined) {

    $(function () {

        if($('.columnas .left').length > 0){
            var distancia = $('.columnas .left').offset().top;
            $(window).scroll(function(event){
                scrollDistance = $(document).scrollTop() + $('#top_menu').outerHeight();
                var margin = scrollDistance - distancia;
                
                if(scrollDistance >= distancia){
                    $('.columnas .left').css({'margin-top': margin});
                    $('.columnas .left').addClass('scroll');
                }
                else {
                    $('.columnas .left').css({'margin-top': 0});
                    $('.columnas .left').removeClass('scroll');
                }
            });
        }
    });

})(jQuery, this);