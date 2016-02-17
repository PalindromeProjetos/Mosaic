//@charset UTF-8
Ext.define( 'iContract.model.contract.AdditiveShift', {
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
            name: 'contractorsubunitid',
            type: 'int'
        }, {
            name: 'shifttypeid',
            type: 'int'
        }, {
            name: 'amountsun',
            type: 'int'
        }, {
            name: 'amountmon',
            type: 'int'
        }, {
            name: 'amounttue',
            type: 'int'
        }, {
            name: 'amountwed',
            type: 'int'
        }, {
            name: 'amountthu',
            type: 'int'
        }, {
            name: 'amountfri',
            type: 'int'
        }, {
            name: 'amountsat',
            type: 'int'
        }
    ]

});