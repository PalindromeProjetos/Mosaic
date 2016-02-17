//@charset UTF-8
Ext.define( 'iContract.model.enums.EnumTypeList', {
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
            name: 'enumtypeid',
            type: 'int',
            critical: true
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }, {
            name: 'orderby',
            type: 'int'
        }, {
            name: 'reserved',
            type: 'boolean'
        }
    ]

});