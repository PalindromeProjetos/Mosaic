//@charset UTF-8
Ext.define( 'iContract.view.naturalperson.NaturalPersonController', {
    extend: 'iContract.view.person.PersonController',

    alias: 'controller.naturalperson',

    views: [
        'iContract.view.naturalperson.NaturalPersonView'
    ],

    requires: [
        'Ext.window.Toast',
        'iContract.view.person.PersonController'
    ],

    config: {
        control: {
            'naturalpersonview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'naturalpersonview/:id': {
            action: 'getNaturalPersonId'
        },
        'naturalpersonnew': {
            action: 'getNaturalPersonNew'
        }
    },

    url: 'business/Calls/naturalperson.php',

    fetchField: function (search, button) {
        Ext.getStore('naturalperson').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getNaturalPersonId: function (id) {
        var app = iContract.app.getController('App'),
            record = Ext.getStore('naturalperson').findRecord('id',id);

        app.onMainPageView({xtype: 'naturalpersonview', xdata: record});
    },

    getNaturalPersonNew: function() {
        var app = iContract.app.getController('App');

        app.onMainPageView({xtype: 'naturalpersonview', xdata: null});
    },

    //routes ========================>

    onAfterRenderView: function (panel) {
        var me = this,
            form = panel.down('form'),
            portrait = panel.down('portrait'),
            id = form.down('hiddenfield[name=id]').getValue();

        Ext.getStore('personbank').removeAll();
        Ext.getStore('personphone').removeAll();
        Ext.getStore('naturalpersondistribution').removeAll();

        if(!panel.xdata) {
            panel.down('textfield[name=shortname]').focus(false, 200);
            return false;
        }

        panel.down('personbank').setDisabled(false);
        panel.down('personphone').setDisabled(false);
        panel.down('naturalpersondistribution').setDisabled(false);

        Ext.getStore('naturalperson').setParams({
            query: panel.xdata.get('id'),
            method: 'selectCode'
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                form.loadRecord(record);
                Ext.getStore('naturalpersondistribution').setParams({
                    query: record.get('id'),
                    method: 'selectCode'
                }).load();
                Ext.getStore('personbank').setParams({
                    query: record.get('id'),
                    method: 'selectCode'
                }).load();
                Ext.getStore('personphone').setParams({
                    query: record.get('id'),
                    method: 'selectCode'
                }).load();
            }
        });

        portrait.setUrl(me.url);
        portrait.beFileData(panel.xdata.get('filetype'));
    },

    getDistribution: function () {
        window.open('business/Calls/naturalpersondistribution.php?action=select&method=getDistribution');
    },

    selectContractorUnit: function(combo, record, eOpts) {
        var me = this,
            sm = me.getView().down('gridpanel[name=distribution]').getSelectionModel(),
            rc = sm.getSelection()[0];

        rc.set(combo.updateField,record.get('id'));
    },

    changeContractorUnit: function ( field, newValue, oldValue, eOpts ) {
        var me = this,
            sm = me.getView().down('gridpanel[name=distribution]').getSelectionModel(),
            rc = sm.getSelection()[0];

        if(newValue == null) {
            rc.set(field.updateField,null);
        }
    },

    onDistributionCellDblClick: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this,
            fixed = [1,2,3,4,5];
            shift = record.get('shift'),
            grid = me.getView().down('naturalpersondistribution');

        if((shift == 'N' && (fixed.indexOf(cellIndex) != -1 ))) {
            var weekday = grid.columns[cellIndex].dataIndex.substring(0, 3);
            me.onDistributionEdit(null,{record: record}, {weekday: weekday});
        }
    },

    onDistributionBeforeEdit: function (editor, context, eOpts) {
        var me = this,
            fixed = [1,2,3,4,5],
            lists = [1,2,3,4,5,6,7],
            field = editor.getEditor().items,
            shift = context.record.get('shift');

        Ext.each(lists, function(value, index) {
            field.getAt(value).setShift(shift);
        });

        Ext.each(fixed, function(value, index) {
            field.getAt(value).setDisabled(shift == 'N');
            field.getAt(value).setFieldStyle((shift == 'N') ? 'color: transparent;' : 'color: black;');
        });

        return (shift != 'N') || ((shift == 'N') && (fixed.indexOf(context.colIdx) == -1 ));
    },

    onDistributionEdit: function (editor, context, eOpts) {
        var me = this,
            record = context.record;

        Ext.Ajax.request({
            url: '../iContract/business/Calls/naturalpersondistribution.php',
            params: {
                action: 'update',
                weekday: eOpts.weekday || null,
                rows: Ext.encode(record.data)
            },
            success: function(response){
                var result = Ext.decode(response.responseText);
                if(result.success == true) {
                    var rows = result.rows[0];
                    delete(rows.id);
                    record.set(rows);
                    record.commit();
                } else {
                    record.reject();
                }
            },
            failure: function(response){
                record.reject();
            }
        });
    },

    insertViewNew: function () {
        var me = this;

        me.redirectTo('naturalpersonnew');
    },

    onChangeRegistrationId: function ( field, newValue, oldValue, eOpts ) {
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('naturalperson');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {

            view.down('personbank').setDisabled(false);
            view.down('personphone').setDisabled(false);
            view.down('naturalpersondistribution').setDisabled(false);

            if(action.result.crud == 'insert') {
                var id = action.result.rows.id;

                view.down('hiddenfield[name=id]').setValue(id);

                Ext.getStore('naturalpersondistribution').setParams({
                    query: id,
                    method: 'selectCode'
                }).load();
                Ext.getStore('personbank').setParams({
                    query: id,
                    method: 'selectCode'
                }).load();
                Ext.getStore('personphone').setParams({
                    query: id,
                    method: 'selectCode'
                }).load();
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView();
            //model = Ext.create('iContract.model.naturalperson.NaturalPerson');

        me.callParent();

        //view.down('form').loadRecord(model);
        view.down('tabpanel').setActiveTab(0);

        view.down('personbank').setDisabled(true);
        view.down('personphone').setDisabled(true);
        view.down('naturalpersondistribution').setDisabled(true);

        Ext.getStore('personbank').removeAll();
        Ext.getStore('personphone').removeAll();
        Ext.getStore('naturalpersondistribution').removeAll();
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;
        me.redirectTo( 'naturalpersonview/' + record.get('id'));
    }

});