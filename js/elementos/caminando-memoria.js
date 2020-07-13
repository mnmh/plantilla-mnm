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


            


            if($('#mapaid').hasClass('main')){
                var mymap = L.map('mapaid', {
                    minZoom: 6
                }).setView([4.55598, -74.04785], 6);

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
                        $('.mapaContainer .sideContent .info .lugar').html($item.attr('data-lugar'))
                        $('.mapaContainer .sideContent .texto').html($item.attr('data-texto'))
                      })
                    }
                  })
            } else {
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
            }
        }

        var min_lon = -79.4437498789999950
        var max_lon = -66.2529165459999945
        var min_lat = -4.7020829940000013
        var max_lat = 13.6087503390000002

        var forceStrength = 0.15;

        if($('#lugares_memoria_hidden').length > 0) {
            
            var arrayObj = []
            $('#lugares_memoria_hidden .item').each((i,item) => {
                var resp = {}
                var coor = $(item).attr('data-coor').split(',')
                resp['lat'] = coor[0]
                resp['lon'] = coor[1]
                resp['id'] = $(item).attr('id')
                resp['color'] = $(item).attr('data-color')
                resp['nombre'] = $(item).attr('data-nombre')
                resp['lugar'] = $(item).attr('data-lugar')
                resp['texto'] = $(item).attr('data-texto')

                if(coor[0]!='' && coor[1]) arrayObj.push(resp)
            })

            if(arrayObj.length > 0){
                var svg = d3.select('#mapaCC');
				var node = svg.selectAll("circle")
				.data(arrayObj)
				.enter()
				.append("circle")
				.attr("id",function(d,i) {
					return d['id'];
                })
                .attr("fill",function(d,i) {
					return '#' + d['color'];
                })
                .attr("data-nombre",function(d,i) {
					return d['nombre'];
                })
                .attr("data-lugar",function(d,i) {
					return d['lugar'];
                })
                .attr("data-texto",function(d,i) {
					return d['texto'];
				})
				.attr('r', 15)
                .attr('class', 'mapa_bola')
                
                function charge(d) {
					// return -Math.pow(total.map(0,1069,1,1), 2.0) * forceStrength;
					return -Math.pow(15, 2.0) * forceStrength;
				}
	
				function ticked(d) {
					node.attr("cx",function(d) {
						return d.x;
					})
					.attr("cy",function(d) {
						return d.y;
					});
				}
	
				var force_mapa_X = d3.forceX(function(d){
                    var str = d['lon'];
                    str = parseFloat(str)
                    str = scaleLinear(str, min_lon, max_lon, 0, 1356) - 1356
					return str;
				});
				var force_mapa_Y = d3.forceY(function(d){
                    var str = d['lat'];
                    str = parseFloat(str)
                    str = scaleLinear(str, min_lat, max_lat, 1882, 0) + 1882
					return str;
                });
                
                var simulation = d3.forceSimulation(arrayObj)
				.force("charge", d3.forceManyBody().strength(charge))
				.force("x", force_mapa_X)
				.force("y", force_mapa_Y)
				.on("tick", ticked)
				.alphaTarget(1)
                .restart();
                

                $('.mapa_bola').on('click', function(){
                    $('.mapa_bola.active').removeClass('active')
                    $(this).addClass('active')
                    $('.mapaContainer .sideMap .info .lugar').html($(this).attr('data-lugar'))
                    $('.mapaContainer .sideMap .texto').html($(this).attr('data-texto'))
                  })
            }
        }

        function scaleLinear(i,r1,r2,m1,m2) {
            var resp = (i-r1) / (r2-r1) * (m2-m1) + m2
            return resp
        }

    });

})(jQuery, this);