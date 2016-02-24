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

        if(Ext.Date.between(localDateScore,localDateOf,localDateTo) == true) {
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
            form = view.down('form[name=period]'),
            score = Ext.getStore('allocationschedulescore'),
            labelperiod = view.down('label[name=labelperiod]');

        score.removeAll();
        labelperiod.setText(me.getDateFormated(value,'DAY_NAME'));
        view.down('combosearch[name=contractorunit]').setDisabled(false);
        view.down('comboenum[name=subunitdescription]').setDisabled(false);
        me.onUnitSubUnit();
    },

    onUnitSubUnit: function (combo, record, eOpts) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=period]'),
            score = Ext.getStore('allocationschedulescore'),
            contractorunit = view.down('combosearch[name=contractorunit]'),
            subunitdescription = view.down('comboenum[name=subunitdescription]');

        if(contractorunit.isValid() && subunitdescription.isValid()) {
            if(form.isValid()) {
                var params = form.getValues();

                score.setParams(params).load({
                    callback: function (records, operation, success) {
                        if((records.length != 0) && (success == true)) {
                            var grid = view.down('gridpanel'),
                                selModel = grid.getSelectionModel();

                            selModel.setPosition({ row: 0, column: 0 }, false);
                            grid.getView().focusCell( selModel.getPosition() );
                            //https://www.sencha.com/forum/showthread.php?294911-How-to-move-focus-to-a-specific-grid-cell
                        }
                    }
                });
            }
        }
    },

    onCellKeyDown: function (viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this,
            view = me.getView(),
            dateof = view.down('datefield[name=dateof]'),
            dateto = view.down('datefield[name=dateto]'),
            datescore = view.down('datefield[name=datescore]');

        //if (e.getKey() === e.ENTER) {
        //    me.onCelldDlclick(viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts);
        //    return false;
        //}

        if (e.ctrlKey == true) {
            switch(e.keyCode) {
                case 37:
                    me.onDatePrev(view,datescore,dateof,dateto);
                    break;
                case 39:
                    me.onDateNext(view,datescore,dateof,dateto);
                    break;
            }
        }
    },

    showScoreDone: function (form, eOpts) {
        var me = this,
            show = false,
            gd = form.xview.down('gridpanel'),
            sm = gd.getSelectionModel();

        form.xdata = sm.getSelection()[0];
        var params = form.xdata.data;

        form.down('naturalpersonsearch').focus(false, 200);

        switch(form.cellIndex) {
            case 1:
                show = true;
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D', scoretype: 'R' } );
                break;
            case 2:
                show = true;
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D', scoretype: 'P' } );
                break;
            case 4:
                show = true;
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N', scoretype: 'R' } );
                break;
            case 5:
                show = true;
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N', scoretype: 'P' } );
                break;
        }

        if(show) {
            params.action = 'select';
            params.method = 'selectItem';

            Ext.Ajax.request({
                scope: me,
                url: 'business/Calls/schedulingmonthlyscore.php',
                params: params,
                success: function(response) {
                    var result = Ext.decode(response.responseText),
                        record = Ext.create('Ext.data.Model', result.rows[0]);

                    params.method = 'selectCode';
                    form.loadRecord(record);
                    Ext.getStore('schedulingmonthlyscore').setParams(params).load();
                }
            });

        }

    },

    onCelldDlclick: function (viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me = this,
            show = false,
            view = me.getView(),
            params = record.data;

        switch(cellIndex) {
            case 1:
                show = true;
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D', scoretype: 'R' } );
                break;
            case 2:
                show = true;
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D', scoretype: 'P' } );
                break;
            case 4:
                show = true;
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N', scoretype: 'R' } );
                break;
            case 5:
                show = true;
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N', scoretype: 'P' } );
                break;
        }

        if(!show) {
            params.action = 'select';
            params.method = 'selectItem';
            view.setLoading('Carregando Contagem ...');

            Ext.Ajax.request({
                scope: me,
                url: 'business/Calls/schedulingmonthlyscore.php',
                params: params,
                success: function(response) {
                    var result = Ext.decode(response.responseText),
                        record = Ext.create('Ext.data.Model', result.rows[0]);

                    view.setLoading(false);
                    params.method = 'selectCode';
                    Ext.widget('allocationschedulescoredone').show(null,
                        function() {
                            this.down('form').loadRecord(record);
                            Ext.getStore('schedulingmonthlyscore').setParams(params).load();
                        }
                    );
                }
            });

            //Ext.Ajax.request({
            //    scope: me,
            //    url: 'business/Calls/schedulingmonthlyscore.php',
            //    params: params,
            //    success: function(response) {
            //        var result = Ext.decode(response.responseText);
            //        view.setLoading(false);
            //
            //        //var record = Ext.create('Ext.data.Model', { fields: [{name: 'personid', defaultValue: id }] });
            //        var record = Ext.create('Ext.data.Model', { fields: result.rows[0] });
            //
            //        console.info(record);
            //
            //        //Ext.widget('allocationschedulescoredone').show(null,function(){
            //        //});
            //    }
            //});
        }

    },

    onSelectNaturalPerson: function (combo, record, eOpts) {
        var me = this;
        me.onUpdateScore(combo);
    },

    onUpdateScore: function () {
        var me = this,
            //view = me.getView().down('allocationschedulescoreold'),
            //data = view.xdata,
            //form = view.getActiveItem(),
            view = me.getView(),
            form = view.down('form'),
            grid = form.down('gridpanel');
            //schedulingmonthlypartnersid = form.down('hiddenfield[name=schedulingmonthlypartnersid]');

        //schedulingmonthlypartnersid.setValue(data.get('id'));

        me._success = function (form, action) {
            form.reset();
            grid.store.load();
        }

        me._failure = function (form, action) {
            grid.store.rejectChanges();
        }

        me.setModuleData(grid.store);
        me.setModuleForm(form);
        me.updateModule();
    }

});