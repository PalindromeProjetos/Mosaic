//@charset UTF-8
Ext.define( 'iContract.store.module.ModuleMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ModuleMenu',

    requires: [
        'iContract.model.module.ModuleMenu'
    ],

    storeId: 'modulemenu',

    url: 'business/Calls/modulemenu.php',

    model: 'iContract.model.module.ModuleMenu'

});