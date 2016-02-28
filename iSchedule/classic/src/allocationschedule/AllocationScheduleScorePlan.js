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
    defaultType: 'displayfield',
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

        Ext.create('iSchedule.store.allocationschedule.SchedulingMonthlyPartners');

        me.items = [
            {
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                name: 'naturalperson',
                fieldLabel: 'Planejado',
                fieldStyle: 'font-size: 22px; font-weight: bold;'
            }, {
                pageSize: 0,
                xtype: 'combobox',
                editable: false,
                hideTrigger: false,
                valueField: 'shifthours',
                displayField: 'shifthoursdescription',
                name: 'shifthours',
                fieldLabel: 'Horas/Plantão',
                store: {
                    fields: ['shifthours', 'shifthoursdescription'],
                    data: [
                        { shifthours: 4, shifthoursdescription: '4h' },
                        { shifthours: 6, shifthoursdescription: '6h' },
                        { shifthours: 8, shifthoursdescription: '8h' },
                        { shifthours: 12, shifthoursdescription: '12h' }
                    ]
                }
            }, {
                xtype: 'textareafield',
                name: 'observation',
                fieldLabel: 'Observações'
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