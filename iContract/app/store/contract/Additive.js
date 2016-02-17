//@charset UTF-8
Ext.define( 'iContract.store.contract.Additive', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Additive',

    storeId: 'additive',

    requires: [
        'iContract.model.contract.Additive'
    ],

    url: '../iContract/business/Calls/additive.php',

    model: 'iContract.model.contract.Additive'

});