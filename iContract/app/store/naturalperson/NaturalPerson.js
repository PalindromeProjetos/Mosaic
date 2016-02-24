//@charset UTF-8
Ext.define( 'iContract.store.naturalperson.NaturalPerson', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.NaturalPerson',

    storeId: 'naturalperson',

    pageSize: 5,

    requires: [
        'iContract.model.naturalperson.NaturalPerson'
    ],

    model: 'iContract.model.naturalperson.NaturalPerson',

    url: '../iContract/business/Calls/naturalperson.php',

    config: {
        extraParams: {
            params: Ext.encode(['name','shortname']),
            fields: Ext.encode(['id','name','shortname','filedata','fileinfo','cnesnumber','isactive'])
        }
    }

});