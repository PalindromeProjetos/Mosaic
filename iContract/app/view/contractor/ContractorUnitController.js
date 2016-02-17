//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorUnitController', {
    extend: 'iContract.view.person.PersonController',

    alias: 'controller.contractorunit',

    views: [
        'iContract.view.contractor.ContractorUnitView'
    ],

    requires: [
        'Ext.window.Toast',
        'iContract.view.person.PersonController'
    ],

    config: {
        control: {
            'contractorunitview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'contractorunitview/:id': {
            action: 'getContractorUnitId'
        },
        'contractorunitview': {
            action: 'getContractorUnitNew'
        }
    },

    url: 'business/Calls/contractorunit.php',

    fetchField: function (search, button) {
        Ext.getStore('contractorunit').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getContractorUnitId: function (id) {
        var app = iContract.app.getController('App'),
            record = Ext.getStore('contractorunit').findRecord('id',id);

        app.onMainPageView({xtype: 'contractorunitview', xdata: record});
    },

    getContractorUnitNew: function() {
        var app = iContract.app.getController('App');

        app.onMainPageView({xtype: 'contractorunitview', xdata: null});
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

        Ext.getStore('contractorunit').setParams({
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

                Ext.getStore('contractorsubunit').setParams({
                    query: record.get('id'),
                    method: 'selectCode'
                }).load();
            }
        });

        portrait.setUrl(me.url);
        portrait.beFileData(panel.xdata.get('filetype'));
        panel.down('contractorsearch[name=parentname]').setReadColor(id.lenght != 0);
    },

    insertViewNew: function () {
        var me = this;
        me.redirectTo('contractorunitview');
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('contractorunit');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {
            var record = form.getRecord();

            view.down('personphone').setDisabled(false);

            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(record.get('id'));
            }
            view.down('contractorsearch[name=parentname]').setReadColor(true);
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        me.callParent();

        view.down('contractorsubunit').setDisabled(true);
        view.down('contractorsearch[name=parentname]').setReadColor(false);
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;
        me.redirectTo( 'contractorunitview/' + record.get('id'));
    }

});