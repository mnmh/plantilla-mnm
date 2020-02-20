(function ($, root, undefined) {

	$(function () {

		$('#acce_menu .slider').on('click', function() {
            $body = $('body');
            if($body.hasClass('dark')){
                $body.removeClass('dark')
            } else {
                $body.addClass('dark')
            }
        })

	});

})(jQuery, this);