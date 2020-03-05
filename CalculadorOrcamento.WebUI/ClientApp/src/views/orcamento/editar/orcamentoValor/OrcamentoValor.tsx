import OrcamentoEditarHeaderComponent from 'components/orcamento/editar/OrcamentoEditarHeaderComponent';
import OrcamentoTabsComponent, { Valores } from 'components/orcamento/editar/OrcamentoTabsComponent';
import OrcamentoValorListComponent from 'components/orcamentoValor/list/OrcamentoValorListComponent';
import React from 'react';

const OrcamentoValor = (props: any) => {
    return (
        <>
            <OrcamentoEditarHeaderComponent />
            <OrcamentoTabsComponent tab={Valores} />
            <OrcamentoValorListComponent />
        </>
    );
};

export default OrcamentoValor;