//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschedule.AllocationScheduleScore', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.AllocationScheduleScore',

    storeId: 'allocationschedulescore',

    requires: [
        'iSchedule.model.allocationschedule.AllocationScheduleScore'
    ],

    url: 'business/Calls/schedulingmonthlyscore.php',

    model: 'iSchedule.model.allocationschedule.AllocationScheduleScore'

});