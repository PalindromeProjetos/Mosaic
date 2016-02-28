//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScoreDone', {
    extend: 'Ext.form.Panel',

    xtype: 'allocationschedulescoredone',

    requires: [
        'iSchedule.store.allocationschedule.SchedulingMonthlyScore',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleScoreController'
    ],

    controller: 'allocationschedulescore',

    frame: true,
    shadow: false,
    cls: 'panel-frame',

    hidden: true,
    floating: true,
    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    listeners: {
        keydown: 'setKeyDown',
        show: 'showScoreView'
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
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'hiddenfield',
                name: 'schedulingmonthlypartnersid'
            }, {
                xtype: 'hiddenfield',
                name: 'scoretype',
                value: 'R'
            }, {
                xtype: 'displayfield',
                name: 'naturalpersonshift',
                fieldLabel: 'Planejado',
                fieldStyle: 'font-size: 22px; font-weight: bold;'
            }, {
                xtype: 'container',
                layout: 'hbox',
				items: [
					{
						flex: 1,
						pageSize: 0,
						allowBlank: false,
						hideTrigger: true,
                        submitValue: false,
						fieldLabel: 'Lançar sócio',
						hiddenNameId: 'naturalpersonid',
                        name: 'naturalperson',
						xtype: 'naturalpersonsearch'
					}
				]
            }, {
                height: 150,
                xtype: 'gridpanel',
                store: 'schedulingmonthlyscore',
                columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
                    meta.style = "font-size: 14px; line-height: 20px; font-family: Monda; color: rgba(252, 24, 36,.6);";
                    return value;
                },
                columns: [
                    {
                        flex: 1,
                        dataIndex: 'naturalperson'
                    }, {
                        width: 40,
                        align: 'center',
                        renderer: function (value, meta, rec) {
                            return '<div class="delete-item" style="color: rgba(252, 24, 36,1); font-size: 14px;"><i class="icon-cancel-circle"></i></div>';
                        }
                    }
                ],
                listeners: {
                    select: 'onSelectScore',
                    cellclick: 'onCellClickScore',
                    cellkeydown: 'onCellKeyDownScore'
                }
            }, {
				xtype: 'splitter'
            }, {
				xtype: 'label',
				text: '...para salvar, Alt + S',
				style: {
                    display: 'table-cell;',
                    textAlign: 'center;',
                    color: 'red;',
                    'font-weight': 'bold;',
                    'font-style': 'italic;'
				}
            }
        ]
    }

});