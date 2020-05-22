(function ($, root, undefined) {

    $(function () {
        $('.cc-contenido-thumbs .btn').on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var $parent = $(this).parent();
            var $inside = $parent.find('.inside');
            var page = parseInt($(this).attr('data-page'));
            var url = $(this).attr('href') + page;

            $.getJSON(url, function (data) {
                
                for(var i = 0; i < data.length; i++){
                    var tipo = data[i]['tipo-de-contenido'][0]['slug'];
                    var titulo = data[i]['titulo'];
                    $item = $inside.find('.hide.' + tipo).clone();
                    $item.find('.name').html(titulo);
                    $item.attr('href', '/centro-de-contenido/?contenido=' + data[i]['id']);
                    $item.removeClass('hide').addClass('fresh');
                    $inside.append($item);
                }

                var tl_temp = new TimelineMax();
                tl_temp.add('start')
                    .staggerFromTo($inside.find('.fresh'), 0.2, {
                        autoAlpha: 0,
                        y: 20
                    }, {
                        autoAlpha: 1,
                        y: 0
                    }, 0.05)
                    .add(function () {
                        $($inside.find('.fresh')).removeClass('fresh');
                    });
                $this.attr('data-page', page + 1);
                if(data.length < 20) $this.remove();
            });

        })
    });

})(jQuery, this);