﻿import appActions from 'actions/appActions';
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
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';


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
    const dispatch = useDispatch();

    const { isLoading, orcamentos, search } = orcamentoStore;

    const [pageSize, setPageSize] = useState(ConsultaPaginada.QtdPadrao.qtd);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);

    const callback = (error: any) => {

    }

    const callbackDelete = (error: any, message: any) => {
        if (error)
            dispatch(appActions.showSnackBarAction(null, error));
        else if (message)
            dispatch(appActions.showSnackBarAction({ title: 'Info', message: message, type: ISnackBarType.info }, error));
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setOpenDialogDelete(false);
        }
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
            <LoadingButton size="small" onClick={onCloseDialog} color="inherit" text="Cancelar" isLoading={isLoading} />
            <LoadingButton size="small" onClick={confirmDelete} color="secondary" text="Excluir" isLoading={isLoading} />
        </>)
    }

    const onCloseDialog = () => {
        if (!isLoading)
            setOpenDialogDelete(false);
    }

    const confirmDelete = () => {
        dispatch(orcamentoActions.excluirOrcamento(idsSelecionados, callbackDelete));
    }

    return (
        <div>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir os orçamentos selecionados?`} onClose={onCloseDialog} title={"Excluir"} />

            <LoadingCard isLoading={isLoading}>
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