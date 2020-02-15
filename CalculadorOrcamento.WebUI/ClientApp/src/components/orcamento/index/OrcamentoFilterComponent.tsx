import { Button, Card, CardActions, CardContent, Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';

type OrcamentoAdicionarForm = {
    codigo?: string;
    nome?: string;
    descricao?: string;
};

const OrcamentoFilter = (props: any) => {
    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const dispatch = useDispatch();
    const { isLoading, orcamentos, search } = orcamentoStore;
    const { register, control, errors, handleSubmit } = useForm<OrcamentoAdicionarForm>();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <div>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Controller as={
                                        <TextField label="Codigo" fullWidth />
                                    } name="codigo" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={3} >
                                    <Controller as={
                                        <TextField label="Nome" fullWidth />
                                    } name="nome" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={6} >
                                    <Controller as={
                                        <TextField label="Descrição" fullWidth />
                                    } name="descricao" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={12} >
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={<SearchIcon />}
                                    >
                                        Pesquisar
      </Button>
                                </Grid>
                            </Grid>
                            <CardActions>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </div>

        </>
    );
};

export default OrcamentoFilter;