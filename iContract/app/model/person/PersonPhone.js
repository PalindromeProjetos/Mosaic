//@charset UTF-8
Ext.define( 'iContract.model.person.PersonPhone', {
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
            name: 'personid',
            type: 'int',
            critical: true
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'mobiledigit',
            type: 'auto'
        }, {
            name: 'phonetype',
            type: 'auto'
        }, {
            name: 'phonetypedescription',
            type: 'auto'
        }, {
            name: 'linetype',
            type: 'auto'
        }, {
            name: 'linetypedescription',
            type: 'auto'
        }, {
            name: 'ddd',
            type: 'auto'
        }, {
            name: 'phonenumber',
            type: 'auto'
        }, {
            name: 'phoneoperator',
            type: 'auto'
        }, {
            name: 'phoneoperatordescription',
            type: 'auto'
        }, {
            name: 'isdefault',
            type: 'boolean'
        }
    ],

    business: [
        { type: 'presence', field: 'personid' },
        { type: 'presence', field: 'phoneoperator' },
        { type: 'presence', field: 'phonenumber' },
        { type: 'presence', field: 'phonetype' },
        { type: 'presence', field: 'linetype' },
        { type: 'presence', field: 'ddd' }
    ]

});