//@charset UTF-8
Ext.define( 'iSchedule.model.allocationschema.AllocationSchemaMap', {
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
            name: 'allocationschemaid',
            type: 'int',
            critical: true
        }, {
            name: 'weekday',
            type: 'auto',
            critical: true
        }, {
            name: 'schemamap',
            type: 'auto',
            critical: true
        }, {
            name: 'weekdaydescription',
            type: 'auto'
        }, {
            name: 'isselected',
            type: 'boolean',
            persist: false,
            defaultValue: false
        }, {
            name: 'weekold',
            type: 'int'
        }, {
            name: 'weeknew',
            type: 'int'
        }, {
            name: 'weekmax',
            type: 'int'
        }
    ]

});