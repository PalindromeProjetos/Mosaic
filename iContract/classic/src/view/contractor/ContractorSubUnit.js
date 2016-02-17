//@charset UTF-8
Ext.define( 'iContract.view.contractor.ContractorSubUnit', {
    extend: 'Ext.grid.Panel',

    xtype: 'contractorsubunit',

    requires: [
        'Ext.grid.*',
        'Ext.grid.column.*'
    ],

    store: 'contractorsubunit',

    iconCls: "fa fa-phone",
    title: 'SubUnidades',
    cls: 'update-grid',

    hideHeaders: false,
    multiSelect: false,
    renderButtonNew: true,

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    onCheckChange: function (checkcolumn, rowIndex, checked, eOpts) {
        var me = this,
            grid = checkcolumn.up('contractorsubunit'),
            sm = grid.getSelectionModel(),
            store = grid.store,
            showCheck = checked ? {
                name: 'reserved',
                xtype: 'checkboxfield',
                boxLabel: 'Tornar esta SubUnidade Exclusiva?'
            } : {};

        sm.select(rowIndex);

        var record = sm.getSelection()[0];

        Ext.widget('window', {
            width: 400,
            modal: true,
            layout: 'fit',
            autoShow: true,
            title: checked ? 'Inclusao!' : 'Exclusao!',
            items: [
                {
                    padding: 10,
                    xtype: 'form',
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Confirmar Operacao na Lista de SubUnidades?',
                            style: {
                                color: 'blue;',
                                fontSize: '14px;'
                            }
                        }, showCheck
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    scope: me,
                    text: 'Confirmar',
                    handler: function (btn) {
                        if(!checked) {
                            store.remove(record);
                        } else {
                            var reserved = btn.up('window').down('checkboxfield[name=reserved]').getValue();
                            record.set('id','');
                            record.set('reserved',reserved);
                        }
                        store.sync({
                            scope: me,
                            success: function ( batch, options ) {
                                btn.up('window').close();
                            },
                            failure: function ( batch, options ) {
                                var resultSet = batch.getOperations().length !== 0 ? batch.operations[0].getResultSet() : null;

                                if(resultSet) {
                                    Ext.Msg.show({
                                        title: 'Operacao falhou!',
                                        msg: resultSet.getMessage(),
                                        buttons: Ext.Msg.CANCEL,
                                        icon: Ext.Msg.WARNING
                                    });
                                }
                            }
                        });
                    }
                }, {
                    scope: me,
                    text: 'Cancelar',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }
            ],
            listeners:  {
                destroy: function () {
                    store.load();
                }
            }
        });
    },

    makeColumn: function () {
        var me = this;

        me.columns = [
            {
                width: 45,
                xtype: 'checkcolumn',
                dataIndex: 'isactive',
                listeners: {
                    scope: me,
                    checkchange: 'onCheckChange'
                }
            }, {
                flex: 1,
                text: 'SubUnidades',
                dataIndex: 'subunitdescription',
                renderer: function (value, meta, rec) {
                    var reserved = rec.get('reserved') ? '<span style="color: #FF6E48;"><i class="icon-lock"></i></span>' : '';
                    return value + reserved;
                }
            }
        ];

    }

});