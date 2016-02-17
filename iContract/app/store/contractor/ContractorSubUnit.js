//@charset UTF-8
Ext.define( 'iContract.store.contractor.ContractorSubUnit', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorSubUnit',

    storeId: 'contractorsubunit',

    requires: [
        'iContract.model.contractor.ContractorSubUnit'
    ],

    model: 'iContract.model.contractor.ContractorSubUnit',

    url: '../iContract/business/Calls/contractorsubunit.php',

    config: {
        extraParams: {
            method: 'selectCode',
            fields: Ext.encode(['id','subunit','subunitdescription'])
        }
    }

});