//@charset UTF-8
Ext.define( 'iContract.view.person.PersonPhoneEdit', {
    extend: 'Ext.window.Window',

    xtype: 'personphoneedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iContract.view.person.PersonController'
    ],

    width: 350,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'person',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Telefone',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buttonAlign: 'center',

    buildItems: function () {
        var me = this;

        me.buttons = [
            {
                scope: me,
                iconCls: "fa fa-upload",
                text: 'Salvar',
                showSmartTheme: 'red',
                handler: 'updateView'
            }, {
                scope: me,
                iconCls: "fa fa-file-o",
                text: 'Novo',
                showSmartTheme: 'red',
                handler: 'insertView'
            }
        ];

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
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Telefone',
                        labelCls: 'sub-title-label',
                        defaultType: 'comboenum',
                        items: [
                            {
                                name: 'id',
                                xtype: 'hiddenfield'
                            }, {
                                name: 'personid',
                                xtype: 'hiddenfield'
                            }, {
                                flex: 1,
                                fieldLabel: 'Tipo de telefone',
                                name: 'linetypedescription',
                                margin: '0 5 0 0'
                            }, {
                                flex: 1,
                                fieldLabel: 'Tipo de linha',
                                name: 'phonetypedescription',
                                margin: '0 0 0 5'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        items: [
                            {
                                width: 50,
                                fieldLabel: 'DDD',
                                name: 'ddd',
                                plugins: 'textmask',
                                money: false,
                                mask: '999',
                                listeners: {
                                    blur: function (field, event, eOpts) {
                                        var personphone = field.up('personphoneedit'),
                                            linetype = personphone.down('hiddenfield[name=linetype]'),
                                            phonenumber = personphone.down('textfield[name=phonenumber]');

                                        phonenumber.setMask('9999-9999');

                                        if(linetype.getValue() == 'C') {
                                            Ext.Ajax.request({
                                                url: 'business/Calls/enumtype.php',
                                                params: {
                                                    query: field.getValue(),
                                                    action: 'select',
                                                    method: 'selectMobileDigit'
                                                },
                                                success: function(response){
                                                    var result = Ext.decode(response.responseText);
                                                    if(result.success == true && result.records != 0) {
                                                        var record = result.rows[0];
                                                        phonenumber.setMask(record.mobiledigit);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                },
                                margin: '0 5 0 0'
                            }, {
                                flex: 1,
                                fieldLabel: 'Telefone',
                                name: 'phonenumber',
                                plugins: 'textmask',
                                money: false,
                                mask: '9999-9999',
                                margin: '0 5 0 5'
                            }, {
                                flex: 1,
                                xtype: 'comboenum',
                                fieldLabel: 'Operadora',
                                name: 'phoneoperatordescription',
                                margin: '0 0 0 5'
                            }
                        ]
                    }, {
                        height: 80,
                        fieldLabel: 'Descrição',
                        xtype: 'textareafield',
                        name: 'description'
                    }, {
                        name: 'isdefault',
                        xtype: 'checkboxfield',
                        boxLabel: 'Número principal'
                    }
                ]
            }
        ]
    },

    updateView: function () {
        var me = this,
            app = me.getController();

        app.setModuleData('personphone');
        app.setModuleForm(me.down('form'));

        app._success = function () {
            me.close();
            Ext.getStore('personphone').load();
        }

        app.updateRecord();

    },

    insertView: function () {
        var me = this;

        me.down('form').reset();

        me.down('hiddenfield[name=personid]').setValue(me.xdata.get('personid'));

    }

});