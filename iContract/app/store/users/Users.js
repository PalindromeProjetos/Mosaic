//@charset UTF-8
Ext.define( 'iContract.store.users.Users', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Users',

    storeId: 'users',

    requires: [
        'iContract.model.users.Users'
    ],

    url: 'business/Calls/users.php',

    model: 'iContract.model.users.Users',

    config: {
        extraParams: {
            params: Ext.encode(['username','fullname'])
        }
    }

});