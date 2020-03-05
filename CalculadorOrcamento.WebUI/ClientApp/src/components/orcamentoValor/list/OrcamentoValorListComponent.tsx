import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import OrcamentoValorAdicionar from 'components/orcamentoValor/adicionar/OrcamentoValorAdicionar';
import OrcamentoValorItemComponent from 'components/orcamentoValor/item/OrcamentoValorItemComponent';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as OrcamentoValorStore from 'store/OrcamentoValorStore';


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

const OrcamentoValorListComponent = (props: any) => {
    const classes = useStyles();

    const id = props.match.params.id;

    const orcamentoValorStore = useSelector((s: ApplicationState) => s.orcamentoValor);
    const dispatch = useDispatch();

    const { isLoading, orcamentoValores, search } = orcamentoValorStore;

    const callback = (error: any) => {

    }

    useEffect(() => {
        dispatch(OrcamentoValorStore.actionCreators.requestOrcamentos(callback, id))
    }, []);

    useEffect(() => {
        if (search)
            dispatch(OrcamentoValorStore.actionCreators.requestOrcamentos(callback, id))
    }, [search]);

    return (
        <div className={classes.marginTop}>
            <LoadingCard isLoading={isLoading}>
                <Grid container justify="flex-end">
                    <OrcamentoValorAdicionar buttonClassName={classes.button} />
                </Grid>

                {
                    orcamentoValores &&
                    orcamentoValores.length > 0 &&
                    <Grid container spacing={3}>
                        {
                            orcamentoValores.map((el, index) => (
                                <>
                                    <Grid item xs={3}>
                                        <OrcamentoValorItemComponent orcamentoValor={el} key={el.id} />
                                    </Grid>
                                </>
                            ))
                        }
                    </Grid>
                }
            </LoadingCard>
        </ div >
    );
}

export default withRouter(OrcamentoValorListComponent);