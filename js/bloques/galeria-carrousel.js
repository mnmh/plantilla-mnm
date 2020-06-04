(function ($, root, undefined) {

	$(function () {

		if($('.galeria_voces').length > 0){

            $('.galeria_voces .inside').each(function(i) {
                var gal_voces = new Flickity(this, {
                    freeScroll: false,
                    contain: true,
                    prevNextButtons: false,
                    pageDots: false,
                    cellAlign: 'center',
                    wrapAround: true
                });
    
                $(this).parent().find('.next').on('click', function(){
                    gal_voces.next();
                });
    
                $(this).parent().find('.prev').on('click', function(){
                    gal_voces.previous();
                });
            })
            
        }

	});

})(jQuery, this);