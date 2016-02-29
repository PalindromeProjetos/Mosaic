//@charset UTF-8
Ext.define( 'iSterilization.store.module.ModuleMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ModuleMenu',

    requires: [
        'iSterilization.model.module.ModuleMenu'
    ],

    storeId: 'modulemenu',

    url: '../iSterilization/business/Calls/modulemenu.php',

    model: 'iSterilization.model.module.ModuleMenu'

});