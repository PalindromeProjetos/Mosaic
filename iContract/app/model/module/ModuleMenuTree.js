//@charset UTF-8
Ext.define( 'iContract.model.module.ModuleMenuTree', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'text',
            type: 'auto'
        }, {
            name: 'router',
            type: 'auto'
        }, {
            name: 'glyph',
            type: 'auto'
        }, {
            name: 'leaf',
            type: 'boolean'
        }, {
            name: 'iconCls',
            type: 'auto',
            convert: function (value,record) {
                return record.get('glyph');
            }
        }
    ]

});