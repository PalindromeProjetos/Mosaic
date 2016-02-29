//@charset UTF-8
Ext.define( 'iSterilization.store.users.Users', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Users',

    storeId: 'users',

    requires: [
        'iSterilization.model.users.Users'
    ],

    url: '../iSterilization/business/Calls/users.php',

    model: 'iSterilization.model.users.Users',

    config: {
        extraParams: {
            params: Ext.encode(['username','fullname'])
        }
    }

});