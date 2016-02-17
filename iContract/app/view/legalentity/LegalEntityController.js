//@charset UTF-8
Ext.define( 'iContract.view.legalentity.LegalEntityController', {
    extend: 'iContract.view.person.PersonController',

    alias: 'controller.legalentity',

    views: [
        'iContract.view.legalentity.LegalEntityView'
    ],

    requires: [
        'Ext.window.Toast',
        'iContract.view.person.PersonController'
    ],


    config: {
        control: {
            'legalentityview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'legalentityview/:id': {
            action: 'getLegalEntityId'
        },
        'legalentityview': {
            action: 'getLegalEntityNew'
        }
    },

    url: 'business/Calls/legalentity.php',

    fetchField: function (search, button) {
        Ext.getStore('legalentity').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getLegalEntityId: function (id) {
        var app = iContract.app.getController('App'),
            record = Ext.getStore('legalentity').findRecord('id',id);

        app.onMainPageView({xtype: 'legalentityview', xdata: record});
    },

    getLegalEntityNew: function() {
        var app = iContract.app.getController('App');

        app.onMainPageView({xtype: 'legalentityview', xdata: null});
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

        Ext.getStore('legalentity').setParams({
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
        me.redirectTo('legalentityview');
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('legalentity');
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
        me.redirectTo( 'legalentityview/' + record.get('id'));
    }

});