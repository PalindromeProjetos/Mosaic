//@charset UTF-8
Ext.define( 'iContract.store.users.UsersMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.UsersMenuTree',

    storeId: 'usersmenutree',

    requires: [
        'iContract.model.users.UsersMenuTree'
    ],

    url: 'business/Calls/usersmenu.php',

    model: 'iContract.model.users.UsersMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});