var Vue = require('vue');
Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true

var Item = require('../model/item');

var extend = require('extend');
var fecha = require('fecha');

Vue.http.interceptors.push(function(options, next) {
    next(function(response) {
        response.options = options;
    });
});

var UrlClass = function(url) {
    this.raw = url;
};
UrlClass.prototype.toString = function () {
    return encodeURIComponent(this.raw);
};

module.exports = {
    template: '<div><tree :fetch="fetch"></tree></div>',
    props: {
        config: {
            type: Object,
            required: true
        },
        fetch: Boolean,
        storage: {
            type: String,
            required: true
        }
    },
    stored: {
        // store a data variable on storage basis:
        // token: true
        // store something globally:
        // token: 'github'
    },
    data: function() {
        var data = {
            loginDone: false,
            currentLogin: null,
            appConfig: require('../config'),
            _lastRequestTime: null
        };
        if (!this.$options.watch) {
            this.$options.watch = {};
        }
        Object.keys(this.$options.stored).forEach(function(key) {
            var storageKey;
            if (this.$options.stored[key] === true) {
                storageKey = this.storage + '_local_' + key;
            } else {
                storageKey = this.$options.stored[key] + '_' + key;
            }
            data[key] = localStorage.getItem(storageKey);
            if (data[key]) {
                data[key] = JSON.parse(data[key]);
            }
            this.$options.watch[key] = function(data) {
                if (data === null) {
                    localStorage.removeItem(storageKey)
                } else {
                    localStorage.setItem(storageKey, JSON.stringify(data));
                }
            };
        }.bind(this));
        return data;
    },
    computed: {
        util: function() {
            return require('../util');
        },
        proxy: function () {
            if (this.config.proxy || this.appConfig.proxy.all && this.config.proxy !== false) {
                return (typeof this.config.proxy === 'object' ? this.config : this.appConfig).proxy;
            }
            return false;
        },
        url: function () {
            var proxyUrl, $proxy;
            if (this.proxy) {
                proxyUrl = this.proxy.url;
                $proxy = new Vue({
                    data: { url: null }
                });
            }
            return function (url, base) {
                if (base) {
                    url = (base + '').replace(/\/+$/, '') + '/' + (url + '').replace(/^\/+/, '');
                }
                if ($proxy) {
                    $proxy.url = new UrlClass(url);
                    $proxy.storage = this.storage;
                    $proxy.base = base ? (base + '').replace(/\/+$/, '') : "";
                    $proxy.dir = "";
                    console.log(this);
                    return $proxy.$interpolate(proxyUrl);
                }
                return url;
            }
        },
        http: function() {
            if (typeof this.$options.http === 'function') {
                this.$options.http = this.$options.http.call(this);
            }
            if (this.config.http) {
                extend(true, this.$options.http, this.config.http);
            }
            var api = {},
                request = (function (options) {
                    if (!options.keepUrl) {
                        options.url = this.url(options.url, options.base);
                        options.keepUrl = true;
                    }
                    if (this.proxy && this.proxy.credentials !== options.credentials) {
                        options.credentials = this.proxy.credentials;
                    }
                    return this.$promise(function (resolve, reject) {
                        var load = function() {
                                this.$http(options).then(
                                    function(response) {
                                        if (response.options.validate) {
                                            response.reload = function () {
                                                return request(options).then(resolve, reject);
                                            };
                                            response.isValid = function (isValid) {
                                                if (isValid === false) {
                                                    throw 'Invalid response';
                                                } else {
                                                    resolve(response);
                                                }
                                            };
                                            response.options.validate.call(this, response, resolve);
                                        } else {
                                            resolve(response);
                                        }
                                    }.bind(this),
                                    reject
                                );
                            }.bind(this);
                        if (options.throttle) {
                            var throttle = function () {
                                var now = Date.now();
                                if (!this._lastRequestTime || now - options.throttle >= this._lastRequestTime) {
                                    this._lastRequestTime = now;
                                    load();
                                } else {
                                    window.setTimeout(throttle, options.throttle - (this._lastRequestTime ? now - this._lastRequestTime : 0));
                                }
                            }.bind(this);
                            throttle();
                        } else {
                            load();
                        }
                    });
                }).bind(this);

            ['get', 'delete', 'head', 'jsonp'].forEach(function(method) {
                api[method] = function (url, options) {
                    options = extend({}, this.$options.http, options);
                    options.method = method.toUpperCase();
                    options.url = url;
                    return request(options);
                }.bind(this)
            }.bind(this));

            ['post', 'put', 'patch'].forEach(function(method) {
                api[method] = function (url, data, options) {
                    options = extend({}, this.$options.http, options);
                    options.method = method.toUpperCase();
                    options.url = url;
                    options.body = data;
                    return request(options);
                }.bind(this)
            }.bind(this));
            return api;
        }
    },
    dateFormat: undefined,
    methods: {
        t: function(key) {
            if (key.indexOf('.') < 0) {
                key = this.config.adapter + '.' + key;
            }
            return this.$root.t(key);
        },
        sortItems: function (items) {
            return items.sort(function (a, b) {
                if (a.type === 'dir' && b.type !== 'dir') {
                    return -1;
                } else if (a.type !== 'dir' && b.type === 'dir') {
                    return 1;
                }
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
        },
        parseDate: function (date) {
            if (date) {
                return fecha.parse(date, this.$options.dateFormat);
            }
        },
        createItem: function (data) {
            data.storage = this.storage;
            return new Item(data, this.appConfig.thumbnails);
        },
        login: function(authenticate) {
            if (!this.currentLogin) {
                if (this.loginDone) {
                    throw 'Login already done';
                }
                var open = this.$parent.open;
                this.$parent.open = true;
                var Login = this.$options.components['login'];
                var login = new Login({
                    el: this.$el.appendChild(document.createElement('div')),
                    parent: this
                });
                if (this.config.loginHint) {
                    login.hint = this.config.loginHint;
                }
                this.currentLogin = login.login(authenticate.bind(this)).then((function () {
                    this.loginDone = true;
                    this.$parent.open = open;
                }).bind(this));
            }
            return this.currentLogin;
        }
    },
    components: {
        login: require('../components/login')
    }
};
