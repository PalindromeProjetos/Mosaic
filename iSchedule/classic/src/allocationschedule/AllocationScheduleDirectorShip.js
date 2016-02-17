//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleDirectorShip', {
    extend: 'Ext.window.Window',

    xtype: 'allocationscheduledirectorship',

    requires: [
        'Ext.selection.CheckboxModel',
        'iContract.store.contractor.ContractorUnit',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    width: 300,

    title: 'Imprimir Escala para Diretoria',

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

        Ext.create('iContract.store.contractor.ContractorUnit');

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
                        height: 320,
                        rowLines: false,
                        xtype: 'gridpanel',
                        hideHeaders: false,
                        selModel: {
                            selType: 'checkboxmodel'
                        },
                        store: 'contractorunit',
                        columns: [
                            {
                                sortable: false,
                                text: '<span style="font-size: 16px;">Marcar todas as Unidades </span>',
                                dataIndex: 'shortname',
                                flex: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },

    listeners: {
        show: 'onShowDirectorShip'
    },

    buttons: [
        {
            text: 'Imprimir',
            handler: 'showReportDirectorShip'
        }, {
            text: 'Fechar',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});