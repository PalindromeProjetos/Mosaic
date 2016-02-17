//@charset UTF-8
Ext.define( 'iContract.model.shifttype.ShiftType', {
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
            name: 'shift',
            type: 'auto'
        }, {
            name: 'shiftdescription',
            type: 'auto'
        }, {
            name: 'dutytype',
            type: 'auto'
        }, {
            name: 'dutytypedescription',
            type: 'auto'
        }, {
            name: 'hours',
            type: 'int'
        }, {
            name: 'validityof',
            type: 'auto'
        }, {
            name: 'validityto',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }
    ],

    business: [
        { type: 'presence', field: 'hours' },
        { type: 'presence', field: 'dutytype' },
        { type: 'presence', field: 'validityof' },
        { type: 'presence', field: 'validityto' },
        { type: 'presence', field: 'shiftdescription' }
    ]

});