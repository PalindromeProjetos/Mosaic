//@charset UTF-8
Ext.define( 'iContract.model.contract.Additive', {
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
            name: 'contractid',
            type: 'int'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'datesign',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'periodof',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'periodto',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'note',
            type: 'auto'
        }, {
            name: 'additivenumber',
            type: 'auto'
        }, {
            name: 'filedata',
            type: 'auto'
        }, {
            name: 'fileinfo',
            type: 'auto'
        }, {
            name: 'additivestatus',
            type: 'auto'
        }
    ]

});