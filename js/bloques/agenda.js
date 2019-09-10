(function ($, root, undefined) {

    $(function () {
        var $elements = null;

        iniciarAgenda();
        activarNavigacionTop();
        
        $('a.inscripcion.btn').on('click', function() {
            $('.popup').fadeIn();
        })

        $('.calendario_mes .listado .itemListado').each(function(item){
            console.log(item);
        })

        function activarNavigacionTop() {
            $('.agenda .nav .btn').on('click', function() {
                $('.agenda .nav .active').removeClass('active');
                $(this).addClass('active');
                var div = $(this).attr('data-div');
                $parent = $(this).parent().parent();
                $parent.find('.agenda_dias, .calendario_mes').hide();
                $parent.find('.' + div).show();
            });

            $('.agenda .nav .btn:first-child').click();

            $('.inscripcion').on('click', function() {
                $('.popup').fadeIn();
                console.log('hola');
            })
        }

        function iniciarAgenda() {
            iniciarDiasAgenda();
            $elements_agenda = $('.agenda .items').clone();

            $('.agenda .items').empty();

            $('.timeNav .dias .item').on('click', function(){
                if(!$(this).hasClass('selected')){
                    if($elements != null){
                        flk_agenda.destroy();
                        $elements.remove();
                    }

                    $('.timeNav .dias .item.selected').removeClass('selected');
                    $('.items .item-agenda').hide();

                    var div = $(this).attr('data-div');
                    $(this).addClass('selected');
                    $('.items .item-agenda'+div).show();

                    var $ele_temp = $elements_agenda.find(div).clone();

                    $('.agenda .items').append($ele_temp);
                    $elements = $ele_temp;

                    flk_agenda = new Flickity('.agenda .items',{
                        // freeScroll: true,
                        // contain: true,
                        prevNextButtons: false,
                        pageDots: false,
                        cellAlign: 'left',
                    });

                    flk_agenda.on('select', function(){
                        //verificarNavegacionAgenda();
                        var index = $('.agenda .items .item-agenda.is-selected').index();
                        refrescarClasesAgenda(index);
                        actualizarNumero(index);
                    })

                    flk_agenda.reloadCells();

                    actualizarNumero(0);

                    //verificarNavegacionAgenda();

                }
            });

            $('.timeNav .meses .item').on('click', function(){
                if(!$(this).hasClass('selected')){
                    $('.timeNav .meses .item.selected').removeClass('selected');
                    var $item = $(this);

                    var tl = new TimelineMax();
                    tl.add('start')
                    .fromTo('.timeNav .dias .item', 0, {autoAlpha: 1}, {autoAlpha: 0},'start')
                    .staggerFromTo('.items .item-agenda', 0.15, {y: 0, autoAlpha: 1}, {y: -15, autoAlpha: 0},0.1,'start')
                    .add(function(){
                        $('.timeNav .dias .item').hide();
                        $('.items .item-agenda').hide();

                        var div = $item.attr('data-div');
                        $item.addClass('selected');
                        $('.timeNav .dias .item'+div).show();
                        $('.timeNav .dias .item'+div).eq(0).click();

                        if(($('body').hasClass('page-voces-para-transformar-data') && first_time) || ($('body').hasClass('page-medellin-data') && first_time)){
                            $('.timeNav .dias .item').eq(1).click();
                            first_time = false;
                            bindFlickityScroll();
                        }
                        window.dispatchEvent(new Event('resize'));
                    })
                    .fromTo('.timeNav .dias .item', 0, {autoAlpha: 0}, {autoAlpha: 1},'+=0.2')
                    .staggerFromTo('.items .item-agenda', 0.15, {y: -15, autoAlpha: 0}, {y: 0, autoAlpha: 1},0.1)
                    ;
                }
            });

            $('.timeNav .meses .item').eq(0).click();

            
        }

        function iniciarDiasAgenda() {
            $('.timeNav .dias').flickity({
                freeScroll: true,
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'left',
            });
        }

        function actualizarNumero(index){
            var actual = index + 1;
            var total = $elements.length;
            $('.hori_scroll .num').html(actual + '/' + total);
        }

        function refrescarClasesAgenda(index){
            $('.agenda .items .item-agenda').removeClass('escondido');
            if(index > 0){
                for(var i = 0; i < index; i++){
                    $('.agenda .items .item-agenda').eq(i).addClass('escondido');
                }
            }
        }

});

})(jQuery, this);