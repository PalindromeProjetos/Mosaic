//@charset UTF-8
Ext.define( 'iContract.view.person.PersonController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.person',

    onLoadEnd: function (field,file) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');

        field.doFileData(portrait);
        portrait.down('hiddenfield[name=fieldData]').setValue(field.getFileName());
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');

        view.down('form').reset();
        portrait.beFileData();

        Ext.getStore('personphone').removeAll();

        view.down('tabpanel').setActiveTab(0);
        view.down('personphone').setDisabled(true);
        view.down('textfield[name=shortname]').focus(false, 200);
    },

    findedAddress: function (win,rec) {
        var me = this,
            view = me.getView(),
            address = view.down('personaddress'),
            federationunit = address.down('comboenum[name=addressfederationunitdescription]');

        address.down('textfield[name=address]').setValue(rec.get('Logradouro'));
        address.down('maskzipcode[name=addresszipcode]').setValue(rec.get('CEP'));
        address.down('textfield[name=addressneighborhood]').setValue(rec.get('Bairro'));
        address.down('textfield[name=addresslocality]').setValue(rec.get('Localidade'));

        //federationunit.setValue(rec.get('UF'));
        //federationunit.doQuery(rec.get('Localidade')+','+rec.get('UF'));

        win.hide();
    },

    insertBankRecord: function (table, store, eOpts) {
        var me = this,
            view = me.getView(),
            id = view.down('hiddenfield[name=id]').getValue(),
            record = Ext.create('Ext.data.Model', { fields: [{name: 'personid', defaultValue: id }] });

        Ext.widget('personbankedit').show(null,function () {
            this.xdata = record;
            this.down('hiddenfield[name=personid]').setValue(id);
        });

    },

    insertPhoneRecord: function (table, store, eOpts) {
        var me = this,
            view = me.getView(),
            id = view.down('hiddenfield[name=id]').getValue(),
            record = Ext.create('Ext.data.Model', { fields: [{name: 'personid', defaultValue: id }] });

        Ext.widget('personphoneedit').show(null,function () {
            this.xdata = record;
            this.down('hiddenfield[name=personid]').setValue(id);
        });

    }

});