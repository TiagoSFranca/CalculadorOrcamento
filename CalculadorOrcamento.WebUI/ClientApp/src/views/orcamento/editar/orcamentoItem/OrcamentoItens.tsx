import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { withRouter } from 'react-router-dom';
import OrcamentoTabsComponent, { Itens } from 'components/orcamento/editar/OrcamentoTabsComponent'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

const OrcamentoIndex = (props: any) => {
    const classes = useStyles();
    return (
        <>
            <OrcamentoTabsComponent tab={Itens} />
            ITENS
        </>
    );
};

export default withRouter(OrcamentoIndex);