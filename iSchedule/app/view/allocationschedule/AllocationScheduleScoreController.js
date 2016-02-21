//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScoreController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.allocationschedulescore',

    requires: [
        'Smart.util.Message'
    ],

    onDatePrev: function (panel,datescore,dateof,dateto) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=period]');

        if(form.isValid()) {
            me.newScoreDate(datescore,dateof,dateto,'-');
        }
    },

    onDateNext: function (panel,datescore,dateof,dateto) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=period]');

        if(form.isValid()) {
            me.newScoreDate(datescore,dateof,dateto,'+');
        }
    },

    newScoreDate: function (datescore,dateof,dateto,signal) {
        var me = this,
            localDateOf = Ext.Date.parse(dateof.getSubmitData().dateof, "Y-m-d"),
            localDateTo = Ext.Date.parse(dateto.getSubmitData().dateto, "Y-m-d"),
            localDateScore = Ext.Date.parse(datescore.getSubmitData().datescore, "Y-m-d");

        switch(signal) {
            case '-':
                localDateScore.setDate(localDateScore.getDate() -1);
                break;
            case '+':
                localDateScore.setDate(localDateScore.getDate() +1);
                break;
        }

        if( Ext.Date.between(localDateScore,localDateOf,localDateTo) == true) {
            datescore.setValue(localDateScore);
            me.onPeriodDate(datescore,Ext.Date.parse(datescore.getSubmitData().datescore, "Y-m-d"));
        }

    },

    onSelectDate: function (field, value, eOpts) {
        var me = this,
            view = me.getView(),
            dateof = view.down('datefield[name=dateof]'),
            dateto = view.down('datefield[name=dateto]'),
            datescore = view.down('datefield[name=datescore]');

        if(dateof.isValid() && dateto.isValid()) {
            datescore.reset();
            datescore.setDisabled(false);
            datescore.setValue(dateof.getSubmitData().dateof);
            Ext.getStore('allocationschedulescore').removeAll();
            datescore.setMinValue(dateof.getSubmitData().dateof);
            datescore.setMaxValue(dateto.getSubmitData().dateto);
            me.onPeriodDate(datescore,Ext.Date.parse(dateof.getSubmitData().dateof, "Y-m-d"));
        }
    },

    onPeriodDate: function (field, value, eOpts) {
        var me = this,
            view = me.getView(),
            labelperiod = view.down('label[name=labelperiod]');

        Ext.getStore('allocationschedulescore').removeAll();
        labelperiod.setText(me.getDateFormated(value,'DAY_NAME'));
        view.down('combosearch[name=contractorunit]').setDisabled(false);
        view.down('comboenum[name=subunitdescription]').setDisabled(false);
    },

    onUnitSubUnit: function (combo, record, eOpts) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=period]'),
            contractorunit = view.down('combosearch[name=contractorunit]'),
            subunitdescription = view.down('comboenum[name=subunitdescription]');

        if(contractorunit.isValid() && subunitdescription.isValid()) {
            if(form.isValid()) {
               console.info(form.getValues());
            }
        }
    }

});