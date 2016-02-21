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
        Ext.create('iContract.store.contractor.ContractorSubUnitExclud');
        me.items = [
            {
                padding: 10,
                xtype: 'form',
                layout: 'anchor',
                defaults: {
                    pageSize: 0,
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
                                title: 'Unidades',
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
                                        text: '<span style="font-size: 16px;">Excluir todas</span>',
                                        dataIndex: 'shortname',
                                        flex: 1
                                    }
                                ]
                            }, {
                                title: 'SubUnidades',
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
                                        text: '<span style="font-size: 16px;">Excluir todas</span>',
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
            handler: 'showScoreReport'
        }
    ]

});