import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import OrcamentoFilterComponent from 'components/orcamento/index/OrcamentoFilterComponent';
import OrcamentoListComponent from 'components/orcamento/index/OrcamentoListComponent';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

const OrcamentoIndex = () => {
    const classes = useStyles();

    return (
        <>
            <OrcamentoFilterComponent />
            <Grid container justify="flex-end">
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.button}
                    component={props => <Link to="/orcamento/adicionar" {...props} />}
                    startIcon={<AddIcon />}>
                    Novo
      </Button>
            </Grid>
            <OrcamentoListComponent />
        </>
    );
};

export default OrcamentoIndex;