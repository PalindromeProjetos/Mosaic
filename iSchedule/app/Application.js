//@charset UTF-8
Ext.define( 'iSchedule.Application', {
    extend: 'Smart.ux.app.Application',

    name: 'iSchedule',

    controllers: [
        'iSchedule.controller.App'
    ],

    requires: [
        'Smart.ux.app.Application',
        'iSchedule.view.main.Main',
        'iSchedule.view.login.Login'
    ]


});