//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.AllocationSchema', {
    extend: 'Ext.panel.Panel',

    xtype: 'allocationschema',

    requires: [
        'Smart.form.field.*',
        'Ext.form.RadioGroup',
        'iSchedule.store.allocationschema.*',
        'Ext.layout.container.SegmentedButton',
        'iSchedule.view.allocationschema.AllocationSchemaMap',
        'iSchedule.view.allocationschema.AllocationSchemaWeek',
        'iSchedule.view.allocationschedule.SchedulingPeriodSearch',
        'iSchedule.view.allocationschema.AllocationSchemaController'
    ],

    controller: 'allocationschema',

    frame: true,
    layout: 'fit',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Agenda - Planejamento do Cálculo',

    tools: [
        {
            type: 'pin',
            handler: 'onHistoryBack'
        }
    ],

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschema.AllocationSchema');
        Ext.create('iSchedule.store.allocationschema.AllocationSchemaMap');

        me.items = [
            {
                xtype: 'container',
                layout: 'border',
                items: [
                    {
                        width: 280,
                        region: 'west',
                        xtype: 'panel',
                        items: [
                            {
                                xtype: 'form',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    useMondaFont: true,
                                    labelStyle: 'color: blue; font-size: 14px;'
                                },
                                items: [
                                    {
                                        status: 'A',
                                        params: 'all',
                                        xtype: 'schedulingperiodsearch',
                                        useReadColor: false,
                                        fieldStyle: {
                                            color: 'blue;',
                                            fontSize: '16px;'
                                        },
                                        listeners: {
                                            select: 'onSelectPeriod',
                                            beforequery: 'onBeforeQuery'
                                        }
                                    }, {
                                        xtype: 'radiogroup',
                                        columns: 2,
                                        vertical: false,
                                        fieldLabel: 'Tipo',
                                        items: [
                                            {
                                                itemId: 'type0',
                                                boxLabel: 'Escala',
                                                name: 'type',
                                                inputValue: 0,
                                                checked: true
                                            }, {
                                                itemId: 'type1',
                                                disabled: true,
                                                boxLabel: 'Mapa',
                                                name: 'type',
                                                inputValue: 1
                                            }
                                        ],
                                        listeners: {
                                            change: 'onChangeSchemaMonthlyType'
                                        }
                                    }, {
                                        xtype: 'container',
                                        layout: 'card',
                                        name: 'schema',
                                        disabled: true,
                                        items: [
                                            {
                                                xtype: 'form',
                                                name: 'schemamonthly',
                                                layout: 'anchor',
                                                defaults: {
                                                    anchor: '100%',
                                                    allowBlank: false,
                                                    useMondaFont: true,
                                                    labelStyle: 'color: blue; font-size: 14px;'
                                                },
                                                items: [
                                                    {
                                                        allowBlank: true,
                                                        xtype: 'hiddenfield',
                                                        name: 'id'
                                                    }, {
                                                        xtype: 'hiddenfield',
                                                        name: 'schedulingperiodid'
                                                    }, {
                                                        xtype: 'hiddenfield',
                                                        name: 'schemaweek'
                                                    }, {
                                                        xtype: 'hiddenfield',
                                                        name: 'highlights',
                                                        value: 1
                                                    }, {
                                                        xtype: 'textfield',
                                                        name: 'description',
                                                        fieldLabel: 'Descrição'
                                                    }, {
                                                        xtype: 'textareafield',
                                                        name: 'observation',
                                                        fieldLabel: 'Observação'
                                                    }, {
                                                        allowBlank: true,
                                                        showClear: true,
                                                        xtype: 'textfield',
                                                        submitValue: false,
                                                        fieldLabel: 'Filtrar Unidade',
                                                        listeners: {
                                                            change: 'onChangeFilterMonthly'
                                                        }
                                                    }, {
                                                        vertical: true,
                                                        allowToggle: false,
                                                        xtype: 'segmentedbutton',
                                                        items: [
                                                            {
                                                                scale: 'medium',
                                                                glyph: 0xe899,
                                                                text: 'Processar Escala do Período',
                                                                handler: 'onCreateSchemaMonthly'
                                                            }, {
                                                                scale: 'medium',
                                                                glyph: 0xe9eb,
                                                                text: 'Ajustes do Período',
                                                                handler: 'onUpdateSchemaSetting'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }, {
                                                xtype: 'form',
                                                name: 'schemaweekday',
                                                defaults: {
                                                    anchor: '100%',
                                                    useMondaFont: true
                                                },
                                                autoScroll: true,
                                                layout: 'anchor',
                                                defaults: {
                                                    anchor: '100%',
                                                    labelStyle: 'color: blue; font-size: 14px;'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'hiddenfield',
                                                        name: 'weekold'
                                                    }, {
                                                        showClear: true,
                                                        xtype: 'textfield',
                                                        submitValue: false,
                                                        fieldLabel: 'Filtrar Unidade',
                                                        listeners: {
                                                            change: 'onChangeFilterWeekly'
                                                        }
                                                    }, {
                                                        xtype: 'gridpanel',
                                                        cls: 'search-grid',
                                                        name: 'schemamonthlymap',
                                                        store: 'allocationschemamap',
                                                        columns: [
                                                            {
                                                                flex: 1,
                                                                text: 'Dias da Semana',
                                                                dataIndex: 'weekdaydescription',
                                                                renderer: function (value, meta, record, rowIndex, colIndex, store) {
                                                                    meta.style = 'font-size: 16px; line-height: 22px; font-family: Monda;';
                                                                    return value;
                                                                }
                                                            }, {
                                                                width: 50,
                                                                align: 'center',
                                                                renderer: function (value, meta, rec) {
                                                                    var schemamap = rec.get('schemamap') ? rec.get('schemamap') : '',
                                                                        strSelectedOn = '<span style="color: {0}; width: 20px; font-size: 20px; line-height: 22px; cursor: pointer;"><i class="{1}"></i></span>',
                                                                        strSelectedOf = '<span style="color: {0}; width: 20px; font-size: 20px; line-height: 22px;"><i class="{1}"></i></span>',
                                                                        isselected = rec.get('isselected') ? Ext.String.format(strSelectedOn,'rgba(0, 0, 139, 1)','icon-grid') : Ext.String.format(strSelectedOf,'rgba(0, 0, 139, 0.298039)','icon-grid');
                                                                    return (schemamap.length != 0) ? isselected : Ext.String.format(strSelectedOf,'rgba(110, 123, 139, .3)','');
                                                                }
                                                            }, {
                                                                width: 50,
                                                                align: 'center',
                                                                renderer: function (value, meta, rec) {
                                                                    var strSelectedOn = '<span style="color: {0}; width: 20px; font-size: 20px; line-height: 22px; cursor: pointer;"><i class="{1}"></i></span>',
                                                                        strSelectedOf = '<span style="color: {0}; width: 20px; font-size: 20px; line-height: 22px;"><i class="{1}"></i></span>';
                                                                    return (rec.get('isselected')) ? Ext.String.format(strSelectedOf,'rgba(251, 60, 74, 1)','icon-ok-circled') : Ext.String.format(strSelectedOn,'rgba(251, 60, 74, .3)','icon-ok-circled');
                                                                }
                                                            }
                                                        ],
                                                        listeners: {
                                                            cellclick: 'onCellClick',
                                                            celldblclick: 'onCellDblClick'
                                                        }
                                                    }, {
                                                        xtype: 'fieldcontainer',
                                                        layout: 'hbox',
                                                        fieldLabel: 'Marcadores Semanais',
                                                        labelStyle: 'color: blue; font-size: 14px;',
                                                        defaultType: 'numberfield',
                                                        defaults: {
                                                            allowBlank: false,
                                                            hideTrigger: true,
                                                            useMondaFont: true,
                                                            useReadColor: true
                                                        },
                                                        items: [
                                                            {
                                                                flex: 1,
                                                                name: 'weekmax',
                                                                fieldLabel: 'MAX'
                                                            }, {
                                                                xtype: 'splitter'
                                                            }, {
                                                                flex: 1,
                                                                name: 'weekold',
                                                                fieldLabel: 'OLD'
                                                            }, {
                                                                xtype: 'splitter'
                                                            }, {
                                                                flex: 1,
                                                                minValue: 1,
                                                                name: 'weeknew',
                                                                fieldLabel: 'NEW',
                                                                useReadColor: false
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, {
                        region: 'center',
                        xtype: 'panel',
                        layout: 'border',
                        items: [
                            {
                                height: 30,
                                region: 'north',
                                xtype: 'panel',
                                items: [
                                    {
                                        margin: '10 0 0 10',
                                        xtype: 'label',
                                        text: '...',
                                        name: 'labelperiod',
                                        style: {
                                            color: '#457EC5;',
                                            fontSize: '25px;',
                                            fontWeight: 'bold;',
                                            fontFamily: 'Open Sans;'
                                        }
                                    }
                                ]
                            }, {
                                region: 'center',
                                xtype: 'panel',
                                layout: 'card',
                                reference: 'allocationschemap',
                                bodyStyle: 'padding: 0 0 0 10px;',
                                items: [
                                    {
                                        id: 'cardIndex0',
                                        xtype: 'allocationschemaweek'
                                    }, {
                                        id: 'cardIndex1',
                                        xtype: 'allocationschemamap'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

    }

});