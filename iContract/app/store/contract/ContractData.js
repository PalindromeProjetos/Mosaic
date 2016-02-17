//@charset UTF-8
Ext.define( 'iContract.store.contract.ContractData', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractData',

    storeId: 'contractdata',

    requires: [
        'iContract.model.contract.ContractData'
    ],

    url: '../iContract/business/Calls/contractdata.php',

    model: 'iContract.model.contract.ContractData'

});