//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschedule.AllocationScheduleScore', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AllocationScheduleScore',

    storeId: 'allocationschedulescore',

    url: 'business/Calls/schedulingmonthlyscore.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'idshiftd',
            type: 'int'
        }, {
            name: 'shiftd',
            type: 'auto'
        }, {
            name: 'idshiftn',
            type: 'int'
        }, {
            name: 'shiftn',
            type: 'auto'
        }
    ],

    config: {
        extraParams: {
            action: 'select',
            method: 'selectDate'
        }
    }

});