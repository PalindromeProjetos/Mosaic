//@charset UTF-8
Ext.define( 'iSchedule.view.contract.AdditiveLog', {
    extend: 'Smart.ux.contract.AdditiveLog',

    xtype: 'additivelog',

    requires: [
        'iContract.store.contract.*',
        'Smart.ux.contract.AdditiveLog',
        'iSchedule.view.contract.ContractController'
    ],

    controller: 'contract'

});