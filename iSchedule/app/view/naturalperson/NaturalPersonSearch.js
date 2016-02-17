//@charset UTF-8
Ext.define( 'iSchedule.view.naturalperson.NaturalPersonSearch', {
    extend: 'Smart.ux.naturalperson.NaturalPersonSearch',

    xtype: 'naturalpersonsearch',

    requires: [
        'Smart.ux.naturalperson.NaturalPersonSearch',
        'iContract.store.naturalperson.NaturalPerson'
    ],

    store: 'iContract.store.naturalperson.NaturalPerson'

});

