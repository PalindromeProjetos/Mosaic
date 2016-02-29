//@charset UTF-8
Ext.define( 'iSterilization.model.users.UsersMenu', {
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
            name: 'usersid',
            type: 'int',
            critical: true
        }, {
            name: 'modulemenuid',
            type: 'int',
            critical: true
        }, {
            name: 'expireto',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'name',
            type: 'auto',
            persist: false
        }
    ]

});