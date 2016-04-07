//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleNew', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschedulenew',

    requires: [
        'iContract.store.contractor.ContractorUnit',
        'iSchedule.view.contractor.ContractorUnitSearch',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    title: 'Cadastrar Plantão',

    width: 650,

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

    listeners: {
        show: 'onShowAllocationScheduleNew'
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                padding: 10,
                xtype: 'form',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'releasetype'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'status'
                    }, {
                        anchor: '',
                        width: 150,
                        useMondaFont: true,
                        useReadColor: false,
                        fieldStyle: {
                            textAlign: 'center',
                            color: 'blue;',
                            fontSize: '20px;'
                        },
                        allowBlank: false,
                        fieldLabel: 'Data',
                        xtype: 'datefield',
                        plugins: 'textmask',
                        name: 'dutydate'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            allowBlank: false,
                            useMondaFont: true,
                            //useReadColor: true,
                            fieldStyle: {
                                color: 'blue;',
                                fontSize: '16px;'
                            }
                        },
                        items: [
                            {
                                flex: 1,
                                pageSize: 0,
                                useReadColor: false,
                                hiddenNameId: 'contractorunitid',
                                name:  'contractorunit',
                                fieldLabel: 'Unidade',
                                xtype: 'naturalpersonsearch',
                                store: 'iContract.store.contractor.ContractorUnit',
                                margin: '0 5 0 0'
                            }, {
                                width: 250,
                                xtype: 'comboenum',
                                fieldLabel: 'SubUnidade',
                                useReadColor: false,
                                name: 'subunitdescription',
                                margin: '0 5 0 5'
                            }, {
                                width: 90,
                                xtype: 'comboenum',
                                fieldLabel: 'Turno',
                                useReadColor: false,
                                name: 'shiftdescription',
                                margin: '0 0 0 5'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            allowBlank: false,
                            useMondaFont: true,
                            useReadColor: false,
                            fieldStyle: {
                                color: 'blue;',
                                fontSize: '16px;'
                            }
                        },
                        items: [
                            {
                                flex: 1,
                                pageSize: 0,
                                fieldLabel: 'Plantonista',
                                name: 'naturalperson',
                                hiddenNameId: 'naturalpersonid',
                                xtype: 'naturalpersonsearch',
                                margin: '0 5 0 0'
                            }, {
                                width: 250,
                                fieldLabel: 'Atribuição',
                                xtype: 'comboenum',
                                name: 'allocationschemadescription',
                                margin: '0 5 0 5'
                            }, {
                                disabled: true,
                                width: 90,
                                name: 'position',
                                fieldLabel: 'Posição',
                                xtype: 'numberfield',
                                margin: '0 0 0 5'
                            }
                        ]
                    }, {
                        useMondaFont: true,
                        fieldLabel: 'Observação',
                        allowBlank: false,
                        xtype: 'textfield',
                        name: 'observation'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            showSmartTheme: 'red-dark',
            text: 'Salvar',
            handler: 'insertAllocationSchedule'
        }, {
            text: 'Fechar',
            showSmartTheme: 'green',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});