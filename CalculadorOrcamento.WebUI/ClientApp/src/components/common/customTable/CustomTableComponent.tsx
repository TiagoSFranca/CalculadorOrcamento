import MaterialTable, { Action, Column, Query, QueryResult, MaterialTableProps } from 'material-table';
import * as React from 'react';
import { useEffect, useCallback } from 'react';

type Props<T extends object> = {
    columns: Column<T>[],
    data: ((query: Query<T>) => Promise<QueryResult<T>>),
    pageSize: number,
    pageSizeOptions: number[],
    isLoading: boolean,
    actions?: (Action<T> | ((rowData: T) => Action<T>))[],
    title?: string,
    refresh: boolean,
    removeOverlay?: boolean
}

export default function CustomTable<T extends object>(props: Props<T>) {
    const tableRef = React.createRef();
    const { columns, data, pageSize,
        pageSizeOptions, isLoading, actions,
        title, refresh, removeOverlay } = props;

    const handleRefresh = useCallback(() => {
        let t = tableRef.current as MaterialTableProps<T>;
        if (t && t.onQueryChange)
            t.onQueryChange({
                page: 0,
                pageSize: pageSize,
                filters: [],
                orderBy: {
                },
                orderDirection: "asc",
                search: ''
            })
    }, [pageSize, tableRef])

    useEffect(() => {
        if (refresh)
            handleRefresh();
    }, [refresh, handleRefresh]);

    const mountActions = () => {

        var refreshAction = {
            icon: 'refresh',
            tooltip: 'Recarregar',
            isFreeAction: true,
            onClick: () => { handleRefresh() },
        };

        if (!actions)
            return [refreshAction];

        actions.push(refreshAction);

        return actions;
    }

    const getComponents = () => {
        if (removeOverlay === true)
            return {
                OverlayLoading: () => <div />
            };
        return {};
    }

    return (
        <>
            <MaterialTable
                columns={columns}
                data={data}
                tableRef={tableRef}
                title={title ? title : "Resultado"}
                options={{
                    search: false,
                    exportButton: true,
                    selection: true,
                    pageSize: pageSize,
                    pageSizeOptions: pageSizeOptions,
                }}
                isLoading={isLoading}
                actions={mountActions()}
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
                components={getComponents()}
            />
        </>
    );
}