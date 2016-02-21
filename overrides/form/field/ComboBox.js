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

        me.onAfter( 'focus', me.fnFocus, me);
        me.onBefore( 'select', me.fnSelect, me);
        me.onAfter( 'afterrender', me.fnAfterRender, me);

    },

    fnFocus: function () {
        var me = this;

        me.getEl().frame("yellowgreen");
    },

    fnSelect: function (combo, record, eOpts) {
        var comp = combo.up('component'),
            name = combo.hiddenNameId;

        if (name) {
            comp.down('hiddenfield[name=' + name + ']').setValue(combo.getValue());
        }

    },

    fnAfterRender: function (combo, eOpts) {
        var me = this,
            comp = combo.up('component'),
            name = me.hiddenNameId;

        if (name) {
            comp.add(Ext.widget('hiddenfield', { name: name }));
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