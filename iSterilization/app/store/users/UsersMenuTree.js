//@charset UTF-8
Ext.define( 'iSterilization.store.users.UsersMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.UsersMenuTree',

    storeId: 'usersmenutree',

    requires: [
        'iSterilization.model.users.UsersMenuTree'
    ],

    url: '../iSterilization/business/Calls/usersmenu.php',

    model: 'iSterilization.model.users.UsersMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});