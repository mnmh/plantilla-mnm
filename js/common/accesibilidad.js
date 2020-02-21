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

	});

})(jQuery, this);