import { Card, CardActions, CardContent, Grid, InputAdornment, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import appActions from 'actions/appActions';
import orcamentoValorActions from 'actions/orcamentoValorActions';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { EditarOrcamentoValor, OrcamentoValor } from 'store/orcamentoValor/models';
import formatter from 'utils/formatter';
import { requiredMessage } from 'utils/hooksValidations';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        label: {
            color: theme.palette.text.secondary,
        },
        marginLeft: {
            marginLeft: theme.spacing(1)
        },
        actions: {
            padding: theme.spacing(1)
        }
    }),
);

type Props = {
    orcamentoValor: OrcamentoValor
}

type OrcamentoValorEditarForm = {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
};

const OrcamentoValorItemComponent = (props: Props) => {
    const classes = useStyles();

    const { control, errors, handleSubmit, register, watch, setValue, triggerValidation } = useForm<OrcamentoValorEditarForm>();

    const orcamentoValorStore = useSelector((s: ApplicationState) => s.orcamentoValor);
    const { isLoading } = orcamentoValorStore;

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

    const callback = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setEdit(false);
        }
    }

    const callbackDelete = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setOpenDialogDelete(false);
        }
    }

    const onSubmit = (data: OrcamentoValorEditarForm) => {
        data.id = props.orcamentoValor.id;
        data.idOrcamento = props.orcamentoValor.idOrcamento;
        data.valorHora = +data.valorHora;
        data.multiplicador = +data.multiplicador;

        dispatch(orcamentoValorActions.editarItem(data.id, data as EditarOrcamentoValor, callback));
    };

    const dialogActions = () => {
        return (<>
            <LoadingButton size="small" onClick={onCloseDialog} color="inherit" text="Cancelar" isLoading={isLoading} />
            <LoadingButton size="small" onClick={confirmDelete} color="secondary" text="Excluir" isLoading={isLoading} />
        </>)
    }

    const onCloseDialog = () => {
        if (!isLoading)
            setOpenDialogDelete(false);
    }

    const confirmDelete = () => {
        dispatch(orcamentoValorActions.excluirItem(props.orcamentoValor.id, callbackDelete));
    }

    return (
        <>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir o item?`} onClose={onCloseDialog} title={"Excluir"} />

            <Card >
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {!edit ? (
                                    <>
                                        <Typography variant="overline" className={classes.label}>Valor da hora:</Typography>
                                        <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarDinheiro(props.orcamentoValor.valorHora)}</Typography>
                                    </>
                                ) : (
                                        <CustomController
                                            as={
                                                <TextField label="Valor da hora" error={errors.valorHora ? true : false}
                                                    fullWidth
                                                    helperText={
                                                        <ErrorMessage errors={errors} name="valorHora" >
                                                            {({ message }) => message}
                                                        </ErrorMessage>
                                                    }
                                                    InputProps={{
                                                        inputComponent: NumberFormat as any,
                                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                                    }}
                                                    inputRef={register({
                                                        validate: value => value > 0 || "O valor deve ser maior que zero"
                                                    })}
                                                />
                                            }
                                            name="valorHora"
                                            control={control}
                                            defaultValue={props.orcamentoValor.valorHora}
                                            rules={{
                                                required: requiredMessage()
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                            <Grid item xs={12}>
                                {!edit ? (
                                    <>
                                        <Typography variant="overline" className={classes.label}>Multiplicador:</Typography>
                                        <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoValor.multiplicador)}x</Typography>
                                    </>
                                ) : (
                                        <CustomController
                                            as={
                                                <TextField label="Multiplicador" error={errors.multiplicador ? true : false}
                                                    fullWidth
                                                    helperText={
                                                        <ErrorMessage errors={errors} name="multiplicador" >
                                                            {({ message }) => message}
                                                        </ErrorMessage>
                                                    }
                                                    InputProps={{
                                                        inputComponent: NumberFormat as any,
                                                        startAdornment: <InputAdornment position="start">x</InputAdornment>,
                                                    }}
                                                    inputRef={register({
                                                        validate: value => value > 0 || "O valor deve ser maior que zero"
                                                    })}
                                                />
                                            }
                                            name="multiplicador"
                                            control={control}
                                            defaultValue={props.orcamentoValor.multiplicador}
                                            rules={{
                                                required: requiredMessage()
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container item xs={12} justify="flex-end" className={classes.actions}>
                            {!edit && (
                                <>
                                    <Button size="small" color="secondary" onClick={() => setOpenDialogDelete(true)}>Excluir</Button>
                                    <Button size="small" color="primary" onClick={() => setEdit(true)}>Editar</Button>
                                </>
                            )}
                            {edit && (
                                <>
                                    <LoadingButton size="small" onClick={() => setEdit(false)} color="inherit" text="Cancelar" isLoading={isLoading} />
                                    <LoadingButton size="small" color="primary" text="Salvar" isLoading={isLoading} type="submit" />
                                </>
                            )}
                        </Grid>
                    </CardActions>
                </form>
            </Card>
        </>
    );
}

export default OrcamentoValorItemComponent;