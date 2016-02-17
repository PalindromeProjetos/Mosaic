//@charset UTF-8
Ext.define( 'iContract.store.enums.EnumType', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EnumType',

    requires: [
        'iContract.model.enums.EnumType'
    ],

    storeId: 'enumtype',

    url: 'business/Calls/enumtype.php',

    model: 'iContract.model.enums.EnumType'

});