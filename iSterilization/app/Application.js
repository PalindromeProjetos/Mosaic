//@charset UTF-8
Ext.define( 'iSterilization.Application', {
    extend: 'Smart.ux.app.Application',

    name: 'iSterilization',

    controllers: [
        'iSterilization.controller.App'
    ],

    requires: [
        'Smart.ux.app.Application',
        'iSterilization.view.main.Main',
        'iSterilization.view.login.Login'
    ]

});