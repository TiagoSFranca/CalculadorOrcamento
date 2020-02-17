import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { OrcamentoItemAplicacao } from 'store/OrcamentoItemAplicacaoStore';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        icon: {
            verticalAlign: 'bottom',
            height: 20,
            width: 20,
        },
        details: {
            alignItems: 'center',
        },
        column: {
            flexBasis: '33.33%',
        },
        helper: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: theme.spacing(1, 2),
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    }),
);

type Props = {
    orcamentoItemAplicacao: OrcamentoItemAplicacao
}

const OrcamentoItemComponent = (props: Props) => {
    const classes = useStyles();

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading}>{props.orcamentoItemAplicacao.nome}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid item xs={12} >
                    <Grid item xs={12}>
                        <Typography variant="body2">{props.orcamentoItemAplicacao.descricao}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">{props.orcamentoItemAplicacao.observacao}</Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <Button size="small">Excluir</Button>
                <Button size="small" color="primary">
                    Save
          </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}

export default OrcamentoItemComponent;