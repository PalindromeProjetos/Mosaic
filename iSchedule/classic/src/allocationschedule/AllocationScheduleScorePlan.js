//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScorePlan', {
    extend: 'Ext.form.Panel',

    xtype: 'allocationschedulescoreplan',

    requires: [
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
        show: 'showScorePlan'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'displayfield',
                name: 'naturalperson',
                fieldLabel: 'Planejado',
                fieldStyle: 'font-size: 22px; font-weight: bold;'
            }, {
                height: 150,
                xtype: 'panel',
                items: [
                    {
                        anchor: '100%',
                        xtype: 'textfield',
                        fieldLabel: 'Cadastro'
                    }
                ]
            }, {
				xtype: 'splitter'
            }, {
				xtype: 'label',
				text: 'para salvar, Alt + S',
				style: {
                    display: 'table-cell;',
                    textAlign: 'center;',
                    color: 'red;'
				}
            }
        ]
    }

});