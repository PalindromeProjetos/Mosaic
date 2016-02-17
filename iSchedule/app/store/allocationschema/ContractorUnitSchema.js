//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.ContractorUnitSchema', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnitSchema',

    storeId: 'contractorunitschema',

    requires: [
        'iSchedule.model.allocationschema.ContractorUnitSchema'
    ],

    url: 'business/Calls/contractorunitschema.php',

    model: 'iSchedule.model.allocationschema.ContractorUnitSchema'

});