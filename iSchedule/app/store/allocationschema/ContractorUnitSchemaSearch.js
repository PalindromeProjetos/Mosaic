//@charset UTF-8
Ext.define( 'iSchedule.store.allocationschema.ContractorUnitSchemaSearch', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ContractorUnitSchemaSearch',

    storeId: 'contractorunitschemasearch',

    requires: [
        'iSchedule.model.allocationschema.ContractorUnitSchema'
    ],

    url: 'business/Calls/contractorunitschema.php',

    model: 'iSchedule.model.allocationschema.ContractorUnitSchema',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectLike',
            params: Ext.encode(['shortname']),
            fields: Ext.encode(['id','shortname','contractorunitid','schedulingperiodid','contractorsubunitid','subunitdescription'])
        }
    }

});