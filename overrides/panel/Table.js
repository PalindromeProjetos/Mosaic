//@charset UTF-8
Ext.define( 'Ext.overrides.panel.Table', {
    override: 'Ext.panel.Table',

    rowLines: false,
    hideHeaders: true,
    recordsRenderer: false,

    initComponent: function () {
        var me = this,
            id = Ext.id();

        me.insertRecordId = id;

        me.viewConfig = {
            deferEmptyText: false,
            loadMask: { msg: 'Carregando...!' },
            emptyText: [
                '<div style="text-align: center;">Nenhum dado disponível...</div>',
                Ext.String.format('<div style="text-align: center;"><h2><i id="{0}"></i></h2></div>',id)
            ]
        };

        me.callParent();

        me.onBefore( 'beforerender', me.fnBeforeRender, me);
    },

    fnBeforeRender: function (view, eOpts) {
        var me = this;

        if(me.columnsRenderer) {
            Ext.each(me.columns,function(column) {
                if(column.renderer === false) {
                    column.renderer = me.columnsRenderer;
                };
            });
        }
    }

});