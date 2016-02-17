//@charset UTF-8
Ext.define( 'iContract.store.menu.Menu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Menu',

    requiers: [
        'iContract.model.menu.Menu'
    ],

    storeId: 'menu',

    url: 'business/Calls/menu.php',

    model: 'iContract.model.menu.Menu'

});