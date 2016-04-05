//@charset UTF-8
Ext.define( 'iContract.view.person.PersonAddress', {
    extend: 'Ext.panel.Panel',

    xtype: 'personaddress',

    requires: [
        'Smart.fields.*',
        'Smart.address.*',
        'Smart.form.field.ComboEnum'
    ],

    layout: 'anchor',
    reference: 'address',

    overflowY: 'auto',
    iconCls: "fa fa-map-marker",
    title: 'Endereço',

    items: [
        {
            xtype: 'fieldcontainer',
            fieldLabel : 'Logradouro',
            labelCls: 'sub-title-label',
            layout: 'hbox',
            defaultType: 'textfield',
            defaults: {
                allowBlank: false
            },
            items: [
                {
                    flex: 5,
                    xtype: 'textaddress',
                    fieldLabel: 'Rua/avenida/estrada',
                    name: 'address'
                }, {
                    xtype: 'splitter'
                }, {
                    width: 160,
                    fieldLabel: 'Número',
                    name: 'addressnumber'
                }
            ]
        }, {
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            defaults: {
                allowBlank: false
            },
            items: [
                {
                    flex: 5,
                    fieldLabel: 'Bairro',
                    name: 'addressneighborhood'
                }, {
                    xtype: 'splitter'
                }, {
                    width: 160,
                    fieldLabel: 'Cep',
                    xtype: 'maskzipcode',
                    name: 'addresszipcode'
                }
            ]
        }, {
            anchor: '100%',
            xtype: 'textfield',
            fieldLabel: 'Complemento',
            name: 'addresscomplement'
        }, {
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            items: [
                {
                    allowBlank: false,
                    flex: 1,
                    margin: '0 5 0 0',
                    fieldLabel: 'Cidade',
                    name: 'addresslocality'
                }, {
                    allowBlank: false,
                    margin: '0 0 0 5',
                    width: 250,
                    xtype: 'comboenum',
                    fieldLabel: 'Estado',
                    name: 'addressfederationunitdescription'
                }
            ]
        }
    ]

});