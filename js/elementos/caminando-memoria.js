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
        }

    });

})(jQuery, this);