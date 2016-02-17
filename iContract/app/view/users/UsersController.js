//@charset UTF-8
Ext.define( 'iContract.view.users.UsersController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.users',

    views: [
        'iContract.view.users.*'
    ],

    config: {
        control: {
            'usersview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'usersview/:id': {
            action: 'getUserId'
        },
        'usernew': {
            action: 'getUserNew'
        }
    },

    url: '../iContract/business/Calls/users.php',

    fetchField: function (search, button) {
        Ext.getStore('users').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getUserId: function (id) {
        var app = iContract.app.getController('App'),
            record = Ext.getStore('users').findRecord('id',id);

        app.onMainPageView({xtype: 'usersview', xdata: record});
    },

    getUserNew: function() {
        var app = iContract.app.getController('App');

        app.onMainPageView({xtype: 'usersview', xdata: null});
    },

    //routes ========================>

    onAfterRenderView: function (panel) {
        var me = this,
            form = panel.down('form'),
            portrait = panel.down('portrait'),
            menutree = Ext.getStore('usersmenutree'),
            id = form.down('hiddenfield[name=id]').getValue();

        if(!panel.xdata) return false;

        menutree.setParams({
            module: Smart.moduleName,
            usersid: panel.xdata.get('id')
        }).load();

        form.loadRecord(panel.xdata);

        portrait.setUrl(me.url);
        portrait.beFileData(panel.xdata.get('filetype'));
        form.down('textfield[name=username]').setReadColor(id.lenght != 0);

    },

    setFileData: function () {
        var me = this;

    },

    onFocusLeave: function ( field, event, eOpts ) {
        var me = this,
            view = me.getView(),
            isValid = field.isValid(),
            length = field.getValue().length;

        if((isValid) && (length != 0)) {
            me.setModuleData('usersmenu');
            me.setModuleForm(view.down('form'));

            me._success = function (batch, options) {
                Ext.getStore('usersmenutree').load({
                    scope: me,
                    callback: function(records, operation, success) {
                        if(options.operations.create) {
                            var opr = batch.getOperations()[0],
                                rec = opr.getRecords()[0];

                            Ext.getStore('usersmenuaction').setParams({
                                usersmenuid: rec.get('id')
                            }).load();
                        }

                    }
                });

            }

            me.updateRecord();
        }
    },

    onEditMenuAction: function (editor, context, eOpts) {
        context.grid.getStore().sync();
    },

    onActionUpdateTree: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            usersmenu = Ext.getStore('usersmenu'),
            menuaction = Ext.getStore('usersmenuaction'),
            profileaccess = Ext.widget('usersprofileaccess', {
                xdata: record
            });

        usersmenu.setParams({
            usersid: record.get('usersid'),
            modulemenuid: record.get('modulemenuid')
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                profileaccess.show(null,function(){
                    this.down('form').loadRecord(record);
                    menuaction.setParams({
                        usersmenuid: record.get('id')
                    }).load();
                });
            }
        });

    },

    onActionDeleteTree: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            store = grid.getStore();

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {

                    Ext.Ajax.request({
                        scope: me,
                        url: store.getUrl(),
                        params: {
                            action: 'delete',
                            rows: Ext.encode({id: record.get('usersmenuid')})
                        },
                        success: function(response, opts) {
                            store.load();
                        },
                        failure: function(response, opts) {
                        }
                    });
                }
            }
        );

    },

    onActionDelete: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var store = grid.getStore();

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    store.remove(record);
                    store.sync({
                        callback: function (batch, options) {
                            store.load();
                        }
                    });
                }
            }
        );

    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;

        Ext.getStore('users').setParams({
            method: 'selectCode',
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'usersview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('usernew');
    },

    onLoadEnd: function (field,file) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');
        field.doFileData(portrait);
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('users');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {
            var record = form.getRecord();

            view.down('textfield[name=username]').setReadColor(true);

            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(record.get('id'));
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');

        view.down('form').reset();
        view.down('textfield[name=username]').setReadColor(false);
        portrait.beFileData();
    }

});