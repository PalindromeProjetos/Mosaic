//@charset UTF-8
Ext.define( 'iContract.store.naturalperson.NaturalPersonDistribution', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.NaturalPersonDistribution',

    storeId: 'naturalpersondistribution',

    requires: [
        'iContract.model.naturalperson.NaturalPersonDistribution'
    ],

    model: 'iContract.model.naturalperson.NaturalPersonDistribution',

    url: '../iContract/business/Calls/naturalpersondistribution.php'

});