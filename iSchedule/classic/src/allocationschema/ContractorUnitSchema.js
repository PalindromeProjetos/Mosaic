//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.ContractorUnitSchema', {
    extend: 'Ext.window.Window',

    xtype: 'contractorunitschema',

    requires: [
        'Smart.form.field.*',
        'Ext.form.RadioGroup',
        'Ext.grid.feature.Grouping',
		'Smart.form.field.ComboEnum',
        'iSchedule.store.allocationschema.*',
		'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.allocationschema.ContractorUnitSchemaController'
    ],

    controller: 'contractorunitschema',

    modal: true,
    resizable: false,
    showAnimate: true,
    cls: 'panel-frame',

    width: 1000,

    layout: {
        type: 'fit'
    },

    title: 'Ajustes especiais para o processamento do período',

    buttons: [
        {
            text: 'Fechar',
            showSmartTheme: 'green',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ],

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschema.ContractorUnitSchema');
        Ext.create('iSchedule.store.allocationschema.ContractorUnitSchemaShow');
        Ext.create('iSchedule.store.allocationschema.ContractorUnitReplacement');
        Ext.create('iSchedule.store.allocationschema.ContractorUnitReplacementShow');

        me.items = [
            {
                height:550,
                name: 'card',
                xtype: 'container',
                layout: 'card',
                items: [
                    {
                        name: 'search',
                        xtype: 'container',
                        layout: 'border',
                        items: [
                            {
                                region: 'north',
                                xtype: 'form',
                                name: 'schemaparams',
                                bodyStyle: 'padding: 20px;',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'container'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'schedulingperiodid'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'contractorunitid'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'contractorsubunitid'
                                    }, {
                                        flex: 4,
                                        xtrype: 'container',
                                        layout: 'anchor',
                                        defaults: {
                                            anchor: '100%'
                                        },
                                        items: [
                                            {
                                                layout: 'hbox',
                                                xtype: 'container',
                                                defaults: {
                                                    fieldStyle: {
                                                        color: 'blue;',
                                                        fontSize: '16px;'
                                                    },
                                                    useMondaFont: true,
                                                    labelStyle: 'color: blue; font-size: 14px;'
                                                },
                                                items: [
                                                    {
                                                        flex: 3,
                                                        allowBlank: false,
                                                        hideTrigger: true,
                                                        margin: '0 5 0 0',
                                                        name: 'contractorunit',
                                                        fieldLabel: 'Unidade Contratante',
                                                        xtype: 'contractorunitschemasearch',
                                                        listeners: {
                                                            select: 'onSelectSchedulingSchema'
                                                        }
                                                    }, {
                                                        flex: 2,
                                                        allowBlank: false,
                                                        useReadColor: true,
                                                        margin: '0 0 0 5',
                                                        fieldLabel: 'SubUnidade',
                                                        xtype: 'textfield',
                                                        name: 'subunitdescription'
                                                    }
                                                ]
                                            }
                                        ]
                                    }, {
                                        flex: 1,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                region: 'center',
                                xtype: 'tabpanel',
                                deferredRender: false,
                                ui: 'navigation',
                                tabBar: {
                                    layout: {
                                        pack: 'center'
                                    }
                                },
                                items: [
                                    {
                                        title: 'Plantões especiais',
                                        xtype: 'gridpanel',
                                        name: 'allocationtype',
                                        rowLines: false,
                                        hideHeaders: false,
                                        store: 'contractorunitschemashow',
                                        columnsRenderer: function (value, metaData, record, rowIndex, colIndex) {
                                            var me = this,
                                                color = rowIndex % 2 == 0,
                                                metaStyle = (color) ? 'background-color: rgba(242, 243, 235, .9);' : '',
                                                cell =  '<div>' +
                                                            '<div style="float: left; width: 90%;">{0}</div>' +
                                                            '<div style="float: left; width: 10%;" class="delete-item">' +
                                                                '<i class="icon-cancel-squared"></i>' +
                                                            '</div>' +
                                                        '</div>';

                                            metaData.style = metaStyle;

                                            return ((value) && (value.length != 0)) ? Ext.String.format(cell,value) : value;
                                        },
                                        listeners: {
                                            cellclick: 'onCellClickAllocationType'
                                        },
                                        features: [
                                            {
                                                ftype:'grouping',
                                                collapsible: false,
                                                groupHeaderTpl: '<b style="color: #0000ff;">{name}</b>'
                                            }
                                        ],
                                        columns: [
                                            {
                                                width: 40,
                                                text: '<span style="font-size: 18px; font-family: Monda;">##</span>',
                                                align: 'center',
                                                dataIndex: 'position',
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    var me = this,
                                                        color = rowIndex % 2 == 0,
                                                        metaStyle = (color) ? 'background-color: rgba(242, 243, 235, .9);' : '';

                                                    metaData.style = metaStyle;

                                                    return Ext.String.leftPad(value, 2, '0');
                                                }
                                            }, {
                                                flex: 1,
                                                text: 'Segunda',
                                                dataIndex: 'monperson'
                                            }, {
                                                flex: 1,
                                                text: 'Terca',
                                                dataIndex: 'tueperson'
                                            }, {
                                                flex: 1,
                                                text: 'Quarta',
                                                dataIndex: 'wedperson'
                                            }, {
                                                flex: 1,
                                                text: 'Quinta',
                                                dataIndex: 'thuperson'
                                            }, {
                                                flex: 1,
                                                text: 'Sexta',
                                                dataIndex: 'friperson'
                                            }, {
                                                flex: 1,
                                                text: 'Sabado',
                                                dataIndex: 'satperson'
                                            }, {
                                                flex: 1,
                                                text: 'Domingo',
                                                dataIndex: 'sunperson'
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                disabled: true,
                                                dock: 'top',
                                                bodyStyle: 'padding: 0 10px 10px 10px;',
                                                xtype: 'form',
                                                name: 'allocationtype',
                                                layout: 'hbox',
                                                defaults: {
                                                    allowBlank: false
                                                },
                                                items: [
                                                    {
                                                        flex: 1,
                                                        xtype: 'comboenum',
                                                        margin: '0 5 0 0',
                                                        fieldLabel: 'Tipo de Atribuição',
                                                        name: 'allocationtypedescription'
                                                    }, {
                                                        width: 80,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'Turno',
                                                        xtype: 'comboenum',
                                                        name: 'shiftdescription'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'Dia',
                                                        xtype: 'comboenum',
                                                        name: 'weekdaydescription'
                                                    }, {
                                                        width: 80,
                                                        minValue: 1,
                                                        maxValue: 10,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'Posicao',
                                                        name: 'position',
                                                        xtype: 'numberfield'
                                                    }, {
                                                        flex: 1,
                                                        pageSize: 0,
                                                        margin: '0 10 0 5',
                                                        name: 'naturalpersonid',
                                                        fieldLabel: 'Plantonista',
                                                        xtype: 'naturalpersonsearch',
                                                        displayField: 'shortname'
                                                    }, {
                                                        margin: '10 0 0 0',
                                                        scale: 'large',
                                                        width: 120,
                                                        height: 52,
                                                        xtype: 'button',
                                                        glyph: 0xec48,
                                                        text: 'Inserir',
                                                        showSmartTheme: 'red',
                                                        handler: 'onUpdateAllocationType'
                                                    }
                                                ]
                                            }
                                        ]
                                    }, {
                                        title: 'Substituições',
                                        xtype: 'gridpanel',
                                        name: 'replacement',
                                        rowLines: false,
                                        hideHeaders: false,
                                        store: 'contractorunitreplacementshow',
                                        columnsRenderer: function (value, metaData, record, rowIndex, colIndex) {
                                            var me = this,
                                                color = rowIndex % 2 == 0,
                                                metaStyle = (color) ? 'background-color: rgba(242, 243, 235, .9);' : '';

                                            metaData.style = metaStyle;

                                            return value;
                                        },
                                        listeners: {
                                            cellclick: 'onCellClickReplacement'
                                        },
                                        features: [
                                            {
                                                ftype:'grouping',
                                                collapsible: false,
                                                groupHeaderTpl: '<b style="color: #0000ff;">{name}</b>'
                                            }
                                        ],
                                        columns: [
                                            {
                                                width: 40,
                                                text: '<span style="font-size: 18px; font-family: Monda;">..</span>',
                                                align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
                                                    var me = this,
                                                        color = rowIndex % 2 == 0,
                                                        metaStyle = (color) ? 'background-color: rgba(242, 243, 235, .9);' : '',
                                                        cell =  '<div class="delete-item">' +
                                                                    '<i class="icon-cancel-squared"></i>' +
                                                                '</div>';

                                                    metaData.style = metaStyle;

                                                    return cell;
                                                }
                                            }, {
                                                flex: 1,
                                                text: 'Plantonista: <b>DE</b>',
                                                dataIndex: 'personof'
                                            }, {
                                                flex: 1,
                                                text: 'Plantonista: <b>PARA</b>',
                                                dataIndex: 'personto'
                                            }, {
                                                width: 40,
                                                text: 'S',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'mon',
                                                xtype : 'checkcolumn'
                                            }, {
                                                width: 40,
                                                text: 'T',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'tue',
                                                xtype : 'checkcolumn'
                                            }, {
                                                width: 40,
                                                text: 'Q',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'wed',
                                                xtype : 'checkcolumn'
                                            }, {
                                                width: 40,
                                                text: 'Q',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'thu',
                                                xtype : 'checkcolumn'
                                            }, {
                                                width: 40,
                                                text: 'S',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'fri',
                                                xtype : 'checkcolumn'
                                            }, {
                                                width: 40,
                                                text: 'S',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'sat',
                                                xtype : 'checkcolumn'
                                            }, {
                                                width: 40,
                                                text: 'D',
                                                readOnly: true,
                                                align: 'center',
                                                dataIndex: 'sun',
                                                xtype : 'checkcolumn'
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                disabled: true,
                                                dock: 'top',
                                                bodyStyle: 'padding: 0 10px 10px 10px;',
                                                xtype: 'form',
                                                name: 'replacement',
                                                layout: 'hbox',
                                                defaults: {
                                                    allowBlank: false
                                                },
                                                items: [
                                                    {
                                                        width: 80,
                                                        margin: '0 5 0 0',
                                                        fieldLabel: 'Turno',
                                                        xtype: 'comboenum',
                                                        name: 'shiftdescription'
                                                    }, {
                                                        margin: '0 5 0 0',
                                                        flex: 1,
                                                        pageSize: 0,
                                                        multiSelect: true,
                                                        fieldLabel: 'Dias da Semana',
                                                        xtype: 'comboenum',
                                                        name: 'weekdaydescription'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 5 0 0',
                                                        pageSize: 0,
                                                        name: 'naturalpersonidof',
                                                        fieldLabel: 'Plantonista: <b style="color: #0016b0;">DE</b>',
                                                        xtype: 'naturalpersonsearch'
                                                    }, {
                                                        flex: 1,
                                                        pageSize: 0,
                                                        margin: '0 5 0 0',
                                                        name: 'naturalpersonidto',
                                                        fieldLabel: 'Plantonista: <b style="color: #0016b0;">PARA</b>',
                                                        xtype: 'naturalpersonsearch'
                                                    }, {
                                                        margin: '0 5 0 0',
                                                        flex: 1,
                                                        allowBlank: true,
                                                        fieldLabel: 'Observação',
                                                        xtype: 'textfield',
                                                        name: 'observation'
                                                    }, {
                                                        margin: '10 0 0 0',
                                                        scale: 'large',
                                                        width: 110,
                                                        xtype: 'button',
                                                        glyph: 0xec48,
                                                        text: 'Inserir',
                                                        showSmartTheme: 'red',
                                                        handler: 'onUpdateReplacement'
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
            }
        ]
    }

});