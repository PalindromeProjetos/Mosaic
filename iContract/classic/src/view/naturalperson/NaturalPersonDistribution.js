//@charset UTF-8
Ext.define( 'iContract.view.naturalperson.NaturalPersonDistribution', {
    extend: 'Ext.grid.Panel',

    xtype: 'naturalpersondistribution',

    requires: [
        'Ext.grid.*',
        'Ext.grid.column.*'
    ],

    store: 'naturalpersondistribution',

    iconCls: "fa fa-cogs",
    title: 'Distribuição',
    cls: 'distribution-edit',

    hideHeaders: false,
    multiSelect: false,
    recordsRenderer: true,

    selModel: 'rowmodel',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },
    listeners: {
        edit: 'onDistributionEdit',
        beforeedit: 'onDistributionBeforeEdit',
        celldblclick: 'onDistributionCellDblClick'
    },

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    columnDays: function (dayList) {
        var dayCode = ['sun','mon','tue','wed','thu','fri','sat'],
            dayName = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            build = function (name,code) {
                var header = {
                    width: 130,
                    text: name,
                    cls: 'light',
                    sortable: false,
                    dataIndex: code + 'description',
                    editor: {
                        updateField: code,
                        xtype: 'contractorunitsearch'
                    },
                    renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        meta.style = ( record.get('shift') == "P" ) ? "text-align: center;" : "";
                        return value;
                    }
                };

                return header;
            },
            field = function () {
                var list = [];

                Ext.each(dayList, function(pos) {
                    var code = dayCode[pos],
                        name = ([0,6].indexOf(pos) != -1 ) ? '<b>' + dayName[pos] + '</b>' : dayName[pos];

                    list.push(build(name,code));
                });

                return list;
            };

        return field();
    },

    makeColumn: function () {
        var me = this;

        me.columns = [
            {
                cls: 'dark',
                text: '<a style="font-size: 16px; font-family: Monda;">DISTRIBUIÇÃO</a>',
                columns: [
                    {
                        width: 200,
                        cls: 'light',
                        text: 'Turnos / Posição',
                        dataIndex: 'shiftdescription',
                        renderer: function (value,meta) {
                            meta.style = "padding-left: 10px; background: rgba(245, 245, 245, 1);";
                            return value;
                        }
                    }
                ]
            }, {
                cls: 'dark',
                text: '<a style="font-size: 16px; font-family: Monda;">DIAS DA SEMANA</a>',
                columns: me.columnDays([1,2,3,4,5])
            }, {
                cls: 'dark',
                text: '<a style="font-size: 16px; font-family: Monda;">FINAL DE SEMANA</a>',
                columns: me.columnDays([6,0])
            }
        ];

    }

});