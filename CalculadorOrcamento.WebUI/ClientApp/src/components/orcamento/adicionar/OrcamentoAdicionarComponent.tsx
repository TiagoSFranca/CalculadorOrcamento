import { Card, CardActions, CardContent, CardHeader, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React from "react";
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as OrcamentoStore from 'store/OrcamentoStore';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';

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

const OrcamentoAdicionarComponent = (props: any) => {
    const classes = useStyles();

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const { isLoading } = orcamentoStore;

    const { control, errors, handleSubmit } = useForm<OrcamentoAdicionarForm>();

    const dispatch = useDispatch();

    const callback = (error: any) => {
        if (error) {
            dispatch(AppStore.actionCreators.showSnackBarAction(null, error))
        }
        else {
            dispatch(AppStore.actionCreators.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            props.history.push('/orcamento');
        }
    }


    const onSubmit = (data: any) => {
        dispatch(OrcamentoStore.actionCreators.adicionarOrcamento(data as OrcamentoStore.AdicionarOrcamento, callback));
    };

    return (<>
        <Grid container justify="center">
            <Grid item xs={12} >
                <Card>
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
                                    <LoadingButton
                                        isLoading={isLoading}
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        text="Adicionar" />
                                </Grid>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </>);
};

export default withRouter(OrcamentoAdicionarComponent);
