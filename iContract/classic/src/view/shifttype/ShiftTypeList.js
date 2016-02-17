//@charset UTF-8
Ext.define( 'iContract.view.shifttype.ShiftTypeList', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.shifttypelist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iContract.store.shifttype.ShiftType'
    ],

    frame: true,
    layout: 'fit',

    controller: 'shifttype',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Listar plantões',

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

        Ext.create('iContract.store.shifttype.ShiftType');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'shifttype',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        text: 'Turno',
                        dataIndex: 'shiftdescription',
                        flex: 1,
                        renderer: function (value, meta, rec) {
                            var validityof = rec.get('validityof'),
                                validityto = rec.get('validityto');
                            return '('+ validityof.substr(0, 5) +' - '+ validityto.substr(0, 5) +') ' + value;
                        }
                    }, {
                        text: 'Tipo',
                        dataIndex: 'dutytypedescription',
                        width: 200,
                        renderer: function (value, meta, rec) {
                            var hours = rec.get('hours');
                            return value +' '+ hours +'hs';
                        }
                    }, {
                        xtype:'actioncolumn',
                        width: 50,
                        align: 'center',
                        handler: 'onActionUpdate',
                        iconCls: "fa fa-pencil action-update-color",
                        tooltip: 'Editar cadastro do plantão!'
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
                                tooltip: 'Novo cadastro de plantão!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'shifttype',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});