//@charset UTF-8
Ext.define( 'iContract.model.contractor.Contractor', {
    extend: 'iContract.model.person.Person',

    requires: [
        'iContract.model.person.Person'
    ],

    fileImage: 'hospital',

    fields: [
        {
            name: 'type',
            type: 'auto',
            critical: true,
            defaultValue: 'C'
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