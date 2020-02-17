(function ($, root, undefined) {

	$(function () {

        var tl_general = new TimelineMax()
        
        tl_general.add('start')
        .fromTo('#top_menu', 0.5, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0}, '+=0.2')

        $('.banner-margenes').each(function(e,i) {
            // console.log(e)
            
        })

	});

})(jQuery, this);