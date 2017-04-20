module.exports = {
    translations: {
        description: {
            en: 'Xerox Scanner',
            de: 'Xerox Scanner',
            fr: 'Xerox Scanner'
        }
    },
    http: {
        base: 'http://printer-01',
        list: '/mailbox/folder.php?name=_PUBLIC',
        download: '/mailbox/action.php?action=frc_dwnld&name=_PUBLIC&file='
    },
    events: {
        'load-items': function (tree) {
            tree.items = this.createItems();
        },
        'load-more-items': function (items) {
            this.createItems().forEach(function(item) {
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
        createItems: function () {
            var items = [],
                extensions = ['txt', 'pdf', 'xls', 'doc', 'pot', 'jpeg', 'zip', 'mp3', 'avi', 'html', 'any'];
            items.push(this.item());
            for (var i = 0, l = extensions.length; i < l; i++) {
                items.push(this.item(extensions[i]));
            }
            items.push(this.item('jpeg', 'http://lorempixel.com/nature/160/200'));
            items.push(this.item('jpeg', 'http://lorempixel.com/nature/200/160'));
            items.total = 10 * items.length;
            return items;
        }
    }
};
