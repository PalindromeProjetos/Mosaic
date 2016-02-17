//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.AllocationSchemaProcess', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschemaprocess',

    requires: [
        'Ext.window.Window',
        'iSchedule.view.allocationschema.AllocationSchemaController'
    ],

    title: 'Processar Escala do Período Selecionado',

    glyph: 0xec2b,

    modal: true,
    resizable: false,
    showAnimate: true,
    cls: 'panel-frame',

    controller: 'allocationschema',

    width: 600,

    padding: 10,

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
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    useMondaFont: true
                },
                items: [
                    {
                        width: 250,
                        fieldLabel: 'Período',
                        readOnlyColor: true,
                        xtype: 'textfield',
                        name: 'period',
                        fieldStyle: {
                            color: 'blue;',
                            fontSize: '16px;'
                        }
                    }, {
                        xtype: 'hiddenfield',
                        name: 'periodid'
                    }, {
                        height: 300,
                        title: 'Tratar Pré-Processamento',
                        xtype: 'panel',
                        layout: 'fit',
                        items: [
                            {
                                plain: true,
                                ui: 'navigation-items',
                                xtype: 'tabpanel',
                                items: [
                                    {
                                        glyph: 0xe8f5,
                                        title: 'Diurno'
                                        //xtype: 'container'
                                    }, {
                                        glyph: 0xec6e,
                                        title: 'Noturno'
                                        //xtype: 'container'
                                    }, {
                                        glyph: 0xec2c,
                                        title: 'SubUnidades'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

});