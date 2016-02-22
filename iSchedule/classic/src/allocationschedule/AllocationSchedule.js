//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationSchedule', {
    extend: 'Ext.panel.Panel',

    xtype: 'allocationschedule',

    requires: [
        'Ext.layout.container.SegmentedButton',
        'iSchedule.view.allocationschedule.AllocationScheduleWeek',
        'iSchedule.view.allocationschedule.SchedulingPeriodSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleScoreOld',
        'iSchedule.view.allocationschedule.AllocationSchedulePicker',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    frame: true,
    layout: 'fit',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Escala Mensal',

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

        me.items = [
            {
                xtype: 'container',
                layout: 'border',
                items: [
                    {
                        dockedItems: [
                            {
                                name: 'updatescore',
                                hidden: true,
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [
                                    {
                                        width: '100%',
                                        xtype: 'container',
                                        layout: 'anchor',
                                        items: [
                                            {
                                                anchor: '100%',
                                                allowToggle: false,
                                                xtype: 'segmentedbutton',
                                                items: [
                                                    {
                                                        scale: 'medium',
                                                        text: 'Novo',
                                                        handler: 'onInsertScore',
                                                        showSmartTheme: 'red'
                                                    }, {
                                                        scale: 'medium',
                                                        text: 'Salvar',
                                                        handler: 'onUpdateScore',
                                                        showSmartTheme: 'red'
                                                    }, {
                                                        scale: 'medium',
                                                        text: 'Fechar',
                                                        handler: 'onClosedScore',
                                                        showSmartTheme: 'green'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        overflowY: 'auto',
                        width: 280,
                        region: 'west',
                        xtype: 'panel',
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
                                xtype: 'container',
                                layout: 'anchor',
                                disabled: true,
                                name: 'schedule',
                                defaults: {
                                    anchor: '100%',
                                    useMondaFont: true,
                                    labelStyle: 'color: blue; font-size: 14px;'
                                },
                                items: [
                                    {
                                        height: 230,
                                        xtype: 'allocationschedulepicker'
                                    }, {
                                        xtype: 'radiogroup',
                                        name: 'filter',
                                        fieldLabel: 'Filtrar',
                                        labelStyle: 'color: blue; font-size: 14px;',
                                        columns: 2,
                                        vertical: true,
                                        items: [
                                            {
                                                boxLabel: 'Unidade',
                                                name: 'filtertype',
                                                inputValue: 1,
                                                checked: true
                                            }, {
                                                boxLabel: 'Sócio',
                                                name: 'filtertype',
                                                inputValue: 2
                                            }
                                        ]
                                    }, {
                                        submitValue: false,
                                        showClear: true,
                                        xtype: 'textfield',
                                        listeners: {
                                            change: 'onFilterSchedule'
                                        }
                                    }, {
                                        margin: '0 0 5 0',
                                        xtype: 'segmentedbutton',
                                        allowToggle: false,
                                        items: [
                                            {
                                                scale: 'medium',
                                                xtype: 'splitbutton',
                                                glyph: 0xe887,
                                                text: 'Frequ.',
                                                handler: 'showFrequencySheet',
                                                menu: [
                                                    {
                                                        handler: 'showSelectSchedule',
                                                        text: 'Gerar arquivo da Escala Mensal'
                                                    }, {
                                                        handler: 'showSelectScheduleContagem',
                                                        text: 'Contagem - Relatorio'
                                                    }, {
                                                        handler: 'showSelectScheduleExtrato',
                                                        text: 'Extrato Individual - Relatorio'
                                                    }, {
                                                        handler: 'showSelectScheduleVerifyPay',
                                                        text: 'Conferencia Pagar Para - Relatorio'
                                                    }
                                                ]
                                            }, {
                                                scale: 'medium',
                                                glyph: 0xe898,
                                                text: 'Diretoria',
                                                handler: 'showDirectorShip'
                                            }
                                        ]
                                    }, {
                                        name: 'changestatus',
                                        xtype: 'segmentedbutton',
                                        vertical: true,
                                        allowToggle: false,
                                        items: [
                                            {
                                                disabled: true,
                                                name: 'statusP',
                                                glyph: 0xef67,
                                                scale: 'medium',
                                                text: 'Publicar Escala',
                                                showSmartTheme: 'sky',
                                                handler: 'showPublishSchedule'
                                            }, {
                                                disabled: true,
                                                name: 'statusC',
                                                glyph: 0xef17,
                                                scale: 'medium',
                                                text: 'Processar Contagem',
                                                showSmartTheme: 'sky',
                                                handler: 'startScheduleScore'
                                            }, {
                                                disabled: true,
                                                name: 'statusE',
                                                glyph: 0xef2a,
                                                scale: 'medium',
                                                text: 'Encerrar Contagem',
                                                showSmartTheme: 'sky'
                                            }
                                        ]
                                    }, {
                                        xtype: 'allocationschedulescoreold'
                                    }
                                ]
                            }
                        ]
                    }, {
                        region: 'center',
                        xtype: 'container',
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
                                name: 'schedulearea',
                                bodyStyle: 'padding: 0 0 0 10px;',
                                items: [
                                    {
                                        xtype: 'allocationscheduleweek'
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