//@charset UTF-8
Ext.define( 'iContract.view.login.Login', {
    extend: 'Smart.ux.login.Login',

    xtype: 'login',

    controller: 'login',

    requires: [
        'Smart.ux.login.Login',
        'iContract.view.login.LoginController'
    ]

});