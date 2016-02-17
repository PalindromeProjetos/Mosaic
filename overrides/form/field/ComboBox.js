//@charset UTF-8
Ext.define( 'Ext.overrides.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',

    minChars: 1,
    pageSize: 10,

    //typeAhead: true,
    selectRecord: false,
    hiddenNameId: false,
    defaultSelect: false,
    selectOnFocus: false,
    readOnlyColor: false,
    triggerAction: 'all',

    collapseOnSelect: false,

    valueField: 'id',
    displayField: 'description',

    initComponent: function () {
        var me = this;

        me.callParent();

        me.on({
            focus: { fn: 'fnFocus', scope: me },
            select: { fn: 'fnSelect', scope: me },
            afterrender: { fn: 'fnAfterRender', scope: me }
        });

    },

    fnFocus: function () {
        this.getEl().frame("yellowgreen");
    },

    fnSelect: function (combo, records, eOpts) {
        var ct = combo.ownerCt,
            name = combo.hiddenNameId;

        if (name) {
            ct.down('hiddenfield[name=' + name + ']').setValue(combo.getValue());
        }
    },

    fnAfterRender: function (combo, eOpts) {
        var me = this,
            ct = me.ownerCt,
            name = me.hiddenNameId;

        if (name) {
            ct.add(Ext.widget('hiddenfield', { name: name, itemId: name }));
        }

    },
    
    setValue: function (value, doSelect) {
        var me = this.callParent(arguments);

        if(Ext.isString(value) & !Ext.isNumeric(value)){
            me.setRawValue(value);
            me.validate();
        }

        return me;
    },

    foundRecord: function () {
        var me = this;
        return me.findRecord(me.valueField,me.getValue());
    }

});