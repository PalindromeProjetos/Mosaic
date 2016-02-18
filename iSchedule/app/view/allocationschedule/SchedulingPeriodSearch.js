//@charset UTF-8
Ext.define( 'iSchedule.view.allocationschedule.SchedulingPeriodSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'schedulingperiodsearch',

    pageSize: 0,
    editable: false,

    requires: [
        'Smart.form.field.ComboSearch',
        'iSchedule.store.allocationschedule.SchedulingPeriod'
    ],

    params: 'all',

    fieldLabel: 'Período',

    displayField: 'description',

    store: 'iSchedule.store.allocationschedule.SchedulingPeriod',

    // template for the content List
    tpl: [
        '<tpl style:"font-size: 14px;" for=".">',
            '<div class="x-boundlist-item" style="font-family: Monda;">' +
                '<a style="font-size: 17px; color:#3333FF; display: block;">{description}</a>' +
                '<a style="font-size: 14px; color:#990000; display: block;">{periodof} - {periodto}</a>' +
            '</div>',
        '</tpl>'
    ],

    // template for the content displayField
    displayTpl: [
        '<tpl for=".">',
            '{periodof} - {periodto}',
        '</tpl>'
    ]

});