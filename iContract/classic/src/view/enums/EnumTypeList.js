//@charset UTF-8
Ext.define( 'iContract.view.enums.EnumTypeList', {
    extend: 'Ext.panel.Panel',

    xtype: 'enumtypelist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iContract.store.enums.EnumType'
    ],

    frame: true,
    layout: 'fit',

    controller: 'enumtype',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Listar Enumeradores',

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

        Ext.create('iContract.store.enums.EnumType');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'enumtype',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onListViewEdit'
                },
                columns: [
                    {
                        text: 'Descrição',
                        dataIndex: 'description',
                        flex: 1
                    }, {
                        text: 'Nome',
                        dataIndex: 'name',
                        width: 250
                    }, {
                        width: 40,
                        align: 'center',
                        renderer: function (value, meta, rec) {
                            return rec.get('reserved') ? '<div style="color: red; font-size: 20px;"><i class="fa fa-lock"></i></div>' : '';
                        }
                    }, {
                        xtype:'actioncolumn',
                        width: 50,
                        align: 'center',
                        handler: 'onViewEdit',
                        iconCls: "fa fa-pencil action-update-color",
                        tooltip: 'Editar cadastro de enumeradores!'
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
                                disabled: true,
                                iconCls: "fa fa-file-o",
                                handler: 'insertViewNew',
                                tooltip: 'Novo cadastro de enumerador!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'enumtype',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});