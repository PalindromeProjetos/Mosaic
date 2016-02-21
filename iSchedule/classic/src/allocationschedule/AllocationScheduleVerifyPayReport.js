//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleVerifyPayReport', {
    extend: 'Ext.window.Window',

    xtype: 'allocationscheduleverifypayreport',

    requires: [
        'Ext.selection.CheckboxModel',
        'iContract.store.contractor.*',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.contractor.ContractorUnitSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    title: 'Conferência - Pagar Para',

    width: 300,

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

        Ext.create('iContract.store.contractor.ContractorUnitExclud');

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
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Intervalo',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 1,
                                plugins: 'textmask',
                                name:  'periodof',
                                fieldLabel: 'De',
                                xtype: 'datefield'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                plugins: 'textmask',
                                name:  'periodto',
                                fieldLabel: 'Até',
                                xtype: 'datefield'
                            }
                        ]
                    }, {
                        submitValue: false,
                        hiddenNameId: 'contractorunitid',
                        fieldLabel: 'Unidade',
                        name: 'shortname',
                        xtype: 'combosearch',
                        store: 'iContract.store.contractor.ContractorUnit',
                        valueField: 'id',
                        displayField: 'shortname',
                        triggers: {
                            foo: {
                                cls: 'x-form-clear-trigger',
                                handler: function() {
                                    var form = this.up('form');
                                    form.down('combosearch[name=shortname]').reset();
                                    form.down('hiddenfield[name=contractorunitid]').reset();
                                }
                            }
                        }
                    }, {
                        height: 290,
                        xtype: 'gridpanel',
                        hideHeaders: false,
                        store: 'contractorunitexclud',
                        name: 'contractorunitexclud',
                        rowLines: false,
                        selModel: {
                            selType: 'checkboxmodel'
                        },
                        columns: [
                            {
                                sortable: false,
                                text: '<span style="font-size: 16px;">Excluir todas unidades</span>',
                                dataIndex: 'shortname',
                                flex: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            text: 'Fechar',
            showSmartTheme: 'green',
            handler: function (btn) {
                btn.up('window').close();
            }
        }, {
            text: 'Imprimir',
            showSmartTheme: 'sky',
            handler: 'showVerifyPayReport'
        }
    ]

});