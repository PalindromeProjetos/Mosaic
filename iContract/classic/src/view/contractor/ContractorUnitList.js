//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorUnitList', {
    extend: 'iContract.view.person.PersonList',

    xtype: 'contractorunitlist',

    requires: [
        'iContract.store.contractor.ContractorUnit',
        'iContract.view.contractor.ContractorUnitController'
    ],

    controller: 'contractorunit',

    title: 'Listar Unidades',

    store: 'iContract.store.contractor.ContractorUnit'

});