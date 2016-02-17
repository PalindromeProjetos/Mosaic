//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.ContractorUnitReplacement', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnitReplacement',

    storeId: 'contractorunitreplacement',

    requires: [
        'iSchedule.model.allocationschema.ContractorUnitReplacement'
    ],

    url: 'business/Calls/contractorunitreplacement.php',

    model: 'iSchedule.model.allocationschema.ContractorUnitReplacement'

});