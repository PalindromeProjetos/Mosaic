//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorController', {
    extend: 'iContract.view.person.PersonController',

    alias: 'controller.contractor',

    views: [
        'iContract.view.contractor.ContractorView'
    ],

    requires: [
        'Ext.window.Toast',
        'iContract.view.person.PersonController'
    ],

    config: {
        control: {
            'contractorview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'contractorview/:id': {
            action: 'getContractorId'
        },
        'contractorview': {
            action: 'getContractorNew'
        }
    },

    url: 'business/Calls/contractor.php',

    fetchField: function (search, button) {
        Ext.getStore('contractor').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getContractorId: function (id) {
        var app = iContract.app.getController('App'),
            record = Ext.getStore('contractor').findRecord('id',id);

        app.onMainPageView({xtype: 'contractorview', xdata: record});
    },

    getContractorNew: function() {
        var app = iContract.app.getController('App');

        app.onMainPageView({xtype: 'contractorview', xdata: null});
    },

    //routes ========================>

    onAfterRenderView: function (panel) {
        var me = this,
            form = panel.down('form'),
            portrait = panel.down('portrait'),
            id = form.down('hiddenfield[name=id]').getValue();

        if(!panel.xdata) {
            panel.down('textfield[name=shortname]').focus(false, 200);
            return false;
        }

        panel.down('personphone').setDisabled(false);

        Ext.getStore('contractor').setParams({
            query: panel.xdata.get('id'),
            method: 'selectCode'
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                form.loadRecord(record);
                Ext.getStore('personphone').setParams({
                    query: record.get('id'),
                    method: 'selectCode'
                }).load();
            }
        });

        portrait.setUrl(me.url);
        portrait.beFileData(panel.xdata.get('filetype'));
    },

    insertViewNew: function () {
        var me = this;
        me.redirectTo('contractorview');
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('contractor');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {
            var record = form.getRecord();

            view.down('personphone').setDisabled(false);

            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(record.get('id'));
            }
        }

        me.updateModule();
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;
        me.redirectTo( 'contractorview/' + record.get('id'));
    }

});