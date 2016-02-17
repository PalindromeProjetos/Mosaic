//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.ContractorUnitReplacementShow', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnitReplacementShow',

    storeId: 'contractorunitreplacementshow',

    requires: [
        'iSchedule.model.allocationschema.ContractorUnitReplacement'
    ],

    url: 'business/Calls/contractorunitreplacement.php',

    model: 'iSchedule.model.allocationschema.ContractorUnitReplacement',

    groupField: 'shiftdescription'

});