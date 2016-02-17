//@charset UTF-8
Ext.define( 'iSchedule.model.allocationschedule.SchedulingMonthlyPartners', {
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
            name: 'schedulingmonthlyid',
            type: 'int'
        }, {
            name: 'naturalpersonid',
            type: 'int'
        }, {
            name: 'naturalperson',
            type: 'auto'
        }, {
            name: 'contractorunitid',
            type: 'int'
        }, {
            name: 'contractorunit',
            type: 'auto'
        }, {
            name: 'position',
            type: 'int'
        }, {
            name: 'shift',
            type: 'auto'
        }, {
            name: 'shiftdescription',
            type: 'auto'
        }, {
            name: 'subunit',
            type: 'auto'
        }, {
            name: 'subunitdescription',
            type: 'auto'
        }, {
            name: 'allocationschema',
            type: 'auto'
        }, {
            name: 'allocationschemadescription',
            type: 'auto'
        }, {
            name: 'releasetype',
            type: 'auto'
        }, {
            name: 'releasetypedescription',
            type: 'auto'
        }, {
            name: 'shifthours',
            type: 'int'
        }, {
            name: 'username',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }, {
            name: 'observationlog',
            type: 'auto'
        }
    ]

});