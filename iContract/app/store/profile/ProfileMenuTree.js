//@charset UTF-8
Ext.define( 'iContract.store.profile.ProfileMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.ProfileMenuTree',

    storeId: 'profilemenutree',

    requires: [
        'iContract.model.profile.ProfileMenuTree'
    ],

    url: '../iContract/business/Calls/profilemodulemenu.php',

    model: 'iContract.model.profile.ProfileMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});