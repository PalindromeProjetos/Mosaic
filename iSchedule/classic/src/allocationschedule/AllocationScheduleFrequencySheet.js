//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleFrequencySheet', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschedulefrequencysheet',

    requires: [
        'Smart.form.field.ComboSearch',
        'iContract.store.contractor.ContractorUnit',
        'iSchedule.store.allocationschedule.SchedulingPeriod',
        //'iSchedule.view.allocationschedule.PeriodSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleController',
        'iSchedule.view.allocationschedule.SchedulingPeriodSearch'

    ],

    controller: 'allocationschedule',

    width: 360,

    title: 'Imprimir Folha de Frequencia',

    modal: true,

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
                        fieldLabel: 'Competencia',
                        xtype: 'textfield',
                        readOnlyColor: true,
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
                                fieldLabel: 'Ate',
                                name: 'dateto'
                            }
                        ]
                    }, {
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
                    }, {
                        xtype: 'checkboxfield',
                        boxLabel: 'Exibir label UNIDADE',
                        name: 'showlabel',
                        checked: false
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

