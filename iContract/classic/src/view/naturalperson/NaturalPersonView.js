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
        'iContract.view.naturalperson.NaturalPersonController'
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

    columnDays: function (dayList) {
        var dayCode = ['sun','mon','tue','wed','thu','fri','sat'],
            dayName = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            build = function (name,code) {
                var header = {
                    width: 130,
                    text: name,
                    cls: 'ligth',
                    sortable: false,
                    dataIndex: code + 'description',
                    editor: {
                        updateField: code,
                        xtype: 'contractorunitsearch'
                    },
                    renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        meta.style = ( record.get('shift') == "P" ) ? "text-align: center;" : "";
                        return value;
                    }
                };

                return header;
            },
            field = function () {
                var list = [];

                Ext.each(dayList, function(pos) {
                    var code = dayCode[pos],
                        name = ([0,6].indexOf(pos) != -1 ) ? '<b>' + dayName[pos] + '</b>' : dayName[pos];

                    list.push(build(name,code));
                });

                return list;
            };

        return field();
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
                                xtype: 'container',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                items: [
                                    {
                                        flex: 5,
                                        fieldLabel: 'Apelido',
                                        name: 'shortname'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 2,
                                        submitValue: false,
                                        readOnlyColor: true,
                                        fieldLabel: 'Matricula',
                                        name: 'registrationcode'
                                    }
                                ]
                            }, {
                                fieldLabel: 'Nome completo',
                                name: 'name'
                            }, {
                                vtype: 'email',
                                name: 'mainmail',
                                fieldLabel: 'E-mail principal'
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        flex: 1,
                                        name: 'birthdate',
                                        xtype: 'datefield',
                                        plugins: 'textmask',
                                        fieldLabel: 'Nascimento'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        xtype: 'comboenum',
                                        fieldLabel: 'Sexo',
                                        name: 'genderdescription'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        xtype: 'comboenum',
                                        fieldLabel: 'Raça/Cor',
                                        name: 'racecolordescription'
                                    }
                                ]
                            }, {
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
                                        items: [
                                            {
                                                flex: 1,
                                                maskRe: /[0-9\/]/,
                                                fieldLabel: 'Matricula',
                                                name: 'registrationid',
                                                listeners: {
                                                    change: 'onChangeRegistrationId'
                                                }
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Ingressou em',
                                                xtype: 'datefield',
                                                plugins: 'textmask',
                                                name: 'associationdate'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Nacionalidade',
                                                name: 'nationality'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
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
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'Org. emissor',
                                                        name: 'identissuing'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'UF emissor',
                                                        name: 'identissuingstate',
                                                        plugins: 'textmask',
                                                        money: false,
                                                        mask: 'LL'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
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
                                                        fieldLabel: 'Inscrição',
                                                        name: 'voter'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'Zona',
                                                        name: 'voterzone'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
                                                        fieldLabel: 'Seção',
                                                        name: 'votersection'
                                                    }, {
                                                        xtype: 'splitter'
                                                    }, {
                                                        flex: 1,
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
                                title: 'Distribuição',
                                iconCls: "fa fa-map-marker",
                                xtype: 'gridpanel',
                                hideHeaders: false,
                                name: 'distribution',
                                cls: 'update-grid distribution-edit',
                                store: 'naturalpersondistribution',
                                columns: [
                                    {
                                        flex: 1,
                                        text: '<a style="font-size: 18px; font-family: Monda;">Turnos e Posições</a>',
                                        dataIndex: 'shiftdescription',
                                        renderer: function (value,meta) {
                                            meta.style = "padding-left: 10px; background: rgba(245, 245, 245, 1);";
                                            return value;
                                        }
                                    }, {
                                        cls: 'dark',
                                        text: '<a style="font-size: 16px; font-family: Monda;">DIAS DA SEMANA</a>',
                                        columns: me.columnDays([1,2,3,4,5])
                                    }, {
                                        cls: 'dark',
                                        text: '<a style="font-size: 16px; font-family: Monda;">FINAL DE SEMANA</a>',
                                        columns: me.columnDays([6,0])
                                    }
                                ],
                                selModel: 'rowmodel',
                                plugins: {
                                    ptype: 'rowediting',
                                    clicksToEdit: 2
                                },
                                listeners: {
                                    edit: 'onDistributionEdit',
                                    beforeedit: 'onDistributionBeforeEdit',
                                    celldblclick: 'onDistributionCellDblClick'
                                }
                                //dockedItems: [
                                //    {
                                //        scale: 'large',
                                //        dock: 'bottom',
                                //        xtype: 'button',
                                //        handler: 'getDistribution',
                                //        text: 'Obter planilha com distribuição',
                                //        showSmartTheme: 'red'
                                //    }
                                //]
                            }, {
                                bodyPadding: 10,
                                xtype: 'personaddress'
                            }, {
                                xtype: 'personphone'
                            }, {
                                xtype: 'personbank'
                            }
                        ]
                    }
                ]
            }
        ];

    }

});