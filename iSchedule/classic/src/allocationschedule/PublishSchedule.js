//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.PublishSchedule', {
    extend: 'Ext.window.Window',

    xtype: 'publishschedule',

    requires: [
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    width: 300,

    title: 'Publicar Escala',

    modal: true,
    resizable: false,
    showAnimate: true,
    cls: 'panel-frame',

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

        me.items = [
            {
                xtype: 'form',
                padding: 10,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        name: 'period',
                        fieldLabel: 'Competência',
                        xtype: 'textfield',
                        useReadColor: true,
                        useMondaFont: true,
                        fieldStyle: {
                            color: 'blue;',
                            fontSize: '16px;'
                        }
                    }, {
                        name: 'periodid',
                        xtype: 'hiddenfield'
                    }, {
                        name: 'status',
                        xtype: 'hiddenfield'
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Próxima competência',
                        defaultType: 'checkboxfield',
                        labelStyle: 'color: blue; font-size: 14px;',
                        defaults: {
                            checked: true,
                            readOnly: true
                        },
                        items: [
                            {
                                name: 'transportschema',
                                boxLabel: 'Transportar Esquema de Cálculo'
                            }, {
                                name: 'transportmap',
                                boxLabel: 'Transportar Mapa Mensal'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    buttons: [
        {
            text: 'Confirmar',
            handler: 'startPublishSchedule'
        }, {
            text: 'Fechar',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});