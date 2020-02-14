import MaterialTable, { Action, Column, Query, QueryResult } from 'material-table';
import * as React from 'react';

type Props<T extends object> = {
    columns: Column<T>[],
    data: ((query: Query<T>) => Promise<QueryResult<T>>),
    pageSize: number,
    pageSizeOptions: number[],
    isLoading: boolean,
    actions?: (Action<T> | ((rowData: T) => Action<T>))[],
    title?: string,
}

export default function CustomTable<T extends object>(props: Props<T>) {
    const tableRef = React.createRef();

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
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => {
                            //tableRef.current && tableRef.current.onQueryChange()
                            console.log(tableRef.current)
                        },
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