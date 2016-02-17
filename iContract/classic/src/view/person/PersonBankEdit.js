//@charset UTF-8
Ext.define( 'iContract.view.person.PersonBankEdit', {
    extend: 'Ext.window.Window',

    xtype: 'personbankedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iContract.view.person.PersonController'
    ],

    width: 450,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'person',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Banco',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buttonAlign: 'center',

    buildItems: function () {
        var me = this;

        me.buttons = [
            {
                scope: me,
                iconCls: "fa fa-upload",
                text: 'Salvar',
                showSmartTheme: 'red',
                handler: 'updateView'
            }, {
                scope: me,
                iconCls: "fa fa-file-o",
                text: 'Novo',
                showSmartTheme: 'red',
                handler: 'insertView'
            }
        ];

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        name: 'id',
                        xtype: 'hiddenfield'
                    }, {
                        name: 'personid',
                        xtype: 'hiddenfield'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            allowBlank: false
                        },
                        defaultType: 'comboenum',
                        items: [
                            {
                                flex: 2,
                                fieldLabel: 'Tipo de conta',
                                name: 'accounttypedescription',
                                margin: '0 5 0 0'
                            }, {
                                flex: 3,
                                fieldLabel: 'Banco',
                                name: 'bankdescription',
                                margin: '0 0 0 5'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'numberfield',
                        defaults: {
                            hideTrigger: true,
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 2,
                                fieldLabel: 'Agência',
                                name: 'agency'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 3,
                                fieldLabel: 'Conta',
                                name: 'accountnumber'
                            }
                        ]
                    }, {
                        name: 'isdefault',
                        xtype: 'checkboxfield',
                        boxLabel: 'Conta principal'
                    }
                ]
            }
        ]
    },

    updateView: function () {
        var me = this,
            app = me.getController();

        app.setModuleData('personbank');
        app.setModuleForm(me.down('form'));

        app._success = function () {
            me.close();
            Ext.getStore('personbank').load();
        }

        app.updateRecord();

    },

    insertView: function () {
        var me = this;

        me.down('form').reset();

        me.down('hiddenfield[name=personid]').setValue(me.xdata.get('personid'));

    }

});