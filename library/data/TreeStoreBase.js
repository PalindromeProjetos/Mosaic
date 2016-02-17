//@charset UTF-8
Ext.define( 'Smart.data.TreeStoreBase', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Smart.data.proxy.AjaxBaseTree'
    ],

    proxy: {
        type: 'ajaxbasetree'
    },

    root: {
        text: '.',
        children: [],
        expanded: true
    },

    constructor: function () {
        var me = this;
        me.callParent();
        me.getProxy().setUrl(me.getUrl());
        me.getProxy().setApiUrl();

        me.on({
            write: { fn: 'fnWrite', scope: me },
            beforeload: { fn: 'fnBeforeLoad', scope: me }
        });
    },

    fnWrite: function (store, operation, eOpts) {
        var result = operation.getResultSet();

        if(result.getSuccess() === true) {
            return true;
        } else {
            return false;
        }
    },

    fnBeforeLoad: function (store, operation, eOpts) {
        var me = store;

        me.getProxy().setExtraParams(me.getExtraParams());
    }

});