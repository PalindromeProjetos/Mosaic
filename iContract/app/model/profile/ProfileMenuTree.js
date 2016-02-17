//@charset UTF-8
Ext.define( 'iContract.model.profile.ProfileMenuTree', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'profileid',
            type: 'int'
        }, {
            name: 'modulemenuid',
            type: 'int'
        }, {
            name: 'expireto',
            type: 'auto'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'text',
            type: 'auto'
        }, {
            name: 'glyph',
            type: 'auto'
        }, {
            name: 'leaf',
            type: 'boolean'
        }
    ]

});