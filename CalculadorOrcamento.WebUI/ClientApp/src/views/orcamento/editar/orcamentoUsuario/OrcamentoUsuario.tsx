import OrcamentoEditarHeaderComponent from 'components/orcamento/editar/OrcamentoEditarHeaderComponent';
import OrcamentoTabsComponent, { Usuarios } from 'components/orcamento/editar/OrcamentoTabsComponent';
import React from 'react';

const OrcamentoUsuario = (props: any) => {
    return (
        <>
            <OrcamentoEditarHeaderComponent />
            <OrcamentoTabsComponent tab={Usuarios} />
        </>
    );
};

export default OrcamentoUsuario;