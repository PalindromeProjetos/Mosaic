//@charset UTF-8
Ext.define( 'iContract.view.person.PersonList', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*'
    ],

    frame: true,
    layout: 'fit',

    cls: 'panel-frame',

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

    makeColumn: function () {
        return [
            {
                text: 'Nome',
                dataIndex: 'name',
                flex: 1
            }, {
                text: 'Nome curto',
                dataIndex: 'shortname',
                flex: 1
            }, {
                width: 150,
                text: 'CNES',
                dataIndex: 'cnesnumber'
            }, {
                xtype:'actioncolumn',
                width: 50,
                align: 'center',
                handler: 'onViewEdit',
                iconCls: "fa fa-pencil action-update-color",
                tooltip: 'Editar cadastro!'
            }
        ];
    },

    buildItems: function () {
        var me = this,
            store = Ext.create(me.store);

        me.items = [
            {
                xtype: 'gridpanel',
                store: store,
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',

                listeners: {
                    itemdblclick: 'onListViewEdit'
                },

                columns: me.makeColumn(),

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
                                tooltip: 'Novo cadastro!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: store,
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});