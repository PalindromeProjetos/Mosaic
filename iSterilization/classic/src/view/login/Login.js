//@charset UTF-8
Ext.define( 'iSterilization.view.login.Login', {
    extend: 'Smart.ux.login.Login',

    xtype: 'login',

    controller: 'login',

    requires: [
        'Smart.ux.login.Login',
        'iSterilization.view.login.LoginController'
    ]

});