import OrcamentoEditarComponent from 'components/orcamento/editar/OrcamentoEditarComponent';
import OrcamentoTabsComponent, { DadosGerais } from 'components/orcamento/editar/OrcamentoTabsComponent';
import React from 'react';
import { withRouter } from 'react-router-dom';

const OrcamentoIndex = (props: any) => {
    return (
        <>
            <OrcamentoTabsComponent tab={DadosGerais} />
            <OrcamentoEditarComponent />
        </>
    );
};

export default withRouter(OrcamentoIndex);