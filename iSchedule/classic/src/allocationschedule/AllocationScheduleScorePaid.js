//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScorePaid', {
    extend: 'Ext.form.Panel',

    xtype: 'allocationschedulescorepaid',

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
                value: 'P'
            }, {
                xtype: 'hiddenfield',
                name: 'releasetype',
                value: 'P'
            }, {
                xtype: 'displayfield',
                name: 'naturalpersonshift',
                fieldLabel: 'Planejado',
                fieldStyle: 'font-size: 22px; font-weight: bold;'
            }, {
                xtype: 'container',
                layout: 'hbox',
				defaults: {
                    allowBlank: false
                },
                items: [
                    {
                        flex: 1,
                        pageSize: 0,
                        margin: '0 5 0 0',
                        hideTrigger: true,
                        submitValue: false,
                        name: 'naturalperson',
                        fieldLabel: 'Lançar sócio',
                        xtype: 'naturalpersonsearch',
                        hiddenNameId: 'naturalpersonid'
                    }, {
                        value: 1,
                        width: 60,
                        money: true,
                        mask: '0,00',
                        margin: '0 0 0 5',
                        xtype: 'textfield',
                        plugins: 'textmask',
                        name: 'dutyfraction',
                        fieldLabel: 'Fração'
                    }
                ]
            }, {
                height: 150,
                xtype: 'gridpanel',
                hideHeaders: false,
                headerBorders: false,
                store: 'schedulingmonthlyscore',
				columns: [
					{
						flex: 1,
                        text: '<b>Reembolso</b>',
						dataIndex: 'naturalperson',
                        renderer: function (value, meta, record, rowIndex, colIndex, store) {
                            meta.style = "font-size: 14px; line-height: 20px; font-family: Monda; color: rgba(3, 98, 253, 1);";
                            return value;
                        }
					}, {
						width: 60,
						align: 'right',
						dataIndex: 'dutyfraction',
                        renderer: function (value, meta, record, rowIndex, colIndex, store) {
                            meta.style = "font-size: 14px; line-height: 20px; font-family: Monda; color: rgba(3, 98, 253, 1);";
                            return Smart.maskRenderer('0,00',true)(value);
                        }
					}, {
                        xtype:'actioncolumn',
                        width: 40,
                        align: 'center',
                        iconCls: "fa fa-minus-circle action-delete-color-font",
                        tooltip: 'Remover item',
                        handler: 'onCellClickScore'
					}
				],
                listeners: {
                    select: 'onSelectScore',
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