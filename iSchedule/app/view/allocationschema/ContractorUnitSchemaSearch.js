//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.ContractorUnitSchemaSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'contractorunitschemasearch',

    requires: [
        'iSchedule.store.allocationschema.ContractorUnitSchemaSearch'
    ],

    displayField: 'shortname',

    store: 'iSchedule.store.allocationschema.ContractorUnitSchemaSearch',

    // template for the content List
    tpl: [
        '<tpl style:"font-size: 14px;" for=".">',
            '<div class="x-boundlist-item" style="font-family: Monda;">' +
                '<a style="font-size: 17px; color:#3333FF; display: block;">{shortname}</a>' +
                '<a style="font-size: 14px; color:#990000; display: block;">{subunitdescription}</a>' +
            '</div>',
        '</tpl>'
    ]

});
