//@charset UTF-8
Ext.define( 'iContract.view.person.PersonPhone', {
    extend: 'Ext.grid.Panel',

    xtype: 'personphone',

    requires: [
        'Ext.grid.*',
        'Ext.grid.column.*',
        'Smart.plugins.InsertRecordGrid',
        'iContract.view.person.PersonPhoneEdit'
    ],

    store: 'personphone',

    iconCls: "fa fa-phone",
    title: 'Telefones',
    cls: 'update-grid',

    hideHeaders: false,
    multiSelect: false,

    listeners: {
        insertrecord: 'insertPhoneRecord'
    },

    plugins: {
        ptype: 'insertrecordgrid'
    },

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, record) {
                return record.data.isdefault;
            };

        me.columns = [
            {
                flex: 1,
                text: 'Telefones',
                renderer: function (value,metaData,record) {
                    var ddd = record.get('ddd'),
                        linetypedescription = record.get('linetypedescription'),
                        phonenumber = Smart.maskRenderer(record.get('mobiledigit'),false)(record.get('phonenumber'));

                    return  '('+ ddd +') '+ phonenumber + ' - ' + linetypedescription;
                }
            }, {
                flex: 1,
                text: 'Operadoras',
                renderer: function (value,metaData,record) {
                    var phoneoperator = record.get('phoneoperator'),
                        phonetypedescription = record.get('phonetypedescription'),
                        phoneoperatordescription = record.get('phoneoperatordescription'),
                        floatL = '<div style="float: left; width: auto;">{0} {1} - {2}</div>',
                        floatR = '<div style="float: right; width: 20px; font-size: 18px;">{0}</div>';

                    return  Ext.String.format(floatL,phoneoperator,phoneoperatordescription,phonetypedescription) +
                            Ext.String.format(floatR,(record.get('isdefault') ? '<i class="fa fa-phone action-select-color"></i>' : ''));
                }
            }, {
                text: 'Ações',
                width: 90,
                xtype: 'actioncolumn',
                align: 'center',
                items: [
                    {
                        scope: me,
                        handler: 'onActionUpdate',
                        tooltip: 'Editar cadastro!',
                        iconCls: "fa fa-pencil action-update-color"
                    }, {
                        disabled: true,
                        xtype: 'splitter'
                    }, {
                        scope: me,
                        handler: 'onActionDelete',
                        isDisabled: isDisabled,
                        getTip: function(v, meta, rec) {
                            if (!rec.data.isdefault) {
                                return 'Remover telefone!';
                            } else {
                                return '';
                            }
                        },
                        getClass: function(v, meta, rec) {
                            if (!rec.data.isdefault) {
                                return "fa fa-ban action-delete-color";
                            } else {
                                return "";
                            }
                        }
                    }
                ]
            }
        ];

    },

    onActionUpdate: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var mobiledigit = record.get('mobiledigit');

        Ext.widget('personphoneedit').show(null,function () {
            this.xdata = record;
            this.down('textfield[name=phonenumber]').setMask(mobiledigit);
            this.down('form').loadRecord(record);
        });

    },

    onActionDelete: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var store = grid.getStore();

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    store.remove(record);
                    store.sync({
                        callback: function (batch, options) {
                            store.load();
                        }
                    });
                }
            }
        );

    }

});