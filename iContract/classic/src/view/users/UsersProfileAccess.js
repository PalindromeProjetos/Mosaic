//@charset UTF-8
Ext.define( 'iContract.view.users.UsersProfileAccess', {
    extend: 'Ext.window.Window',

    xtype: 'usersprofileaccess',

    requires: [
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.window.Window',
        'Ext.grid.plugin.CellEditing'
    ],

    width: 550,
    maxHeight: 400,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'users',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar permissões de menu',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, rec) {
                return isNaN(rec.data.id);
            };

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
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'usersid'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'modulemenuid'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Menu',
                        defaults: {
                            useLabelBold: true
                        },
                        items: [
                            {
                                flex: 1,
                                name: 'name',
                                xtype: 'textfield',
                                useReadColor: true,
                                fieldLabel: 'Descrição'
                            }, {
                                xtype: 'splitter'
                            }, {
                                width: 120,
                                name: 'expireto',
                                xtype: 'datefield',
                                plugins: 'textmask',
                                fieldLabel: 'Expira em',
                                listeners: {
                                    focusleave: 'onFocusLeave'
                                }
                            }
                        ]
                    }, {
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Ações'
                    }, {
                        xtype: 'gridpanel',
                        cls: 'update-grid',
                        hideHeaders: false,
                        headerBorders: false,
                        store: 'usersmenuaction',
                        columns: [
                            {
                                text: 'Descrição',
                                sortable: false,
                                dataIndex: 'description',
                                flex: 1,
                                renderer: function(v, meta, rec) {
                                    return  '<span style="font-family: Consolas; color: white; padding: 3px; background: rgb(17, 160, 43);">' +rec.get('directive') + '</span>   ' + v;
                                }
                            }, {
                                width: 100,
                                sortable: false,
                                text: 'Expira em',
                                dataIndex: 'expireto',
                                align: 'center',
                                xtype: 'datecolumn',
                                editor: {
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    plugins: 'textmask',
                                    returnWithMask: true
                                }
                            }, {
                                width: 50,
                                sortable: false,
                                xtype: 'actioncolumn',
                                align: 'center',
                                items: [
                                    {
                                        handler: 'onActionDelete',
                                        isDisabled: isDisabled,
                                        getTip: function(v, meta, rec) {
                                            if (!isNaN(rec.data.id)) {
                                                return 'Remover permissão do menu!';
                                            } else {
                                                return '';
                                            }
                                        },
                                        getClass: function(v, meta, rec) {
                                            if (!isNaN(rec.data.id)) {
                                                return "fa fa-ban action-delete-color";
                                            } else {
                                                return "";
                                            }
                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: 'cellmodel',
                        plugins: {
                            clicksToEdit: 1,
                            ptype: 'cellediting'
                        },
                        listeners: {
                            edit: 'onEditMenuAction'
                        }
                    }
                ]
            }
        ];

    }

});