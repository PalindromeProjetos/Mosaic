//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScore', {
    extend: 'Ext.panel.Panel',

    xtype: 'allocationschedulescore',

    requires: [
        'Smart.form.field.*',
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

        me.on('render', me.onFormRender, me);
    },

    onFormRender: function() {
        var me = this;
        me.getEl().on('keydown', me.onFormElKeyDown, me);
    },

    onFormElKeyDown: function(e) {
        var me = this,
            dateof = me.down('datefield[name=dateof]'),
            dateto = me.down('datefield[name=dateto]'),
            datescore = me.down('datefield[name=datescore]');

        if (e.ctrlKey == true) {
            switch(e.keyCode) {
                case 37:
                    me.fireEvent('dateprev',me,datescore,dateof,dateto);
                    break;
                case 39:
                    me.fireEvent('datenext',me,datescore,dateof,dateto);
                    break;
            }
        }
    },

    listeners: {
        dateprev: 'onDatePrev',
        datenext: 'onDateNext'
    },

    buildScore: function (shift) {
        var me = this,
            build = function (text,scoreType) {
                var header = {
                        width: 220,
                        text: text,
                        cls: 'ligth',
                        sortable: false,
                        dataIndex: scoreType,
                        editor: {
                            xtype: 'pickerfield',
                            createPicker: function () {
                                var gd = me.down('gridpanel'),
                                    sm = gd.getSelectionModel(),
                                    hasPosition = sm.getPosition(),
                                    cellIndex = gd.view.getCellByPosition(sm.getCurrentPosition()).dom.cellIndex,
                                    scoreView = ( [1,4].indexOf(cellIndex) != -1 ) ? 'allocationschedulescoredone' : 'allocationschedulescorepaid';

                                return Ext.widget(scoreView, { xview: me, hasPosition: hasPosition, cellIndex: cellIndex });
                            },
                            listeners: {
                                collapse: 'onPickerCollapse'
                            }
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
                                xtype: 'button',
                                scale: 'large',
                                iconCls: "fa fa-print",
                                text: 'Imprimir Contagem'
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
                                        columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
                                            var list = [0,3];
                                            meta.style = ( list.indexOf(colIndex) != -1 ) ? "color: red;" : "";
                                            return value;
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