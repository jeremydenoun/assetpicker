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
        'select-item': function (item) {
            console.log(item);
            if (item === 'entrypoint') {
                this.category = null;
                this.search = null;
                this.loadAssets().then((function(response) {
                    this.items = response.items;
                    this.$parent.$dispatch('select-item', this);
                }).bind(this));
            } else {
                return true;
            }
        },
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
        loadAssets: function () {
            var result = {page: 0, pages: 0, items: []};
            this.http.get(
                'mailbox/folder.php?name=' + this.config.directory
            ).then((function(response) {
                var data = JSON.parse(response.data);
                response.data = data;
                result.page = parseInt(response.data.page);
                result.pages = parseInt(response.data.pages);
                var downloadUrl = this.config.url.replace(/\/+$/, '') + '/mailbox/action.php?action=frc_dwnld&name=' + this.config.directory + "&file=";
        		if (response.data && response.data.results) {
                    response.data.results.forEach((function (asset) {
                        var item = this.createItem({
                          id: asset.id,
                          type: asset.isfolder ? 'dir' : 'file',
                          name: asset.name,
                          extension: asset.extension,
                          links: {
                            download: asset.isfolder ? downloadUrl + asset.id : null,
                            open: asset.isfolder ? downloadUrl + asset.id : null,
                          },
                          data: asset
                        });
                        result.items.push(item);
                    }).bind(this));
        	   }
            }).bind(this));
            return result.items;
        }
    }
};
