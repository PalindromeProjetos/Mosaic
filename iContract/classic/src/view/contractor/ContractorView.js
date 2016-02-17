//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorView', {
    extend: 'Ext.panel.Panel',

    xtype: 'contractorview',

    requires: [
        'Ext.tab.*',
        'Smart.address.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'iContract.view.person.*',
        'Smart.plugins.SmartRegion',
        'Smart.form.field.ComboEnum',
        'iContract.store.person.PersonPhone',
        'iContract.view.contractor.ContractorController'
    ],

    frame: true,
    layout: 'border',

    controller: 'contractor',
    cls: 'panel-frame',
    iconCls: "fa fa-users",
    title: 'Manutenção do cadastro',

    tools: [
        {
            type: 'pin',
            handler: 'onHistoryBack'
        }
    ],

    listeners: {
        afterrender: 'onAfterRenderView'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iContract.store.person.PersonPhone');

        me.items = [
            {
                xtype: 'form',
                region: 'center',
                layout: 'border',
                items: [
                    {
                        flex: 1,
                        split: true,
                        xtype: 'panel',
                        region: 'west',
                        scrollable: 'y',
                        cls: "smart-background-transparent",
                        plugins: [
                            'smartregion'
                        ],
                        responsiveConfig: {
                            'width >= 200': {
                                region: 'west',
                                flex: 1
                            }
                        },
                        smartregionConfig: {
                            source: 'west',
                            target: 'north',
                            width: 200,
                            flex: 3
                        },
                        layout: 'anchor',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            useLabelBold: true
                        },
                        items: [
                            {
                                xtype: 'label',
                                cls: 'title-label',
                                text: 'Cadastro da Contratante'
                            }, {
                                xtype: 'container',
                                margin: '20 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'container'
                                    }, {
                                        flex: 2,
                                        height: 200,
                                        xtype: 'portrait',
                                        tableName: 'person'
                                    }, {
                                        flex: 1,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'hiddenfield',
                                name: 'id'
                            }, {
                                xtype: 'hiddenfield',
                                name: 'typeperson',
                                value: 'C'
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                items: [
                                    {
                                        flex: 5,
                                        fieldLabel: 'Nome fantasia',
                                        name: 'shortname'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 2,
                                        maskRe: /[0-9\/]/,
                                        fieldLabel: 'CNES',
                                        name: 'cnesnumber'
                                    }
                                ]
                            }, {
                                fieldLabel: 'Razão social',
                                name: 'name'
                            }, {
                                vtype: 'email',
                                name: 'mainmail',
                                fieldLabel: 'E-mail principal'
                            }, {
                                name: 'maincontact',
                                fieldLabel: 'Contato principal'
                            }, {
                                margin: '20 0 0 0',
                                xtype: 'container',
                                layout: 'hbox',
                                defaultType: 'button',
                                defaults: {
                                    scale: 'large',
                                    showSmartTheme: 'red'
                                },
                                items: [
                                    {
                                        flex: 1,
                                        iconCls: "fa fa-upload",
                                        text: 'Salvar',
                                        handler: 'updateView'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        iconCls: "fa fa-file-o",
                                        text: 'Novo',
                                        handler: 'insertView'
                                    }
                                ]
                            }
                        ]
                    }, {
                        flex: 3,
                        plain: true,
                        region: 'center',
                        xtype: 'tabpanel',
                        focusOnToFront: false,
                        deferredRender: false,
                        items: [
                            {
                                bodyPadding: 10,
                                overflowY: 'auto',
                                iconCls: "fa fa-comments",
                                title: 'Complemento',
                                layout: 'anchor',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel : 'Inscrições',
                                        labelCls: 'sub-title-label',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                            {
                                                flex: 1,
                                                fieldLabel: 'CNPJ',
                                                plugins: 'textmask',
                                                money: false,
                                                name: 'cnpjnumber',
                                                mask: '99.999.999/9999-99'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Municipal',
                                                name: 'countyregistration'
                                            }, {
                                                flex: 2,
                                                xtype: 'container'
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                bodyPadding: 10,
                                xtype: 'personaddress'
                            }, {
                                title: 'Telefones',
                                xtype: 'personphone'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});