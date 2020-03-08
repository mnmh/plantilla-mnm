(function ($, root, undefined) {

    $(function () {

        $(window).load(function() {
            $('.perfiles-list, .profiles-list').each(function (i) {
                // console.log(i);
                var flkty = new Flickity(this, {
                    prevNextButtons: false,
                    pageDots: false,
                    cellAlign: 'left',
                    wrapAround: true,
                    draggable: true
                });

                console.log($('.profiles-list').hasClass('sin-carrusel'));
                if ( $('.profiles-list').hasClass('sin-carrusel') ) {
                    console.log('draggable: ', flkty.options.draggable);
                    

                    flkty.options.draggable = !flkty.options.draggable;
                    flkty.updateDraggable();
                    
                    console.log('draggable: ', flkty.options.draggable);
                }

                
                flkty.on('select', function () {
                    $('.profiles-container .des').addClass('active');
                    $('.profiles-item.active').removeClass('active');

                    var $item = $('.profiles-item.is-selected');
                    $item.addClass('active')
                    var txt = $item.attr('data-des');
                    if (txt) {
                        $('.profiles-container .des').html(txt);
                    }
                });
    
                // console.log('holaaa');
    
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
        })

        

    });

    $(window).load(function() {
        window.dispatchEvent(new Event('resize'));
    })

})(jQuery, this);