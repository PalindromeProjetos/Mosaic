//@charset UTF-8
Ext.define( 'iContract.model.module.ModuleMenu', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'moduleid',
            type: 'int',
            critical: true
        }, {
            name: 'menuid',
            type: 'int',
            critical: true
        }, {
            name: 'isactive',
            type: 'boolean'
        }, {
            name: 'orderby',
            type: 'auto'
        }
    ]

});