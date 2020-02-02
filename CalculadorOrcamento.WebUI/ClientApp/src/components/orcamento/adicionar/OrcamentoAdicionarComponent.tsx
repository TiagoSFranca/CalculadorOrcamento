import React from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Card, CardContent, Grid, CardHeader, CardActions, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as OrcamentoStore from 'store/OrcamentoStore';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
    }),
);

type OrcamentoAdicionarForm = {
    nome: string;
    descricao: string;
};

const OrcamentoAdicionarComponent = () => {
    const classes = useStyles();
    const { register, control, errors, handleSubmit } = useForm<OrcamentoAdicionarForm>();
    const dispatch = useDispatch();

    const callback = (error: any) => {

        if (error)
            console.log(error)
        else
            console.log("SUCESSO");
    }

    const onSubmit = (data: any) => {
        dispatch(OrcamentoStore.actionCreators.adicionarOrcamento(data as OrcamentoStore.AdicionarOrcamento, callback));
    };

    return (
        <Grid container justify="center">
            <Grid item xs={6} >
                <Card>
                    <CardHeader title="Novo orçamento" />
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <Grid item xs={6} >
                                <Controller as={
                                    <TextField label="Nome" error={errors.nome ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="nome" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                    />
                                } name="nome" control={control} defaultValue="" rules={{ required: "Campo obrigatório" }} />
                            </Grid>

                            <Grid item xs={12} >
                                <Controller as={
                                    <TextField label="Descrição" error={errors.descricao ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="descricao" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                        multiline
                                        rows={2}
                                        rowsMax={6}
                                    />
                                } name="descricao" control={control} defaultValue="" rules={{
                                    maxLength: {
                                        value: 512,
                                        message: "Tamanho máxio de 512 chars"
                                    }
                                }} />
                            </Grid>
                            <CardActions
                                className={classes.container}>
                                <Grid item xs={12} >
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                    >
                                        Adicionar
      </Button>
                                </Grid>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default OrcamentoAdicionarComponent;
