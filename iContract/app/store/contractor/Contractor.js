//@charset UTF-8
Ext.define( 'iContract.store.contractor.Contractor', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Contractor',

    requires: [
        'iContract.model.contractor.Contractor'
    ],

    storeId: 'contractor',

    model: 'iContract.model.contractor.Contractor',

    url: '../iContract/business/Calls/contractor.php',

    config: {
        extraParams: {
            params: Ext.encode(['name','shortname']),
            fields: Ext.encode(['id','name','shortname','filedata','fileinfo','cnesnumber','isactive'])
        }
    }

});