import MaterialTable, { Action, Column, Query, QueryResult, MaterialTableProps } from 'material-table';
import * as React from 'react';
import { useEffect } from 'react';

type Props<T extends object> = {
    columns: Column<T>[],
    data: ((query: Query<T>) => Promise<QueryResult<T>>),
    pageSize: number,
    pageSizeOptions: number[],
    isLoading: boolean,
    actions?: (Action<T> | ((rowData: T) => Action<T>))[],
    title?: string,
    refresh: boolean
}

export default function CustomTable<T extends object>(props: Props<T>) {
    const tableRef = React.createRef();

    const refresh = () => {
        let t = tableRef.current as MaterialTableProps<T>;
        if (t && t.onQueryChange)
            t.onQueryChange({
                page: 0,
                pageSize: props.pageSize,
                filters: [],
                orderBy: {
                },
                orderDirection: "asc",
                search: ''
            })
    }

    useEffect(() => {
        if (props.refresh)
            refresh();
    }, [props.refresh]);

    return (
        <>
            <MaterialTable
                columns={props.columns}
                data={props.data}
                tableRef={tableRef}
                title={props.title ? props.title : "Resultado"}
                options={{
                    search: false,
                    exportButton: true,
                    selection: true,
                    pageSize: props.pageSize,
                    pageSizeOptions: props.pageSizeOptions,
                }}
                isLoading={props.isLoading}
                actions={[

                    {
                        icon: 'refresh',
                        tooltip: 'Recarregar',
                        isFreeAction: true,
                        onClick: () => { refresh() },
                    }
                ]}
                localization={{
                    pagination: {
                        labelRowsSelect: 'Itens',
                        labelDisplayedRows: '{from}-{to} de {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} linha(s) selecionada(s)'
                    },
                    header: {
                        actions: 'Ações'
                    },
                    body: {
                        emptyDataSourceMessage: 'Nenhum registro encontrado',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
            />
        </>
    );
}