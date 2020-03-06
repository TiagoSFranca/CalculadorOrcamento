import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import OcamentoUsuarioAdicionarComponent from 'components/orcamentoUsuario/adicionar/OrcamentoUsuarioAdicionarComponent';
import OrcamentoUsuarioItemComponent from 'components/orcamentoUsuario/item/OrcamentoUsuarioItemComponent';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as OrcamentoUsuarioStore from 'store/OrcamentoUsuarioStore';


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

    const { isLoading, orcamentoUsuarios, search } = orcamentoUsuarioStore;

    const callback = (error: any) => {

    }

    useEffect(() => {
        dispatch(OrcamentoUsuarioStore.actionCreators.requestOrcamentos(callback, id))
    }, []);

    useEffect(() => {
        if (search)
            dispatch(OrcamentoUsuarioStore.actionCreators.requestOrcamentos(callback, id))
    }, [search]);

    return (
        <div className={classes.marginTop}>
            <LoadingCard isLoading={isLoading}>
                <Grid container justify="flex-end">
                    <OcamentoUsuarioAdicionarComponent buttonClassName={classes.button} />
                </Grid>

                {
                    orcamentoUsuarios &&
                    orcamentoUsuarios.length > 0 &&
                    <Grid container spacing={3}>
                        {
                            orcamentoUsuarios.map((el, index) => (
                                <>
                                    <Grid item xs={3}>
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