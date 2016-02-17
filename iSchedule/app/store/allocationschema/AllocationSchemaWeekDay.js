//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.AllocationSchemaWeekDay', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AllocationSchemaWeekDay',

    storeId: 'allocationschemaweekday',

    url: 'business/Calls/allocationschemamap.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'contractorunitid',
            type: 'int'
        }, {
            name: 'contractorunit',
            type: 'auto'
        }, {
            name: 'position',
            type: 'auto'
        }, {
            name: 'positioncute',
            type: 'int'
        }
    ]

});