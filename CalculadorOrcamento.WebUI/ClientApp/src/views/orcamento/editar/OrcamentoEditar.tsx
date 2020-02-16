import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { withRouter } from 'react-router-dom';
import OrcamentoEditarComponent from 'components/orcamento/editar/OrcamentoEditarComponent'

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
            <OrcamentoEditarComponent />
        </>
    );
};

export default withRouter(OrcamentoIndex);