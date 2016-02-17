//@charset UTF-8
Ext.define( 'iContract.store.person.PersonPhone', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.PersonPhone',

    storeId: 'personphone',

    requires: [
        'iContract.model.person.PersonPhone'
    ],

    model: 'iContract.model.person.PersonPhone',

    url: '../iContract/business/Calls/personphone.php',

    config: {
        extraParams: {
            params: Ext.encode(['personid'])
        }
    }

});