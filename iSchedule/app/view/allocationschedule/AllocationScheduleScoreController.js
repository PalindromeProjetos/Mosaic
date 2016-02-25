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

    onBeforeEdit: function ( editor, context, eOpts ) {
        context.cancel = [0,3].indexOf(context.colIdx) != -1;
    },

    onCellKeyDown: function (viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this,
            view = me.getView(),
            dateof = view.down('datefield[name=dateof]'),
            dateto = view.down('datefield[name=dateto]'),
            datescore = view.down('datefield[name=datescore]');

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
	
	onCellKeyDownScore: function (viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this,
            view = me.getView();

        if (e.getKey() === e.ESC) {
            view.hide();
            view.xview.down('gridpanel').getView().focusCell( view.xview.hasPosition );
        }

    },

    showScoreView: function (form, eOpts) {
        var me = this,
            show = false,
			search = form.down('naturalpersonsearch'),
            gd = form.xview.down('gridpanel'),
            sm = gd.getSelectionModel(),
            record = sm.getSelection()[0],
            params = record.data;

		search.reset();
        search.focus(false, 200);
		search.getStore().removeAll();

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

                    record.set('id','');
                    form.xdata = record;
                    form.loadRecord(record);
                    params.method = 'selectCode';
                    Ext.getStore('schedulingmonthlyscore').setParams(params).load();
                }
            });

        }

    },

    onBeforeHide: function (form, eOpts) {
        var list = [],
            gd = form.xview.down('gridpanel'),
            sm = gd.getSelectionModel(),
            record = sm.getSelection()[0],
            score = Ext.getStore('schedulingmonthlyscore'),
            dataIndex = gd.getColumnManager().getHeaderAtIndex(form.cellIndex).dataIndex;

        score.each( function (r,i) {
            list.push(r.get('naturalperson'));
        });

        var fieldValue = list.join(", ");

        record.set(dataIndex,fieldValue);

    },

    onUpdateScore: function (combo, record, eOpts) {
        var me = this,
            view = me.getView(),
            grid = view.down('gridpanel');

        me._success = function (form, action) {
            grid.store.load();
        }

        me._failure = function (form, action) {
            grid.store.rejectChanges();
        }

        me.setModuleForm(view);
        me.setModuleData(grid.store);

        me.updateRecord();

    },

    onSelectScore: function (rowModel, record, index, eOpts) {
        var me = this,
            view = me.getView();

        view.loadRecord(record);
    },

    onCellClickScore: function ( viewTable, td, cellIndex, record, tr, rowIndex, e ) {
        var columns = viewTable.getColumnManager().columns.length;

        if(cellIndex != columns-1) {
            return false;
        }

        viewTable.store.remove(record);
        viewTable.store.sync({
            success: function (batch, options) {
                viewTable.store.load();
            }
        });
    }

});