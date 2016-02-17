//@charset UTF-8
Ext.define( 'iContract.store.legalentity.LegalEntity', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.LegalEntity',

    storeId: 'legalentity',

    requires: [
        'iContract.model.legalentity.LegalEntity'
    ],

    model: 'iContract.model.legalentity.LegalEntity',

    url: '../iContract/business/Calls/legalentity.php',

    config: {
        extraParams: {
            params: Ext.encode(['name','shortname']),
            fields: Ext.encode(['id','name','shortname','filedata','fileinfo','cnesnumber','isactive'])
        }
    }

});