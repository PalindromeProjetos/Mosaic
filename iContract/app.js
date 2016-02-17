//@charset UTF-8
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Smart.ux': '../library/ux',
        'Smart.app': '../library/app',
        'Smart.util': '../library/util',
        'Smart.data': '../library/data',
        'Smart.form': '../library/form',
        'Smart.plugins': '../library/plugins',
        'Smart.data.field': '../library/data/field',
        'Smart.form.field': '../library/form/field',
        'Smart.ux.app': '../library/ux/app',
        'Smart.ux.main': '../library/ux/main',
        'Smart.ux.login': '../library/ux/login',
        'Smart.ux.contract': '../library/ux/contract',
        'Smart.ux.contractor': '../library/ux/contractor',
        'Smart.ux.naturalperson': '../library/ux/naturalperson'
    }
});

Ext.application({
    name: 'iContract',

    extend: 'iContract.Application'

});