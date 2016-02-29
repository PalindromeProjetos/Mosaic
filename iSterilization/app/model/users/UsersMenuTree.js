//@charset UTF-8
Ext.define( 'iSterilization.model.users.UsersMenuTree', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'usersid',
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
            name: 'router',
            type: 'auto'
        }, {
            name: 'glyph',
            type: 'auto'
        }, {
            name: 'usersmenuid',
            type: 'int'
        }, {
            name: 'leaf',
            type: 'boolean'
        }
    ]

});