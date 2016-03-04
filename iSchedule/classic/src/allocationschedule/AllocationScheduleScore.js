//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScore', {
    extend: 'Ext.panel.Panel',

    xtype: 'allocationschedulescore',

    requires: [
        'Smart.form.field.*',
        'Ext.button.Segmented',
        'Ext.form.field.Picker',
        'Smart.form.field.ComboEnum',
        'Ext.grid.plugin.CellEditing',
        'Smart.form.field.ComboSearch',
        'iContract.store.contractor.ContractorUnit',
        'iSchedule.store.allocationschedule.AllocationScheduleScore',
		'iSchedule.view.allocationschedule.AllocationScheduleScorePlan',
        'iSchedule.view.allocationschedule.AllocationScheduleScoreDone',
        'iSchedule.view.allocationschedule.AllocationScheduleScorePaid',
        'iSchedule.view.allocationschedule.AllocationScheduleScoreController'
    ],

    controller: 'allocationschedulescore',

    frame: true,
    layout: 'fit',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Produção - Contagem',

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

    listeners: {
        keydown: 'onDateMove'
    },

    buildScore: function (shift) {
        var me = this,
            build = function (text,scoreType) {
                var header = {
                        width: 220,
                        text: text,
                        cls: 'light',
                        sortable: false,
                        dataIndex: scoreType,
                        editor: {
                            xtype: 'pickerfield',
                            createPicker: function () {
                                var scoreView = {},
                                    gd = me.down('gridpanel'),
                                    sm = gd.getSelectionModel(),
                                    hasPosition = sm.getPosition(),
                                    cellIndex = gd.view.getCellByPosition(sm.getCurrentPosition()).dom.cellIndex;

                                if ( [0,3].indexOf(cellIndex) != -1 ) {
                                    scoreView = 'allocationschedulescoreplan';
                                }

                                if ( [1,4].indexOf(cellIndex) != -1 ) {
                                    scoreView = 'allocationschedulescoredone';
                                }

                                if ( [2,5].indexOf(cellIndex) != -1 ) {
                                    scoreView = 'allocationschedulescorepaid';
                                }

                                return Ext.widget(scoreView, { xview: me, hasPosition: hasPosition, cellIndex: cellIndex });
                            },
                            listeners: {
                                collapse: 'onPickerCollapse'
                            }
                        },
                        renderer: function (value, meta, record, rowIndex, colIndex, store) {
                            var me = this,
                                cellValue = value,
                                cellStyle = '<div><div style="float: left;">{0}</div><div id="{1}"></div></div>';

                            switch(colIndex) {
                                case 0:
                                    meta.style = ( record.get('releasetyped') == 'M' ) ? "color: red; font-style: italic;" : "";
                                    if( record.get('releasetyped') == 'M' ) {
                                        var id0 = Ext.id();
                                        Ext.defer(function () {
                                            Ext.widget('component', {
                                                renderTo: id0,
                                                cls:"delete-icon fa fa-minus-circle action-delete-color-font"
                                            }).getEl().on('click', function (e, el, eOpts) { me.fireEvent('deleteplan', me, record, colIndex, e, eOpts); }, me);
                                        }, 50);
                                        cellValue = Ext.String.format(cellStyle,value,id0);
                                    }
                                    return cellValue;
                                    break;
                                case 1:
                                    meta.style = ( record.get('releasetypedr') == 'L' ) ? "color: blue; font-style: italic;" : "";
                                    break;
                                case 2:
                                    meta.style = ( record.get('releasetypedp') == 'L' ) ? "color: blue; font-style: italic;" : "";
                                    break;
                                case 3:
                                    meta.style = ( record.get('releasetypen') == 'M' ) ? "color: red; font-style: italic;" : "";
                                    if( record.get('releasetypen') == 'M' ) {
                                        var id1 = Ext.id();
                                        Ext.defer(function () {
                                            Ext.widget('component', {
                                                renderTo: id1,
                                                cls:"delete-icon fa fa-minus-circle action-delete-color-font"
                                            }).getEl().on('click', function (e, el, eOpts) { me.fireEvent('deleteplan', me, record, colIndex, e, eOpts); }, me);
                                        }, 50);
                                        cellValue = Ext.String.format(cellStyle,value,id1);
                                    }
                                    return cellValue;
                                    break;
                                case 4:
                                    meta.style = ( record.get('releasetypenr') == 'L' ) ? "color: blue; font-style: italic;" : "";
                                    break;
                                case 5:
                                    meta.style = ( record.get('releasetypenp') == 'L' ) ? "color: blue; font-style: italic;" : "";
                                    break;
                            }

                            return cellValue;
                        }
                    };

                return header;
            },
            field = [
                build('Planejado','shift' + shift.toLowerCase()),
                build('Realizado','shift' + shift.toLowerCase() + 'r'),
                build('Reembolso','shift' + shift.toLowerCase() + 'p')
            ];

        return field;
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschedule.SchedulingMonthlyScore');
        Ext.create('iSchedule.store.allocationschedule.AllocationScheduleScore');

        me.items = [
            {
                xtype: 'form',
                name: 'period',
                layout: 'border',
                items: [
                    {
                        width: 280,
                        region: 'west',
                        xtype: 'panel',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false,
                            useMondaFont: true
                        },
                        items: [
                            {
                                xtype: 'container',
                                fieldLabel: 'Período',
                                layout: 'hbox',
                                defaultType: 'datefield',
                                defaults: {
                                    flex: 1,
                                    startDay: 1,
                                    editable: false,
                                    allowBlank: false,
                                    hideTrigger: false,
                                    labelStyle: 'color: blue; font-size: 14px;',
                                    listeners: {
                                        select: 'onSelectDate'
                                    }
                                },
                                items: [
                                    {
                                        plugins: 'textmask',
                                        fieldLabel: 'De',
                                        name: 'dateof',
                                        margin: '0 5 0 0'
                                    }, {
                                        plugins: 'textmask',
                                        fieldLabel: 'Até',
                                        name: 'dateto',
                                        margin: '0 0 0 5'
                                    }
                                ]
                            }, {
                                startDay: 1,
                                disabled: true,
                                editable: false,
                                xtype: 'datefield',
                                afterLabelTextTpl: [
                                    '<i style="font-style: italic; color: red;"> ...navegação, Ctrl + </i>',
                                    '<i class="fa fa-arrow-left" style="color: red;"></i> <i class="fa fa-arrow-right" style="color: red;"></i>'
                                ],
                                fieldLabel: 'Data',
                                hideTrigger: false,
                                plugins: 'textmask',
                                name: 'datescore',
                                listeners: {
                                    select: 'onPeriodDate'
                                }
                            }, {
                                pageSize: 0,
                                disabled: true,
                                submitValue: false,
                                hiddenNameId: 'contractorunitid',
                                name: 'contractorunit',
                                fieldLabel: 'Unidade',
                                xtype: 'combosearch',
                                store: 'iContract.store.contractor.ContractorUnit',
                                valueField: 'id',
                                displayField: 'shortname',
                                listeners: {
                                    select: 'onUnitSubUnit'
                                }
                            }, {
                                disabled: true,
                                xtype: 'comboenum',
                                fieldLabel: 'SubUnidade',
                                name: 'subunitdescription',
                                listeners: {
                                    select: 'onUnitSubUnit'
                                }
                            }, {
                                xtype: 'segmentedbutton',
                                //allowMultiple: true,
                                defaults: {
                                    scale: 'medium'
                                },
                                items: [
                                    {
                                        width: 70,
                                        xtype: 'splitbutton',
                                        iconCls: "fa fa-print",
                                        menu: [
                                            {
                                                text: 'Menu Item 1'
                                            }
                                        ]
                                    }, {
                                        iconCls: "fa fa-desktop",
                                        text: 'Novo Plantão',
                                        handler: 'setSchedule'
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
                                layout: 'fit',
                                bodyStyle: 'padding: 0 0 0 10px;',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        store: 'allocationschedulescore',
                                        cls: 'allocationschemaweek',
                                        rowLines: false,
                                        autoScroll: true,
                                        columnLines: true,
                                        hideHeaders: false,
                                        selType: 'cellmodel',
                                        selModel: 'cellmodel',
                                        plugins: {
                                            ptype: 'cellediting',
                                            clicksToEdit: 1,
                                            pluginId: 'pluginscore'
                                        },
                                        columns: [
                                            {
                                                cls: 'dark',
                                                text: '<a style="font-size: 18px; font-family: Monda;">PLANTÕES DIURNOS</a>',
                                                columns: me.buildScore('D')
                                            }, {
                                                cls: 'dark',
                                                text: '<a style="font-size: 18px; font-family: Monda;">PLANTÕES NOTURNOS</a>',
                                                columns: me.buildScore('N')
                                            }
                                        ],
                                        listeners: {
                                            beforeedit: 'onBeforeEdit',
                                            deleteplan: 'onDeletePlan',
                                            cellkeydown: 'onCellKeyDown'
                                        }
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