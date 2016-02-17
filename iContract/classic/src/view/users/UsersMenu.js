//@charset UTF-8
Ext.define( 'iContract.view.users.UsersMenu', {
    extend: 'Ext.tree.Panel',

    xtype: 'usersmenu',

    requires: [
        'Ext.tree.*',
        'Ext.grid.column.*'
    ],

    store: 'usersmenutree',

    useArrows: true,
    rootVisible: false,
    hideHeaders: false,
    multiSelect: false,
    singleExpand: true,
    reserveScrollbar: false,

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
            },
            isDisabledDelete = function (view, rowIdx, colIdx, item, record) {
                return !record.data.usersmenuid;
            };

        me.columns = [
            {
                xtype: 'treecolumn',
                text: 'Descrição do menu',
                dataIndex: 'text',
                flex: 1
            }, {
                text: 'Expira em',
                dataIndex: 'expireto',
                align: 'center',
                width: 100,
                xtype: 'datecolumn',
                editor: {
                    allowBlank: false,
                    xtype: 'datefield',
                    plugins: 'textmask',
                    returnWithMask: true
                }
            }, {
                text: 'Ações',
                width: 90,
                xtype: 'actioncolumn',
                align: 'center',
                items: [
                    {
                        handler: 'onActionUpdateTree',
                        isDisabled: isDisabled,
                        getTip: function(v, meta, rec) {
                            var leaf = rec.data.leaf;
                            if (leaf) {
                                return 'Editar permissões de menu!';
                            } else {
                                return '';
                            }
                        },
                        getClass: function(v, meta, rec) {
                            var leaf = rec.data.leaf;
                            if (leaf) {
                                return "fa fa-pencil action-update-color";
                            } else {
                                return "";
                            }
                        }
                    }, {
                        disabled: true,
                        xtype: 'splitter'
                    }, {
                        handler: 'onActionDeleteTree',
                        isDisabled: isDisabledDelete,
                        getTip: function(v, meta, rec) {
                            if (rec.data.usersmenuid) {
                                return 'Remover permissões de menu!';
                            } else {
                                return '';
                            }
                        },
                        getClass: function(v, meta, rec) {
                            if (rec.data.usersmenuid) {
                                return "fa fa-ban action-delete-color";
                            } else {
                                return "";
                            }
                        }
                    }
                ]
            }
        ];

    }

});