//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScoreDone', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschedulescoredone',

    requires: [
        'Ext.selection.CheckboxModel',
        'iContract.store.contractor.*',
        'iContract.store.legalentity.LegalEntity',
        'iContract.store.naturalperson.NaturalPerson',
        'iSchedule.store.allocationschedule.SchedulingMonthlyScore',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.contractor.ContractorUnitSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleScoreController'
    ],

    controller: 'allocationschedulescore',

    title: 'Plantões Realizados',

    width: 300,

    modal: true,
    resizable: false,
    showAnimate: true,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschedule.SchedulingMonthlyScore');

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items_: [
                    {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'schedulingmonthlypartnersid'
                    }, {
                        xtype: 'displayfield',
                        name: 'naturalperson',
                        fieldLabel: 'Plantonista',
                        fieldStyle: 'font-size: 22px; font-weight: bold;'
                    }, {
                        allowBlank: true,
                        fieldLabel: 'Observações',
                        name: 'observation',
                        xtype: 'textfield'
                    }, {
                        xtype: 'displayfield',
                        name: 'username'
                    }, {
                        width: 70,
                        name: 'dutyfraction',
                        fieldLabel: 'Fração',
                        xtype: 'textfield',
                        plugins: 'textmask',
                        money: true,
                        mask: '0,00',
                        value: 1
                    }, {
                        pageSize: 0,
                        fieldLabel: 'Sócio',
                        hiddenNameId: 'naturalpersonid',
                        xtype: 'naturalpersonsearch',
                        listeners: {
                            select: 'onSelectNaturalPerson'
                        }
                    }, {
                        xtype: 'gridpanel',
                        columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
                            meta.style = "font-size: 16px; line-height: 18px; font-family: Monda; color: rgba(252, 24, 36,.6);";
                            return value;
                        },
                        store: 'schedulingmonthlyscore',
                        columns: [
                            {
                                text: 'Plantonista',
                                dataIndex: 'naturalperson',
                                flex: 1
                            }, {
                                align: 'center',
                                width: 50,
                                dataIndex: '',
                                renderer: function (value, meta, rec) {
                                    return '<div class="delete-item" style="color: rgba(252, 24, 36,1); font-size: 17px;"><i class="icon-cancel-circle"></i></div>';
                                }
                            }
                        ],
                        listeners: {
                            select: 'onSelectScore',
                            cellclick: 'onCellClickScore'
                        }
                    }
                ],
                items: [
                    {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'scoretype',
                        value: 'R'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'schedulingmonthlypartnersid'
                    }, {
                        xtype: 'displayfield',
                        name: 'naturalperson',
                        fieldLabel: 'Plantonista',
                        fieldStyle: 'font-size: 22px; font-weight: bold;'
                    }, {
                        allowBlank: true,
                        fieldLabel: 'Observações',
                        name: 'observation',
                        xtype: 'textfield'
                    }, {
                        pageSize: 0,
                        fieldLabel: 'Sócio',
                        hiddenNameId: 'naturalpersonid',
                        xtype: 'naturalpersonsearch',
                        listeners: {
                            select: 'onSelectNaturalPerson'
                        }
                    }, {
                        xtype: 'gridpanel',
                        height: 200,
                        name: 'schedulingmonthlyscoreR',
                        columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
                            meta.style = "font-size: 16px; line-height: 18px; font-family: Monda; color: rgba(252, 24, 36,.6);";
                            return value;
                        },
                        store: 'schedulingmonthlyscore',
                        columns: [
                            {
                                text: 'Plantonista',
                                dataIndex: 'naturalperson',
                                flex: 1
                            }, {
                                align: 'center',
                                width: 50,
                                dataIndex: '',
                                renderer: function (value, meta, rec) {
                                    return '<div class="delete-item" style="color: rgba(252, 24, 36,1); font-size: 17px;"><i class="icon-cancel-circle"></i></div>';
                                }
                            }
                        ],
                        listeners: {
                            select: 'onSelectScore',
                            cellclick: 'onCellClickScore'
                        }
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'displayfield',
                                name: 'username'
                            }, {
                                xtype: 'splitter'
                            }, {
                                xtype: 'displayfield',
                                name: 'changedate'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});
