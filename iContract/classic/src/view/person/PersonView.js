//@charset UTF-8
Ext.define( 'iContract.view.person.PersonView', {
    extend: 'Ext.container.Container',

    xtype: 'personview',

    requires: [
    ],

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

            }
        ];
    }

});