//@charset UTF-8
Ext.define( 'iContract.view.enums.ShiftTypeController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.shifttype',

    url: 'business/Calls/shifttype.php',

    fetchField: function (search, button) {
        Ext.getStore('shifttype').setParams({
            field: 'hours',
            query: search.getValue()
        }).load();
    },

    onViewEdit: function ( viewView, record ) {
        var me = this;

        me.onActionUpdate(null, null, null, null, null, record);
    },

    onChangeDutyType: function ( field, newValue, oldValue, eOpts ) {
        var hours = field.up('form').down('numberfield[name=hours]');

        hours.setReadColor(newValue);

        if(newValue) {
            hours.setValue(12);
        }
    },

    onActionUpdate: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var shifttypeedit = Ext.widget('shifttypeedit', {
                xdata: record
            });

        shifttypeedit.show(null,function(){
            this.down('form').loadRecord(record);
            this.down('numberfield[name=hours]').setReadColor(record.get('dutytype') == 'I');
        });

    },

    insertViewNew: function () {
        Ext.widget('shifttypeedit').show();
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('shifttype');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();

    }

});