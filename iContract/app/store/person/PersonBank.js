//@charset UTF-8
Ext.define( 'iContract.store.person.PersonBank', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.PersonBank',

    storeId: 'personbank',

    requires: [
        'iContract.model.person.PersonBank'
    ],

    model: 'iContract.model.person.PersonBank',

    url: '../iContract/business/Calls/personbank.php',

    config: {
        extraParams: {
            params: Ext.encode(['personid'])
        }
    }

});