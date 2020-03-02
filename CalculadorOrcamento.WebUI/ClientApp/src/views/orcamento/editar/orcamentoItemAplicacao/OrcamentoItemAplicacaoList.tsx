import OrcamentoTabsComponent, { ItensAplicacao } from 'components/orcamento/editar/OrcamentoTabsComponent';
import OrcamentoItemAplicacaListComponent from 'components/orcamentoItemAplicacao/OrcamentoItemAplicacaoListComponent';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { OrcamentoIndexBreadcrumb } from 'utils/breadcrumbs';
import CustomBreadcrumbs from 'components/app/breadcrumbs/CustomBreadcrumbs';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as OrcamentoStore from 'store/OrcamentoStore';
import { useDispatch, useSelector } from 'react-redux';

const OrcamentoItemAplicacaoList = (props: any) => {
    const id = props.match.params.id;

    const dispatch = useDispatch();

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const { orcamento } = orcamentoStore;

    const getCallback = (error: any) => {
        if (error) {
            dispatch(AppStore.actionCreators.showSnackBarAction(null, error));
            props.history.push('/orcamento');
        }
    }

    useEffect(() => {
        dispatch(OrcamentoStore.actionCreators.selecionarOrcamento(id, getCallback));
    }, []);

    return (
        <>
            <CustomBreadcrumbs showHome={true} itens={[OrcamentoIndexBreadcrumb, { name: orcamento ? orcamento.nome : '', to: '' }]} />
            <OrcamentoTabsComponent tab={ItensAplicacao} />
            <OrcamentoItemAplicacaListComponent />
        </>
    );
};

export default withRouter(OrcamentoItemAplicacaoList);