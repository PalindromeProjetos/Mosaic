//@charset UTF-8
Ext.define( 'iContract.Application', {
    extend: 'Smart.ux.app.Application',

    name: 'iContract',

    controllers: [
        'iContract.controller.App'
    ],

    requires: [
        'Smart.ux.app.Application',
        'iContract.view.main.Main',
        'iContract.view.login.Login'
    ]

});