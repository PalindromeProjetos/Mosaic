//@charset UTF-8
Ext.define( 'iContract.view.contract.AdditiveLog', {
    extend: 'Smart.ux.contract.AdditiveLog',

    xtype: 'additivelog',

    requires: [
        'iContract.store.contract.*',
        'Smart.ux.contract.AdditiveLog',
        'iContract.view.contract.ContractController'
    ],

    controller: 'contract'

});