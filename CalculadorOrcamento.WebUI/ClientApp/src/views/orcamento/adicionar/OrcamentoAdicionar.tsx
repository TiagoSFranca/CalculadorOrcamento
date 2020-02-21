import React from 'react';
import OrcamentoAdicionarComponent from 'components/orcamento/adicionar/OrcamentoAdicionarComponent';
import CustomBreadcrumbs from 'components/app/breadcrumbs/CustomBreadcrumbs';
import { OrcamentoIndexBreadcrumb, OrcamentoAdicionarBreadcrumb } from 'utils/breadcrumbs';


export default () => (
    <>
        <CustomBreadcrumbs showHome={true} itens={[OrcamentoIndexBreadcrumb, OrcamentoAdicionarBreadcrumb]} />
        <OrcamentoAdicionarComponent />
    </>
);
