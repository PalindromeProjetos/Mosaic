//@charset UTF-8
Ext.define( 'iContract.model.profile.ProfileMenu', {
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
            name: 'profileid',
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