﻿import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import OrcamentoItemAplicacaoAdicionar from 'components/orcamentoItemAplicacao/adicionar/OrcamentoItemAplicacaoAdicionarComponent';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as OrcamentoItemAplicacaoStore from 'store/OrcamentoItemAplicacaoStore';
import OrcamentoItemAplicacaoComponent from 'components/orcamentoItemAplicacao/item/OrcamentoItemAplicacaoItemComponent';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marginTop: {
            marginTop: theme.spacing(3)
        },
        button: {
            marginBottom: theme.spacing(1)
        },
    }),
);

const OrcamentoItemAplicacaoListComponent = (props: any) => {
    const classes = useStyles();

    const id = props.match.params.id;

    const orcamentoItemStore = useSelector((s: ApplicationState) => s.orcamentoItemAplicacao);
    const dispatch = useDispatch();

    const { isLoading, orcamentoItens, search } = orcamentoItemStore;

    const callback = (error: any) => {

    }

    useEffect(() => {
        dispatch(OrcamentoItemAplicacaoStore.actionCreators.requestOrcamentos(callback, id))
    }, []);

    useEffect(() => {
        if (search)
            dispatch(OrcamentoItemAplicacaoStore.actionCreators.requestOrcamentos(callback, id))
    }, [search])

    return (
        <div className={classes.marginTop}>
            <LoadingCard isLoading={isLoading}>
                <Grid container justify="flex-end">
                    <OrcamentoItemAplicacaoAdicionar buttonClassName={classes.button} />
                </Grid>

                {orcamentoItens &&
                    orcamentoItens.map((el, index) => (
                        <OrcamentoItemAplicacaoComponent orcamentoItemAplicacao={el} key={el.id} />))}
            </LoadingCard>
        </ div>
    );
}

export default withRouter(OrcamentoItemAplicacaoListComponent);