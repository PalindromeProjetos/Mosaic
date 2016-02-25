//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationScheduleController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.allocationschedule',

    requires: [
        'Smart.util.Message'
    ],

    onFilterScore: function (field, newValue, oldValue, eOpts) {
        var me = this,
            view = me.getView().down('allocationschedulescoreold'),
            form = view.down('form[name=selectscore]'),
            layout = form.getLayout();

        layout.setActiveItem(newValue.filterscore);
        layout.getActiveItem().down('gridpanel').store.load();
    },

    onClosedScore: function () {
        var me = this;
        me.onChangeMonthlyScore(false);
    },

    onUpdateScore: function () {
        var me = this,
            view = me.getView().down('allocationschedulescoreold'),
            data = view.xdata,
            form = view.getActiveItem(),
            grid = form.down('gridpanel'),
            schedulingmonthlypartnersid = form.down('hiddenfield[name=schedulingmonthlypartnersid]');

        schedulingmonthlypartnersid.setValue(data.get('id'));

        me._success = function (form, action) {
            grid.store.load();
        }

        me._failure = function (form, action) {
            grid.store.rejectChanges();
        }

        me.setModuleData(grid.store);
        me.setModuleForm(form);
        me.updateModule();
    },

    onInsertScore: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=updatescore]'),
            card = form.down('form[name=selectscore]');

        card.reset();
        card.getLayout().getActiveItem().down('gridpanel').getSelectionModel().deselectAll();
    },

    onSelectShiftHours: function (combo, record, eOpts) {
        var me = this,
            view = me.getView().down('allocationschedulescoreold');

        view.xdata.set('shifthours',combo.getValue());

        view.xdata.store.sync({
            success: function (batch, options) {
                view.xdata.commit();
            }
        });
    },

    onSelectNaturalPerson: function (combo, record, eOpts) {
        var me = this;
        me.onUpdateScore(combo);
    },

    onCellClickScore: function ( viewTable, td, cellIndex, record, tr, rowIndex, e ) {
        var me = this,
            view = me.getView().down('allocationschedulescoreold'),
            form = view.getActiveItem(),
            dataIndex = viewTable.getColumnManager().getHeaderAtIndex(cellIndex).dataIndex,
            warning = 'O Sócio será removido da presente lista!';

        if(dataIndex != '') {
            return false;
        }

        Smart.Msg.question("Confirma a remocao deste registro? <br/> <br/>" + warning, function(btn) {
            if (btn === 'yes') {
                viewTable.store.remove(record);
                viewTable.store.sync({
                    success: function (batch, options) {
                        viewTable.store.load();
                        form.reset();
                    }
                });
            }
        });
    },

    onSelectScore: function (rowModel, record, index, eOpts) {
        var me = this,
            view = me.getView().down('allocationschedulescoreold'),
            form = view.getActiveItem();
        form.loadRecord(record);
    },

    startPublishSchedule: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            params = form.getValues(),
            warning = 'Após a confirmação os dados da Escala não poderão mais ser editados!';

        params.action ='select';
        params.method ='setPublishSchedule';

        Smart.Msg.question("Confirma a publicação desta escala? <br/> <br/>" + warning, function(btn) {
            if (btn === 'yes') {

                view.setLoading('Publicando Escala Mensal ...');

                Ext.Ajax.request({
                    timeout: (60000 * 10), // 10 minutos
                    url: 'business/Calls/schedulingmonthlypartners.php',
                    params: params,
                    success: function(response){
                        view.setLoading(false);
                        view.close();
                    }
                });
            }
        });

    },

    onShowDirectorShip: function (win) {
        var me = this,
            param = {},
            view = me.getView(),
            store = Ext.getStore('contractorunit');

        param.limit = 0;
        param.action = 'select';
        param.method = 'selectLike';

        //view.setLoading('Carregando escala ...');

        store.setParams(param).load({
            scope: me,
            callback: function(records, operation, success) {
                //view.setLoading(false);
            }
        });
    },

    showDirectorShip: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            win = Ext.widget('allocationscheduledirectorship');

        win.show(null, function() {
            win.down('hiddenfield[name=status]').setValue(period.status);
            win.down('hiddenfield[name=periodid]').setValue(period.getValue());
            win.down('textfield[name=period]').setValue(period.getDisplayValue());
        },me);
    },

    startScheduleScore: function (btn) {
        var me = this,
            params = {},
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            status = period.foundRecord().get('status'),
            warning = 'A escala estará habilitada para Contagem somente após esta confirmação!';

        if(status != 'P') {
            Ext.Msg.show({
                title:'Gerando Contagem!',
                message: 'A escala atual não está no status de publicada!',
                buttons: Ext.Msg.CANCEL,
                icon: Ext.Msg.WARNING
            });
        } else {
            params.action ='select';
            params.method ='startScheduleScore';
            params.periodid = period.getValue();

            Smart.Msg.question("Confirma o processamento da Contagem desta escala? <br/> <br/>" + warning, function(btn) {
                if (btn === 'yes') {

                    view.setLoading('Gerando Contagem da Escala Mensal ...');

                    Ext.Ajax.request({
                        url: 'business/Calls/schedulingmonthlypartners.php',
                        params: params,
                        success: function(response){
                            view.setLoading(false);
                            view.down('gridpanel').status = 'C';
                            period.foundRecord().set('status','C');
                            view.down('button[name=statusP]').setDisabled(true);
                            view.down('button[name=statusC]').setDisabled(true);
                            view.down('button[name=statusE]').setDisabled(false);
                            Ext.getStore('allocationschedule').load();
                        }
                    });
                }
            });
        }
    },

    showPublishSchedule: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            win = Ext.widget('publishschedule');

        if(period.status == 'P') {
            Ext.Msg.show({
                title:'Publicando Escala!',
                message: 'A escala atual já está no status de publicada!',
                buttons: Ext.Msg.CANCEL,
                icon: Ext.Msg.WARNING
            });
        } else {
            win.show(null, function() {
                win.down('hiddenfield[name=status]').setValue(period.status);
                win.down('hiddenfield[name=periodid]').setValue(period.getValue());
                win.down('textfield[name=period]').setValue(period.getDisplayValue());
            },me);

        }
    },

    showSelectSchedule: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            record = period.getSelectedRecord();

        window.open('business/Calls/Report/Schedule.php?action=selectSchedule&period='+record.get('id'));
    },

    showSelectScheduleContagem: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            record = period.getSelectedRecord(),
            params = { limit: 1000 },
            win = Ext.widget('allocationschedulescorereport');

        win.show(null,function(){
            Ext.getStore('contractorunitexclud').setParams(params).load();
            Ext.getStore('contractorsubunitexclud').setParams(params).load();
        });
    },

    showSelectScheduleExtrato: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            record = period.getSelectedRecord(),
            params = { limit: 1000 },
            win = Ext.widget('allocationscheduleextractreport');

        win.show(null,function(){
            Ext.getStore('contractorunitexclud').setParams(params).load({

            });
            //Ext.getStore('contractorsubunitexclud').setParams(params).load({
            //});
        });
    },

    showSelectScheduleVerifyPay: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            record = period.getSelectedRecord(),
            params = { limit: 1000 },
            win = Ext.widget('allocationscheduleverifypayreport');

        win.show(null,function(){
            Ext.getStore('contractorunitexclud').setParams(params).load({

            });
            //Ext.getStore('contractorsubunitexclud').setParams(params).load({
            //});
        });
    },

    showFrequencySheet: function () {
        var me = this,
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            record = period.getSelectedRecord(),
            win = Ext.widget('allocationschedulefrequencysheet');

        win.show(null, function() {
            var dateof = win.down('datefield[name=dateof]'),
                dateto = win.down('datefield[name=dateto]'),
                periodof = record.toDate(record.get('periodof')),
                periodto = record.toDate(record.get('periodto'));

            dateof.setValue(periodof);
            dateto.setValue(periodto);
            dateof.setMinValue(periodof);
            dateto.setMaxValue(periodto);

            win.down('hiddenfield[name=periodid]').setValue(period.getValue());
            win.down('textfield[name=period]').setValue(period.getDisplayValue());
        },me);
    },

    showScoreReport: function () {
        var me = this,
            view = me.getView(),
            contractorunitlist = [],
            contractorsublist = [],
            form = view.down('form'),
            data = form.getValues(),
            list = view.down('gridpanel[name=contractorunitexclud]').getSelectionModel().getSelection(),
            listSub = view.down('gridpanel[name=contractorsubunitexclud]').getSelectionModel().getSelection(),
            url = 'business/Calls/Report/ScheduleScore.php?',
            qrp = 'legalentityid={0}&periodof={1}&periodto={2}&contractorunitid={3}&subunit={4}&unitexclud={5}&subexclud={6}',
            unitexclud = '',
            subexclud = '';

        if(form.isValid()) {
            if(list.length) {
                Ext.each(list,function(record, index) {
                    contractorunitlist.push(parseInt(record.get('id')));
                },me);
                unitexclud = Ext.encode(contractorunitlist);
            }

            if(listSub.length) {
                Ext.each(listSub,function(record, index) {
                    contractorsublist.push(record.get('subunit'));
                },me);
                subexclud = Ext.encode(contractorsublist);
            }

            window.open(Ext.String.format(url + qrp,data.legalentityid,data.periodof,data.periodto,data.contractorunitid,data.subunit, unitexclud, subexclud));
        }
    },

    showExtractReport: function () {
        var me = this,
            view = me.getView(),
            contractorunitlist = [],
            contractorsublist = [],
            form = view.down('form'),
            data = form.getValues(),
            list = view.down('gridpanel[name=contractorunitexclud]').getSelectionModel().getSelection(),
            url = 'business/Calls/Report/ScheduleExtract.php?',
            qrp = 'periodof={0}&periodto={1}&naturalperson={2}&unitexclud={3}',
            unitexclud = '';

        if(form.isValid()) {

            if(list.length) {
                Ext.each(list,function(record, index) {
                    contractorunitlist.push(parseInt(record.get('id')));
                },me);
                unitexclud = Ext.encode(contractorunitlist);
            }

            window.open(Ext.String.format(url + qrp,data.periodof,data.periodto,data.naturalperson, unitexclud));
        }
    },

    showVerifyPayReport: function () {
        var me = this,
            view = me.getView(),
            contractorunitlist = [],
            contractorsublist = [],
            form = view.down('form'),
            data = form.getValues(),
            list = view.down('gridpanel[name=contractorunitexclud]').getSelectionModel().getSelection(), //        listSub = view.down('gridpanel[name=contractorsubunitexclud]').getSelectionModel().getSelection(),
            url = 'business/Calls/Report/ScheduleVerifyPay.php?',
            qrp = 'periodof={0}&periodto={1}&contractorunitid={2}&unitexclud={3}',
            unitexclud = '',
            subexclud = '';

        console.info(data);

        if(form.isValid()) {

            if(list.length) {
                Ext.each(list,function(record, index) {
                    contractorunitlist.push(parseInt(record.get('id')));
                },me);
                unitexclud = Ext.encode(contractorunitlist);
            }
            window.open(Ext.String.format(url + qrp,data.periodof,data.periodto, data.contractorunitid, unitexclud));
        }
    },

    showReportDirectorShip: function (btn) {
        var me = this,
            contractorunitlist = [],
            form = btn.up('window').down('form'),
            grid = form.down('gridpanel'),
            data = form.getValues(),
            list = grid.getSelectionModel().getSelection(),
            url = 'business/Calls/Report/DirectorShip.php?',
            qrp = 'periodid={0}&contractorunitlist={1}&status={2}';

        if(list.length) {
            var status = data.status,
                periodid = data.periodid;

            Ext.each(list,function(record, index) {
                contractorunitlist.push(parseInt(record.get('id')));
            },me);

            window.open(Ext.String.format(url + qrp,periodid,Ext.encode(contractorunitlist),status));
        } else {

        }
    },

    showReportSheetFrequency: function (btn) {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            data = form.getValues(),
            url = 'business/Calls/Report/SheetFrequency.php?',
            qrp = 'periodid={0}&contractorunitid={1}&subunit={2}&subunittext={3}&dateof={4}&dateto={5}&status={6}&showlabel={7}';

        data.subunittext = form.down('comboenum[name=subunitdescription]').getRawValue();

        if(form.isValid()) {
            var status = data.status,
                periodid = data.periodid,
                contractorunitid = data.contractorunitid,
                subunit = data.subunit,
                dateof = data.dateof,
                dateto = data.dateto,
                showlabel = data.showlabel;
            window.open(Ext.String.format(url + qrp,periodid,contractorunitid,subunit,data.subunittext,dateof,dateto,status,showlabel));
        }
    },

    updateAllocationSchedule: function (btn) {
        var me = this,
            view = me.getView(),
            form = view.down('form');

        me._success = function (batch, options) {
            var namturalperson = view.down('naturalpersonsearch[name=naturalperson]').getRawValue();
            view.zdata.set(view.dataIndex + 'description',namturalperson);
            view.zdata.commit();
            view.close();
        }

        me.setModuleData('tmp_turningmonthly');
        me.setModuleForm(form);
        me.updateRecord();
    },

    insertAllocationSchedule: function (btn) {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            status = view.down('hiddenfield[name=status]').getValue(),
            store = (status == 'A') ? Ext.create('iSchedule.store.allocationschedule.TMP_TurningMonthly') : Ext.create('iSchedule.store.allocationschedule.SchedulingMonthlyPartners');

        me._success = function (batch, options) {
            view.close();
            Ext.getStore('allocationschedule').load();
        }

        me.setModuleData(store);
        me.setModuleForm(form);
        me.updateModule();
    },

    onShowAllocationScheduleEdit: function (view) {
        var me = this,
            form = view.down('form'),
            fields = [
                'dutydate',
                'position',
                'contractorunit',
                'shiftdescription',
                'subunitdescription'
            ];

        form.loadRecord(view.xdata);

        Ext.each(fields,function (field) {
            form.getForm().findField(field).setReadColor(true);
        });

        form.down('hiddenfield[name=releasetype]').setValue('M');
    },

    onShowAllocationScheduleNew: function (view) {
        var me = this,
            form = view.down('form'),
            fields = [
                'position',
                'contractorunit'
            ];

        form.loadRecord(view.xdata);

        Ext.each(fields,function (field) {
            form.getForm().findField(field).setReadColor(true);
        });

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('hiddenfield[name=releasetype]').setValue('M');
    },

    onBeforeItemKeyDown: function ( rowModel, record, index, eOpts ) {
        var me = this;

        me.onChangeMonthlyScore(false);
    },

    onCellClick: function ( viewTable, td, cellIndex, record, tr, rowIndex, e ) {
        var me = this,
            param = {},
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            status = period.foundRecord().get('status'),
            dataIndex = viewTable.getColumnManager().getHeaderAtIndex(cellIndex).dataIndex;

        if(status == 'P') {
            return false;
        }

        if((cellIndex < 2) && (cellIndex != 0)) {
            return false;
        }

        if((record.get(dataIndex) == "...")||(!record.get(dataIndex.replace("description","")))) {
            return false;
        }

        if (e.ctrlKey === true) {

            if(cellIndex != 0) {
                Ext.Msg.show({
                    title:'Removendo Sócio agendado!',
                    message: 'Confirma a remoção deste sócio agendado?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            viewTable.setLoading('Removendo o registro...');
                            Ext.Ajax.request({
                                scope: me,
                                url: 'business/Calls/tmp_turningmonthly.php',
                                params: {
                                    action: 'select',
                                    method: 'updateNaruralPerson',
                                    query: record.get(dataIndex.replace("description",""))
                                },
                                callback: function(options, success, response) {
                                    viewTable.setLoading(false);
                                    record.set(dataIndex,'...');
                                    record.commit();
                                }
                            });
                        }
                    }
                });
            } else {
                if(parseInt(record.get('bordertop')) == 1) {
                    Ext.widget('allocationschedulenew', {
                        xdata: record,
                        dataIndex: dataIndex
                    }).show(null, function() {
                        this.down('hiddenfield[name=status]').setValue(status);
                        this.down('datefield[name=dutydate]').setMinValue(period.foundRecord().get('periodof'));
                        this.down('datefield[name=dutydate]').setMaxValue(period.foundRecord().get('periodto'));
                    });
                }
            }
        }
    },

    onCellKeyDown: function ( viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me = this;

        if (e.getKey() === e.ENTER) {
            me.onScheduleCelldDlclick(viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts);
        }
    },

    onScheduleCelldDlclick: function (viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me = this,
            param = {},
            view = me.getView(),
            period = view.down('schedulingperiodsearch'),
            status = period.foundRecord().get('status'),
            fieldName = viewTable.getColumnManager().getHeaderAtIndex(cellIndex).dataIndex,
            dataIndex = fieldName.replace("description","");

        me.onChangeMonthlyScore(false);

        if(cellIndex < 2) {
            return false;
        }

        if(!record.get(dataIndex.replace("description",""))) {
            return false;
        }

        if(status == 'C') {

            if(record.get(fieldName) == '...') {
                return false;
            }

            view.setLoading('Carregando contagem da escala ...');

            param = {
                query: record.get(dataIndex),
                action: 'select',
                method: 'selectCode',
                period: period.getValue(),
                dataIndex: dataIndex,
                rows: Ext.encode(record.data)
            };

            var storePartners = Ext.create('iSchedule.store.allocationschedule.SchedulingMonthlyPartners');

            storePartners.setParams(param).load({
                scope: me,
                callback: function(records, operation, success) {
                    var record = records[0];
                    view.setLoading(false);
                    me.onChangeMonthlyScore(true,record,param);
                }
            });

        }

        if(status == 'A') {
            view.setLoading('Carregando edição da escala ...');

            param = {
                query: record.get(dataIndex),
                action: 'select',
                method: 'selectCode',
                period: period.getValue(),
                dataIndex: dataIndex,
                rows: Ext.encode(record.data)
            };

            var storeTurning = Ext.create('iSchedule.store.allocationschedule.TMP_TurningMonthly');

            storeTurning.setParams(param).load({
                scope: me,
                callback: function(records, operation, success) {
                    view.setLoading(false);
                    Ext.widget('allocationscheduleedit', {
                        xdata: records[0],
                        zdata: record,
                        dataIndex: dataIndex
                    }).show();
                }
            });
        }
    },

    onFilterSchedule: function ( field, newValue, oldValue, eOpts ) {
        var me = this,
            view = me.getView(),
            store = Ext.getStore('allocationschedule'),
            filter = view.down('radiogroup[name=filter]').getValue();

        store.clearFilter();

        switch(parseInt(filter.filtertype)) {
            case 1:
                store.filter('contractorunit',newValue);
                break;
            case 2:
                store.filterBy(
                    function(record){
                        var filter = record.get('mondescription').toLowerCase() + " " +
                            record.get('tuedescription').toLowerCase() + " " +
                            record.get('weddescription').toLowerCase() + " " +
                            record.get('thudescription').toLowerCase() + " " +
                            record.get('fridescription').toLowerCase() + " " +
                            record.get('satdescription').toLowerCase() + " " +
                            record.get('sundescription').toLowerCase();

                        if (filter.indexOf(newValue.toLowerCase()) != -1) return record;
                    }
                );
                break;
        }
    },

    onChangeMonthlyScore: function ( newValue, record, param ) {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=updatescore]'),
            bbar = view.down('toolbar[name=updatescore]'),
            changestatus = view.down('segmentedbutton[name=changestatus]');

        form.reset();

        if(newValue) {
            form.show();
            bbar.show();
            changestatus.hide();

            var storeR = view.down('gridpanel[name=schedulingmonthlyscoreR]').store;
            var storeP = view.down('gridpanel[name=schedulingmonthlyscoreP]').store;

            view.down('allocationschedulescoreold').xdata = record;

            view.down('combobox[name=shifthours]').setValue(record.get('shifthours'));

            param.scoretype = 'R';
            storeR.setParams(param).load();
            param.scoretype = 'P';
            storeP.setParams(param).load();

        } else {
            form.hide();
            bbar.hide();
            form.reset();
            changestatus.show();
        }
    },

    onBeforeQuery: function ( queryPlan, eOpts ) {
        var combo = queryPlan.combo,
            store = combo.store;

        store.setParams({
            status: combo.status,
            params: combo.params
        });
    },

    selectSchedule: function (record) {
        var me = this,
            param = {},
            view = me.getView(),
            days = [0,1,2,3,4,5,6],
            grid = view.down('allocationscheduleweek'),
            store = Ext.getStore('allocationschedule'),
            period = view.down('schedulingperiodsearch'),
            status = period.foundRecord().get('status'),
            label = view.down('label[name=labelperiod]');

        grid.status = status;

        param.status = period.status;
        param.action = 'select';
        param.method = 'selectSchedule';
        param.period = period.getValue();
        param.dateOf = record.get('dateof');
        param.dateTo = record.get('dateto');

        me.onChangeMonthlyScore(false);

        //view.setLoading('Carregando escala ...');

        store.setParams(param).load({
            scope: me,
            callback: function(records, operation, success) {
                //view.setLoading(false);
                var d = 0,
                    columns = grid.getColumnManager().getColumns(),
                    dateOf = Ext.Date.parse(record.get('dateof'), "Y-m-d");

                for (i = 2; i < days.length +2; i++) {
                    dateOf = Ext.Date.parse(record.get('dateof'), "Y-m-d");
                    dateOf.setDate(dateOf.getDate() + d);
                    columns[i].setText(grid._columnText[columns[i].dataIndex] + ' ' + dateOf.getDate()+'/'+ grid._monthList[parseInt(dateOf.getMonth())]);
                    d++;
                }

                grid.getView().setScrollY(3000, true);
                grid.getView().setScrollY(0, true);

                var dateOfstr = me.getDateFormated(Ext.Date.parse(record.get('dateof'), "Y-m-d"));
                var dateTostr = me.getDateFormated(Ext.Date.parse(record.get('dateto'), "Y-m-d"));

                label.setText((dateOfstr != dateTostr) ? (dateOfstr +' - '+ dateTostr): dateOfstr);
            }
        });
    },

    startDatePicker: function(rowModel, record, index, eOpts) {
        var me = this;
        me.selectSchedule(record);
    },

    onSelectPeriod: function ( combo, record, eOpts ) {
        var me = this,
            param = {},
            view = me.getView(),
            status = record.get('status'),
            picker = view.down('allocationschedulepicker'),
            schedule = view.down('container[name=schedule]'),
            buttonP = view.down('button[name=statusP]'),
            buttonC = view.down('button[name=statusC]'),
            buttonE = view.down('button[name=statusE]');

        schedule.setDisabled(false);

        buttonP.setDisabled(true);
        buttonC.setDisabled(true);
        buttonE.setDisabled(true);

        if(status == 'A') buttonP.setDisabled(false);
        if(status == 'P') buttonC.setDisabled(false);
        if(status == 'C') buttonE.setDisabled(false);

        param.action = 'select';
        param.method = 'selectSchedulePicker';
        param.period = record.get('id');

        view.setLoading('Carregando semanas do periodo ...');

        picker.store.setParams(param).load({
            scope: me,
            callback: function(records, operation, success) {
                view.setLoading(false);
                picker.getSelectionModel().select(0);
            }
        });
    }

});