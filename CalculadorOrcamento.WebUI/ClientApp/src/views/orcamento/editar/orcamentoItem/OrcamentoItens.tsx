import OrcamentoTabsComponent, { Itens } from 'components/orcamento/editar/OrcamentoTabsComponent';
import OrcamentoItemList from 'components/orcamentoItem/OrcamentoItemListComponent';
import React from 'react';
import { withRouter } from 'react-router-dom';

const OrcamentoIndex = (props: any) => {
    return (
        <>
            <OrcamentoTabsComponent tab={Itens} />
            <OrcamentoItemList />
        </>
    );
};

export default withRouter(OrcamentoIndex);