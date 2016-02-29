//@charset UTF-8
Ext.define( 'iSterilization.store.users.UsersMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersMenu',

    storeId: 'usersmenu',

    requires: [
        'iSterilization.model.users.UsersMenu'
    ],

    url: '../iSterilization/business/Calls/usersmenu.php',

    model: 'iSterilization.model.users.UsersMenu',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});