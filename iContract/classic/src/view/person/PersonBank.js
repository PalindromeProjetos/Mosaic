//@charset UTF-8
Ext.define( 'iContract.view.person.PersonBank', {
    extend: 'Ext.grid.Panel',

    xtype: 'personbank',

    requires: [
        'Ext.grid.*',
        'Ext.grid.column.*',
        'Smart.plugins.InsertRecordGrid',
        'iContract.view.person.PersonBankEdit'
    ],

    store: 'personbank',

    iconCls: "fa fa-bank",
    title: 'Bancos',
    cls: 'update-grid',

    hideHeaders: false,
    multiSelect: false,

    listeners: {
        insertrecord: 'insertBankRecord'
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
                text: 'Bancos',
                renderer: function (value,metaData,record) {
                    var agency = record.get('agency'),
                        accountnumber = record.get('accountnumber'),
                        bankdescription = record.get('bankdescription'),
                        accounttypedescription = record.get('accounttypedescription'),
                        floatL = '<div style="float: left; width: auto;">Agência: {0} - Conta: {1} - {2} ({3})</div>',
                        floatR = '<div style="float: right; width: 20px; font-size: 18px;">{0}</div>';

                    return  Ext.String.format(floatL,agency,accountnumber,bankdescription,accounttypedescription) +
                            Ext.String.format(floatR,(record.get('isdefault') ? '<i class="fa fa-bank action-select-color"></i>' : ''));
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
        Ext.widget('personbankedit').show(null,function () {
            this.xdata = record;
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