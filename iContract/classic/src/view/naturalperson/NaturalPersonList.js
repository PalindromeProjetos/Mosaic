//@charset UTF-8
Ext.define( 'iContract.view.naturalperson.NaturalPersonList', {
    extend: 'iContract.view.person.PersonList',

    xtype: 'naturalpersonlist',

    requires: [
        'iContract.view.person.PersonList',
        'iContract.store.naturalperson.NaturalPerson'
    ],

    controller: 'naturalperson',

    title: 'Listar profissionais',

    store: 'iContract.store.naturalperson.NaturalPerson'

});