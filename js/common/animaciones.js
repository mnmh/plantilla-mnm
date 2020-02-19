(function ($, root, undefined) {

	$(function () {
        var controller = new ScrollMagic.Controller();

        // Linea del tiempo general para los elementos comunes en todas las páginas
        var tl_general = new TimelineMax()
        tl_general.add('start')
        .fromTo('#top_menu', 0.5, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0}, '+=0.2')


        //Bloque banner margenes
        $('.banner-margenes').each(function(e,i) {
            var tl_temp = new TimelineMax();

            tl_temp
            .fromTo($(this).find('.carrousel'), 1, {autoAlpha: 0}, {autoAlpha: 1})
            .staggerFromTo($(this).find('.content > *') ,1, {autoAlpha: 0}, {autoAlpha: 1}, 0.25, '-=0.5')

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

        //Bloque de tres botones
        $('.tres-botones').each(function(e,i){
            var tl_temp = new TimelineMax();

            tl_temp
            .staggerFromTo($(this).find('.boton') ,.5, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0}, 0.25)

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

        //Bloque tarjetas audio
        $('.audio.piepag').each(function(e,i){
            var tl_temp = new TimelineMax();

            tl_temp
            .staggerFromTo($(this).find('.tarjetas .item') ,.5, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0}, 0.25)

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

        // ARTE y CULTURA
        $('.page-obras').each(function() {
            var tl_temp = new TimelineMax();

            tl_temp
            .staggerFromTo($(this).find('.dropdown .item_drop') ,.5, {autoAlpha: 0, x: 20}, {autoAlpha: 1, x: 0}, 0.25)

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

        // Slider columna
        $('.slider-columna').each(function() {
            var tl_temp = new TimelineMax();

            tl_temp
            .fromTo($(this).find('.right .item') ,.5, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo($(this).find('.left > *') ,.5, {autoAlpha: 0}, {autoAlpha: 1})

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

        // Header columna
        $('.header-columna').each(function() {
            var tl_temp = new TimelineMax();

            tl_temp
            .fromTo($(this).find('.right') ,1, {autoAlpha: 0}, {autoAlpha: 1})

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

        $('.wp-block-image').each(function(){
            var tl_temp = new TimelineMax();

            tl_temp
            .fromTo($(this) ,1, {autoAlpha: 0}, {autoAlpha: 1})

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
            .setTween(tl_temp)
            .addTo(controller);
        })

	});

})(jQuery, this);