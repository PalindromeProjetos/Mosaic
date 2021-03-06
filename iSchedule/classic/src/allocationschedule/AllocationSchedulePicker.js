//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.AllocationSchedulePicker', {
    extend: 'Ext.grid.Panel',

    xtype: 'allocationschedulepicker',

    requires: [
        'iSchedule.store.allocationschedule.AllocationSchedulePicker'
    ],

    cls: 'allocationschedulepicker',

    initComponent: function () {
        var me = this;
        me.buildField();
        me.callParent();
    },

    rowLines: false,
    autoScroll: true,
    columnLines: true,
    hideHeaders: false,

    store: 'allocationschedulepicker',

    viewConfig: {
        loadMask: false,
        loadingText: false,
        scroll: false,
        style: {
            overflow: 'auto',
            overflowX: 'hidden'
        }
    },

    listeners: {
        select: 'startDatePicker'
    },

    columnsRenderer: function (value, meta, record, rowIndex, colIndex, store) {
        var fieldDate = Ext.Date.parse(value, "Y-m-d"),
            periodof = Ext.Date.parse(record.get('periodof'), "Y-m-d"),
            periodto = Ext.Date.parse(record.get('periodto'), "Y-m-d");

        meta.style = Ext.Date.between( fieldDate, periodof, periodto ) ? '' : 'color: rgba(84, 86, 62, .4); background: rgba(84, 86, 62, .1);';

        return Ext.Date.format(fieldDate,'d');
    },

    buildField: function () {
        var me = this;

        Ext.create('iSchedule.store.allocationschedule.AllocationSchedulePicker');

        me.columns = [
            {
                cls: 'ligth',
                flex: 1,
                text: 'S',
                align: 'center',
                sortable: false,
                dataIndex: 'mon',
                resizable: false,
                renderer: me.columnsRenderer
            }, {
                cls: 'ligth',
                flex: 1,
                text: 'T',
                align: 'center',
                sortable: false,
                dataIndex: 'tue',
                resizable: false,
                renderer: me.columnsRenderer
            }, {
                cls: 'ligth',
                flex: 1,
                text: 'Q',
                align: 'center',
                sortable: false,
                dataIndex: 'wed',
                resizable: false,
                renderer: me.columnsRenderer
            }, {
                cls: 'ligth',
                flex: 1,
                text: 'Q',
                align: 'center',
                sortable: false,
                dataIndex: 'thu',
                resizable: false,
                renderer: me.columnsRenderer
            }, {
                cls: 'ligth',
                flex: 1,
                text: 'S',
                align: 'center',
                sortable: false,
                dataIndex: 'fri',
                resizable: false,
                renderer: me.columnsRenderer
            }, {
                cls: 'dark',
                flex: 1,
                text: 'S',
                align: 'center',
                sortable: false,
                dataIndex: 'sat',
                resizable: false,
                renderer: me.columnsRenderer
            }, {
                cls: 'dark',
                flex: 1,
                text: 'D',
                align: 'center',
                sortable: false,
                dataIndex: 'sun',
                resizable: false,
                renderer: me.columnsRenderer
            }
        ]
    }

});