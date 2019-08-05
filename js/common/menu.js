(function ($, root, undefined) {

    $(function () {

        var orHeight = $('#top_menu').outerHeight();

        $('#menu_lateral_btn').on('click', function () {

            $('#top_menu').add('body').add('#menu_lateral').toggleClass('menu-on')
            var tl = new TimelineMax();
            if ($(this).hasClass('active')) {
                window.dispatchEvent(new Event('scroll'));
                $(this).removeClass('active');
                tl.to('#top_menu', 0.5, {
                    height: orHeight,
                    ease: Power2.easeInOut
                });
            } else {
                $('#top_menu').addClass('style');
                $(this).addClass('active');
                tl.to('#top_menu', 0.5, {
                        height: '100%',
                        ease: Power2.easeInOut
                    })
                    .staggerFromTo('#menu_lateral .item', 0.3, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }, 0.15)
                    .staggerFromTo('#menu_lateral .right a', 0.3, {
                        autoAlpha: 0,
                        y: 10
                    }, {
                        autoAlpha: 1,
                        y: 1
                    }, 0.1);
            }
        });

        $('#menu_lateral_btn').mouseenter(function () {
            var tl = new TimelineMax();
            tl
                .add('start')
                .to('.equis-1', 0.1, {
                    y: 6.13
                }, 'start')
                .to('.equis-2', 0.1, {
                    y: 6.13
                }, 'start+=0.1')
                .to('.equis-3', 0.1, {
                    y: 6.13
                }, 'start+=0.2')
                .to('.equis-4', 0.1, {
                    y: 6.13
                }, 'start+=0.3');
        }).mouseleave(function () {
            if (!$(this).hasClass('active')) {
                var tl = new TimelineMax();
                tl
                    .add('start')
                    .to('.equis-1', 0.1, {
                        y: 12.26
                    }, 'start')
                    .to('.equis-2', 0.1, {
                        y: 0.4
                    }, 'start+=0.1')
                    .to('.equis-3', 0.1, {
                        y: 12.26
                    }, 'start+=0.2')
                    .to('.equis-4', 0.1, {
                        y: 12.26
                    }, 'start+=0.3');
            }
        });

    });

})(jQuery, this);