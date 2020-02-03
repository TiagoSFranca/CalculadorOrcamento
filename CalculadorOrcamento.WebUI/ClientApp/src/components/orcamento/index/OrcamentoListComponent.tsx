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

    const { isLoading, orcamentos } = orcamentoStore;

    const callback = (error: any) => {

    }

    useEffect(() => {
        if (!isLoading) {
            dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback));
        }
    }, []);

    useEffect(() => {
        console.log(orcamentos)
    }, [orcamentos]);

    const classes = useStyles();

    const handleChangePage = (newPage: number) => {
        dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback, newPage, orcamentos ? orcamentos.itensPorPagina : null));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
        let row = event.target.value
        dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback, null, row));
    };

    return (
        <div>
            <LoadingCard isLoading={isLoading}>
                {!orcamentos && !isLoading && <div>Not Found</div>}
                {orcamentos && (
                    <>
                        <Paper className={classes.root}>
                            <MaterialTable
                                columns={columns}
                                data={orcamentos.itens}
                                title="Resultado"
                                options={{
                                    search: false,
                                    exportButton: true,
                                    pageSize: orcamentos.itens.length,
                                    selection: true
                                }}
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
                        </Paper>
                    </>)
                }
            </LoadingCard>
        </div>
    )
};

export default OrcamentoListComponent;