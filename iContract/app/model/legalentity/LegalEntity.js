//@charset UTF-8
Ext.define( 'iContract.model.legalentity.LegalEntity', {
    extend: 'iContract.model.person.Person',

    requires: [
        'iContract.model.person.Person'
    ],

    classFields: [
        {
            name: 'type',
            type: 'auto',
            critical: true,
            defaultValue: 'L'
        }, {
            name: 'cnpjnumber',
            type: 'auto'
        }, {
            name: 'countyregistration',
            type: 'auto'
        }, {
            name: 'maincontact',
            type: 'auto'
        }
    ]

});