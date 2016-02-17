//@charset UTF-8
Ext.define( 'iContract.model.contract.AdditiveTable', {
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
            name: 'additiveid',
            type: 'int',
            critical: true
        }, {
            name: 'isactive',
            type: 'bool'
        }, {
            name: 'shiftvalue',
            type: 'auto'
        }, {
            name: 'shiftamount',
            type: 'auto',
            critical: true
        }, {
            name: 'shifttype',
            type: 'auto',
            critical: true
        }, {
            name: 'shifttypedescription',
            type: 'auto'
        }
    ]

});