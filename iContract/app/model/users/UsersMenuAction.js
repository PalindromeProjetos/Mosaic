//@charset UTF-8
Ext.define( 'iContract.model.users.UsersMenuAction', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'usersmenuid',
            type: 'int',
            critical: true
        }, {
            name: 'menuactionid',
            type: 'int',
            critical: true
        }, {
            name: 'expireto',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'directive',
            type: 'auto'
        }
    ]

});