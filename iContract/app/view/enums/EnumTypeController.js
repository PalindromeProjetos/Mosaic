//@charset UTF-8
Ext.define( 'iContract.view.enums.EnumTypeController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.enumtype',

    routes: {
        'enumtypeview/:id': {
            action: 'getEnumTypeId'
        },
        'enumtypeview': {
            action: 'getEnumTypeNew'
        }
    },

    url: 'business/Calls/enumtype.php',

    //routes ===================================>>

    getEnumTypeNew: function() {
        var app = iContract.app.getController('App');

        app.onMainPageView({xtype: 'enumtypeview', xdata: null});
    },

    getEnumTypeId: function (id) {
        var app = iContract.app.getController('App'),
            record = Ext.getStore('enumtype').findRecord('id',id);

        app.onMainPageView({xtype: 'enumtypeview', xdata: record});
    },

    //routes ===================================>>

    fetchField: function (search, button) {
        Ext.getStore('enumtype').setParams({
            field: 'name',
            query: search.getValue()
        }).load();
    },

    onListViewEdit: function (viewView, record, item, index, e, eOpts) {
        var me = this;

        me.onViewEdit(viewView, null, null, null, e, record);
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;

        Ext.getStore('enumtype').setParams({
            method: 'selectCode',
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'enumtypeview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function () {
        var me = this;
        me.redirectTo('enumtypeview');
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('enumtype');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    },

    onAfterRenderView: function (container) {
        var me = this,
            enumtype = Ext.getStore('enumtype'),
            enumtypelist = Ext.getStore('enumtypelist'),
            form = container.down('form[name=enumtype]');

        if(!container.xdata) return false;

        enumtype.setParams({
            method: 'selectCode',
            rows: Ext.encode({ id: container.xdata.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];

                form.loadRecord(record);

                enumtypelist.setParams({
                    method: 'selectCode',
                    query: record.get('id')
                }).load();

                form.down('button[handler=updateView]').setDisabled(record.get('reserved'));
                form.down('textareafield[name=observation]').setReadColor(record.get('reserved'));

            }
        });

    },

    onActionUpdate: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var typelistedit = Ext.widget('enumtypelistedit', {
                xdata: record
            });

        typelistedit.show(null,function(){
            this.down('form').loadRecord(record);
        });

    },

    insertEnumList: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
        view.down('hiddenfield[name=enumtypeid]').setValue(view.xdata.get('enumtypeid'));
    },

    updateEnumList: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('enumtypelist');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    }

});