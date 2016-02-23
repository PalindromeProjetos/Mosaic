//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScorePaid', {
    extend: 'Ext.window.Window',

    xtype: 'allocationschedulescorepaid',

    requires: [
        'Ext.selection.CheckboxModel',
        'iContract.store.contractor.*',
        'iContract.store.legalentity.LegalEntity',
        'iContract.store.naturalperson.NaturalPerson',
        'iSchedule.view.naturalperson.NaturalPersonSearch',
        'iSchedule.view.contractor.ContractorUnitSearch',
        'iSchedule.view.allocationschedule.AllocationScheduleController'
    ],

    controller: 'allocationschedule',

    title: 'Manutenção - Plantões Reembolsados',

    width: 400,

    modal: true,
    resizable: false,
    showAnimate: true,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
    }

});
