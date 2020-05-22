(function ($, root, undefined) {

    $(function () {

        var urlCC = 'http://cc.museodememoria.gov.co';

        $('.filtro-cc .item').on('click', function(){
            $parent = $('.filtro-cc')
            if(!$(this).hasClass('active')) $(this).addClass('active')
            else $(this).removeClass('active')
            //return false;
        });

        $('.filtro_tags.cc .alfa .letter').on('click', function () {
            var div = $(this).attr('data-div');
            if(!$(this).hasClass('active')){
                $('.filtro_tags .alfa .active').removeClass('active');
                $(this).addClass('active');
                $('.filtro_tags .listado li').hide();
                $('.filtro_tags .listado li.' + div).show();
            }
            else{
                $('.filtro_tags .alfa .active').removeClass('active');
                $('.filtro_tags .listado li').hide();
            }
            
        });

        $('.filtro_tags.cc .listado li').on('click', function() {
            $parent = $(this).parents('.filtro_tags')
            $child = $parent.find('.selected .default').clone();
            $child.removeClass('default').addClass($(this).attr('data-slug'))
            $child.html($(this).html())

            

            if(!$(this).hasClass('active')) {
                $(this).addClass('active')
                $parent.find('.selected').append($child)
                onSelectedClick($child);

            } else {
                $(this).removeClass('active')
                $parent.find('.selected .' + $(this).attr('data-slug')).remove()
            }

            updateFiltroTagParent();
        })

        function onSelectedClick($elem) {
            $elem.on('click', function() {
                var div = $(this).attr('class');
                $parent = $(this).parents('.filtro_tags')

                $parent.find('.listado [data-slug=' + div + ']').click();

                $list = $parent.find('.alfa .letter.active-persistent')
                $list.each(function(){
                    var div = $(this).attr('data-div')
                    if($parent.find('.listado li.active.' + div).length > 0) $(this).addClass('active-persistent')
                    else $(this).removeClass('active-persistent')
                })
            })
        }

        function updateFiltroTagParent() {
            var $parent = $('.filtro_tags.cc .alfa .letter.active')
            var div = $parent.attr('data-div')
            if($('.filtro_tags.cc .listado li.active.' + div).length > 0) $parent.addClass('active-persistent')
            else $parent.removeClass('active-persistent')
        }

        $('#busqueda-cc .submit').on('click', function(){
            var string = urlCC + '/wp-json/wp/v2/posts?per_page=20&';

            var total_tipo = $('.filtro-cc .active').length

            if(total_tipo > 0){
                string += 'tipo-de-contenido='

                $('.filtro-cc .active').each(function(i,e) {
                    var id = $(this).attr('data-id')

                    string += id
                    if(i+1 < total_tipo) string += ','
                })
            }

            $.getJSON(string, function (data) {
                console.log(data)
            })

            console.log(string)
        })

    });

})(jQuery, this);