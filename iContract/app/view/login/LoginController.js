//@charset UTF-8
Ext.define( 'iContract.view.login.LoginController', {
    extend: 'Smart.ux.login.LoginController',

    alias: 'controller.login',

    url: '../iContract/business/Calls/users.php',

    requires: [
        'Smart.ux.login.LoginController'
    ]

});