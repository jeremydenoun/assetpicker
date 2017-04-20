module.exports = {
    translations: {
        description: {
            en: 'Xerox Scanner',
            de: 'Xerox Scanner',
            fr: 'Xerox Scanner'
        }
    },
    http: function() {
        var options = {
            base: this.config.url.replace(/\/+$/, ''),
            download: this.config.url.replace(/\/+$/, '') + '/mailbox/action.php?action=frc_dwnld&name=' + this.config.directory + "&file=",
            validate: function (response) {
                console.log(response);
                response.isValid();
                return;
                response.data = response.json();
                if (response.data.response.status !== 'ok') {
                    this.login(function(username, password, callback) {
                        this.http.post('authentication/login', {id: username, password: password}, {validate: function (response) {
                            response.data = response.json();
                            response.isValid(response.data.response.status === 'ok');
                        }}).then(
                            function (response) {
                                callback(response.data.results.status !== 'invalidlogin');
                            }
                        );
                    }).then(response.reload);
                } else {
                    response.isValid();
                }
            }
        };
        return options;
    },
    data: function() {
        return {
            items: null,
            results: {}
        }
    },
    watch: {
        'appConfig.pick': {
            handler: function (config) {
                this.loadAssets({});
            },
            immediate: true
        }
    },
    events: {
        'load-more-items': function (results) {
            this.loadAssets(results);
        }
    },
    methods: {
        loadAssets: function (items) {
            var terms = this.assembleTerms();
            var query = JSON.stringify(terms);
            var result = this.results[query];
            if (!result) {
                result = {page: 0, pages: 0, items: items || []};
                result.items.total = result.items.total || result.items.length;
                this.results[query] = result;
            } else {
                if (items && result.items !== items) {
                    Array.prototype.push.apply(items, result.items);
                    items.total = result.items.total;
                    items.loading = result.items.loading;
                    items.query = query;
                    result.items = items;
                }
                if (result.page === result.pages) {
                    return this.$promise(function (resolve) {
                        resolve(result);
                    });
                }
            }

            result.items.loading = true;
            result.items.query = query;

            return this.http.get(
                'mailbox/folder.php?name=' + this.config.directory,
                {

                }
            ).then((function(response) {
                console.log(response);
                if (result.items.query === query) {
                    result.page = parseInt(response.data.response.page);
                    result.pages = parseInt(response.data.response.pages);
                    result.items.total = parseInt(response.data.response.totalhits);
                    result.items.loading = false;
                    var downloadUrl = this.config.url.replace(/\/+$/, '') + '/mailbox/action.php?action=frc_dwnld&name=' + this.config.directory + "&file=";
                    response.data.results.forEach((function (asset) {
                        var item = this.createItem({
                            id: asset.id,
                            query: query,
                            type: asset.isfolder ? 'file' : 'dir',
                            name: asset.assettitle || asset.name || asset.primaryfile,
                            title: asset.assettitle,
                            extension: asset.fileformat.id,
                            created: this.parseDate(asset.assetcreationdate || asset.assetaddeddate),
                            modified: this.parseDate(asset.assetmodificationdate),
                            links: {
                                download: downloadUrl + asset.id
                            },
                            data: asset
                        });
                        result.items.push(item);
                    }).bind(this));
                }
                return result;
            }).bind(this));
        }
    }
};
