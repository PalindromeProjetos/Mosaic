//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorUnitSearch', {
    extend: 'Smart.ux.contractor.ContractorUnitSearch',

    xtype: 'contractorunitsearch',

    requires: [
        'Smart.ux.contractor.ContractorUnitSearch',
        'iContract.store.contractor.ContractorUnit'
    ],

    store: 'iContract.store.contractor.ContractorUnit'

});
