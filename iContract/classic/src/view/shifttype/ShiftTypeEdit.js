//@charset UTF-8
Ext.define( 'iContract.view.shifttype.ShiftTypeEdit', {
    extend: 'Ext.window.Window',

    xtype: 'shifttypeedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum'
    ],

    width: 350,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'shifttype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Plant&#227o',

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
                bodyPadding: 10,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype      : 'fieldcontainer',
                        fieldLabel : 'Plantão',
                        defaultType: 'radiofield',
                        labelCls: 'sub-title-label',
                        defaults: {
                            flex: 1
                        },
                        layout: 'hbox',
                        items: [
                            {
                                checked   : true,
                                boxLabel  : 'Integral',
                                name      : 'dutytype',
                                inputValue: 'I',
                                listeners: {
                                    change: 'onChangeDutyType'
                                }
                            }, {
                                boxLabel  : 'Fra&#231&#227o',
                                name      : 'dutytype',
                                inputValue: 'F'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel : 'Estrutura',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                margin: '0 5 0 0',
                                flex: 1,
                                value: 12,
                                xtype: 'numberfield',
                                name: 'hours',
                                useReadColor: false,
                                fieldLabel: 'Horas',
                                maxValue: 12,
                                minValue: 1
                            }, {
                                margin: '0 0 0 5',
                                flex: 1,
                                xtype: 'comboenum',
                                fieldLabel: 'Turno',
                                name: 'shiftdescription'
                            }
                        ]
                    }, {
                        fieldLabel: 'Intervalo',
                        xtype: 'fieldcontainer',
                        labelCls: 'sub-title-label',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                xtype: 'smarttimefield',
                                name: 'validityof',
                                fieldLabel: 'de'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                xtype: 'smarttimefield',
                                name: 'validityto',
                                fieldLabel: 'at&#233'
                            }
                        ]
                    }, {
                        useMondaFont: true,
                        xtype: 'textareafield',
                        fieldLabel: 'Observa&#231&#245es',
                        name: 'observation',
                        fieldStyle: {
                            color: '#C02942;',
                            fontSize: '14px;'
                        }
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            iconCls: "fa fa-upload",
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateView'
        }, {
            iconCls: "fa fa-file-o",
            text: 'Novo',
            showSmartTheme: 'red',
            handler: 'insertView'
        }
    ]

});