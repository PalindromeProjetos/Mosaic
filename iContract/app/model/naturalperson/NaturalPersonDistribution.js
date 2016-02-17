//@charset UTF-8
Ext.define( 'iContract.model.naturalperson.NaturalPersonDistribution', {
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
            name: 'naturalpersonid',
            type: 'int',
            critical: true
        }, {
            name: 'contractorunitid',
            type: 'int'
        }, {
            name: 'shift',
            type: 'auto',
            critical: true
        }, {
            name: 'shiftdescription',
            type: 'auto'
        }, {
            name: 'weekday',
            type: 'auto',
            critical: true
        }, {
            name: 'position',
            type: 'int'
        }, {
            name: 'sun',
            type: 'int',
            critical: true
        }, {
            name: 'mon',
            type: 'int',
            critical: true
        }, {
            name: 'tue',
            type: 'int',
            critical: true
        }, {
            name: 'wed',
            type: 'int',
            critical: true
        }, {
            name: 'thu',
            type: 'int',
            critical: true
        }, {
            name: 'fri',
            type: 'int',
            critical: true
        }, {
            name: 'sat',
            type: 'int',
            critical: true

        }, {
            name: 'sundescription',
            type: 'auto'
        }, {
            name: 'mondescription',
            type: 'auto'
        }, {
            name: 'tuedescription',
            type: 'auto'
        }, {
            name: 'weddescription',
            type: 'auto'
        }, {
            name: 'thudescription',
            type: 'auto'
        }, {
            name: 'fridescription',
            type: 'auto'
        }, {
            name: 'satdescription',
            type: 'auto'
        }, {
            name: 'sunid',
            type: 'int',
            critical: true
        }, {
            name: 'monid',
            type: 'int',
            critical: true
        }, {
            name: 'tueid',
            type: 'int',
            critical: true
        }, {
            name: 'wedid',
            type: 'int',
            critical: true
        }, {
            name: 'thuid',
            type: 'int',
            critical: true
        }, {
            name: 'friid',
            type: 'int',
            critical: true
        }, {
            name: 'satid',
            type: 'int',
            critical: true
        }
    ]

});