import OrcamentoEditarHeaderComponent from 'components/orcamento/editar/OrcamentoEditarHeaderComponent';
import OrcamentoTabsComponent, { Usuarios } from 'components/orcamento/editar/OrcamentoTabsComponent';
import OrcamentoUsuarioListComponent from 'components/orcamentoUsuario/list/OrcamentoUsuarioListComponent';
import React from 'react';

const OrcamentoUsuario = (props: any) => {
    return (
        <>
            <OrcamentoEditarHeaderComponent />
            <OrcamentoTabsComponent tab={Usuarios} />
            <OrcamentoUsuarioListComponent />
        </>
    );
};

export default OrcamentoUsuario;