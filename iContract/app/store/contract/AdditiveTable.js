//@charset UTF-8
Ext.define( 'iContract.store.contract.AdditiveTable', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AdditiveTable',

    storeId: 'additivetable',

    requires: [
        'iContract.model.contract.AdditiveTable'
    ],

    url: '../iContract/business/Calls/additivetable.php',

    model: 'iContract.model.contract.AdditiveTable'

});