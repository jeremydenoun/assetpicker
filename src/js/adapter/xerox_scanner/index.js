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
            lastId: 1,
            items: null
        }
    },
    events: {
        'load-items': function (tree) {
            tree.items = this.loadAssets();
        },
        'load-more-items': function (items) {
            this.loadAssets().forEach(function(item) {
                    items.push(item);
            });
        }
    },
    methods: {
        item: function(extension, thumbnail) {
            return this.createItem({
                id: '' + (this.lastId++),
                type: extension ? 'file' : 'dir',
                extension: extension,
                name: 'Random ' + (extension || ' directory') + (thumbnail ? ' with thumb' : '') + ' ' + this.lastId,
                thumbnail: thumbnail
            });
        },
        loadAssets: function () {
            var result = {page: 0, pages: 0, items: []};
            this.http.get(
                'mailbox/folder.php?name=' + this.config.directory
            ).then((function(response) {
                var data = JSON.parse(response.data);
                response.data = data;
                result.page = parseInt(response.data.page);
                result.pages = parseInt(response.data.pages);
                //result.items.total = parseInt(response.data.total);
                //result.items.loading = false;
                var downloadUrl = this.config.url.replace(/\/+$/, '') + '/mailbox/action.php?action=frc_dwnld&name=' + this.config.directory + "&file=";
                response.data.results.forEach((function (asset) {
                    var item = this.createItem({
                        id: asset.id,
                        type: asset.isfolder ? 'dir' : 'file',
                        name: asset.name,
                        extension: asset.extension,
                        links: {
                            download: downloadUrl + asset.id,
                            open: downloadUrl + asset.id,
                        },
                        data: asset
                    });
                    
                    result.items.push(item);
                }).bind(this));
            }).bind(this));

            result.items.push(this.item('jpeg', 'http://lorempixel.com/nature/200/160'));
            console.log(result);
            return result.items;
        }
    }
};
