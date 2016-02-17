//@charset UTF-8
Ext.define( 'iSchedule.model.allocationschema.ContractorUnitSchema', {
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
            name: 'contractorsubunitid',
            type: 'int'
        }, {
            name: 'schedulingperiodid',
            type: 'int'
        }, {
            name: 'naturalpersonid',
            type: 'int'
        }, {
            name: 'position',
            type: 'int'
        }, {
            name: 'subunit',
            type: 'auto'
        }, {
            name: 'shift',
            type: 'auto'
        }, {
            name: 'weekday',
            type: 'auto'
        }, {
            name: 'allocationtype',
            type: 'auto'
        }, {
            name: 'allocationtypedescription',
            type: 'auto'
        }, {
            name: 'weekday',
            type: 'auto'
        }, {
            name: 'shiftdescription',
            type: 'auto'
        }, {
            name: 'mon',
            type: 'int'
        }, {
            name: 'monperson',
            type: 'auto'
        }, {
            name: 'tue',
            type: 'int'
        }, {
            name: 'tueperson',
            type: 'auto'
        }, {
            name: 'wed',
            type: 'int'
        }, {
            name: 'wedperson',
            type: 'auto'
        }, {
            name: 'thu',
            type: 'int'
        }, {
            name: 'thuperson',
            type: 'auto'
        }, {
            name: 'fri',
            type: 'int'
        }, {
            name: 'friperson',
            type: 'auto'
        }, {
            name: 'sat',
            type: 'int'
        }, {
            name: 'satperson',
            type: 'auto'
        }, {
            name: 'sun',
            type: 'int'
        }, {
            name: 'sunperson',
            type: 'auto'
        }
    ]

});