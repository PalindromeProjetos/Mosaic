//@charset UTF-8
Ext.define( 'iSterilization.store.module.ModuleMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.ModuleMenuTree',

    storeId: 'modulemenutree',

    requires: [
        'iSterilization.model.module.ModuleMenuTree'
    ],

    url: '../iSterilization/business/Calls/modulemenu.php',

    model: 'iSterilization.model.module.ModuleMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});