//@charset UTF-8
Ext.define( 'iContract.store.contractor.ContractorSubUnitExclud', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorSubUnitExclud',

    storeId: 'contractorsubunitexclud',

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