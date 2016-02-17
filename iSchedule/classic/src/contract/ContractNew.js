//@charset UTF-8
Ext.define( 'iSchedule.view.contract.ContractNew', {
    extend: 'Smart.ux.contract.ContractNew',

    xtype: 'contractnew',

    requires: [
        'Smart.ux.contract.ContractNew',
        'iContract.store.contractor.Contractor',
        'iContract.store.legalentity.LegalEntity',
        'iSchedule.view.contract.ContractController'
    ],

    controller: 'contract',

    initComponent: function () {
        var me = this;

        Ext.create('iContract.store.contractor.Contractor');
        Ext.create('iContract.store.legalentity.LegalEntity');

        me.callParent();
    }

});