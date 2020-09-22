(function ($, root, undefined) {

    $(function () {

        $('.acordeon_padre').each(function(){
            $parent = $(this)
            let $item = $('<div class="fila-botones"></div>')
            $parent.append($item)
            let loop_nombre = 'scroll_hijo'
            $newfila = $parent.find('.fila-botones').clone()
            $('#contenidoGeneral').append($newfila)

            $('.acordeon_hijo').each(function(index){
                // console.log($(this).find('.titulo-modulo .sec').html())
                let img_url = $(this).find('.galeria_voces .item.is-selected img').attr('src')

                let item_id = loop_nombre + '_' + index
                let $item = $('<a class="item"></a>')
                $item.attr('data-id', item_id)
                $(this).attr('id', item_id)
                $(this).hide()
                $item.html('<div class="inside"><div class="name"></div></div>')
                $item.find('.name').text($(this).find('.titulo-modulo .sec').html())
                $item.find('.inside').css({'background-image': 'url("'+img_url+'")'})
                // $parent = $(this)
                $parent.find('.fila-botones').addClass('btm').append($item)
                $item.on('click', function(){
                    $parent.find('.fila-botones .active').removeClass('active')
                    $(this).addClass('active')
                    $('.acordeon_hijo').hide()
                    let id = $(this).attr('data-id')
                    $('#' + id).fadeIn()
                    window.dispatchEvent(new Event('resize'));

                })

                $newfila.append($item.clone())
            })
        })

    });

})(jQuery, this);