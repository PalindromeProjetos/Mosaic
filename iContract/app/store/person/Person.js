//@charset UTF-8
Ext.define( 'iContract.store.person.Person', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Person',

    requires: [
        'iContract.model.person.Person'
    ],

    storeId: 'person',

    model: 'iContract.model.person.Person',

    url: '../iContract/business/Calls/person.php'

});