import CustomTable from 'components/common/customTable/CustomTableComponent';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import { Column } from 'material-table';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoStore';
import * as ConsultaPaginada from 'utils/consultaPaginada';
import formatter from 'utils/formatter';


const OrcamentoListComponent = (props: any) => {

    const columns: Column<OrcamentoStore.Orcamento>[] = [
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

    const [pageSize, setPageSize] = useState(0);

    const callback = (error: any) => {

    }

    useEffect(() => {
        if (orcamentos) {
            console.log(orcamentos)
            setPageSize(orcamentos.itensPorPagina);
        }
    }, [orcamentos]);

    const handleEdit = (id: number) => {
        props.history.push(`/orcamento/${id}`)
    }

    return (
        <div>
            <LoadingCard isLoading={isLoading}>
                <>
                    <CustomTable<OrcamentoStore.Orcamento>
                        refresh={search}
                        columns={columns}
                        data={query =>
                            new Promise((resolve, reject) => {
                                dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback, query, resolve));
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
                    />
                </>
            </LoadingCard>
        </div>
    )
};

export default withRouter(OrcamentoListComponent);