import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import OrcamentoTabsComponent, { Itens } from 'components/orcamento/editar/OrcamentoTabsComponent';
import OrcamentoItemList from 'components/orcamentoItem/OrcamentoItemListComponent';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginBottom: theme.spacing(1),
        },
    }),
);

const OrcamentoIndex = (props: any) => {
    const classes = useStyles();
    return (
        <>
            <OrcamentoTabsComponent tab={Itens} />
            <OrcamentoItemList />
        </>
    );
};

export default withRouter(OrcamentoIndex);