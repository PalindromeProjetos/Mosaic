//@charset UTF-8
Ext.define( 'iContract.view.naturalperson.NaturalPersonView', {
    extend: 'Ext.panel.Panel',

    xtype: 'naturalpersonview',

    requires: [
        'Ext.tab.*',
        'Smart.address.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'iContract.view.person.*',
        'Smart.plugins.SmartRegion',
        'Smart.form.field.ComboEnum',
        'iContract.store.person.*',
        'iContract.store.naturalperson.*',
        'iContract.model.naturalperson.NaturalPerson',
        'iContract.view.naturalperson.NaturalPersonController',
        'iContract.view.naturalperson.NaturalPersonDistribution'
    ],

    frame: true,
    layout: 'border',

    controller: 'naturalperson',
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

        Ext.create('iContract.store.person.PersonBank');
        Ext.create('iContract.store.person.PersonPhone');
        Ext.create('iContract.store.naturalperson.NaturalPersonDistribution');

        me.items= [
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
                                text: 'Cadastro do Profissional'
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
                                value: 'N'
                            }, {
                                allowBlank: false,
                                fieldLabel: 'Apelido',
                                name: 'shortname'
                            }, {
                                allowBlank: false,
                                fieldLabel: 'Nome completo',
                                name: 'name'
                            }, {
                                allowBlank: false,
                                vtype: 'email',
                                name: 'mainmail',
                                fieldLabel: 'E-mail principal'
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 1,
                                        margin: '0 5 0 0',
                                        name: 'birthdate',
                                        xtype: 'datefield',
                                        plugins: 'textmask',
                                        fieldLabel: 'Nascimento'
                                    }, {
                                        flex: 1,
                                        margin: '0 5 0 5',
                                        xtype: 'comboenum',
                                        fieldLabel: 'Sexo',
                                        name: 'genderdescription'
                                    }, {
                                        flex: 1,
                                        margin: '0 0 0 5',
                                        xtype: 'comboenum',
                                        fieldLabel: 'Raça/Cor',
                                        name: 'racecolordescription'
                                    }
                                ]
                            }, {
                                allowBlank: false,
                                name: 'isactive',
                                xtype: 'checkboxfield',
                                boxLabel: 'Ativo'
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
                            }, {
                                xtype: 'splitter'
                            }, {
                                scale: 'large',
                                xtype: 'button',
                                iconCls: "fa fa-calendar",
                                handler: 'getDistribution',
                                text: 'Obter planilha com distribuição',
                                showSmartTheme: 'red'
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
                                        fieldLabel: 'Cadastro',
                                        labelCls: 'sub-title-label',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                flex: 1,
                                                margin: '0 5 0 0',
                                                maskRe: /[0-9\/]/,
                                                fieldLabel: 'Matricula',
                                                name: 'registrationid'
                                            }, {
                                                flex: 1,
                                                margin: '0 5 0 5',
                                                fieldLabel: 'Ingressou em',
                                                xtype: 'datefield',
                                                plugins: 'textmask',
                                                name: 'associationdate'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Nacionalidade',
                                                name: 'nationality'
                                            }, {
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                fieldLabel: 'Local nascimento',
                                                name: 'placebirth'
                                            }
                                        ]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        labelCls: 'sub-title-label',
                                        fieldLabel: 'Filiação',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                flex: 1,
                                                fieldLabel: 'Pai',
                                                name: 'namefather'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Mãe',
                                                name: 'namemother'
                                            }
                                        ]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        labelCls: 'sub-title-label',
                                        fieldLabel: 'Documentação',
                                        layout: 'anchor',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Conselho da categoria',
                                                style: {
                                                    color: 'blue;',
                                                    fontSize: '14px;'
                                                }
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 10 0',
                                                defaultType: 'textfield',
                                                defaults: {
                                                    allowBlank: false
                                                },
                                                items: [
                                                    {
                                                        flex: 1,
                                                        maskRe: /[0-9\/]/,
                                                        fieldLabel: 'CRM',
                                                        name: 'crmnumber'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'UF emissor',
                                                        name: 'crmissuingstate',
                                                        plugins: 'textmask',
                                                        money: false,
                                                        mask: 'LL'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        maskRe: /[0-9\/]/,
                                                        fieldLabel: 'CNES',
                                                        name: 'cnesnumber'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'label',
                                                text: 'Pessoa fisica',
                                                style: {
                                                    color: 'blue;',
                                                    fontSize: '14px;'
                                                }
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        flex: 1,
                                                        maskRe: /[0-9\/]/,
                                                        fieldLabel: 'Registro geral',
                                                        name: 'identnumber'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'Org. emissor',
                                                        name: 'identissuing'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'UF emissor',
                                                        name: 'identissuingstate',
                                                        plugins: 'textmask',
                                                        money: false,
                                                        mask: 'LL'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 0 0 5',
                                                        xtype: 'datefield',
                                                        plugins: 'textmask',
                                                        fieldLabel: 'Data emissão',
                                                        name: 'identissuingdate'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 10 0',
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        flex: 1,
                                                        fieldLabel: 'CPF',
                                                        plugins: 'textmask',
                                                        money: false,
                                                        vtype: 'cpf',
                                                        name: 'cpfnumber',
                                                        mask: '999.999.999-99'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'PIS/PASEP/NIT',
                                                        name: 'pispasep'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'ISS(Inscr. Munic.)',
                                                        name: 'countyregistration'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'label',
                                                text: 'Titulo de eleitor',
                                                style: {
                                                    color: 'blue;',
                                                    fontSize: '14px;'
                                                }
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 10 0',
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        flex: 1,
                                                        margin: '0 5 0 0',
                                                        fieldLabel: 'Inscrição',
                                                        name: 'voter'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'Zona',
                                                        name: 'voterzone'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 5 0 5',
                                                        fieldLabel: 'Seção',
                                                        name: 'votersection'
                                                    }, {
                                                        flex: 1,
                                                        margin: '0 0 0 5',
                                                        xtype: 'datefield',
                                                        plugins: 'textmask',
                                                        fieldLabel: 'Data emissão',
                                                        name: 'voterissuingdate'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                bodyPadding: 10,
                                xtype: 'personaddress'
                            }, {
                                disabled: true,
                                xtype: 'naturalpersondistribution'
                            }, {
                                disabled: true,
                                xtype: 'personphone'
                            }, {
                                disabled: true,
                                xtype: 'personbank'
                            }
                        ]
                    }
                ]
            }
        ];

    }

});