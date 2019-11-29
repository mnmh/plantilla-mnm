(function ($, root, undefined) {

    $(function () {

        $(window).load(function() {
            $('.perfiles-list, .profiles-list').each(function (i) {
                // console.log(i);
                var flkty = new Flickity(this, {
                    prevNextButtons: false,
                    pageDots: false,
                    cellAlign: 'left',
                    wrapAround: true
                });
    
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

    window.onload = ()=>{
        // console.log('load');
        window.dispatchEvent(new Event('resize'));
    }

})(jQuery, this);