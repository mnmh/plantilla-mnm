(function ($, root, undefined) {

    $(function () {
        iniciarArteCultura();
        iniciarObra();


        function iniciarArteCultura() {
            $('.navegacionFiltros .alfa .letter').on('click', function () {
                var div = $(this).attr('data-div');
                $('.navegacionFiltros .alfa .active').removeClass('active');
                $(this).addClass('active');
                $('.navegacionFiltros .autores .listado li').hide();
                $('.navegacionFiltros .autores .listado li.' + div).show();
            });

            bindNavArchivo();

            function bindNavArchivo() {
                $('#secondary_menu.archivo-obras .item_drop').off('click');
                $('#secondary_menu.archivo-obras .item_drop').on('click', function () {
                    if (!$(this).hasClass('active')) {
                        cerrarNavObras();
                        var div = $(this).attr('data-div');
                        $(this).addClass('active');
                        $('.navegacionFiltros').show();
                        $('.navegacionFiltros .autores').hide();
                        $('.navegacionFiltros ' + div).show();

                        if ($('.navegacionFiltros .alfa .active').length == 0) {
                            $('.navegacionFiltros .alfa .letter:first-child').click();
                        }

                        var tl_temp = new TimelineMax();
                        tl_temp.add('start')
                            .fromTo('.navegacionFiltros', 0.35, {
                                y: -10,
                                autoAlpha: 0
                            }, {
                                y: 0,
                                autoAlpha: 1
                            })
                    } else {
                        $('#secondary_menu .item_drop.active').removeClass('active');
                        $('.navegacionFiltros, .navegacionFiltros .autores, .navegacionFiltros .categorias').hide();
                    }

                });
            }

            function cerrarNavObras() {
                bindNavArchivo();
                $('#secondary_menu .item_drop.active').removeClass('active');
                $('#secondary_menu .buscar').removeClass('active');
                $('.navegacionFiltros, .navegacionFiltros .autores, .navegacionFiltros .categorias').hide();
            }

            $('#secondary_menu .buscar').on('click', function () {
                if ($('#secondary_menu .buscar').hasClass('active')) {
                    // $('#secondary_menu .buscar').removeClass('active');
                } else {
                    cerrarNavObras();
                    $('#secondary_menu .buscar').addClass('active');
                    $('#secondary_menu .buscar').find('input').select();
                }
            });

            $('#secondary_menu .buscar form').submit(function (e) {
                e.preventDefault();
                var value = $('#secondary_menu .buscar input').val();
                var url = $('#secondary_menu .buscar').attr('data-href') + value;
                var resultado = '';

                var $loading_block = $('<div id="loading"></div>');
                $('.page-obras').append($loading_block);
                // LoadingAni.init();
                $('.page-obras').addClass('loading');
                // console.log(url);
                $.getJSON(url, function (data) {
                    $('.page-obras').removeClass('loading');
                    $loading_block.remove();
                    $('#secondary_menu .buscar input').val('').blur();
                    $('#secondary_menu .buscar').removeClass('active');
                    var num_total = 0
                    // console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        // console.log(data[i]);
                        if (data[i].type == 'obras') {
                            var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autores, data[i].disciplinas, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                            // $('.page-obras .items').append($div);
                            resultado += $div[0].outerHTML;
                            num_total++;
                        }
                    }

                    var $resultado_info = $('<div class="resultado"></div>');
                    if (num_total == 0) {
                        $('.page-obras .items .resultado.empty').remove();
                        $resultado_info.html('No hay resultados para <span>' + value + '</span>');
                        $resultado_info.addClass('empty');

                        $resultado_info.find('span').on('click', function () {
                            $resultado_info.remove();
                        });
                    } else {
                        $('.page-obras .items').empty();
                        if (num_total > 1)
                            $resultado_info.html('Hay ' + num_total + ' resultados para <span>' + value + '</span>');
                        else
                            $resultado_info.html('Hay ' + num_total + ' resultado para <span>' + value + '</span>');

                        $resultado_info.attr('data-url', '/wp-json/wp/v2/obras?per_page=20');

                        $resultado_info.on('click', function () {
                            var url = webURL + $(this).attr('data-url');
                            var $loading_block = $('<div id="loading"></div>');
                            $('.page-obras').append($loading_block);
                            // LoadingAni.init();
                            $('.page-obras').addClass('loading');
                            $.getJSON(url, function (data) {
                                $('.page-obras').removeClass('loading');
                                $loading_block.remove();
                                $('.page-obras .items').empty();

                                for (var i = 0; i < data.length; i++) {
                                    // console.log(data[i]);
                                    if (data[i].acf.galeria) {
                                        var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                        $('.page-obras .items').append($div);
                                    }
                                }

                                var tl_temp = new TimelineMax();
                                tl_temp.add('start')
                                    .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                        autoAlpha: 0,
                                        y: 20
                                    }, {
                                        autoAlpha: 1,
                                        y: 0
                                    }, 0.05)
                                    .add(function () {
                                        $('.page-obras .items .fresh').removeClass('fresh');
                                    });

                                var $btn = '<div class="moreNav" data-url="' + webURL + '/wp-json/wp/v2/obras?per_page=20&amp;page=" data-page="2"></div>';

                                $('.page-obras .items').append($btn);
                                bindPagination();
                            });
                        });
                    }

                    $('.page-obras .items').prepend($resultado_info).append(resultado);
                    var tl_temp = new TimelineMax();
                    tl_temp.add('start')
                        .staggerFromTo('.page-obras .items .fresh', 0.2, {
                            autoAlpha: 0,
                            y: 20
                        }, {
                            autoAlpha: 1,
                            y: 0
                        }, 0.05)
                        .add(function () {
                            $('.page-obras .items .fresh').removeClass('fresh');
                        });

                });
            })

            $('#secondary_menu.archivo-obras .lista, #secondary_menu.archivo-obras .cuadricula').on('click', function () {
                var $container = $('.page-obras .items');
                if ($('#secondary_menu.archivo-obras .lista').hasClass('active')) {
                    $('#secondary_menu.archivo-obras .active').removeClass('active');
                    // $container.fadeOut(function(){
                    //     $container.removeClass('lista');
                    //     $container.fadeIn();
                    // });
                    $container.hide();
                    $container.removeClass('lista');
                    $container.show();

                    $('#secondary_menu.archivo-obras .cuadricula').addClass('active');
                } else {
                    $('#secondary_menu.archivo-obras .active').removeClass('active');
                    // $container.fadeOut(function(){
                    //     $container.addClass('lista');
                    //     $container.fadeIn();
                    // });
                    $container.hide();
                    $container.addClass('lista');
                    $container.show();

                    $('#secondary_menu.archivo-obras .lista').addClass('active');
                }
            });

            bindPagination();

            function darBloqueItemObra(url, imgUrl, title, autoresArray, disciplinasArray, autoresNames, disciplinasNames, disciplinasColor) {
                var $div = $('<a class="obra fresh"></a>');
                var $img = $('<div class="img"></div>');
                var $title = $('<div class="title"></div>');
                var $autores = $('<ul class="autor_listado"></ul>');
                var $disciplinas = $('<ul class="disciplina"></ul>');

                $div.attr('href', url);
                $img.css({
                    'background-image': 'url("' + imgUrl + '")'
                });
                $title.html(title);

                console.log(disciplinasArray);

                for (var t = 0; t < autoresArray.length; t++) {
                    $autores.append('<li>' + autoresNames[t] + '</li>');
                }

                for (var t = 0; t < disciplinasArray.length; t++) {
                    if (disciplinasArray[t] != 141 && disciplinasArray[t] != 142 && disciplinasArray[t] != 143) {
                        $disciplinas.append('<div style="background-color: ' + disciplinasColor[t] + '"><li class="li_categ" data-categ="categ_' + disciplinasArray[t] + '" style="background-color: ' + disciplinasColor[t] + '">' + disciplinasNames[t] + '</li></div>');
                    }
                }

                $div.append($img).append($title).append($autores).append($disciplinas);

                return $div;
            }

            function darBloqueAutor(nombre, bio) {
                var $div = $('<div class="obra autor fresh"></div>');
                var $title = $('<div class="name"></div>');
                var $bio = $('<div class="bio"></div>');

                $title.html(nombre);
                $bio.html(bio);

                $div.append($title).append($bio);

                return $div;
            }

            function bindPagination() {
                $('.page-obras .moreNav').on('click', function () {
                    var page = $(this).attr('data-page');
                    var url = $(this).attr('data-url');

                    var $btn = $(this);

                    url = url + page;

                    var $loading_block = $('<div id="loading"></div>');
                    $loading_block.addClass('btm');
                    $('.page-obras').append($loading_block);
                    // LoadingAni.init();
                    $('.page-obras').addClass('loading');
                    // console.log(url);

                    $.getJSON(url, function (data) {
                        console.log(data);
                        $btn.remove();

                        for (var i = 0; i < data.length; i++) {
                            // console.log(data[i]);
                            if (data[i].acf.galeria) {
                                // console.log(data[i].disciplinas_rgb);
                                var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                $('.page-obras .items').append($div);
                            }
                        }

                        var tl_temp = new TimelineMax();
                        tl_temp.add('start')
                            .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0
                            }, 0.05)
                            .add(function () {
                                $('.page-obras .items .fresh').removeClass('fresh');
                            });

                        $('.page-obras .items').append($btn);
                        page = parseInt(page) + 1;
                        $('.page-obras .moreNav').attr('data-page', page);
                        bindPagination();
                        $('.page-obras').removeClass('loading');
                        $loading_block.remove();
                    }).fail(function () {
                        $btn.remove();
                        $('.page-obras').removeClass('loading');
                        $loading_block.remove();
                    });
                });

                $('.page-obras .obra').on('click', function (e) {
                    // console.log(e)
                    if ($(e.target).hasClass('li_categ')) {
                        var categ = $(e.target).attr('data-categ')
                        if (!$('.navegacionFiltros .categorias .categoria.' + categ).hasClass('active'))
                            $('.navegacionFiltros .categorias .categoria.' + categ).click()
                        return false;
                    } else {
                        // var data = $('.page-obras').html().replace(/\n|\t/g, ' ');
                        // var key = window.location.pathname;

                        // var menu = $('#secondary_menu').html().replace(/\n|\t/g, ' ');

                        // sessionStorage.setItem(key, data)
                        // sessionStorage.setItem('menu', menu)
                        // // console.log(window.location.href)
                        // // console.log(sessionStorage.getItem(key))
                        // history.replaceState(key, '', key);
                        // // console.log(key)

                        // var id_item = $(this).attr('data-id')

                        // var url = $(this).attr('href')
                        // var url_array = url.split('/')
                        // var key = ''
                        // for(var i = 3; i < url_array.length; i++){
                        //     key += url_array[i]
                        //     if(i < url_array.length - 1)
                        //         key += '/'
                        // }
                        // // console.log(url)
                        // history.pushState(key, '', url)

                        // var tl_temp = new TimelineMax()
                        // tl_temp.fromTo('#secondary_menu .parent-nav', 0.5, {autoAlpha: 1, x: 0}, {autoAlpha: 0, x: -10})
                        // .fromTo('.page-obras', 0.5, {autoAlpha: 1}, {autoAlpha: 0}, '-=0.5')
                        // .add(function(){
                        //     $('#secondary_menu').empty()
                        //     $('.page-obras').empty();
                        // })

                        // // console.log(key);
                        // return false;
                    }
                })

                window.addEventListener('popstate', function (e) {
                    // console.log(sessionStorage.getItem(e.state))
                    if (sessionStorage.getItem(e.state) != null) {
                        var data = sessionStorage.getItem(e.state)
                        $('.page-obras').empty();
                        $('.page-obras').append(data);
                        $('#secondary_menu').empty().append(sessionStorage.getItem('menu'))

                        var tl_temp = new TimelineMax()
                        tl_temp.fromTo('#secondary_menu .parent-nav', 0.5, {
                                autoAlpha: 0,
                                x: -10
                            }, {
                                autoAlpha: 1,
                                x: 0
                            })
                            .fromTo('.page-obras', 0.5, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1
                            }, '-=0.5')

                        iniciarArteCultura();
                    }
                })
            }

            function limpiarFiltros() {
                $('.navegacionFiltros .categoria.active').removeClass('active');
                $('.navegacionFiltros .categoria.inactive').removeClass('inactive');
                $('.navegacionFiltros .autores .listado li').removeClass('active');
            }

            $('.navegacionFiltros .categoria').on('click', function () {
                if (!$(this).hasClass('active')) {
                    limpiarFiltros();

                    $(this).addClass('active');
                    $('.navegacionFiltros .categoria:not(.active)').addClass('inactive');

                    var value = $(this).attr('data-name');
                    var url = $(this).attr('data-url');

                    var $loading_block = $('<div id="loading"></div>');
                    $('.page-obras').append($loading_block);
                    // LoadingAni.init();
                    $('.page-obras').addClass('loading');

                    var $resultado_info = $('<div class="resultado"></div>');

                    $.getJSON(url, function (data) {
                        // console.log(data);
                        $('.page-obras').removeClass('loading');
                        $loading_block.remove();
                        $('.page-obras .items').empty();

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].acf.galeria) {
                                var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                $('.page-obras .items').append($div);
                            }
                        }

                        var tl_temp = new TimelineMax();
                        tl_temp.add('start')
                            .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0
                            }, 0.05)
                            .add(function () {
                                $('.page-obras .items .fresh').removeClass('fresh');
                            });

                        cerrarNavObras();

                        $resultado_info.html('Filtrando resultados <span>' + value + '</span>');

                        $resultado_info.attr('data-url', '/wp-json/wp/v2/obras?per_page=20');

                        $resultado_info.on('click', function () {
                            var url = webURL + $(this).attr('data-url');
                            var $loading_block = $('<div id="loading"></div>');
                            $('.page-obras').append($loading_block);
                            // LoadingAni.init();
                            $('.page-obras').addClass('loading');

                            $.getJSON(url, function (data) {
                                $('.page-obras').removeClass('loading');
                                $loading_block.remove();
                                $('.page-obras .items').empty();

                                limpiarFiltros();

                                for (var i = 0; i < data.length; i++) {
                                    // console.log(data[i]);
                                    if (data[i].acf.galeria) {
                                        var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                        $('.page-obras .items').append($div);
                                    }
                                }

                                var tl_temp = new TimelineMax();
                                tl_temp.add('start')
                                    .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                        autoAlpha: 0,
                                        y: 20
                                    }, {
                                        autoAlpha: 1,
                                        y: 0
                                    }, 0.05)
                                    .add(function () {
                                        $('.page-obras .items .fresh').removeClass('fresh');
                                    });

                                var $btn = '<div class="moreNav" data-url="' + webURL + '/wp-json/wp/v2/obras?per_page=20&amp;page=" data-page="2"></div>';

                                $('.page-obras .items').append($btn);
                                bindPagination();
                            });
                        });

                        var $btn = '<div class="moreNav" data-url="' + url + '&amp;page=" data-page="2"></div>';

                        $('.page-obras .items').append($btn);
                        bindPagination();

                        $('.page-obras .items').prepend($resultado_info);
                    });
                } else {
                    limpiarFiltros();

                    var url = webURL + '/wp-json/wp/v2/obras?per_page=20';
                    var $loading_block = $('<div id="loading"></div>');
                    $('.page-obras').append($loading_block);
                    // LoadingAni.init();
                    $('.page-obras').addClass('loading');

                    $.getJSON(url, function (data) {
                        // console.log(data);
                        $('.page-obras').removeClass('loading');
                        $loading_block.remove();
                        $('.page-obras .items').empty();

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].acf.galeria) {
                                var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                $('.page-obras .items').append($div);
                            }
                        }

                        var tl_temp = new TimelineMax();
                        tl_temp.add('start')
                            .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0
                            }, 0.05)
                            .add(function () {
                                $('.page-obras .items .fresh').removeClass('fresh');
                            });

                        cerrarNavObras();
                    });
                }
            });

            $('.navegacionFiltros .autores .listado li').on('click', function () {
                if (!$(this).hasClass('active')) {
                    limpiarFiltros();

                    $(this).addClass('active');

                    var value = $(this).attr('data-name');
                    var url = $(this).attr('data-url');
                    var bio = $(this).attr('data-bio');

                    var $loading_block = $('<div id="loading"></div>');
                    $('.page-obras').append($loading_block);
                    // LoadingAni.init();
                    $('.page-obras').addClass('loading');

                    var $resultado_info = $('<div class="resultado"></div>');

                    $.getJSON(url, function (data) {
                        // console.log(data);
                        $('.page-obras').removeClass('loading');
                        $loading_block.remove();

                        $('.page-obras .items').empty();

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].acf.galeria) {
                                var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                $('.page-obras .items').append($div);
                            }
                        }



                        $.getJSON(bio, function (data) {
                            // console.log(data);
                            var $div = darBloqueAutor(data.name, data.acf.biografia);

                            $resultado_info.html('Filtrando resultados <span>' + value + '</span>');

                            $resultado_info.attr('data-url', '/wp-json/wp/v2/obras?per_page=20');

                            $resultado_info.on('click', function () {
                                var url = webURL + $(this).attr('data-url');

                                var $loading_block = $('<div id="loading"></div>');
                                $('.page-obras').append($loading_block);
                                // LoadingAni.init();
                                $('.page-obras').addClass('loading');
                                $.getJSON(url, function (data) {
                                    $('.page-obras').removeClass('loading');
                                    $loading_block.remove();
                                    $('.page-obras .items').empty();

                                    limpiarFiltros();

                                    for (var i = 0; i < data.length; i++) {
                                        // console.log(data[i]);
                                        if (data[i].acf.galeria) {
                                            var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                            $('.page-obras .items').append($div);
                                        }
                                    }

                                    var tl_temp = new TimelineMax();
                                    tl_temp.add('start')
                                        .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                            autoAlpha: 0,
                                            y: 20
                                        }, {
                                            autoAlpha: 1,
                                            y: 0
                                        }, 0.05)
                                        .add(function () {
                                            $('.page-obras .items .fresh').removeClass('fresh');
                                        });

                                    var $btn = '<div class="moreNav" data-url="' + webURL + '/wp-json/wp/v2/obras?per_page=20&amp;page=" data-page="2"></div>';

                                    $('.page-obras .items').append($btn);
                                    bindPagination();
                                });
                            });

                            $('.page-obras .items').prepend($div);
                            $('.page-obras .items').prepend($resultado_info);

                            var tl_temp = new TimelineMax();
                            tl_temp.add('start')
                                .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                    autoAlpha: 0,
                                    y: 20
                                }, {
                                    autoAlpha: 1,
                                    y: 0
                                }, 0.05)
                                .add(function () {
                                    $('.page-obras .items .fresh').removeClass('fresh');
                                });
                        });

                        cerrarNavObras();


                        if (data.length == 20) {
                            var $btn = '<div class="moreNav" data-url="' + url + '&amp;page=" data-page="2"></div>';

                            $('.page-obras .items').append($btn);
                            bindPagination();
                        }

                    });
                } else {
                    limpiarFiltros();

                    var url = webURL + '/wp-json/wp/v2/obras?per_page=20';
                    var $loading_block = $('<div id="loading"></div>');
                    $('.page-obras').append($loading_block);
                    // LoadingAni.init();
                    $('.page-obras').addClass('loading');

                    $.getJSON(url, function (data) {
                        // console.log(data);
                        $('.page-obras').removeClass('loading');
                        $loading_block.remove();
                        $('.page-obras .items').empty();

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].acf.galeria) {
                                var $div = darBloqueItemObra(data[i].link, data[i].acf.galeria[0].sizes['archivo_thumb'], data[i].title.rendered, data[i].autor, data[i].disciplina, data[i].autores_names, data[i].disciplina_names, data[i].disciplinas_rgb);
                                $('.page-obras .items').append($div);
                            }
                        }

                        var tl_temp = new TimelineMax();
                        tl_temp.add('start')
                            .staggerFromTo('.page-obras .items .fresh', 0.2, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0
                            }, 0.05)
                            .add(function () {
                                $('.page-obras .items .fresh').removeClass('fresh');
                            });

                        cerrarNavObras();
                    });
                }
            })
        }

        function iniciarObra() {
            var gal_num = $('.page-obras .galeria .inside .item').length;

            var gal_obra = new Flickity('.page-obras .galeria .inside', {
                freeScroll: false,
                contain: true,
                prevNextButtons: false,
                pageDots: true,
                cellAlign: 'center',
                setGallerySize: false,
            });

            gal_obra.on('select', function () {
                var index = $('.page-obras .galeria .inside .is-selected').index();
                // console.log(index);
                actualizarNavGaleria(index);
                // console.log(index + '|' + gal_num);
            });

            gal_obra.select(0);

            $('.gal_nav .next').on('click', function () {
                gal_obra.next();
            });
            $('.gal_nav .prev').on('click', function () {
                gal_obra.previous();
            });

            function actualizarNavGaleria(index) {
                if (index == 0) {
                    $('.gal_nav .prev').hide();
                } else {
                    $('.gal_nav .prev').show();
                }

                if (gal_num == (index + 1)) {
                    $('.gal_nav .next').hide();
                } else {
                    $('.gal_nav .next').show();
                }
            }

            $('.page-obras .galeria .inside .item.video').on('click', function () {
                if (!$(this).hasClass('loaded')) {
                    var id = $(this).attr('data-id');
                    var $container = $(this).find('.inside');
                    var url = '';

                    if ($(this).hasClass('YouTube')) {
                        // console.log(id);
                        url = 'https://www.youtube.com/embed/' + id + '?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1';

                    } else if ($(this).hasClass('Vimeo')) {
                        // console.log(id);
                        url = 'https://player.vimeo.com/video/' + id + '?autoplay=1';
                    }

                    var $iframe = $('<iframe src="' + url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
                    $container.append($iframe);
                    $container.fadeIn();
                    $(this).addClass('loaded');
                }
            });

            $('.texto .left .item').on('click', function () {
                var div = $(this).attr('data-div');
                if (!$(this).hasClass('active')) {
                    $('.texto .left .item.active').removeClass('active');
                    $(this).addClass('active');
                    $('.texto .content .inside.active').fadeOut(200);
                    setTimeout(function () {
                        $('.texto .content .inside' + div).fadeIn();
                        $('.texto .content .inside' + div).addClass('active');
                    }, 200);

                }
            });

            $('.texto .left .item:first-child').click();
        }

    });

})(jQuery, this);