//@charset UTF-8
Ext.define( 'iSchedule.view.contract.ContractView', {
    extend: 'Smart.ux.contract.ContractView',

    xtype: 'contractview',

    requires: [
        'Smart.ux.contract.ContractView',
        'iContract.store.contract.Additive',
        'iContract.store.contractor.Contractor',
        'iContract.store.contract.ContractData',
        'iContract.store.contract.AdditiveTable',
        'iContract.store.contract.AdditiveShift',
        'iContract.store.legalentity.LegalEntity',
        'iContract.store.contractor.ContractorSubUnit',
        'iSchedule.view.contract.ContractController'
    ],

    controller: 'contract',

    initComponent: function () {
        var me = this;

        Ext.create('iContract.store.contractor.Contractor');
        Ext.create('iContract.store.contract.ContractData');
        Ext.create('iContract.store.contract.AdditiveTable');
        Ext.create('iContract.store.contract.AdditiveShift');
        Ext.create('iContract.store.legalentity.LegalEntity');
        Ext.create('iContract.store.contractor.ContractorSubUnit');

        me.callParent();
    }

});