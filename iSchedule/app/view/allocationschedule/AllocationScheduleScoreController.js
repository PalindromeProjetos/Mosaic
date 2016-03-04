//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleScoreController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.allocationschedulescore',

    requires: [
        'Smart.util.Message',
        'iSchedule.store.allocationschedule.AllocationSchedule'
    ],

    setKeyDown: function ( form, e, eOpts ) {
        var me = this,
            cellIndex = form.cellIndex;

        if (e.getKey() === e.ESC) {
            form.xview.down('gridpanel').getView().focusCell( form.xview.hasPosition );
            form.hide();
        }

        if (e.altKey == true) {
            if([83,115].indexOf(e.keyCode) != -1) {
                if([0,3].indexOf(cellIndex) != -1) {
                    me.onUpdateHours(form,eOpts);
                } else {
                    me.onUpdateScore(form,eOpts);
                }
            }
        }
    },

    onDateMove: function ( form, e, eOpts ) {
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

    onDatePrev: function ( panel, datescore, dateof, dateto ) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=period]');

        if(form.isValid()) {
            me.newScoreDate(datescore,dateof,dateto,'-');
        }
    },

    onDateNext: function ( panel, datescore, dateof, dateto ) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=period]');

        if(form.isValid()) {
            me.newScoreDate(datescore,dateof,dateto,'+');
        }
    },

    setSchedule: function (btn, eOpts) {
        var me = this,
            view = me.getView(),
            datescore = view.down('datefield[name=datescore]'),
            subunit = view.down('hiddenfield[name=subunit]').getValue(),
            contractorunit = view.down('combosearch[name=contractorunit]').getRawValue(),
            contractorunitid = view.down('hiddenfield[name=contractorunitid]').getValue(),
            subunitdescription = view.down('comboenum[name=subunitdescription]').getRawValue();

        Ext.create('iSchedule.store.allocationschedule.AllocationSchedule');

        Ext.widget('allocationschedulenew').show(null, function() {
            this.down('hiddenfield[name=id]').setValue('');
            this.down('datefield[name=dutydate]').setValue(datescore.getValue());
            this.down('hiddenfield[name=contractorunitid]').setValue(contractorunitid);
            this.down('naturalpersonsearch[name=contractorunit]').setValue(contractorunit);
            this.down('hiddenfield[name=subunit]').setValue(subunit);
            this.down('comboenum[name=subunitdescription]').setValue(subunitdescription);
        });
    },

    newScoreDate: function ( datescore, dateof, dateto, signal ) {
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

    onSelectDate: function ( field, value, eOpts ) {
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

    onPeriodDate: function ( field, value, eOpts ) {
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

    onDeletePlan: function (grid, record, colIndex, e, eOpts) {
        var me = this,
            id = null,
            releasetype = null,
            view = me.getView(),
            warning = 'Após a confirmação este plantão será removido da contagem!';

        if(e.ctrlKey == true) {
            Smart.Msg.question("Confirma a remoção deste plantão? <br/> <br/>" + warning, function(btn) {
                if (btn === 'yes') {

                    switch(colIndex) {
                        case 0:
                            id = record.get('idshiftd');
                            releasetype = record.get('releasetyped');
                            break;
                        case 3:
                            id = record.get('idshiftn');
                            releasetype = record.get('releasetypen');
                            break;
                    }

                    view.setLoading('Removendo plantão ...');

                    Ext.Ajax.request({
                        url: 'business/Calls/schedulingmonthlypartners.php',
                        params: {
                            action: 'delete',
                            rows: Ext.encode({id: id, releasetype: releasetype})
                        },
                        callback: function(options,success,response) {
                            view.setLoading(false);

                            if(success) {
                                var result = Ext.decode(response.responseText);
                                if(result.success) {
                                    grid.getStore().load();
                                } else {
                                    Smart.Msg.error(result.text);
                                }
                            }

                        }
                    });
                }
            });
        }

    },

    onBeforeEdit: function ( editor, context, eOpts ) {
        var fd = context.field,
            rd = context.record;

        context.cancel = !rd.get(fd);
    },

    onUnitSubUnit: function ( combo, record, eOpts ) {
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

    onCellKeyDown: function ( viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me = this,
            view = me.getView();

        if (e.getKey() === e.ENTER) {

        }

        me.onDateMove(view,e,eOpts);
    },

    showScoreView: function ( form, eOpts ) {
        var me = this,
            colums = [1,2,4,5],
            method = 'selectPlan',
            gd = form.xview.down('gridpanel'),
            sm = gd.getSelectionModel(),
            record = sm.getSelection()[0],
            params = record.data;

        form.xview.cellIndex = form.cellIndex;

        if(colums.indexOf(form.cellIndex) != -1) {
            var search = form.down('naturalpersonsearch');
            method = 'selectItem';
            search.reset();
            search.focus(false, 200);
            search.getStore().removeAll();
        } else {
            var shifthours = form.down('combobox[name=shifthours]');
            shifthours.reset();
            shifthours.focus(false, 200);
        }

        switch(form.cellIndex) {
            case 0:
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D' } );
                break;
            case 1:
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D', scoretype: 'R' } );
                break;
            case 2:
                params = Ext.merge( params, { query: params.idshiftd, shift: 'D', scoretype: 'P' } );
                break;
            case 3:
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N' } );
                break;
            case 4:
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N', scoretype: 'R' } );
                break;
            case 5:
                params = Ext.merge( params, { query: params.idshiftn, shift: 'N', scoretype: 'P' } );
                break;
        }

        params.method = method;
        params.action = 'select';

        Ext.Ajax.request({
            scope: me,
            url: 'business/Calls/schedulingmonthlyscore.php',
            params: params,
            success: function(response) {
                var result = Ext.decode(response.responseText),
                    record = Ext.create('Ext.data.Model', result.rows[0]);

                record.set('id','');
                form.xdata = record;
                form.xview.fieldValue = record.get('naturalperson');
                form.loadRecord(record);

                if(colums.indexOf(form.cellIndex) != -1) {
                    var store = form.down('gridpanel').store;

                    params.method = 'selectCode';
                    store.removeAll();

                    store.setParams(params).load({
                        callback: function () {
                            var list = [];

                            store.each( function (rd) {
                                list.push(rd.get('naturalperson'));
                            });

                            form.xview.fieldValue = list.join(", ");
                        }
                    });
                }
            }
        });

    },

    onUpdateScore: function ( form, eOpts ) {
        var me = this,
            view = me.getView(),
            grid = view.down('gridpanel');

        me._success = function (form, action) {
            grid.store.load({
                callback: function () {
                    var list = [];

                    grid.store.each( function (rd) {
                        list.push(rd.get('naturalperson'));
                    });

                    view.xview.fieldValue = list.join(", ");

                    view.down('hiddenfield[name=id]').setValue('');
                }
            });
        }

        me._failure = function (form, action) {
            grid.store.rejectChanges();
        }

        view.down('hiddenfield[name=releasetype]').setValue('L');

        me.setModuleForm(view);
        me.setModuleData(grid.store);

        me.updateRecord();

    },

    onUpdateHours: function ( form, eOpts ) {
        var me = this,
            view = me.getView(),
            params = view.getValues();

        params.action = 'update';
        params.rows = Ext.encode(params);

        Ext.Ajax.request({
            scope: me,
            url: 'business/Calls/schedulingmonthlypartners.php',
            params: params,
            success: function(response) {
                view.xview.down('gridpanel').getView().focusCell( view.xview.hasPosition );
                view.hide();
            }
        });

    },

    onSelectScore: function ( rowModel, record, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.loadRecord(record);
    },

    onPickerCollapse: function ( field, eOpts ) {
        var me = this,
            view = me.getView(),
            dataIndex = field.dataIndex,
            gd = view.down('gridpanel'),
            sm = gd.getSelectionModel(),
            record = sm.getSelection()[0],
            modify = (field.getValue() != view.fieldValue);


        record.set(dataIndex,view.fieldValue);
        record.commit();

        if(modify) {
            var pluginscore = gd.getPlugin('pluginscore'),
                getCell = pluginscore.getCell(record,gd.getColumns()[view.cellIndex]);

            getCell.applyStyles(function () {
                    return 'color: blue; font-style: italic;';
                    // OR return { fontStyle: 'italic' };
                }
            );
        }

    },

    onCellClickScore: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            view = me.getView(),
            store = grid.store,
            search = view.down('naturalpersonsearch');

        if(store.getCount() == 1) {
            return false;
        }

        store.remove(record);
        store.sync({
            callback: function () {
                var list = [];

                store.each( function (rd) {
                    list.push(rd.get('naturalperson'));
                });

                search.reset();
                search.focus(false, 200);

                view.xview.fieldValue = list.join(", ");
            }
        });

    },

    onCellKeyDownScore: function ( viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me = this,
            view = me.getView();

        if (e.getKey() === e.ESC) {
            view.xview.down('gridpanel').getView().focusCell( view.xview.hasPosition );
            view.hide();
        }

    }

});