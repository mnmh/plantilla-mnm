/*!
 * Photo Sphere Viewer 3.5.1
 * Copyright (c) 2014-2015 Jérémy Heleine
 * Copyright (c) 2015-2019 Damien "Mistic" Sorel
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */
! function (t, e) {
    "function" == typeof define && define.amd ? define(["three", "uevent", "dot/doT"], e) : "object" == typeof module && module.exports ? module.exports = e(require("three"), require("uevent"), require("dot/doT")) : t.PhotoSphereViewer = e(t.THREE, t.uEvent, t.doT)
}(this, function (u, t, o) {
    "use strict";

    function d(t) {
        if (!(this instanceof d)) return new d(t);
        if (d.SYSTEM.loaded || d._loadSystem(), this.config = k.clone(d.DEFAULTS), k.deepmerge(this.config, t), !t.container) throw new x("No value given for container.");
        if (!d.SYSTEM.isCanvasSupported) throw new x("Canvas is not supported.");
        if (!(d.SYSTEM.isWebGLSupported && this.config.webgl || k.checkTHREE("CanvasRenderer", "Projector"))) throw new x("Missing Three.js components: CanvasRenderer, Projector. Get them from three.js-examples package.");
        if (this.config.longitude_range && 2 !== this.config.longitude_range.length && (this.config.longitude_range = null, console.warn("PhotoSphereViewer: longitude_range must have exactly two elements.")), this.config.latitude_range ? 2 !== this.config.latitude_range.length ? (this.config.latitude_range = null, console.warn("PhotoSphereViewer: latitude_range must have exactly two elements.")) : this.config.latitude_range[0] > this.config.latitude_range[1] && (this.config.latitude_range = [this.config.latitude_range[1], this.config.latitude_range[0]], console.warn("PhotoSphereViewer: latitude_range values must be ordered.")) : void 0 === this.config.tilt_up_max && void 0 === this.config.tilt_down_max || (this.config.latitude_range = [void 0 !== this.config.tilt_down_max ? this.config.tilt_down_max - Math.PI / 4 : -k.HalfPI, void 0 !== this.config.tilt_up_max ? this.config.tilt_up_max + Math.PI / 4 : k.HalfPI], console.warn("PhotoSphereViewer: tilt_up_max and tilt_down_max are deprecated, use latitude_range instead.")), this.config.max_fov < this.config.min_fov) {
            var e = this.config.max_fov;
            this.config.max_fov = this.config.min_fov, this.config.min_fov = e, console.warn("PhotoSphereViewer: max_fov cannot be lower than min_fov.")
        }
        this.config.cache_texture && (!k.isInteger(this.config.cache_texture) || this.config.cache_texture < 0) && (this.config.cache_texture = d.DEFAULTS.cache_texture, console.warn("PhotoSphereViewer: invalid value for cache_texture")), "panorama_roll" in this.config && (this.config.sphere_correction.roll = this.config.panorama_roll, console.warn("PhotoSphereViewer: panorama_roll is deprecated, use sphere_correction.roll instead")), "gyroscope" in this.config && console.warn("PhotoSphereViewer: gyroscope is deprecated, the control is automatically created if DeviceOrientationControls.js is loaded"), !0 === this.config.keyboard && (this.config.keyboard = k.clone(d.DEFAULTS.keyboard)), this.config.min_fov = k.bound(this.config.min_fov, 1, 179), this.config.max_fov = k.bound(this.config.max_fov, 1, 179), null === this.config.default_fov ? this.config.default_fov = this.config.max_fov / 2 + this.config.min_fov / 2 : this.config.default_fov = k.bound(this.config.default_fov, this.config.min_fov, this.config.max_fov), null === this.config.anim_lat ? this.config.anim_lat = this.config.default_lat : this.config.anim_lat = k.parseAngle(this.config.anim_lat, !0), this.config.longitude_range && (this.config.longitude_range = this.config.longitude_range.map(function (t) {
            return k.parseAngle(t)
        })), this.config.latitude_range && (this.config.latitude_range = this.config.latitude_range.map(function (t) {
            return k.parseAngle(t, !0)
        })), this.config.anim_speed = k.parseSpeed(this.config.anim_speed), this.config.caption && !this.config.navbar && (this.config.navbar = ["caption"]), !0 === this.config.fisheye ? this.config.fisheye = 1 : !1 === this.config.fisheye && (this.config.fisheye = 0), this.parent = "string" == typeof t.container ? document.getElementById(t.container) : t.container, this.container = null, this.loader = null, this.navbar = null, this.hud = null, this.panel = null, this.tooltip = null, this.notification = null, this.overlay = null, this.canvas_container = null, this.renderer = null, this.stereoEffect = null, this.noSleep = null, this.scene = null, this.camera = null, this.mesh = null, this.raycaster = null, this.doControls = null, this.prop = {
            needsUpdate: !0,
            isCubemap: void 0,
            position: {
                longitude: 0,
                latitude: 0
            },
            ready: !1,
            direction: null,
            anim_speed: 0,
            zoom_lvl: 0,
            vFov: 0,
            hFov: 0,
            aspect: 0,
            move_speed: .1,
            moving: !1,
            zooming: !1,
            start_mouse_x: 0,
            start_mouse_y: 0,
            mouse_x: 0,
            mouse_y: 0,
            mouse_history: [],
            gyro_alpha_offset: 0,
            pinch_dist: 0,
            main_reqid: null,
            orientation_cb: null,
            autorotate_cb: null,
            animation_promise: null,
            loading_promise: null,
            start_timeout: null,
            dblclick_data: null,
            dblclick_timeout: null,
            cache: [],
            size: {
                width: 0,
                height: 0
            },
            pano_data: {
                full_width: 0,
                full_height: 0,
                cropped_width: 0,
                cropped_height: 0,
                cropped_x: 0,
                cropped_y: 0
            }
        }, Object.keys(d.TEMPLATES).forEach(function (t) {
            this.config.templates[t] || (this.config.templates[t] = d.TEMPLATES[t]), "string" == typeof this.config.templates[t] && (this.config.templates[t] = o.template(this.config.templates[t]))
        }, this), (this.parent.photoSphereViewer = this).container = document.createElement("div"), this.container.classList.add("psv-container"), this.parent.appendChild(this.container), null !== this.config.size && this._setViewerSize(this.config.size), this._onResize();
        var i = (this.config.default_fov - this.config.min_fov) / (this.config.max_fov - this.config.min_fov) * 100;
        this.config.default_zoom_lvl = i - 2 * (i - 50), this.prop.move_speed = u.Math.degToRad(this.config.move_speed / d.SYSTEM.pixelRatio), this.loader = new r(this), this.loader.hide(), this.navbar = new a(this), this.navbar.hide(), this.hud = new n(this), this.hud.hide(), this.panel = new c(this), this.tooltip = new l(this.hud), this.notification = new h(this), this.overlay = new p(this), this._bindEvents(), this.config.panorama && this.setPanorama(this.config.panorama), this.once("render", function () {
            this.config.navbar && (this.container.classList.add("psv-container--has-navbar"), this.navbar.show()), this.hud.show(), this.config.markers && (this.config.markers.forEach(function (t) {
                this.hud.addMarker(t, !1)
            }, this), this.hud.renderMarkers()), !1 !== this.config.time_anim && (this.prop.start_timeout = window.setTimeout(this.startAutorotate.bind(this), this.config.time_anim)), setTimeout(function () {
                this._run(), this.trigger("ready")
            }.bind(this), 0)
        }.bind(this)), d.SYSTEM.touchEnabled.then(function (t) {
            t && this.container.classList.add("psv-is-touch")
        }.bind(this))
    }

    function s(t) {
        this.psv = t instanceof d ? t : t.psv, this.parent = t, this.container = null, this.visible = !0, this.constructor.publicMethods && this.constructor.publicMethods.forEach(function (t) {
            this.psv[t] = this[t].bind(this)
        }, this)
    }

    function n(t) {
        s.call(this, t), this.svgContainer = null, this.markers = {}, this.currentMarker = null, this.hoveringMarker = null, this.prop = {
            panelOpened: !1,
            panelOpening: !1,
            markersButton: this.psv.navbar.getNavbarButton("markers", !0)
        }, this.create()
    }

    function r(t) {
        s.call(this, t), this.canvas = null, this.loader = null, this.create()
    }

    function a(t) {
        if (s.call(this, t), this.config = this.psv.config.navbar, this.items = [], !0 === this.config) this.config = k.clone(d.DEFAULTS.navbar);
        else if ("string" == typeof this.config) this.config = this.config.split(" ");
        else if (!Array.isArray(this.config)) {
            console.warn('PhotoSphereViewer: hashmap form of "navbar" is deprecated, use an array instead.');
            var e = this.config;
            this.config = [], k.forEach(e, function (t, e) {
                t && this.config.push(e)
            }.bind(this)), this.config.sort(function (t, e) {
                return d.DEFAULTS.navbar.indexOf(t) - d.DEFAULTS.navbar.indexOf(e)
            })
        }
        this.create()
    }

    function e(t, e) {
        s.call(this, t), this.content = null, this.button = null, this.prop = {
            caption: "",
            width: 0
        }, this.create(), this.setCaption(e)
    }

    function h(t) {
        s.call(this, t), this.create()
    }

    function p(t) {
        s.call(this, t), this.create(), this.hide()
    }

    function c(t) {
        s.call(this, t), this.content = null, this.prop = {
            mouse_x: 0,
            mouse_y: 0,
            mousedown: !1,
            opened: !1
        }, this.create()
    }

    function l(t) {
        s.call(this, t), this.config = this.psv.config.tooltip, this.prop = {
            timeout: null
        }, this.create()
    }

    function f(t) {
        s.call(this, t), this.id = void 0, this.constructor.id && (this.id = this.constructor.id), this.enabled = !0
    }

    function i(t) {
        f.call(this, t), this.create()
    }

    function g(t) {
        f.call(this, t), this.create()
    }

    function m(t, e) {
        f.call(this, t), this.config = e, this.config.id && (this.id = this.config.id), this.create()
    }

    function v(t) {
        f.call(this, t), this.create()
    }

    function y(t) {
        f.call(this, t), this.create()
    }

    function _(t) {
        f.call(this, t), this.create()
    }

    function w(t) {
        f.call(this, t), this.create()
    }

    function b(t) {
        f.call(this, t), this.create()
    }

    function E(t) {
        f.call(this, t), this.zoom_range = null, this.zoom_value = null, this.prop = {
            mousedown: !1,
            buttondown: !1,
            longPressInterval: null,
            longPressTimeout: null
        }, this.create()
    }

    function M(t) {
        if (!(this instanceof M)) return new M(t);
        this._cancelled = !1, this._resolved = !1;
        var i = this;
        this._promise = new Promise(function (t, e) {
            i._resolve = t, i._reject = e
        }), t && (t.easing && "string" != typeof t.easing || (t.easing = M.easings[t.easing || "linear"]), this._start = null, (this._options = t).delay ? this._delayTimeout = window.setTimeout(function () {
            this._delayTimeout = null, window.requestAnimationFrame(this._run.bind(this))
        }.bind(this), t.delay) : window.requestAnimationFrame(this._run.bind(this)))
    }

    function x(t) {
        this.message = t, "captureStackTrace" in Error ? Error.captureStackTrace(this, x) : this.stack = (new Error).stack
    }

    function S(t, e) {
        if (!t.id) throw new x("missing marker id");
        if (t.image && (!t.width || !t.height)) throw new x("missing marker width/height");
        if ((t.image || t.html) && !(t.hasOwnProperty("x") && t.hasOwnProperty("y") || t.hasOwnProperty("latitude") && t.hasOwnProperty("longitude"))) throw new x("missing marker position, latitude/longitude or x/y");
        this.psv = e, this.visible = !0, this._dynamicSize = !1;
        var i, o = t.id,
            s = S.getType(t, !1);
        Object.defineProperties(this, {
            id: {
                configurable: !1,
                enumerable: !0,
                get: function () {
                    return o
                },
                set: function () {}
            },
            type: {
                configurable: !1,
                enumerable: !0,
                get: function () {
                    return s
                },
                set: function () {}
            },
            $el: {
                configurable: !1,
                enumerable: !0,
                get: function () {
                    return i
                },
                set: function () {}
            },
            _def: {
                configurable: !1,
                enumerable: !0,
                get: function () {
                    return this[s]
                },
                set: function (t) {
                    this[s] = t
                }
            }
        }), (i = this.isNormal() ? document.createElement("div") : this.isPolygon() ? document.createElementNS(k.svgNS, "polygon") : this.isPolyline() ? document.createElementNS(k.svgNS, "polyline") : document.createElementNS(k.svgNS, this.type)).id = "psv-marker-" + this.id, (i.psvMarker = this).update(t)
    }
    t.mixin(d), d.prototype._run = function (t) {
        this.trigger("before-render", t || +new Date), this.prop.needsUpdate && (this._render(), this.prop.needsUpdate = !1), this.prop.main_reqid = window.requestAnimationFrame(this._run.bind(this))
    }, d.prototype._render = function () {
        this.prop.direction = this.sphericalCoordsToVector3(this.prop.position), this.camera.position.set(0, 0, 0), this.camera.lookAt(this.prop.direction), this.config.fisheye && this.camera.position.copy(this.prop.direction).multiplyScalar(this.config.fisheye / 2).negate(), this.camera.aspect = this.prop.aspect, this.camera.fov = this.prop.vFov, this.camera.updateProjectionMatrix(), (this.stereoEffect || this.renderer).render(this.scene, this.camera), this.trigger("render")
    }, d.prototype._loadXMP = function (t) {
        return this.config.usexmpdata ? new Promise(function (n) {
            var r = 0,
                a = new XMLHttpRequest;
            this.config.with_credentials && (a.withCredentials = !0), a.onreadystatechange = function () {
                if (4 === a.readyState) {
                    if (200 !== a.status && 201 !== a.status && 202 !== a.status && 0 !== a.status) throw new x(this.container.textContent = "Cannot load image");
                    this.loader.setProgress(100);
                    var t = a.responseText,
                        e = t.indexOf("<x:xmpmeta"),
                        i = t.indexOf("</x:xmpmeta>"),
                        o = t.substring(e, i),
                        s = null; - 1 !== e && -1 !== i && -1 !== o.indexOf("GPano:") && ((s = {
                        full_width: parseInt(k.getXMPValue(o, "FullPanoWidthPixels")),
                        full_height: parseInt(k.getXMPValue(o, "FullPanoHeightPixels")),
                        cropped_width: parseInt(k.getXMPValue(o, "CroppedAreaImageWidthPixels")),
                        cropped_height: parseInt(k.getXMPValue(o, "CroppedAreaImageHeightPixels")),
                        cropped_x: parseInt(k.getXMPValue(o, "CroppedAreaLeftPixels")),
                        cropped_y: parseInt(k.getXMPValue(o, "CroppedAreaTopPixels"))
                    }).full_width && s.full_height && s.cropped_width && s.cropped_height || (console.warn("PhotoSphereViewer: invalid XMP data"), s = null)), n(s)
                } else 3 === a.readyState && this.loader.setProgress(r += 10)
            }.bind(this), a.onprogress = function (t) {
                if (t.lengthComputable) {
                    var e = parseInt(t.loaded / t.total * 100);
                    r < e && (r = e, this.loader.setProgress(r))
                }
            }.bind(this), a.onerror = function (t) {
                throw this.container.textContent = "Cannot load image", reject(t), new x("Cannot load image")
            }.bind(this), a.open("GET", t, !0), a.send(null)
        }.bind(this)) : Promise.resolve(null)
    }, d.prototype._loadTexture = function (i) {
        var o = [];
        if (Array.isArray(i)) {
            if (6 !== i.length) throw new x("Must provide exactly 6 image paths when using cubemap.");
            for (var t = 0; t < 6; t++) o[t] = i[d.CUBE_MAP[t]];
            i = o
        } else if ("object" == typeof i) {
            if (!d.CUBE_HASHMAP.every(function (t) {
                    return !!i[t]
                })) throw new x("Must provide exactly left, front, right, back, top, bottom when using cubemap.");
            d.CUBE_HASHMAP.forEach(function (t, e) {
                o[e] = i[t]
            }), i = o
        }
        if (Array.isArray(i)) {
            if (!1 === this.prop.isCubemap) throw new x("The viewer was initialized with an equirectangular panorama, cannot switch to cubemap.");
            return this.config.fisheye && console.warn("PhotoSphereViewer: fisheye effect with cubemap texture can generate distorsions."), this.config.cache_texture === d.DEFAULTS.cache_texture && (this.config.cache_texture *= 6), this.prop.isCubemap = !0, this._loadCubemapTexture(i)
        }
        if (!0 === this.prop.isCubemap) throw new x("The viewer was initialized with an cubemap, cannot switch to equirectangular panorama.");
        return this.prop.isCubemap = !1, this._loadEquirectangularTexture(i)
    }, d.prototype._loadEquirectangularTexture = function (h) {
        if (this.config.cache_texture) {
            var t = this.getPanoramaCache(h);
            if (t) return this.prop.pano_data = t.pano_data, Promise.resolve(t.image)
        }
        return this._loadXMP(h).then(function (a) {
            return new Promise(function (n, e) {
                var t = new u.ImageLoader,
                    r = a ? 100 : 0;
                this.config.with_credentials ? t.setCrossOrigin("use-credentials") : t.setCrossOrigin("anonymous");
                t.load(h, function (t) {
                    var e;
                    r = 100, this.loader.setProgress(r), this.trigger("panorama-load-progress", h, r), !a && this.config.pano_data && (a = k.clone(this.config.pano_data)), a || (a = {
                        full_width: t.width,
                        full_height: t.height,
                        cropped_width: t.width,
                        cropped_height: t.height,
                        cropped_x: 0,
                        cropped_y: 0
                    }), this.prop.pano_data = a;
                    var i = Math.min(a.full_width, d.SYSTEM.maxTextureWidth) / a.full_width;
                    if (1 !== i || a.cropped_width !== a.full_width || a.cropped_height !== a.full_height) {
                        var o = k.clone(a);
                        o.full_width *= i, o.full_height *= i, o.cropped_width *= i, o.cropped_height *= i, o.cropped_x *= i, o.cropped_y *= i, t.width = o.cropped_width, t.height = o.cropped_height;
                        var s = document.createElement("canvas");
                        s.width = o.full_width, s.height = o.full_height, s.getContext("2d").drawImage(t, o.cropped_x, o.cropped_y, o.cropped_width, o.cropped_height), e = new u.Texture(s)
                    } else e = new u.Texture(t);
                    e.needsUpdate = !0, e.minFilter = u.LinearFilter, e.generateMipmaps = !1, this.config.cache_texture && this._putPanoramaCache({
                        panorama: h,
                        image: e,
                        pano_data: a
                    }), n(e)
                }.bind(this), function (t) {
                    if (t.lengthComputable) {
                        var e = parseInt(t.loaded / t.total * 100);
                        r < e && (r = e, this.loader.setProgress(r), this.trigger("panorama-load-progress", h, r))
                    }
                }.bind(this), function (t) {
                    throw this.container.textContent = "Cannot load image", e(t), new x("Cannot load image")
                }.bind(this))
            }.bind(this))
        }.bind(this))
    }, d.prototype._loadCubemapTexture = function (l) {
        return new Promise(function (s, i) {
            var t = new u.ImageLoader,
                n = [0, 0, 0, 0, 0, 0],
                r = [],
                a = 0;
            this.config.with_credentials ? t.setCrossOrigin("use-credentials") : t.setCrossOrigin("anonymous");
            for (var e = function (t, e) {
                    a++, n[t] = 100, this.loader.setProgress(k.sum(n) / 6), this.trigger("panorama-load-progress", l[t], n[t]);
                    var i = Math.min(e.width, d.SYSTEM.maxTextureWidth / 2) / e.width;
                    if (1 !== i) {
                        var o = document.createElement("canvas");
                        o.width = e.width * i, o.height = e.height * i, o.getContext("2d").drawImage(e, 0, 0, o.width, o.height), r[t] = new u.Texture(o)
                    } else r[t] = new u.Texture(e);
                    this.config.cache_texture && this._putPanoramaCache({
                        panorama: l[t],
                        image: r[t]
                    }), 6 === a && (r.forEach(function (t) {
                        t.needsUpdate = !0, t.minFilter = u.LinearFilter, t.generateMipmaps = !1
                    }), s(r))
                }, o = function (t, e) {
                    if (e.lengthComputable) {
                        var i = parseInt(e.loaded / e.total * 100);
                        i > n[t] && (n[t] = i, this.loader.setProgress(k.sum(n) / 6), this.trigger("panorama-load-progress", l[t], n[t]))
                    }
                }, h = function (t, e) {
                    throw this.container.textContent = "Cannot load image", i(e), new x("Cannot load image " + t)
                }, p = 0; p < 6; p++) {
                if (this.config.cache_texture) {
                    var c = this.getPanoramaCache(l[p]);
                    if (c) {
                        a++, n[p] = 100, r[p] = c.image;
                        continue
                    }
                }
                t.load(l[p], e.bind(this, p), o.bind(this, p), h.bind(this, p))
            }
            6 === a && s(r)
        }.bind(this))
    }, d.prototype._setTexture = function (t) {
        if (this.scene || this._createScene(), this.prop.isCubemap)
            for (var e = 0; e < 6; e++) this.mesh.material[e].map && this.mesh.material[e].map.dispose(), this.mesh.material[e].map = t[e];
        else this.mesh.material.map && this.mesh.material.map.dispose(), this.mesh.material.map = t;
        this.trigger("panorama-loaded"), this._render()
    }, d.prototype._createScene = function () {
        this.raycaster = new u.Raycaster, this.renderer = d.SYSTEM.isWebGLSupported && this.config.webgl ? new u.WebGLRenderer : new u.CanvasRenderer, this.renderer.setSize(this.prop.size.width, this.prop.size.height), this.renderer.setPixelRatio(d.SYSTEM.pixelRatio);
        var t = d.SPHERE_RADIUS;
        this.prop.isCubemap && (t *= Math.sqrt(3)), this.config.fisheye && (t += d.SPHERE_RADIUS), this.camera = new u.PerspectiveCamera(this.config.default_fov, this.prop.size.width / this.prop.size.height, 1, t), this.camera.position.set(0, 0, 0), this.scene = new u.Scene, this.scene.add(this.camera), this.prop.isCubemap ? this.mesh = this._createCubemap() : this.mesh = this._createSphere(), this.scene.add(this.mesh), this.canvas_container = document.createElement("div"), this.canvas_container.className = "psv-canvas-container", this.renderer.domElement.className = "psv-canvas", this.container.appendChild(this.canvas_container), this.canvas_container.appendChild(this.renderer.domElement)
    }, d.prototype._createSphere = function (t) {
        t = t || 1;
        var e = new u.SphereGeometry(d.SPHERE_RADIUS * t, d.SPHERE_VERTICES, d.SPHERE_VERTICES, -k.HalfPI),
            i = new u.MeshBasicMaterial({
                side: u.DoubleSide,
                overdraw: d.SYSTEM.isWebGLSupported && this.config.webgl ? 0 : 1
            }),
            o = new u.Mesh(e, i);
        return o.scale.x = -1, o
    }, d.prototype._setSphereCorrection = function (t, e) {
        this.cleanSphereCorrection(e), t.rotation.set(e.tilt, e.pan, e.roll)
    }, d.prototype._createCubemap = function (t) {
        t = t || 1;
        for (var e = new u.BoxGeometry(2 * d.SPHERE_RADIUS * t, 2 * d.SPHERE_RADIUS * t, 2 * d.SPHERE_RADIUS * t, d.CUBE_VERTICES, d.CUBE_VERTICES, d.CUBE_VERTICES), i = [], o = 0; o < 6; o++) i.push(new u.MeshBasicMaterial({
            side: u.BackSide,
            overdraw: d.SYSTEM.isWebGLSupported && this.config.webgl ? 0 : 1
        }));
        var s = new u.Mesh(e, i);
        return s.position.x -= d.SPHERE_RADIUS * t, s.position.y -= d.SPHERE_RADIUS * t, s.position.z -= d.SPHERE_RADIUS * t, s.applyMatrix((new u.Matrix4).makeScale(1, 1, -1)), s
    }, d.prototype._transition = function (i, t) {
        var o, e = this.isExtendedPosition(t),
            s = void 0 !== t.zoom;
        if (this.prop.isCubemap ? (e && (console.warn("PhotoSphereViewer: cannot perform cubemap transition to different position."), e = !1), (o = this._createCubemap(.9)).material.forEach(function (t, e) {
                t.map = i[e], t.transparent = !0, t.opacity = 0
            })) : ((o = this._createSphere(.9)).material.map = i, o.material.transparent = !0, o.material.opacity = 0, t.sphere_correction && this._setSphereCorrection(o, t.sphere_correction)), e) {
            this.cleanPosition(t);
            var n = new u.Vector3(0, 1, 0);
            o.rotateOnWorldAxis(n, t.longitude - this.prop.position.longitude);
            var r = new u.Vector3(0, 1, 0).cross(this.camera.getWorldDirection()).normalize();
            o.rotateOnWorldAxis(r, t.latitude - this.prop.position.latitude), (this.config.latitude_range || this.config.longitude_range) && (this.config.longitude_range = this.config.latitude_range = null, console.warn("PhotoSphereViewer: trying to perform transition with longitude_range and/or latitude_range, ranges cleared."))
        }
        return this.scene.add(o), this.needsUpdate(), new M({
            properties: {
                opacity: {
                    start: 0,
                    end: 1
                },
                zoom: s ? {
                    start: this.prop.zoom_lvl,
                    end: t.zoom
                } : void 0
            },
            duration: this.config.transition.duration,
            easing: "outCubic",
            onTick: function (t) {
                if (this.prop.isCubemap)
                    for (var e = 0; e < 6; e++) o.material[e].opacity = t.opacity;
                else o.material.opacity = t.opacity;
                s && this.zoom(t.zoom), this.needsUpdate()
            }.bind(this)
        }).then(function () {
            this._setTexture(i), this.scene.remove(o), o.geometry.dispose(), o.geometry = null, e && this.rotate(t), t.sphere_correction ? this._setSphereCorrection(this.mesh, t.sphere_correction) : this._setSphereCorrection(this.mesh, {})
        }.bind(this))
    }, d.prototype._reverseAutorotate = function () {
        var e = this,
            t = -this.config.anim_speed,
            i = this.config.longitude_range;
        this.config.longitude_range = null, new M({
            properties: {
                speed: {
                    start: this.config.anim_speed,
                    end: 0
                }
            },
            duration: 300,
            easing: "inSine",
            onTick: function (t) {
                e.config.anim_speed = t.speed
            }
        }).then(function () {
            return new M({
                properties: {
                    speed: {
                        start: 0,
                        end: t
                    }
                },
                duration: 300,
                easing: "outSine",
                onTick: function (t) {
                    e.config.anim_speed = t.speed
                }
            })
        }).then(function () {
            e.config.longitude_range = i, e.config.anim_speed = t
        })
    }, d.prototype._putPanoramaCache = function (t) {
        if (!this.config.cache_texture) throw new x("Cannot add panorama to cache, cache_texture is disabled");
        var e = this.getPanoramaCache(t.panorama);
        e ? (e.image = t.image, e.pano_data = t.pano_data) : (this.prop.cache = this.prop.cache.slice(0, this.config.cache_texture - 1), this.prop.cache.unshift(t)), this.trigger("panorama-cached", t.panorama)
    }, d.prototype._stopAll = function () {
        this.stopAutorotate(), this.stopAnimation(), this.stopGyroscopeControl(), this.stopStereoView()
    }, d.MOVE_THRESHOLD = 4, d.ANGLE_THRESHOLD = .003, d.DBLCLICK_DELAY = 300, d.INERTIA_WINDOW = 300, d.SPHERE_RADIUS = 100, d.SPHERE_VERTICES = 64, d.CUBE_VERTICES = 8, d.CUBE_MAP = [0, 2, 4, 5, 3, 1], d.CUBE_HASHMAP = ["left", "right", "top", "bottom", "back", "front"], d.SYSTEM = {
        loaded: !1,
        pixelRatio: 1,
        isWebGLSupported: !1,
        isCanvasSupported: !1,
        deviceOrientationSupported: null,
        maxTextureWidth: 0,
        mouseWheelEvent: null,
        fullscreenEvent: null
    }, d.ICONS = {}, d.DEFAULTS = {
        panorama: null,
        container: null,
        caption: null,
        usexmpdata: !0,
        pano_data: null,
        webgl: !0,
        min_fov: 30,
        max_fov: 90,
        default_fov: null,
        default_long: 0,
        default_lat: 0,
        sphere_correction: {
            pan: 0,
            tilt: 0,
            roll: 0
        },
        longitude_range: null,
        latitude_range: null,
        move_speed: 1,
        zoom_speed: 2,
        time_anim: 2e3,
        anim_speed: "2rpm",
        anim_lat: null,
        fisheye: !1,
        navbar: ["autorotate", "zoom", "download", "markers", "caption", "gyroscope", "stereo", "fullscreen"],
        tooltip: {
            offset: 5,
            arrow_size: 7,
            delay: 100
        },
        lang: {
            autorotate: "Automatic rotation",
            zoom: "Zoom",
            zoomOut: "Zoom out",
            zoomIn: "Zoom in",
            download: "Download",
            fullscreen: "Fullscreen",
            markers: "Markers",
            gyroscope: "Gyroscope",
            stereo: "Stereo view",
            stereo_notification: "Click anywhere to exit stereo view.",
            please_rotate: ["Please rotate your device", "(or tap to continue)"],
            two_fingers: ["Use two fingers to navigate"]
        },
        mousewheel: !0,
        mousewheel_factor: 1,
        mousemove: !0,
        mousemove_hover: !1,
        touchmove_two_fingers: !1,
        keyboard: {
            ArrowUp: "rotateLatitudeUp",
            ArrowDown: "rotateLatitudeDown",
            ArrowRight: "rotateLongitudeRight",
            ArrowLeft: "rotateLongitudeLeft",
            PageUp: "zoomIn",
            PageDown: "zoomOut",
            "+": "zoomIn",
            "-": "zoomOut",
            " ": "toggleAutorotate"
        },
        move_inertia: !0,
        click_event_on_marker: !1,
        transition: {
            duration: 1500,
            loader: !0
        },
        loading_img: null,
        loading_txt: "Loading...",
        size: null,
        cache_texture: 0,
        templates: {},
        markers: [],
        with_credentials: !1
    }, d.TEMPLATES = {
        markersList: '<div class="psv-markers-list-container">   <h1 class="psv-markers-list-title">{{= it.config.lang.markers }}</h1>   <ul class="psv-markers-list">   {{~ it.markers: marker }}     <li data-psv-marker="{{= marker.id }}" class="psv-markers-list-item {{? marker.className }}{{= marker.className }}{{?}}">       {{? marker.image }}<img class="psv-markers-list-image" src="{{= marker.image }}"/>{{?}}       <p class="psv-markers-list-name">{{? marker.tooltip }}{{= marker.tooltip.content }}{{?? marker.html }}{{= marker.html }}{{??}}{{= marker.id }}{{?}}</p>     </li>   {{~}}   </ul> </div>'
    }, d.prototype._bindEvents = function () {
        window.addEventListener("resize", this), this.config.mousemove && (this.hud.container.style.cursor = "move", this.config.mousemove_hover ? (this.hud.container.addEventListener("mouseenter", this), this.hud.container.addEventListener("mouseleave", this)) : (this.hud.container.addEventListener("mousedown", this), window.addEventListener("mouseup", this)), this.hud.container.addEventListener("touchstart", this), window.addEventListener("touchend", this), this.hud.container.addEventListener("mousemove", this), this.hud.container.addEventListener("touchmove", this)), d.SYSTEM.fullscreenEvent && document.addEventListener(d.SYSTEM.fullscreenEvent, this), this.config.mousewheel && this.hud.container.addEventListener(d.SYSTEM.mouseWheelEvent, this), this.on("_side-reached", function (t) {
            this.isAutorotateEnabled() && ("left" !== t && "right" !== t || this._reverseAutorotate())
        })
    }, d.prototype._unbindEvents = function () {
        window.removeEventListener("resize", this), this.config.mousemove && (this.hud.container.removeEventListener("mousedown", this), this.hud.container.removeEventListener("mouseenter", this), this.hud.container.removeEventListener("touchstart", this), window.removeEventListener("mouseup", this), window.removeEventListener("touchend", this), this.hud.container.removeEventListener("mouseleave", this), this.hud.container.removeEventListener("mousemove", this), this.hud.container.removeEventListener("touchmove", this)), d.SYSTEM.fullscreenEvent && document.removeEventListener(d.SYSTEM.fullscreenEvent, this), this.config.mousewheel && this.hud.container.removeEventListener(d.SYSTEM.mouseWheelEvent, this), this.off("_side-reached")
    }, d.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "resize":
                k.throttle(this._onResize(), 50);
                break;
            case "keydown":
                this._onKeyDown(t);
                break;
            case "mousedown":
            case "mouseenter":
                this._onMouseDown(t);
                break;
            case "touchstart":
                this._onTouchStart(t);
                break;
            case "mouseup":
            case "mouseleave":
                this._onMouseUp(t);
                break;
            case "touchend":
                this._onTouchEnd(t);
                break;
            case "mousemove":
                this._onMouseMove(t);
                break;
            case "touchmove":
                this._onTouchMove(t);
                break;
            case d.SYSTEM.fullscreenEvent:
                this._fullscreenToggled();
                break;
            case d.SYSTEM.mouseWheelEvent:
                this._onMouseWheel(t)
        }
    }, d.prototype._onResize = function () {
        this.container.clientWidth === this.prop.size.width && this.container.clientHeight === this.prop.size.height || (this.prop.size.width = parseInt(this.container.clientWidth), this.prop.size.height = parseInt(this.container.clientHeight), this.prop.aspect = this.prop.size.width / this.prop.size.height, this.needsUpdate(), this.renderer && (this.stereoEffect || this.renderer).setSize(this.prop.size.width, this.prop.size.height), this.trigger("size-updated", this.getSize()))
    }, d.prototype._onKeyDown = function (t) {
        var e = 0,
            i = 0,
            o = 0,
            s = k.getEventKey(t);
        switch (this.config.keyboard[s]) {
            case "rotateLatitudeUp":
                i = .01;
                break;
            case "rotateLatitudeDown":
                i = -.01;
                break;
            case "rotateLongitudeRight":
                e = .01;
                break;
            case "rotateLongitudeLeft":
                e = -.01;
                break;
            case "zoomIn":
                o = 1;
                break;
            case "zoomOut":
                o = -1;
                break;
            case "toggleAutorotate":
                this.toggleAutorotate()
        }
        0 !== o ? this.zoom(this.prop.zoom_lvl + o * this.config.zoom_speed) : 0 === i && 0 === e || this.rotate({
            longitude: this.prop.position.longitude + e * this.prop.move_speed * this.prop.hFov,
            latitude: this.prop.position.latitude + i * this.prop.move_speed * this.prop.vFov
        })
    }, d.prototype._onMouseDown = function (t) {
        this._startMove(t)
    }, d.prototype._onMouseUp = function (t) {
        this._stopMove(t), this.isStereoEnabled() && this.stopStereoView()
    }, d.prototype._onMouseMove = function (t) {
        0 !== t.buttons ? (t.preventDefault(), this._move(t)) : this.config.mousemove_hover && this._moveAbsolute(t)
    }, d.prototype._onTouchStart = function (t) {
        1 === t.touches.length ? this.config.touchmove_two_fingers || this._startMove(t.touches[0]) : 2 === t.touches.length && this._startMoveZoom(t)
    }, d.prototype._onTouchEnd = function (t) {
        1 === t.touches.length ? this._stopMoveZoom() : 0 === t.touches.length && (this._stopMove(t.changedTouches[0]), this.config.touchmove_two_fingers && this.overlay.hideOverlay())
    }, d.prototype._onTouchMove = function (t) {
        1 === t.touches.length ? this.config.touchmove_two_fingers ? this.overlay.showOverlay({
            image: d.ICONS["gesture.svg"],
            text: this.config.lang.two_fingers[0]
        }) : (t.preventDefault(), this._move(t.touches[0])) : 2 === t.touches.length && (t.preventDefault(), this._moveZoom(t))
    }, d.prototype._startMove = function (t) {
        this.stopAutorotate(), this.stopAnimation().then(function () {
            this.prop.mouse_x = this.prop.start_mouse_x = parseInt(t.clientX), this.prop.mouse_y = this.prop.start_mouse_y = parseInt(t.clientY), this.prop.moving = !0, this.prop.zooming = !1, this.prop.mouse_history.length = 0, this._logMouseMove(t)
        }.bind(this))
    }, d.prototype._startMoveZoom = function (t) {
        var e = [{
            x: parseInt(t.touches[0].clientX),
            y: parseInt(t.touches[0].clientY)
        }, {
            x: parseInt(t.touches[1].clientX),
            y: parseInt(t.touches[1].clientY)
        }];
        this.prop.pinch_dist = Math.sqrt(Math.pow(e[0].x - e[1].x, 2) + Math.pow(e[0].y - e[1].y, 2)), this.prop.mouse_x = this.prop.start_mouse_x = (e[0].x + e[1].x) / 2, this.prop.mouse_y = this.prop.start_mouse_x = (e[0].y + e[1].y) / 2, this.prop.moving = !0, this.prop.zooming = !0
    }, d.prototype._stopMove = function (t) {
        k.getClosest(t.target, ".psv-hud") && this.prop.moving && (Math.abs(t.clientX - this.prop.start_mouse_x) < d.MOVE_THRESHOLD && Math.abs(t.clientY - this.prop.start_mouse_y) < d.MOVE_THRESHOLD ? (this._click(t), this.prop.moving = !1) : this.config.move_inertia && !this.isGyroscopeEnabled() ? (this._logMouseMove(t), this._stopMoveInertia(t)) : this.prop.moving = !1, this.prop.mouse_history.length = 0)
    }, d.prototype._stopMoveZoom = function () {
        this.prop.mouse_history.length = 0, this.prop.moving = !1, this.prop.zooming = !1
    }, d.prototype._stopMoveInertia = function (t) {
        var e = t.clientX - this.prop.mouse_history[0][1],
            i = t.clientY - this.prop.mouse_history[0][2],
            o = Math.sqrt(e * e + i * i);
        this.prop.animation_promise = new M({
            properties: {
                clientX: {
                    start: t.clientX,
                    end: t.clientX + e
                },
                clientY: {
                    start: t.clientY,
                    end: t.clientY + i
                }
            },
            duration: o * d.INERTIA_WINDOW / 100,
            easing: "outCirc",
            onTick: function (t) {
                this._move(t, !1)
            }.bind(this)
        }).finally(function () {
            this.prop.moving = !1
        }.bind(this))
    }, d.prototype._click = function (t) {
        var e = this.container.getBoundingClientRect(),
            i = {
                target: t.target,
                client_x: t.clientX,
                client_y: t.clientY,
                viewer_x: parseInt(t.clientX - e.left),
                viewer_y: parseInt(t.clientY - e.top)
            },
            o = this.viewerCoordsToVector3({
                x: i.viewer_x,
                y: i.viewer_y
            });
        if (o) {
            var s = this.vector3ToSphericalCoords(o);
            if (i.longitude = s.longitude, i.latitude = s.latitude, !this.prop.isCubemap) {
                var n = this.sphericalCoordsToTextureCoords({
                    longitude: i.longitude,
                    latitude: i.latitude
                });
                i.texture_x = n.x, i.texture_y = n.y
            }
            this.prop.dblclick_timeout ? (Math.abs(this.prop.dblclick_data.client_x - i.client_x) < d.MOVE_THRESHOLD && Math.abs(this.prop.dblclick_data.client_y - i.client_y) < d.MOVE_THRESHOLD && this.trigger("dblclick", this.prop.dblclick_data), clearTimeout(this.prop.dblclick_timeout), this.prop.dblclick_timeout = null, this.prop.dblclick_data = null) : (this.trigger("click", i), this.prop.dblclick_data = k.clone(i), this.prop.dblclick_timeout = setTimeout(function () {
                this.prop.dblclick_timeout = null, this.prop.dblclick_data = null
            }.bind(this), d.DBLCLICK_DELAY))
        }
    }, d.prototype._move = function (t, e) {
        if (this.prop.moving) {
            var i = parseInt(t.clientX),
                o = parseInt(t.clientY),
                s = (i - this.prop.mouse_x) / this.prop.size.width * this.prop.move_speed * this.prop.hFov * d.SYSTEM.pixelRatio,
                n = (o - this.prop.mouse_y) / this.prop.size.height * this.prop.move_speed * this.prop.vFov * d.SYSTEM.pixelRatio;
            this.isGyroscopeEnabled() ? this.prop.gyro_alpha_offset += s : this.rotate({
                longitude: this.prop.position.longitude - s,
                latitude: this.prop.position.latitude + n
            }), this.prop.mouse_x = i, this.prop.mouse_y = o, !1 !== e && this._logMouseMove(t)
        }
    }, d.prototype._moveAbsolute = function (t) {
        this.prop.moving && this.rotate({
            longitude: ((t.clientX - this.container.offsetLeft) / this.container.offsetWidth - .5) * k.TwoPI,
            latitude: -((t.clientY - this.container.offsetTop) / this.container.offsetHeight - .5) * Math.PI
        })
    }, d.prototype._moveZoom = function (t) {
        if (this.prop.zooming && this.prop.moving) {
            var e = [{
                    x: parseInt(t.touches[0].clientX),
                    y: parseInt(t.touches[0].clientY)
                }, {
                    x: parseInt(t.touches[1].clientX),
                    y: parseInt(t.touches[1].clientY)
                }],
                i = Math.sqrt(Math.pow(e[0].x - e[1].x, 2) + Math.pow(e[0].y - e[1].y, 2)),
                o = 80 * (i - this.prop.pinch_dist) / this.prop.size.width;
            this.zoom(this.prop.zoom_lvl + o), this._move({
                clientX: (e[0].x + e[1].x) / 2,
                clientY: (e[0].y + e[1].y) / 2
            }), this.prop.pinch_dist = i
        }
    }, d.prototype._onMouseWheel = function (t) {
        t.preventDefault(), t.stopPropagation();
        var e = 5 * k.normalizeWheel(t).spinY;
        0 !== e && this.zoom(this.prop.zoom_lvl - e * this.config.mousewheel_factor)
    }, d.prototype._fullscreenToggled = function () {
        var t = this.isFullscreenEnabled();
        this.config.keyboard && (t ? this.startKeyboardControl() : this.stopKeyboardControl()), this.trigger("fullscreen-updated", t)
    }, d.prototype._logMouseMove = function (t) {
        var e = Date.now();
        this.prop.mouse_history.push([e, t.clientX, t.clientY]);
        for (var i = null, o = 0; o < this.prop.mouse_history.length;) this.prop.mouse_history[0][o] < e - d.INERTIA_WINDOW ? this.prop.mouse_history.splice(o, 1) : i = (i && this.prop.mouse_history[0][o] - i > d.INERTIA_WINDOW / 10 ? (this.prop.mouse_history.splice(0, o), o = 0) : o++, this.prop.mouse_history[0][o])
    }, d.prototype.load = function () {
        if (!this.config.panorama) throw new x("No value given for panorama.");
        return this.setPanorama(this.config.panorama, !1)
    }, d.prototype.getPosition = function () {
        return {
            longitude: this.prop.position.longitude,
            latitude: this.prop.position.latitude
        }
    }, d.prototype.getZoomLevel = function () {
        return this.prop.zoom_lvl
    }, d.prototype.getSize = function () {
        return {
            width: this.prop.size.width,
            height: this.prop.size.height
        }
    }, d.prototype.isAutorotateEnabled = function () {
        return !!this.prop.autorotate_cb
    }, d.prototype.isGyroscopeEnabled = function () {
        return !!this.prop.orientation_cb
    }, d.prototype.isStereoEnabled = function () {
        return !!this.stereoEffect
    }, d.prototype.isFullscreenEnabled = function () {
        return k.isFullscreenEnabled(this.container)
    }, d.prototype.needsUpdate = function () {
        this.prop.needsUpdate = !0
    }, d.prototype.render = function () {
        this._render()
    }, d.prototype.destroy = function () {
        window.cancelAnimationFrame(this.prop.main_reqid), this._stopAll(), this.stopKeyboardControl(), this.stopNoSleep(), this.exitFullscreen(), this.unlockOrientation(), this._unbindEvents(), this.tooltip && this.tooltip.destroy(), this.notification && this.notification.destroy(), this.hud && this.hud.destroy(), this.loader && this.loader.destroy(), this.navbar && this.navbar.destroy(), this.panel && this.panel.destroy(), this.overlay && this.overlay.destroy(), this.scene && k.cleanTHREEScene(this.scene), this.canvas_container && this.container.removeChild(this.canvas_container), this.parent.removeChild(this.container), delete this.parent.photoSphereViewer, delete this.parent, delete this.container, delete this.loader, delete this.navbar, delete this.hud, delete this.panel, delete this.tooltip, delete this.notification, delete this.overlay, delete this.canvas_container, delete this.renderer, delete this.noSleep, delete this.scene, delete this.camera, delete this.mesh, delete this.raycaster, delete this.passes, delete this.config, this.prop.cache.length = 0
    }, d.prototype.setPanorama = function (t, e, i) {
        if (null !== this.prop.loading_promise) throw new x("Loading already in progress");
        "boolean" == typeof e && (i = e, e = void 0), e || this.scene ? e || (e = {}) : e = {
            longitude: this.config.default_long,
            latitude: this.config.default_lat,
            zoom: this.config.default_zoom_lvl,
            sphere_correction: this.config.sphere_correction
        };
        var o = this.isExtendedPosition(e),
            s = "zoom" in e;
        (o || s) && this._stopAll(), this.config.panorama = t;
        var n = function () {
            this.loader.hide(), this.canvas_container.style.opacity = 1, this.prop.loading_promise = null
        }.bind(this);
        return i && this.config.transition && this.scene ? (this.config.transition.loader && this.loader.show(), this.prop.loading_promise = this._loadTexture(this.config.panorama).then(function (t) {
            return this.loader.hide(), this._transition(t, e)
        }.bind(this)).then(n, n)) : (this.loader.show(), this.canvas_container && (this.canvas_container.style.opacity = 0), this.prop.loading_promise = this._loadTexture(this.config.panorama).then(function (t) {
            this._setTexture(t), e.sphere_correction && !this.prop.isCubemap && this._setSphereCorrection(this.mesh, e.sphere_correction), o && this.rotate(e), s && this.zoom(e.zoom)
        }.bind(this)).then(n, n)), this.prop.loading_promise
    }, d.prototype.startAutorotate = function () {
        this._stopAll(), this.prop.autorotate_cb = this._getAutorotateUpdate(), this.on("before-render", this.prop.autorotate_cb), this.trigger("autorotate", !0)
    }, d.prototype._getAutorotateUpdate = function () {
        var e, i;
        return function (t) {
            i = void 0 === e ? 0 : t - e, e = t, this.rotate({
                longitude: this.prop.position.longitude + this.config.anim_speed * i / 1e3,
                latitude: this.prop.position.latitude - (this.prop.position.latitude - this.config.anim_lat) / 200
            })
        }
    }, d.prototype.stopAutorotate = function () {
        this.prop.start_timeout && (window.clearTimeout(this.prop.start_timeout), this.prop.start_timeout = null), this.isAutorotateEnabled() && (this.off("before-render", this.prop.autorotate_cb), this.prop.autorotate_cb = null, this.trigger("autorotate", !1))
    }, d.prototype.toggleAutorotate = function () {
        this.isAutorotateEnabled() ? this.stopAutorotate() : this.startAutorotate()
    }, d.prototype.startGyroscopeControl = function () {
        if (k.checkTHREE("DeviceOrientationControls")) return d.SYSTEM.deviceOrientationSupported.then(function (t) {
            if (!t) return console.warn("PhotoSphereViewer: gyroscope not available"), Promise.reject();
            this._stopAll(), this.doControls = new u.DeviceOrientationControls(this.camera), this.doControls.alphaOffset = this.prop.position.longitude, this.doControls.update();
            var e = this.camera.getWorldDirection(new u.Vector3),
                i = this.vector3ToSphericalCoords(e);
            this.prop.gyro_alpha_offset = i.longitude, this.prop.orientation_cb = this._getOrientationUpdate(), this.on("before-render", this.prop.orientation_cb), this.trigger("gyroscope-updated", !0)
        }.bind(this));
        throw new x("Missing Three.js components: DeviceOrientationControls. Get them from three.js-examples package.")
    }, d.prototype._getOrientationUpdate = function () {
        return function () {
            this.doControls.alphaOffset = this.prop.gyro_alpha_offset, this.doControls.update(), this.camera.getWorldDirection(this.prop.direction), this.prop.direction.multiplyScalar(d.SPHERE_RADIUS);
            var t = this.vector3ToSphericalCoords(this.prop.direction);
            this.prop.position.longitude = t.longitude, this.prop.position.latitude = t.latitude, this.needsUpdate()
        }
    }, d.prototype.stopGyroscopeControl = function () {
        this.isGyroscopeEnabled() && (this.off("before-render", this.prop.orientation_cb), this.prop.orientation_cb = null, this.doControls.disconnect(), this.doControls = null, this.trigger("gyroscope-updated", !1))
    }, d.prototype.toggleGyroscopeControl = function () {
        this.isGyroscopeEnabled() ? this.stopGyroscopeControl() : this.startGyroscopeControl()
    }, d.prototype.startNoSleep = function () {
        "NoSleep" in window ? (this.noSleep || (this.noSleep = new NoSleep), this.noSleep.enable()) : console.warn("PhotoSphereViewer: NoSleep is not available")
    }, d.prototype.stopNoSleep = function () {
        this.noSleep && this.noSleep.disable()
    }, d.prototype.startStereoView = function () {
        if (!k.checkTHREE("DeviceOrientationControls", "StereoEffect")) throw new x("Missing Three.js components: StereoEffect, DeviceOrientationControls. Get them from three.js-examples package.");
        this.startNoSleep(), this.enterFullscreen(), this.lockOrientation(), this.startGyroscopeControl().then(function () {
            this.stereoEffect = new u.StereoEffect(this.renderer), this.needsUpdate(), this.hud.hide(), this.navbar.hide(), this.panel.hidePanel(), this.trigger("stereo-updated", !0), this.notification.showNotification({
                content: this.config.lang.stereo_notification,
                timeout: 3e3
            })
        }.bind(this), function () {
            this.unlockOrientation(), this.exitFullscreen(), this.stopNoSleep()
        }.bind(this))
    }, d.prototype.stopStereoView = function () {
        this.isStereoEnabled() && (this.stereoEffect = null, this.needsUpdate(), this.hud.show(), this.navbar.show(), this.unlockOrientation(), this.exitFullscreen(), this.stopNoSleep(), this.stopGyroscopeControl(), this.trigger("stereo-updated", !1))
    }, d.prototype.lockOrientation = function () {
        var t, e = function () {
            this.isStereoEnabled() && window.innerHeight > window.innerWidth && this.overlay.showOverlay({
                image: d.ICONS["mobile-rotate.svg"],
                text: this.config.lang.please_rotate[0],
                subtext: this.config.lang.please_rotate[1]
            }), t && window.clearTimeout(t)
        };
        window.screen && window.screen.orientation ? (window.screen.orientation.lock("landscape").then(null, e.bind(this)), t = setTimeout(e.bind(this), 500)) : e.apply(this)
    }, d.prototype.unlockOrientation = function () {
        window.screen && window.screen.orientation ? window.screen.orientation.unlock() : this.overlay.hideOverlay()
    }, d.prototype.toggleStereoView = function () {
        this.isStereoEnabled() ? this.stopStereoView() : this.startStereoView()
    }, d.prototype.rotate = function (t, e) {
        this.cleanPosition(t), e || this.applyRanges(t).forEach(this.trigger.bind(this, "_side-reached")), this.prop.position.longitude = t.longitude, this.prop.position.latitude = t.latitude, this.needsUpdate(), this.trigger("position-updated", this.getPosition())
    }, d.prototype.animate = function (t, e) {
        this._stopAll();
        var i, o = this.isExtendedPosition(t),
            s = "zoom" in t,
            n = {};
        if (o) {
            this.cleanPosition(t), this.applyRanges(t);
            var r = this.prop.position,
                a = Math.abs(t.longitude - r.longitude),
                h = Math.abs(t.latitude - r.latitude);
            if (d.ANGLE_THRESHOLD <= a || d.ANGLE_THRESHOLD <= h) {
                var p = k.getShortestArc(this.prop.position.longitude, t.longitude);
                n.longitude = {
                    start: r.longitude,
                    end: r.longitude + p
                }, n.latitude = {
                    start: r.latitude,
                    end: t.latitude
                }, i = this.speedToDuration(e, k.getAngle(r, t))
            }
        }
        if (s) {
            var c = Math.abs(t.zoom - this.prop.zoom_lvl);
            1 <= c && (n.zoom = {
                start: this.prop.zoom_lvl,
                end: t.zoom
            }, i || (i = this.speedToDuration(e, Math.PI / 4 * c / 100)))
        }
        return i ? (this.prop.animation_promise = new M({
            properties: n,
            duration: i,
            easing: "inOutSine",
            onTick: function (t) {
                o && this.rotate(t, !0), s && this.zoom(t.zoom)
            }.bind(this)
        }), this.prop.animation_promise) : (o && this.rotate(t), s && this.zoom(t.zoom), M.resolve())
    }, d.prototype.stopAnimation = function () {
        return this.prop.animation_promise ? new Promise(function (t) {
            this.prop.animation_promise.finally(t), this.prop.animation_promise.cancel(), this.prop.animation_promise = null
        }.bind(this)) : Promise.resolve()
    }, d.prototype.zoom = function (t) {
        this.prop.zoom_lvl = k.bound(t, 0, 100), this.prop.vFov = this.config.max_fov + this.prop.zoom_lvl / 100 * (this.config.min_fov - this.config.max_fov), this.prop.hFov = u.Math.radToDeg(2 * Math.atan(Math.tan(u.Math.degToRad(this.prop.vFov) / 2) * this.prop.aspect)), this.needsUpdate(), this.trigger("zoom-updated", this.getZoomLevel())
    }, d.prototype.zoomIn = function () {
        this.prop.zoom_lvl < 100 && this.zoom(this.prop.zoom_lvl + this.config.zoom_speed)
    }, d.prototype.zoomOut = function () {
        0 < this.prop.zoom_lvl && this.zoom(this.prop.zoom_lvl - this.config.zoom_speed)
    }, d.prototype.resize = function (t) {
        t.width && (this.container.style.width = t.width), t.height && (this.container.style.height = t.height), this._onResize()
    }, d.prototype.enterFullscreen = function () {
        k.requestFullscreen(this.container)
    }, d.prototype.exitFullscreen = function () {
        this.isFullscreenEnabled() && k.exitFullscreen()
    }, d.prototype.toggleFullscreen = function () {
        this.isFullscreenEnabled() ? this.exitFullscreen() : this.enterFullscreen()
    }, d.prototype.startKeyboardControl = function () {
        window.addEventListener("keydown", this)
    }, d.prototype.stopKeyboardControl = function () {
        window.removeEventListener("keydown", this)
    }, d.prototype.preloadPanorama = function (t) {
        if (!this.config.cache_texture) throw new x("Cannot preload panorama, cache_texture is disabled");
        return this._loadTexture(t)
    }, d.prototype.clearPanoramaCache = function (t) {
        if (!this.config.cache_texture) throw new x("Cannot clear cache, cache_texture is disabled");
        if (t) {
            for (var e = 0, i = this.prop.cache.length; e < i; e++)
                if (this.prop.cache[e].panorama === t) {
                    this.prop.cache.splice(e, 1);
                    break
                }
        } else this.prop.cache.length = 0
    }, d.prototype.getPanoramaCache = function (e) {
        if (!this.config.cache_texture) throw new x("Cannot query cache, cache_texture is disabled");
        return this.prop.cache.filter(function (t) {
            return t.panorama === e
        }).shift()
    }, d._loadSystem = function () {
        var t = d.SYSTEM;
        t.loaded = !0, t.pixelRatio = window.devicePixelRatio || 1, t.isWebGLSupported = k.isWebGLSupported(), t.isCanvasSupported = k.isCanvasSupported(), t.maxTextureWidth = t.isWebGLSupported ? k.getMaxTextureWidth() : 4096, t.mouseWheelEvent = k.mouseWheelEvent(), t.fullscreenEvent = k.fullscreenEvent(), t.deviceOrientationSupported = k.isDeviceOrientationSupported(), t.touchEnabled = k.isTouchEnabled()
    }, d.prototype._setViewerSize = function (e) {
        ["width", "height"].forEach(function (t) {
            e[t] && (/^[0-9.]+$/.test(e[t]) && (e[t] += "px"), this.parent.style[t] = e[t])
        }, this)
    }, d.prototype.speedToDuration = function (t, e) {
        if (t && "number" == typeof t) return Math.abs(t);
        var i = t ? k.parseSpeed(t) : this.config.anim_speed;
        return e / Math.abs(i) * 1e3
    }, d.prototype.textureCoordsToSphericalCoords = function (t) {
        if (this.prop.isCubemap) throw new x("Unable to use texture coords with cubemap.");
        var e = (t.x + this.prop.pano_data.cropped_x) / this.prop.pano_data.full_width * k.TwoPI,
            i = (t.y + this.prop.pano_data.cropped_y) / this.prop.pano_data.full_height * Math.PI;
        return {
            longitude: e >= Math.PI ? e - Math.PI : e + Math.PI,
            latitude: k.HalfPI - i
        }
    }, d.prototype.sphericalCoordsToTextureCoords = function (t) {
        if (this.prop.isCubemap) throw new x("Unable to use texture coords with cubemap.");
        var e = t.longitude / k.TwoPI * this.prop.pano_data.full_width,
            i = t.latitude / Math.PI * this.prop.pano_data.full_height;
        return {
            x: parseInt(t.longitude < Math.PI ? e + this.prop.pano_data.full_width / 2 : e - this.prop.pano_data.full_width / 2) - this.prop.pano_data.cropped_x,
            y: parseInt(this.prop.pano_data.full_height / 2 - i) - this.prop.pano_data.cropped_y
        }
    }, d.prototype.sphericalCoordsToVector3 = function (t) {
        return new u.Vector3(d.SPHERE_RADIUS * -Math.cos(t.latitude) * Math.sin(t.longitude), d.SPHERE_RADIUS * Math.sin(t.latitude), d.SPHERE_RADIUS * Math.cos(t.latitude) * Math.cos(t.longitude))
    }, d.prototype.vector3ToSphericalCoords = function (t) {
        var e = Math.acos(t.y / Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z)),
            i = Math.atan2(t.x, t.z);
        return {
            longitude: i < 0 ? -i : k.TwoPI - i,
            latitude: k.HalfPI - e
        }
    }, d.prototype.viewerCoordsToVector3 = function (t) {
        var e = new u.Vector2(2 * t.x / this.prop.size.width - 1, -2 * t.y / this.prop.size.height + 1);
        this.raycaster.setFromCamera(e, this.camera);
        var i = this.raycaster.intersectObjects(this.scene.children);
        return 1 === i.length ? i[0].point : null
    }, d.prototype.vector3ToViewerCoords = function (t) {
        return (t = t.clone()).project(this.camera), {
            x: parseInt((t.x + 1) / 2 * this.prop.size.width),
            y: parseInt((1 - t.y) / 2 * this.prop.size.height)
        }
    }, d.prototype.cleanPosition = function (t) {
        t.hasOwnProperty("x") && t.hasOwnProperty("y") && k.deepmerge(t, this.textureCoordsToSphericalCoords(t)), t.longitude = k.parseAngle(t.longitude), t.latitude = k.parseAngle(t.latitude, !0)
    }, d.prototype.cleanSphereCorrection = function (t) {
        t.pan = k.parseAngle(t.pan || 0), t.tilt = k.parseAngle(t.tilt || 0, !0), t.roll = k.parseAngle(t.roll || 0, !0, !1)
    }, d.prototype.isExtendedPosition = function (e) {
        return [
            ["x", "y"],
            ["longitude", "latitude"]
        ].some(function (t) {
            return t[0] in e && t[1] in e
        })
    }, d.prototype.applyRanges = function (t) {
        var e, i, o = [];
        return this.config.longitude_range && (e = k.clone(this.config.longitude_range), i = u.Math.degToRad(this.prop.hFov) / 2, e[0] = k.parseAngle(e[0] + i), e[1] = k.parseAngle(e[1] - i), e[0] > e[1] ? t.longitude > e[1] && t.longitude < e[0] && (t.longitude > e[0] / 2 + e[1] / 2 ? (t.longitude = e[0], o.push("left")) : (t.longitude = e[1], o.push("right"))) : t.longitude < e[0] ? (t.longitude = e[0], o.push("left")) : t.longitude > e[1] && (t.longitude = e[1], o.push("right"))), this.config.latitude_range && (e = k.clone(this.config.latitude_range), i = u.Math.degToRad(this.prop.vFov) / 2, e[0] = k.parseAngle(Math.min(e[0] + i, e[1]), !0), e[1] = k.parseAngle(Math.max(e[1] - i, e[0]), !0), t.latitude < e[0] ? (t.latitude = e[0], o.push("bottom")) : t.latitude > e[1] && (t.latitude = e[1], o.push("top"))), o
    }, s.className = null, s.publicMethods = [], s.prototype.create = function () {
        this.container = document.createElement("div"), this.constructor.className && (this.container.className = this.constructor.className), this.parent.container.appendChild(this.container)
    }, s.prototype.destroy = function () {
        this.parent.container.removeChild(this.container), this.constructor.publicMethods && this.constructor.publicMethods.forEach(function (t) {
            delete this.psv[t]
        }, this), delete this.container, delete this.psv, delete this.parent
    }, s.prototype.hide = function () {
        this.container.style.display = "none", this.visible = !1
    }, s.prototype.show = function () {
        this.container.style.display = "", this.visible = !0
    }, ((n.prototype = Object.create(s.prototype)).constructor = n).className = "psv-hud", n.publicMethods = ["addMarker", "removeMarker", "updateMarker", "clearMarkers", "getMarker", "getCurrentMarker", "gotoMarker", "hideMarker", "showMarker", "toggleMarker", "toggleMarkersList", "showMarkersList", "hideMarkersList"], n.prototype.create = function () {
        s.prototype.create.call(this), this.svgContainer = document.createElementNS(k.svgNS, "svg"), this.svgContainer.setAttribute("class", "psv-hud-svg-container"), this.container.appendChild(this.svgContainer), this.container.addEventListener("mouseenter", this, !0), this.container.addEventListener("mouseleave", this, !0), this.container.addEventListener("mousemove", this, !0), this.psv.on("click", this), this.psv.on("dblclick", this), this.psv.on("render", this), this.psv.on("open-panel", this), this.psv.on("close-panel", this)
    }, n.prototype.destroy = function () {
        this.clearMarkers(!1), this.container.removeEventListener("mouseenter", this), this.container.removeEventListener("mouseleave", this), this.container.removeEventListener("mousemove", this), this.psv.off("click", this), this.psv.off("dblclick", this), this.psv.off("render", this), this.psv.off("open-panel", this), this.psv.off("close-panel", this), delete this.svgContainer, s.prototype.destroy.call(this)
    }, n.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "mouseenter":
                this._onMouseEnter(t);
                break;
            case "mouseleave":
                this._onMouseLeave(t);
                break;
            case "mousemove":
                this._onMouseMove(t);
                break;
            case "click":
                this._onClick(t.args[0], t, !1);
                break;
            case "dblclick":
                this._onClick(t.args[0], t, !0);
                break;
            case "render":
                this.renderMarkers();
                break;
            case "open-panel":
                this._onPanelOpened();
                break;
            case "close-panel":
                this._onPanelClosed()
        }
    }, n.prototype.addMarker = function (t, e) {
        if (!t.id) throw new x("missing marker id");
        if (this.markers[t.id]) throw new x('marker "' + t.id + '" already exists');
        var i = new S(t, this.psv);
        return i.isNormal() ? this.container.appendChild(i.$el) : this.svgContainer.appendChild(i.$el), this.markers[i.id] = i, !1 !== e && this.renderMarkers(), i
    }, n.prototype.getMarker = function (t) {
        var e = "object" == typeof t ? t.id : t;
        if (!this.markers[e]) throw new x('cannot find marker "' + e + '"');
        return this.markers[e]
    }, n.prototype.getCurrentMarker = function () {
        return this.currentMarker
    }, n.prototype.updateMarker = function (t, e) {
        var i = this.getMarker(t);
        return i.update(t), !1 !== e && this.renderMarkers(), i
    }, n.prototype.removeMarker = function (t, e) {
        (t = this.getMarker(t)).isNormal() ? this.container.removeChild(t.$el) : this.svgContainer.removeChild(t.$el), this.hoveringMarker === t && this.psv.tooltip.hideTooltip(), t.destroy(), delete this.markers[t.id], !1 !== e && this.renderMarkers()
    }, n.prototype.clearMarkers = function (t) {
        Object.keys(this.markers).forEach(function (t) {
            this.removeMarker(t, !1)
        }, this), !1 !== t && this.renderMarkers()
    }, n.prototype.gotoMarker = function (t, e) {
        return t = this.getMarker(t), this.psv.animate(t, e).then(function () {
            this.psv.trigger("goto-marker-done", t)
        }.bind(this))
    }, n.prototype.hideMarker = function (t) {
        this.getMarker(t).visible = !1, this.renderMarkers()
    }, n.prototype.showMarker = function (t) {
        this.getMarker(t).visible = !0, this.renderMarkers()
    }, n.prototype.toggleMarker = function (t) {
        this.getMarker(t).visible ^= !0, this.renderMarkers()
    }, n.prototype.toggleMarkersList = function () {
        this.prop.panelOpened ? this.hideMarkersList() : this.showMarkersList()
    }, n.prototype.showMarkersList = function () {
        var e = [];
        k.forEach(this.markers, function (t) {
            e.push(t)
        });
        var t = this.psv.config.templates.markersList({
            markers: this.psv.change("render-markers-list", e),
            config: this.psv.config
        });
        this.prop.panelOpening = !0, this.psv.panel.showPanel(t, !0), this.psv.panel.container.querySelector(".psv-markers-list").addEventListener("click", this._onClickItem.bind(this))
    }, n.prototype.hideMarkersList = function () {
        this.prop.panelOpened && this.psv.panel.hidePanel()
    }, n.prototype.renderMarkers = function () {
        if (this.visible) {
            var r = this.psv.isGyroscopeEnabled() ? u.Math.radToDeg(this.psv.camera.rotation.z) : 0;
            k.forEach(this.markers, function (t) {
                var e = t.visible;
                if (e && t.isPoly()) {
                    var i = this._getPolyPositions(t);
                    if (e = i.length > (t.isPolygon() ? 2 : 1)) {
                        t.position2D = this._getPolyDimensions(t, i);
                        var o = i.map(function (t) {
                            return t.x + "," + t.y
                        }).join(" ");
                        t.$el.setAttributeNS(null, "points", o)
                    }
                } else if (e) {
                    var s = this._getMarkerPosition(t);
                    if (e = this._isMarkerVisible(t, s)) {
                        t.position2D = s;
                        var n = t.getScale(this.psv.getZoomLevel());
                        t.isSvg() ? t.$el.setAttributeNS(null, "transform", "translate(" + s.x + ", " + s.y + ")" + (1 !== n ? " scale(" + n + ", " + n + ")" : "") + (!t.lockRotation && r ? " rotate(" + r + ")" : "")) : t.$el.style.transform = "translate3D(" + s.x + "px, " + s.y + "px, 0px)" + (1 !== n ? " scale(" + n + ", " + n + ")" : "") + (!t.lockRotation && r ? " rotateZ(" + r + "deg)" : "")
                    }
                }
                k.toggleClass(t.$el, "psv-marker--visible", e)
            }.bind(this))
        }
    }, n.prototype._isMarkerVisible = function (t, e) {
        return 0 < t.position3D.dot(this.psv.prop.direction) && 0 <= e.x + t.width && e.x - t.width <= this.psv.prop.size.width && 0 <= e.y + t.height && e.y - t.height <= this.psv.prop.size.height
    }, n.prototype._getMarkerPosition = function (t) {
        if (t._dynamicSize) {
            k.toggleClass(t.$el, "psv-marker--transparent", !0);
            var e = t.$el.style.transform;
            t.$el.style.transform = null;
            var i = t.$el.getBoundingClientRect();
            t.$el.style.transform = e, k.toggleClass(t.$el, "psv-marker--transparent", !1), t.width = i.right - i.left, t.height = i.bottom - i.top
        }
        var o = this.psv.vector3ToViewerCoords(t.position3D);
        return o.x -= t.width * t.anchor.left, o.y -= t.height * t.anchor.top, o
    }, n.prototype._getPolyPositions = function (t) {
        var o = t.positions3D.length,
            s = t.positions3D.map(function (t) {
                return {
                    vector: t,
                    visible: 0 < t.dot(this.psv.prop.direction)
                }
            }, this),
            n = [];
        return s.forEach(function (e, i) {
            e.visible || [0 === i ? s[o - 1] : s[i - 1], i === o - 1 ? s[0] : s[i + 1]].forEach(function (t) {
                t.visible && n.push({
                    visible: t,
                    invisible: e,
                    index: i
                })
            })
        }), n.reverse().forEach(function (t) {
            s.splice(t.index, 0, {
                vector: this._getPolyIntermediaryPoint(t.visible.vector, t.invisible.vector),
                visible: !0
            })
        }, this), s.filter(function (t) {
            return t.visible
        }).map(function (t) {
            return this.psv.vector3ToViewerCoords(t.vector)
        }, this)
    }, n.prototype._getPolyIntermediaryPoint = function (t, e) {
        var i = this.psv.prop.direction.clone().normalize(),
            o = (new u.Vector3).crossVectors(t, e).normalize(),
            s = (new u.Vector3).crossVectors(o, t).normalize(),
            n = (new u.Vector3).addVectors(t.clone().multiplyScalar(-i.dot(s)), s.clone().multiplyScalar(i.dot(t))).normalize(),
            r = (new u.Vector3).crossVectors(n, i);
        return n.applyAxisAngle(r, .01).multiplyScalar(d.SPHERE_RADIUS)
    }, n.prototype._getPolyDimensions = function (t, e) {
        var i = 1 / 0,
            o = 1 / 0,
            s = -1 / 0,
            n = -1 / 0;
        return e.forEach(function (t) {
            i = Math.min(i, t.x), o = Math.min(o, t.y), s = Math.max(s, t.x), n = Math.max(n, t.y)
        }), t.width = s - i, t.height = n - o, {
            x: i,
            y: o
        }
    }, n.prototype._onMouseEnter = function (t) {
        var e;
        t.target && (e = t.target.psvMarker) && !e.isPoly() && (this.hoveringMarker = e, this.psv.trigger("over-marker", e), e.tooltip && this.psv.tooltip.showTooltip({
            content: e.tooltip.content,
            position: e.tooltip.position,
            left: e.position2D.x,
            top: e.position2D.y,
            box: {
                width: e.width,
                height: e.height
            }
        }))
    }, n.prototype._onMouseLeave = function (t) {
        var e;
        if (t.target && (e = t.target.psvMarker)) {
            if (e.isPoly() && t.relatedTarget && k.hasParent(t.relatedTarget, this.psv.tooltip.container)) return;
            this.psv.trigger("leave-marker", e), this.hoveringMarker = null, this.psv.tooltip.hideTooltip()
        }
    }, n.prototype._onMouseMove = function (t) {
        var e;
        if (!this.psv.prop.moving)
            if (t.target && (e = t.target.psvMarker) && e.isPoly() || t.target && k.hasParent(t.target, this.psv.tooltip.container) && (e = this.hoveringMarker)) {
                this.hoveringMarker || (this.psv.trigger("over-marker", e), this.hoveringMarker = e);
                var i = this.psv.container.getBoundingClientRect();
                e.tooltip && this.psv.tooltip.showTooltip({
                    content: e.tooltip.content,
                    position: e.tooltip.position,
                    top: t.clientY - i.top - this.psv.config.tooltip.arrow_size / 2,
                    left: t.clientX - i.left - this.psv.config.tooltip.arrow_size,
                    box: {
                        width: 2 * this.psv.config.tooltip.arrow_size,
                        height: 2 * this.psv.config.tooltip.arrow_size
                    }
                })
            } else this.hoveringMarker && this.hoveringMarker.isPoly() && (this.psv.trigger("leave-marker", this.hoveringMarker), this.hoveringMarker = null, this.psv.tooltip.hideTooltip())
    }, n.prototype._onClick = function (t, e, i) {
        var o;
        t.target && (o = k.getClosest(t.target, ".psv-marker")) && o.psvMarker ? (this.currentMarker = o.psvMarker, this.psv.trigger("select-marker", this.currentMarker, i), this.psv.config.click_event_on_marker ? t.marker = o.psvMarker : e.stopPropagation()) : this.currentMarker && (this.psv.trigger("unselect-marker", this.currentMarker), this.currentMarker = null), o && o.psvMarker && o.psvMarker.content ? this.psv.panel.showPanel(o.psvMarker.content) : this.psv.panel.prop.opened && (e.stopPropagation(), this.psv.panel.hidePanel())
    }, n.prototype._onClickItem = function (t) {
        var e;
        if (t.target && (e = k.getClosest(t.target, "li")) && e.dataset.psvMarker) {
            var i = this.getMarker(e.dataset.psvMarker);
            this.psv.trigger("select-marker-list", i), this.gotoMarker(i, 1e3), this.psv.panel.hidePanel()
        }
    }, n.prototype._onPanelOpened = function () {
        this.prop.panelOpening ? (this.prop.panelOpening = !1, this.prop.panelOpened = !0) : this.prop.panelOpened = !1, this.prop.markersButton && this.prop.markersButton.toggleActive(this.prop.panelOpened)
    }, n.prototype._onPanelClosed = function () {
        this.prop.panelOpened = !1, this.prop.panelOpening = !1, this.prop.markersButton && this.prop.markersButton.toggleActive(!1)
    }, ((r.prototype = Object.create(s.prototype)).constructor = r).className = "psv-loader-container", r.prototype.create = function () {
        s.prototype.create.call(this);
        var t, e = d.SYSTEM.pixelRatio;
        if (this.loader = document.createElement("div"), this.loader.className = "psv-loader", this.container.appendChild(this.loader), this.canvas = document.createElement("canvas"), this.canvas.className = "psv-loader-canvas", this.canvas.width = this.loader.clientWidth * e, this.canvas.height = this.loader.clientWidth * e, this.loader.appendChild(this.canvas), this.tickness = (this.loader.offsetWidth - this.loader.clientWidth) / 2 * e, this.psv.config.loading_img ? ((t = document.createElement("img")).className = "psv-loader-image", t.src = this.psv.config.loading_img) : this.psv.config.loading_txt && ((t = document.createElement("div")).className = "psv-loader-text", t.innerHTML = this.psv.config.loading_txt), t) {
            var i = Math.round(Math.sqrt(2 * Math.pow((this.canvas.width / 2 - this.tickness / 2) / e, 2)));
            t.style.maxWidth = i + "px", t.style.maxHeight = i + "px", this.loader.appendChild(t)
        }
    }, r.prototype.destroy = function () {
        delete this.loader, delete this.canvas, s.prototype.destroy.call(this)
    }, r.prototype.setProgress = function (t) {
        var e = this.canvas.getContext("2d");
        e.clearRect(0, 0, this.canvas.width, this.canvas.height), e.lineWidth = this.tickness, e.strokeStyle = k.getStyle(this.loader, "color"), e.beginPath(), e.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2 - this.tickness / 2, -Math.PI / 2, t / 100 * 2 * Math.PI - Math.PI / 2), e.stroke()
    }, ((a.prototype = Object.create(s.prototype)).constructor = a).className = "psv-navbar psv-navbar--open", a.publicMethods = ["showNavbar", "hideNavbar", "toggleNavbar", "getNavbarButton"], a.prototype.create = function () {
        s.prototype.create.call(this), this.config.forEach(function (t) {
            if ("object" == typeof t) this.items.push(new m(this, t));
            else switch (t) {
                case i.id:
                    this.items.push(new i(this));
                    break;
                case E.id:
                    this.items.push(new E(this));
                    break;
                case v.id:
                    this.items.push(new v(this));
                    break;
                case w.id:
                    this.items.push(new w(this));
                    break;
                case y.id:
                    this.items.push(new y(this));
                    break;
                case b.id:
                    this.items.push(new b(this));
                    break;
                case _.id:
                    this.items.push(new _(this));
                    break;
                case "caption":
                    this.items.push(new e(this, this.psv.config.caption));
                    break;
                default:
                    if (0 !== t.indexOf("spacer")) throw new x("Unknown button " + t);
                    console.warn("PhotoSphereViewer: navbar spacers have been removed.")
            }
        }, this)
    }, a.prototype.destroy = function () {
        this.items.forEach(function (t) {
            t.destroy()
        }), this.items.length = 0, delete this.config, s.prototype.destroy.call(this)
    }, a.prototype.getNavbarButton = function (e, t) {
        var i = null;
        return this.items.some(function (t) {
            return t.id === e && (i = t, !0)
        }), i || t || console.warn('PhotoSphereViewer: button "' + e + '" not found in the navbar.'), i
    }, a.prototype.showNavbar = function () {
        this.toggleNavbar(!0)
    }, a.prototype.hideNavbar = function () {
        this.toggleNavbar(!1)
    }, a.prototype.toggleNavbar = function (t) {
        k.toggleClass(this.container, "psv-navbar--open", t)
    }, ((e.prototype = Object.create(s.prototype)).constructor = e).className = "psv-caption", e.publicMethods = ["setCaption"], e.prototype.create = function () {
        s.prototype.create.call(this), this.button = new g(this), this.button.hide(), this.content = document.createElement("div"), this.content.className = "psv-caption-content", this.container.appendChild(this.content), window.addEventListener("resize", this)
    }, e.prototype.destroy = function () {
        window.removeEventListener("resize", this), delete this.content, s.prototype.destroy.call(this)
    }, e.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "resize":
                this._onResize()
        }
    }, e.prototype.setCaption = function (t) {
        this.prop.caption = t || "", this.content.innerHTML = this.prop.caption, this.content.style.display = "", this.prop.width = this.content.offsetWidth, this._onResize()
    }, e.prototype._onResize = function () {
        parseInt(k.getStyle(this.container, "width")) >= this.prop.width ? (this.button.hide(), this.content.style.display = "") : (this.button.show(), this.content.style.display = "none")
    }, ((h.prototype = Object.create(s.prototype)).constructor = h).className = "psv-notification", h.publicMethods = ["showNotification", "hideNotification", "isNotificationVisible"], h.prototype.create = function () {
        s.prototype.create.call(this), this.content = document.createElement("div"), this.content.className = "psv-notification-content", this.container.appendChild(this.content), this.content.addEventListener("click", this.hideNotification.bind(this))
    }, h.prototype.destroy = function () {
        delete this.content, s.prototype.destroy.call(this)
    }, h.prototype.isNotificationVisible = function () {
        return this.container.classList.contains("psv-notification--visible")
    }, h.prototype.showNotification = function (t) {
        "string" == typeof t && (t = {
            content: t
        }), this.content.innerHTML = t.content, this.container.classList.add("psv-notification--visible"), this.psv.trigger("show-notification"), t.timeout && setTimeout(this.hideNotification.bind(this), t.timeout)
    }, h.prototype.hideNotification = function () {
        this.isNotificationVisible() && (this.container.classList.remove("psv-notification--visible"), this.psv.trigger("hide-notification"))
    }, ((p.prototype = Object.create(s.prototype)).constructor = p).className = "psv-overlay", p.publicMethods = ["showOverlay", "hideOverlay", "isOverlayVisible"], p.prototype.create = function () {
        s.prototype.create.call(this), this.image = document.createElement("div"), this.image.className = "psv-overlay-image", this.container.appendChild(this.image), this.text = document.createElement("div"), this.text.className = "psv-overlay-text", this.container.appendChild(this.text), this.subtext = document.createElement("div"), this.subtext.className = "psv-overlay-subtext", this.container.appendChild(this.subtext), this.container.addEventListener("click", this.hideOverlay.bind(this))
    }, p.prototype.destroy = function () {
        delete this.image, delete this.text, delete this.subtext, s.prototype.destroy.call(this)
    }, p.prototype.isOverlayVisible = function () {
        return this.visible
    }, p.prototype.showOverlay = function (t) {
        "string" == typeof t && (t = {
            text: t
        }), this.image.innerHTML = t.image || "", this.text.innerHTML = t.text || "", this.subtext.innerHTML = t.subtext || "", this.show(), this.psv.trigger("show-overlay")
    }, p.prototype.hideOverlay = function () {
        this.isOverlayVisible() && (this.hide(), this.psv.trigger("hide-overlay"))
    }, ((c.prototype = Object.create(s.prototype)).constructor = c).className = "psv-panel", c.publicMethods = ["showPanel", "hidePanel"], c.prototype.create = function () {
        s.prototype.create.call(this), this.container.innerHTML = '<div class="psv-panel-resizer"></div><div class="psv-panel-close-button"></div><div class="psv-panel-content"></div>', this.content = this.container.querySelector(".psv-panel-content"), this.container.querySelector(".psv-panel-close-button").addEventListener("click", this.hidePanel.bind(this)), this.psv.config.mousewheel && this.container.addEventListener(d.SYSTEM.mouseWheelEvent, function (t) {
            t.stopPropagation()
        });
        var t = this.container.querySelector(".psv-panel-resizer");
        t.addEventListener("mousedown", this), t.addEventListener("touchstart", this), this.psv.container.addEventListener("mouseup", this), this.psv.container.addEventListener("touchend", this), this.psv.container.addEventListener("mousemove", this), this.psv.container.addEventListener("touchmove", this)
    }, c.prototype.destroy = function () {
        this.psv.container.removeEventListener("mousemove", this), this.psv.container.removeEventListener("touchmove", this), this.psv.container.removeEventListener("mouseup", this), this.psv.container.removeEventListener("touchend", this), delete this.prop, delete this.content, s.prototype.destroy.call(this)
    }, c.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "mousedown":
                this._onMouseDown(t);
                break;
            case "touchstart":
                this._onTouchStart(t);
                break;
            case "mousemove":
                this._onMouseMove(t);
                break;
            case "touchmove":
                this._onTouchMove(t);
                break;
            case "mouseup":
            case "touchend":
                this._onMouseUp(t)
        }
    }, c.prototype.showPanel = function (t, e) {
        this.content.innerHTML = t, this.content.scrollTop = 0, this.container.classList.add("psv-panel--open"), k.toggleClass(this.content, "psv-panel-content--no-margin", !0 === e), this.prop.opened = !0, this.psv.trigger("open-panel")
    }, c.prototype.hidePanel = function () {
        this.content.innerHTML = null, this.prop.opened = !1, this.container.classList.remove("psv-panel--open"), this.psv.trigger("close-panel")
    }, c.prototype._onMouseDown = function (t) {
        t.stopPropagation(), this._startResize(t)
    }, c.prototype._onTouchStart = function (t) {
        t.stopPropagation(), this._startResize(t.changedTouches[0])
    }, c.prototype._onMouseUp = function (t) {
        this.prop.mousedown && (t.stopPropagation(), this.prop.mousedown = !1, this.content.classList.remove("psv-panel-content--no-interaction"))
    }, c.prototype._onMouseMove = function (t) {
        this.prop.mousedown && (t.stopPropagation(), this._resize(t))
    }, c.prototype._onTouchMove = function (t) {
        this.prop.mousedown && this._resize(t.touches[0])
    }, c.prototype._startResize = function (t) {
        this.prop.mouse_x = parseInt(t.clientX), this.prop.mouse_y = parseInt(t.clientY), this.prop.mousedown = !0, this.content.classList.add("psv-panel-content--no-interaction")
    }, c.prototype._resize = function (t) {
        var e = parseInt(t.clientX),
            i = parseInt(t.clientY);
        this.container.style.width = this.container.offsetWidth - (e - this.prop.mouse_x) + "px", this.prop.mouse_x = e, this.prop.mouse_y = i
    }, ((l.prototype = Object.create(s.prototype)).constructor = l).className = "psv-tooltip", l.publicMethods = ["showTooltip", "hideTooltip", "isTooltipVisible"], l.leftMap = {
        0: "left",
        .5: "center",
        1: "right"
    }, l.topMap = {
        0: "top",
        .5: "center",
        1: "bottom"
    }, l.prototype.create = function () {
        s.prototype.create.call(this), this.container.innerHTML = '<div class="psv-tooltip-arrow"></div><div class="psv-tooltip-content"></div>', this.container.style.top = "-1000px", this.container.style.left = "-1000px", this.content = this.container.querySelector(".psv-tooltip-content"), this.arrow = this.container.querySelector(".psv-tooltip-arrow"), this.psv.on("render", this)
    }, l.prototype.destroy = function () {
        this.psv.off("render", this), delete this.config, delete this.prop, s.prototype.destroy.call(this)
    }, l.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "render":
                this.hideTooltip()
        }
    }, l.prototype.isTooltipVisible = function () {
        return this.container.classList.contains("psv-tooltip--visible")
    }, l.prototype.showTooltip = function (t) {
        this.prop.timeout && (window.clearTimeout(this.prop.timeout), this.prop.timeout = null);
        var e = this.isTooltipVisible(),
            i = this.container,
            o = this.content,
            s = this.arrow;
        if (t.position || (t.position = ["top", "center"]), t.box || (t.box = {
                width: 0,
                height: 0
            }), "string" == typeof t.position) {
            var n = k.parsePosition(t.position);
            if (!(n.left in l.leftMap && n.top in l.topMap)) throw new x('unable to parse tooltip position "' + t.position + '"');
            t.position = [l.topMap[n.top], l.leftMap[n.left]]
        }
        if ("center" === t.position[0] && "center" === t.position[1]) throw new x('unable to parse tooltip position "center center"');
        if (e)
            for (var r = i.classList.length - 1; 0 <= r; r--) {
                var a = i.classList.item(r);
                "psv-tooltip" !== a && "psv-tooltip--visible" !== a && i.classList.remove(a)
            } else i.className = "psv-tooltip";
        t.className && k.addClasses(i, t.className), o.innerHTML = t.content, i.style.top = "0px", i.style.left = "0px";
        var h = i.getBoundingClientRect(),
            p = {
                posClass: t.position.slice(),
                width: h.right - h.left,
                height: h.bottom - h.top,
                top: 0,
                left: 0,
                arrow_top: 0,
                arrow_left: 0
            };
        this._computeTooltipPosition(p, t);
        var c = !1;
        p.top < this.config.offset ? (p.posClass[0] = "bottom", c = !0) : p.top + p.height > this.psv.prop.size.height - this.config.offset && (p.posClass[0] = "top", c = !0), p.left < this.config.offset ? (p.posClass[1] = "right", c = !0) : p.left + p.width > this.psv.prop.size.width - this.config.offset && (p.posClass[1] = "left", c = !0), c && this._computeTooltipPosition(p, t), i.style.top = p.top + "px", i.style.left = p.left + "px", s.style.top = p.arrow_top + "px", s.style.left = p.arrow_left + "px", i.classList.add("psv-tooltip--" + p.posClass.join("-")), e || (this.prop.timeout = window.setTimeout(function () {
            i.classList.add("psv-tooltip--visible"), this.prop.timeout = null, this.psv.trigger("show-tooltip")
        }.bind(this), this.config.delay))
    }, l.prototype.hideTooltip = function () {
        this.prop.timeout && (window.clearTimeout(this.prop.timeout), this.prop.timeout = null), this.isTooltipVisible() && (this.container.classList.remove("psv-tooltip--visible"), this.prop.timeout = window.setTimeout(function () {
            this.content.innerHTML = null, this.container.style.top = "-1000px", this.container.style.left = "-1000px", this.prop.timeout = null
        }.bind(this), this.config.delay), this.psv.trigger("hide-tooltip"))
    }, l.prototype._computeTooltipPosition = function (t, e) {
        var i = !1;
        switch (t.posClass[0]) {
            case "bottom":
                t.top = e.top + e.box.height + this.config.offset + this.config.arrow_size, t.arrow_top = 2 * -this.config.arrow_size, i = !0;
                break;
            case "center":
                t.top = e.top + e.box.height / 2 - t.height / 2, t.arrow_top = t.height / 2 - this.config.arrow_size;
                break;
            case "top":
                t.top = e.top - t.height - this.config.offset - this.config.arrow_size, t.arrow_top = t.height, i = !0
        }
        switch (t.posClass[1]) {
            case "right":
                t.arrow_left = i ? (t.left = e.left + e.box.width / 2 - this.config.offset - this.config.arrow_size, this.config.offset) : (t.left = e.left + e.box.width + this.config.offset + this.config.arrow_size, 2 * -this.config.arrow_size);
                break;
            case "center":
                t.left = e.left + e.box.width / 2 - t.width / 2, t.arrow_left = t.width / 2 - this.config.arrow_size;
                break;
            case "left":
                t.arrow_left = i ? (t.left = e.left - t.width + e.box.width / 2 + this.config.offset + this.config.arrow_size, t.width - this.config.offset - 2 * this.config.arrow_size) : (t.left = e.left - t.width - this.config.offset - this.config.arrow_size, t.width)
        }
    }, ((f.prototype = Object.create(s.prototype)).constructor = f).id = null, f.icon = null, f.iconActive = null, f.prototype.create = function () {
        s.prototype.create.call(this), this.constructor.icon && this._setIcon(this.constructor.icon), this.id && this.psv.config.lang[this.id] && (this.container.title = this.psv.config.lang[this.id]), this.container.addEventListener("click", function (t) {
            this.enabled && this._onClick(), t.stopPropagation()
        }.bind(this));
        var t = this.supported();
        "function" == typeof t.then ? (this.hide(), t.then(function (t) {
            t && this.show()
        }.bind(this))) : t || this.hide()
    }, f.prototype.destroy = function () {
        s.prototype.destroy.call(this)
    }, f.prototype.supported = function () {
        return !0
    }, f.prototype.toggleActive = function (t) {
        k.toggleClass(this.container, "psv-button--active", t), this.constructor.iconActive && this._setIcon(t ? this.constructor.iconActive : this.constructor.icon)
    }, f.prototype.disable = function () {
        this.container.classList.add("psv-button--disabled"), this.enabled = !1
    }, f.prototype.enable = function () {
        this.container.classList.remove("psv-button--disabled"), this.enabled = !0
    }, f.prototype._setIcon = function (t, e) {
        e || (e = this.container), t ? (e.innerHTML = d.ICONS[t], e.querySelector("svg").setAttribute("class", "psv-button-svg")) : e.innerHTML = ""
    }, f.prototype._onClick = function () {}, ((i.prototype = Object.create(f.prototype)).constructor = i).id = "autorotate", i.className = "psv-button psv-button--hover-scale psv-autorotate-button", i.icon = "play.svg", i.iconActive = "play-active.svg", i.prototype.create = function () {
        f.prototype.create.call(this), this.psv.on("autorotate", this)
    }, i.prototype.destroy = function () {
        this.psv.off("autorotate", this), f.prototype.destroy.call(this)
    }, i.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "autorotate":
                this.toggleActive(t.args[0])
        }
    }, i.prototype._onClick = function () {
        this.psv.toggleAutorotate()
    }, ((g.prototype = Object.create(f.prototype)).constructor = g).id = "markers", g.className = "psv-button psv-button--hover-scale psv-caption-button", g.icon = "info.svg", g.prototype.create = function () {
        f.prototype.create.call(this), this.psv.on("hide-notification", this)
    }, g.prototype.destroy = function () {
        this.psv.off("hide-notification", this), f.prototype.destroy.call(this)
    }, g.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "hide-notification":
                this.toggleActive(!1)
        }
    }, g.prototype._onClick = function () {
        this.psv.isNotificationVisible() ? this.psv.hideNotification() : (this.psv.showNotification(this.parent.prop.caption), this.toggleActive(!0))
    }, ((m.prototype = Object.create(f.prototype)).constructor = m).className = "psv-button psv-custom-button", m.prototype.create = function () {
        f.prototype.create.call(this), this.config.className && k.addClasses(this.container, this.config.className), this.config.title && (this.container.title = this.config.title), this.config.content && (this.container.innerHTML = this.config.content), !1 !== this.config.enabled && !0 !== this.config.disabled || this.disable(), !1 !== this.config.visible && !0 !== this.config.hidden || this.hide()
    }, m.prototype.destroy = function () {
        delete this.config, f.prototype.destroy.call(this)
    }, m.prototype._onClick = function () {
        this.config.onClick && this.config.onClick.apply(this.psv)
    }, ((v.prototype = Object.create(f.prototype)).constructor = v).id = "download", v.className = "psv-button psv-button--hover-scale psv-download-button", v.icon = "download.svg", v.prototype._onClick = function () {
        var t = document.createElement("a");
        t.href = this.psv.config.panorama, t.download = this.psv.config.panorama, this.psv.container.appendChild(t), t.click()
    }, ((y.prototype = Object.create(f.prototype)).constructor = y).id = "fullscreen", y.className = "psv-button psv-button--hover-scale psv-fullscreen-button", y.icon = "fullscreen-in.svg", y.iconActive = "fullscreen-out.svg", y.prototype.create = function () {
        f.prototype.create.call(this), this.psv.on("fullscreen-updated", this)
    }, y.prototype.destroy = function () {
        this.psv.off("fullscreen-updated", this), f.prototype.destroy.call(this)
    }, y.prototype.supported = function () {
        return !!d.SYSTEM.fullscreenEvent
    }, y.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "fullscreen-updated":
                this.toggleActive(t.args[0])
        }
    }, y.prototype._onClick = function () {
        this.psv.toggleFullscreen()
    }, ((_.prototype = Object.create(f.prototype)).constructor = _).id = "gyroscope", _.className = "psv-button psv-button--hover-scale psv-gyroscope-button", _.icon = "compass.svg", _.prototype.create = function () {
        f.prototype.create.call(this), this.psv.on("gyroscope-updated", this)
    }, _.prototype.destroy = function () {
        this.psv.off("gyroscope-updated", this), f.prototype.destroy.call(this)
    }, _.prototype.supported = function () {
        return !!k.checkTHREE("DeviceOrientationControls") && d.SYSTEM.deviceOrientationSupported
    }, _.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "gyroscope-updated":
                this.toggleActive(t.args[0])
        }
    }, _.prototype._onClick = function () {
        this.psv.toggleGyroscopeControl()
    }, ((w.prototype = Object.create(f.prototype)).constructor = w).id = "markers", w.className = "psv-button psv-button--hover-scale psv-markers-button", w.icon = "pin.svg", w.prototype._onClick = function () {
        this.psv.hud.toggleMarkersList()
    }, ((b.prototype = Object.create(f.prototype)).constructor = b).id = "stereo", b.className = "psv-button psv-button--hover-scale psv-stereo-button", b.icon = "stereo.svg", b.prototype.create = function () {
        f.prototype.create.call(this), this.psv.on("stereo-updated", this)
    }, b.prototype.destroy = function () {
        this.psv.off("stereo-updated", this), f.prototype.destroy.call(this)
    }, b.prototype.supported = function () {
        return !(!d.SYSTEM.fullscreenEvent || !k.checkTHREE("DeviceOrientationControls")) && d.SYSTEM.deviceOrientationSupported
    }, b.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "stereo-updated":
                this.toggleActive(t.args[0])
        }
    }, b.prototype._onClick = function () {
        this.psv.toggleStereoView()
    }, ((E.prototype = Object.create(f.prototype)).constructor = E).id = "zoom", E.className = "psv-button psv-zoom-button", E.prototype.create = function () {
        f.prototype.create.call(this);
        var t = document.createElement("div");
        t.className = "psv-zoom-button-minus", t.title = this.psv.config.lang.zoomOut, this._setIcon("zoom-out.svg", t), this.container.appendChild(t);
        var e = document.createElement("div");
        e.className = "psv-zoom-button-range", this.container.appendChild(e), this.zoom_range = document.createElement("div"), this.zoom_range.className = "psv-zoom-button-line", e.appendChild(this.zoom_range), this.zoom_value = document.createElement("div"), this.zoom_value.className = "psv-zoom-button-handle", this.zoom_range.appendChild(this.zoom_value);
        var i = document.createElement("div");
        i.className = "psv-zoom-button-plus", i.title = this.psv.config.lang.zoomIn, this._setIcon("zoom-in.svg", i), this.container.appendChild(i), this.zoom_range.addEventListener("mousedown", this), this.zoom_range.addEventListener("touchstart", this), this.psv.container.addEventListener("mousemove", this), this.psv.container.addEventListener("touchmove", this), this.psv.container.addEventListener("mouseup", this), this.psv.container.addEventListener("touchend", this), t.addEventListener("mousedown", this._zoomOut.bind(this)), i.addEventListener("mousedown", this._zoomIn.bind(this)), this.psv.on("zoom-updated", this), this.psv.once("ready", function () {
            this._moveZoomValue(this.psv.prop.zoom_lvl)
        }.bind(this))
    }, E.prototype.destroy = function () {
        this._stopZoomChange(), this.psv.container.removeEventListener("mousemove", this), this.psv.container.removeEventListener("touchmove", this), this.psv.container.removeEventListener("mouseup", this), this.psv.container.removeEventListener("touchend", this), delete this.zoom_range, delete this.zoom_value, this.psv.off("zoom-updated", this), f.prototype.destroy.call(this)
    }, E.prototype.handleEvent = function (t) {
        switch (t.type) {
            case "mousedown":
                this._initZoomChangeWithMouse(t);
                break;
            case "touchstart":
                this._initZoomChangeByTouch(t);
                break;
            case "mousemove":
                this._changeZoomWithMouse(t);
                break;
            case "touchmove":
                this._changeZoomByTouch(t);
                break;
            case "mouseup":
            case "touchend":
                this._stopZoomChange(t);
                break;
            case "zoom-updated":
                this._moveZoomValue(t.args[0])
        }
    }, E.prototype._moveZoomValue = function (t) {
        this.zoom_value.style.left = t / 100 * this.zoom_range.offsetWidth - this.zoom_value.offsetWidth / 2 + "px"
    }, E.prototype._initZoomChangeWithMouse = function (t) {
        this.enabled && (this.prop.mousedown = !0, this._changeZoom(t.clientX))
    }, E.prototype._initZoomChangeByTouch = function (t) {
        this.enabled && (this.prop.mousedown = !0, this._changeZoom(t.changedTouches[0].clientX))
    }, E.prototype._zoomIn = function () {
        this.enabled && (this.prop.buttondown = !0, this.psv.zoomIn(), this.prop.longPressTimeout = window.setTimeout(this._startLongPressInterval.bind(this, 1), 200))
    }, E.prototype._zoomOut = function () {
        this.enabled && (this.prop.buttondown = !0, this.psv.zoomOut(), this.prop.longPressTimeout = window.setTimeout(this._startLongPressInterval.bind(this, -1), 200))
    }, E.prototype._startLongPressInterval = function (t) {
        this.prop.buttondown && (this.prop.longPressInterval = window.setInterval(function () {
            this.psv.zoom(this.psv.prop.zoom_lvl + t)
        }.bind(this), 50))
    }, E.prototype._stopZoomChange = function () {
        this.enabled && (window.clearInterval(this.prop.longPressInterval), window.clearTimeout(this.prop.longPressTimeout), this.prop.longPressInterval = null, this.prop.mousedown = !1, this.prop.buttondown = !1)
    }, E.prototype._changeZoomWithMouse = function (t) {
        this.enabled && (t.preventDefault(), this._changeZoom(t.clientX))
    }, E.prototype._changeZoomByTouch = function (t) {
        this.enabled && this._changeZoom(t.changedTouches[0].clientX)
    }, E.prototype._changeZoom = function (t) {
        if (this.prop.mousedown) {
            var e = (parseInt(t) - this.zoom_range.getBoundingClientRect().left) / this.zoom_range.offsetWidth * 100;
            this.psv.zoom(e)
        }
    }, M.easings = {
        linear: function (t) {
            return t
        },
        inQuad: function (t) {
            return t * t
        },
        outQuad: function (t) {
            return t * (2 - t)
        },
        inOutQuad: function (t) {
            return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
        },
        inCubic: function (t) {
            return t * t * t
        },
        outCubic: function (t) {
            return --t * t * t + 1
        },
        inOutCubic: function (t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        },
        inQuart: function (t) {
            return t * t * t * t
        },
        outQuart: function (t) {
            return 1 - --t * t * t * t
        },
        inOutQuart: function (t) {
            return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
        },
        inQuint: function (t) {
            return t * t * t * t * t
        },
        outQuint: function (t) {
            return 1 + --t * t * t * t * t
        },
        inOutQuint: function (t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
        },
        inSine: function (t) {
            return 1 - Math.cos(t * (Math.PI / 2))
        },
        outSine: function (t) {
            return Math.sin(t * (Math.PI / 2))
        },
        inOutSine: function (t) {
            return .5 - .5 * Math.cos(Math.PI * t)
        },
        inExpo: function (t) {
            return Math.pow(2, 10 * (t - 1))
        },
        outExpo: function (t) {
            return 1 - Math.pow(2, -10 * t)
        },
        inOutExpo: function (t) {
            return (t = 2 * t - 1) < 0 ? .5 * Math.pow(2, 10 * t) : 1 - .5 * Math.pow(2, -10 * t)
        },
        inCirc: function (t) {
            return 1 - Math.sqrt(1 - t * t)
        },
        outCirc: function (t) {
            return t--, Math.sqrt(1 - t * t)
        },
        inOutCirc: function (t) {
            return (t *= 2) < 1 ? .5 - .5 * Math.sqrt(1 - t * t) : .5 + .5 * Math.sqrt(1 - (t -= 2) * t)
        }
    }, M.prototype._run = function (t) {
        if (!this._cancelled) {
            null === this._start && (this._start = t);
            var e, i = (t - this._start) / this._options.duration,
                o = {};
            if (i < 1) {
                for (e in this._options.properties) this._options.properties[e] && (o[e] = this._options.properties[e].start + (this._options.properties[e].end - this._options.properties[e].start) * this._options.easing(i));
                this._options.onTick(o, i), window.requestAnimationFrame(this._run.bind(this))
            } else {
                for (e in this._options.properties) this._options.properties[e] && (o[e] = this._options.properties[e].end);
                this._options.onTick(o, 1), window.requestAnimationFrame(function () {
                    this._resolved = !0, this._resolve()
                }.bind(this))
            }
        }
    }, M.prototype.then = function (t, e) {
        var i = new M;
        return i._promise.then(null, this.cancel.bind(this)), this._promise.then(function () {
            i._resolve(t ? t() : void 0)
        }, function () {
            i._reject(e ? e() : void 0)
        }), i
    }, M.prototype.catch = function (t) {
        return this.then(void 0, t)
    }, M.prototype.finally = function (t) {
        return this.then(t, t)
    }, M.prototype.cancel = function () {
        this._cancelled || this._resolved || (this._cancelled = !0, this._reject(), this._delayTimeout && (window.cancelAnimationFrame(this._delayTimeout), this._delayTimeout = null))
    }, (x.prototype = Object.create(Error.prototype)).name = "PSVError", d.Error = x.prototype.constructor = x, S.types = ["image", "html", "polygon_px", "polygon_rad", "polyline_px", "polyline_rad", "rect", "circle", "ellipse", "path"], S.getType = function (e, t) {
        var i = [];
        if (S.types.forEach(function (t) {
                e[t] && i.push(t)
            }), 0 === i.length && !t) throw new x("missing marker content, either " + S.types.join(", "));
        if (1 < i.length) throw new x("multiple marker content, either " + S.types.join(", "));
        return i[0]
    }, S.prototype.destroy = function () {
        delete this.$el.psvMarker
    }, S.prototype.isNormal = function () {
        return "image" === this.type || "html" === this.type
    }, S.prototype.isPoly = function () {
        return this.isPolygon() || this.isPolyline()
    }, S.prototype.isPolygon = function () {
        return "polygon_px" === this.type || "polygon_rad" === this.type
    }, S.prototype.isPolyline = function () {
        return "polyline_px" === this.type || "polyline_rad" === this.type
    }, S.prototype.isSvg = function () {
        return "rect" === this.type || "circle" === this.type || "ellipse" === this.type || "path" === this.type
    }, S.prototype.getScale = function (t) {
        return Array.isArray(this.scale) ? this.scale[0] + (this.scale[1] - this.scale[0]) * M.easings.inQuad(t / 100) : "function" == typeof this.scale ? this.scale(t) : "number" == typeof this.scale ? this.scale * M.easings.inQuad(t / 100) : 1
    }, S.prototype.update = function (t) {
        if (t && t !== this) {
            var e = S.getType(t, !0);
            if (void 0 !== e && e !== this.type) throw new x("cannot change marker type");
            k.deepmerge(this, t)
        }
        this.isNormal() ? this.$el.setAttribute("class", "psv-marker psv-marker--normal") : this.$el.setAttribute("class", "psv-marker psv-marker--svg"), this.className && k.addClasses(this.$el, this.className), this.tooltip && (k.addClasses(this.$el, "has-tooltip"), "string" == typeof this.tooltip && (this.tooltip = {
            content: this.tooltip
        })), this.style && k.deepmerge(this.$el.style, this.style), this.anchor = k.parsePosition(this.anchor), this.isNormal() ? this._updateNormal() : this.isPolygon() ? this._updatePoly("polygon_rad", "polygon_px") : this.isPolyline() ? this._updatePoly("polyline_rad", "polyline_px") : this._updateSvg()
    }, S.prototype._updateNormal = function () {
        this.width && this.height ? (this.$el.style.width = this.width + "px", this.$el.style.height = this.height + "px", this._dynamicSize = !1) : this._dynamicSize = !0, this.image ? this.$el.style.backgroundImage = "url(" + this.image + ")" : this.$el.innerHTML = this.html, this.$el.style.transformOrigin = 100 * this.anchor.left + "% " + 100 * this.anchor.top + "%", this.psv.cleanPosition(this), this.position3D = this.psv.sphericalCoordsToVector3(this)
    }, S.prototype._updateSvg = function () {
        switch (this._dynamicSize = !0, this.type) {
            case "rect":
                "number" == typeof this._def ? this._def = {
                    x: 0,
                    y: 0,
                    width: this._def,
                    height: this._def
                } : Array.isArray(this._def) ? this._def = {
                    x: 0,
                    y: 0,
                    width: this._def[0],
                    height: this._def[1]
                } : this._def.x = this._def.y = 0;
                break;
            case "circle":
                "number" == typeof this._def ? this._def = {
                    cx: this._def,
                    cy: this._def,
                    r: this._def
                } : Array.isArray(this._def) ? this._def = {
                    cx: this._def[0],
                    cy: this._def[0],
                    r: this._def[0]
                } : this._def.cx = this._def.cy = this._def.r;
                break;
            case "ellipse":
                "number" == typeof this._def ? this._def = {
                    cx: this._def,
                    cy: this._def,
                    rx: this._def,
                    ry: this._def
                } : Array.isArray(this._def) ? this._def = {
                    cx: this._def[0],
                    cy: this._def[1],
                    rx: this._def[0],
                    ry: this._def[1]
                } : (this._def.cx = this._def.rx, this._def.cy = this._def.ry);
                break;
            case "path":
                "string" == typeof this._def && (this._def = {
                    d: this._def
                })
        }
        Object.getOwnPropertyNames(this._def).forEach(function (t) {
            this.$el.setAttributeNS(null, t, this._def[t])
        }, this), this.svgStyle ? Object.getOwnPropertyNames(this.svgStyle).forEach(function (t) {
            this.$el.setAttributeNS(null, k.dasherize(t), this.svgStyle[t])
        }, this) : this.$el.setAttributeNS(null, "fill", "rgba(0,0,0,0.5)"), this.psv.cleanPosition(this), this.position3D = this.psv.sphericalCoordsToVector3(this)
    }, S.prototype._updatePoly = function (t, e) {
        this._dynamicSize = !0, this.svgStyle ? (Object.getOwnPropertyNames(this.svgStyle).forEach(function (t) {
            this.$el.setAttributeNS(null, k.dasherize(t), this.svgStyle[t])
        }, this), this.isPolyline() && !this.svgStyle.fill && this.$el.setAttributeNS(null, "fill", "none")) : this.isPolygon() ? this.$el.setAttributeNS(null, "fill", "rgba(0,0,0,0.5)") : this.isPolyline() && (this.$el.setAttributeNS(null, "fill", "none"), this.$el.setAttributeNS(null, "stroke", "rgb(0,0,0)")), [this[t], this[e]].forEach(function (t) {
            if (t && "object" != typeof t[0])
                for (var e = 0; e < t.length; e++) t.splice(e, 2, [t[e], t[e + 1]])
        }), this[e] ? this[t] = this[e].map(function (t) {
            var e = this.psv.textureCoordsToSphericalCoords({
                x: t[0],
                y: t[1]
            });
            return [e.longitude, e.latitude]
        }, this) : this[t] = this[t].map(function (t) {
            return [k.parseAngle(t[0]), k.parseAngle(t[1], !0)]
        }), this.longitude = this[t][0][0], this.latitude = this[t][0][1], this.positions3D = this[t].map(function (t) {
            return this.psv.sphericalCoordsToVector3({
                longitude: t[0],
                latitude: t[1]
            })
        }, this)
    };
    var k = {};
    return (d.Utils = k).TwoPI = 2 * Math.PI, k.HalfPI = Math.PI / 2, k.svgNS = "http://www.w3.org/2000/svg", k.checkTHREE = function (t) {
        for (var e = 0, i = arguments.length; e < i; e++)
            if (!(arguments[e] in u)) return !1;
        return !0
    }, k.isCanvasSupported = function () {
        var t = document.createElement("canvas");
        return !(!t.getContext || !t.getContext("2d"))
    }, k.getWebGLCtx = function () {
        var e = document.createElement("canvas"),
            i = null;
        return e.getContext && ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"].some(function (t) {
            try {
                return (i = e.getContext(t)) && "function" == typeof i.getParameter
            } catch (t) {
                return !1
            }
        }) ? i : null
    }, k.isWebGLSupported = function () {
        return !!window.WebGLRenderingContext && null !== k.getWebGLCtx()
    }, k.isDeviceOrientationSupported = function () {
        return new Promise(function (e) {
            if ("DeviceOrientationEvent" in window) {
                var i = function (t) {
                    t && null !== t.alpha && !isNaN(t.alpha) ? e(!0) : e(!1), window.removeEventListener("deviceorientation", i)
                };
                window.addEventListener("deviceorientation", i, !1), setTimeout(i, 2e3)
            } else e(!1)
        })
    }, k.isTouchEnabled = function () {
        return new Promise(function (e) {
            var i = function (t) {
                e(!!t), window.removeEventListener("touchstart", i)
            };
            window.addEventListener("touchstart", i, !1), setTimeout(i, 1e4)
        })
    }, k.getMaxTextureWidth = function () {
        var t = k.getWebGLCtx();
        return null !== t ? t.getParameter(t.MAX_TEXTURE_SIZE) : 0
    }, k.toggleClass = function (t, e, i) {
        if (t.classList) void 0 === i ? t.classList.toggle(e) : i && !t.classList.contains(e) ? t.classList.add(e) : i || t.classList.remove(e);
        else {
            var o = t.getAttribute("class") || "",
                s = -1 !== o.indexOf(e),
                n = new RegExp("(?:^|\\s)" + e + "(?:\\s|$)");
            void 0 !== i && !i || s ? i || (o = o.replace(n, " ")) : o += 0 < o.length ? " " + e : e, t.setAttribute("class", o)
        }
    }, k.addClasses = function (e, t) {
        t && t.split(" ").forEach(function (t) {
            k.toggleClass(e, t, !0)
        })
    }, k.removeClasses = function (e, t) {
        t && t.split(" ").forEach(function (t) {
            k.toggleClass(e, t, !1)
        })
    }, k.hasParent = function (t, e) {
        do {
            if (t === e) return !0
        } while (t = t.parentNode);
        return !1
    }, k.getClosest = function (t, e) {
        var i = t.matches || t.msMatchesSelector;
        do {
            if (i.bind(t)(e)) return t
        } while (t = t instanceof SVGElement ? t.parentNode : t.parentElement);
        return null
    }, k.mouseWheelEvent = function () {
        return "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"
    }, k.getEventKey = function (t) {
        var e = t.key || k.getEventKey.KEYMAP[t.keyCode || t.which];
        return e && k.getEventKey.MS_KEYMAP[e] && (e = k.getEventKey.MS_KEYMAP[e]), e
    }, k.getEventKey.KEYMAP = {
        13: "Enter",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        46: "Delete",
        107: "+",
        109: "-"
    }, k.getEventKey.MS_KEYMAP = {
        Add: "+",
        Del: "Delete",
        Down: "ArrowDown",
        Esc: "Escape",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Spacebar: " ",
        Subtract: "-",
        Up: "ArrowUp"
    }, k.fullscreenEvent = function () {
        var t = {
            exitFullscreen: "fullscreenchange",
            webkitExitFullscreen: "webkitfullscreenchange",
            mozCancelFullScreen: "mozfullscreenchange",
            msExitFullscreen: "MSFullscreenChange"
        };
        for (var e in t)
            if (t.hasOwnProperty(e) && e in document) return t[e];
        return null
    }, k.bound = function (t, e, i) {
        return Math.max(e, Math.min(i, t))
    }, k.isInteger = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    }, k.sum = function (t) {
        return t.reduce(function (t, e) {
            return t + e
        }, 0)
    }, k.dasherize = function (t) {
        return t.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, function (t, e) {
            return (0 < e ? "-" : "") + t.toLowerCase()
        })
    }, k.getXMPValue = function (t, e) {
        var i;
        return null !== (i = t.match("<GPano:" + e + ">(.*)</GPano:" + e + ">")) ? i[1] : null !== (i = t.match("GPano:" + e + '="(.*?)"')) ? i[1] : null
    }, k.isFullscreenEnabled = function (t) {
        return (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) === t
    }, k.requestFullscreen = function (t) {
        (t.requestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullscreen || t.msRequestFullscreen).call(t)
    }, k.exitFullscreen = function () {
        (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document)
    }, k.getStyle = function (t, e) {
        return window.getComputedStyle(t, null)[e]
    }, k.getShortestArc = function (i, o) {
        return [0, k.TwoPI, -k.TwoPI].reduce(function (t, e) {
            return e = o - i + e, Math.abs(e) < Math.abs(t) ? e : t
        }, 1 / 0)
    }, k.getAngle = function (t, e) {
        return Math.acos(Math.cos(t.latitude) * Math.cos(e.latitude) * Math.cos(t.longitude - e.longitude) + Math.sin(t.latitude) * Math.sin(e.latitude))
    }, k.parsePosition = function (t) {
        if (!t) return {
            top: .5,
            left: .5
        };
        if ("object" == typeof t) return t;
        var e = t.toLocaleLowerCase().split(" ").slice(0, 2);
        1 === e.length && (e = void 0 !== k.parsePosition.positions[e[0]] ? [e[0], "center"] : [e[0], e[0]]);
        var i = "left" !== e[1] && "right" !== e[1] && "top" !== e[0] && "bottom" !== e[0];
        e = e.map(function (t) {
            return k.parsePosition.positions[t] || t
        }), i || e.reverse();
        var o = e.join(" ").match(/^([0-9.]+)% ([0-9.]+)%$/);
        return o ? {
            left: o[1] / 100,
            top: o[2] / 100
        } : {
            top: .5,
            left: .5
        }
    }, k.parsePosition.positions = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    }, k.parseSpeed = function (t) {
        if ("string" == typeof t) {
            t = t.toString().trim();
            var e = parseFloat(t.replace(/^(-?[0-9]+(?:\.[0-9]*)?).*$/, "$1")),
                i = t.replace(/^-?[0-9]+(?:\.[0-9]*)?(.*)$/, "$1").trim();
            switch (i.match(/(pm|per minute)$/) && (e /= 60), i) {
                case "dpm":
                case "degrees per minute":
                case "dps":
                case "degrees per second":
                    t = u.Math.degToRad(e);
                    break;
                case "radians per minute":
                case "radians per second":
                    t = e;
                    break;
                case "rpm":
                case "revolutions per minute":
                case "rps":
                case "revolutions per second":
                    t = e * k.TwoPI;
                    break;
                default:
                    throw new x('unknown speed unit "' + i + '"')
            }
        }
        return t
    }, k.parseAngle = function (t, e, i) {
        if (void 0 === i && (i = e), "string" == typeof t) {
            var o = t.toLowerCase().trim().match(/^(-?[0-9]+(?:\.[0-9]*)?)(.*)$/);
            if (!o) throw new x('unknown angle "' + t + '"');
            var s = parseFloat(o[1]),
                n = o[2];
            if (n) switch (n) {
                case "deg":
                case "degs":
                    t = u.Math.degToRad(s);
                    break;
                case "rad":
                case "rads":
                    t = s;
                    break;
                default:
                    throw new x('unknown angle unit "' + n + '"')
            } else t = s
        }
        return (t = (e ? t + Math.PI : t) % k.TwoPI) < 0 && (t = k.TwoPI + t), e ? k.bound(t - Math.PI, -Math.PI / (i ? 2 : 1), Math.PI / (i ? 2 : 1)) : t
    }, k.cleanTHREEScene = function (t) {
        t.children.forEach(function (t) {
            t instanceof u.Mesh && (t.geometry && (t.geometry.dispose(), t.geometry = null), t.material && (t.material.materials ? (t.material.materials.forEach(function (t) {
                t.map && (t.map.dispose(), t.map = null), t.dispose()
            }), t.material.materials.length = 0) : (t.material.map && (t.material.map.dispose(), t.material.map = null), t.material.dispose()), t.material = null))
        }), t.children.length = 0
    }, k.throttle = function (i, o) {
        var s, n, r, a = null,
            h = 0,
            p = function () {
                h = Date.now(), a = null, r = i.apply(s, n), a || (s = n = null)
            };
        return function () {
            var t = Date.now();
            h || (h = t);
            var e = o - (t - h);
            return s = this, n = arguments, e <= 0 || o < e ? (a && (clearTimeout(a), a = null), h = t, r = i.apply(s, n), a || (s = n = null)) : a || (a = setTimeout(p, e)), r
        }
    }, k.isPlainObject = function (t) {
        if ("object" != typeof t || null === t) return !1;
        if ("function" != typeof Object.getPrototypeOf) return "[object Object]" === Object.prototype.toString.call(t);
        var e = Object.getPrototypeOf(t);
        return e === Object.prototype || null === e
    }, k.deepmerge = function (t, e) {
        var s = e;
        return function i(o, e) {
            return Array.isArray(e) ? (o && Array.isArray(o) ? o.length = 0 : o = [], e.forEach(function (t, e) {
                o[e] = i(null, t)
            })) : "object" == typeof e ? (o && !Array.isArray(o) || (o = {}), Object.keys(e).forEach(function (t) {
                "object" == typeof e[t] && e[t] && k.isPlainObject(e[t]) ? e[t] != s && (o[t] ? i(o[t], e[t]) : o[t] = i(null, e[t])) : o[t] = e[t]
            })) : o = e, o
        }(t, e)
    }, k.clone = function (t) {
        return k.deepmerge(null, t)
    }, k.normalizeWheel = function (t) {
        var e = 0,
            i = 0,
            o = 0,
            s = 0;
        return "detail" in t && (i = t.detail), "wheelDelta" in t && (i = -t.wheelDelta / 120), "wheelDeltaY" in t && (i = -t.wheelDeltaY / 120), "wheelDeltaX" in t && (e = -t.wheelDeltaX / 120), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (e = i, i = 0), o = 10 * e, s = 10 * i, "deltaY" in t && (s = t.deltaY), "deltaX" in t && (o = t.deltaX), (o || s) && t.deltaMode && (1 === t.deltaMode ? (o *= 40, s *= 40) : (o *= 800, s *= 800)), o && !e && (e = o < 1 ? -1 : 1), s && !i && (i = s < 1 ? -1 : 1), {
            spinX: e,
            spinY: i,
            pixelX: o,
            pixelY: s
        }
    }, k.forEach = function (t, e) {
        for (var i in t) t.hasOwnProperty(i) && e(t[i], i)
    }, d.ICONS["compass.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0zm0 88.81a38.86 38.86 0 0 1-38.81-38.8 38.86 38.86 0 0 1 38.8-38.82A38.86 38.86 0 0 1 88.82 50 38.87 38.87 0 0 1 50 88.81z"/><path d="M72.07 25.9L40.25 41.06 27.92 74.12l31.82-15.18v-.01l12.32-33.03zM57.84 54.4L44.9 42.58l21.1-10.06-8.17 21.9z"/>\x3c!--Created by iconoci from the Noun Project--\x3e</svg>', d.ICONS["download.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M83.3 35.6h-17V3H32.2v32.6H16.6l33.6 32.7 33-32.7z"/><path d="M83.3 64.2v16.3H16.6V64.2H-.1v32.6H100V64.2H83.3z"/>\x3c!--Created by Michael Zenaty from the Noun Project--\x3e</svg>', d.ICONS["fullscreen-in.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M100 40H87.1V18.8h-21V6H100zM100 93.2H66V80.3h21.1v-21H100zM34 93.2H0v-34h12.9v21.1h21zM12.9 40H0V6h34v12.9H12.8z"/>\x3c!--Created by Garrett Knoll from the Noun Project--\x3e</svg>', d.ICONS["fullscreen-out.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M66 7h13v21h21v13H66zM66 60.3h34v12.9H79v21H66zM0 60.3h34v34H21V73.1H0zM21 7h13v34H0V28h21z"/>\x3c!--Created by Garrett Knoll from the Noun Project--\x3e</svg>', d.ICONS["gesture.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M33.38 33.2a1.96 1.96 0 0 0 1.5-3.23 10.61 10.61 0 0 1 7.18-17.51c.7-.06 1.31-.49 1.61-1.12a13.02 13.02 0 0 1 11.74-7.43c7.14 0 12.96 5.8 12.96 12.9 0 3.07-1.1 6.05-3.1 8.38-.7.82-.61 2.05.21 2.76.83.7 2.07.6 2.78-.22a16.77 16.77 0 0 0 4.04-10.91C72.3 7.54 64.72 0 55.4 0a16.98 16.98 0 0 0-14.79 8.7 14.6 14.6 0 0 0-12.23 14.36c0 3.46 1.25 6.82 3.5 9.45.4.45.94.69 1.5.69m45.74 43.55a22.13 22.13 0 0 1-5.23 12.4c-4 4.55-9.53 6.86-16.42 6.86-12.6 0-20.1-10.8-20.17-10.91a1.82 1.82 0 0 0-.08-.1c-5.3-6.83-14.55-23.82-17.27-28.87-.05-.1 0-.21.02-.23a6.3 6.3 0 0 1 8.24 1.85l9.38 12.59a1.97 1.97 0 0 0 3.54-1.17V25.34a4 4 0 0 1 1.19-2.87 3.32 3.32 0 0 1 2.4-.95c1.88.05 3.4 1.82 3.4 3.94v24.32a1.96 1.96 0 0 0 3.93 0v-33.1a3.5 3.5 0 0 1 7 0v35.39a1.96 1.96 0 0 0 3.93 0v-.44c.05-2.05 1.6-3.7 3.49-3.7 1.93 0 3.5 1.7 3.5 3.82v5.63c0 .24.04.48.13.71l.1.26a1.97 1.97 0 0 0 3.76-.37c.33-1.78 1.77-3.07 3.43-3.07 1.9 0 3.45 1.67 3.5 3.74l-1.77 18.1zM77.39 51c-1.25 0-2.45.32-3.5.9v-.15c0-4.27-3.33-7.74-7.42-7.74-1.26 0-2.45.33-3.5.9V16.69a7.42 7.42 0 0 0-14.85 0v1.86a7 7 0 0 0-3.28-.94 7.21 7.21 0 0 0-5.26 2.07 7.92 7.92 0 0 0-2.38 5.67v37.9l-5.83-7.82a10.2 10.2 0 0 0-13.35-2.92 4.1 4.1 0 0 0-1.53 5.48C20 64.52 28.74 80.45 34.07 87.34c.72 1.04 9.02 12.59 23.4 12.59 7.96 0 14.66-2.84 19.38-8.2a26.06 26.06 0 0 0 6.18-14.6l1.78-18.2v-.2c0-4.26-3.32-7.73-7.42-7.73z" fill="#000" fill-rule="evenodd"/>\x3c!--Created by AomAm from the Noun Project--\x3e</svg>', d.ICONS["info.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M28.3 26.1c-1 2.6-1.9 4.8-2.6 7-2.5 7.4-5 14.7-7.2 22-1.3 4.4.5 7.2 4.3 7.8 1.3.2 2.8.2 4.2-.1 8.2-2 11.9-8.6 15.7-15.2l-2.2 2a18.8 18.8 0 0 1-7.4 5.2 2 2 0 0 1-1.6-.2c-.2-.1 0-1 0-1.4l.8-1.8L41.9 28c.5-1.4.9-3 .7-4.4-.2-2.6-3-4.4-6.3-4.4-8.8.2-15 4.5-19.5 11.8-.2.3-.2.6-.3 1.3 3.7-2.8 6.8-6.1 11.8-6.2z"/><circle cx="39.3" cy="9.2" r="8.2"/>\x3c!--Created by Arafat Uddin from the Noun Project--\x3e</svg>', d.ICONS["mobile-rotate.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M66.7 19a14 14 0 0 1 13.8 12.1l-3.9-2.7c-.5-.3-1.1-.2-1.4.3-.3.5-.2 1.1.3 1.4l5.7 3.9.6.2c.3 0 .6-.2.8-.4l3.9-5.7c.3-.5.2-1.1-.3-1.4-.5-.3-1.1-.2-1.4.3l-2.4 3.5A16 16 0 0 0 66.7 17c-.6 0-1 .4-1 1s.4 1 1 1zM25 15h10c.6 0 1-.4 1-1s-.4-1-1-1H25c-.6 0-1 .4-1 1s.4 1 1 1zm-6.9 30H16l-2 .2a1 1 0 0 0-.8 1.2c.1.5.5.8 1 .8h.2l1.7-.2h2.1c.6 0 1-.4 1-1s-.5-1-1.1-1zm10 0h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1zM84 45H55V16A11 11 0 0 0 44 5H16A11 11 0 0 0 5 16v68a11 11 0 0 0 11 11h68a11 11 0 0 0 11-11V56a11 11 0 0 0-11-11zM16 93c-5 0-9-4-9-9V53.2c.3-.1.6-.3.7-.6a9.8 9.8 0 0 1 2-3c.4-.4.4-1 0-1.4a1 1 0 0 0-1.4 0l-1.2 1.5V16c0-5 4-9 9-9h28c5 0 9 4 9 9v68c0 5-4 9-9 9H16zm77-9c0 5-4 9-9 9H50.3c2.8-2 4.7-5.3 4.7-9V47h29c5 0 9 4 9 9v28zM38.1 45h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.5-1-1-1zm9.9 0h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1zm38 19c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1s1-.4 1-1V65c0-.6-.4-1-1-1z"/>\x3c!--Created by Anthony Bresset from the Noun Project--\x3e</svg>', d.ICONS["pin.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 0C13.8 0 5.5 8.3 5.5 18.5c0 10.07 17.57 28.64 18.32 29.42a.25.25 0 0 0 .36 0c.75-.78 18.32-19.35 18.32-29.42C42.5 8.3 34.2 0 24 0zm0 7.14a10.35 10.35 0 0 1 0 20.68 10.35 10.35 0 0 1 0-20.68z"/>\x3c!--Created by Daniele Marucci from the Noun Project--\x3e</svg>', d.ICONS["play-active.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><path d="M40.5 14.1c-.1-.1-1.2-.5-2.898-1-.102 0-.202-.1-.202-.2C34.5 6.5 28 2 20.5 2S6.6 6.5 3.7 12.9c0 .1-.1.1-.2.2-1.7.6-2.8 1-2.9 1l-.6.3v12.1l.6.2c.1 0 1.1.399 2.7.899.1 0 .2.101.2.199C6.3 34.4 12.9 39 20.5 39c7.602 0 14.102-4.6 16.9-11.1 0-.102.1-.102.199-.2 1.699-.601 2.699-1 2.801-1l.6-.3V14.3l-.5-.2zM6.701 11.5C9.7 7 14.8 4 20.5 4c5.8 0 10.9 3 13.8 7.5.2.3-.1.6-.399.5-3.799-1-8.799-2-13.6-2-4.7 0-9.5 1-13.2 2-.3.1-.5-.2-.4-.5zM25.1 20.3L18.7 24c-.3.2-.7 0-.7-.5v-7.4c0-.4.4-.6.7-.4l6.399 3.8c.301.1.301.6.001.8zm9.4 8.901A16.421 16.421 0 0 1 20.5 37c-5.9 0-11.1-3.1-14-7.898-.2-.302.1-.602.4-.5 3.9 1 8.9 2.1 13.6 2.1 5 0 9.9-1 13.602-2 .298-.1.5.198.398.499z"/>\x3c!--Created by Nick Bluth from the Noun Project--\x3e</svg>', d.ICONS["play.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><path d="M40.5 14.1c-.1-.1-1.2-.5-2.899-1-.101 0-.2-.1-.2-.2C34.5 6.5 28 2 20.5 2S6.6 6.5 3.7 12.9c0 .1-.1.1-.2.2-1.7.6-2.8 1-2.9 1l-.6.3v12.1l.6.2c.1 0 1.1.4 2.7.9.1 0 .2.1.2.199C6.3 34.4 12.9 39 20.5 39c7.601 0 14.101-4.6 16.9-11.1 0-.101.1-.101.2-.2 1.699-.6 2.699-1 2.8-1l.6-.3V14.3l-.5-.2zM20.5 4c5.8 0 10.9 3 13.8 7.5.2.3-.1.6-.399.5-3.8-1-8.8-2-13.6-2-4.7 0-9.5 1-13.2 2-.3.1-.5-.2-.4-.5C9.7 7 14.8 4 20.5 4zm0 33c-5.9 0-11.1-3.1-14-7.899-.2-.301.1-.601.4-.5 3.9 1 8.9 2.1 13.6 2.1 5 0 9.9-1 13.601-2 .3-.1.5.2.399.5A16.422 16.422 0 0 1 20.5 37zm18.601-12.1c0 .1-.101.3-.2.3-2.5.9-10.4 3.6-18.4 3.6-7.1 0-15.6-2.699-18.3-3.6C2.1 25.2 2 25 2 24.9V16c0-.1.1-.3.2-.3 2.6-.9 10.6-3.6 18.2-3.6 7.5 0 15.899 2.7 18.5 3.6.1 0 .2.2.2.3v8.9z"/><path d="M18.7 24l6.4-3.7c.3-.2.3-.7 0-.8l-6.4-3.8c-.3-.2-.7 0-.7.4v7.4c0 .5.4.7.7.5z"/>\x3c!--Created by Nick Bluth from the Noun Project--\x3e</svg>', d.ICONS["stereo.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 16 16"><path d="M13.104 0H2.896C2.332 0 1 .392 1 .875h14C15 .392 13.668 0 13.104 0zM15 1H1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3.534a2 2 0 0 0 1.821-1.172l1.19-2.618a.5.5 0 0 1 .91 0l1.19 2.618A2 2 0 0 0 11.466 11H15a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM4 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>\x3c!--Created by Idevã Batista from the Noun Project--\x3e</svg>', d.ICONS["zoom-in.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.043 12.22a7.738 7.738 0 1 0-1.823 1.822l4.985 4.985c.503.504 1.32.504 1.822 0a1.285 1.285 0 0 0 0-1.822l-4.984-4.985zm-6.305 1.043a5.527 5.527 0 1 1 0-11.053 5.527 5.527 0 0 1 0 11.053z"/><path d="M8.728 4.009H6.744v2.737H4.006V8.73h2.738v2.736h1.984V8.73h2.737V6.746H8.728z"/>\x3c!--Created by Ryan Canning from the Noun Project--\x3e</svg>', d.ICONS["zoom-out.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.043 12.22a7.738 7.738 0 1 0-1.823 1.822l4.985 4.985c.503.504 1.32.504 1.822 0a1.285 1.285 0 0 0 0-1.822l-4.984-4.985zm-6.305 1.043a5.527 5.527 0 1 1 0-11.053 5.527 5.527 0 0 1 0 11.053z"/><path d="M4.006 6.746h7.459V8.73H4.006z"/>\x3c!--Created by Ryan Canning from the Noun Project--\x3e</svg>', d
});