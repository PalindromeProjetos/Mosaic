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

    width: 400,

    modal: true,

    layout: {
        type: 'fit'
    },

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
    ],

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
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 1,
                                plugins: 'textmask',
                                name:  'periodof',
                                fieldLabel: 'Perido Inicial',
                                xtype: 'datefield'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                plugins: 'textmask',
                                name:  'periodto',
                                fieldLabel: 'Perido Final',
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
                        xtype: 'tabpanel',
                        height: 300,
                        items: [
                            {
                                title: 'Excluir Unidade(s)',
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
                                        text: '<span style="font-size: 16px;">Marcar todas as Unidades </span>',
                                        dataIndex: 'shortname',
                                        flex: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

});