//@charset UTF-8
Ext.define( 'iContract.view.legalentity.LegalEntityList', {
    extend: 'iContract.view.person.PersonList',

    xtype: 'legalentitylist',

    requires: [
        'iContract.view.person.PersonList',
        'iContract.store.legalentity.LegalEntity'
    ],

    controller: 'legalentity',

    title: 'Listar Empresas',

    store: 'iContract.store.legalentity.LegalEntity'

});