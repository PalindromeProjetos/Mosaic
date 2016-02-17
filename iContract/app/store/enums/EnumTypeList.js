//@charset UTF-8
Ext.define( 'iContract.store.enums.EnumTypeList', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EnumTypeList',

    requires: [
        'iContract.model.enums.EnumTypeList'
    ],

    storeId: 'enumtypelist',

    url: 'business/Calls/enumtypelist.php',

    model: 'iContract.model.enums.EnumTypeList'

});