(function ($, root, undefined) {

    $(function () {

        if($('body').hasClass('page-template-template-caminando')){
            var logoAnimation = new TimelineMax({
                onComplete: function() {
                    this.restart();
                }
            })

            logoAnimation.add('start')
            .fromTo('.logoCaminando .frame1', 0, {autoAlpha: 0}, {autoAlpha: 1}, 'start')
            .fromTo('.logoCaminando .frame2, .logoCaminando .frame3', 0, {autoAlpha: 0}, {autoAlpha: 0}, 'start')
            .to('.logoCaminando .frame1', 0, {autoAlpha: 0}, 'start+=0.15')
            .to('.logoCaminando .frame2', 0, {autoAlpha: 1}, 'start+=0.15')
            .to('.logoCaminando .frame2', 0, {autoAlpha: 0}, 'start+=0.30')
            .to('.logoCaminando .frame3', 0, {autoAlpha: 1}, 'start+=0.30')
            .to('.logoCaminando .frame3', 0, {autoAlpha: 0}, 'start+=0.45')
            .to('.logoCaminando .frame2', 0, {autoAlpha: 1}, 'start+=0.45')


            $paleta = $('#listado_paleta').clone()
            $subida_btn = $('.acf-image-uploader .acf-basic-uploader')
            $enviar = $('<div id="enviar_btn">Agregar</div>')
            $subida = $('<div id="subir_btn">Subir imagen</div>')
            $subida_txt = $('<p class="label">Escoge una imagen de tu lugar [png o jpg de menos de 2mb.]</p>')
            $('.sideContent .content').append($paleta).append($subida_txt).append($subida).append($enviar)


            $('#campo_titulo').change(function(){
                $('#acf-field_5bbb8364dbc4c').val($(this).val())
                $('#acf-_post_title').val($(this).val())
            })

            $('#campo_des').change(function(){
                $('#acf-field_5bb4dc07613ba').val($(this).val())
            })

            $('#enviar_btn').on('click', function() {
                $('.mapaContainer .acf-form-submit input').click()
            })

            $subida_btn.find('input').change(function(e){
                console.log(e.srcElement.value)
                $('#subir_btn').html(e.srcElement.value.replace('C:\\fakepath\\', ''))
            })

            $('#subir_btn').on('click', function() {
                $subida_btn.find('input').click()
            })

            $('#campo_ciudad').change(function(){
                $('#acf-field_5ef614f924e8f').val($(this).val())
            })

            $('#campo_cel').change(function(){
                $('#acf-field_5ef6150324e90').val($(this).val())
            })

            $('#campo_mail').on('click', function() {
                $('#acf-field_5ef6150b24e91').click()
            })


            if($('#mapaid').length > 0){
                var mymap = L.map('mapaid').setView([4.55598, -74.04785], 6);

                  L.tileLayer('https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmVzdG9ycGVuYSIsImEiOiJjam10bDJpeGMwMWQ2M3FtdzJ6ZHZkYW41In0.dcf5aHJ169baAfs7gHc9Jw', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    accessToken: 'pk.eyJ1IjoibmVzdG9ycGVuYSIsImEiOiJjam10bDJpeGMwMWQ2M3FtdzJ6ZHZkYW41In0.dcf5aHJ169baAfs7gHc9Jw'
                  }).addTo(mymap);

                  $('#lugares_memoria_hidden .item').each(function(){
                    var valueInput = $(this).attr('data-coor')
                    var latlng = valueInput.split(',')

                    if(latlng.length == 2){
                        var myIcon = L.icon({
                            iconUrl: 'my-icon.png',
                            iconSize: [40, 40],
                            iconAnchor: [20, 20],
                        });
                      var marker = L.marker([latlng[0],latlng[1]], {icon: myIcon}).addTo(mymap);
                      $(marker._icon).css({'background-color': '#' + $(this).attr('data-color')})
                      $(marker._icon).attr('data-id', $(this).attr('id'))
                      $(marker._icon).on('click', function(){
                        var $item = $('#lugares_memoria_hidden #' + $(this).attr('data-id'))
                        $('.mapaContainer .sideContent .info .nombre').html($item.attr('data-nombre'))
                        $('.mapaContainer .sideContent .info .lugar').html($item.attr('data-lugar'))
                        $('.mapaContainer .sideContent .info .texto').html($item.attr('data-texto'))
                      })
                    }
                  })
            }
        }

    });

})(jQuery, this);