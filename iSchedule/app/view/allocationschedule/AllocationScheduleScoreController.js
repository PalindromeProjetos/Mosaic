//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScoreController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.allocationschedulescore',

    requires: [
        'Smart.util.Message'
    ],

    onValidityChange: function (field, isValid, eOpts) {
        var me = this,
            view = me.getView(),
            dateof = view.down('datefield[name=dateof]'),
            dateto = view.down('datefield[name=dateto]'),
            datescore = view.down('datefield[name=datescore]');

        if(dateof.isValid() && dateto.isValid()) {
            datescore.reset();
            datescore.setDisabled(false);
            datescore.setMinValue(dateof.getSubmitData().dateof);
            datescore.setMaxValue(dateto.getSubmitData().dateto);
            datescore.validate();
        }
    },

    onSelect: function (field, value, eOpts) {
        var me = this,
            view = me.getView(),
            label = view.down('label[name=labelperiod]');

        label.setText(me.getDateFormated(value,'DAY_NAME'));
        view.down('combosearch[name=contractorunit]').setDisabled(false);
        view.down('comboenum[name=subunitdescription]').setDisabled(false);
    }

});