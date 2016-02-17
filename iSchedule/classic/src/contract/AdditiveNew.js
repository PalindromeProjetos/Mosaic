//@charset UTF-8
Ext.define( 'iSchedule.view.contract.AdditiveNew', {
    extend: 'Smart.ux.contract.AdditiveNew',

    xtype: 'additivenew',

    requires: [
        'iContract.store.person.*',
        'iContract.store.contract.*',
        'Smart.ux.contract.AdditiveNew',
        'iSchedule.view.contract.ContractController'
    ],

    controller: 'contract'

});