import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import OrcamentoUsuarioAdicionar from 'components/orcamentoUsuario/adicionar/OrcamentoUsuarioAdicionarComponent';
import OrcamentoUsuarioItemComponent from 'components/orcamentoUsuario/item/OrcamentoUsuarioItemComponent';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';

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

const OrcamentoUsuarioListComponent = (props: any) => {
    const classes = useStyles();

    const id = props.match.params.id;

    const orcamentoUsuarioStore = useSelector((s: ApplicationState) => s.orcamentoUsuario);
    const dispatch = useDispatch();

    const { orcamentoUsuarios, search } = orcamentoUsuarioStore;

    const callback = (error: any) => { }

    useEffect(() => {
        dispatch(orcamentoUsuarioActions.requestOrcamentoUsuarios(callback, id))
    }, [dispatch, id]);

    useEffect(() => {
        if (search)
            dispatch(orcamentoUsuarioActions.requestOrcamentoUsuarios(callback, id))
    }, [search, dispatch, id]);

    return (
        <div className={classes.marginTop}>
            <LoadingCard isLoading={search}>
                <Grid container justify="flex-end">
                    <OrcamentoUsuarioAdicionar buttonClassName={classes.button} />
                </Grid>

                {
                    orcamentoUsuarios &&
                    orcamentoUsuarios.length > 0 &&
                    <Grid container spacing={3}>
                        {
                            orcamentoUsuarios.map((el, index) => (
                                <>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <OrcamentoUsuarioItemComponent orcamentoUsuario={el} key={el.id} />
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

export default withRouter(OrcamentoUsuarioListComponent);