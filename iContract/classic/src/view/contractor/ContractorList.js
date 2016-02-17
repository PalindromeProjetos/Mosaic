//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorList', {
    extend: 'iContract.view.person.PersonList',

    xtype: 'contractorlist',

    requires: [
        'iContract.store.contractor.Contractor',
        'iContract.view.contractor.ContractorController'
    ],

    controller: 'contractor',

    title: 'Listar Contratantes',

    store: 'iContract.store.contractor.Contractor'

});