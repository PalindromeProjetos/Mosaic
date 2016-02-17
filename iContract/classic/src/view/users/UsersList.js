//@charset UTF-8
Ext.define( 'iContract.view.users.UsersList', {
    extend: 'Ext.panel.Panel',

    xtype: 'userslist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iContract.store.users.Users'
    ],

    frame: true,
    layout: 'fit',

    controller: 'users',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Listar usuários',

    tools: [
        {
            type: 'pin',
            handler: 'onHistoryBack'
        }
    ],

    listeners: {
        afterrender: 'onFocusSearch'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iContract.store.users.Users');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'users',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome completo',
                        dataIndex: 'fullname'
                    }, {
                        flex: 1,
                        text: 'Usuário',
                        dataIndex: 'username'
                    }, {
                        flex: 1,
                        text: 'Email',
                        dataIndex: 'mainmail'
                    }, {
                        text: 'Nasceu',
                        dataIndex: 'birthdate',
                        align: 'center',
                        width: 100,
                        xtype: 'datecolumn'
                    }, {
                        xtype:'actioncolumn',
                        width: 40,
                        align: 'center',
                        iconCls: "fa fa-pencil action-update-color",
                        tooltip: 'Editar cadastro de usuários!',
                        handler: 'onViewEdit'
                    }
                ],
                dockedItems: [
                    {
                        xtype:  'panel',
                        layout: 'hbox',
                        bodyStyle: 'padding-bottom: 10px;',
                        items: [
                            {
                                flex: 1,
                                xtype: 'textfield',
                                name: 'search',
                                reference: 'search',
                                showFetch: true
                            }, {
                                xtype: 'splitter'
                            }, {
                                xtype: 'button',
                                iconCls: "fa fa-file-o",
                                handler: 'insertViewNew',
                                tooltip: 'Novo cadastro de usuários!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'users',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});