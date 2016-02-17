//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschedule.SchedulingMonthlyPartners', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.schedulingmonthlypartners',

    storeId: 'schedulingmonthlypartners',

    requires: [
        'iSchedule.model.allocationschedule.SchedulingMonthlyPartners'
    ],

    url: 'business/Calls/schedulingmonthlypartners.php',

    model: 'iSchedule.model.allocationschedule.SchedulingMonthlyPartners'

});