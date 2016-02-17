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
            type: 'int'
        }, {
            name: 'shifttype',
            type: 'auto'
        }, {
            name: 'shiftvalue',
            type: 'auto'
        }, {
            name: 'shiftamount',
            type: 'auto'
        }
    ]

});