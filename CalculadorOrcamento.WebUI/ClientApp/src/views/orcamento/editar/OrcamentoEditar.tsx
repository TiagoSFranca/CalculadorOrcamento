import CustomBreadcrumbs from 'components/app/breadcrumbs/CustomBreadcrumbs';
import OrcamentoEditarComponent from 'components/orcamento/editar/OrcamentoEditarComponent';
import OrcamentoTabsComponent, { DadosGerais } from 'components/orcamento/editar/OrcamentoTabsComponent';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as OrcamentoStore from 'store/OrcamentoStore';
import { OrcamentoIndexBreadcrumb } from 'utils/breadcrumbs';

const OrcamentoEditar = (props: any) => {
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

    useEffect(() => {
        dispatch(AppStore.actionCreators.changePageTitleAction(orcamento ? orcamento.nome : ''))
    }, [orcamento])

    return (
        <>
            <CustomBreadcrumbs showHome={true} itens={[OrcamentoIndexBreadcrumb, { name: orcamento ? orcamento.nome : '', to: '' }]} />
            <OrcamentoTabsComponent tab={DadosGerais} />
            <OrcamentoEditarComponent />
        </>
    );
};

export default withRouter(OrcamentoEditar);