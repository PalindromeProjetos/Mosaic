//@charset UTF-8
Ext.define( 'iContract.view.contract.AdditiveNew', {
    extend: 'Smart.ux.contract.AdditiveNew',

    xtype: 'additivenew',

    requires: [
        'iContract.store.person.*',
        'iContract.store.contract.*',
        'Smart.ux.contract.AdditiveNew',
        'iContract.view.contract.ContractController'
    ],

    controller: 'contract'

});