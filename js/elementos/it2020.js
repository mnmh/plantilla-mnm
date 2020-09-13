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

                  console.log('ch')
                  var resguardoIcon = L.icon({
                    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Map_Marker.svg',
                    iconSize: [50, 50], // size of the icon
                    });
              
                var puebloIcon = L.icon({
                        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Map_Marker.svg',
                        iconSize: [20, 20], // size of the icon
                        });

                let markers_pueblos = []
                let markers_resguardos = []
                let ubicacion = []
                
                let pie = d3.pie()
                .padAngle(0.005)
                .sort(null)
                .value(d => d.value)

                let color_peligro = d3.scaleOrdinal().range(['#E0052D', '#F2D7B6']).domain(['si', 'no'])
                

                let rmax = 30
                let markers = L.markerClusterGroup({
                    maxClusterRadius: 60,
                    iconCreateFunction: iconClusterDefine
                })

                d3.csv('https://raw.githubusercontent.com/mnmh/datos/master/ubicacion_pueblos_indigenas.csv', data => {
                      ubicacion.push(data)
                      console.log(data)
                    //   cargarPueblos()
                  }).then((col,data) => {
                    //   console.log(data, col)
                    //   ubicacion = data
                      cargarPueblos()
                      console.log(ubicacion)
                  })
                

                function iconClusterDefine(cluster) {
                    var children = cluster.getAllChildMarkers(),
                        n = children.length,
                        strokeWidth = 1,
                        r = rmax-2*strokeWidth-(n<10?12:n<100?8:n<1000?4:0),
                        iconDim = 50
                    
                    let data = devolverData(children)
                    let html = dibujarDona({
                      data: data,
                      n: n,
                      r: r,
                      strokeWidth: strokeWidth
                    })
                        
                    let myIcon = new L.DivIcon({
                      html: html,
                      className: 'marker-cluster', 
                      iconSize: new L.Point(iconDim, iconDim)
                    });
                    return myIcon;
                  }

                  function devolverData(children){
                    let resp = [
                      {
                        name: 'si',
                        value: 0
                      },
                      {
                        name: 'no',
                        value: 0
                      }
                    ]
                    children.map(c => {
                      if(c.options.peligro) resp[0].value = resp[0].value + 1
                      else resp[1].value = resp[1].value + 1
                    })
                    
                    return resp
                  }

                  function dibujarDona(aggs){
                    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    let vis = d3.select(svg).attr('width', 50)
                        .attr('height', 50)
                    
                    let scaleTotal = d3.scaleLinear().range(['#FFF', '#F2B705']).domain([0,ubicacion.length])
                    const arcs = pie(aggs.data);
                    vis.append('circle')
                      .attr('cx', 25)
                      .attr('cy', 25)
                      .attr('r', 25)
                      .attr('fill', scaleTotal(aggs.n))
                      .attr('fill',  '#FFF')
                
                    
                     vis.selectAll("path")
                      .data(arcs)
                      .join("path")
                        .attr("fill", d => color_peligro(d.data.name))
                        .attr("d", d3.arc().innerRadius(20).outerRadius(25))
                        .attr('transform', 'translate(25,25)')
                    
                    vis.append('text')
                      .text(aggs.n)
                      .attr('fill','#333')
                      .attr('dy', '.5em')
                      .attr('x', 25)
                      .attr('y', 25)
                      .attr('font-weight', 'bold')
                      .attr('text-anchor', 'middle')
                    
                    return serializeXmlNode(svg);
                  }
                  
                  function serializeXmlNode(xmlNode) {
                    if (typeof window.XMLSerializer != "undefined") {
                        return (new window.XMLSerializer()).serializeToString(xmlNode);
                    } else if (typeof xmlNode.xml != "undefined") {
                        return xmlNode.xml;
                    }
                    return "";
                }
                  
                  function devolverPoblacion(elem){
                    if(elem['Con población entre 0-99 personas'] === 'X') return '0-99'
                    else if(elem['Con población entre 100-199 personas'] === 'X') return '100-199'
                    else if(elem['Con población entre 200-500 personas'] === 'X') return '200-500'
                    else return 'Sin información'
                  }
                  
                  function devolverPeligro(elem){
                    if(elem['En peligro de ser exterminados cultural o físicamente por el conflicto armado interno por el Auto 004 de 2009.'] === 'X') return true
                    else return false
                  }

                  function cargarPueblos() {

                    ubicacion.map(i => {
                      let lat = parseFloat(i['Latitud'].replace(',', '.'))
                      let lon = parseFloat(i['Longitud'].replace(',', '.'))
                      let marker = L.marker([lat,lon],{
                          icon: puebloIcon,
                          pueblo: i['Pueblo'],
                          poblacion: devolverPoblacion(i),
                          peligro: devolverPeligro(i)
                        })
                      .bindTooltip(
                        '<b>Pueblo:</b> ' + i['Pueblo'] + '</br>' +
                        '<b>Municipio:</b>' + i['Municipio']
                      , {className: 'myCSSClass'})
                      .on('click', () => {
                        markers_resguardos = []
                        let cod_resguardos = []
                        
                        pueblos.map(p => {
                          // console.log(i['Pueblo'], p['Pueblo'])
                          if(i['Pueblo'].replace(/\s+/g,' ').trim() == p['Pueblo'].replace(/\s+/g,' ').trim()){
                            // console.log(p['Nombre Resguardo'])
                            
                            const municipio = municipios.features.find(m => {
                              return m.properties['MPIOS'] === p['Cod Mpio']
                            })
                            if(municipio){
                              if(!cod_resguardos.includes(municipio.properties['MPIOS'])){
                                cod_resguardos.push(municipio.properties['MPIOS'])
                                let l = L.geoJson(municipio, {})
                                let coor = l.getBounds().getCenter()
                                let resguardo =  L.marker([coor.lat,coor.lng], {icon: resguardoIcon}).bindTooltip(
                                    '<b>Resguardo:</b> ' + p['Nombre Resguardo'] + '</br>' +
                                    '<b>Municipio:</b>' + p['Municipio']
                                  ).on('click', () => {
                                  markers_resguardos.map(r => r.remove())
                                  // markers_pueblos.map(r => r.remove())
                                  // markers_pueblos = []
                                  markers_resguardos = []
                                  // cargarPueblos()
                                  markers.addTo(mapa)
                                }).addTo(mapa)
                                markers_resguardos.push(resguardo)
                              }
                            }
                              
                          }
                        })
                        
                        if(markers_resguardos.length > 0) {
                          // markers_pueblos.map(m => {
                          //   if(marker._leaflet_id != m._leaflet_id) {m.remove()}
                          // })
                          // markers_pueblos = []
                          // markers_pueblos.push(marker)
                          // marker.off('click')
                          // marker.on('click', () => {
                          //   marker.remove()
                          //   markers_resguardos.map(r => r.remove())
                          //   markers_pueblos = []
                          //   markers_resguardos = []
                          //   cargarPueblos()
                          // })
                          // marker.addTo(map)
                          mapa.removeLayer(markers)
                        }
                        
                      }).addTo(markers)
                      markers_pueblos.push(marker)
                    })
                    
                    mapa.addLayer(markers)
                  }
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
   
        $('.calendario.awa').each(function(){
            $parent = $(this)
            $(this).find('.left path').on('mouseenter', function(e,el){
                var path = $(this).attr('data-path')
                $('#awa_imagen').find('> g').addClass('opacity')
                $('#' + path).removeClass('opacity')
            }).on('mouseleave', function() {
                $('#awa_imagen').find('> g').removeClass('opacity')
            })
        })

        $('.calendario.chorrera').each(function(){
            $parent = $(this)
            $(this).find('.left circle').on('mouseenter', function(e,el){
                var path = $(this).attr('data-path')
                console.log(this)
                $('#chorrera_img').find('> g').addClass('opacity')
                $('#' + path).removeClass('opacity')
            }).on('mouseleave', function() {
                $('#chorrera_img').find('> g').removeClass('opacity')
            })
        })
    });

})(jQuery, this);