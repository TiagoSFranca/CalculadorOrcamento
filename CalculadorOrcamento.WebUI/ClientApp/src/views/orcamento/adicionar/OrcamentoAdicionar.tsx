import CustomBreadcrumbs from 'components/app/breadcrumbs/CustomBreadcrumbs';
import OrcamentoAdicionarComponent from 'components/orcamento/adicionar/OrcamentoAdicionarComponent';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as AppStore from 'store/AppStore';
import { OrcamentoAdicionarBreadcrumb, OrcamentoIndexBreadcrumb } from 'utils/breadcrumbs';


const OrcamentoAdicionar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AppStore.actionCreators.changePageTitleAction("Novo Orçamento"))
    }, []);

    return (
        <>
            <CustomBreadcrumbs showHome={true} itens={[OrcamentoIndexBreadcrumb, OrcamentoAdicionarBreadcrumb]} />
            <OrcamentoAdicionarComponent />
        </>
    );
};

export default OrcamentoAdicionar;