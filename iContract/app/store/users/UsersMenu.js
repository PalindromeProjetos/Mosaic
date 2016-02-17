//@charset UTF-8
Ext.define( 'iContract.store.users.UsersMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersMenu',

    storeId: 'usersmenu',

    requires: [
        'iContract.model.users.UsersMenu'
    ],

    url: 'business/Calls/usersmenu.php',

    model: 'iContract.model.users.UsersMenu',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});