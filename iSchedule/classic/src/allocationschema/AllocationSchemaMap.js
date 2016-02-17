//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschema.AllocationSchemaMap', {
    extend: 'Ext.grid.Panel',

    xtype: 'allocationschemamap',

	requires: [
        'Ext.grid.Panel',
		'iSchedule.store.allocationschema.AllocationSchemaWeekDay'
	],
	
    cls: 'allocationschemaweek',

    name: 'schemaweekday',

    rowLines: false,
    autoScroll: true,
    columnLines: true,
    hideHeaders: false,

    store: 'allocationschemaweekday',

    viewConfig: {
        loadMask: false,
        loadingText: undefined,
        scroll:false,
        style:{
            overflow: 'auto',
            overflowX: 'hidden'
        }
    },

    listeners: {
        celldblclick: 'onCellDblClickWeekDay'
    },

    initComponent: function () {
        var me = this;
        me.buildField();
        me.callParent();
    },

    buildField: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschema.AllocationSchemaWeekDay');

        me.columns = [];
    },

    buttonAlign: 'center',

    buttons: [
        {
            glyph: 0xe86c,
            scale: 'medium',
            text: 'Salvar',
            showSmartTheme: 'red-dark',
            handler: 'onUpdateSchemaWeekDay'
        }, {
            glyph: 0xec9d,
            scale: 'medium',
            text: 'Limpar',
            showSmartTheme: 'sky',
            handler: 'onDeleteWeekDay'
        }, {
            glyph: 0xe869,
            scale: 'medium',
            text: 'Voltar',
            showSmartTheme: 'green',
            handler: 'onHistoryBack'
        }
    ]

});