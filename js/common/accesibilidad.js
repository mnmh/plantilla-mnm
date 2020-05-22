(function ($, root, undefined) {

	$(function () {

		$('#acce_menu .slider').on('click', function() {
            $body = $('body');
            if($body.hasClass('dark')){
                $body.removeClass('dark')
                jsonOb.theme = 'light'
                localStorage.themeop = JSON.stringify(jsonOb)
            } else {
                $body.addClass('dark')
                jsonOb.theme = 'dark'
                localStorage.themeop = JSON.stringify(jsonOb)
            }
        })

        $('.icon_acce').on('click', function() {
            $parent = $(this).parents('#acce_menu')
            var tl_temp = new TimelineMax();

            if(!$('#top_menu').hasClass('open-slider-acce')){
                $('#top_menu').addClass('open-slider-acce')

                tl_temp.add('start')
                .fromTo($parent,.5 ,{css: {'width': 40}},{css: {'width': 300}})
                .set($parent.find('.light, .size'), {css: {'display': 'flex'}})
                .staggerFromTo($parent.find('.light, .size'), 0.25, {autoAlpha:0}, {autoAlpha: 1}, 0.1)
            } else {
                tl_temp.add('start')
                .set($parent.find('.light, .size'), {css: {'display': 'none'}})
                .fromTo($parent,.5 ,{css: {'width': 300}},{css: {'width': 40}})
                .add(function() {
                    $('#top_menu').removeClass('open-slider-acce')
                })
            }
            
            
        })

        $('#acce_menu .size .icon').on('click', function() {
            var index = $(this).index() + 1;
            jsonOb.fontsize = index;
            localStorage.themeop = JSON.stringify(jsonOb);
            $('body').removeClass('font_1 font_2 font_3');
            $('body').addClass('font_' + index);
        })

	});

})(jQuery, this);