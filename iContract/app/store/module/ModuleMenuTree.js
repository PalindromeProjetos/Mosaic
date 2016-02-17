//@charset UTF-8
Ext.define( 'iContract.store.module.ModuleMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.ModuleMenuTree',

    storeId: 'modulemenutree',

    requires: [
        'iContract.model.module.ModuleMenuTree'
    ],

    url: '../iContract/business/Calls/modulemenu.php',

    model: 'iContract.model.module.ModuleMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});