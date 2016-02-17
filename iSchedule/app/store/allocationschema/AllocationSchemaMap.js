//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.AllocationSchemaMap', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AllocationSchemaMap',

    storeId: 'allocationschemamap',

    requires: [
        'iSchedule.model.allocationschema.AllocationSchemaMap'
    ],

    url: 'business/Calls/allocationschemamap.php',

    model: 'iSchedule.model.allocationschema.AllocationSchemaMap'

});