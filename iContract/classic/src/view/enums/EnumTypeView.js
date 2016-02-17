//@charset UTF-8
Ext.define( 'iContract.view.enums.EnumTypeView', {
    extend: 'Ext.panel.Panel',

    xtype: 'enumtypeview',

    requires: [
        'Ext.tab.*',
        'Ext.panel.Panel',
        'iContract.store.enums.*',
        'Smart.plugins.SmartRegion',
        'Ext.grid.plugin.RowEditing'
    ],

    frame: true,
    layout: 'border',

    controller: 'enumtype',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Manutenção do cadastro',

    tools: [
        {
            type: 'pin',
            handler: 'onHistoryBack'
        }
    ],

    listeners: {
        afterrender: 'onAfterRenderView'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, record) {
                return record.data.reserved;
            };

        Ext.create('iContract.store.enums.EnumTypeList');

        me.items = [
            {
                flex: 1,
                split: true,
                xtype: 'form',
                name: 'enumtype',
                region: 'west',
                scrollable: 'y',
                cls: "smart-background-transparent",
                plugins: [
                    'smartregion'
                ],
                responsiveConfig: {
                    'width >= 200': {
                        region: 'west',
                        flex: 1
                    }
                },
                smartregionConfig: {
                    source: 'west',
                    target: 'north',
                    width: 200,
                    flex: 3
                },
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Cadastro do Enumerador'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Enumerador',
                        name: 'name',
                        fieldStyle: {
                            color: '#C02942;',
                            fontSize: '18px;'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Descrição',
                        name: 'description',
                        fieldStyle: {
                            color: '#C02942;',
                            fontSize: '18px;'
                        }
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Observações',
                        name: 'observation',
                        fieldStyle: {
                            'color': '#C02942;',
                            'fontSize': '14px;'
                        }
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'button',
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'red'
                        },
                        items: [
                            {
                                flex: 1,
                                iconCls: "fa fa-upload",
                                text: 'Salvar',
                                handler: 'updateView'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                iconCls: "fa fa-file-o",
                                text: 'Novo',
                                disabled: true,
                                handler: 'insertView'
                            }
                        ]
                    }
                ]
            },{
                flex: 3,
                region: 'center',
                cls: 'list-grid',
                hideHeaders: false,
                xtype: 'gridpanel',
                store: 'enumtypelist',
                columns: [
                    {
                        width: 90,
                        text: 'Código',
                        dataIndex: 'code',
                        align: 'center'
                    }, {
                        flex: 1,
                        text: 'Descrição',
                        dataIndex: 'description'
                    }, {
                        text: 'Ações',
                        width: 90,
                        xtype: 'actioncolumn',
                        align: 'center',
                        items: [
                            {
                                handler: 'onActionUpdate',
                                isDisabled: isDisabled,
                                iconCls: "fa fa-pencil action-update-color",
                                tooltip: 'Editar cadastro!'
                            }, {
                                disabled: true,
                                xtype: 'splitter'
                            }, {
                                handler: 'onActionDelete',
                                isDisabled: isDisabled,
                                iconCls: "fa fa-ban action-delete-color",
                                tooltip: 'Remover cadastro!'
                            }
                        ]
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        store: 'enumtypelist',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];

    }

});