//@charset UTF-8
Ext.define( 'iContract.model.person.Person', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.util.Resource',
        'Smart.data.identifier.Auto'
    ],

    configs: {
        fileImage: 'smart'
    },

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
            name: 'shortname',
            type: 'auto'
        }, {
            name: 'cnesnumber',
            type: 'auto'
        }, {
            name: 'address',
            type: 'auto'
        }, {
            name: 'mainmail',
            type: 'auto'
        }, {
            name: 'addressneighborhood',
            type: 'auto'
        }, {
            name: 'addresscomplement',
            type: 'auto'
        }, {
            name: 'addresszipcode',
            type: 'int'
        }, {
            name: 'addressnumber',
            type: 'auto'
        }, {
            name: 'addresslocality',
            type: 'auto'
        }, {
            name: 'addressfederationunit',
            type: 'auto'
        }, {
            name: 'addressfederationunitdescription',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'bool'
        }, {
            name: 'filedata',
            type: 'auto',
            convert: function (value,record) {
                return (value) ? value : Smart.Resource.getFileImage('anest');
            }
        }, {
            name: 'fileinfo',
            type: 'auto'
        }, {
            name: 'filetype',
            type: 'auto',
            convert: function (value,record) {
                var info = record.get('fileinfo'),
                    type = (info && info.length !== 0) ? Ext.decode(info) : null;
                return (type) ? Ext.String.format('data:{0};base64,{1}',type.fileType,record.get('filedata')) : record.get('filedata');
            }
        }
    ],

    business: [
        { type: 'presence', field: 'name' },
        { type: 'presence', field: 'shortname' },
        { type: 'presence', field: 'cnesnumber' },
        { type: 'length', field: 'name', min: 3, max: 80 },
        { type: 'length', field: 'shortname', min: 3, max: 60 }
    ]

});