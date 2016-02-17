//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleFrequencySheet', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschedulefrequencysheet',

    requires: [
        'iContract.store.contractor.ContractorUnit',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    width: 300,

    title: 'Imprimir Folha de Frequência',

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
                    anchor: '100%',
                    allowBlank: false
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
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Intervalo',
                        layout: 'hbox',
                        defaultType: 'datefield',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 1,
                                plugins: 'textmask',
                                fieldLabel: 'De',
                                name: 'dateof'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                plugins: 'textmask',
                                fieldLabel: 'Até',
                                name: 'dateto'
                            }
                        ]
                    }, {
                        pageSize: 0,
                        submitValue: false,
                        hiddenNameId: 'contractorunitid',
                        fieldLabel: 'Unidade',
                        xtype: 'combosearch',
                        store: 'iContract.store.contractor.ContractorUnit',
                        valueField: 'id',
                        displayField: 'shortname'
                    }, {
                        xtype: 'comboenum',
                        fieldLabel: 'SubUnidade',
                        name: 'subunitdescription'
                    }
                ]
            }
        ]
    },

    buttons: [
        {
            text: 'Imprimir',
            handler: 'showReportSheetFrequency'
        }, {
            text: 'Fechar',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});