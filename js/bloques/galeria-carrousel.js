(function ($, root, undefined) {

	$(function () {

		if($('#galeria_voces .inside').length > 0){
            var gal_voces = new Flickity('#galeria_voces .inside', {
                freeScroll: false,
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'center',
                wrapAround: true
            });

            $('#galeria_voces .next').on('click', function(){
                gal_voces.next();
            });

            $('#galeria_voces .prev').on('click', function(){
                gal_voces.previous();
            });
        }

	});

})(jQuery, this);