//@charset UTF-8
Ext.define( 'iSchedule.controller.App', {
    extend: 'Smart.ux.app.ApplicationController',

    requires: [
        'Smart.ux.app.ApplicationController'
    ],

    routes: {
        'ischedule': {
            action: 'setDefaultPage'
        },
        'contractlist': {
            action: 'setContractList'
        },
        'allocationschema': {
            action: 'setAllocationSchema'
        },
        'allocationschedule': {
            action: 'setAllocationSchedule'
        },
        'allocationschedulescore': {
            action: 'setAllocationScheduleScore'
        }
    },

    //routes ========================>

    setAllocationSchema: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'allocationschema', iconCls: rc.get("iconCls") });
    },

    setAllocationSchedule: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'allocationschedule', iconCls: rc.get("iconCls") });
    },

    setAllocationScheduleScore: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'allocationschedulescore', iconCls: rc.get("iconCls") });
    }

    //routes ========================>

});