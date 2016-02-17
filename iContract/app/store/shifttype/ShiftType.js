//@charset UTF-8
Ext.define( 'iContract.store.shifttype.ShiftType', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ShiftType',

    requires: [
        'iContract.model.shifttype.ShiftType'
    ],

    storeId: 'shifttype',

    url: 'business/Calls/shifttype.php',

    model: 'iContract.model.shifttype.ShiftType'

});