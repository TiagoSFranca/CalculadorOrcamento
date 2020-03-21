import orcamentoActions from 'actions/orcamentoActions';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import CustomTable from 'components/common/customTable/CustomTableComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import { Column } from 'material-table';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { Orcamento } from 'store/orcamento/models';
import * as ConsultaPaginada from 'utils/consultaPaginada';
import formatter from 'utils/formatter';
import loadingHelper from 'utils/loadingHelper';

const LOADING_IDENTIFIER = "btnExcluirOrcamento";

const OrcamentoListComponent = (props: any) => {

    const columns: Column<Orcamento>[] = [
        {
            field: 'codigo',
            title: 'Código'
        },
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

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const appStore = useSelector((s: ApplicationState) => s.app);

    const dispatch = useDispatch();

    const { orcamentos, search } = orcamentoStore;
    const { isLoading, loading } = appStore;

    const [pageSize, setPageSize] = useState(ConsultaPaginada.QtdPadrao.qtd);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);

    const callback = (error: any) => { }

    const callbackDelete = (sucesso: boolean) => {
        if (sucesso)
            setOpenDialogDelete(false);
    }

    useEffect(() => {
        if (orcamentos) {
            setPageSize(orcamentos.itensPorPagina);
        }
    }, [orcamentos]);

    const handleEdit = (id: number) => {
        props.history.push(`/orcamento/editar/${id}/dados`)
    }

    const handleDelete = (ids: number[]) => {
        setIdsSelecionados(ids);
        setOpenDialogDelete(true);
    }

    const dialogActions = () => {
        return (<>
            <LoadingButton size="small" onClick={onCloseDialog} color="inherit" text="Cancelar" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)} />
            <LoadingButton size="small" onClick={confirmDelete} color="secondary" text="Excluir" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)} />
        </>)
    }

    const onCloseDialog = () => {
        if (!isLoading)
            setOpenDialogDelete(false);
    }

    const confirmDelete = () => {
        dispatch(orcamentoActions.excluirOrcamento(idsSelecionados, callbackDelete, LOADING_IDENTIFIER));
    }

    return (
        <div>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir os orçamentos selecionados?`} onClose={onCloseDialog} title={"Excluir"} />

            <LoadingCard isLoading={isLoading && !loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)}>
                <>
                    <CustomTable<Orcamento>
                        refresh={search}
                        columns={columns}
                        data={query =>
                            new Promise((resolve, reject) => {
                                dispatch(orcamentoActions.requestOrcamentos(callback, query, resolve));
                            })
                        }
                        title="Resultado"
                        pageSize={pageSize}
                        pageSizeOptions={ConsultaPaginada.Quantidades.map(e => e.qtd)}
                        isLoading={isLoading}
                        removeOverlay={true}
                        actions={[
                            {
                                position: "row",
                                icon: 'edit',
                                tooltip: 'Editar',
                                onClick: (event, rowData) => {
                                    let orcamento = rowData as Orcamento
                                    handleEdit(orcamento.id);
                                }
                            },
                            {
                                position: "toolbarOnSelect",
                                icon: 'delete',
                                tooltip: 'Excluir',
                                onClick: (event, rowData) => {
                                    let orcamento = rowData as Orcamento[]
                                    let ids = orcamento.map(e => e.id);
                                    handleDelete(ids);
                                }
                            }
                        ]}
                    />
                </>
            </LoadingCard>
        </div>
    )
};

export default withRouter(OrcamentoListComponent);