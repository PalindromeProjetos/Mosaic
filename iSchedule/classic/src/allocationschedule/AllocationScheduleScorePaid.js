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
        show: 'showScoreView',
        updatescore: 'onUpdateScore'
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

        if (e.altKey == true) {
            if([83,115].indexOf(e.keyCode) != -1) {
                me.fireEvent('updatescore', me, {});
            }
        }

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
                        width: 70,
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
                store: 'schedulingmonthlyscore',
				columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
					meta.style = "font-size: 14px; line-height: 20px; font-family: Monda; color: rgba(3, 98, 253, 1);";
					return ( colIndex == 1 ) ? Smart.maskRenderer('0,00',true)(value) : value;
				},
				columns: [
					{
						flex: 1,
						dataIndex: 'naturalperson'
					}, {
						width: 60,
						align: 'right',
						dataIndex: 'dutyfraction'
					}, {
						width: 40,
						align: 'center',
						renderer: function (value, meta, rec) {
							return '<div class="delete-item" style="color: rgba(3, 98, 253, 1); font-size: 14px;"><i class="icon-cancel-circle"></i></div>';
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
				text: 'para salvar, alt + S',
				style: {
					textAlign: 'center;',
					fontSize: '12px;'
				}
			}
        ]
    }

});