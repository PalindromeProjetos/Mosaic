//@charset UTF-8
Ext.define( 'Smart.plugins.InsertRecordGrid', {
    extend: 'Ext.plugin.Abstract',

    mixins: [
        'Ext.mixin.Observable'
    ],

    alias: "plugin.insertrecordgrid",

    requires: [
        'Ext.plugin.Abstract'
    ],

    init: function(grid) {
        var me = this;

        me.grid = grid;

        if (grid.rendered) {

        } else {
            me.mon(grid, {
                scope: me,
                afterlayout: {
                    fn: me.insertRecordRender,
                    single: true,
                    scope: me
                }
            });
        }
    },

    insertRecordRender: function () {
        var me = this;

        if((me.grid.insertRecordId) && (me.grid.store.getCount() == 0)) {
            Ext.widget('label', {
                renderTo: me.grid.insertRecordId,
                text: 'Inserir Novo Registro',
                style: { cursor: 'pointer', color: 'red' }
            }).getEl().on('click', function () { me.grid.fireEvent('insertrecord', me.grid, me.grid.store, {}); }, me.grid);
        }
    }

});