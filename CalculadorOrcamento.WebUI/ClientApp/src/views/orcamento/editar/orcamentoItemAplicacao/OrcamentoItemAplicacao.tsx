import OrcamentoEditarHeaderComponent from 'components/orcamento/editar/OrcamentoEditarHeaderComponent';
import OrcamentoTabsComponent, { ItensAplicacao } from 'components/orcamento/editar/OrcamentoTabsComponent';
import OrcamentoItemAplicacaoListComponent from 'components/orcamentoItemAplicacao/list/OrcamentoItemAplicacaoListComponent';
import React from 'react';

const OrcamentoItemAplicacao = (props: any) => {
    return (
        <>
            <OrcamentoEditarHeaderComponent />
            <OrcamentoTabsComponent tab={ItensAplicacao} />
            <OrcamentoItemAplicacaoListComponent />
        </>
    );
};

export default OrcamentoItemAplicacao;