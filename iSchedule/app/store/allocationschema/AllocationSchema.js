//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.AllocationSchema', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AllocationSchema',

    storeId: 'allocationschema',

    requires: [
        'iSchedule.model.allocationschema.AllocationSchema'
    ],

    url: 'business/Calls/allocationschema.php',

    model: 'iSchedule.model.allocationschema.AllocationSchema'

});