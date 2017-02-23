//@charset UTF-8
Ext.define( 'Ext.overrides.data.Connection', {
    override: 'Ext.data.Connection',

    // timeout: 30000,

    request: function(options) {
        options = options || {};

        options.headers = {
            'Authorization': '',
            'Credential-Type' : Ext.manifest.appType,
            'Credential-Name' : 'Palindrome Projetos',
            'Credential-Auth' : Ext.util.Cookies.get('Credential-Auth'),
            'Credential-Code' : Ext.util.Cookies.get('Credential-Code'),
            'Credential-Data' : Ext.util.Cookies.get('Credential-Data')
        };

        return this.callParent(arguments);
    }

});