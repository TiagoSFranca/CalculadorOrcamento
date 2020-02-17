import { Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import OrcamentoItemAdicionar from 'components/orcamentoItem/OrcamentoItemAdicionarComponent';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoItemAplicacaoStore';
import OrcamentoItemComponent from './OrcamentoItemComponent';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        marginTop: {
            marginTop: theme.spacing(3)
        },
        button: {
            marginBottom: theme.spacing(1)
        },
    }),
);

const OrcamentoItemListComponent = (props: any) => {
    const classes = useStyles();

    const id = props.match.params.id;

    const orcamentoItemStore = useSelector((s: ApplicationState) => s.orcamentoItemAplicacao);
    const dispatch = useDispatch();

    const { isLoading, orcamentoItens, search } = orcamentoItemStore;

    const callback = (error: any) => {

    }

    useEffect(() => {
        if (search)
            dispatch(OrcamentoStore.actionCreators.requestOrcamentos(callback, id))
    }, [search])

    useEffect(() => {
        console.log(orcamentoItens);
    }, [orcamentoItens]);

    return (
        <div className={classes.marginTop}>
            <LoadingCard isLoading={isLoading}>
                <Grid container justify="flex-end">
                    <OrcamentoItemAdicionar buttonClassName={classes.button} />
                </Grid>

                {orcamentoItens &&
                    orcamentoItens.map((el, index) => (
                        <OrcamentoItemComponent orcamentoItemAplicacao={el} />))}
            </LoadingCard>
        </ div>
    );
}

export default withRouter(OrcamentoItemListComponent);