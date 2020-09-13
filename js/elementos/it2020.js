(function ($, root, undefined) {

    $(function () {
        $('.mapa_contenedor').each(function(){
            var mapa = L.map($(this).attr('id'),{
                maxZoom: 9,
                minZoom: 6,
                maxBounds:[[-4.7020829940000013,-79.4437498789999950],[13.6087503390000002,-66.2529165459999945]]
              }).setView([4.124080991005611, -73.67431640625001], 6);

            var mundo = null
            var departamentos = null
            $.getJSON('https://gist.githubusercontent.com/nestorandrespe/a1a0c14e772b3f578e410b49835bf31c/raw/e436431233d197c23581b839f88367e5c94e17f7/colombia_cercanos.json', function(data){
                mundo = data
              data.features.map(f=>{
                L.geoJson(f.geometry, {
                  weight: 0.3,
                  color: '#cc6634',
                  fillColor: '#eee3d7',
                  fillOpacity: 0.3,
                  opacity: 1
                }).addTo(mapa);
              })

              $.getJSON('https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json', function(data_){
                departamentos = data_
                data_.features.map(f=>{
                    L.geoJson(f.geometry, {
                      weight: 0.7,
                      color: '#cc6634',
                      fillColor: '#fff',
                      fillOpacity: 1,
                      opacity: 1
                    }).addTo(mapa);
                  })
              })

            })
        })

        $('.mapa_bot').each(function(){
            var projection = d3.geoMercator()
            .translate([500/2,500/2])
            .scale(1500)
            .center([-72.31054687500001,3.9132075008970837])

            var svg = d3.select('#' + $(this).find('svg').attr('id'))

            svg.append('circle')
            .attr('cx', 500/2)
            .attr('cy', 500/2)
            .attr('r', 220)
            .attr('opacity', 1)
            .attr('fill', '#cc6634')
            .attr('stroke', '#eee3d7')
            .attr('stroke-width', 20)

            var departamentos = null
            $.getJSON('https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json', function(data){
                departamentos = data
                svg.append('g').selectAll('path')
                .data(departamentos.features)
                .join('path')
                .attr('stroke', '#cc6634')
                .attr('stroke-width', 0.2)
                .attr('fill', '#eee3d7')
                .attr('d',d3.geoPath(projection))
            })
        })

        $('.map_lineatiempo').each(function(){
            var ano_inicio = 1953
            var ano_fin = 2019
            var innerRadius = 150
            var ancho = 5

            var projection = d3.geoOrthographic()
            .translate([500/2,500/2])
            .scale(150)
            .rotate(darRotacion([-72.31054687500001,3.9132075008970837]))

            var arco = d3.arc()
            .innerRadius(d=>{
              return innerRadius + (d.index*ancho)
            })
            .outerRadius(d => {
              return innerRadius + (d.index*ancho) + ancho
            })

            var selected = null
            var escala = escala()
            var color = d3.scaleOrdinal(d3.schemePastel2)

            var svg = d3.select('#' + $(this).find('svg').attr('id'))

            
            for(var i = 0; i <= (ano_fin - ano_inicio); i++){
                let g = svg.append('g')
                .attr('transform', `translate(${500/2} ${500/2}) rotate(${i*(360/(ano_fin - ano_inicio)) + 90})`)
                
                g.append('line')
                .attr('x1', -150)
                .attr('y1', 0)
                .attr('x2', -240)
                .attr('opacity', 0.4)
                .attr('y2', 0)
                .attr('stroke', '#cc6634')
                .attr('stroke-width', 0.3)
                
                g.append('text')
                .text(ano_inicio + i)
                .attr('text-anchor', 'end')
                .attr('font-size', 5)
                .attr('fill', '#cc6634')
                .attr('opacity', 0.5)
                .attr('text-anchor', 'middle')
                .attr('transform', d => {
                    if(i > (ano_fin - ano_inicio) / 2) return `translate(-230 5)`
                    else return `translate(-230 -5) rotate(-180)`
                })
                }

                var front = svg.append('circle')
                .attr('cx', 500/2)
                .attr('cy', 500/2)
                    .attr('opacity', 0.4)
                    .attr('r', innerRadius)
                .attr('fill', '#eee3d7')

            var paises
            $.getJSON('https://gist.githubusercontent.com/nestorandrespe/ac4c33022872c39d55da9b645527de2b/raw/7d848fb5faa553e9b8f6dfcf0279c3852c3dc0d4/World%2520contours%2520low.json', function(data_){
                paises = svg.append('g').selectAll('path')
                    .data(data_.features)
                    .join('path')
                    .attr('stroke-width', 0.15)
                    .attr('fill', '#fff')
                    .attr('stroke', '#cc6634')
                    .attr('opacity', 0.7)
                .attr('d',d3.geoPath(projection))
            })

            var linea = svg.append('g')
            var arcos

            $.getJSON('https://raw.githubusercontent.com/mnmh/datos/master/procesos_procesados.json', function(data){
                arcos = linea.selectAll("path")
                .data(data)
                .join("path")
                    .attr("fill", (d,i) => color(d['Gobierno']))
                    .attr("d", arco)
                    .attr("id", (d,i)=>`arc_pro_${i}`)
                    .attr('transform', `translate(${500/2} ${500/2})`)
                    .on('click', updateLinea)

                data.map((d,i) =>{
                    $item = $('<div class="item"></div>')
                    $icon = $('<div class="icon"></div>')
                    $icon.css({'background-color': color(d['Gobierno'])})
                    $item.html(d['Nombre del Proceso'])
                    $item.on('click', function(){
                        updateLinea(null,d)
                    })
                    $item.append($icon)
                    $('.map_lineatiempo .right .content .nav').append($item)
                })

                $('.map_lineatiempo .right .content .info .backnav').on('click', function(){
                    updateLinea(null, selected)
                })
                
                console.log(data)
            })


            function darRotacion(coor){
                return [-coor[0], -coor[1]]
            }

            function escala() {
                let resp = []
                for(var i = 0; i < 10; i++){
                  let obj = {
                    index: i,
                    startAngle: 0,
                    endAngle: 4*Math.PI/2
                  }
                  
                  resp.push(obj)
                }
                return resp
              }

              function updateLinea(e,d){
                if(selected === d){
                  selected = null
                  $('.map_lineatiempo .content .nav').removeClass('hide')
                  $('.map_lineatiempo .content .info').addClass('hide')
                }
                else{
                    selected = d
                    $('.map_lineatiempo .content .nav').addClass('hide')
                    $('.map_lineatiempo .content .info').removeClass('hide')
                    $item = $('<div class="item"></div>')
                    $icon = $('<div class="icon"></div>')
                    $item.append($icon)
                    $item.html(`<b>Gobierno: </b>${d['Gobierno']}`)
                    $('.map_lineatiempo .content .info .inside').empty().append($item)

                    $item = $('<div class="item"></div>')
                    $item.html(`<b>Fecha del proceso: </b>${d['Fecha del proceso']}`)
                    $('.map_lineatiempo .content .info .inside').append($item)

                    $item = $('<div class="item"></div>')
                    $item.html(`<b>Nombre del Proceso: </b>${d['Nombre del Proceso']}`)
                    $('.map_lineatiempo .content .info .inside').append($item)

                    $item = $('<div class="item"></div>')
                    $item.html(`<b>Partes Negociadoras: </b>${d['Partes Negociadoras']}`)
                    $('.map_lineatiempo .content .info .inside').append($item)

                    $item = $('<div class="item"></div>')
                    $item.html(`<b>Reseña: </b>${d['Reseña']}`)
                    $('.map_lineatiempo .content .info .inside').append($item)
                }
                
                arcos.attr("fill", (d,i) => {
                  if(selected) {
                    if(d === selected) return color(d['Gobierno'])
                    else return '#ececec'
                  }
                  else return color(d['Gobierno'])
                })
                paises.attr('fill', (d,i) => {
                  if(selected) {
                    let p_ = selected.coor_name.split(',')
                    if(p_.includes(d.properties.brk_name)) return color(selected['Gobierno'])
                    else return '#fff'
                  }
                  else return '#fff'
                })
                
                if(selected){
                  d3.transition().duration(1250).tween('rotate', () => {
                    let r = d3.interpolate(projection.rotate(), darRotacion(selected.coor));
                    return t => {
                      paises.attr('d',d3.geoPath(projection.rotate(r(t))))
                    }
                  })
                }
                else
                  d3.transition().duration(1250).tween('rotate', () => {
                    let r = d3.interpolate(projection.rotate(), darRotacion([-72.31054687500001,3.9132075008970837]));
                    return t => {
                      paises.attr('d',d3.geoPath(projection.rotate(r(t))))
                    }
                  })
              }
        })
    });

})(jQuery, this);