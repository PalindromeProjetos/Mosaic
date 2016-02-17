//@charset UTF-8
Ext.define( 'iContract.view.enums.EnumTypeListEdit', {
    extend: 'Ext.window.Window',

    xtype: 'enumtypelistedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window'
    ],

    width: 350,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'enumtype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar item enumerador',

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
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Item',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            useLabelBold: true
                        },
                        items: [
                            {
                                name: 'id',
                                xtype: 'hiddenfield'
                            }, {
                                name: 'enumtypeid',
                                xtype: 'hiddenfield'
                            }, {
                                anchor: '30%',
                                fieldLabel: 'Código',
                                name: 'code'
                            }, {
                                fieldLabel: 'Descrição',
                                name: 'description'
                            }, {
                                height: 130,
                                xtype: 'textareafield',
                                fieldLabel: 'Observação',
                                name: 'observation'
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
            iconCls: "fa fa-upload",
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateEnumList'
        }, {
            iconCls: "fa fa-file-o",
            text: 'Novo',
            showSmartTheme: 'red',
            handler: 'insertEnumList'
        }
    ]

});