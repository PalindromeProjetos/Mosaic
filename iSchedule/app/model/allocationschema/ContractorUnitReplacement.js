//@charset UTF-8
Ext.define( 'iSchedule.model.allocationschema.ContractorUnitReplacement', {
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
            name: 'naturalpersonidof',
            type: 'int'
        }, {
            name: 'personof',
            type: 'auto'
        }, {
            name: 'naturalpersonidto',
            type: 'int'
        }, {
            name: 'personto',
            type: 'auto'
        }, {
            name: 'shift',
            type: 'auto'
        }, {
            name: 'shiftdescription',
            type: 'auto'
        }, {
            name: 'sun',
            type: 'bool'
        }, {
            name: 'mon',
            type: 'bool'
        }, {
            name: 'tue',
            type: 'bool'
        }, {
            name: 'wed',
            type: 'bool'
        }, {
            name: 'thu',
            type: 'bool'
        }, {
            name: 'fri',
            type: 'bool'
        }, {
            name: 'sat',
            type: 'bool'
        }, {
            name: 'observation',
            type: 'auto'
        }
    ]

});