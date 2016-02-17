//@charset UTF-8
Ext.define( 'iContract.store.contract.Contract', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Contract',

    storeId: 'contract',

    requires: [
        'iContract.model.contract.Contract'
    ],

    url: '../iContract/business/Calls/contract.php',

    model: 'iContract.model.contract.Contract'

});