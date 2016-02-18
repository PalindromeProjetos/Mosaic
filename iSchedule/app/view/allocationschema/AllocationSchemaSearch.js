//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.AllocationSchemaSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'allocationschemasearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iSchedule.store.allocationschema.AllocationSchema'
    ],

    pageSize: 0,
    editable: false,

    fieldLabel: 'Período',

    displayField: 'month',

    store: 'iSchedule.store.allocationschema.AllocationSchema',

    // template for the content List
    tpl: [
        '<tpl style:"font-size: 14px;" for=".">',
            '<div class="x-boundlist-item" style="font-family: Monda;">' +
                '<span style="font-size: 17px; color:#3333FF; display: block; font-family: Monda;">{perioddescription}</span>' +
                '<span style="font-size: 14px; color:#990000; display: block; font-family: Monda;">{periodof} - {periodto}</span>' +
            '</div>',
        '</tpl>'
    ],

    // template for the content displayField
    displayTpl: [
        '<tpl for=".">',
            '{periodof} - {periodto}',
        '</tpl>'
    ]

});
