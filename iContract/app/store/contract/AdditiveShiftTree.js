//@charset UTF-8
Ext.define( 'iContract.store.contract.AdditiveShiftTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.AdditiveShiftTree',

    storeId: 'additiveshifttree',

    requires: [
        'iContract.model.contract.AdditiveShiftTree'
    ],

    url: '../iContract/business/Calls/additiveshift.php',

    model: 'iContract.model.contract.AdditiveShiftTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});