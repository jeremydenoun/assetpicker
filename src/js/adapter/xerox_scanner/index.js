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
            base: this.config.url.replace(/\/+$/, '')
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
            var result = {page: 0, pages: 0, items: items || []};
            this.results = result;

            return this.http.get(
                'mailbox/folder.php?name=' + this.config.directory
            ).then((function(response) {
                var data = JSON.parse(response.data);
                response.data = data;
                result.page = parseInt(response.data.page);
                result.pages = parseInt(response.data.pages);
                result.items.total = parseInt(response.data.total);
                result.items.loading = false;
                var downloadUrl = this.config.url.replace(/\/+$/, '') + '/mailbox/action.php?action=frc_dwnld&name=' + this.config.directory + "&file=";
                response.data.results.forEach((function (asset) {
                    var item = this.createItem({
                        id: asset.id,
                        type: asset.isfolder ? 'file' : 'dir',
                        name: asset.name,
                        extension: asset.name,
                        links: {
                            download: downloadUrl + asset.id,
                            open: downloadUrl + asset.id,
                        },
                        data: asset
                    });
                    result.items.push(item);
                }).bind(this));

                return result;
            }).bind(this));
        }
    }
};
