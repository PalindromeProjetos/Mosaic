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
        show: 'showScoreDone'
    },

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
        var me = this;
        if (e.getKey() === e.ESC) {
            me.hide();
            me.xview.down('gridpanel').getView().focusCell( me.xview.hasPosition );
        }
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschedule.SchedulingMonthlyScore');

        me.items = [
            {
                xtype: 'displayfield',
                name: 'naturalperson',
                fieldLabel: 'Planejado',
                fieldStyle: 'font-size: 22px; font-weight: bold;'
            }, {
                pageSize: 0,
                hideTrigger: true,
                fieldLabel: 'Lançar sócio',
                hiddenNameId: 'naturalpersonid',
                xtype: 'naturalpersonsearch',
                listeners: {
                    //select: 'onSelectNaturalPerson'
                }
            }, {
                height: 100,
                xtype: 'gridpanel',
                columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
                    meta.style = "font-size: 16px; line-height: 18px; font-family: Monda; color: rgba(252, 24, 36,.6);";
                    return value;
                },
                store: 'schedulingmonthlyscore',
                columns: [
                    {
                        flex: 1,
                        dataIndex: 'naturalperson'
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
                    //select: 'onSelectScore',
                    //cellclick: 'onCellClickScore'
                }
            }
        ]
    }

});
