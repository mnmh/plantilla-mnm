(function ($, root, undefined) {

	$(function () {
        if($('#citas .inside').length > 0){
            var citas_gal = new Flickity('#citas .inside', {
                freeScroll: false,
                contain: true,
                wrapAround: true,
                autoPlay: true,
                pageDots: false,
                prevNextButtons: false,
                cellAlign: 'center',
            });
        }
});

})(jQuery, this);