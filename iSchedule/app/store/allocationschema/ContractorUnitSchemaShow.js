//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.ContractorUnitSchemaShow', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnitSchemaShow',

    storeId: 'contractorunitschemashow',

    requires: [
        'iSchedule.model.allocationschema.ContractorUnitSchema'
    ],

    url: 'business/Calls/contractorunitschema.php',

    model: 'iSchedule.model.allocationschema.ContractorUnitSchema',

    groupField: 'shiftdescription'

});