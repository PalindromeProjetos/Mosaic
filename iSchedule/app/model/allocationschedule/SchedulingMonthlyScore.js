//@charset UTF-8
Ext.define( 'iSchedule.model.allocationschedule.SchedulingMonthlyScore', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'schedulingmonthlypartnersid',
            type: 'int'
        }, {
            name: 'naturalpersonid',
            type: 'int'
        }, {
            name: 'naturalperson',
            type: 'auto'
        }, {
            name: 'scoretype',
            type: 'auto',
            critical: true
        }, {
            name: 'changedate',
            type: 'auto',
            convert: function (value,record) {
                return Ext.util.Format.dateRenderer('d/m/Y g:i:s A')(value);
            }
        }, {
            name: 'dutyfraction',
            type: 'auto'
        }, {
            name: 'username',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }
    ]

});