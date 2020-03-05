import OrcamentoEditarComponent from 'components/orcamento/editar/OrcamentoEditarComponent';
import OrcamentoEditarHeaderComponent from 'components/orcamento/editar/OrcamentoEditarHeaderComponent';
import OrcamentoTabsComponent, { DadosGerais } from 'components/orcamento/editar/OrcamentoTabsComponent';
import React from 'react';

const OrcamentoEditar = (props: any) => {
    return (
        <>
            <OrcamentoEditarHeaderComponent />
            <OrcamentoTabsComponent tab={DadosGerais} />
            <OrcamentoEditarComponent />
        </>
    );
};

export default OrcamentoEditar;