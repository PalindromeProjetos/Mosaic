//@charset UTF-8
Ext.define( 'iContract.model.contract.ContractData', {
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
            name: 'observation',
            type: 'auto'
        }, {
            name: 'filedata',
            type: 'auto'
        }, {
            name: 'fileinfo',
            type: 'auto'
        }, {
            name: 'tablename',
            type: 'auto'
        }, {
            name: 'contractcode',
            type: 'auto'
        }, {
            name: 'additivecode',
            type: 'auto'
        }
    ]

});