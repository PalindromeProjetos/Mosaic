//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScoreReport', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschedulescorereport',

    requires: [
        'Ext.selection.CheckboxModel',
        'iContract.store.contractor.*',
        'iContract.store.legalentity.LegalEntity',
        'iContract.store.naturalperson.NaturalPerson',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.contractor.ContractorUnitSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    title: 'Contagem Plantões',

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
            handler: 'showScoreReport'
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
        Ext.create('iContract.store.contractor.ContractorSubUnitExclud');
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
                                fieldLabel: 'Periodo Inicial',
                                xtype: 'datefield'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                plugins: 'textmask',
                                name:  'periodto',
                                fieldLabel: 'Periodo Final',
                                xtype: 'datefield'
                            }
                        ]
                    }, {
                        pageSize: 0,
                        fieldLabel: 'Entidade Legal',
                        allowBlank: true,
                        name: 'naturalperson',
                        displayField: 'shortname',
                        hiddenNameId: 'legalentityid',
                        xtype: 'naturalpersonsearch',
                        store: 'iContract.store.legalentity.LegalEntity',
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
                        flex: 1,
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
                        flex: 1,
                        xtype: 'comboenum',
                        hiddenNameId: 'subunit',
                        multiSelect: true,
                        fieldLabel: 'SubUnidade',
                        name: 'subunitdescription',
                        triggers: {
                            foo: {
                                cls: 'x-form-clear-trigger',
                                handler: function() {
                                    var form = this.up('form');
                                    form.down('comboenum[name=subunitdescription]').reset();
                                    form.down('hiddenfield[name=subunit]').reset();
                                }
                            }
                        }

                    }, {
                        xtype: 'tabpanel',
                        height: 300,
                        items: [
                            {
                                title: 'Exclusão Unidade(s)',
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
                            }, {
                                title: 'Exclusão SubUnidade(s)',
                                xtype: 'gridpanel',
                                hideHeaders: false,
                                store: 'contractorsubunitexclud',
                                name: 'contractorsubunitexclud',
                                rowLines: false,
                                selModel: {
                                    selType: 'checkboxmodel'
                                },
                                columns: [
                                    {
                                        sortable: false,
                                        text: '<span style="font-size: 16px;">Marcar todas as SubUnidades </span>',
                                        dataIndex: 'subunitdescription',
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



