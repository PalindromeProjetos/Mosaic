//@charset UTF-8
Ext.define( 'iContract.store.contractor.ContractorUnitExclud', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnitExclud',

    storeId: 'contractorunitexclud',

    requires: [
        'iContract.model.contractor.ContractorUnit'
    ],

    model: 'iContract.model.contractor.ContractorUnit',

    url: '../iContract/business/Calls/contractorunit.php',

    config: {
        extraParams: {
            params: Ext.encode(['name','shortname']),
            fields: Ext.encode(['id','name','shortname'])
        }
    }

});