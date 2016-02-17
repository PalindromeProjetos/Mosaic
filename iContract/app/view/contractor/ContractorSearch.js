//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorSearch', {
    extend: 'Smart.ux.contractor.ContractorSearch',

    alias: 'widget.contractorsearch',

    requires: [
        'Smart.ux.contractor.ContractorSearch',
        'iContract.store.contractor.Contractor'
    ],

    store: 'iContract.store.contractor.Contractor'

});
