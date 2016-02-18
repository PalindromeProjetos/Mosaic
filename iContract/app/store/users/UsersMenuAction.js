//@charset UTF-8
Ext.define( 'iContract.store.users.UsersMenuAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersMenuAction',

    storeId: 'usersmenuaction',

    requires: [
        'iContract.model.users.UsersMenuAction'
    ],

    url: '../iContract/business/Calls/usersmenuaction.php',

    model: 'iContract.model.users.UsersMenuAction',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});