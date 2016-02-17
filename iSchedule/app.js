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
        'Smart.ux.naturalperson': '../library/ux/naturalperson',
        'iContract.store.contract': '../iContract/app/store/contract',
        'iContract.model.contract': '../iContract/app/model/contract',
        'iContract.store.contractor': '../iContract/app/store/contractor',
        'iContract.model.contractor': '../iContract/app/model/contractor'
    }
});

Ext.application({
    name: 'iSchedule',

    extend: 'iSchedule.Application'

});