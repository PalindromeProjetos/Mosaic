//@charset UTF-8
Ext.define( 'iContract.store.profile.ProfileMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ProfileMenu',

    storeId: 'profilemenu',

    requires: [
        'iContract.model.profile.ProfileMenu'
    ],

    url: 'business/Calls/profilemenu.php',

    model: 'iContract.model.profile.ProfileMenu'

});