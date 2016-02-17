//@charset UTF-8
Ext.define( 'iSchedule.view.contractor.ContractorSearch', {
    extend: 'Smart.ux.contractor.ContractorSearch',

    xtype: 'contractorsearch',

    requires: [
        'Smart.ux.contractor.ContractorSearch',
        'iContract.store.contractor.Contractor'
    ],

    store: 'iContract.store.contractor.Contractor'

});
