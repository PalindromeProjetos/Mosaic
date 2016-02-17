//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschedule.TMP_TurningMonthly', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.tmp_turningmonthly',

    storeId: 'tmp_turningmonthly',

    requires: [
        'iSchedule.model.allocationschedule.TMP_TurningMonthly'
    ],

    url: 'business/Calls/tmp_turningmonthly.php',

    model: 'iSchedule.model.allocationschedule.TMP_TurningMonthly'

});