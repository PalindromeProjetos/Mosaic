//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschedule.SchedulingMonthlyScore', {
    extend: 'Smart.data.StoreBase',

    url: 'business/Calls/schedulingmonthlyscore.php',

    requires: [
        'iSchedule.model.allocationschedule.SchedulingMonthlyScore'
    ],

    model: 'iSchedule.model.allocationschedule.SchedulingMonthlyScore'

});