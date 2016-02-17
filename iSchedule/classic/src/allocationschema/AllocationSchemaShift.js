//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.AllocationSchemaShift', {
    extend: 'Smart.form.field.ComboEnum',

    xtype: 'allocationschemasearchshift',

    requires: [
        'Smart.form.field.ComboEnum'
    ],

    hideTrigger: true,
    matchFieldWidth: false,
    listConfig: {  width: 160 },

    buildCombo: function () {
        var me = this;

        me.callParent();
        me.valueField = me.displayField;
    },

    listeners: {
        select: 'selectAllocationSchema'
        //change: 'changeAllocationSchema'
    }

});
