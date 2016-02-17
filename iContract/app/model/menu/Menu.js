//@charset UTF-8
Ext.define( 'iContract.model.menu.Menu', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'router',
            type: 'auto'
        }, {
            name: 'glyph',
            type: 'auto'
        }, {
            name: 'orderby',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean'
        }
    ]

});