//@charset UTF-8
Ext.define( 'iSterilization.store.users.UsersMenuAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersMenuAction',

    storeId: 'usersmenuaction',

    requires: [
        'iSterilization.model.users.UsersMenuAction'
    ],

    url: '../iSterilization/business/Calls/usersmenuaction.php',

    model: 'iSterilization.model.users.UsersMenuAction',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});