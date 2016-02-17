//@charset UTF-8
Ext.define( 'iContract.store.contract.AdditiveShift', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AdditiveShift',

    storeId: 'additiveshift',

    requires: [
        'iContract.model.contract.AdditiveShift'
    ],

    url: '../iContract/business/Calls/additiveshift.php',

    model: 'iContract.model.contract.AdditiveShift'

});