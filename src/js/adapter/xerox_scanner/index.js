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
                'mailbox/folder.php?name=' + this.config.directory,
                {

                }
            ).then((function(response) {
                console.log(response);
                console.log(JSON.parse(response.data));
                return result;
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
