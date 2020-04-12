import appActions from 'actions/appActions';
import CustomBreadcrumbs from 'components/app/breadcrumbs/CustomBreadcrumbs';
import OrcamentoAdicionarComponent from 'components/orcamento/adicionar/OrcamentoAdicionarComponent';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OrcamentoAdicionarBreadcrumb, OrcamentoIndexBreadcrumb } from 'utils/breadcrumbs';

const OrcamentoAdicionar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.changePageTitleAction("Novo Orçamento"))
    }, [dispatch]);

    return (
        <>
            <CustomBreadcrumbs showHome={true} itens={[OrcamentoIndexBreadcrumb, OrcamentoAdicionarBreadcrumb]} />
            <OrcamentoAdicionarComponent />
        </>
    );
};

export default OrcamentoAdicionar;