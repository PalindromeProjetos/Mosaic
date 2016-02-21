//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleExtractReport', {
    extend: 'Ext.window.Window',

    xtype: 'allocationscheduleextractreport',

    requires: [
        'Ext.selection.CheckboxModel',
        'iContract.store.contractor.*',
        'iContract.store.naturalperson.NaturalPerson',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.contractor.ContractorUnitSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    title: 'Extrato Individual',

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
                        fieldLabel: 'Intervalo',
                        layout: 'hbox',
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
                        pageSize: 0,
                        fieldLabel: 'Sócios',
                        allowBlank: true,
                        name: 'naturalperson',
                        displayField: 'shortname',
                        hiddenNameId: 'legalentityid',
                        xtype: 'naturalpersonsearch',
                        store: 'iContract.store.naturalperson.NaturalPerson',
                        triggers: {
                            foo: {
                                cls: 'x-form-clear-trigger',
                                handler: function() {
                                    var form = this.up('form');
                                    form.down('naturalpersonsearch').reset();
                                    form.down('hiddenfield[name=legalentityid]').reset();
                                }
                            }
                        }
                    }, {
                        xtype: 'gridpanel',
                        height: 290,
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
            handler: 'showExtractReport'
        }
    ]

});