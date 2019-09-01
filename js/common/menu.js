(function ($, root, undefined) {

    $(function () {

        bindMenu();

        function bindMenu() {
            if(!$('#top_menu').hasClass('menu-on')) {
                var scrollDistance = 0;
                $(window).scroll(function(event){
                    scrollDistance = $(document).scrollTop();
                    
                    if(scrollDistance >= 300){
                        $('#top_menu').addClass('small');
                        var tl= new TimelineMax();
    
                        $('#contenidoGeneral .dropBlock').css({'top': $('#top_menu').height() + scrollDistance})
                        tl.to('#top_menu',0, {className: '+=small'})
                        .add(function(){
                            if($('.page-banner').length) $('.page-banner').css('margin-top', 'calc('+$('#top_menu').height()+'px )')
                            if($('.page-obras').length) $('.page-obras').css('margin-top', 'calc('+$('#top_menu').height()+'px - 0.5em)')
                            $('#contenidoGeneral .dropBlock').css({'top': $('#top_menu').height() + scrollDistance})
                        },'+=0.2')
                    }
                    else {
                        $('#top_menu').removeClass('small');
                        var tl= new TimelineMax();
                        
                        $('#contenidoGeneral .dropBlock').css({'top': $('#top_menu').height() + scrollDistance})
                        tl.to('#top_menu',0, {className: '-=small'})
                        .add(function(){
                            if($('.page-banner').length) $('.page-banner').css('margin-top', 'calc('+$('#top_menu').height()+'px )')
                            if($('.page-obras').length) $('.page-obras').css('margin-top', 'calc('+$('#top_menu').height()+'px - 0.5em)')
                            $('#contenidoGeneral .dropBlock').css({'top': $('#top_menu').height() + scrollDistance})
                        },'+=0.2')
                    }
                });
            }
    
            if($('.page-banner').length) $('.page-banner').css('margin-top', 'calc('+$('#top_menu').height()+'px )')
            if($('.page-obras').length) $('.page-obras').css('margin-top', 'calc('+$('#top_menu').height()+'px - 0.5em)')
    
            $('#menu_lateral .right').flickity({
                freeScroll: false,
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                draggable: false,
                cellAlign: 'left',
            }).on('select.flickity', function(){
                $('#menu_lateral .right').flickity('reposition')
            })
    
            $('#right_menu_nav .next').on('click', function(){
                $('#menu_lateral .right').flickity('next');
            })
    
            $('#right_menu_nav .prev').on('click', function(){
                $('#menu_lateral .right').flickity('previous');
            })
    
            $('#menu_lateral_btn').on('click', function(){
                
                var hmenu = $('#top_menu .main-wrapper').height();
    
                $('#menu_lateral').css({'top': hmenu, 'height': 'calc(100% - ' + hmenu + 'px)'});
    
                var tl = new TimelineMax();
                if($(this).hasClass('active')){
                    window.dispatchEvent(new Event('scroll'));
                    $(this).removeClass('active');
                    tl
                    .fromTo('#menu_lateral .right, #right_menu_nav .item', 0.2, {autoAlpha: 1}, {autoAlpha: 0})
                    .fromTo('#menu_lateral .main-menu', 0.5, {x: 0, autoAlpha: 1}, {ease: Power1.easeInOutx,x: -350, autoAlpha: 0}, '-=0.2')
                    .to('.wrap', 0, {className: '-=move-left'}, '-=0.5')
                    .to('#menu_lateral', 0, {css: {'display': 'none'}})
                    .add(function(){
                        $('body').toggleClass('menu-on')
                    },'+=0.1')
                    // tl.to('#top_menu', 0.5, {height: orHeight, ease: Power2.easeInOut});
    
                }
                else{
                    $('#top_menu').addClass('style');
                    $('body').toggleClass('menu-on')
    
                    $(this).addClass('active');
                    tl
                    .to('.wrap', 0, {className: '+=move-left'})
                    .to('#menu_lateral', 0, {css: {'display': 'block'}})
                    .fromTo('#menu_lateral .main-menu', 0.5, {x: -350, autoAlpha: 0}, { ease: Power1.easeInOutx, x: 0, autoAlpha: 1})
                    .add(function(){
                        window.dispatchEvent(new Event('resize'));
                    })
                    .fromTo('#menu_lateral .right', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
                    .staggerFromTo('#menu_lateral .main-menu .item a', 0.2, {autoAlpha: 0, x: -10}, {autoAlpha: 1, x: 0}, 0.1, '-=0.5')
                    .staggerFromTo('#menu_lateral .right a', 0.25, {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0}, 0.1)
                    .staggerFromTo('#right_menu_nav .item', 0.25, {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0}, 0.1)
                }
            });
    
            $('#menu_lateral_btn').mouseenter(function(){
                if(!$(this).hasClass('active')){
                    var tl = new TimelineMax();
                    tl
                        .add('start')
                        .to('.equis-1', 0.1, {y: 6.13})
                        .to('.equis-2', 0.1, {y: 6.13})
                        .to('.equis-3', 0.1, {y: 6.13})
                        .to('.equis-4', 0.1, {y: 6.13})
                    ;
                }
            }).mouseleave(function(){
                if(!$(this).hasClass('active')){
                    var tl = new TimelineMax();
                    tl
                        .add('start')
                        .to('.equis-1', 0.1, {y: 12.26}) 
                        .to('.equis-2', 0.1, {y: 0.4})
                        .to('.equis-3', 0.1, {y: 12.26})
                        .to('.equis-4', 0.1, {x:6.13, y: 12.26})
                        .to('.equis-5', 0.1, {x:12.26})
                    ;
                }
            });

            $('#menu_lateral_btn').on('click', function(){
                if($(this).hasClass('animActive')){
                    // tl.reverse();    
                    $(this).removeClass('animActive')

                    var tl_btn = new TimelineMax();
                    tl_btn
                        .to('.equis-1', 0.1, {y: 6.13})
                        .to('.equis-2', 0.1, {y: 6.13})
                        .to('.equis-3', 0.1, {y: 6.13})
                        .to('.equis-4', 0.1, {x: 6.13, y: 6.13})
                        .to('.equis-5', 0.1, {x:12.26})
                }
                else {
                    // tl.play();
                    $(this).addClass('animActive')

                    var tl_btn = new TimelineMax();
                    tl_btn
                        .to('.equis-1', 0.1, {y: 0.4})
                        .to('.equis-2', 0.1, {y: 12.26})
                        .to('.equis-3', 0.1, {y: 0.4})
                        .to('.equis-4', 0.1, {x: 0, y: 12.26})
                        .to('.equis-5', 0.1, {x: 6.13})
                }
            });
        }

    });

})(jQuery, this);