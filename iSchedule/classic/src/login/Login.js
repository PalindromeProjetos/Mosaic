//@charset UTF-8
Ext.define( 'iSchedule.view.login.Login', {
    extend: 'Smart.ux.login.Login',

    xtype: 'login',

    controller: 'login',

    requires: [
        'Smart.ux.login.Login',
        'iSchedule.view.login.LoginController'
    ]

});