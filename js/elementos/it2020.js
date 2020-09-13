(function ($, root, undefined) {

    $(function () {
        $('.mapa_contenedor').each(function(){
            var mapa = L.map($(this).attr('id'),{
                maxZoom: 9,
                minZoom: 3,
                // maxBounds:[[-4.7020829940000013,-79.4437498789999950],[13.6087503390000002,-66.2529165459999945]]
              }).setView([4.124080991005611, -73.67431640625001], 6);

            var municipios = null
            var departamentos = null
            $.getJSON('https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json', function(data){
                departamentos = data
              data.features.map(f=>{
                L.geoJson(f.geometry, {
                  weight: 0.2,
                  color: '#666',
                  fillColor: 'none',
                  fillOpacity: 1,
                  opacity: 1
                }).addTo(mapa);
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
    });

})(jQuery, this);