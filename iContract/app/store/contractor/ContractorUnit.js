//@charset UTF-8
Ext.define( 'iContract.store.contractor.ContractorUnit', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnit',

    storeId: 'contractorunit',

    requires: [
        'iContract.model.contractor.ContractorUnit'
    ],

    model: 'iContract.model.contractor.ContractorUnit',

    url: '../iContract/business/Calls/contractorunit.php',

    config: {
        extraParams: {
            params: Ext.encode(['name','shortname']),
            fields: Ext.encode(['id','name','shortname','filedata','fileinfo','cnesnumber','isactive'])
        }
    }

});