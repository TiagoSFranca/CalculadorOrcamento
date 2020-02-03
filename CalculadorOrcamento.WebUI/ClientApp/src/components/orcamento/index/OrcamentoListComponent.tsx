import { TablePagination } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import MaterialTable, { Column } from 'material-table';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoStore';
import formatter from 'utils/formatter';
import * as ConsultaPaginada from 'utils/consultaPaginada';
import { Route, Redirect, withRouter } from 'react-router';

const columns: Column<OrcamentoStore.Orcamento>[] = [
    { field: 'codigo', title: 'Código' },
    { field: 'nome', title: 'Nome' },
    {
        field: 'descricao',
        title: 'Descrição',
    },
    {
        field: 'dataCriacao',
        title: 'Cadastrado em',
        render: rowData => formatter.formatarData(rowData.dataCriacao)
    },
    {
        field: 'dataAtualizacao',
        title: 'Atualizado em',
        render: rowData => formatter.formatarData(rowData.dataAtualizacao)
    },
];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
    },
});

const OrcamentoListComponent = (props: any) => {

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const dispatch = useDispatch();

    const { isLoading, orcamentos, search } = orcamentoStore;

    const callback = (error: any) => {

    }

    useEffect(() => {
        if (search) {
            console.log("SEARCH")
            dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback));
        }
    }, [search]);

    useEffect(() => {
        if (orcamentos)
            console.log(orcamentos.itens)
    }, [orcamentos]);

    const classes = useStyles();

    const handleChangePage = (newPage: number) => {
        dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback, newPage, orcamentos ? orcamentos.itensPorPagina : null));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
        let row = event.target.value
        dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback, null, row));
    };

    const handleEdit = (id: number) => {
        props.history.push(`/orcamento/${id}`)
    }

    return (
        <div>
            <LoadingCard isLoading={isLoading}>
                {orcamentos && (
                    <>
                        <MaterialTable
                            columns={columns}
                            data={orcamentos.itens}
                            title="Resultado"
                            options={{
                                search: false,
                                exportButton: true,
                                pageSize: orcamentos.itensPorPagina,
                                selection: true,
                            }}
                            actions={[
                                {
                                    position: "row",
                                    icon: 'edit',
                                    tooltip: 'Editar',
                                    onClick: (event, rowData) => {
                                        let orcamento = rowData as OrcamentoStore.Orcamento
                                        handleEdit(orcamento.id);
                                    }
                                },
                                {
                                    position: "toolbarOnSelect",
                                    icon: 'delete',
                                    tooltip: 'Excluir',
                                    onClick: (event, rowData) => {
                                        let orcamento = rowData as OrcamentoStore.Orcamento[]
                                        let ids = orcamento.map(e => e.id);
                                        alert("You want to delete " + ids)
                                    }
                                }
                            ]}
                            components={{
                                Pagination: props => (
                                    <TablePagination
                                        {...props}
                                        rowsPerPageOptions={ConsultaPaginada.Quantidades.map(e => e.qtd)}
                                        rowsPerPage={orcamentos.itensPorPagina}
                                        count={orcamentos.totalItens}
                                        page={orcamentos.pagina - 1}
                                        onChangePage={(e, page) =>
                                            handleChangePage(page + 1)
                                        }
                                        onChangeRowsPerPage={event => {
                                            handleChangeRowsPerPage(event);
                                        }}
                                    />
                                ),
                            }}
                            localization={{
                                pagination: {
                                    labelRowsSelect: 'Itens',
                                    labelDisplayedRows: '{from}-{to} de {count}'
                                },
                                toolbar: {
                                    nRowsSelected: '{0} linha(s) selecionada(s)'
                                },
                                header: {
                                    actions: 'Actions'
                                },
                                body: {
                                    emptyDataSourceMessage: 'Nenhum registro encontrado',
                                    filterRow: {
                                        filterTooltip: 'Filter'
                                    }
                                }
                            }}
                        />
                    </>)
                }
            </LoadingCard>
        </div>
    )
};

export default withRouter(OrcamentoListComponent);