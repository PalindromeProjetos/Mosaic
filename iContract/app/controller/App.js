//@charset UTF-8
Ext.define( 'iContract.controller.App', {
    extend: 'Smart.ux.app.ApplicationController',

    requires: [
        'Smart.ux.app.ApplicationController'
    ],

    routes: {
        'icontract': {
            action: 'setDefaultPage'
        },
        'contractlist': {
            action: 'setContractList'
        },
        'userslist': {
            action: 'setUsersList'
        },
        'enumtypelist': {
            action: 'setEnumTypeList'
        },
        'shifttypelist': {
            action: 'setShiftTypeList'
        },
        'legalentitylist': {
            action: 'setLegalEntityList'
        },
        'contractorlist': {
            action: 'setContractorList'
        },
        'contractorunitlist': {
            action: 'setContractorUnitList'
        },
        'naturalpersonlist': {
            action: 'setNaturalPersonList'
        }
    },

    //routes ========================>

    setUsersList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'userslist', iconCls: rc.get("iconCls") });
    },

    setEnumTypeList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'enumtypelist', iconCls: rc.get("iconCls") });
    },

    setShiftTypeList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'shifttypelist', iconCls: rc.get("iconCls") });
    },

    setLegalEntityList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'legalentitylist', iconCls: rc.get("iconCls") });
    },

    setContractorList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'contractorlist', iconCls: rc.get("iconCls") });
    },

    setContractorUnitList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'contractorunitlist', iconCls: rc.get("iconCls") });
    },

    setNaturalPersonList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        me.onMainPageView({ xtype: 'naturalpersonlist', iconCls: rc.get("iconCls") });
    }

    //
    //setContractList: function () {
    //    var me = this,
    //        rc = me.getMainTree().getSelection();
    //
    //    me.onMainPageView({ xtype: 'contractlist', iconCls: rc.get("iconCls") });
    //}

    //routes ========================>

});