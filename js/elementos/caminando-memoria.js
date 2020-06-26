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
            $enviar = $('<div id="enviar_btn">Agregar</div>')
            $('.sideContent .content').append($paleta).append($enviar)


            $('#campo_nombre').change(function(){
                $('#acf-_post_title').val($(this).val())
            })

            $('#campo_titulo').change(function(){
                $('#acf-field_5bbb8364dbc4c').val($(this).val())
            })

            $('#campo_des').change(function(){
                $('#acf-field_5bb4dc07613ba').val($(this).val())
            })

            $('#enviar_btn').on('click', function() {
                $('.mapaContainer .acf-form-submit input').click()
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

    });

})(jQuery, this);