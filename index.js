import * as THREE from 'three';
import * as PhotoSphereViewer from 'photo-sphere-viewer';
var OBJLoader = require('three-obj-loader');
var OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import $ from 'jquery';

(function ($, root, undefined) {

    $(function () {
        if ($('body').hasClass('parent-pageid-4433')) {

            var viewer = null;
            var audio_url = '';
            var audioElement = document.createElement('audio');

            var slider_360 = new Flickity('#slider3d', {
                freeScroll: false,
                draggable: true,
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                cellAlign: 'center',
            });



            var tl_intro = new TimelineMax();
            var canvas_height = $('#mapa3d .inside').height();
            var canvas_width = $('#mapa3d .inside').width();

            var pointLight = new THREE.PointLight(0x909090, 1, 1);

            var loader = new THREE.OBJLoader();
            var camera = new THREE.PerspectiveCamera(50, canvas_width / canvas_height, 0.01, 1000);
            camera.position.z = 15;

            var scene = new THREE.Scene();

            var renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            renderer.setSize(canvas_width, canvas_height);
            $('#mapa3d .inside').append(renderer.domElement);
            // scene.background = new THREE.Color(50,50,50);

            var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            var material = new THREE.MeshNormalMaterial();

            var mesh = new THREE.Mesh(geometry, material);

            // scene.add(pointLight);

            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = false;
            // controls.dampingFactor = 0.5;
            controls.enableZoom = true;

            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }

            function resetCamera() {
                controls.target.set(0.08721972212675488, 8.055316108877758e-19, 0.49761662655146854);
                controls.update();
                camera.position.set(1.07562268542847, 2.7652009788076355, 2.523225000039443);

                controls.target.set(0.08721972212675488, 8.055316108877758e-19, 0.49761662655146854);
                controls.update();
                camera.position.set(1.07562268542847, 2.7652009788076355, 2.523225000039443);

                controls.target.set(0.08721972212675488, 8.055316108877758e-19, 0.49761662655146854);
                controls.update();
                camera.position.set(1.07562268542847, 2.7652009788076355, 2.523225000039443);
            }

            loader.load(
                '/wp-content/themes/plantilla-mnm-master/assets/3d/mapa.obj',
                function (obj) {
                    // console.log(obj[0])
                    var num = 0;
                    obj.traverse(function (child) {
                        if(num == 0) console.log(child);

                        num++;

                        
                        if (child instanceof THREE.Mesh) {
                            var geo = child.geometry;
                            var mat = child.material;

                            if (child.name == 'Curve.008') {
                                var mat = new THREE.MeshBasicMaterial({
                                    color: 0x8ea2a1,
                                    wireframe: true,
                                    transparent: true
                                });
                                mat.opacity = 0.5;
                            } else {
                                var mat = new THREE.MeshBasicMaterial({
                                    color: 0xdcd8cd,
                                    wireframe: true,
                                    transparent: false
                                });
                            }


                            // console.log(child);

                            // var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 0 } );
                            // mat.emissive = new THREE.Color(0x909090);
                            var m = new THREE.Mesh(geo, mat);
                            scene.add(m);

                            // var useWireFrame = true;
                            // if (useWireFrame) {
                            //     m.traverse(function (child) {
                            //         if (child instanceof THREE.Mesh) 
                            //         {
                            //         // child.material.wireframe = true;
                            //         // child.material.color = new THREE.Color( 0xFFFFFF  );
                            //         }
                            //     });
                            // }


                            resetCamera();
                        }
                    });
                    // scene.add(obj);



                    $('#slider3d .item').each(function () {
                        var x_coor = $(this).attr('data-coor-x');
                        var y_coor = $(this).attr('data-coor-y');
                        var z_coor = $(this).attr('data-coor-z');

                        if (x_coor != '' && y_coor != '' && z_coor != '') {

                            var geometry = new THREE.SphereGeometry(0.02, 10, 10);
                            if (z_coor == 1)
                                var material = new THREE.MeshBasicMaterial({
                                    color: 0xefabc8
                                });
                            else
                                var material = new THREE.MeshBasicMaterial({
                                    color: 0xefabc8
                                });

                            var bola = new THREE.Mesh(geometry, material);
                            scene.add(bola);
                            bola.position.z = y_coor;
                            bola.position.x = x_coor;

                            if (z_coor > 1)
                                bola.position.y = 0.15;
                        }
                    });

                    animate();

                    tl_intro.add('start')
                        .fromTo('#mapa3d .intro', 1, {
                            autoAlpha: 0,
                            y: 10
                        }, {
                            autoAlpha: 1,
                            y: 0
                        }, '+=0.5')
                        .to('#mapa3d .intro', 1, {
                            autoAlpha: 0,
                            y: -10
                        }, '+=1.5')
                        .add(function () {
                            $('body').addClass('dark');
                        })
                        .fromTo('#mapa3d .inside', 0.5, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1
                        }, '+=0.7')
                        .add('marker')
                        .staggerFromTo('#mapa3d #slider3d .item', 0.5, {
                            autoAlpha: 0,
                            x: 10
                        }, {
                            autoAlpha: 1,
                            x: 0
                        }, 0.2)
                        .fromTo('#mapa3d .controls .prev, #mapa3d .controls .next', 0.5, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1
                        }, 'marker')
                        .fromTo('#mapa3d .controls .openfull', 0.5, {
                            autoAlpha: 0,
                            scale: 0.8
                        }, {
                            autoAlpha: 1,
                            scale: 1
                        }, 'marker')
                        .fromTo('#mapa3d .controls .galopen', 0.5, {
                            autoAlpha: 0,
                            scale: 0.8
                        }, {
                            autoAlpha: 1,
                            scale: 1
                        }, 'marker')
                }
            );

            slider_360.on('staticClick', function (event, pointer, cellElem, cellIndex) {
                if (cellIndex !== undefined) {
                    slider_360.select(cellIndex);
                }

                // resetCamera();
                // console.log(controls.target);
                // console.log(camera.position);
            });

            var geometry = new THREE.SphereGeometry(0.04, 15, 15);
            var material = new THREE.MeshBasicMaterial({
                color: 0x38c7ff
            });
            var bola = new THREE.Mesh(geometry, material);
            scene.add(bola);

            slider_360.on('select', function () {
                // console.log('hola');
                var x_coor = $('#slider3d .item.is-selected').attr('data-coor-x');
                var y_coor = $('#slider3d .item.is-selected').attr('data-coor-y');
                var z_coor = $('#slider3d .item.is-selected').attr('data-coor-z');
                actualizarItemAudio();

                bola.position.z = y_coor;
                bola.position.x = x_coor;

                if (z_coor > 1)
                    bola.position.y = 0.15;
                else
                    bola.position.y = 0;
            });

            function actualizarItemAudio() {
                var $item = $('#slider3d .item.is-selected');
                // console.log($item.attr('data-audio'));
                if ($item.attr('data-audio') != '' && $item.attr('data-audio') != audio_url) {
                    $('#slider3d .item .audio.active').removeClass('active');
                    audio_url = '';
                    audioElement.pause();
                    $('.mediador').hide();
                    // console.log(audioElement);
                } else if ($item.attr('data-audio') == audio_url && audio_url != '') {
                    $('#slider3d .item .audio.active').removeClass('active');
                    $item.find('.audio').addClass('active');
                    $('.mediador').show();
                } else {
                    $('#slider3d .item .audio.active').removeClass('active');
                    audio_url = '';
                    audioElement.pause();
                    $('.mediador').hide();
                }
            }

            // slider_360.on('change', function(cellIndex){
            //     console.log('hola ' + cellIndex)
            // });

            $('#mapa3d .controls .next').on('click', function () {
                slider_360.next();
                actualizarItemAudio();
            });

            $('#mapa3d .controls .prev').on('click', function () {
                slider_360.previous();
                actualizarItemAudio();
            });

            $('#slider3d .item .openfull').on('click', function () {
                if (!$(this).hasClass('open')) {
                    var img_url = $('#slider3d .is-selected').attr('data-img');
                    $('#slider3d .active .open').removeClass('open');
                    $('#slider3d .active:not(.audio)').removeClass('active');
                    var $img = $('<img />');
                    var $item = $('#slider3d .is-selected');

                    $(this).addClass('open');
                    resetCamera();

                    if (viewer != null)
                        viewer.destroy();

                    $('#visor_recorrido').empty();
                    $img.attr('src', img_url).load(function () {

                        $item.addClass('active');
                        $('#mapa3d .inside').addClass('small');
                        $('#visor_recorrido').show();


                        var tl_temp = new TimelineMax();

                        tl_temp.add('start')
                            .add(function () {
                                viewer = new PhotoSphereViewer({
                                    container: 'visor_recorrido',
                                    panorama: img_url,
                                    time_anim: 4000,
                                    anim_speed: '1rpm'
                                });

                                viewer.zoom(0);
                            }, '+=0.4')
                            .fromTo('#visor_recorrido', 1, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1
                            }, '+=0.4');

                    });
                } else {
                    $('#mapa3d .inside').removeClass('small');
                    $('#slider3d .active .open').removeClass('open');
                    $('#slider3d .active:not(.audio)').removeClass('active');
                    $('#visor_recorrido').hide();
                }



            });

            $('#slider3d .item .box .audio').on('click', function () {
                if (audio_url == '' && !$(this).hasClass('loading') && !$(this).hasClass('active')) {
                    audio_url = $(this).attr('data-url');
                    var imagen_mediador = $(this).attr('data-img');

                    $(this).addClass('loading');
                    var $elem = $(this);
                    audioElement.setAttribute('src', audio_url);
                    audioElement.addEventListener('canplay', function () {
                        this.play();
                        $('.mediador').show().css({
                            'background-image': 'url("' + imagen_mediador + '")'
                        });
                        $elem.removeClass('loading');
                        $elem.addClass('active');
                    });
                    audioElement.addEventListener('ended', function () {
                        $elem.removeClass('active');
                        $('.mediador').hide();
                        audio_url = '';
                    });
                } else if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    audioElement.pause();
                    $('.mediador').hide();
                    audio_url = '';
                }
            });


        }

    });

})(jQuery, this);